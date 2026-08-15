# Action Plan — re-audit 2026-08-15

Ordered by measured impact per hour. Mapped to the three-lane weekly rhythm: **L1** commercial page fix, **L2** PASS blog, **L3** off-site.

The previous plan put images and caching first. Google's own data across five pages says that was wrong. This plan reflects what was actually measured.

---

## Tier 1 — This week

### 1. Delay the two tracking scripts ⚡ biggest measured win
**L1 · ~1 hour · Performance**

`Reduce unused JavaScript — 138 KiB` is flagged by Google on **every page**, costing 450–1,050 ms each. The breakdown is entirely third-party:

```
gtag.js               68.3 KB wasted of 161.6 KB
fbevents.js           37.5 KB wasted of 104.8 KB
Meta signals config   32.2 KB wasted of 116.3 KB
```

None of your own JavaScript appears. This is the whole performance problem.

**Do not remove them.** Load both after the page is interactive, or on first user interaction. Tracking still fires.

Trade-off to accept knowingly: a visitor leaving inside ~2 seconds may not register a pageview. For wedding catering enquiries, those visitors were never converting.

Also move both blocks below `<meta charset>` in `views/partials/head.ejs` — charset must come first.

**Before touching this, check whether `META_PIXEL_ID` and `META_CAPI_TOKEN` are set in the Hostinger environment.** `utils/metaCapi.js` already implements Meta's server-side Conversions API. If it is live, the browser pixel may be duplicating work that is already happening server-side.

### 2. Move the enquiry drawer out of the heading outline
**L1 · 30 min · Sitewide, search + AEO**

Every one of your 39 pages currently opens with:

```
Tell Us About / A Few Details / What Brings You / Have a Question
```

from the drawer in `views/partials/nav.ejs`. Both search engines and answer engines read the heading outline to understand a page, and yours starts with four form labels everywhere.

Move the drawer markup to the end of `<body>`. It is a CSS-positioned dialog; source position does not affect rendering. Keep the H2s for screen-reader labelling.

**Highest leverage single change on this list** — one edit, all 39 pages.

### 3. Internal links to `/wedding-caterers-in-noida`
**L1 · 1 hour · Search + AEO**

The page sits at position **7.9 with 0 clicks from 426 impressions**, and Google currently ranks the *homepage* for the query instead. Zero of your 22 blog posts link to it.

Repoint 6–8 wedding posts via `relatedLink` in `utils/content.js`, plus one in-body contextual link each. Vary the anchor text. Add the page to the footer's "Areas & Specialties" list, which currently omits it.

### 4. Rewrite the wedding page title and meta
**L1 · 20 min · Search**

Zero clicks from 426 impressions is a listing problem as much as a rank problem. Current title says nothing the other nine results do not.

You cater for Lamborghini, Tesla, Ferrari and BMW. Every wedding starts with a tasting and the tasting chef cooks on the day. Neither fact is in the title. Keep it under 60 characters.

### 5. Three schema fixes
**L1 · 45 min · AEO entity clarity**

With ~89% of AI mentions coming from Gemini and Google AI Mode, a clean entity graph is the AEO foundation.

- **Add an `@id` to the `LocalBusiness`/`FoodEstablishment` node** (`views/partials/head.ejs:71-98`). It currently has none, so the richest description of the business is orphaned from everything that references the `Organization`.
- **Add `areaServed`** to that same core node. Currently zero occurrences on the homepage.
- **Remove unsupported `servesCuisine` values.** Live value asserts `Mexican`, `Bakery` and `Sushi` with no menu content anywhere, on every page including `/privacy-policy`.

### 6. Google Business Profile for wedding-in-Noida
**L3 · 2 hours · Highest AEO-per-hour on the list**

Gemini reads GBP directly and Gemini plus AI Mode is ~89% of your mentions.

Add wedding catering as an explicit service, set the service area to Noida and Greater Noida, upload real wedding photos with real captions, and pre-answer the FAQ in the Q&A section.

---

## Tier 2 — Next two weeks

### 7. ~~Investigate `/wedding-caterers-in-delhi`~~ — withdrawn

The first PSI run showed performance 45 and TBT 1,260 ms. Two re-runs both returned **55 and 410 ms**, and the page is structurally identical to its siblings. That was variance, not a defect. No action needed.

