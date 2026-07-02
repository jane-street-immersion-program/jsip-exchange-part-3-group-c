(** Scaffolding for bot tests. *)

open! Core
open! Async
open Jsip_types
open Jsip_fundamental
open Jsip_bot_runtime
open! Jsip_bots

let aapl = Symbol.of_string "AAPL"
let alice = Participant.of_string "Alice"

let oracle_config ~initial_price_cents =
  Symbol.Map.of_alist_exn
    [ ( aapl
      , { Fundamental_oracle.Config.initial_price_cents
        ; volatility_cents_per_sec = 0.0
        ; mean_reversion_strength = 0.0
        ; tick_interval = Time_ns.Span.of_sec 1.0
        } )
    ]
;;

(* Build a runtime around a bot module with a mock submit/cancel that records
   what the bot does. *)
let make_recording_bot
  (type cfg)
  (bot_module : (module Bot_runtime.Bot with type Config.t = cfg))
  (config : cfg)
  ?(initial_price_cents = 15000)
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
    Fundamental_oracle.create (oracle_config ~initial_price_cents) ~seed:42
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

(* Unlike [print_submitted], this includes each request's client order id:
   the storm pairs submits with cancels by id, so the ids are the pattern
   under test. Prints cumulatively — the recording refs are never cleared —
   which makes id freshness across ticks visible in the expect output. *)
let print_storm_activity
  ~(submitted : Order.Request.t list ref)
  ~(cancelled : Client_order_id.t list ref)
  =
  List.iter (List.rev !submitted) ~f:(fun (req : Order.Request.t) ->
    printf
      !"submit %{Client_order_id}: %{Side} %{Symbol} %d@%{Price#dollar}\n"
      req.client_order_id
      req.side
      req.symbol
      (Size.to_int req.size)
      req.price);
  List.iter (List.rev !cancelled) ~f:(fun id ->
    printf !"cancel %{Client_order_id}\n" id)
;;

let storm_config ~side ~pairs_per_tick : Cancel_storm.Config.t =
  { symbol = aapl
  ; size = Size.of_int 1
  ; side
  ; offset_from_fundamental_cents = 50
  ; pairs_per_tick
  ; next_id = ref 0
  }
;;

let%expect_test "cancel storm: fresh submit/cancel pairs every tick" =
  let config = storm_config ~side:Side.Buy ~pairs_per_tick:2 in
  let bot, submitted, cancelled =
    make_recording_bot (module Cancel_storm) config ()
  in
  let ctx = Bot_runtime.For_testing.context_of bot in
  (* One tick: every submit is priced 50c below the (flat) fundamental of
     $150.00, and every submitted id is cancelled. *)
  let%bind () = Cancel_storm.on_tick config ctx in
  print_storm_activity ~submitted ~cancelled;
  [%expect {|
    submit 0: BUY AAPL 1@$149.50
    submit 1: BUY AAPL 1@$149.50
    cancel 0
    cancel 1
    |}];
  (* A second tick continues the id sequence — ids 2 and 3, never reusing 0
     or 1. The output below is cumulative across both ticks. *)
  let%bind () = Cancel_storm.on_tick config ctx in
  print_storm_activity ~submitted ~cancelled;
  [%expect {|
    submit 0: BUY AAPL 1@$149.50
    submit 1: BUY AAPL 1@$149.50
    submit 2: BUY AAPL 1@$149.50
    submit 3: BUY AAPL 1@$149.50
    cancel 0
    cancel 1
    cancel 2
    cancel 3
    |}];
  return ()
;;

(* The buy-side test above pins down pricing *below* the fundamental. The
   sell side is the mirror image: it must price *above* the fundamental so
   its orders rest instead of crossing the spread. *)
let%expect_test "cancel storm: sell side prices above the fundamental" =
  (* TODO(human) *)
  return ()
;;

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
