window.BENCHMARK_DATA = {
  "lastUpdate": 1783350256041,
  "repoUrl": "https://github.com/jane-street-immersion-program/jsip-exchange-part-3-group-c",
  "entries": {
    "Order book benchmark": [
      {
        "commit": {
          "author": {
            "email": "abauer@janestreet.com",
            "name": "Aaron Bauer",
            "username": "awilliambauer"
          },
          "committer": {
            "email": "abauer@janestreet.com",
            "name": "Aaron Bauer",
            "username": "awilliambauer"
          },
          "distinct": true,
          "id": "335dde76bf643513deeb065b18a0a48c63b91852",
          "message": "ai intro, part 3 exercises, claude code files",
          "timestamp": "2026-07-01T04:33:54Z",
          "tree_id": "78d26c220c6fa48f14ba23bc009b50efe07aee98",
          "url": "https://github.com/jane-street-immersion-program/jsip-exchange-part-3-group-c/commit/335dde76bf643513deeb065b18a0a48c63b91852"
        },
        "date": 1782880651461,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "find_match (n=10)",
            "value": 26.025612591035422,
            "unit": "ns"
          },
          {
            "name": "find_match (n=50)",
            "value": 25.752960860064587,
            "unit": "ns"
          },
          {
            "name": "find_match (n=100)",
            "value": 26.74660856449424,
            "unit": "ns"
          },
          {
            "name": "find_match (n=500)",
            "value": 29.716223825810825,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=10)",
            "value": 25.139220737961825,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=50)",
            "value": 26.11341753009693,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=100)",
            "value": 26.76496769357688,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=500)",
            "value": 29.888643103575017,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=10)",
            "value": 159.4840426848176,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=50)",
            "value": 711.4779569559279,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=100)",
            "value": 1412.2849535256646,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=500)",
            "value": 6962.79637516687,
            "unit": "ns"
          },
          {
            "name": "add+remove (n=100)",
            "value": 457.75870531568654,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=10)",
            "value": 115.0504349699602,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=50)",
            "value": 121.79561283894216,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=100)",
            "value": 116.66235161332499,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=500)",
            "value": 114.30665961134936,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=10)",
            "value": 58.40993775968674,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=50)",
            "value": 58.48576365452325,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=100)",
            "value": 58.525397824619944,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=500)",
            "value": 59.49506780452036,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_10_levels",
            "value": 7385.111127864379,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_50_levels",
            "value": 72569.69428550171,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_100_levels",
            "value": 222793.01562265545,
            "unit": "ns"
          },
          {
            "name": "find_match_alloc (n=100)",
            "value": 26.858085760481508,
            "unit": "ns"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "72947325+AndrewLiu0@users.noreply.github.com",
            "name": "Andrew Liu",
            "username": "AndrewLiu0"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "91edc436286895e338f7386208eea3ed94df3d28",
          "message": "Merge pull request #3 from jane-street-immersion-program/andrew/cancel-storm\n\nAndrew/cancel storm",
          "timestamp": "2026-07-06T11:00:25-04:00",
          "tree_id": "4083723ecaaaff4ed640595cc1e1c76d50089d61",
          "url": "https://github.com/jane-street-immersion-program/jsip-exchange-part-3-group-c/commit/91edc436286895e338f7386208eea3ed94df3d28"
        },
        "date": 1783350255771,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "find_match (n=10)",
            "value": 25.620777126490992,
            "unit": "ns"
          },
          {
            "name": "find_match (n=50)",
            "value": 27.760675468351337,
            "unit": "ns"
          },
          {
            "name": "find_match (n=100)",
            "value": 27.86012450323802,
            "unit": "ns"
          },
          {
            "name": "find_match (n=500)",
            "value": 29.336039301279133,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=10)",
            "value": 25.59042300192831,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=50)",
            "value": 26.681804863601542,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=100)",
            "value": 26.643114405811723,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=500)",
            "value": 30.30556854221955,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=10)",
            "value": 165.41669300298517,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=50)",
            "value": 709.1931629701855,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=100)",
            "value": 1377.4457581985841,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=500)",
            "value": 6300.1141783488765,
            "unit": "ns"
          },
          {
            "name": "add+remove (n=100)",
            "value": 447.31882582166554,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=10)",
            "value": 124.53260280888027,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=50)",
            "value": 131.97052994001834,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=100)",
            "value": 127.28893980540442,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=500)",
            "value": 124.29204175484826,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=10)",
            "value": 60.92886187964339,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=50)",
            "value": 58.37578934469709,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=100)",
            "value": 57.71086150483602,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=500)",
            "value": 57.50384075056398,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_10_levels",
            "value": 7577.859319895793,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_50_levels",
            "value": 70862.70927308542,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_100_levels",
            "value": 224678.38126088318,
            "unit": "ns"
          },
          {
            "name": "find_match_alloc (n=100)",
            "value": 31.03310087215363,
            "unit": "ns"
          }
        ]
      }
    ]
  }
}