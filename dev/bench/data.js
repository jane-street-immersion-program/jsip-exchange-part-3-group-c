window.BENCHMARK_DATA = {
  "lastUpdate": 1782880652101,
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
      }
    ]
  }
}