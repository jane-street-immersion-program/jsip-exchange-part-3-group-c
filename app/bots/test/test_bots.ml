(** Scaffolding for bot tests. *)

open! Core
open! Async
open Jsip_types
open Jsip_fundamental
open Jsip_bot_runtime
open! Jsip_bots

let aapl = Symbol.of_string "AAPL"
let msft = Symbol.of_string "MSFT"
let alice = Participant.of_string "Alice"

(* A flat, deterministic oracle: every symbol sits at [initial_price_cents]
   and never moves (zero volatility, zero mean reversion). Because we drive
   [on_tick] by hand and never advance the oracle, the fundamental stays put,
   so every order's resting price is a fixed function of the config. *)
let oracle_config ~symbols ~initial_price_cents =
  Symbol.Map.of_alist_exn
    (List.map symbols ~f:(fun symbol ->
       ( symbol
       , { Fundamental_oracle.Config.initial_price_cents
         ; volatility_cents_per_sec = 0.0
         ; mean_reversion_strength = 0.0
         ; tick_interval = Time_ns.Span.of_sec 1.0
         } )))
;;

(* Build a runtime around a bot module with a mock submit/cancel that records
   what the bot does. [symbols] must cover every book the bot targets — the
   oracle raises on a symbol it has never heard of. *)
let make_recording_bot
  (type cfg)
  (bot_module : (module Bot_runtime.Bot with type Config.t = cfg))
  (config : cfg)
  ?(initial_price_cents = 15000)
  ?(symbols = [ aapl ])
  ()
  =
  let submitted = ref [] in
  let cancelled = ref [] in
  let submit request =
    submitted := request :: !submitted;
    return (Ok ())
  in
  let cancel order_id =
    cancelled := order_id :: !cancelled;
    return (Ok ())
  in
  let oracle =
    Fundamental_oracle.create
      (oracle_config ~symbols ~initial_price_cents)
      ~seed:42
  in
  let bot =
    Bot_runtime.create
      bot_module
      config
      ~participant:alice
      ~oracle
      ~rng:(Splittable_random.of_int 7)
      ~submit
      ~cancel
      ~tick_interval:(Time_ns.Span.of_sec 1.0)
  in
  bot, submitted, cancelled
;;

let print_submitted (submitted : Order.Request.t list ref) =
  let recent = List.rev !submitted in
  List.iter recent ~f:(fun req ->
    printf
      !"%{Side} %{Symbol} %d@%{Price#dollar} %{Time_in_force}\n"
      req.side
      req.symbol
      (Size.to_int req.size)
      req.price
      req.time_in_force)
;;

(* Smoke test: drive the do-nothing reference bot through one event so the
   runtest target exercises the helpers above. Replace or extend with
   bot-specific tests as concrete strategies are added to [Jsip_bots]. *)
module Inert_bot = struct
  module Config = struct
    type t = unit
  end

  let name = "inert"
  let on_start () _ctx = return ()
  let on_tick () _ctx = return ()
  let on_event () _ctx _event = return ()
end

let%expect_test "make_recording_bot wires up a runnable bot" =
  let bot, submitted, _cancelled =
    make_recording_bot (module Inert_bot) () ()
  in
  let%bind () =
    Bot_runtime.feed_event
      bot
      (Order_accept
         { order_id = Order_id.For_testing.of_int 1
         ; participant = alice
         ; request =
             { client_order_id = Client_order_id.of_int 1
             ; symbol = aapl
             ; side = Buy
             ; price = Price.of_int_cents 15000
             ; size = Size.of_int 10
             ; time_in_force = Day
             }
         })
  in
  print_submitted submitted;
  [%expect {| |}];
  return ()
;;

(* --- Spammer bot -------------------------------------------------------- *)

(* Build a spammer config with sensible defaults so each test overrides only
   the axis it cares about. [ticks_since_start] and [next_burst_time] are
   reset by [on_start], so their initial values here are placeholders. *)
let spammer_config
  ?(symbols = [ aapl ])
  ?(side = Side.Buy)
  ?(dist_from_fundamental_cents = 50)
  ?(order_size = 10)
  ~burst_interval
  ~burst_size
  ()
  : Spammer_bot.Config.t
  =
  { participant = alice
  ; symbols
  ; side
  ; burst_interval
  ; burst_size
  ; dist_from_fundamental_cents
  ; order_size
  ; client_order_id_generator = Client_order_id.Generator.create ()
  ; ticks_since_prev_burst = 0
  }
;;

(* Run a spammer through [on_start] then [num_ticks] hand-driven ticks,
   invoking [on_each_tick] after every tick with the number of orders that
   tick produced. Returns the full record of submitted requests. *)
let run_spammer (config : Spammer_bot.Config.t) ~num_ticks ~on_each_tick =
  let bot, submitted, _cancelled =
    make_recording_bot (module Spammer_bot) config ~symbols:config.symbols ()
  in
  let ctx = Bot_runtime.For_testing.context_of bot in
  let%bind () = Spammer_bot.on_start config ctx in
  let%map () =
    Deferred.List.iter
      (List.init num_ticks ~f:(fun i -> i + 1))
      ~how:`Sequential
      ~f:(fun tick ->
        let before = List.length !submitted in
        let%map () = Spammer_bot.on_tick config ctx in
        on_each_tick ~tick ~sent_this_tick:(List.length !submitted - before))
  in
  submitted
;;

(* Print one line per tick showing how many orders fired — the shape we use
   to reason about burst timing and sizing. *)
let print_per_tick ~tick ~sent_this_tick =
  printf "tick %d: %d orders\n" tick sent_this_tick
;;

(* Like [print_submitted] but also shows the client order id, so we can see
   the generator hands out a fresh, non-colliding id per order. *)
let print_orders_with_ids (submitted : Order.Request.t list ref) =
  List.iter (List.rev !submitted) ~f:(fun (req : Order.Request.t) ->
    printf
      !"%{Symbol} %{Side} %d@%{Price#dollar} coid=%{Client_order_id}\n"
      req.symbol
      req.side
      (Size.to_int req.size)
      req.price
      req.client_order_id)
;;

let%expect_test "a burst targets every configured symbol with fresh ids" =
  let config =
    spammer_config ~symbols:[ aapl; msft ] ~burst_interval:1 ~burst_size:2 ()
  in
  (* One tick with burst_interval = 1 fires exactly one burst. *)
  let%bind submitted =
    run_spammer
      config
      ~num_ticks:1
      ~on_each_tick:(fun ~tick:_ ~sent_this_tick:_ -> ())
  in
  print_orders_with_ids submitted;
  (* 2 symbols x burst_size 2 = 4 orders; Buy rests 50c below the 15000
     fundamental at $149.50; every id is distinct. *)
  [%expect
    {|
    AAPL BUY 10@$149.50 coid=0
    AAPL BUY 10@$149.50 coid=1
    MSFT BUY 10@$149.50 coid=2
    MSFT BUY 10@$149.50 coid=3
    |}];
  return ()
;;

let%expect_test "bursts fire every burst_interval ticks" =
  (* burst_interval = 3, one symbol, burst_size = 2: expect bursts on ticks 3
     and 6, nothing in between. *)
  let config =
    spammer_config ~symbols:[ aapl ] ~burst_interval:3 ~burst_size:2 ()
  in
  let%bind (_ : Order.Request.t list ref) =
    run_spammer config ~num_ticks:7 ~on_each_tick:print_per_tick
  in
  [%expect
    {|
    tick 1: 0 orders
    tick 2: 0 orders
    tick 3: 2 orders
    tick 4: 0 orders
    tick 5: 0 orders
    tick 6: 2 orders
    tick 7: 0 orders
    |}];
  return ()
;;

let%expect_test "burst_size controls how many orders each burst sends" =
  let config =
    spammer_config ~symbols:[ aapl ] ~burst_interval:1 ~burst_size:20 ()
  in
  let%bind _ =
    run_spammer config ~num_ticks:5 ~on_each_tick:print_per_tick
  in
  [%expect
    {|
  tick 1: 20 orders
  tick 2: 20 orders
  tick 3: 20 orders
  tick 4: 20 orders
  tick 5: 20 orders
  |}];
  return ()
;;
