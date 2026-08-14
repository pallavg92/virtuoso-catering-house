# Full SEO Audit — virtuosocatering.com

**Date:** 2026-08-14
**Scope:** all 38 URLs in the live sitemap, plus the site's source in this repo
**Business type detected:** Local service business (hybrid brick-and-mortar / service-area), luxury catering, Delhi NCR

---

## Data limitations, stated up front

No Google, Moz, Bing or DataForSEO credentials are configured on this machine. This audit therefore contains **no field data**:

- No CrUX real-user Core Web Vitals
- No Search Console impressions, clicks, or indexation status
- No GA4 traffic
- No Domain Authority, Page Authority, or spam scores

Every performance number below is **lab-measured** by me against the live site, or derived from source. Every ranking statement describes what page *types* occupy page 1, not Virtuoso's current position. Where a conclusion needs field data to confirm, it says so.

---

## SEO Health Score: **69 / 100**

| Category | Weight | Score | Basis |
|---|---|---|---|
| Content Quality | 23% | 66 | Specialist review of live copy + source |
| Technical SEO | 22% | 67 | Specialist + my own header/redirect/status checks |
| On-Page SEO | 20% | 80 | My measurement, all 38 URLs |
| Schema / Structured Data | 10% | 60 | Specialist, live-verified |
| Performance (CWV) | 10% | 70 | My lab measurement + specialist source review |
| AI Search Readiness | 10% | 68 | Partially derived — see gaps |
| Images | 5% | 62 | My measurement, all 38 URLs |

---

## The headline finding: two deploy paths exist, and production is running the wrong one

This is the single most important thing in the audit, and it explains several otherwise-unrelated defects.

The repo contains two ways to ship the site:

1. **`scripts/build.js`** renders every view to `dist/*.html`, runs `scripts/html-post.js` over the output, writes `dist/.htaccess`, and generates `dist/sitemap.xml`. `netlify.toml` points a `publish = "dist"` build at Netlify.
2. **`server.js` + `routes/pages.js`** — the Express app, rendering `views/*.ejs` at request time.

Production runs **path 2**. Confirmed on every live response: `x-powered-by: Express`, `platform: hostinger`, `server: hcdn`.

The consequence is that a set of SEO fixes that are already written, already correct, and already committed never reach a single visitor or crawler:

| Fix that exists in the codebase | Where it lives | What production actually does |
|---|---|---|
| Honest per-page `lastmod` + image sitemap | `scripts/build.js:160-185` | `routes/pages.js:20-31` stamps **every URL with today's date on every request** |
| `<picture>` + WebP + `width`/`height` + `fetchpriority` | `scripts/html-post.js` | Live HTML has **0 `<picture>` elements**; 116 of 154 images carry no dimensions |
| 1-year `Cache-Control` on static assets | `dist/.htaccess:36-46` | CSS and fonts are served with **no `Cache-Control` at all** |
| `X-Robots-Tag: noindex` on `/lp/*` | `dist/lp/.htaccess` | Header absent. Not a live risk, the in-page meta tag still works, but it is dead code |

**The sitemap case is the most damaging.** I verified it directly:

```
live  /sitemap.xml : all 38 URLs carry <lastmod>2026-08-14</lastmod>
dist/sitemap.xml   : 12 distinct real dates, 2026-02-09 through 2026-08-12, plus 204 image entries
```

`scripts/build.js:166-169` carries a comment explaining exactly why this is harmful, describing how stamping every URL on every deploy teaches Google to ignore `lastmod` altogether. The live site does that anyway, and worse, it re-stamps on every single request.

**Recommendation:** decide which path is production and make it the only one. Given the site is server-rendered Express on Hostinger and that works well, the lower-risk fix is to port the four behaviours above into the Express/EJS layer rather than switch hosting. The sitemap fix alone is a small change to `routes/pages.js:20-31` to read the same real dates `build.js` already uses.

---

## Technical SEO — 67/100

