/* ==========================================================
   RUST AND ROUTES: your posts live here.
   To add a post, copy the template, paste it at the TOP of
   POSTS, and fill it in. Order doesn't matter; the site sorts
   by date. The first photo becomes the cover automatically.

   {
     title: "Title here",
     date: "2026-04-05",                 // YYYY-MM-DD
     tags: ["routes", "photography"],    // keys from MENU below
     body: [
       "A paragraph. You can use <a href='...'>links</a> and <b>bold</b>.",
       ["photo1.jpg", "photo2.jpg"],                 // a row of photos in /images
       [{ src: "photo3.jpg", alt: "Caption shown in the viewer" }],
       { youtube: "https://www.youtube.com/watch?v=XXXXXXXXXXX" }
     ],
     // optional: place: "Highlands, NC",            (a line under the date)
     // optional: with: "Z3 · Pentax K1000 · Portra 400",  (what you drove / shot with)
     // optional: cover: "other.jpg",
     // optional, GTV6 posts only: milestone: "Engine out"  (adds it to the timeline)
   },
   ========================================================== */

// The menu. A section with `children` shows those links underneath
// and also includes their posts. Add a line to add a section.
const MENU = [
  { key: "routes", label: "Routes" },
  { key: "hikes", label: "Hikes" },
  { key: "cars", label: "Cars", children: [
    { key: "cars-and-coffees", label: "Cars & Coffees" },
    { key: "racing", label: "Racing" },
    { key: "gtv6", label: "GTV6 Restoration" }
  ]},
  { key: "photography", label: "Photography", children: [
    { key: "astro", label: "Astrophotography" }
  ]},
  { key: "travel", label: "Travel" }
];

const HOME_COUNT = 6;   // posts shown on the home page

/* GTV6 restoration page. Everything here is optional; empty parts are hidden.
   Milestones also come from any GTV6 post that has a `milestone:` line.
   status is "needed", "ordered" or "installed". cost is optional.

   intro: "A few sentences about the car and the plan.",
   milestones: [{ date: "2025-06", text: "Brought it home" }],
   parts: [{ part: "Front brake rotors", status: "installed", cost: 180, note: "" }]
*/
const GTV6 = {
  intro: "",
  milestones: [],
  parts: []
};

const POSTS = [
  {
    title: "First Fall Drive in the M240i",
    date: "2026-10-11",
    place: "Log Hollow Overlook, Blue Ridge Parkway",
    with: "BMW M240i · Pentax K-S1",
    tags: ["routes"],
    body: [
      "Amazing firsts last weekend. First drive of the fall, and first drive in the M240i.  We got pretty lucky with the traffic up to the parkway. Highway 178 up to 215 was the perfect route for that afternoon.",
      [{ src: "2026-10-11-m240i-log-hollow.jpg", alt: "The M240i at Log Hollow Overlook, elevation 4,445 feet" }],
      [{ src: "2026-10-11-lineup-log-hollow.jpg", alt: "The lineup at the overlook" }]
      // When the video is edited, add a comma after the last photo and paste:
      // { youtube: "https://www.youtube.com/watch?v=XXXXXXXXXXX" }
    ]
  },  
{
    title: "Drive up to Highlands NC, and a hike on the way back",
    date: "2026-03-22",
    place: "Highlands, NC",
    with: "Z3 · iPhone",
    tags: ["routes", "hikes"],
    body: [
      "Took the Z3 on her first mountain drive this year",
      [{ src: "3.22.26 hike and drive (1).jpg", alt: "Z3" }],
      "Stopped off on the way back for a brief 9 mile hike...",
      [
        { src: "3.22.26 hike and drive (2).jpg", alt: "River by the trail" },
        { src: "3.22.26 hike and drive (7).jpg", alt: "Tested long exposure times on the iPhone" },
        { src: "3.22.26 hike and drive (6).jpg", alt: "Beach near the river" }
      ],
      "About halfway through the hike was a small trail that went very steeply downwards. Following it down, and going over some sketchy terrain led to almost a cliff-like trail. I had to cross it while holding onto the roots and the wall, but the hidden waterfall was worth the payoff",
      [
        { src: "3.22.26 hike and drive (4).jpg", alt: "The pathway" },
        { src: "3.22.26 hike and drive (3).jpg", alt: "Waterfall" }
      ]
    ]
  },
  {
    title: "The Amelia Island Concours d'Elegance",
    date: "2026-03-06",
    place: "Amelia Island, FL",
    with: "Pentax K1000",
    tags: ["cars-and-coffees", "photography", "travel"],
    body: [
      "March 6th and 7th, 2026 was the first time I attended the Amelia Island Concours - and will certainly not be the last.",
      [
        { src: "amelia-1.jpg", alt: "Amelia" },
        { src: "amelia-porsche.jpg", alt: "Lone Porsche" },
        { src: "amelia-fiat500.jpg", alt: "Fiat 500 chop top" }
      ],
      "Brought the K1000 along and shot a couple rolls of film.",
      [
        { src: "amelia-sl300(2).jpg", alt: "Film camera" },
        { src: "amelia-sl300.jpg", alt: "Trail" }
      ],
      [
        { src: "amelia-mclaren1.jpg", alt: "Mclaren MP4/10" },
        { src: "amelia-porsche8.jpg", alt: "#8 Racing 911" }
      ],
      "And my personal favorite...",
      [{ src: "amelia-f40.jpg", alt: "Ferrari F40" }]
    ]
  }
];
