# Technical SEO Findings — virtuosocatering.com — 2026-08-15 (post-deploy check)

Scope: what broke or was missed in today's batch (drawer/popup move, attribution.js,
caching, deploy reliability). Not re-verifying items the orchestrator already measured
(200s, drawer presence, heading outlines, duplicate ids, PSI deltas).

## a) Drawer/popup move — no regression found

- `views/partials/drawers.ejs` and `views/partials/popups.ejs` are each included exactly
  once, only from `views/partials/scripts.ejs`, which itself is included exactly once per
  view, immediately before `</body>`, in all 13 touched view files (`404, about, blog-post,
  blog, contact, index, landing, our-work, press, privacy-policy, services, social,
  team-member`). No double-include path exists.
- `aria-labelledby` pairs all resolve: `inquire-drawer-title`, `menu-drawer-title`,
  `entry-popup-title`, `exit-popup-title` each have exactly one matching `id` in
  `drawers.ejs`/`popups.ejs`.
- `views/partials/nav.ejs` (diffed against its last version) no longer contains any
  drawer/popup markup — clean removal, not a duplicate copy.
- `public/js/inquire-drawer.js`, `menu-download-drawer.js`, `popups.js` select every
  target via `document.getElementById`/global `querySelectorAll`, never scoped to
  `<header>` or `.site-nav`, so moving the markup out of `<header>` breaks nothing. No
  focus-trap logic exists in `inquire-drawer.js` (Escape-to-close and overlay-click only)
  — pre-existing, not introduced by this move.
- Storage keys don't collide: `attribution.js` uses `localStorage['vch_attribution']`;
  `popups.js` uses `sessionStorage['vch_entry_popup_seen']`, `vch_exit_popup_seen`,
  `vch_inquiry_sent'` — different storage areas and different key names.
- `README.md` still says "Inquire is a global slide-in drawer (markup lives in
  `views/partials/nav.ejs`...)" — stale, contradicts the move. Low priority, fix the doc.

## b) attribution.js — clean

- Loads first in the script chain, at the very end of `<body>` (after all visible
  content), no `async`/`defer` needed since nothing renders after it — not
  render-blocking. Live: `GET /js/attribution.js` → 200, 3,876 bytes, `application/x-javascript`.
- Both consumers guard with `typeof window.vchAttribution === 'function'`
  (`inquire-drawer.js:98`, `menu-download-drawer.js:93`), so a load failure degrades
  silently, no console error.
- Only touches `localStorage['vch_attribution']` and reads `location.search`/`referrer`;
  never writes to the URL.

## c) Static asset Cache-Control — still broken, confirmed today with live headers

`server.js:39-47` sets `Cache-Control` via `express.static`'s `setHeaders` (1yr+immutable
for images/fonts/svg/ico, 1wk for css/js). None of it reaches the browser:

| Path | Cache-Control | Evidence it bypassed Node |
|---|---|---|
| `/js/main.js`, `/css/bundle.css`, all 13 first-party JS files, both `.woff2` fonts, `/favicon.svg` | **absent** | no `x-powered-by`, no `content-security-policy`, no `platform`/`panel` header (all present on every Express-handled response) |
| `/images/*.jpg`, `*.png`, `*.webp` | `max-age=31536000, public` (no `immutable`) | same absence of Express headers — this is a Hostinger/hcdn platform default for raster image extensions, not the app's directive |
| Any 404 (`/css/does-not-exist.css`, `/this-page-does-not-exist`) | n/a | **does** carry `x-powered-by: Express` — proves Node is only reached when the static file doesn't exist |

Confirmed by direct curl against 16 live asset URLs today (15:02 UTC): zero of them carry
Express's intended header. Total weight shipping with no cache policy: `bundle.css`
55,498B + 13 first-party/vendor JS files 143,579B + 2 woff2 fonts 88,300B ≈ **287KB**
re-fetched every repeat visit. Root cause unchanged from prior audit: Hostinger's `hcdn`
edge serves `/public` straight from disk and never invokes the Node process for existing
files. This cannot be fixed from `server.js`; it needs a Hostinger-side static-cache rule
or hPanel setting. Did not re-run Lighthouse/PSI live in this pass — the header evidence
above is sufficient to predict "Use efficient cache lifetimes" still fires on every
css/js/font asset.

## d) Deploy reliability

- `git log -1`: HEAD = `a84af1c` at `2026-08-15T20:24:55+05:30`, matches `origin/main`
  (pushed, not stranded locally).
- Corroborating live evidence production is *now* on `a84af1c`: `server.js:16` calls
  `bundleCss()` on every boot, so `bundle.css`'s `Last-Modified` header is a boot-time
  fingerprint. Live: `bundle.css` → `14:55:28 GMT` = `20:25:28 IST`, ~1 min after the
  `a84af1c` commit — consistent with a fresh boot picking it up. `main.js`/`attribution.js`
  → `14:55:13 GMT`, 15s earlier in the same deploy. Fonts/`favicon.svg` → `14:02:29 GMT`
  (untouched since an earlier deploy, as expected — they aren't rewritten per boot).
- Observable deploy mechanism from outside: git push → Hostinger webhook → rebuild+restart
  Node (no build step per `package.json`). No commit SHA is exposed anywhere in headers or
  responses today.
- **Cheapest version marker (implement in `server.js`, no build step, no new
  dependency):**
  ```js
  const { execSync } = require('child_process');
  let commitSha = 'unknown';
  try { commitSha = execSync('git rev-parse HEAD').toString().trim(); } catch (e) {}
  const bootedAt = new Date().toISOString();
  app.get('/__version', (req, res) => res.json({ commitSha, bootedAt }));
  ```
  Works because Hostinger deploys via git push, so `.git` should be present on the
  server. `curl -s https://www.virtuosocatering.com/__version` then turns "is the deploy
  stalled" into a five-second check against `git rev-parse HEAD` locally. If `.git` turns
  out to be stripped in production, fall back to writing the SHA into a committed
  `VERSION` file as the last step before each push and reading that file instead — still
  no build step.

## e) Other

- Security headers: still no HSTS/`X-Content-Type-Options`/`X-Frame-Options` on any
  response (unchanged, deliberately out of scope per brief).
- No redirect chains found: `/`, all 9 pages tested, and the non-www host each resolve in
  0-1 hops (non-www → https+www via `server.js:52-57`).
- `robots.txt` and `sitemap.xml` unchanged and correct; not re-verified beyond a spot
  check (200, correct `Sitemap:` line).

Files referenced: `/Users/pallavgoel/Desktop/Website Virtuoso/server.js`,
`views/partials/{nav,drawers,popups,scripts}.ejs`, `public/js/attribution.js`,
`public/js/{inquire-drawer,menu-download-drawer,popups}.js`, `README.md`.
