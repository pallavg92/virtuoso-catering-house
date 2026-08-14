# Technical SEO Audit — virtuosocatering.com

Date: 2026-08-14
Scope: All 38 URLs in `virtuosocatering.com-audit/sitemap-urls.txt`. Methodology: direct HTTP checks (SSRF/DNS-rebinding-guarded `fetch_page()` from `.claude/skills/seo/scripts/`, `sitemap_discovery.py`, `preload_check.py`, `indexnow_submit.py`) cross-referenced against the source of truth in this repo (`server.js`, `routes/`, `utils/`, `views/`, `netlify.toml`, `dist/.htaccess`). No PageSpeed/CrUX/GSC/Moz/Bing credentials are configured; every Core Web Vitals statement below is lab/source-level only and is labeled as such.

**Overall Technical SEO score: 67/100**

| Category | Score | Status |
|---|---|---|
| Crawlability | 92 | Pass |
| Indexability | 85 | Pass, with gaps |
| Security headers | 30 | Fail |
| URL structure | 75 | Pass, with gaps |
| Mobile | 85 | Pass |
| Core Web Vitals (source-level) | 50 | Needs improvement |
| Structured data | 92 | Pass |
| JavaScript rendering | 95 | Pass |
| IndexNow | 0 | Not implemented |

---

## Headline finding: two deploy paths exist, and only one is live — several SEO fixes already written into the codebase never reach production

Live response headers on every request (`X-Powered-By: Express`, `platform: hostinger`, `panel: hpanel`, `Server: hcdn`) confirm `www.virtuosocatering.com` is served **directly by the Express app** (`server.js` + `routes/pages.js`) on Hostinger's Node hosting, behind Hostinger's `hcdn` edge.

The repo also contains a second, static build path: `scripts/build.js` renders every view to `dist/*.html` and writes `dist/.htaccess` (Apache/LiteSpeed rewrite rules + headers), and `netlify.toml` points a `publish = "dist"` build at Netlify. That path is not what answers requests on the live domain — confirmed because `.htaccess` directives have no effect on an Express-served response, and I verified this live (below) on all three things it's supposed to control. Concretely:

1. **Sitemap freshness signal is wrong in production.** `routes/pages.js:20-31` generates `/sitemap.xml` at request time and stamps every URL with `new Date().toISOString().slice(0,10)` — i.e. today, for all 38 URLs, on every request. Live fetch of `https://www.virtuosocatering.com/sitemap.xml` on 2026-08-14 confirms this: all 38 `<lastmod>` values are `2026-08-14`, and there are no `<image:image>` entries. `scripts/build.js:160-185` (`writeSitemap()`) does this correctly — it uses each page's real `lastmod` or falls back to blog post dates, and includes an image sitemap — and its own code comment even explains why (`scripts/build.js:166-169`: *"Stamping every URL with the build date told Google all 37 pages changed on every deploy... which is how a site teaches Google to ignore its lastmod altogether"*). That fix exists but ships only to `dist/sitemap.xml`, which nothing serves. **The live sitemap has exactly the anti-pattern the code was written to avoid.**
2. **The `/lp/` noindex header never fires.** `scripts/build.js:135-142` writes `dist/lp/.htaccess` with `Header set X-Robots-Tag "noindex, nofollow"` as a "belt-and-braces" backup to the in-page meta tag. Live fetch of `https://www.virtuosocatering.com/lp/first-birthday` shows no `X-Robots-Tag` header at all (full header list: `Connection, Content-Encoding, Content-Type, Date, Server, Transfer-Encoding, Vary, alt-svc, content-security-policy, etag, panel, platform, x-hcdn-cache-status, x-hcdn-request-id, x-hcdn-upstream-rt, x-powered-by`). Not a live risk today — the in-HTML `<meta name="robots" content="noindex">` (`views/partials/head.ejs:44-48`, confirmed present in the fetched HTML) still does the job — but the header is dead code.
3. **Static-asset caching never fires.** `dist/.htaccess:36-46` sets 1-year `Cache-Control` on images/fonts and 7-day on CSS/JS. Live checks (repeated 3x each, no flakiness) show `/css/bundle.css`, `/js/main.js`, `/favicon.svg`, and `/fonts/cormorant-300.woff2` all return **no `Cache-Control` header at all**. `server.js:20` mounts `express.static(path.join(__dirname, 'public'))` with no options, so Express's default `maxAge: 0` applies — it never sets `Cache-Control` for any static file type. (Images are the exception: `/images/founder-pallav-goel.jpg` returned `Cache-Control: max-age=31536000, public` — that's a Hostinger `hcdn` default-by-file-type rule, not anything the app sets, and it doesn't cover CSS/JS/fonts.)