**What genuinely works.** All 38 URLs return 200 with correct self-referencing canonicals. The route table and the sitemap both derive from one shared `pages` registry in `utils/pageMeta.js`, which makes page/sitemap drift structurally impossible — that is unusually good architecture. Legacy WordPress redirects were verified working end-to-end, including a three-level nested path and a legacy PDF. The site is genuinely server-rendered (`is_spa: false`); every SEO element is present with zero JavaScript execution. `robots.txt` is `Allow: /` with the sitemap declared.

**Security headers — the clearest technical failure (30/100).** Across 60+ live requests, the application sets no security headers whatsoever:

```
Strict-Transport-Security   absent
X-Content-Type-Options      absent
X-Frame-Options             absent
Referrer-Policy             absent
Permissions-Policy          absent
Content-Security-Policy     upgrade-insecure-requests  (platform-injected, not app code)
```

The specialist found the CSP header itself missing on roughly 40-60% of requests due to CDN edge variance.

**URL canonicalisation.** Working but imperfect. `http://` redirects to `https://`, and the apex redirects to `www`. However `http://virtuosocatering.com` takes **two hops** (→ `https://virtuosocatering.com` → `https://www.virtuosocatering.com`) where one would do.

Variant URLs return 200 rather than 301: `/about/`, `/ABOUT`, and `/about?utm_source=test` all serve the page. I confirmed `/about` and `/about/` are **byte-identical**. This is mitigated — all of them emit a correct canonical pointing at the clean `/about` — so it is a robustness gap, not an active duplication problem.

**404 handling is correct** — a nonexistent URL returns a real 404, not a soft 200.

**IndexNow is not implemented** (no key file, no code). For a site whose Bing/Copilot visibility matters, that is a free, unclaimed win.

---

## On-Page SEO — 80/100

I measured every one of the 38 URLs. The fundamentals here are genuinely strong, and this deserves saying plainly because it is rarer than it should be:

| Check | Result |
|---|---|
| HTTP 200 | 38 / 38 |
| Missing titles | 0 |
| Duplicate titles | 0 |
| Missing meta descriptions | 0 |
| Duplicate meta descriptions | 0 |
| Pages with zero H1 | 0 |
| Pages with multiple H1 | 0 |
| Missing canonicals | 0 |
| Canonical self-reference mismatches | 0 |
| Missing `og:title` / `og:description` / `og:image` | 0 / 0 / 0 |

Word counts run 310 (min, `/press`) to 2515 (max), median 1097. **There is no thin content on this site.**

**The two real issues:**

1. **22 of 38 titles exceed 60 characters** and will truncate in SERPs. The pattern is a long descriptive title plus ` | Virtuoso Catering House`. Worst cases:
   - 89 chars — `/blog/best-wedding-caterers-hospitality-before-food`
   - 84 chars — `/blog/parameters-to-consider-before-booking-wedding-caterer`
   - 84 chars — `/how-to-hire-wedding-caterers-in-delhi-for-a-luxury-wedding`
2. **11 of 38 meta descriptions exceed 160 characters**, topping out at 301 on `/blog/food-trends-delhi-ncr-weddings-2026`.

Both are mechanical fixes with no downside.

---

## Content Quality — 66/100

**What works.** Consistent NAP. Named founders with LinkedIn and consolidated Person schema. Genuinely first-hand brand case studies (Lamborghini, Tesla, Ferrari, BMW, Bath & Body Works) with real specifics. Broad FAQPage and BlogPosting coverage. The source comments document real editorial discipline, including anti-fabrication rules and a freshness policy that is actually in use.

**The provenance issue (flagged Critical by the specialist).** Four pages totalling roughly 9,100 words carry a "Pallav Goel, Co-Founder" byline and an expertise-claiming bio, while the source comments state the copy was supplied by a third party and published verbatim — `utils/content.js:1427-1431`: *"Published verbatim as supplied... No wording changed."*

Those same pages state specific unverified facts about named competitors, for example at `utils/content.js:1705` describing The Kitchen Art Company's founding year and chef background. The specialist notes this contradicts the site's own verification rule at `utils/content.js:1805-1809`.

I flag this because it is a real E-E-A-T and trust exposure: a first-person expertise byline over third-party copy is exactly the pattern Google's helpful-content guidance targets. It also appears to be a deliberate editorial decision on your part rather than an accident, so the call is yours. The lowest-cost mitigation is a provenance line on those four pages rather than a rewrite.

