# Performance & Core Web Vitals — virtuosocatering.com

**Category score: 70/100**

## Methodology

No PSI/CrUX credentials were available, so there is no field data here — everything below is lab-derived or read directly from source. Core Web Vitals (LCP/CLS/FCP/TTFB, transfer weights) came from a live Playwright+CDP session run in parallel by the audit coordinator against the production homepage; that data is attributed explicitly below. Everything else (file sizes, brotli-compressed sizes, line citations, response headers) I measured myself directly against this repo and, for headers, against the live site. **INP was not measured** (no synthetic-interaction test was run) — treated below as a source-derived risk only.

## Core Web Vitals (lab, live homepage, coordinator-measured)

| Metric | Desktop (1440×900, unthrottled) | Mobile (390×844, 4x CPU, ~1.6Mbps/150ms RTT) | Threshold | Status |
|---|---|---|---|---|
| TTFB | 330ms | — | — | Good |
| FCP | — | 1168ms | — | Good |
| LCP | 1024ms | **2492ms** (element: `<p>`, not the hero image) | ≤2500ms good | **Passes, but mobile margin is 8ms** |
| CLS | 0.001 | 0.071 | ≤0.1 good | Good |
| INP | not measured | not measured | ≤200ms good | Unknown — see risk note below |

Both LCP and CLS pass in this single lab run. Mobile LCP passes by 8 milliseconds against a 2500ms cutoff — that is not a comfortable margin, and the field 75th‑percentile (which this audit cannot see) is what Google actually grades against. The item most likely to erode that margin — 270–390KB of third-party script racing the hero image for bandwidth on a throttled connection — is the top finding below.

## Finding: third-party analytics is 88-90% of the site's script weight, all unshipped-off-critical-path

**Severity: High.** Coordinator's live capture: total scripts 439KB transferred; third-party 270KB+ of that (gtag.js 165.5KB + Meta Pixel's fbevents.js 104.8KB ≈ 270KB, which is very likely what "270KB" refers to) **plus** a chained "signals" config request fbevents.js pulls in at runtime (115.9KB) that isn't visible from source at all — bringing true third-party weight to roughly **386KB**. For comparison, the site's *entire* first-party JS — GSAP (72,214B) + ScrollTrigger (43,380B) + all 11 custom scripts — is ~130KB raw / ~46KB brotli-compressed (computed directly from `dist/js/`), smaller than the Meta Pixel alone.

Both tags load at the very top of `<head>`, ahead of the charset declaration:
- `views/partials/head.ejs:2` — `<script async src="https://www.googletagmanager.com/gtag/js?id=G-7D4B5HCKXQ">`, plus an inline config block (lines 3–8).
- `views/partials/head.ejs:11-27` — Meta Pixel inline bootstrap; it defines `fbq()` and calls `fbq('init', ...)`/`fbq('track','PageView')` immediately, then injects `fbevents.js` via `createElement` with `t.async=true` (line 16).
- `views/partials/head.ejs:34-35` — `<meta charset>` and `<meta viewport>` sit **after** both trackers.

Both scripts are technically `async`, so they don't block HTML parsing. But async only means "doesn't block the parser" — it doesn't mean free. Each opens a fresh connection to a domain the browser has no prior warm connection to, and each executes on the single main thread the instant it arrives, competing with the hero image decode, GSAP init, and the page's own interaction scripts (nav, inquire drawer). On the throttled mobile profile this is exactly the kind of load that can push a razor-thin 2492ms LCP over the line, and it's a plausible explanation for why the coordinator's mobile run recorded the LCP element as a text `<p>` rather than the hero image (see below) — the hero image likely hadn't finished decoding yet when the observer read out.

**Fix:** delay construction of both tags until `window.load` (or `requestIdleCallback`) rather than firing them in the render path of `<head>`. This doesn't reduce total bytes downloaded (tracking still needs to happen), but it removes ~386KB and its main-thread execution from the window that determines LCP/INP. GTM and Meta both support this pattern natively; it's a config change, not a rebuild.

## Finding: the site's own webp pipeline is correct but unshipped — CDN negotiation covers the gap at a 19% cost

**Severity: Medium** (downgraded from an earlier draft of this finding — see correction note). `scripts/optimize-images.js` generates a `.webp` sibling for all 63 raster originals already committed to the repo (`public/images`, `public/img`: originals 11.85MB → webp 4.40MB, 63% smaller). `scripts/html-post.js` correctly wraps every `<img>` in `<picture><source type="image/webp">`, backfills `width`/`height` from the image's own file header, and adds `fetchpriority="high"` to `loading="eager"` images. That logic is wired into `scripts/build.js` (its `postProcess()` call) and only `scripts/build.js` — i.e. only the `npm run build` → `dist/` pipeline that `netlify.toml` (`publish = "dist"`) targets. `dist/index.html` shows it working: `<picture><source srcset="/images/hero-candlelit-florals.webp" type="image/webp"><img fetchpriority="high" width="1586" height="992" src="/images/hero-candlelit-florals.jpg" ...>`.

