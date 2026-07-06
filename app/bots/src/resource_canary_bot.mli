open! Core
open! Async
open Jsip_bot_runtime
open Jsip_types

(** Description **)

(** This bot's purpose is to measure the effect of misbehaving bots in the
    ecosystem on the latency of resource requests to the server. On every
    tick that is a multiple of request interval, it requests a book query
    from the server for the specified symbols and records the latency of the
    requests. On every multiple of report interval, it prints collected
    statistics to the terminal **)

module RCConfig : sig
  type t =
    { participant : Participant.t (* participant name *)
    ; request_interval : int (* how many clock ticks between requests? *)
    ; report_interval : int (* how many clock ticks between reports? *)
    ; symbols : Symbol.t list (* Which books are we tracking latency for? *)
    ; book_query :
        Symbol.t
        -> Book.t option Deferred.t (* function to call the book_query_rpc *)
    ; latency_data : float list Symbol.Table.t
        (* a list of latencies for requests per symbol measured in ms *)
    ; mutable ticks_since_start : int (* ticks since the bot was started *)
    }
end

include Bot_runtime.Bot with type Config.t = RCConfig.t
