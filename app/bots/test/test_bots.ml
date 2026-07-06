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

(* ------------------------------------------------------------------------ *)
(* Tests for [Resource_canary_bot].

   The canary reads nothing from its [Context.t] — it drives latency probes
   through the [book_query] closure in its config. So we call [on_start] /
   [on_tick] directly with a throwaway context and a mock [book_query], then
   inspect the mutable [latency_data] table.

   - [request_interval] (probe every N ticks) is asserted via SAMPLE COUNTS,
     which are deterministic even though the recorded wall-clock latencies
     are not.
   - [report_interval] (print every M ticks) is asserted by PRE-SEEDING
     [latency_data] with known floats and freezing new probes (huge
     [request_interval]), so the printed report is fully deterministic. *)

module Rc = Resource_canary_bot

let msft = Symbol.of_string "MSFT"

(* The canary ignores the context, so any runnable bot's context will do. *)
let make_context () =
  let bot, _submitted, _cancelled =
    make_recording_bot (module Inert_bot) () ()
  in
  Bot_runtime.For_testing.context_of bot
;;

(* Build a config, start the bot, optionally seed [latency_data] (after
   [on_start], which clears it), then drive [ticks] ticks. Returns the config
   so callers can inspect the resulting state. *)
let run
  ~symbols
  ~request_interval
  ~report_interval
  ?(book_query = fun (_ : Symbol.t) -> return None)
  ?(seed = [])
  ~ticks
  ()
  : Rc.RCConfig.t Deferred.t
  =
  let ctx = make_context () in
  let config : Rc.RCConfig.t =
    { participant = alice
    ; request_interval
    ; report_interval
    ; symbols
    ; book_query
    ; latency_data = Symbol.Table.create ()
    ; ticks_since_start = 0
    }
  in
  let%bind () = Rc.on_start config ctx in
  List.iter seed ~f:(fun (symbol, data) ->
    Hashtbl.set config.latency_data ~key:symbol ~data);
  let%bind () =
    Deferred.List.iter
      (List.init ticks ~f:Fn.id)
      ~how:`Sequential
      ~f:(fun (_ : int) -> Rc.on_tick config ctx)
  in
  return config
;;

let print_sample_counts (config : Rc.RCConfig.t) : unit =
  List.iter config.symbols ~f:(fun symbol ->
    let data_length =
      Hashtbl.find_exn config.latency_data symbol
      |> Rc.For_testing.num_samples
    in
    print_endline [%string "%{symbol#Symbol}: %{data_length#Int} samples"])
;;

let%expect_test "requests are recorded every request_interval ticks, per \
                 symbol"
  =
  (* [report_interval] exceeds the tick count so no report fires; the only
     observable effect is the recorded sample counts. *)
  let show ~request_interval ~ticks =
    let%bind config =
      run
        ~symbols:[ aapl; msft ]
        ~request_interval
        ~report_interval:1_000_000
        ~ticks
        ()
    in
    printf "request_interval=%d, ticks=%d:\n" request_interval ticks;
    print_sample_counts config;
    return ()
  in
  let%bind () = show ~request_interval:1 ~ticks:6 in
  let%bind () = show ~request_interval:2 ~ticks:6 in
  let%bind () = show ~request_interval:3 ~ticks:7 in
  [%expect
    {|
    request_interval=1, ticks=6:
    AAPL: 6 samples
    MSFT: 6 samples
    request_interval=2, ticks=6:
    AAPL: 3 samples
    MSFT: 3 samples
    request_interval=3, ticks=7:
    AAPL: 2 samples
    MSFT: 2 samples
    |}];
  return ()
;;

let%expect_test "report prints seeded latency stats once per report_interval"
  =
  (* Freeze new probes (huge [request_interval]) so the report reflects
     exactly the seeded data. The window keeps the most recent 3 samples (20,
     30, 40) while sum/count cover all four (10, 20, 30, 40): most_recent =
     40, avg = 100/4 = 25, last_3 = (20+30+40)/3 = 30. 7 ticks /
     report_interval 3 => two reports. *)
  let seeded =
    Rc.For_testing.create_data
      ~recent:[ 20.0; 30.0; 40.0 ]
      ~sum_latencies:100.0
      ~num_samples:4
  in
  let%bind (_ : Rc.RCConfig.t) =
    run
      ~symbols:[ aapl ]
      ~request_interval:1_000_000
      ~report_interval:3
      ~seed:[ aapl, seeded ]
      ~ticks:7
      ()
  in
  [%expect
    {|
    RESOURCE CANARY REPORT
    (AAPL) most_recent_latency_ms: 40.ms avg_latency_ms: 25.ms last_3_avg_latency_ms: 30.ms

    RESOURCE CANARY REPORT
    (AAPL) most_recent_latency_ms: 40.ms avg_latency_ms: 25.ms last_3_avg_latency_ms: 30.ms
    |}];
  return ()
;;