Production is not that pipeline. `server.js` configures Express's EJS view engine directly against `views/` (`server.js:18-19`), and `routes/pages.js`'s `render()` helper (`routes/pages.js:10-18`) calls `res.render(page.view, {...})` straight off `views/*.ejs` for every route — `dist/`, `html-post.js`, and the `<picture>`/webp/fetchpriority logic are never in that path. This is confirmed live: `www.virtuosocatering.com` returns `x-powered-by: Express` and Hostinger `platform`/`panel` headers, not a static file server. `views/index.ejs:20` is the literal source of the hero markup: `<img src="<%= heroImage %>" alt="..." loading="eager">` — no `width`/`height`, no `fetchpriority`, no `<picture>`.

**Correction to an earlier version of this finding:** this does *not* mean webp goes unserved. I independently verified (live curl, unmodified `Accept` header) that requesting `/images/hero-candlelit-florals.webp` directly returns the pre-built file byte-for-byte (**103,724 bytes**, matching the repo file exactly). Hostinger's CDN separately does its own webp content-negotiation on the `.jpg` URL when a browser's `Accept` header asks for it — real visitors already receive webp for this image, just via the CDN's on-the-fly transcode (129,602 bytes per the coordinator's `Accept: image/webp` test) rather than the repo's pre-built one. That transcode is **19% larger** than the file already sitting in the repo, and the coordinator measured the same 19% gap (429KB vs 345KB, 83KB) across the 10 homepage images. So the real cost here is a ~19% image-weight tax, not a missing-webp emergency.

**Fix:** wire the Express render path to the same enhancement rather than trying to force production onto `dist/` (see recommendation below) — that closes both the CDN-transcode tax and the missing-dimensions/fetchpriority gap in one pass.

## Finding: missing width/height and fetchpriority on live-rendered images — a robustness gap, not an active CLS problem

**Severity: Medium.** Per the coordinator's live count, 116 of 154 images on the rendered homepage lack explicit `width`/`height`, and the hero `<img>` lacks `fetchpriority="high"` — both present in `dist/` (via `html-post.js`), neither present in what Express actually renders (`views/index.ejs:20` and equivalent `<img>` tags across `views/*.ejs`). Measured CLS is 0.001 desktop / 0.071 mobile — both comfortably "good" — so this is not currently causing a layout-shift problem; the CDN's consistent image behavior and the page's CSS (`hero__media` is absolutely positioned and pre-sized via `min-height: 100svh` on `.hero`, `public/css/hero.css:4-20`) are absorbing it. What it does remove is safety margin, and it's a likely contributor to the mobile LCP element being a `<p>` instead of the hero image: without `fetchpriority="high"`, the browser has no signal that this image outranks the third-party scripts and other requests in flight, so under throttling it can lose the priority race.

## Font loading

**Severity: Low.** Genuinely solid foundation: fonts are self-hosted (`public/css/fonts.css`), not fetched from Google Fonts or any third-party CDN, so there's no extra DNS/TLS handshake for typography. All three `@font-face` rules use `font-display: swap` (`fonts.css:13,20,30`), which avoids invisible text (FOIT) at the cost of a possible reflow when the swap happens (FOUT) — fallback stacks are declared (`public/css/variables.css:80-81`: `Georgia, serif` / `system-ui, sans-serif`) but without `size-adjust`/`ascent-override` metric matching, so a swap-triggered reflow is still possible on text-heavy areas, just not observed as CLS in this run.

One gap: only 2 of the 3 webfont files are preloaded (`views/partials/head.ejs:67-68` — `cormorant-300.woff2` and `worksans-300-400-500-600.woff2`). `cormorant-italic-400.woff2` (23,660 bytes) is not preloaded, yet it's the font used by `.preloader__mark` (`public/css/preloader.css:29` — `font-style: italic`), which is literally the first text a visitor sees. It gets discovered only when CSS parsing reaches that rule, rather than in parallel with the other two fonts from the start of the page load.

## Caching headers on static assets

**Severity: High.** Live-verified (unmodified `curl -I`, requests that returned normal 200s with full Hostinger/hcdn headers, not the WAF-blocked responses I got later when adding custom headers too fast — noted for transparency):

