# SEO + AEO Re-Audit — virtuosocatering.com

**Date:** 2026-08-15
**Previous audit:** 2026-08-14, scored 69/100
**What changed since:** a set of fixes shipped to production yesterday

**New capability this round:** a Google API key is configured, so PageSpeed Insights and CrUX now work. Search Console API is still not connected, but a 16-month GSC export was supplied and analysed.

---

## 1. Did yesterday's fixes land?

All five verified live on production.

| Fix | Before | After |
|---|---|---|
| Sitemap `lastmod` | 38 URLs all stamped today | **12 distinct real dates** |
| `<picture>`/WebP on homepage | 0 | **26** |
| Images missing `width`/`height` | 116 of 154 | **0 of 156** |
| `/team/aarti-sharma` | 404 | **200** |
| HTML `Cache-Control` | none | `max-age=0, must-revalidate` |
| Netlify duplicate site | live copy of the site | **404 on every page** |

The image pipeline fix propagated correctly across all 39 pages, not just the homepage. Layout stability is now perfect: **CLS is 0.000 on every page tested.**

---

## 2. The headline: the fixes worked, and performance barely moved

This is the most important finding of the re-audit, and it corrects the emphasis of the previous one.

| PageSpeed mobile, homepage | Before | After |
|---|---|---|
| Performance score | 63 | **65** |
| LCP | 6.0 s | **6.1 s** |
| CLS | 0 | 0 |

**Two points of score for a fix that was measurably correct.** The images genuinely are optimised now. They were never the bottleneck.

The previous audit put images and caching at the top of the performance list. With Google's own data across five pages, the real bottleneck is unambiguous and it is something else entirely.

---

## 3. Performance — the actual problem is your two tracking scripts

PageSpeed Insights, mobile, five commercially important pages:

| Page | Perf | SEO | A11y | Best practices | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | 65 | 100 | 96 | 100 | 6.1 s | 0 | 210 ms |
| `/wedding-caterers-in-noida` | 56 | 100 | 96 | 100 | 6.1 s | 0 | 470 ms |
| `/best-catering-services-in-noida` | 58 | 100 | 96 | 100 | 4.7 s | 0 | 590 ms |
| `/wedding-caterers-in-delhi` | **45** | 100 | 96 | 100 | 5.0 s | 0 | **1,260 ms** |
| `/blog/luxury-catering-cost-delhi-ncr` | 62 | 100 | 100 | 100 | 6.2 s | 0 | 320 ms |

**Every page scores 100/100 on SEO and 100/100 on best practices.** Accessibility is 96–100. The technical foundation is genuinely excellent.

**Performance is 45–65 and LCP is 4.7–6.2 seconds on every page.** Anything over 4 seconds is "poor".

### The cause, named by Google, identical on every page

`Reduce unused JavaScript — 138 KiB` appears on all five pages with the same breakdown:

```
gtag.js (GA4)               68.3 KB wasted of 161.6 KB
fbevents.js (Meta Pixel)    37.5 KB wasted of 104.8 KB
Meta signals config         32.2 KB wasted of 116.3 KB
                            ─────────────────────────
                            138 KB wasted of ~383 KB
```

**No first-party JavaScript appears in that list at all.** Your own code is clean. The entire unused-JavaScript problem is the two analytics vendors, and the cost is 450–1,050 ms per page, roughly 3,950 ms across the five.

Both load as the **literal first lines of `views/partials/head.ejs`**, above `<meta charset>`.

### This needs care, not deletion

You have explicitly asked that GA4 and Meta Pixel not be harmed. That is the right instinct and nothing below removes them.

**Recommended: delay rather than remove.** Load both after the page becomes interactive, or on first user interaction. Tracking still fires and the data still arrives; it simply stops competing with your content for the first two seconds.

The honest trade-off: a visitor who leaves within about two seconds may not register a pageview. For a considered purchase like wedding catering, those visitors were never enquiring anyway.

**Also worth investigating:** `utils/metaCapi.js` already implements Meta's server-side Conversions API, gated on `META_PIXEL_ID` and `META_CAPI_TOKEN`. If those are set in the Hostinger environment, some Meta tracking is already happening server-side and the client pixel may be doing duplicate work. Worth confirming before deciding how much the browser pixel needs to carry.

**Second fix, trivial:** move both blocks below `<meta charset>`. Charset should be the first thing in the head.

### A correction: `/wedding-caterers-in-delhi` is not a problem page

