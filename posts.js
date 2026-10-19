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
    title: "Back in Yosemite",
    date: "2026-09-25",
    place: "Yosemite National Park, CA",
    with: "Pentax K-S1",
    tags: ["hikes", "travel"],
    cover: "2026-09-25-yosemite-valley.jpg",
    body: [
      [{ src: "2026-09-25-yosemite-valley.jpg", alt: "The valley, with El Capitan on the left and Half Dome in the distance" }],
      "Felt right to be back in Yosemite. I couldn't believe it had been over 7 years. Last time I saw this view, I was about to go on the first camping trip  (and first real hike), of many.",
      [{ src: "2026-09-25-yosemite-climbers-el-cap.jpg", alt: "Climbers on the face of El Capitan" }],
      "Other than the hiking and camping, this trip really inspired me to get back into climbing. I'm not saying I can climb El Cap, but I won't know unless I try.",
      [{ src: "2026-09-25-yosemite-forest.jpg", alt: "A small forest tucked into the dry landscape above the valley" }],
      [{ src: "2026-09-25-yosemite-deer.jpg", alt: "Two deer on the trail, one still spotted" }],
      "After ascending thousands of feet out of the valley, well past the completely dried up Yosemite Falls, we stumbled upon a small forest amongst the desert landscape - and met two friends up there.",
      [
        { src: "2026-09-25-yosemite-crow-1.jpg", alt: "A crow diving upside down against the clouds" },
        { src: "2026-09-25-yosemite-crow-2.jpg", alt: "Two crows over the granite slopes" },
        { src: "2026-09-25-yosemite-crow-3.jpg", alt: "A crow banking through the clouds" }
      ],
      "Speaking of friends, we got lucky enough to witness some crows putting on a show for us - including some upside down flying!",
      "The view from the top was incredible and intimidating. I could not believe how far up we had hiked in such a short time. Unfortunately due to the dryness, our plan to refill water was bust, and we had to call it before we could make the haul to north dome. It was tempting, but the risk wasn't worth it. The final view we had was still well worth it.",
      [{ src: "2026-09-25-yosemite-view-from-the-top.jpg", alt: "The view down into Yosemite Valley from the top" }]
    ]
  },
{
    title: "Back at the Petersen",
    date: "2026-09-23",
    place: "Petersen Automotive Museum, Los Angeles, CA",
    with: "Pentax K-S1",
    tags: ["cars", "travel"],
    body: [
      "Just a few favorites from my (second!) trip to Petersen in LA",
      [{ src: "2026-09-23-petersen-db5.jpg", alt: "The Aston Martin DB5 from the 007 films" }],
      [{ src: "2026-09-23-petersen-fast-furious.jpg", alt: "Cars from The Fast and the Furious, with the green Eclipse on the right" }],
      [{ src: "2026-09-23-petersen-lancia-037.jpg", alt: "The Lancia 037 in Martini Racing livery" }],
      [{ src: "2026-09-23-petersen-rexy.jpg", alt: "Rexy, the green number 77 Porsche race car" }]
    ]
  },
  {
    title: "Chasing Andromeda in Joshua Tree",
    date: "2026-09-20",
    place: "Joshua Tree, CA",
    with: "Pentax K-S1 · 300mm lens",
    tags: ["astro"],
    cover: "2026-09-20-joshua-tree-andromeda-edited.jpg",
    body: [
      [{ src: "2026-09-20-joshua-tree-blurry.jpg", alt: "My first attempt, with the stars out of focus" }],
      "I tried my hand at some astrophotography in Joshua tree in September. I was lucky to have a low light situation, but not so lucky that there was a half moon out. My first attempt was rather sad, but it didn't stop me.",
      "I got some decent pictures of the moon, since it was pretty obvious in the sky. I decided to head to bed, and wait out the moon, with a 1:15am alarm to get started on my real mission: get a picture of Andromeda.",
      [
        { src: "2026-09-20-joshua-tree-moon.jpg", alt: "The half moon over Joshua Tree" },
        { src: "2026-09-20-joshua-tree-milky-way.jpg", alt: "A faint Milky Way across the night sky" }
      ],
      [{ src: "2026-09-20-joshua-tree-andromeda-first.jpg", alt: "My first image of Andromeda, the small glow near the center" }],
      "I had a lot of throw away images in between, but with my 300mm lens (and cropped filter) I was limited with my exposure time. I managed to get this first image of Andromeda!",
      [
        { src: "2026-09-20-joshua-tree-andromeda-edited.jpg", alt: "Final Andromeda, touched up in darktable" },
        { src: "2026-09-20-joshua-tree-andromeda-final.jpg", alt: "Final Andromeda, before editing" }
      ],
      "Finally, I dialed in as best I could and I got this image. On the right side is one which I touched up a bit in darktable. It's not much, but it's a start!"
    ]
  },
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