| Asset | Cache-Control | Notes |
|---|---|---|
| `/css/bundle.css` | **absent** | Last-Modified only |
| `/js/main.js` | **absent** | Last-Modified only |
| `/images/hero-candlelit-florals.jpg` | `public, max-age=31536000` | 1 year — good |
| `/images/hero-candlelit-florals.webp` | **absent** | Last-Modified only, despite being the smaller/preferred asset |
| `/fonts/worksans-300-400-500-600.woff2` | **absent** | Last-Modified only |

CSS, JS, webp images, and woff2 fonts get no browser caching at all in production — only conditional revalidation via `Last-Modified`, which still costs a round trip on every repeat visit. Root cause: `server.js:23` mounts `express.static(path.join(__dirname, 'public'))` with no options, so Express applies no explicit cache policy. The actual caching scheme this site was clearly designed to have — 1 year for images/fonts, 7 days for CSS/JS, `text/html` never cached — is fully written out in `scripts/build.js:86-119` (`writeHtaccess()`), but it's emitted to `dist/.htaccess`, a file only an Apache/LiteSpeed static host reads. Production is Express on Hostinger, so that file is dead weight; it never executes. The JPG's 1-year cache-control most likely comes from Hostinger's own CDN edge rules for that extension, not from anything in this codebase — which is also why webp and woff2, less common in older CDN extension allow-lists, get nothing.

## Render-blocking CSS

**Severity: Low.** `public/css/bundle.css` (55,498 bytes minified, **8,916 bytes brotli** — computed directly against the shipped file) is a single render-blocking `<link rel="stylesheet">` (`views/partials/head.ejs:69`), positioned after both third-party script tags and the two font preloads. At <9KB compressed this isn't the bottleneck; the third-party requests ahead of it are.

## What works well

- CLS is genuinely well controlled at both breakpoints (0.001 / 0.071) — the hero's absolutely-positioned, viewport-sized media container is doing its job even without explicit image dimensions.
- Fonts are self-hosted with `font-display: swap` — no third-party font CDN, no FOIT.
- CSS is already bundled into one request via `scripts/bundle-css.js`, and it's small once compressed.
- The image-optimization pipeline (`scripts/optimize-images.js`) is correctly built, committed, and does real work (63% size reduction) — it's an unshipped-to-production problem, not a missing-capability problem.
- `dist/index.html` proves the fix for the dimensions/fetchpriority/picture gap already exists and works; it just needs to run in the path that's actually live.
- TTFB (330ms desktop) and brotli compression on HTML are both healthy.

## Recommendations, prioritized by expected impact

1. **Defer gtag.js and the Meta Pixel bootstrap off the critical path** (`views/partials/head.ejs:1-31`) — load both after `window.load`/idle instead of eagerly in `<head>`. Removes ~386KB of script and its execution from the window that determines LCP/INP, at zero cost to tracking completeness.
2. **Add explicit Cache-Control to Express's static serving** — `express.static(publicDir, { maxAge: '7d' })` as the default, with a longer `maxAge: '1y', immutable: true` mount for `/images`, `/img`, `/fonts`. This directly closes the gap measured above and mirrors the intent already documented in `scripts/build.js`'s `writeHtaccess()`.
3. **Move `html-post.js`'s logic into the Express render path**, not the other way around. Production needs to stay dynamic — `routes/pages.js:73-132` handles a live form POST (`sendInquiry`, Meta Conversions API via `utils/metaCapi.js`) that a static host can't run as-is, and `netlify.toml`'s Netlify Functions redirect for `/api/*` confirms `dist/` was built for a *different* serverless architecture, not a drop-in replacement. Extract the pure functions from `scripts/html-post.js` (dimension-reading, the `<img>` rewrite) into a shared module, run it once at server boot the same way `bundleCss()` already runs at boot (`server.js:16`) with dimensions cached in memory, and apply it to `res.render()` output. That fixes the dimensions/fetchpriority/picture gap without adding per-request disk I/O to TTFB, and it means `dist/` and the live site stop silently diverging.
4. **Preload `cormorant-italic-400.woff2`** or stop using italic Cormorant on first-paint content (the preloader mark), so all three fonts race in parallel from navigation start.

## Confirm/refute of the original root-cause chain

Confirmed from source: the image-pipeline split (built correctly in `scripts/`, applied only to `dist/`, never reaching the live Express-rendered pages) is real and precisely as described, verified via `server.js:18-23`, `routes/pages.js:10-18`, and `views/index.ejs:20`. Refuted/corrected: webp is not "never served" — Hostinger's CDN content-negotiates it live; the real cost is a 19% size penalty from CDN transcode versus the repo's own pre-built file, not a missing-format emergency. The width/height and fetchpriority gaps are real but are a robustness/margin issue, not an active CLS failure, given measured CLS already passes at both breakpoints.