The first run showed performance 45 and TBT 1,260 ms, roughly double every other page, and I initially recorded it as a page-specific defect.

**That was measurement variance, and the finding was wrong.** Two consecutive re-runs both returned **performance 55, LCP 5.9 s, TBT 410 ms** — in line with its siblings. A structural comparison confirms it: the page has the same 2 images, 22 script blocks and 5 JSON-LD blocks as the other landing pages, and is actually the *smallest* of the three at 40,674 bytes.

Worth noting generally: **a single PageSpeed run is noisy, TBT especially.** Any surprising number in this report or the last one should be re-run before acting on it.

### Caching — still broken, and now diagnosed properly

I reported that `Use efficient cache lifetimes` did not appear in this PSI run, and hedged that it might not be fixed. **It is not fixed.** The technical specialist's own PSI run scored it 0 with **746 KiB across 24 first-party resources at `cacheLifetimeMs: 0`**, naming `hero-candlelit-florals.webp`, `weddings-service.webp` and `bespoke-menus-service.webp`. My run omitting it was Lighthouse insight-selection noise, not a changed condition.

The header-level evidence is deterministic rather than simulated. Across 7 static asset types (css, js, robots.txt, webp, woff2, svg, pdf): **all return zero `Cache-Control`, no `ETag`, and no `x-powered-by: Express`** — while every rendered HTML route carries both Express headers. Node is invoked only when Hostinger's edge finds no static file. The `express.static` config in `server.js` is correct and structurally cannot run in production.

**Recommended sequence:**

1. **Check hPanel for a CDN or cache-TTL setting first.** Every response — static, dynamic, even bare 301s — carries `hcdn` / `platform: hostinger` / `panel: hpanel`, proving an always-on Hostinger edge wraps the whole domain. That class of product normally exposes its own cache-lifetime control independent of origin headers.
2. **In parallel, add `public/.htaccess`** — not `dist/.htaccess`, which is never served — carrying the same `mod_headers` / `mod_expires` block that already exists in the dist version. Zero risk either way. Hostinger's shared tier has historically run LiteSpeed, which usually honours Apache-style `.htaccess`. Plausible, not confirmed.
3. Verify with `curl -sI https://www.virtuosocatering.com/css/bundle.css` — a `cache-control` line is the pass condition.
4. **Do not** replace `express.static` with a custom Express route. The interception happens before Node is invoked at all, so it cannot help.
5. If 1 and 2 both fail, this is a Hostinger support ticket, not a repo change.

### A live defect introduced by yesterday's image fix, now fixed

Porting `html-post.js` into the Express path carried a latent bug into production. The `.webp` swap is a no-op on an `.svg`, so `hasWebp()` found the SVG itself and wrapped it:

```html
<picture><source srcset="/images/virtuoso-catering-house-services-hero.svg" type="image/webp">
```

That announces an SVG as `image/webp`. Browsers reject the mismatched source and fall back to the `<img>`, so nothing was visibly broken, but the markup was invalid and it was live on `/services` and `/blog`.

The bug predates the port — it was always in `html-post.js` — but it only ever reached `dist/` before, which nothing serves.

**Fixed** by requiring the extension swap to have actually changed the filename. Verified: 0 SVGs wrapped, raster wrapping unchanged at 26 on the homepage and 22 on `/blog`, SVGs still receive `width`/`height` and `fetchpriority`. The static build confirms the precision — WebP wraps went 129 → 127, exactly the two SVG heroes.

*This change is committed to the working tree but not yet deployed.*

---

## 4. On-page — unchanged and still strong

All 39 URLs measured directly.

| Check | Result |
|---|---|
| HTTP 200 | 39 / 39 |
| Missing titles | 0 |
| Duplicate titles | 0 |
| Missing meta descriptions | 0 |
| Duplicate meta descriptions | 0 |
| Pages with zero or multiple H1 | 0 |
| Missing canonicals | 0 |
| Canonical mismatches | 0 |
| Missing Open Graph tags | 0 |
| **Images missing width/height** | **0** (was 116) |

Word counts 304 to 2,515, median 1,051. No thin content.

**Still outstanding from yesterday:**
- **22 of 39 titles exceed 60 characters** and truncate in results
- **11 of 39 meta descriptions exceed 160 characters**, worst at 301 on `/blog/food-trends-delhi-ncr-weddings-2026`
- **39 of 156 images have no `alt` text**

*(A twelfth over-length meta description was introduced by the new `/team/aarti-sharma` page at 161 characters. That was mine, and it is fixed — now 155. The change is uncommitted.)*