**Homepage "thin content" — resolved as a false alarm.** The initial 503-character extraction was a trafilatura artifact. The homepage carries 718 words of real body copy and clears any reasonable floor. The residual observation is fair though: outside a ~30-word hero subhead and a ~40-word quote, little of that 718 is flowing prose — it is mostly card grids and marquees.

**Location pages are NOT duplicates — a hypothesis I tested and disproved.** I fetched all 10 location and service landing pages, stripped nav/header/footer, and computed pairwise 5-gram Jaccard similarity across 45 pairs:

```
maximum similarity : 0.207
median             : 0.076
pairs above 0.60   : 0
pairs above 0.30   : 0
```

These pages are meaningfully differentiated at the copy level. For a multi-location site that is genuinely uncommon and it is worth knowing you got it right. The three Delhi editorial pages are the most distinct of all, below 0.08 against everything.

The residual content weakness is narrower: 2 of 6 location pages (`best-catering-services-in-noida`, `corporate-catering-services-in-noida`) are generic template copy with broken grammar, e.g. `utils/content.js:2076-2078`: *"If so, we can cater to your corporate catering services in Noida."*

**Testimonials are unverifiable** — four generic quotes reused site-wide with no date, photo, or source, and one attributed to a Udaipur wedding while appearing on Noida and Delhi pages.

---

## Schema / Structured Data — 60/100

**What works.** Zero JSON-LD parse errors across all 38 pages. BreadcrumbList on 37/38 (home correctly excluded). BlogPosting on all 22 article-template pages. Press schema is deliberately limited to only the two verified mentions, matching a code comment that discourages fabricated "featured in" claims. Correctly **no** `aggregateRating` — there is no legitimate rating data to source one from, and inventing one would be a penalty risk.

**Two live-confirmed defects:**

1. **A Person `@id` points at a 404.** `/about` emits schema referencing `https://www.virtuosocatering.com/team/aarti-sharma`. I verified: that URL returns **HTTP 404**, while `/team/pallav-goel` returns 200. The team member is defined at `utils/content.js:2281` with slug `aarti-sharma` but no route was ever created. Either add the route or point the `@id` at the `/about` anchor.
2. **The two homepage entity blocks are orphaned duplicates.** Block 1 (`LocalBusiness` + `FoodEstablishment`, `views/partials/head.ejs:71-98`) has **no `@id`**. Block 2 (`Organization`, `head.ejs:100-120`) has `@id: ".../#organization"` and repeats the same name and address. Everything downstream — `Service.provider`, `BlogPosting.publisher`, `Person.worksFor` — references the Organization node only. The richer node carrying geo, cuisines and priceRange is unreferenceable by anything. Merging them behind one `@id` is a contained fix with real upside.

**Two claims not supported by page content:** `servesCuisine` asserts "Mexican" and "Bakery" sitewide, including on `/privacy-policy` and `/contact`, with no supporting menu content anywhere.

**`areaServed` is missing from the core LocalBusiness node.** It exists only on the seven per-page `Service` sub-blocks, one city each. For a service-area business competing on "caterers in Delhi" and "caterers in Noida", declaring the served region on the main entity is directly relevant.

---

## Performance — 70/100

Lab-measured by me against the live homepage with Playwright. **These are lab numbers, not field data.**

| Metric | Desktop (1440×900, unthrottled) | Mobile (390×844, 4× CPU, ~1.6 Mbps / 150 ms) |
|---|---|---|
| TTFB | 330 ms | 330 ms |
| FCP | — | 1168 ms |
| **LCP** | **1024 ms** — good | **2492 ms** — good, but 8 ms under the 2500 ms threshold |
| **CLS** | **0.001** — good | **0.071** — good |
| Total transfer | 1280 KB | 1019 KB |
| Third-party | 270 KB | 270 KB |

**Both Core Web Vitals pass.** That is the headline and it is good news. The caveat is that mobile LCP passes by 8 milliseconds under lab conditions kinder than a real mid-tier Indian handset on a congested network. Without CrUX I cannot tell you the real-world 75th percentile, and that gap matters here.

