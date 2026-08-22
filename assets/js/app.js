(function () {
  "use strict";

  var CFG = window.CONFIG || {};
  var PARKS = window.PARKS || [];
  var ICONS = window.PARK_ICONS || {};
  var PARTNER = CFG.PARTNER_NAME || "Griffin";

  var state = {
    view: "map",
    filter: "all",
    visits: {},          // park id -> {visited, griffin, year, notes}
    loaded: false
  };

  /* ---------------- helpers ---------------- */

  var $ = function (sel) { return document.querySelector(sel); };
  var $$ = function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); };

  var SVG_TAGS = { svg: 1, g: 1, path: 1, circle: 1, rect: 1, text: 1, tspan: 1 };
  function el(tag, attrs, children) {
    var node = SVG_TAGS[tag]
      ? document.createElementNS("http://www.w3.org/2000/svg", tag)
      : document.createElement(tag);
    for (var k in attrs) {
      if (attrs[k] === null || attrs[k] === undefined || attrs[k] === false) continue;
      node.setAttribute(k, attrs[k]);
    }
    (children || []).forEach(function (c) {
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  function num(n) { return n.toLocaleString("en-US"); }

  /* ---------------- CSV ---------------- */

  // RFC 4180-ish: handles quoted fields, escaped quotes, CRLF.
  function parseCSV(text) {
    var rows = [], row = [], field = "", inQuotes = false, i = 0;
    text = text.replace(/^﻿/, "");
    while (i < text.length) {
      var ch = text[i];
      if (inQuotes) {
        if (ch === '"') {
          if (text[i + 1] === '"') { field += '"'; i += 2; continue; }
          inQuotes = false; i++; continue;
        }
        field += ch; i++; continue;
      }
      if (ch === '"') { inQuotes = true; i++; continue; }
      if (ch === ",") { row.push(field); field = ""; i++; continue; }
      if (ch === "\r") { i++; continue; }
      if (ch === "\n") { row.push(field); rows.push(row); row = []; field = ""; i++; continue; }
      field += ch; i++;
    }
    row.push(field);
    if (row.length > 1 || row[0] !== "") rows.push(row);
    return rows;
  }

  function isTruthy(v) {
    return /^\s*(true|yes|y|x|1|✓|✔|done|visited)\s*$/i.test(v || "");
  }

  /* ---------------- name matching ---------------- */

  function normalize(s) {
    return (s || "")
      .normalize("NFD").replace(/[̀-ͯʻʼ']/g, "")
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/national park and preserve|national parks|national park|np\b/g, " ")
      .replace(/[^a-z0-9]+/g, "");
  }

  var lookup = {};
  PARKS.forEach(function (p) {
    [p.name, p.fullName, p.id].forEach(function (label) {
      var key = normalize(label);
      if (key) (lookup[key] = lookup[key] || []).push(p.id);
    });
  });
  // A few ways people write these in a spreadsheet.
  var ALIASES = {
    "sequoiaandkingscanyon": ["sequoia", "kings-canyon"],
    "sequoiakingscanyon": ["sequoia", "kings-canyon"],
    "hawaiivolcanoes": ["hawaii-volcanoes"],
    "wrangellstelias": ["wrangell-st-elias"],
    "wrangellsteliaspreserve": ["wrangell-st-elias"],
    "gatewayarchstlouis": ["gateway-arch"],
    "denalimckinley": ["denali"],
    "greatsmokymountain": ["great-smoky-mountains"],
    "rockymountains": ["rocky-mountain"]
  };
  Object.keys(ALIASES).forEach(function (k) { if (!lookup[k]) lookup[k] = ALIASES[k]; });

  /* ---------------- data loading ---------------- */

  function sheetUrl() {
    var override = new URLSearchParams(location.search).get("csv");
    var url = override || CFG.SHEET_CSV_URL || "";
    if (!url) return "";
    return url + (url.indexOf("?") === -1 ? "?" : "&") + "_=" + Date.now();
  }

  function columnIndexes(header) {
    var partner = PARTNER.toLowerCase();
    var norm = header.map(function (h) { return (h || "").toLowerCase().trim(); });
    var find = function (test) {
      for (var i = 0; i < norm.length; i++) if (test(norm[i])) return i;
      return -1;
    };
    return {
      park: Math.max(0, find(function (h) { return /park|name/.test(h); })),
      griffin: find(function (h) { return h.indexOf(partner) > -1 || /partner|together|both/.test(h); }),
      visited: find(function (h) { return /visit|been|seen/.test(h) && h.indexOf(partner) === -1 && !/partner|together|both/.test(h); }),
      year: find(function (h) { return /year|date|when/.test(h); }),
      notes: find(function (h) { return /note|comment|memo/.test(h); })
    };
  }

  function applyRows(rows) {
    var visits = {}, unmatched = [];
    if (!rows.length) return { visits: visits, unmatched: unmatched };
    var cols = columnIndexes(rows[0]);

    rows.slice(1).forEach(function (r) {
      var raw = (r[cols.park] || "").trim();
      if (!raw) return;
      var ids = lookup[normalize(raw)];
      if (!ids) { unmatched.push(raw); return; }
      var griffin = cols.griffin > -1 && isTruthy(r[cols.griffin]);
      var visited = cols.visited > -1 ? isTruthy(r[cols.visited]) : griffin;
      ids.forEach(function (id) {
        visits[id] = {
          visited: visited || griffin,   // with-partner implies visited
          griffin: griffin,
          year: cols.year > -1 ? (r[cols.year] || "").trim() : "",
          notes: cols.notes > -1 ? (r[cols.notes] || "").trim() : ""
        };
      });
    });
    return { visits: visits, unmatched: unmatched };
  }

  function setStatus(msg) { $("#syncStatus").textContent = msg; }

  function showNotice(html) {
    var n = $("#notice");
    if (!html) { n.hidden = true; n.innerHTML = ""; return; }
    n.innerHTML = html;
    n.hidden = false;
  }

  function load() {
    var url = sheetUrl();

    // Opened by double-clicking the file: the page has a file:// origin, and Google
    // (like every other host) refuses cross-origin reads from it. Nothing to retry.
    if (location.protocol === "file:") {
      showNotice(
        "<strong>This page is open from your hard drive, so it can't read the spreadsheet.</strong> " +
        "Browsers block <code>file://</code> pages from fetching anything over the network — this is " +
        "not a problem with your sheet or your URL. Open the site over http instead: either the live " +
        "GitHub Pages address, or run <code>python3 -m http.server 8000</code> in this folder and go to " +
        "<code>http://localhost:8000</code>.");
      setStatus("opened from disk");
      state.loaded = true;
      render();
      return;
    }

    if (!url) {
      showNotice(
        "<strong>No spreadsheet connected yet.</strong> Open <code>assets/js/config.js</code> and paste " +
        "your published Google Sheet CSV URL into <code>SHEET_CSV_URL</code>. " +
        "Until then every park shows as unvisited. (See the README for the three-step setup.)");
      setStatus("not connected");
      state.loaded = true;
      render();
      return;
    }
    setStatus("loading…");
    fetch(url, { cache: "no-store" })
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.text();
      })
      .then(function (text) {
        if (/^\s*</.test(text)) throw new Error("got HTML, not CSV");
        var result = applyRows(parseCSV(text));
        state.visits = result.visits;
        state.loaded = true;
        if (result.unmatched.length) {
          showNotice("<strong>" + result.unmatched.length + " row" + (result.unmatched.length > 1 ? "s" : "") +
            " in the sheet didn't match a park:</strong> " +
            result.unmatched.slice(0, 8).map(function (s) { return "<code>" + s + "</code>"; }).join(" ") +
            (result.unmatched.length > 8 ? " …" : "") + " — check the spelling against the seed CSV.");
        } else {
          showNotice("");
        }
        setStatus("updated " + new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }));
        render();
      })
      .catch(function (err) {
        state.loaded = true;
        var hint = /failed to fetch|networkerror|load failed/i.test(err.message)
          ? " — the request was blocked before it reached Google. Usual causes, in order: the page " +
            "isn't being served over http (see the README), the sheet is no longer <em>published to " +
            "the web</em>, or you're offline."
          : " — check that the sheet is still <em>published to the web</em> as CSV and that the URL in " +
            "<code>config.js</code> is the published one (it contains <code>/pub?</code>).";
        showNotice("<strong>Couldn't read the spreadsheet.</strong> " + err.message + hint);
        setStatus("sync failed");
        render();
      });
  }

  /* ---------------- state per park ---------------- */

  var NO_VISIT = { visited: false, griffin: false, year: "", notes: "" };
  function statusOf(park) { return state.visits[park.id] || NO_VISIT; }

  function matchesFilter(park) {
    var v = statusOf(park);
    if (state.filter === "visited") return v.visited;
    if (state.filter === "griffin") return v.griffin;
    return true;
  }

  /* ---------------- map ---------------- */

  var INSETS = [
    { label: "American Samoa", x: 408, y: 546, w: 124, h: 62 },
    { label: "U.S. Virgin Is.", x: 540, y: 546, w: 124, h: 62 }
  ];

  function buildMap() {
    var statesLayer = $("#statesLayer");
    (window.US_STATES || []).forEach(function (s) {
      statesLayer.appendChild(el("path", { d: s.d, "class": "state", "data-state": s.name }));
    });

    var insetLayer = $("#insetLayer");
    INSETS.forEach(function (box) {
      insetLayer.appendChild(el("rect", {
        x: box.x, y: box.y, width: box.w, height: box.h, rx: 10, "class": "inset-box"
      }));
      insetLayer.appendChild(el("text", {
        x: box.x + box.w / 2, y: box.y + box.h - 10, "text-anchor": "middle", "class": "inset-label"
      }, [box.label]));
    });

    var parksLayer = $("#parksLayer");
    PARKS.forEach(function (p) {
      var g = el("g", {
        "class": "pin", "data-id": p.id, tabindex: "0", role: "button", "aria-label": p.fullName
      }, [
        el("circle", { cx: p.x, cy: p.y, r: 13, "class": "pin-hit" }),
        el("circle", { cx: p.x, cy: p.y, r: 10, "class": "pin-ring" }),
        el("circle", { cx: p.x, cy: p.y, r: 6, "class": "pin-dot" }),
        el("text", { x: p.x, y: p.y - 15, "text-anchor": "middle", "class": "pin-label" }, [p.name])
      ]);
      g.addEventListener("click", function () { openDetail(p); });
      g.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openDetail(p); }
      });
      parksLayer.appendChild(g);
    });
  }

  function paintMap() {
    PARKS.forEach(function (p) {
      var g = $('.pin[data-id="' + p.id + '"]');
      if (!g) return;
      var v = statusOf(p);
      g.classList.toggle("is-visited", v.visited && !v.griffin);
      g.classList.toggle("is-griffin", v.griffin);
      g.hidden = !matchesFilter(p);
    });
  }

  /* ---------------- poster ---------------- */

  function emblem(park, cls) {
    var svg = el("svg", { viewBox: "0 0 100 100", "class": cls, "aria-hidden": "true" });
    svg.innerHTML = ICONS[park.id] || "";
    return svg;
  }

  var PARTNER_GLYPH =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 19c0-3 3-5 6.5-5s6.5 2 6.5 5zm14.2 0c-.2-2-1.3-3.6-2.9-4.6.7-.3 1.5-.4 2.2-.4 3.5 0 6.5 2 6.5 5z"/></svg>';

  function buildPoster() {
    var grid = $("#posterGrid");
    PARKS.forEach(function (p, i) {
      var tile = el("button", {
        type: "button", "class": "tile", "data-id": p.id,
        style: "--accent:var(--r-" + p.region + ")"
      }, [
        el("span", { "class": "tile-num" }, [String(i + 1).padStart(2, "0")]),
        emblem(p, "tile-emblem"),
        el("span", { "class": "tile-name" }, [p.name]),
        el("span", { "class": "tile-state" }, [p.abbr.join(" · ")])
      ]);
      var badge = el("span", { "class": "tile-badge", title: "Visited with " + PARTNER });
      badge.innerHTML = PARTNER_GLYPH;
      tile.appendChild(badge);
      tile.addEventListener("click", function () { openDetail(p); });
      grid.appendChild(tile);
    });
  }

  function paintPoster() {
    PARKS.forEach(function (p) {
      var tile = $('.tile[data-id="' + p.id + '"]');
      if (!tile) return;
      var v = statusOf(p);
      tile.classList.toggle("is-visited", v.visited);
      tile.classList.toggle("is-griffin", v.griffin);
      tile.hidden = !matchesFilter(p);
    });
  }

  /* ---------------- stats ---------------- */

  function paintStats() {
    var visited = PARKS.filter(function (p) { return statusOf(p).visited; }).length;
    var griffin = PARKS.filter(function (p) { return statusOf(p).griffin; }).length;
    var total = PARKS.length;
    $("#statVisited").textContent = visited + " / " + total;
    $("#statPct").textContent = Math.round((visited / total) * 100) + "%";
    $("#statGriffin").textContent = String(griffin);
    $("#progressBar").style.width = (visited / total * 100) + "%";
    $("#progressBarGriffin").style.width = (griffin / total * 100) + "%";
  }

  /* ---------------- detail dialog ---------------- */

  function openDetail(park) {
    var v = statusOf(park);
    var dlg = $("#detail");
    var body = $("#detailBody");
    var km2 = Math.round(park.acres * 0.00404686);
    var accent = "var(--r-" + park.region + ")";

    body.innerHTML = "";
    body.style.setProperty("--accent", accent);
    body.style.setProperty("--c1", v.visited ? accent : "#3d4661");
    body.style.setProperty("--c2", v.visited ? "color-mix(in srgb," + accent + " 55%,#0b0e15)" : "#2f3648");
    body.style.setProperty("--c3", v.visited ? "color-mix(in srgb," + accent + " 26%,#0a0d14)" : "#232a3a");
    body.style.setProperty("--c4", v.visited ? "#f6f8ff" : "#525d78");

    body.appendChild(el("div", { "class": "d-head" }, [
      emblem(park, "d-emblem"),
      el("div", {}, [
        el("h3", { "class": "d-title" }, [park.name]),
        el("p", { "class": "d-sub" }, [park.states.join(" · ")])
      ])
    ]));

    var tags = el("div", { "class": "d-tags" }, [
      el("span", { "class": "tag" + (v.visited ? " on" : "") }, [v.visited ? "Visited" : "Not yet"]),
      el("span", { "class": "tag" + (v.griffin ? " on g" : "") }, [(v.griffin ? "With " : "Without ") + PARTNER])
    ]);
    if (v.year) tags.appendChild(el("span", { "class": "tag" }, [v.year]));
    body.appendChild(tags);

    body.appendChild(el("dl", { "class": "d-rows" }, [
      el("dt", {}, ["Established"]), el("dd", {}, [park.established]),
      el("dt", {}, ["Area"]), el("dd", {}, [num(Math.round(park.acres)) + " acres (" + num(km2) + " km²)"]),
      el("dt", {}, ["Visitors"]), el("dd", {}, [num(park.visitors) + " in 2025"])
    ]));

    if (v.notes) body.appendChild(el("p", { "class": "d-note" }, [v.notes]));

    body.appendChild(el("a", {
      "class": "d-link", href: park.url, target: "_blank", rel: "noopener noreferrer"
    }, ["Open on nps.gov ↗"]));

    if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
  }

  /* ---------------- render + wiring ---------------- */

  function render() {
    paintMap();
    paintPoster();
    paintStats();
    $("#emptyState").hidden = PARKS.filter(matchesFilter).length > 0;
  }

  function setView(view) {
    state.view = view;
    $("#mapView").hidden = view !== "map";
    $("#posterView").hidden = view !== "poster";
    $$("[data-view]").forEach(function (b) { b.classList.toggle("is-active", b.dataset.view === view); });
    try { localStorage.setItem("np-view", view); } catch (e) { }
  }

  function setFilter(filter) {
    state.filter = filter;
    $$("[data-filter]").forEach(function (b) { b.classList.toggle("is-active", b.dataset.filter === filter); });
    try { localStorage.setItem("np-filter", filter); } catch (e) { }
    render();
  }

  function init() {
    if (CFG.TITLE) { $("#siteTitle").textContent = CFG.TITLE; document.title = CFG.TITLE; }
    if (CFG.SUBTITLE) $("#siteSubtitle").textContent = CFG.SUBTITLE;
    $$("[data-partner]").forEach(function (n) { n.textContent = PARTNER; });

    buildMap();
    buildPoster();

    $$("[data-view]").forEach(function (b) {
      b.addEventListener("click", function () { setView(b.dataset.view); });
    });
    $$("[data-filter]").forEach(function (b) {
      b.addEventListener("click", function () { setFilter(b.dataset.filter); });
    });
    $("#detailClose").addEventListener("click", function () { $("#detail").close(); });
    $("#detail").addEventListener("click", function (e) {
      if (e.target === e.currentTarget) e.currentTarget.close();   // click on backdrop
    });
    $("#refreshBtn").addEventListener("click", load);

    var savedView, savedFilter;
    try { savedView = localStorage.getItem("np-view"); savedFilter = localStorage.getItem("np-filter"); } catch (e) { }
    setView(savedView === "poster" ? "poster" : "map");
    setFilter(["visited", "griffin"].indexOf(savedFilter) > -1 ? savedFilter : "all");

    load();
    var mins = Number(CFG.REFRESH_MINUTES) || 0;
    if (mins > 0) setInterval(load, mins * 60 * 1000);
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden && state.loaded) load();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