### A sitewide defect found this round

**Every page opens with four form headings before any content:**

```
Tell Us About
A Few Details
What Brings You
Have a Question
```

These come from the enquiry drawer in `views/partials/nav.ejs`, which sits at the top of the source order. Search engines and answer engines both read the heading outline to understand a page. On all 39 pages, that outline begins with four form labels.

**Fix:** move the drawer markup to the end of `<body>`. It is a dialog positioned by CSS; its source position is irrelevant to rendering. Keep the H2s for screen-reader labelling.

This is the highest-leverage single change available, because it improves every page at once and costs about thirty minutes.

---

## 5. Search performance — what the GSC export actually shows

16 months of data to 2026-08-12.

**Traffic is growing, not declining.**

| | Clicks | Impressions |
|---|---|---|
| Previous 28 days | 66 | 3,904 |
| Last 28 days | **78** | **5,024** |
| | **+18%** | **+29%** |

August 2026 is the strongest month on record per day: 3.08 clicks/day and 202.8 impressions/day, against a December 2025 peak of 2.42 and 108.

Two metrics did fall and explain the perception of decline. **CTR dropped from 9.6% to 1.5%** and **average position moved from 7.2 to 9.6** — both because impressions grew roughly tenfold while clicks grew about 1.6×. Appearing for many more, harder queries lowers both averages while raising the absolute numbers.

### Two real issues in the data

**A 52-day gap: 2026-03-27 to 2026-05-17.** No data recorded. This coincides with the WordPress-to-new-site migration and with the start of the AI-visibility decline. Almost certainly the same event.

**Google still sees two websites.**

| Address | Clicks | Impressions |
|---|---|---|
| virtuosocatering.com | 407 (72%) | 24,075 |
| www.virtuosocatering.com | 154 (28%) | 13,909 |

Nine pages rank under both. The redirect is in place and working, and `server.js` carries a comment showing this was known. Much of the export predates the fix, so this may be historical — but it cannot be confirmed from an export that is not broken down by date.

### The commercial picture

You are a **Noida** search property, not a Delhi one.

| Query | Impressions | Clicks | Position |
|---|---|---|---|
| caterers in noida | 2,350 | 20 | 7.5 |
| catering services noida | 1,619 | 13 | 7.5 |
| best caterers in noida | 507 | 16 | 8.8 |
| **wedding caterers in noida** | **426** | **0** | **7.9** |
| corporate catering services in noida | 389 | 9 | 7.2 |

Position 7–9 across the board is the bottom of page one, where click-through collapses. **Getting these to 3 is worth more than any new page**, and it is also what unlocks AI Overview inclusion.

Wedding queries are currently 3.1% of impressions and have produced 1 click in 16 months. `wedding caterers in noida` at position 7.9 with **zero clicks from 426 impressions** is the clearest single opportunity on the site.

---

## 5b. Structured data — one fixed, three still open

Verified directly against live URLs.

**✅ Fixed: the Person entity.** `/about` emits `@id` values for both founders, and `/team/aarti-sharma` emits the matching `.../team/aarti-sharma#person`. The two pages now describe one entity instead of pointing at a 404. This matters for AEO specifically — a model can now resolve who the founders are.

**❌ Still open: the LocalBusiness block has no `@id`.** The `LocalBusiness` + `FoodEstablishment` node carrying geo, cuisines and price range remains unreferenceable. Everything downstream points at the `Organization` node instead, so the richest description of the business is orphaned from the entity graph. For a business whose AI mentions come ~89% from Gemini and Google AI Mode, this is the single most consequential schema gap.

**❌ Still open, and it cuts both ways: `servesCuisine` does not match the menu.** Live value, rendered on every page including `/privacy-policy` and `/contact`:

```json
["Asian","Indian","Mexican","Continental","Bakery","Mughlai","Chinese","Sushi"]
```

Checking the **visible** copy on `/services` (with the JSON-LD stripped so it cannot match itself), only **2 of the 8** appear: `Indian` and `Sushi`. Absent from the visible copy: Asian, Mexican, Continental, Bakery, Mughlai, Chinese.

Meanwhile the page showcases cuisines the schema does **not** declare — a Thai table, and a "virtuoso artisan pizzeria, hand-rolled thin crust & napoletana".

So the mismatch runs in both directions: the schema over-claims six cuisines the services page does not show, and under-claims two it does. Note this checks the services page only, so it does not prove the kitchen cannot cook those things — the downloadable menu PDF may cover more. The point is that the machine-readable claim and the human-readable page disagree, which is precisely what makes a model distrust the entity.