**The clearest opportunity is third-party weight.** Roughly 386 KB of a ~1 MB page is analytics:

```
gtag.js                        165.5 KB
Meta Pixel signals config      115.9 KB   (chained request, invisible from source)
Meta Pixel fbevents.js         104.8 KB
```

That is **88-90% of all script weight on the page — larger than the site's entire first-party JavaScript.** It is also the most plausible explanation for mobile LCP resolving to a `<p>` element rather than the hero image.

Both are `async`, so they do not block parsing. But `views/partials/head.ejs:1-31` loads them as the **literal first bytes of `<head>`, ahead of `<meta charset>`**. Charset should be the first thing in the head; anything before it risks the parser having to restart. Moving them below the meta tags and deferring them costs nothing in data quality for a site that converts through an enquiry modal.

**Fonts** are self-hosted with `font-display: swap`, which is right. One gap: the italic Cormorant used by the preloader's first-paint text is not preloaded — only 2 of 3 `woff2` files are (`head.ejs:67-68`).

**Static asset caching is missing on nearly everything.** I confirmed JPEGs receive `cache-control: max-age=31536000, public` from the CDN, but `/css/bundle.css` and `/fonts/worksans-300-400-500-600.woff2` return **no `Cache-Control` header at all**. The performance specialist verified the same for JS and WebP: only JPEG gets a cache lifetime. The bare `express.static()` call in `server.js:23` sets none, and the real caching scheme exists only in `dist/.htaccess`, which nothing on the live path reads.

---

## Images — 62/100

**A correction to an earlier conclusion of mine.** I initially reported that WebP was never served and that 7.45 MB of savings sat unused. That was wrong, and the error was mine: my first check sent no `Accept` header, so the CDN handed back the JPEG fallback.

Hostinger's CDN does content negotiation. A real browser gets WebP already:

```
Accept: image/webp  →  content-type: image/webp,  129,602 bytes
no Accept header    →  content-type: image/jpeg,  198,610 bytes
```

**The real, smaller finding:** the CDN's on-the-fly transcode is worse than the build's own `cwebp` output. Measured across the ten homepage images:

```
CDN-negotiated WebP : 429 KB
pre-built .webp     : 345 KB
additional saving   :  83 KB  (19%)
```

So wiring `<picture>` into the Express path is worth roughly 19% of image bytes. Worth doing, not an emergency.

**The genuine image issues:**

- **38 of 154 `<img>` tags have no `alt`** — an accessibility and image-search miss, and the fix is cheap
- **116 of 154 have no `width`/`height`** — `dist/` sets them, the live Express render does not. Measured CLS is nonetheless good (0.001 / 0.071), so treat this as robustness rather than an active defect
- Only 79 of 154 use `loading="lazy"`
- The LCP hero has no `fetchpriority="high"` live, though `dist/` sets it

---

## AI Search Readiness — 68/100

**Verified facts:**

- **`llms.txt` does not exist** — `https://www.virtuosocatering.com/llms.txt` returns 404
- **AI crawlers are permitted.** `robots.txt` is a blanket `User-agent: * / Allow: /`, so GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot and Bingbot are all allowed by omission. Nothing is blocked
- Content is genuinely specific — named venues, real clients, FSSAI references, real pricing tiers — which is the raw material citation depends on. The content specialist scored AI citation readiness at 74/100

**I cannot measure actual citation rates.** That needs an AI-visibility tool, which is not configured here. Given you track a declining Semrush AI-visibility baseline, closing that measurement gap is worth more than any structural change I can recommend blind.

The GEO specialist did not complete a written report before hitting its limit; this category's score is derived from the verified facts above plus the content specialist's citability scoring, and is the least independently corroborated number in this audit.

---

## Search Experience (SXO) — gap score 58/100

*Scored separately and deliberately not averaged into the health score.*

The core insight is a **page-type mismatch**: for the highest-volume commercial queries, Google is rewarding a format Virtuoso does not have anywhere on the domain.

