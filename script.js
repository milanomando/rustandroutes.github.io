(function () {
  const app = document.getElementById("app");
  const navEl = document.getElementById("nav");
  const subEl = document.getElementById("subnav");
  const SITE = "Rust And Routes";
  const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- helpers ---------- */
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const ordinal = n => { const v = n % 100; return (v >= 11 && v <= 13) ? n + "th" : n + (["th","st","nd","rd"][n % 10] || "th"); };
  const fmtDate = s => {
    const [y, m, d] = s.split("-").map(Number);
    if (!m) return String(y);
    return d ? MONTHS[m - 1] + " " + ordinal(d) + ", " + y : MONTHS[m - 1] + " " + y;
  };
  const imgSrc = f => (/^(https?:)?\/\//.test(f) || f.includes("/")) ? f : encodeURI("images/" + f);
  const ytId = v => { const m = String(v).match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/); return m ? m[1] : v; };
  const money = n => "$" + Number(n).toLocaleString();

  /* ---------- data ---------- */
  const posts = POSTS
    .map(p => ({ ...p, tags: p.tags || [], id: p.id || (p.date + "-" + slug(p.title)) }))
    .sort((a, b) => b.date.localeCompare(a.date));

  const menu = MENU.slice();
  const labels = {};
  MENU.forEach(g => { labels[g.key] = g.label; (g.children || []).forEach(c => { labels[c.key] = c.label; }); });
  posts.forEach(p => p.tags.forEach(t => {
    if (!labels[t]) { labels[t] = t.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()); menu.push({ key: t, label: labels[t] }); }
  }));

  const label = t => labels[t] || t;
  const groupOf = k => menu.find(g => g.key === k || (g.children || []).some(c => c.key === k));
  const keysFor = k => { const g = menu.find(x => x.key === k); return g ? [k].concat((g.children || []).map(c => c.key)) : [k]; };
  const inSection = (p, k) => { const ks = keysFor(k); return p.tags.some(t => ks.includes(t)); };

  const cover = p => {
    if (p.cover) return imgSrc(p.cover);
    for (const b of p.body) if (Array.isArray(b) && b.length) return imgSrc(typeof b[0] === "string" ? b[0] : b[0].src);
    const y = p.body.find(b => b && b.youtube);
    return y ? "https://img.youtube.com/vi/" + ytId(y.youtube) + "/hqdefault.jpg" : "";
  };

  /* ---------- rendering ---------- */
  let galleries = [];
  const href = k => "#/tag/" + encodeURIComponent(k);

  function renderGallery(items, post) {
    const g = galleries.length;
    const list = items.map(it => {
      const o = typeof it === "string" ? { src: it } : it;
      return { src: imgSrc(o.src), alt: o.alt || "", cap: o.alt || "" };
    });
    galleries.push(list);
    return '<div class="gallery n' + Math.min(list.length, 3) + '">' + list.map((o, i) =>
      '<img src="' + esc(o.src) + '" alt="' + esc(o.alt || post.title) + '" loading="lazy" data-g="' + g + '" data-i="' + i + '">').join("") + "</div>";
  }

  function renderBlock(b, post) {
    if (typeof b === "string") return "<p>" + b + "</p>";
    if (Array.isArray(b)) return renderGallery(b, post);
    if (b && b.youtube) return '<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/' + esc(ytId(b.youtube)) +
      '" title="' + esc(b.title || post.title) + '" loading="lazy" allowfullscreen></iframe></div>';
    return "";
  }

  const cats = p => '<div class="cats">' + p.tags.map(t => '<a href="' + href(t) + '">' + esc(label(t)) + "</a>").join("") + "</div>";

  function renderPost(p) {
    return '<article class="post"><header>' + cats(p) + "<h2>" + esc(p.title) + '</h2><time datetime="' + p.date + '">' +
      fmtDate(p.date) + "</time>" + (p.place ? '<p class="place">' + esc(p.place) + "</p>" : "") +
      (p.with ? '<p class="with">' + esc(p.with) + "</p>" : "") + "</header>" + p.body.map(b => renderBlock(b, p)).join("") + "</article>";
  }

  function card(p) {
    const c = cover(p);
    return '<a class="card" href="#/post/' + encodeURIComponent(p.id) + '"><div class="ph"><div class="im">' +
      (c ? '<img src="' + esc(c) + '" alt="" loading="lazy">' : "") + "</div>" +
      (p.tags[0] ? '<span class="lab">' + esc(label(p.tags[0])) + "</span>" : "") + "</div><h3>" + esc(p.title) +
      '</h3><time datetime="' + p.date + '">' + fmtDate(p.date) + "</time></a>";
  }

  const grid = list => '<div class="grid">' + list.map(card).join("") + "</div>";
  const pageHead = (t, sub) => '<div class="page-head"><h2>' + esc(t) + "</h2>" + (sub ? "<p>" + sub + "</p>" : "") + "</div>";
  const empty = '<p class="empty">Nothing here yet.</p>';
  const back = (h, t) => '<p class="more"><a href="' + h + '">' + t + "</a></p>";

  function renderNav(active) {
    const g = groupOf(active);
    const a = (h, t, on) => '<a href="' + h + '"' + (on ? ' class="on" aria-current="page"' : "") + ">" + esc(t) + "</a>";
    navEl.innerHTML = a("#/", "Home", active === "home") +
      menu.map(m => a(href(m.key), m.label, g && g.key === m.key)).join("") + a("#/archive", "Archive", active === "archive");
    subEl.innerHTML = g && g.children ? a(href(g.key), "All " + g.label, active === g.key) +
      g.children.map(c => a(href(c.key), c.label, active === c.key)).join("") : "";
  }

  function show(html, title, active) {
    app.innerHTML = html;
    document.title = title ? title + " | " + SITE : SITE;
    renderNav(active);
    window.scrollTo(0, 0);
  }

  function renderProject() {
    const list = posts.filter(p => p.tags.includes("gtv6")).sort((a, b) => a.date.localeCompare(b.date));
    const ms = (GTV6.milestones || []).map(m => ({ date: m.date, text: m.text }))
      .concat(list.filter(p => p.milestone).map(p => ({ date: p.date, text: p.milestone, id: p.id })))
      .sort((a, b) => a.date.localeCompare(b.date));
    const parts = GTV6.parts || [];
    let h = pageHead(label("gtv6"), "Oldest to newest");
    if (GTV6.intro) h += '<p class="intro">' + GTV6.intro + "</p>";
    if (ms.length || parts.length) {
      h += '<div class="project">';
      if (ms.length) h += '<section><h3>Milestones</h3><ol class="timeline">' + ms.map(m =>
        "<li><time>" + fmtDate(m.date) + "</time><span>" + (m.id ? '<a href="#/post/' + encodeURIComponent(m.id) + '">' + esc(m.text) + "</a>" : esc(m.text)) + "</span></li>").join("") + "</ol></section>";
      if (parts.length) {
        const done = parts.filter(p => p.status === "installed").length;
        const spent = parts.reduce((s, p) => s + (p.cost && p.status !== "needed" ? p.cost : 0), 0);
        h += "<section><h3>Parts</h3><p class=\"tally\">" + done + " of " + parts.length + " installed" + (spent ? " &middot; " + money(spent) + " spent" : "") + '</p><ul class="parts">' +
          parts.map(p => '<li class="' + esc(p.status || "needed") + '"><span>' + esc(p.part) + (p.note ? "<small>" + esc(p.note) + "</small>" : "") +
            "</span><em>" + esc(p.status || "needed") + "</em><b>" + (p.cost ? money(p.cost) : "") + "</b></li>").join("") + "</ul></section>";
      }
      h += "</div>";
    }
    return h + (list.length ? '<h3 class="logh">Build log</h3>' + list.map(renderPost).join("") : empty);
  }

  function route() {
    galleries = [];
    const parts = location.hash.replace(/^#\/?/, "").split("/");
    const kind = parts[0];
    const arg = decodeURIComponent(parts.slice(1).join("/"));

    if (kind === "tag" && arg === "gtv6") {
      show(renderProject(), label("gtv6"), "gtv6");
    } else if (kind === "tag") {
      const list = posts.filter(p => inSection(p, arg));
      show(pageHead(label(arg), list.length + (list.length === 1 ? " post" : " posts")) + (list.length ? grid(list) : empty), label(arg), arg);
    } else if (kind === "post") {
      const p = posts.find(x => x.id === arg);
      show(p ? renderPost(p) + back("#/", "&larr; Back home") : pageHead("Post not found") + back("#/", "&larr; Back home"), p ? p.title : "Not found", "");
    } else if (kind === "archive") {
      const years = {};
      posts.forEach(p => (years[p.date.slice(0, 4)] = years[p.date.slice(0, 4)] || []).push(p));
      show(pageHead("Archive", posts.length + " posts") + Object.keys(years).sort().reverse().map(y =>
        '<section class="year"><h3>' + y + "</h3><ul>" + years[y].map(p =>
          "<li><time>" + fmtDate(p.date).replace(/,? \d{4}$/, "") + '</time><a href="#/post/' + encodeURIComponent(p.id) + '">' + esc(p.title) +
          "</a><span>" + p.tags.map(label).map(esc).join(" + ") + "</span></li>").join("") + "</ul></section>").join(""), "Archive", "archive");
    } else {
      show(grid(posts.slice(0, HOME_COUNT)) + (posts.length > HOME_COUNT ? back("#/archive", "View the archive") : ""), "", "home");
    }
  }

  window.addEventListener("hashchange", route);
  route();

  /* ---------- photo viewer ---------- */
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightbox-img");
  const cap = document.getElementById("cap");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  let cur = { g: 0, i: 0 };

  function showPhoto() {
    const list = galleries[cur.g], o = list[cur.i];
    lbImg.src = o.src; lbImg.alt = o.alt; cap.textContent = o.cap;
    prevBtn.style.display = nextBtn.style.display = list.length > 1 ? "" : "none";
  }
  const openLb = (g, i) => { cur = { g, i }; showPhoto(); lb.classList.add("open"); };
  const closeLb = () => { lb.classList.remove("open"); lbImg.removeAttribute("src"); };
  const step = d => { const n = galleries[cur.g].length; cur.i = (cur.i + d + n) % n; showPhoto(); };

  app.addEventListener("click", e => {
    const img = e.target.closest(".gallery img");
    if (img) openLb(+img.dataset.g, +img.dataset.i);
  });
  document.getElementById("close").onclick = closeLb;
  prevBtn.onclick = e => { e.stopPropagation(); step(-1); };
  nextBtn.onclick = e => { e.stopPropagation(); step(1); };
  lb.addEventListener("click", e => { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", e => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
  let startX = null;
  lb.addEventListener("touchstart", e => { startX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", e => {
    if (startX === null || galleries[cur.g].length < 2) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    startX = null;
  });
})();
