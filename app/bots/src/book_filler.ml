open! Core
open Jsip_types
open! Async
module Bot_runtime = Jsip_bot_runtime.Bot_runtime

module Config = struct
  type t =
    { symbols : Symbol.t list
    ; orders_per_tick : int
    ; order_size : Size.t
    ; price_offset_cents : int
    ; mutable next_client_id : int
    }
  [@@deriving sexp_of]
end

let name = "book-filler"
let on_start _config _context = return ()

(* Build the resting order for slot [index] of this tick. We round-robin over
   [symbols] and flip sides every full pass, so each symbol ends up with
   roughly equal depth piled on both sides. Pricing every order
   [price_offset_cents] away from the fundamental on its own passive side
   keeps it non-marketable, so it rests on the book instead of trading —
   which is the whole point of the bot. Bumping [next_client_id] on every
   order gives each one a fresh [client_order_id], so none is ever treated as
   a duplicate or accidentally cancelled. *)
let request_for
  (config : Config.t)
  (context : Bot_runtime.Context.t)
  ~symbols
  ~num_symbols
  ~index
  : Order.Request.t
  =
  let symbol = symbols.(index % num_symbols) in
  let side : Side.t = if index / num_symbols % 2 = 0 then Buy else Sell in
  let fundamental_cents =
    Price.to_int_cents (Bot_runtime.Context.fundamental context symbol)
  in
  let price =
    match side with
    | Buy ->
      Price.of_int_cents (fundamental_cents - config.price_offset_cents)
    | Sell ->
      Price.of_int_cents (fundamental_cents + config.price_offset_cents)
  in
  let client_order_id = Client_order_id.of_int config.next_client_id in
  config.next_client_id <- config.next_client_id + 1;
  { client_order_id
  ; symbol
  ; side
  ; price
  ; size = config.order_size
  ; time_in_force = Day
  }
;;

let on_tick (config : Config.t) (context : Bot_runtime.Context.t) =
  let symbols = Array.of_list config.symbols in
  let num_symbols = Array.length symbols in
  (* Allocate all client order IDs first *)
  let requests =
    List.init config.orders_per_tick ~f:(fun index ->
      request_for config context ~symbols ~num_symbols ~index)
  in
  (* Fire the whole batch at once so tick lands as a burst of resting orders *)
  Deferred.List.iter ~how:`Parallel requests ~f:(fun request ->
    match%map Bot_runtime.Context.submit context request with
    | Ok () -> ()
    | Error error ->
      [%log.error
        "book_filler: submit failed"
          (request : Order.Request.t)
          (error : Error.t)])
;;

let on_event _config _context _event = return ()
