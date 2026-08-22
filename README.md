# National Parks

A single-page site showing all 63 US National Parks two ways — an **interactive map** and a
**scratch-off-style poster** — with the visited/not-visited data read live from a Google Sheet
you control.

Toggles: **Map / Poster** and **All / Visited / With Griffin**.

Everything is static HTML, CSS and vanilla JS. No build step, no backend, no dependencies.

---

## 1. Set up the spreadsheet

1. Open [Google Sheets](https://sheets.new) and **File → Import → Upload** the `parks-seed.csv`
   file in this repo. Choose **Replace spreadsheet**. You now have all 63 parks, one per row.
2. Tick your boxes. `TRUE`/`FALSE` works, and so does `x`, `yes`, `y`, `1`, or `✓`.
   Anything else counts as not visited.
3. **File → Share → Publish to web** → pick the sheet tab → change *Web page* to
   **Comma-separated values (.csv)** → **Publish**.
4. Copy the URL it gives you. It looks like:

   ```
   https://docs.google.com/spreadsheets/d/e/2PACX-1vT.../pub?gid=0&single=true&output=csv
   ```

5. Paste it into `assets/js/config.js`:

   ```js
   SHEET_CSV_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vT.../pub?gid=0&single=true&output=csv",
   ```

That's it. Edit the sheet, reload the page, the map updates. Google caches published sheets for
about five minutes, so a change can take that long to appear — the **Refresh from spreadsheet**
button at the bottom re-fetches, and the page also re-checks every five minutes on its own and
whenever you switch back to the tab.

> Publishing to the web makes that one sheet readable by anyone with the link. It does not expose
> your Google account or your other files. If you'd rather keep it fully private, commit a CSV to
> the repo instead and point `SHEET_CSV_URL` at `"parks.csv"` — the site reads either one.

### Columns

Only the park name matters for position; the rest are found by keyword, in any order:

| Column | Matched by | Notes |
|---|---|---|
| `Park` | `park` or `name` | Must match the official name — the seed CSV has them all |
| `Visited` | contains `visit`/`been`/`seen` | |
| `Visited With Griffin` | contains the partner name | Implies visited, even if the other box is blank |
| `Year` | contains `year`/`date`/`when` | Optional, shown on the park's card |
| `Notes` | contains `note`/`comment` | Optional, shown on the park's card |

Extra columns are ignored, so add whatever else you like. If a row's park name can't be matched,
a banner at the top of the page names it.

## 2. Publish it

Push to GitHub, then **Settings → Pages → Source: Deploy from a branch → `master` / root**.
The site is live at `https://<username>.github.io/national-parks/` in a minute or so.

To preview locally:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. (Opening `index.html` straight off disk won't work — the
browser blocks the fetch to Google from a `file://` page.)

## Troubleshooting

**"Couldn't read the spreadsheet. Failed to fetch"** — the page is almost certainly open from your
hard drive (the address bar starts with `file://`). Browsers refuse to let a `file://` page fetch
anything over the network, so this happens no matter how correctly the sheet is published. Serve
the folder over http instead (`python3 -m http.server 8000`, then `http://localhost:8000`) or use
the GitHub Pages URL. The page now detects this case and says so.

**A park shows as unvisited when the sheet says otherwise** — check the spelling in column A
against `parks-seed.csv`. Unmatched rows are listed in a banner at the top of the page.

**Edits aren't showing up** — Google caches published sheets for about five minutes. Hit
**Refresh from spreadsheet** at the bottom, or wait it out.

## 3. Make it yours

Everything you'd want to change is at the top of `assets/js/config.js`: the masthead title and
subtitle, the partner name used on the third toggle, and the refresh interval.

Colors live in the `:root` block at the top of `assets/css/styles.css` — `--visited` (teal) and
`--griffin` (pink) drive the map and stats, and the eight `--r-*` region colors tint the poster
emblems.

---

## What's in here

```
index.html               markup for both views
assets/css/styles.css    all styling
assets/js/config.js      ← the only file you need to edit
assets/js/app.js         CSV loading, name matching, rendering, filters
assets/js/data-parks.js  the 63 parks: names, states, coords, dates, area, visitors
assets/js/data-states.js US state outlines as SVG paths
assets/js/icons.js       one hand-drawn SVG emblem per park
parks-seed.csv           blank checklist to import into Sheets
```

Park facts come from Wikipedia's *List of national parks of the United States* (area as of 2023,
visitor counts 2025). Map geometry is the `us-atlas` 10m state outlines projected with d3-geo's
Albers USA, which folds Alaska and Hawaii into the lower-left; American Samoa and the US Virgin
Islands get their own inset boxes since that projection doesn't cover them.

Both data files are generated, so if the park list ever changes the honest fix is to regenerate
them rather than hand-edit — but adding one park by hand is just one more object in
`data-parks.js` (with `x`/`y` in the 1000×620 map viewBox) plus an entry in `icons.js`.
