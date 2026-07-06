window.BENCHMARK_DATA = {
  "lastUpdate": 1783359057209,
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
      },
      {
        "commit": {
          "author": {
            "email": "arthur.c.ufongene.28@dartmouth.edu",
            "name": "Arthur Ufongene",
            "username": "arthUFO12"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "0eca04c02a9e5403ca6cd7180f3975bf177a334c",
          "message": "Merge pull request #7 from jane-street-immersion-program/resource_canary\n\nResource canary",
          "timestamp": "2026-07-06T12:01:47-04:00",
          "tree_id": "309302ffefeaa2ad4e3ddced256a7e22d44a12c9",
          "url": "https://github.com/jane-street-immersion-program/jsip-exchange-part-3-group-c/commit/0eca04c02a9e5403ca6cd7180f3975bf177a334c"
        },
        "date": 1783353948726,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "find_match (n=10)",
            "value": 24.860728720578987,
            "unit": "ns"
          },
          {
            "name": "find_match (n=50)",
            "value": 26.292333537850823,
            "unit": "ns"
          },
          {
            "name": "find_match (n=100)",
            "value": 26.996160188656816,
            "unit": "ns"
          },
          {
            "name": "find_match (n=500)",
            "value": 30.17157989150955,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=10)",
            "value": 25.104532792651483,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=50)",
            "value": 25.60644601639806,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=100)",
            "value": 26.753112426382415,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=500)",
            "value": 29.481001036833757,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=10)",
            "value": 157.18114450964717,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=50)",
            "value": 661.3021829448849,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=100)",
            "value": 1217.685877206432,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=500)",
            "value": 6059.426390307788,
            "unit": "ns"
          },
          {
            "name": "add+remove (n=100)",
            "value": 492.4769156608229,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=10)",
            "value": 122.86617231372453,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=50)",
            "value": 130.2801563059027,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=100)",
            "value": 128.25481234297024,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=500)",
            "value": 123.75701626440444,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=10)",
            "value": 61.335338509357335,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=50)",
            "value": 56.26068314192335,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=100)",
            "value": 56.66661099690739,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=500)",
            "value": 56.617717389715075,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_10_levels",
            "value": 7326.278302007527,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_50_levels",
            "value": 69244.4995326499,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_100_levels",
            "value": 219115.72548296073,
            "unit": "ns"
          },
          {
            "name": "find_match_alloc (n=100)",
            "value": 28.03071810050727,
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
          "id": "1cde79421138a2a10c15b88852874e6bb26ce5d5",
          "message": "Merge pull request #8 from jane-street-immersion-program/andrew/cancel-storm-readd-tests\n\nreadd tests deleted from PR#7",
          "timestamp": "2026-07-06T12:19:28-04:00",
          "tree_id": "e2d298244b068d4a853de7c45012ca5a1fe3b4f0",
          "url": "https://github.com/jane-street-immersion-program/jsip-exchange-part-3-group-c/commit/1cde79421138a2a10c15b88852874e6bb26ce5d5"
        },
        "date": 1783355090792,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "find_match (n=10)",
            "value": 21.50088387038091,
            "unit": "ns"
          },
          {
            "name": "find_match (n=50)",
            "value": 22.550521938543785,
            "unit": "ns"
          },
          {
            "name": "find_match (n=100)",
            "value": 23.42953256230776,
            "unit": "ns"
          },
          {
            "name": "find_match (n=500)",
            "value": 26.118970867343968,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=10)",
            "value": 21.786649530531772,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=50)",
            "value": 23.109972002899042,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=100)",
            "value": 23.991290997282714,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=500)",
            "value": 26.35359534967363,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=10)",
            "value": 148.10497140753822,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=50)",
            "value": 628.9864351532785,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=100)",
            "value": 1264.0870187175371,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=500)",
            "value": 6168.806295535343,
            "unit": "ns"
          },
          {
            "name": "add+remove (n=100)",
            "value": 405.1221285679849,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=10)",
            "value": 106.71235390056223,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=50)",
            "value": 112.68064349585124,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=100)",
            "value": 111.97867034656883,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=500)",
            "value": 112.81153715393604,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=10)",
            "value": 53.93622537323092,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=50)",
            "value": 54.07078326202245,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=100)",
            "value": 54.08068673315485,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=500)",
            "value": 54.162947588256465,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_10_levels",
            "value": 6970.284687280701,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_50_levels",
            "value": 67046.80080903444,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_100_levels",
            "value": 207868.38361098914,
            "unit": "ns"
          },
          {
            "name": "find_match_alloc (n=100)",
            "value": 23.711469087822266,
            "unit": "ns"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "arthur.c.ufongene.28@dartmouth.edu",
            "name": "Arthur Ufongene",
            "username": "arthUFO12"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "e9b0119b0dbb89cec754b2aa5011bbe4d456de16",
          "message": "Merge pull request #4 from jane-street-immersion-program/spammer\n\nSpammer",
          "timestamp": "2026-07-06T13:27:30-04:00",
          "tree_id": "c3aa2a99a3ff0838a366bc382521bcb018ed5e98",
          "url": "https://github.com/jane-street-immersion-program/jsip-exchange-part-3-group-c/commit/e9b0119b0dbb89cec754b2aa5011bbe4d456de16"
        },
        "date": 1783359056369,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "find_match (n=10)",
            "value": 23.811328029743233,
            "unit": "ns"
          },
          {
            "name": "find_match (n=50)",
            "value": 26.391954467257158,
            "unit": "ns"
          },
          {
            "name": "find_match (n=100)",
            "value": 26.988824095229734,
            "unit": "ns"
          },
          {
            "name": "find_match (n=500)",
            "value": 30.187658572782244,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=10)",
            "value": 26.239287359145475,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=50)",
            "value": 27.66975332489717,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=100)",
            "value": 28.389439505536494,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=500)",
            "value": 31.593049997784387,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=10)",
            "value": 167.3865233639298,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=50)",
            "value": 713.8925064369344,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=100)",
            "value": 1396.5924828107243,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=500)",
            "value": 6887.220271541523,
            "unit": "ns"
          },
          {
            "name": "add+remove (n=100)",
            "value": 417.7924501351247,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=10)",
            "value": 120.53227829886974,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=50)",
            "value": 120.14495042477188,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=100)",
            "value": 118.43347958092976,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=500)",
            "value": 119.61169862099858,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=10)",
            "value": 59.36761817791265,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=50)",
            "value": 58.39128505031463,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=100)",
            "value": 59.34943119456921,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=500)",
            "value": 59.332515584462335,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_10_levels",
            "value": 7307.878092347341,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_50_levels",
            "value": 68684.397525672,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_100_levels",
            "value": 206917.6337389075,
            "unit": "ns"
          },
          {
            "name": "find_match_alloc (n=100)",
            "value": 27.369323995542803,
            "unit": "ns"
          }
        ]
      }
    ]
  }
}