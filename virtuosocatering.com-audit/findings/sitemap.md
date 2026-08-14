# Sitemap & Site Architecture Audit — virtuosocatering.com

**Category score: 73 / 100**

**Scope verified:** `routes/pages.js`, `routes/api.js`, `scripts/build.js`, `utils/pageMeta.js`, `utils/content.js`, `utils/redirects.js`, `views/*.ejs`, `views/partials/*.ejs`, `dist/` (built output), plus live HTTP checks against all 38 URLs in `virtuosocatering.com-audit/sitemap-urls.txt` and a direct fetch of the live `https://www.virtuosocatering.com/sitemap.xml`.

**Headline finding:** the codebase contains two different sitemap generators that disagree, and production is serving the worse one. `scripts/build.js` (`writeSitemap()`, lines 160-185) writes a correct, honest, image-enabled sitemap into `dist/sitemap.xml`, but the live site is not serving `dist/` — it is running the Express app directly on Hostinger, which serves the older dynamic route in `routes/pages.js` (lines 20-31) instead. That route stamps every URL with the current date on every request and carries no image extension. This was verified live, not inferred.

---

## 1. Is the XML valid?

Yes, on both paths. `curl` of the live `/sitemap.xml` returns a well-formed `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` with 38 `<url>` blocks, each with one `<loc>` and one `<lastmod>`. `dist/sitemap.xml` is also well-formed, additionally declaring `xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"`. Neither version uses a sitemap index (not needed at 38 URLs), and neither includes `priority` or `changefreq` — both are correctly omitted since Google ignores both (Info, not a defect).

## 2. Route table vs. sitemap — are any pages missing?

**No.** This is the strongest part of the architecture. `routes/pages.js`, `scripts/build.js`'s static build, and both sitemap generators all read from one shared registry: the `pages` object exported by `utils/pageMeta.js`. Every `router.get()` in `routes/pages.js` (lines 33-66, 141-144) points to a `pages.xxx` entry from that same object, and both sitemap builders do `Object.values(pages).filter(page => !page.excludeFromSitemap)` (`routes/pages.js:22`, `scripts/build.js:161`). There is no code path that can register a page without it also appearing in the sitemap, and vice versa.

Verified by enumeration: `pages` has 40 entries. Two are `excludeFromSitemap: true` — `lpFirstBirthday` and `lpFirstBirthdayThanks` (`utils/pageMeta.js:204`, `utils/pageMeta.js:214`), both paid-traffic landers that also carry `<meta name="robots" content="noindex">` (`views/lander-first-birthday.ejs:8`) and a belt-and-braces `X-Robots-Tag` written by `scripts/build.js:135-142`. 40 − 2 = 38, which matches `sitemap-urls.txt` exactly, in the same order. `find dist -name "*.html"` returns exactly 41 files: the 38 sitemap pages + `404.html` + the 2 excluded `/lp/` pages. Nothing is built that isn't accounted for in one of those two buckets.

The 30 legacy/renamed redirects in `utils/redirects.js` are correctly absent from the sitemap in both the Express router (`routes/pages.js:149-151`) and the generated `dist/.htaccess` (`scripts/build.js:70-123`) — no redirecting URL feeds into the sitemap.

**Answer to Q1 (pages served but missing from the sitemap): none found.**

## 3. HTTP status of all 38 URLs

All 38 returned `200` on direct `curl -L` checks run during this audit, consistent with the orchestrator's independent confirmation. No redirects, no 4xx/5xx, no chains. Evidence: full status list captured this session, e.g. `200 https://www.virtuosocatering.com/blog/wedding-catering-menu-in-delhi`, `200 https://www.virtuosocatering.com/best-wedding-caterers-in-delhi-what-sets-them-apart`, `200 https://www.virtuosocatering.com/press`. (`https://virtuosocatering.com/sitemap.xml`, apex-no-www, correctly 301s to the `www` sitemap — see §6.)

## 4. lastmod / changefreq / priority — present and honest?

**changefreq and priority:** never emitted by either generator. Correct — both are ignored by Google (Info, pass).

**lastmod — this is the category's one real defect.** Two different behaviors exist depending on which code path is live:

- **`routes/pages.js:20-31` (what's actually live):**
  ```
  const today = new Date().toISOString().slice(0, 10);
  ...
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`;
  ```
  Fetched live at 2026-08-14 10:54 GMT: all 38 `<url>` blocks carry `<lastmod>2026-08-14</lastmod>` — today's date, no exceptions, no image tags at all (`grep -c "image:image"` on the live file = 0). Because this is computed fresh on every request, the value will read differently on every single day Google (or anyone) fetches it — every URL "changed today," forever. That is a stronger version of the exact anti-pattern this repo's own build script warns about in its comments.

- **`scripts/build.js:160-185` (`writeSitemap()`, only reaches `dist/sitemap.xml`, not deployed):**
  ```
  // A real date or none at all. Stamping every URL with the build date
  // told Google all 37 pages changed on every deploy, which is how a
  // site teaches Google to ignore its lastmod altogether...
  const modified = page.lastmod || (page.post && (page.post.updated || page.post.date));
  ```
  This version is honest: 22 of 38 URLs (all `blog-post`-templated pages) carry a real, human-set, varied date — 12 distinct values ranging `2026-02-09` to `2026-08-12`, e.g. `<lastmod>2026-08-12</lastmod>` on `/blog/bmw-civil-lines-launch-catering`, `<lastmod>2026-02-09</lastmod>` on `/blog/bath-body-works-touch-of-gold-product-launch`. The other 16 URLs (home, about, team/pallav-goel, our-work, social, blog, services, contact, privacy-policy, press, and all 6 commercial landing pages) correctly emit **no** `<lastmod>` at all rather than a fabricated one. This version also carries a full image sitemap: 204 `<image:image>` entries across the 38 URLs (e.g. the homepage alone lists 21 images).

**Net effect:** the well-engineered, honest sitemap logic exists in this repo and is dead code in production. The version Google is actually crawling is the fabricated-date, no-image version.

**Answer to Q2:** priority/changefreq are absent (correct, by design). lastmod is present live but is not honest — it is regenerated to "today" for all 38 URLs on every request (verified via direct fetch), which is worse than static all-identical boilerplate because it also changes daily. The honest, varied-date version (`dist/sitemap.xml`) is real and correct but is not what's deployed.

*(Severity: **High**. Nothing 404s and no page is missing, so it stops short of Critical, but it is a live, verified defect that actively teaches Google to distrust this site's freshness signal, and it silently drops ~200 image entries from image search eligibility. It is also the easiest fix in this report: point the live route at the same `writeSitemap()` logic, or deploy `dist/sitemap.xml` as a static file ahead of the Express route.)*

## 5. Orphan pages — checking the inbound side

`partials/footer.ejs` is included on all 38 sitemap-templated views (confirmed by `grep -L "partials/footer" views/*.ejs`, which returns only the two excluded `/lp/` landers). Footer + nav are effectively sitewide, so "is this page in the footer/nav" is the right proxy for "is this page orphaned."

- **`/social`** — linked in both desktop and mobile nav (`views/partials/nav.ejs:11,31`) and in the footer "Navigate" column (`footer.ejs:11`). **Not orphaned** — one of the best-linked pages on the site (~37 sitewide inbound links).
- **`/press`** — linked in the footer "Navigate" column (`footer.ejs:13`) *and* a dedicated homepage CTA, "Read Our Press Coverage" (`views/index.ejs:164`). **Not orphaned.**
- **`/privacy-policy`** — linked in the footer bottom bar on every page (`footer.ejs:57`). **Not orphaned.**
- **`/contact`** — **not in nav, not in footer.** Every "Inquire" control in `nav.ejs`, `footer.ejs`, and every CTA banner on `index.ejs`, `services.ejs`, `landing.ejs`, `our-work.ejs`, and `press.ejs` is a JS-only `<button data-inquire-trigger>` that opens a drawer — there is no `href` for a crawler to follow. Confirmed by grep: `href="/contact"` appears nowhere in the shared chrome. Its only crawlable inbound links are: (a) a template-level fallback anchor baked into every one of the 22 `blog-post`-templated pages (`views/blog-post.ejs:109-113`, whose own comment reads *"Crawlable route to the enquiry page. The CTA banner below opens a JavaScript drawer, so without this anchor /contact receives no internal link from any Journal post"* — someone already diagnosed and partially fixed this exact problem, but only for Journal posts); (b) two body links buried inside blog copy (`utils/content.js:1564`, `utils/content.js:1761`); (c) one mention on `/team/pallav-goel` (`views/team-member.ejs:37`). **Net: not orphaned (~25 inbound crawlable links), but it is the one page on the site structurally excluded from the persistent nav/footer/CTA chrome that every other utility page gets** — notable because /contact is the page every conversion funnel on the site is meant to end at.

**Answer to Q3:** of the four pages named, three (`/social`, `/privacy-policy`, `/press`) are solidly linked — the concern about them was correctly narrowed to "no outbound in-content links" (confirmed true for all four by reading `social.ejs`, `contact.ejs`, `press.ejs`, `privacy-policy.ejs` directly: their only links are external/mailto/tel or the JS Inquire button), not "no inbound links." The one page with a genuine inbound gap from primary navigation is `/contact` — rescued from being an actual orphan only by a template-level patch on blog posts. *(Severity: Medium — reachable and indexable today, but a fragile, one-template patch standing in for a real navigational link to the site's primary conversion page.)*

## 6. Hub-and-spoke: blog posts ↔ commercial landing pages

Content note: 22 pages use the `blog-post` view/template and are pushed into the same `blogPosts` array that feeds `/blog` (`utils/content.js:1422,1579,1685,1774`), not 20. 18 live under `/blog/…`; 4 are top-level URLs that are otherwise identical Journal posts — `best-caterers-in-noida-virtuoso-catering-house`, `how-to-hire-wedding-caterers-in-delhi-for-a-luxury-wedding`, `best-wedding-caterers-in-delhi-what-sets-them-apart`, `caterers-in-delhi-finding-the-right-fit-for-your-event` (kept off `/blog/` intentionally, per comments, to preserve already-indexed WordPress-era URLs).

Every one of the 22 posts carries exactly one `relatedLink` back toward a hub page (`grep -c "relatedLink:" utils/content.js` = 22, 100% coverage). Mapping all 22 targets:

| Target | Inbound posts |
|---|---|
| `/wedding-caterers-in-delhi` | **14** |
| `/luxury-brand-event-catering-delhi-ncr` | 5 |
| `/blog/the-quiet-craft-behind-an-unforgettable-wedding` (another post, not a hub) | 2 |
| `/best-catering-services-in-noida` | 1 |
| `/catering-services-in-greater-noida` | **0** |
| `/corporate-catering-services-in-noida` | **0** |
| `/wedding-caterers-in-noida` | **0** |

That's where the hub-and-spoke breaks: **three of the six commercial landing pages get zero contextual/editorial inbound links from the entire Journal.** They're still reachable at click-depth 1 (the `commercialPages` array in `utils/content.js:2624-2632` is rendered as an "Explore" grid on the homepage (`index.ejs:207`), `/services` (`services.ejs:125`), and reciprocally on the other landing pages via `landing.ejs:285`), so this is a link-equity/relevance gap, not a discoverability failure. It's also lopsided in a way worth flagging on its own: `/wedding-caterers-in-delhi` absorbs 14 of 22 available editorial links (64%) while `/wedding-caterers-in-noida` — the geographically correct page for a business headquartered at A-15, Sector 61, Noida — gets none. Separately, two posts (`dos-and-donts-finalizing-wedding-menu` at `utils/content.js:777` and `parameters-to-consider-before-booking-wedding-caterer` at `utils/content.js:845`) point their `relatedLink` at another blog post instead of a commercial page, adding a hop before a reader reaches a conversion-oriented page.

One template-level gap: `views/blog-post.ejs` never references `commercialPages`, so none of the 22 Journal/pillar posts render the "Explore More" mesh that `landing.ejs`, `services.ejs`, and `index.ejs` all share — each post's only outbound links are its single `relatedLink`, the `/contact` fallback, and "Back to the Journal."

**Answer to Q4:** all 22 posts link toward a hub, but the distribution is uneven — `wedding-caterers-in-delhi` and `luxury-brand-event-catering-delhi-ncr` receive the traffic-worthy anchors, while `catering-services-in-greater-noida`, `corporate-catering-services-in-noida`, and `wedding-caterers-in-noida` receive none, leaning entirely on the structural `commercialPages` grid instead of topical in-content links. *(Severity: Medium.)*

## 7. Click depth from homepage

Depth 0: `/`. Depth 1 (direct `<a href>` from nav, footer, or homepage body): `/about`, `/our-work`, `/social`, `/blog`, `/services`, `/press`, `/privacy-policy`, plus all 7 `commercialPages` entries (the 6 landing pages + `best-caterers-in-noida-virtuoso-catering-house`) via `index.ejs:207`. `/team/pallav-goel` is depth 2 (via `/about`). `/contact` is depth 2 at best (via a blog post) since the homepage's own CTA is JS-only (§5). The 5 brand-activation case-study posts (Lamborghini, Tesla, Ferrari, BMW, Bath & Body Works) are depth 2: the homepage's "Our Work" teaser cards all link to the generic `/our-work` (`index.ejs:97,101`), not to the individual case studies — only `/our-work` itself deep-links each card via `work.link` (`our-work.ejs:37`). Every other Journal post is depth 2 via `/blog`. Nothing on the 38-URL sitemap sits deeper than depth 2.

## 8. Location-page quality gate

6 location/service landing pages (`best-catering-services-in-noida`, `catering-services-in-greater-noida`, `corporate-catering-services-in-noida`, `luxury-brand-event-catering-delhi-ncr`, `wedding-caterers-in-delhi`, `wedding-caterers-in-noida`) — well under the 30-page warning and 50-page hard-stop thresholds, so no gate applies. Each is driven by its own keyed object in `content.landingPages[landingSlug]` with page-specific `lead`, `featureList`, `specializations`, `whyUs`, `steps`, and `faq` blocks (`views/landing.ejs`), i.e. structured for genuine per-page differentiation rather than a single template with the city name swapped — consistent with the "Safe at Scale" pattern, not the doorway-page pattern. No action needed here.

## 9. Minor / low findings

- **Low** — `footer.ejs`'s "Areas & Specialties" column lists 5 of the 6 commercial landing pages and omits `/wedding-caterers-in-delhi` (`views/partials/footer.ejs:27-33`). Not orphaned (still linked via the `commercialPages` mesh), just inconsistent with its five siblings.
- **Low** — the WordPress-era menu PDF (`/downloads/virtuoso-catering-house-menu.pdf`) has real Search Console history (comment at `utils/redirects.js:56-58` cites 1,299 90-day impressions on its old URL) but isn't listed in either sitemap. Not required, but worth a line item given its indexed history.
- **Info** — `priority`/`changefreq` correctly never appear in either sitemap generator. Pass, no action.
- **Info** — no `noindex`/sitemap conflicts: `noindex` is confined to `/lp/first-birthday` and `/lp/first-birthday/thank-you` (`views/lander-first-birthday.ejs:8`, `views/lander-first-birthday-thanks.ejs:8`), both already `excludeFromSitemap`. Canonical URLs are self-referencing and consistent (`siteUrl + page.path`) for every one of the 38 pages (`routes/pages.js:14`, `scripts/build.js:25`).

## What genuinely works

- **Single source of truth architecture.** `utils/pageMeta.js`'s `pages` object is the only place a route is defined, and both sitemap generators derive from it with the same `excludeFromSitemap` filter. This makes "page exists but isn't in the sitemap" structurally impossible in this codebase — confirmed by exhaustive cross-check (§2), and it's the main reason the score isn't lower.
- All 38 sitemap URLs are real, indexable, 200-status pages — no 404s, no soft-404s, no redirect chains, no orphaned redirects leaking into the sitemap.
- Redirect hygiene: 30 legacy WordPress URLs and renamed paths are centralized in `utils/redirects.js` and consumed identically by the Express router and the static `.htaccess` generator — no dead links from the old site.
- `dist/sitemap.xml`'s honest lastmod logic (§4) is a genuinely well-reasoned piece of engineering, including a code comment that correctly diagnoses why stamping every URL with the build date is harmful — it just isn't the version currently live.
- `views/blog-post.ejs`'s fallback `/contact` anchor (§5) shows the same self-aware pattern: someone already noticed the JS-drawer-only CTA problem and fixed it for Journal posts specifically.
- Location pages are built for real per-page differentiation, not template-and-swap (§8).
