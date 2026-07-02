open! Core
open! Async
open Jsip_types
module Context = Jsip_bot_runtime.Bot_runtime.Context

(* INTERIM SCAFFOLDING -- not a pathological bot. A minimal noise trader whose
   only job is to generate market-data traffic (BBO churn, and the occasional
   trade) so scenarios like [Slow_consumers] have a live stream for a
   market-data consumer to fall behind on.

   Each tick it submits one resting Day order on a random side at a price
   jittered around the current fundamental, using a fresh client order id.
   Randomness is drawn from [Context.random] so runs are reproducible. Swap
   this out for a real noise trader / group-mate's traffic bot when available. *)

module Config : sig
  type t =
    { symbol : Symbol.t (** The symbol to trade. *)
    ; order_size : int (** Shares per order. *)
    ; price_jitter_cents : int
    (** Each order is priced at [fundamental +/- U(0, price_jitter_cents)].
        Larger values spread orders over more price levels, so the best
        bid/ask changes more often -- i.e. more market-data events. *)
    ; next_client_order_id : int ref
    (** Mutable counter. Each tick consumes one fresh id, so successive
        submits aren't rejected by duplicate-id detection. The scenario must
        give each instance its own [ref]. *)
    }
  [@@deriving sexp_of]
end

val name : string
val on_start : Config.t -> Context.t -> unit Deferred.t
val on_tick : Config.t -> Context.t -> unit Deferred.t
val on_event : Config.t -> Context.t -> Exchange_event.t -> unit Deferred.t