### 8. Fix 22 over-length titles and 11 over-length meta descriptions
**L1 · 2 hours · Search**

22 of 39 titles exceed 60 characters. Worst meta description is 301 characters on `/blog/food-trends-delhi-ncr-weddings-2026`.

### 9. Add 39 missing `alt` attributes
**L1 · 1 hour · Accessibility + image search**

39 of 156 images have none. Note both `/team/*` pages share the same template gap.

### 10. Static asset caching at the Hostinger level — **promote to Tier 1**
**L1 · 30 min to try, needs hPanel access**

Confirmed still broken: **746 KiB across 24 first-party resources at `cacheLifetimeMs: 0`**. Header evidence is deterministic — 7 asset types all return zero `Cache-Control`, no `ETag`, no `x-powered-by: Express`, while HTML routes carry both. Hostinger's edge serves static files without ever invoking Node, so the `server.js` config cannot reach them.

1. **hPanel first** — look for a CDN or cache-TTL setting. Every response carries `hcdn` / `panel: hpanel`, so an always-on edge wraps the domain and normally exposes its own cache control.
2. **In parallel, add `public/.htaccess`** with the `mod_headers` / `mod_expires` block already present in `dist/.htaccess`. Zero risk. Hostinger's shared tier has historically run LiteSpeed, which usually honours it — plausible, unconfirmed.
3. Verify: `curl -sI https://www.virtuosocatering.com/css/bundle.css` should return a `cache-control` line.
4. **Do not** route assets through Express instead — interception happens before Node runs.
5. If both fail, raise a Hostinger support ticket. This is not fixable from the repo.

### 10b. ✅ Done — SVG `<picture>` defect

Yesterday's image port carried a latent bug live: the `.webp` swap is a no-op on `.svg`, so SVG heroes on `/services` and `/blog` were wrapped as `type="image/webp"`. Invalid markup, visually harmless.

Fixed in `scripts/html-post.js` by requiring the swap to change the filename. Verified: 0 SVGs wrapped, raster wrapping unchanged, build went 129 → 127 WebP wraps. **Not yet deployed.**

### 11. Reviews
**L3 · ongoing · Highest long-term, slowest**

Zero `Review` or `aggregateRating` schema anywhere. Four generic testimonials with no name, date or source, one attributed to a Udaipur wedding while shown on Noida and Delhi pages.

Collect 5–10 real attributed wedding reviews with name, month and venue. Then add `Review` schema. This unlocks star ratings in search, gives Gemini quotable material, and is what a bride's family actually looks for.

Do not fabricate any, and do not add `aggregateRating` until real ratings exist.

### 12. WedMeGood
**L3 · 2 hours**

Your largest off-site gap: 4 competitors present, 16 prompts. For a wedding strategy this is the obvious first off-site move.

### 13. `llms.txt`
**L1 · 15 min**

Still 404. Additive rather than corrective since AI crawlers are already unblocked, but cheap. Point it at the strongest wedding and Noida pages.

### 14. Bing Places
**L3 · 30 min**

ChatGPT is ~11% of mentions with a single mention, and ChatGPT's local answers lean on Bing.

---

## Not urgent, but worth confirming

- **The www / non-www split.** 72% of clicks are attributed to the non-www address across 9 pages. The redirect works and much of the export predates it, but a date-sliced view would confirm whether it is still happening.
- **The 52-day gap**, 2026-03-27 to 2026-05-17. Coincides with the site migration and with the start of the AI-visibility decline. Confirm the migration date to close it.
- **Security headers** remain deliberately unset pending your decision on HSTS. Code is preserved in commit `8f47f5b`.

---

## What is already excellent — protect it

- **SEO 100/100 and best practices 100/100** on every page Google tested
- **CLS 0.000 sitewide** after yesterday's image fix
- Accessibility 96–100
- Zero duplicate or missing titles, meta descriptions, canonicals or Open Graph tags across all 39 URLs
- No thin content — median 1,051 words
- Search traffic **up 18% in clicks and 29% in impressions** over the previous 28 days
- Location pages genuinely differentiated, max pairwise similarity 0.207
- Your own domain is your **#1 AI citation source at 22%** — the blog is earning citations