*Credit where due: the schema specialist flagged this contradiction. My first check was wrong — I grepped the raw HTML, which contains the JSON-LD block itself, so it found its own claims. The figures above come from the corrected check.*

**❌ Still open: `areaServed` absent from the core node.** Zero occurrences on the homepage. For a business competing on "in Noida" and being read by Gemini, this is a direct, cheap win.

---

## 6. AEO status

Baseline (Semrush AI Visibility, 2026-07-31): **26/100 "Low"**, 9 mentions (-18.2%), 4 citations (-20%), 2 cited pages.

```
Gemini              44.4%
Google AI Mode      44.4%   ~89% is Google's ecosystem
ChatGPT             11.1%
Google AI Overview   0.0%
```

**AI Overview is zero because organic positions are 7–10**, below the band it draws from. This makes the ranking work in section 5 the direct route to AI Overview inclusion. The two goals are one job.

**Verified this round:**
- `llms.txt` still returns **404**
- AI crawlers all permitted via blanket `Allow: /`
- No thin content anywhere — median 1,051 words
- Server-rendered, so every answer engine sees full content without executing JavaScript

Your own domain is your **#1 citation source at 22% of mentions**, which confirms that on-site content earns citations in this niche and that continued publishing is justified.

The **PASS framework is the AEO spec**: answer-first 40–60 word blocks are what gets lifted; specific named venues and dates are quotable where "world-class" is not.

---

### 6a. You already have a near-perfect AEO passage — on the wrong page

The single most quotable block on the site is not on the wedding page or the homepage. It is the opening of `/best-caterers-in-noida-virtuoso-catering-house`, and it is textbook:

> "Virtuoso Catering House is the best caterer in Noida. It was named one of Delhi NCR's five leading luxury caterers by ANI News in March 2026, runs FSSAI-certified kitchens, offers a tasting session before you book, and has catered events for Ferrari APAC, Lamborghini, Tesla India, and BMW, scaling from 20-guest gatherings to 2,000-guest weddings."

That is ~55 words, answer-first, entirely specific, every claim externally verifiable, and it names a dated third-party source. It passes all four PASS criteria and is exactly the shape an answer engine lifts whole.

**This is the template.** The wedding page has none of these properties — it is well-written practitioner prose, but it never states a claim an engine can quote as an answer.

### 6b. And a page actively working against you

`/best-catering-services-in-noida` carries 1,522 + 483 impressions and is one of your higher-traffic pages. Its opening copy, live right now:

> "Our team combines professionalism with flavor and affordability, ensuring luxury catering in Noida. We deliver tailored to your unique needs unforgettable experiences through great food and service."

The word order in that last sentence is broken, "flavor" is US spelling on an Indian site, and none of it says anything specific. This is agency-template filler sitting on a page that real traffic lands on.

The AEO specialist scored this page as failing 3 of the 4 PASS criteria. It is the single clearest rewrite target on the site, and the passage above shows exactly what to replace it with.

**Where the site genuinely excels:** the four wedding blog posts audited (`luxury-catering-cost-delhi-ncr`, `is-your-tasting-chef-your-wedding-day-chef`, `how-to-plan-wedding-catering-delhi-ncr`, `best-wedding-caterers-hospitality-before-food`) each pass 3–4 PASS criteria. The blog is the strongest asset, which is consistent with your own domain being your #1 citation source.

### 6c. A refinement to the AI Overview hypothesis

I proposed that AI Overview sits at 0% purely because organic position is 7–10. The AEO specialist's read is that position is the dominant cause but not the only one, and that two structural issues are entangled with it rather than separate:

- the four enquiry-drawer H2s preceding every page's real H1 in DOM order
- the `LocalBusiness`/`FoodEstablishment` node having no `@id` and being referenced by nothing

Its conclusion, which I find persuasive: **do not expect AI Overview to flip to non-zero from rank improvement alone without also fixing those two.** That raises the priority of both — they were already on the list for other reasons, and this makes them load-bearing for the AEO goal too.

---

*A note on method: I initially failed to verify both passages above and nearly recorded them as unfounded. My check used exact contiguous phrase matching, which missed text split across element boundaries. The specialist was right on both counts. Where this report quotes page copy, the quotes are taken from live extraction, not from source files.*

*Specialist findings are in `findings/` — `schema.md` and `geo.md` produced; `technical.md` and `local.md` were still being written when this report was compiled.*