| Query (volume) | What actually ranks | Virtuoso's competing page | Verdict |
|---|---|---|---|
| top 10 caterers in delhi (320) | 83% third-party listicles/directories | none | **Critical** — no listicle-format page exists |
| best caterers in noida (140) | 100% listicle/directory; a Medium post and a personal WordPress blog both outrank every brand homepage | `/best-caterers-in-noida-virtuoso-catering-house` (single-brand essay) | **Critical** — format problem, not authority |
| caterers in delhi (4400) | 3 of 7 are exact-match brand homepages | no page targets the phrase | **High** — targeting gap, format is proven viable |
| catering services in delhi (4400) | 5 of 9 are exact-match brand homepages | no page targets the phrase | **High** — same |
| luxury caterers in delhi (110) | 7 of 8 are exact-match brand pages | `/luxury-brand-event-catering-delhi-ncr` exists but is scoped to corporate activations only | **High — best single opportunity** |
| indian wedding menu list (1600, difficulty 3) | 100% dish-list blog guides | `/blog/wedding-catering-menu-in-delhi` — right type, wrong phrase target | **High — near-free win** |
| wedding catering cost (210-320) | cost-guide blogs | `/blog/luxury-catering-cost-delhi-ncr` | **Aligned, working** |

**Two things worth pulling out:**

`luxury caterers in delhi` is the most winnable item on this list. The SERP wants exactly the asset type Virtuoso already has — named-brand proof with Service schema — and no page currently claims the phrase. The corporate-buyer page already scores 81/100 for its persona; the same pattern applied to a wedding or general-luxury page is a known-good move.

`indian wedding menu list` at 1600 volume and difficulty 3 needs no new page, only retargeting an existing post's phrase focus.

**On the listicle queries:** these are largely third-party publisher territory, which makes off-site placement a parallel channel to develop alongside the site, not a limit on it. The site can also compete directly by publishing its own ranked comparison content — note that one competitor (Eleven Course) ranks for "top 10 caterers in delhi" with a self-published listicle that names itself inside it.

**A genuine self-inflicted cannibalisation.** `/wedding-caterers-in-delhi` and `/best-wedding-caterers-in-delhi-what-sets-them-apart` carry near-duplicate titles and H1s while running different schema (`Service`+`FAQPage` versus bare `BlogPosting`). Two independent specialists found this. Note this is a **title and targeting** collision, not duplicate body copy — my similarity testing proved the bodies are distinct. Consolidating the target query onto one page is the fix.

**None of the four named competitors** (Kitchen Art, Foodlink, Food Inc by Yum Yum Tree, Creative Cuisines) appeared in any of 14 SERP pulls. The real organic fight is against directories and mid-tier brands.

---

## Site Architecture — 73/100

**Structurally excellent where it counts.** Route table and sitemap both derive from one registry, so no page can exist without being in the sitemap. All 38 URLs 200. Clean redirect hygiene. `priority` and `changefreq` correctly omitted.

**Internal linking gaps:**

- **`/contact` has no crawlable link from nav or footer.** Every "Inquire" control is a JavaScript `<button data-inquire-trigger>` with no `href`. It is rescued only by a template fallback anchor on the 22 blog-post pages plus two buried body links
- **Three location pages receive zero editorial inbound links** from the 22 Journal posts: `/catering-services-in-greater-noida`, `/corporate-catering-services-in-noida`, and `/wedding-caterers-in-noida`. That last one is the city the business is headquartered in. Meanwhile `/wedding-caterers-in-delhi` receives 14
- The footer's "Areas & Specialties" list omits `/wedding-caterers-in-delhi`

---

## Backlinks — insufficient data

Tier 0 only (Common Crawl + verification crawler). **DA, PA and spam scores were not measured and are not estimated anywhere in this report.** Common Crawl returns `in_crawl: true, in_rankings: false` — below ranking threshold, which is not the same as no authority — and its referring-domain extraction is a documented no-op, so zero referring domains is a tooling ceiling, not a finding.

**The one solid finding: both claimed press mentions are real, and neither passes any link equity.**