**Recommendation:** either (a) stop generating `dist/` for this domain and delete the now-misleading `.htaccess`-based logic, or (b) point `routes/pages.js`'s `/sitemap.xml` handler at the same `lastmod`/image logic `scripts/build.js` already has, and add real header-setting middleware to `server.js` for the `/lp/` noindex header and static-asset `Cache-Control` (e.g. `express.static(dir, { maxAge: '7d' })` for `/css` and `/js`, longer for `/fonts`). This single fix closes three separate findings below.

---

## 1. Crawlability — Pass (92/100)

- **robots.txt validated, not just declared.** `public/robots.txt` / `dist/robots.txt` (identical, 4 lines): `User-agent: *`, `Allow: /`, `Sitemap: https://www.virtuosocatering.com/sitemap.xml`. Ran `sitemap_discovery.py https://www.virtuosocatering.com --json`: the declared sitemap was fetched and validated — `status_code: 200`, `kind: urlset`, `valid: true`. This is a genuine pass, not a stale declaration. Common fallback paths (`/sitemap_index.xml`, `/sitemap-index.xml`, `/wp-sitemap.xml`) were also checked and correctly return 404 (no orphaned legacy sitemap).
- **No accidental blocking.** `meta_robots` was `null` (default index,follow) on all 38 sitemap URLs, confirmed by direct regex extraction of live HTML on every one of them. No `X-Robots-Tag` header was observed on any indexable URL.
- **`/lp/` paid landers are correctly excluded from discovery**, not just noindexed: `excludeFromSitemap: true` on both `lpFirstBirthday` and `lpFirstBirthdayThanks` (`utils/pageMeta.js:204,214`), and both are absent from the live 38-URL sitemap. The in-page noindex meta tag (see architecture finding above) still functions correctly even though the header backup doesn't.
- **No AI-crawler blocks.** `public/robots.txt` has a single blanket `User-agent: * / Allow: /` rule with no bot-specific tokens (no `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `CCBot`, `Bytespider` entries) — every AI crawler is implicitly allowed. Given AI-visibility is a stated strategic priority for this business, this is the correct default and needs no change.
- **Sitemap freshness signal is broken in production** — see architecture finding above (Medium-High: undermines Google's recrawl prioritization over time, though it does not block indexing today).
- **IndexNow is entirely absent** — scored separately below.

## 2. Indexability — Pass, with gaps (85/100)

- **Canonicals: clean across the board.** All 38 sitemap URLs return a self-referencing `<link rel="canonical">` matching their own final URL (verified independently; matches the orchestrator's parallel crawl in `virtuosocatering.com-audit/onpage-data.json`, which I cross-checked programmatically: 0 canonical/final-URL mismatches across all 38 rows).
- **Query strings are stripped correctly.** `https://www.virtuosocatering.com/?utm_source=test` → 200, canonical still reads `https://www.virtuosocatering.com/` (clean, no tracking param). Pass.
- **`/index.html` does not exist as a second URL for the homepage** — returns a real 404, avoiding the classic `/` vs `/index.html` duplicate-content trap.
- **Trailing-slash and case variants are 200, not redirected — indexability relies entirely on the canonical tag.** Express's default router is case-insensitive and slash-insensitive, so `/about/`, `/About`, and `/about` all return HTTP 200 with identical content. The canonical tag self-corrects on the non-canonical variants (`/about/` and `/About` both emit `<link rel="canonical" href="https://www.virtuosocatering.com/about">`, computed from the static `page.path` in `utils/pageMeta.js`, not from the request), so Google should consolidate correctly — but nothing stops these duplicate URLs from being crawled and indexed as separate entries if a stray backlink or internal typo ever points at one, since there's no 301 forcing the issue. Medium: a small rewrite/redirect (case + trailing slash → canonical form) would make consolidation a certainty instead of a signal Google has to honor.
- **404 page has an unusual self-referencing canonical.** `server.js`'s catch-all 404 handler sets `canonicalUrl: siteUrl + req.originalUrl` (i.e., the broken URL points to itself as canonical) and the 404 template (`views/404.ejs`) carries no `<meta name="robots" content="noindex">` at all — 404 status alone is the operative signal here and Google explicitly drops 4xx pages from the index regardless of on-page tags, so this is Low severity, but a canonical tag on a page that by definition doesn't exist is not meaningful and is worth removing.
- **No thin-content or duplicate-title/description issues found** in the 38-URL set (0 duplicates, 0 missing, per the orchestrator's independent crawl at `virtuosocatering.com-audit/onpage-data.json`, which I verified programmatically rather than taking on faith).
- **No hreflang anywhere** (confirmed empty on all 38 URLs) — correct and expected for a single-locale (en-IN, Delhi NCR only) business; not a gap.

## 3. Security — Fail (30/100)

- **The application sets zero security headers.** Grepped the entire codebase for `Content-Security-Policy`, `Strict-Transport-Security`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` — no matches in `server.js`, `routes/`, `views/`, `netlify.toml`, or `dist/.htaccess`. No `helmet` (or equivalent) middleware; `package.json` dependencies are only `dotenv`, `ejs`, `express`, `nodemailer`. No Netlify `_headers` file exists anywhere in the repo.
- **`Content-Security-Policy: upgrade-insecure-requests` is present on live responses, but it is platform-injected (Hostinger), not app-set, and it is delivered inconsistently.** It is the only security-relevant header ever observed, on any of the 60+ live requests made during this audit. Repeating the same request (`/about`, 10x) shows the header — along with `X-Powered-By: Express` — present or absent in correlation with `x-hcdn-upstream-rt`: **~0.37s round-trips carry the header; ~0.13s round-trips do not** (6/10 present, 4/10 absent in that run). This points to a faster edge/shield tier in Hostinger's `hcdn` CDN that reconstructs responses without forwarding the origin's header. Net effect: **roughly 40-60% of real requests — including, plausibly, crawler and security-scanner requests — receive zero security headers of any kind**, not even the minimal one.
- **Confirmed absent on every single request across the full audit** (38 sitemap URLs + repeated `/about` + `/,` non-www/HTTP variants + `/lp/*` + 404 + static assets): `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-XSS-Protection`. None were observed even once.
- **No HSTS despite a live, working HTTP entry point.** `http://virtuosocatering.com/` and `http://www.virtuosocatering.com/` both correctly get upgraded to HTTPS (redirect chains below), but the HTTPS responses that browsers land on never carry `Strict-Transport-Security`, so a browser has no instruction to skip HTTP entirely on the next visit — every first-touch (ads, print collateral, WhatsApp-shared bare-domain links, which are plausible for a luxury catering business's referral traffic) round-trips through at least one plaintext hop.
- **CSP is not a real Content-Security-Policy.** `upgrade-insecure-requests` alone permits any script/style/frame source; it provides no XSS or clickjacking mitigation on its own (that's `X-Frame-Options`/`frame-ancestors`, which is also absent).
- Per current Google guidance, security headers are a lightweight/indirect ranking factor (HTTPS itself affects <1% of queries; page experience is not a unified ranking system) — this is scored as a hardening/trust gap, not a projected ranking loss, but it is the single most actionable, zero-ambiguity fix available on this site: add one middleware block in `server.js`.

## 4. URL Structure — Pass, with gaps (75/100)

- **URLs are clean, descriptive, hyphenated, no query params in the canonical set** (`/wedding-caterers-in-delhi`, `/blog/how-luxury-wedding-caterers-build-custom-menu`, etc.).
- **Host/scheme canonicalization works end-to-end, verified live for every combination:**

| Entry point | Result | Hops |
|---|---|---|
| `https://www.virtuosocatering.com/` | 200 direct | 0 |
| `https://virtuosocatering.com/` | 301 → www | 1 |
| `http://www.virtuosocatering.com/` | 301 → https | 1 |
| `http://virtuosocatering.com/` | 301 → `https://virtuosocatering.com/` → 301 → `https://www.virtuosocatering.com/` | **2** |
| `http://virtuosocatering.com/services` | same 2-hop pattern | **2** |

The non-www→www hop is app-level (`server.js:24-29`, explicit middleware with a code comment about Google previously splitting ranking signal across both hosts). The HTTP→HTTPS hop happens first and is platform-level (Hostinger), not in this codebase. Combined, the worst-case entry (bare HTTP, non-www — plausible for offline/verbal referrals to a catering business) is a **2-redirect chain**, exceeding the "max 1 hop" best practice. Medium: collapsing this to a single hop (redirecting `http://virtuosocatering.com/*` straight to `https://www.virtuosocatering.com/*`) needs a host-level rule, since Express only sees the request after the platform's HTTPS upgrade has already happened once.
- **Legacy redirects are comprehensive and verified live**, not just declared: tested `/about-us`, `/contact-us`, `/gallery`, `/menu`, `/blogs`, `/thank-you`, a 3-level-deep legacy WordPress path (`/luxury-brand-event-catering-delhi-ncr/luxury-automotive-event-catering-delhi-ncr/lamborghini-temerario-launch-catering-delhi-2025`), and a legacy WordPress PDF path (`/wp-content/uploads/2025/04/Virtuoso-Menu-Chefs-Special-Most-Loved.pdf` → `/downloads/virtuoso-catering-house-menu.pdf`, `Content-Type: application/pdf`) — all 301, all land on the correct live page. `utils/redirects.js` is shared by both `routes/pages.js` (live) and `scripts/build.js` (dist-only), so unlike the three issues above, **this piece is correctly live in production.**
- **Trailing-slash and case-variant URLs are not redirected** — same underlying issue as the Indexability finding above (200 instead of 301). Repeated here because it's as much a URL-structure defect as an indexability one.
- **404 handling is correct**: a genuinely nonexistent URL (`/this-page-does-not-exist-xyz-123`) returns a real HTTP 404 (not a soft-200), confirmed with a full custom 404 page (`views/404.ejs`) rather than a generic host error. A malformed double-slash URL (`//about`) also correctly 404s rather than silently resolving.

## 5. Mobile — Pass (85/100)

- **Viewport meta tag is correct and present on all 38 pages**: `<meta name="viewport" content="width=device-width, initial-scale=1.0">` (`views/partials/head.ejs:35`), confirmed via live regex extraction on every sitemap URL with no exceptions.
- **Responsive CSS is substantial, not an afterthought**: `public/css/pages.css` alone has 12 `@media` blocks; `sections.css` has 5; `footer.css` and `nav.css` have 3 each; every stylesheet in `public/css/` except `fonts.css`, `preloader.css`, and `typography.css` has at least one breakpoint.
- **Touch targets are a deliberate design decision, not an accident**: `public/css/sections.css:12-18` — `.btn { min-height: 44px; ... }` with an explicit code comment: *"44px minimum target, met by padding rather than a filled box."* This is Apple HIG's 44px standard; Google/WCAG 2.2 recommends 48px. 4px under the stricter guideline — Low, and can't be fully confirmed without a rendered/device check of final padded dimensions and inter-element spacing (needs field confirmation).
- Not verified without field/lab tooling (no PageSpeed/Lighthouse mobile run available): actual rendered tap-target spacing, font-size computed values, and horizontal-scroll absence on real viewports. Source inspection found no obvious horizontal-overflow patterns (no fixed-width elements wider than viewport spotted in the CSS reviewed), but this needs a rendered check to confirm.

## 6. Core Web Vitals — source/lab-level only, Needs improvement (50/100)

No CrUX/PageSpeed credentials are configured (confirmed: `lcp_subparts.py` requires the CrUX API, not attempted). Everything below is static-source or lab-tool inspection; **field data is required to confirm actual LCP/INP/CLS.**

- **`preload_check.py https://www.virtuosocatering.com/ --json` scored 50/100.** Findings: `lcp_resource_hints: { preload_lcp_candidate: false, fetchpriority_high: 0 }`; explicit recommendation: *"Mark the LCP hero image with fetchpriority=\"high\" so the browser preloads it ahead of other resources."* Also flagged: no Speculation Rules (`inline_blocks: 0, header_present: false`) — a same-origin prerender/prefetch rule would improve next-navigation paint but isn't in place.
- **Homepage hero image (likely LCP element) is not lazy-loaded (good) but is not prioritized either**: `views/index.ejs:20` — `<img src="<%= heroImage %>" alt="..." loading="eager">` — no `fetchpriority="high"`, no `width`/`height` attributes, and it is not among the two `<link rel="preload">` entries in `<head>` (`views/partials/head.ejs:67-68`, which preload only the two font files). Partial mitigation: `public/css/hero.css` gives `.hero` a fixed `min-height: 100svh` container, so the missing image dimensions are less likely to cause a layout shift than they would in an unsized container — but LCP timing itself (when the hero image starts downloading) is not helped.
- **No `Cache-Control` on render-critical assets in production** — CSS, JS, and the two preloaded web fonts all return no caching header at all (verified live, repeated 3x per asset, no variance — see architecture finding above). This penalizes repeat-visit load time specifically for the resources that gate first paint and LCP text rendering.
- **Fonts are preloaded correctly** (`views/partials/head.ejs:67-68`, two `woff2` files, `font-display: swap` set in `@font-face` per `public/css/fonts.css`/bundle) — reduces invisible-text risk, a positive for LCP/CLS.
- **Compression is active** (Brotli or gzip depending on edge, confirmed via `Content-Encoding: br` in one capture and `gzip` in others — negotiated by the `hcdn` layer, not app code, since no `compression` package is in `package.json`).
- **INP**: nothing in source inspection points to long-task risk — no heavy client frameworks, JS is small discrete files for nav/cursor/popups/animations (see JS Rendering section) — but INP is an interaction metric that fundamentally requires field data; not assessable from source alone.
- **Image weight**: spot-checked `/images/founder-pallav-goel.jpg` at 299,811 bytes (293KB) for what is presumably a headshot-scale image on the team page — worth a resize/compression pass, though this single sample isn't a sitewide image-weight audit (the orchestrator's parallel crawl already covers `alt`/dimension attributes across all 154 `<img>` tags: 38 missing `alt`, 116 missing explicit `width`/`height`, 79 using `loading="lazy"` — I did not re-derive these, I verified the arithmetic against `virtuosocatering.com-audit/onpage-data.json` directly and it checks out).

## 7. Structured Data — Pass (92/100)

- **Sitewide JSON-LD via `views/partials/head.ejs`, confirmed valid on a live fetch of the homepage** (2 blocks, both `valid: true`: `LocalBusiness`/`FoodEstablishment` with nested `PostalAddress` and `GeoCoordinates`, plus `Organization` with nested `PostalAddress`).
- **Well-architected entity linking, not just boilerplate schema**: blog posts (`BlogPosting`, `views/partials/head.ejs:128-145`) reference the author as a bare `@id` pointing at `/team/pallav-goel#person` rather than inlining a duplicate `Person` node each time, and `publisher` similarly references the single `Organization` `@id` — a code comment explains this is deliberate ("every post reinforces one entity instead of describing a new one each time"). `dateModified` falls back to `datePublished`, never a build timestamp (verified against the sitemap freshness anti-pattern above — this file explicitly avoids the mistake the sitemap route makes).
- **Additional schema present and scoped correctly**: `Service` schema on commercial landing pages tied to the `areaServed` city and the organization provider (`head.ejs:148-164`); `BreadcrumbList` only emitted when there's more than one crumb (`head.ejs:166-181`); `FAQPage` on blog posts and landing pages that carry FAQ content (`views/blog-post.ejs:146`, `views/landing.ejs:261`); `Person` schema on the team page and referenced from `/about` (`views/team-member.ejs:79`, `views/about.ejs:126`).
- Not independently re-validated against schema.org/Rich Results beyond the homepage's 2 blocks (no Schema Markup Validator credential in this environment) — the templating pattern is consistent enough across files that I'd expect the other page types to validate the same way, but that's an inference from source, not a live check of every page type.

## 8. JavaScript Rendering — Pass (95/100)

- **Server-side rendered, not a client-rendered SPA.** `app.set('view engine', 'ejs')` + `res.render(...)` (`server.js:19`, `routes/pages.js:10-18`) — classic template-per-request SSR, no hydration framework.
- **Confirmed via headless-render comparison**: `render_page.py` on the homepage reports `is_spa: false`, `mode_used: raw` (i.e., it didn't even need to fall back to Playwright), and `trafilatura` successfully extracted substantial body copy directly from the raw HTTP response (`extracted_text` field: full hero copy, service descriptions, etc., present verbatim).
- **All SEO-critical elements are present in raw HTML with no JS execution required**: title, canonical, meta description, meta robots, and JSON-LD were all extracted via plain regex against the raw `fetch_page()` response for all 38 URLs — none of them needed rendering to appear.
- **Client-side JS is progressive enhancement only**: `views/partials/scripts.ejs` loads GSAP/ScrollTrigger plus discrete files (`nav.js`, `cursor.js`, `preloader.js`, `popups.js`, `inquire-drawer.js`, `menu-download-drawer.js`, conditionally `menu-filter.js`/`testimonials.js`/`timeline.js`) — animation, nav toggle, drawers, and form interactions, not content rendering.
- **No back-button-hijacking patterns** (a Critical-severity spam-policy item as of 2026-06-15 enforcement): grepped all of `public/js/*.js` (excluding vendor) for `pushState`, `replaceState`, `beforeunload`, `unload` — zero matches.
- Not checked: whether any third-party tag (GA4, Meta Pixel — both present, both standard/expected) injects history manipulation client-side at runtime; source-level grep only covers this repo's own JS.

## 9. IndexNow Protocol — Not implemented (0/100)

- Ran `indexnow_submit.py --host www.virtuosocatering.com --verify-only` — failed immediately: *"--key and --key-location required (or set env vars)."* No `INDEXNOW_KEY`/`INDEXNOW_KEY_LOCATION` in `.env`, `.env.example`, or anywhere else.
- Grepped the full repo for `indexnow` (case-insensitive, excluding the tooling itself) — zero matches. No key file in `public/`, no submission call in `netlify/functions/`, `routes/`, or `scripts/`.
- Bing/Yandex/Naver would currently only discover new/changed URLs via the sitemap (itself weakened by the freshness-signal bug above) and normal crawling — not via push notification. This is the one category with no code to point to at all; everything else on this list is a partially-working or misconfigured feature, this one simply doesn't exist yet.

---

## Prioritized Issues

**Critical**
- None. Nothing found blocks indexing, crawling, or renders the site inaccessible.

**High**
1. **No security headers of any kind are set by the application** — `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` are absent from every one of 60+ live requests across the full URL set; the one header that does appear (`Content-Security-Policy: upgrade-insecure-requests`) is platform-injected, offers no real XSS/clickjacking protection, and is missing on an estimated 40-60% of requests due to CDN edge variance. Fix: add header-setting middleware in `server.js` (no dependency needed — a handful of `res.setHeader` calls, or add `helmet`).
2. **Live sitemap.xml lastmod is wrong for all 38 URLs** — every URL is stamped with the current date on every request (`routes/pages.js:20-31`), the exact anti-pattern the codebase's own `scripts/build.js` was written to avoid, but that fix never reaches production. Fix: point the live `/sitemap.xml` route at the same per-page `lastmod` data `scripts/build.js` already uses.
3. **Static assets (CSS, JS, fonts) ship with zero `Cache-Control` in production** — verified live and reproducible; this specifically hits the two preloaded web fonts and the render-blocking stylesheet, which are on the LCP critical path. Fix: `express.static(dir, { maxAge: ... })` per asset type in `server.js`, matching the values already designed (and unused) in `dist/.htaccess`.

**Medium**
4. **2-hop redirect chain on the bare-HTTP, non-www entry point** (`http://virtuosocatering.com/*` → `https://virtuosocatering.com/*` → `https://www.virtuosocatering.com/*`), exceeding the 1-hop best practice. Needs a host-level (Hostinger) rule change, not just an app change.
5. **Trailing-slash and case-variant URLs (`/about/`, `/About`) return 200 instead of 301**, relying entirely on the canonical tag rather than a redirect to prevent duplicate indexing. Low practical risk today (no internal links use these forms) but not guaranteed.
6. **No HSTS despite a working HTTP entry point** — every first-touch visit via a bare/HTTP link can round-trip through plaintext before landing on HTTPS.
7. **LCP hero image has no `fetchpriority="high"` and is not preloaded** — flagged directly by `preload_check.py` (score 50/100). Only the two web fonts are preloaded.
8. **IndexNow is not implemented** — no key file, no submission automation, for Bing/Yandex/Naver.

**Low**
9. `/lp/*` paid landers' `X-Robots-Tag: noindex` header (`dist/lp/.htaccess`) never fires in production; not a live risk because the in-HTML `<meta name="robots" content="noindex">` still works, but it's dead code that should either be wired into `server.js` or removed.
10. 404 page carries a self-referencing `<link rel="canonical">` pointing at the nonexistent URL and no `<meta name="robots" content="noindex">` — inert given the real 404 status code, but not meaningful and worth deleting.
11. `.btn` touch targets are `min-height: 44px` by deliberate design (documented in a code comment) — 4px under Google/WCAG 2.2's 48px recommendation; needs a rendered/device check to confirm actual padded size and spacing.
12. One spot-checked image (`/images/founder-pallav-goel.jpg`, 293KB) is heavy for its likely use; not a sitewide finding on its own.

## What Works

- robots.txt sitemap declaration independently validated (not just present) by `sitemap_discovery.py` — real 200, valid `urlset`.
- All 38 sitemap URLs return 200 with self-referencing canonicals, single H1, and no accidental `noindex`/`X-Robots-Tag`.
- Legacy WordPress URL migration is thorough and verified live end-to-end, including a 3-level-deep nested legacy path and a legacy PDF, all landing on the right live page via 301.
- non-www → www and HTTP → HTTPS canonicalization both work (just not in a single hop).
- Query-string variants correctly canonicalize to the clean URL.
- Paid-traffic `/lp/` landers are excluded from the sitemap and correctly noindexed in-page.
- The site is genuinely server-rendered: all SEO-critical elements (title, canonical, meta description, meta robots, JSON-LD, body copy) are present in raw HTML with zero JS execution required, confirmed via headless-render comparison. No SPA-shell risk.
- No back-button-hijacking patterns in any first-party JS.
- Structured data is comprehensive, well-architected (shared entity `@id`s instead of duplicated nodes), and validated on the homepage; correct schema types are scoped to the right templates (Service on landers, FAQPage where there's FAQ content, BreadcrumbList only with real depth).
- Viewport tag correct sitewide; responsive CSS is extensive (12 breakpoints in the largest stylesheet alone); touch targets are a deliberate, documented design decision, not an oversight.
- Web fonts are preloaded with `font-display: swap`; the LCP-candidate hero image is at least not lazy-loaded.
- No AI-crawler blocks in robots.txt — consistent with this business's stated AI-visibility priority.

## What needs field data to confirm (not assessable from source/lab alone)

- Actual LCP/INP/CLS values (no CrUX/PageSpeed credentials configured in this environment).
- Real mobile-rendered tap-target spacing and computed font sizes on device.
- Whether Googlebot/Bingbot/AI crawlers are actually hitting the ~40-60% of requests that lack even the minimal CSP header, versus disproportionately landing on the faster/degraded-header edge path.
- Whether the missing `Cache-Control` on CSS/JS/fonts is materially changing repeat-visit LCP in the field, versus being absorbed by browser heuristic caching.
