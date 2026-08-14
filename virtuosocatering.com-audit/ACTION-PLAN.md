# Action Plan — virtuosocatering.com

**Health Score: 69/100.** Ordered by impact per unit of effort, not by category.

---

## ✅ Already fixed (2026-08-14, verified against a running server)

- **Item 1 — sitemap `lastmod`.** `routes/pages.js:20` now emits each page's real date, ported from `build.js`. Went from 38 URLs all stamped with today to 12 distinct real dates; 22 URLs carry a real `lastmod`, 17 correctly carry none. Matches `dist/sitemap.xml` exactly.
- **Item 2 — Person schema 404.** `/team/aarti-sharma` was referenced by the `@id` on `/about` but never built. Added the page (`utils/pageMeta.js` + `routes/pages.js:37`) rather than editing the schema, since the codebase's own comment defines one page per founder slug. Both founder `@id` targets now resolve. Sitemap went 38 → 39 URLs automatically via the shared registry.
- **Founder social links.** Aarti's Instagram added; `sameAs` on both `/about` and the team pages now emits `[linkedin, instagram].filter(Boolean)`, and the team template renders both.
- **Item 21 (partial) — the deploy-path split, image half.** `scripts/html-post.js` now takes an `assetRoot` parameter, so the Express path applies the same `<picture>`/WebP, `width`/`height` and `fetchpriority` passes the static build already applied to `dist/`. Verified in-browser: all 26 homepage images resolve to `.webp`, none fall back, no double-fetches. Homepage image payload 3031.6 KB → 1241.9 KB (59% smaller before CDN negotiation, ~19% better than the CDN's own transcode). `npm run build` still passes: 117 sized, 38 prioritised, 129 webp.

- **Item 6 — static-asset `Cache-Control`.** `server.js` now sets lifetimes per asset type via `express.static`'s `setHeaders`, mirroring the `dist/.htaccess` policy that never applied in production. Images and fonts get `max-age=31536000, immutable`; CSS and JS get 7 days; rendered HTML gets `max-age=0, must-revalidate`. Verified: conditional GET on `/about` returns 304 with 0 bytes against 42,979 for a full response, so unchanged pages cost a revalidation rather than a re-download.

  CSS and JS are deliberately **not** immutable: `/css/bundle.css` is a stable filename regenerated on every boot, so a long immutable cache would pin visitors to a stale stylesheet after a deploy. Adding a content hash to the filename would let these be immutable too, and is the right follow-up.

**Still open from item 21:** the `/lp/*` `X-Robots-Tag` header, which remains dead code with no live impact — the in-page `<meta name="robots" content="noindex">` already does the job.

A note on shape: this site's fundamentals are genuinely good. There is no thin content, no duplicate titles, no missing canonicals, no broken pages. Most of what follows is either a small mechanical fix or a targeting decision. The one structural item is the deploy-path split, and it is the reason several fixes you already wrote are not live.

---

## Phase 0 — Do this first, it unblocks everything else

**Connect Google Search Console and a PageSpeed/CrUX API key.**

This entire audit was run blind. No field data means no real Core Web Vitals, no indexation status, no impressions, no click-through data, and no way to confirm whether any change below actually worked. Mobile LCP measured 2492 ms in the lab against a 2500 ms threshold — an 8 ms margin under conditions kinder than a real handset in Delhi. You cannot manage that without field data.

Everything else in this plan is worth more once you can measure it.

---

## Phase 1 — Critical, Week 1

All of these are small, contained changes with no design risk.

### 1. Fix the live sitemap's `lastmod` — **highest impact, smallest fix**
`routes/pages.js:20-31` stamps all 38 URLs with the current date on **every request**. `scripts/build.js:160-185` already does this correctly and its own comment at `:166-169` explains why the live behaviour is harmful. Port that logic into the Express route.

*Why it matters:* re-stamping every URL on every request is how a site teaches Google to ignore its `lastmod` entirely. You then lose the crawl-priority signal for genuinely updated pages.

### 2. Fix the Person schema pointing at a 404
`/about` emits schema referencing `https://www.virtuosocatering.com/team/aarti-sharma`, which returns **HTTP 404**. The team member is defined at `utils/content.js:2281` but has no route. Either add the route (matching `/team/pallav-goel`, which works) or point the `@id` at an `/about` anchor.

### 3. Merge the two orphaned homepage entity blocks
`views/partials/head.ejs:71-98` emits `LocalBusiness` + `FoodEstablishment` with **no `@id`**. `:100-120` emits `Organization` with `@id: ".../#organization"`. Everything downstream references the Organization only, so the richer node carrying geo, cuisines and priceRange is unreferenceable. Merge behind one `@id`.

While in there: add `areaServed` to the core node (it currently exists only on per-page `Service` blocks) and remove the `servesCuisine` claims for "Mexican" and "Bakery", which no page content supports.

### 4. Fix the wrong-anchor internal link
`/best-caterers-in-noida-virtuoso-catering-house` closes with a link whose anchor reads **"best caterers in Delhi"** but points at the **Noida** URL. Wrong anchor signal to the wrong page.

### 5. Add security headers
Zero application-set security headers across 60+ live requests. Add `helmet` to `server.js`, or set them manually:

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### 6. Add `Cache-Control` to static assets
`/css/bundle.css` and `/fonts/*.woff2` are served with **no `Cache-Control`**. Images get it from the CDN; CSS and fonts do not. One option on `express.static()` in `server.js:20`:

```js
express.static(path.join(__dirname, 'public'), { maxAge: '1y', immutable: true })
```

---

## Phase 2 — High impact, Weeks 2-3

### 7. Resolve the title cannibalisation
`/wedding-caterers-in-delhi` and `/best-wedding-caterers-in-delhi-what-sets-them-apart` carry near-duplicate titles and H1s for the same query. Two independent specialists flagged it. **Note the bodies are genuinely distinct** — measured max similarity 0.207 — so this is a titling and targeting fix, not a rewrite.

Recommended ownership:

| Page | Owns |
|---|---|
| `/wedding-caterers-in-delhi` | "wedding caterers in delhi", "best wedding caterers in delhi" |
| `/best-wedding-caterers-in-delhi-what-sets-them-apart` | consolidate into the above, or re-title off the phrase |
| `/caterers-in-delhi-finding-the-right-fit-for-your-event` | the broad "caterers in delhi" / "catering services in delhi" (4,400 volume each) |
| `/how-to-hire-wedding-caterers-in-delhi-for-a-luxury-wedding` | decision-framework angle, trim recycled pricing/FSSAI sections |

### 8. Claim "luxury caterers in delhi" — the best single opportunity
7 of 8 results for this query are exact-match brand pages. The SERP wants precisely the asset type you already have: named-brand proof with `Service` schema. `/luxury-brand-event-catering-delhi-ncr` exists but is scoped to corporate activations only, so nothing claims the broader phrase. Your corporate-buyer page already scores 81/100 for its persona — apply the same pattern.

### 9. Retarget an existing post at "indian wedding menu list" (1600 volume, difficulty 3)
`/blog/wedding-catering-menu-in-delhi` is already the right page *type*. It targets the wrong phrase. This is a retitle and on-page retarget, not a new build.

**Expectation-setting:** intent here is browsing, not hiring, and it is a national keyword. The payoff is topical authority and internal-link flow, not direct enquiries.

**Do not target bare "wedding menu" (1600).** That SERP is 100% Western wedding industry (The Knot, Minted, VistaPrint). The volume in the SEMrush export is real but the market is not yours.

### 10. Fix 22 over-length titles and 11 over-length meta descriptions
22 of 38 titles exceed 60 characters and truncate; the pattern is a long descriptive title plus ` | Virtuoso Catering House`. Worst: 89 chars on `/blog/best-wedding-caterers-hospitality-before-food`. 11 meta descriptions exceed 160 characters, topping out at 301 on `/blog/food-trends-delhi-ncr-weddings-2026`.

Mechanical, no downside.

### 11. Add the 38 missing `alt` attributes
38 of 154 `<img>` tags have none. Cheap, and it is both an accessibility fix and an image-search one.

### 12. Move and defer the analytics tags
`views/partials/head.ejs:1-31` loads `gtag.js` and Meta Pixel as the **literal first bytes of `<head>`, ahead of `<meta charset>`**. Charset must come first; anything before it risks a parser restart.

Combined they are ~386 KB — **88-90% of all script weight on the page, larger than your entire first-party JavaScript** — and the most plausible reason mobile LCP resolves to a `<p>` rather than the hero image. They are `async` so they do not block parsing, but move them below the meta tags and defer them. No data-quality cost for a site that converts through an enquiry modal.

While in `head.ejs`: only 2 of 3 `woff2` files are preloaded (`:67-68`). The italic Cormorant used by the preloader's first-paint text is not among them.

### 13. Ask ANI to link the website instead of Instagram
Both press mentions are live and neither links to virtuosocatering.com. The ANI listicle links the brand name to `instagram.com/virtuosocateringhouse`. That is their house style across all five featured companies, so a polite ask to swap or add the website link is low-effort and would convert your only two press features into actual link equity.

---

## Phase 3 — Content and authority, Month 2

### 14. Fix the internal-linking imbalance
Three location pages receive **zero** editorial inbound links from the 22 Journal posts: `/catering-services-in-greater-noida`, `/corporate-catering-services-in-noida`, and `/wedding-caterers-in-noida` — the last being the city you are headquartered in. `/wedding-caterers-in-delhi` receives 14.

Related and telling: **"wedding caterers in noida" currently ranks your homepage, not the dedicated page.** The dedicated page is being outranked by your own homepage, and zero inbound editorial links is the likely reason.

Also add `/wedding-caterers-in-delhi` to the footer's "Areas & Specialties" list, which currently omits it.

### 15. Make `/contact` crawlably linked
Every "Inquire" control is a JavaScript `<button data-inquire-trigger>` with no `href`. `/contact` is rescued only by a template fallback on blog posts. Add a real anchor in nav or footer.

### 16. Rewrite the two weak location pages
`best-catering-services-in-noida` and `corporate-catering-services-in-noida` are generic template copy with broken grammar, e.g. *"If so, we can cater to your corporate catering services in Noida."* The other four location pages are genuinely good and show the standard to match.

### 17. Build the menu pillar
One categorised pillar of roughly 3,000 words. Nothing targets this today. Add the Hindi variants (`shadi ka menu`, `shadi menu list`) as an FAQ block rather than separate pages — thin SERP, modest volume.

### 18. Make the testimonials verifiable
Four generic quotes reused site-wide with no date, photo or source, and one attributed to a Udaipur wedding while appearing on Noida and Delhi pages. Real attributed reviews would also unlock legitimate `Review` schema, which you correctly do not fake today.

### 19. Decide on the four third-party-sourced pages
Four pages (~9,100 words) carry a "Pallav Goel, Co-Founder" byline over copy the source comments describe as supplied and published verbatim (`utils/content.js:1427-1431`), and state unverified facts about named competitors (`utils/content.js:1705`) against your own verification rule at `:1805-1809`.

This reads as a deliberate editorial decision, so the call is yours. Flagging it because a first-person expertise byline over third-party copy is the pattern Google's helpful-content guidance targets. Lowest-cost mitigation is a provenance line on those four pages rather than a rewrite.

### 20. Develop the listicle channel
"top 10 caterers in delhi" and "best caterers in noida" are 83-100% third-party listicles and directories — a Medium post and a personal WordPress blog both outrank every brand homepage for the Noida query. Two parallel moves, and they are complementary:

- **Off-site:** placement in the directories and listicles that own those SERPs
- **On-site:** publish your own ranked comparison content. One competitor (Eleven Course) ranks for "top 10 caterers in delhi" with a self-published listicle naming itself inside it. Your named comparison set (Kitchen Art, Foodlink, Food Inc by Yum Yum Tree, Creative Cuisines) is the natural basis

Worth noting none of those four competitors appeared in any of 14 SERP pulls. The organic fight is against directories and mid-tier brands.

---

## Phase 4 — Ongoing

### 21. Resolve the deploy-path split properly
Decide whether production is Express or the `dist/` static build, and make it the only one. Right now four correct, committed fixes never reach users:

| Fix | Lives in | Production does |
|---|---|---|
| Honest sitemap `lastmod` + image entries | `scripts/build.js:160-185` | stamps today's date every request |
| `<picture>`/WebP + `width`/`height` + `fetchpriority` | `scripts/html-post.js` | 0 `<picture>` elements live |
| 1-year static caching | `dist/.htaccess:36-46` | no `Cache-Control` on CSS/fonts |
| `X-Robots-Tag: noindex` on `/lp/*` | `dist/lp/.htaccess` | header absent (harmless, meta tag works) |

**Port into Express rather than switching to `dist/`.** This is not just the lower-risk option, it is the only viable one: production depends on Express for live form POSTs (`routes/pages.js:73-132`) that a static host cannot run. Move `html-post.js`'s logic into the Express layer, cached at boot the same way `bundleCss()` already is. Phase 1 items 1 and 6 already cover two of the four.

Porting `<picture>` is worth about **19% of image bytes** — the CDN already negotiates WebP, but its transcode is worse than your own `cwebp` output (429 KB versus 345 KB across the homepage's ten images).

### 22. Low-priority backlog
- `llms.txt` does not exist (404). AI crawlers are already unblocked via `robots.txt`, so this is additive, not corrective
- IndexNow is unimplemented — free, and it feeds the Bing index that Copilot cites from
- Collapse the 2-hop redirect on `http://virtuosocatering.com`
- 116 of 154 images lack `width`/`height` live. Measured CLS is good (0.001 desktop / 0.071 mobile), so this is robustness, not an active defect
- Footer says "UP" where every other source says "Uttar Pradesh"

### 23. Set up AI-visibility measurement
You track a declining Semrush AI-visibility baseline, and this audit could not measure citation rates at all. Structural readiness is fine — content is specific, crawlers are unblocked, citability scored 74/100. The gap is measurement, not structure.

---

## What is already working — do not break these

- **No thin content anywhere.** Word counts 310 to 2515, median 1097
- **On-page fundamentals are near-perfect.** Zero duplicate or missing titles, zero missing meta descriptions, zero H1 problems, zero canonical errors, zero missing Open Graph tags across all 38 URLs
- **The location pages are genuinely differentiated**, not templated keyword swaps. Measured across 45 pairs: max similarity 0.207, median 0.076, nothing above 0.30. This is uncommon and you got it right
- **Page/sitemap drift is structurally impossible** — both derive from one registry in `utils/pageMeta.js`
- **Both Core Web Vitals pass** in lab conditions, desktop and throttled mobile
- **Schema is broad and error-free** — zero parse errors across 38 pages, BreadcrumbList on 37/38, BlogPosting on all 22 article pages
- **You correctly do not fake `aggregateRating`**, and the code comments enforce an anti-fabrication rule on press claims
- **`/blog/luxury-catering-cost-delhi-ncr` is correctly aligned** with what ranks for cost queries
- **The corporate-buyer journey scores 81/100** — `/luxury-brand-event-catering-delhi-ncr` cross-links its four matching named case studies properly