| Outlet as labelled | Status | Links to the site? |
|---|---|---|
| "News18" (dailyhunt.in) | 200 | **No** — zero occurrences of the domain |
| "ANI News" (aninews.in) | 200 via headless render (403 to raw curl) | **No** — the brand name links to Instagram, not the website |

I verified this independently: both pages are live, both name Virtuoso correctly, neither links to virtuosocatering.com.

Two notes. The Dailyhunt page's own JSON-LD gives `publisher: "Dailyhunt"`, `author: "R News India"` — not News18, which is how it is labelled on-site. And the ANI listicle links every one of its five featured companies to Instagram rather than their websites, so this is that publication's house style, not a slight.

Asking ANI to swap the Instagram link for the website is a concrete, low-effort ask with a real payoff.

Domain registered 2024-11-15, clean history, no expired-domain risk.

---

## Topic Clusters & Content Opportunity

**The menu cluster is real but smaller than the keyword data implies, and one target should be dropped.**

- **`indian wedding menu list` (1600, difficulty 3) and `indian wedding veg food menu list` (1300/8) are genuinely winnable.** The SERP is small-to-mid wedding blogs (WeddingWire.in, Akshram Events, DestinationWeddingBharat, Plannersy), several visibly recycling the same generic dish list. Practitioner-sourced content from an actual caterer beats that. **But the intent is browsing, not hiring, and it is a national keyword** — the payoff is topical authority and an internal-link funnel, not direct enquiries. Worth building with that expectation set.
- **Do not target bare `wedding menu` (1600) or the other unqualified English variants.** Those SERPs are 100% Western wedding-industry (The Knot, Minted, VistaPrint). The SEMrush export's volume is real but it is not Virtuoso's market. This is a case where the keyword list is misleading and the SERP settles it.
- **The Hindi variants** (`shadi ka menu`, `shadi menu list`) have a thin, weak SERP but modest volume — worth an FAQ block, not a dedicated page.

**Recommended build:** one categorised pillar of roughly 3,000 words. No page targets this today.

**Query-ownership map for the cannibalising cluster** (confirmed as a targeting collision, not duplicate copy):

| Page | Should own |
|---|---|
| `/wedding-caterers-in-delhi` | pillar — "wedding caterers in delhi" + "best wedding caterers in delhi" |
| `/best-wedding-caterers-in-delhi-what-sets-them-apart` | **highest risk** — near-duplicate promise of the page above. Consolidate into it, or re-title off the phrase |
| `/how-to-hire-wedding-caterers-in-delhi-for-a-luxury-wedding` | keep, lean into the decision-framework angle, trim recycled pricing/FSSAI sections |
| `/caterers-in-delhi-finding-the-right-fit-for-your-event` | the broad "caterers in delhi" / "catering services in delhi" (4,400 each) — the only one not wedding-exclusive |
| `/best-caterers-in-noida-virtuoso-catering-house` | not a real collision, different geo |

**Two live bugs surfaced here:**

1. `/best-caterers-in-noida-virtuoso-catering-house` closes with a link whose anchor text reads **"best caterers in Delhi" but points at the Noida URL**. That is a genuine internal-linking error sending the wrong anchor signal.
2. **`wedding caterers in noida` currently ranks the homepage, not the dedicated `/wedding-caterers-in-noida` page.** Combined with the finding that this page receives zero editorial inbound links, the dedicated page is being outranked by the site's own homepage.

---

## Coverage gaps in this audit

Stated plainly rather than papered over:

- **Visual/mobile write-up did not complete.** 31 screenshots and a diagnostics file were captured to `screenshots/`, and the diagnostics confirm no horizontal overflow at 1440px, but no written visual analysis was produced
- **The GEO specialist did not produce a written report** before hitting its limit. AI Search Readiness is scored from verified facts I checked myself plus the content specialist's citability scoring, and is the least independently corroborated number here
- **No field data at all** — see the top of this report
- Several "near me" and generic menu queries returned US-biased results and are marked not analysed rather than guessed

---

## Findings files

Per-category detail, with evidence, in `findings/`:

`technical.md` · `content.md` · `local.md` · `sitemap.md` · `sxo.md` · `schema.md` · `backlinks.md`
