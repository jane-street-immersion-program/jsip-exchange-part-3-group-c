open! Core
open! Async
open Jsip_bot_runtime
open Jsip_types

module RCConfig = struct
  type t =
    { participant : Participant.t
    ; request_interval : int
    ; report_interval : int
    ; symbols : Symbol.t list
    ; book_query : Symbol.t -> Book.t option Deferred.t
    ; latency_data : float list Symbol.Table.t
    ; mutable ticks_since_start : int
    }
end

module Timer = struct
  type t =
    { start_time : Time_ns.t
    ; mutable end_time : Time_ns.t option
    }

  let start_timer () = { start_time = Time_ns.now (); end_time = None }
  let stop_timer t = t.end_time <- Some (Time_ns.now ())

  let get_time_elapsed t =
    match t.end_time with
    | None -> Or_error.error_string "Timer has not been stopped"
    | Some time ->
      Or_error.return (Time_ns.diff time t.start_time |> Time_ns.Span.to_ms)
  ;;
end

module Latency_report = struct
  type t =
    { most_recent_latency_ms : float option
    ; avg_latency_ms : float option
    ; last_3_avg_latency_ms : float option
    }

  let empty =
    { most_recent_latency_ms = None
    ; avg_latency_ms = None
    ; last_3_avg_latency_ms = None
    }
  ;;

  let format_time_ms = function
    | None -> "N/A"
    | Some ts -> Float.to_string ts ^ "ms"
  ;;

  let to_string t symbol =
    [%string
      "(%{symbol#Symbol}) most_recent_latency_ms: %{format_time_ms \
       t.most_recent_latency_ms} avg_latency_ms: %{format_time_ms \
       t.avg_latency_ms} last_3_avg_latency_ms: %{format_time_ms \
       t.last_3_avg_latency_ms}"]
  ;;
end

module T = struct
  module Config = struct
    type t = RCConfig.t
  end

  let name = "ResourceCanary"

  let get_last_3_avg = function
    | first :: second :: third :: _ ->
      Some ((first +. second +. third) /. 3.0)
    | _ -> None
  ;;

  let perform_analysis symbol_latency_data =
    let data_length = List.length symbol_latency_data |> Float.of_int in
    let last_3_avg_latency_ms = get_last_3_avg symbol_latency_data in
    let most_recent_latency_ms =
      match symbol_latency_data with first :: _ -> Some first | _ -> None
    in
    let report =
      { Latency_report.empty with
        last_3_avg_latency_ms
      ; most_recent_latency_ms
      }
    in
    let sum_of_latencies =
      match symbol_latency_data with
      | [] -> None
      | _ ->
        Some
          (List.fold symbol_latency_data ~init:0.0 ~f:(fun sum latency_ms ->
             sum +. latency_ms))
    in
    { report with
      avg_latency_ms =
        Option.map sum_of_latencies ~f:(fun sum -> sum /. data_length)
    }
  ;;

  let on_start (config : Config.t) (_context : Bot_runtime.Context.t) =
    if config.request_interval <= 0
    then raise_s [%message "request_interval must be positive"];
    if config.report_interval <= 0
    then raise_s [%message "report_interval must be positive"];
    config.ticks_since_start <- 0;
    List.iter config.symbols ~f:(fun symbol ->
      Hashtbl.set config.latency_data ~key:symbol ~data:[]);
    return ()
  ;;

  let on_event
    (_config : Config.t)
    (_context : Bot_runtime.Context.t)
    (_event : Exchange_event.t)
    =
    return ()
  ;;

  let on_tick (config : Config.t) (_context : Bot_runtime.Context.t) =
    config.ticks_since_start <- config.ticks_since_start + 1;
    let%bind () =
      if config.ticks_since_start mod config.request_interval = 0
      then
        Deferred.List.iter config.symbols ~how:`Sequential ~f:(fun symbol ->
          let old_latency_data =
            Hashtbl.find_exn config.latency_data symbol
          in
          let timer = Timer.start_timer () in
          let%bind _ = config.book_query symbol in
          Timer.stop_timer timer;
          let time_elapsed =
            Timer.get_time_elapsed timer |> Or_error.ok_exn
          in
          return
            (Hashtbl.set
               config.latency_data
               ~key:symbol
               ~data:(time_elapsed :: old_latency_data)))
      else return ()
    in
    if config.ticks_since_start mod config.report_interval = 0
    then (
      let report_string =
        Hashtbl.fold
          config.latency_data
          ~init:[ "RESOURCE CANARY REPORT" ]
          ~f:(fun ~key:symbol ~data string_list ->
            let report = perform_analysis data in
            string_list @ [ Latency_report.to_string report symbol ])
        |> String.concat ~sep:"\n"
      in
      print_endline report_string;
      print_endline "";
      return ())
    else Deferred.unit
  ;;
end

include T
