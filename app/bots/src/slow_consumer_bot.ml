open! Core
open! Async
open Jsip_types
module Context = Jsip_bot_runtime.Bot_runtime.Context

module Config = struct
  type t =
    { read_delay : Time_ns.Span.t
    ; events_per_read : int
    ; events_seen : int ref
    }
  [@@deriving sexp_of]
end

let name = "slow_consumer"

(* The slow consumer never submits orders, so startup and the tick loop do
   nothing. All of its (mis)behavior is in [on_event]. *)
let on_start (_config : Config.t) (_context : Context.t) = return ()
let on_tick (_config : Config.t) (_context : Context.t) = return ()

(* Drain [events_per_read] events quickly, then sleep for [read_delay]. While
   this handler is sleeping, [Pipe.iter] in the runner won't pull the next
   event, so the exchange-side subscriber pipe (which is written to without
   pushback) grows. *)
let on_event
  (config : Config.t)
  (_context : Context.t)
  (_event : Exchange_event.t)
  =
  incr config.events_seen;
  if !(config.events_seen) >= config.events_per_read
  then (
    config.events_seen := 0;
    Clock_ns.after config.read_delay)
  else return ()
;;
