# Search Experience Optimization (SXO) Audit — virtuosocatering.com

**SXO Gap Score: 58 / 100** (separate from, and not to be averaged with, the SEO Health Score elsewhere in this audit)

**Lead finding:** Virtuoso's highest-intent commercial pages are well-built, schema-complete, and genuinely specific — but on the queries with the strongest listicle/directory pull ("top 10 caterers in delhi," "best caterers in noida"), Google is rewarding a page *type* (ranked multi-vendor list) that Virtuoso does not have anywhere on the domain. No amount of on-page polish fixes that; it requires either a new page type or a deliberate off-domain play. Separately, four top-level URLs (`/best-wedding-caterers-in-delhi-what-sets-them-apart`, `/how-to-hire-wedding-caterers-in-delhi-for-a-luxury-wedding`, `/caterers-in-delhi-finding-the-right-fit-for-your-event`, `/best-caterers-in-noida-virtuoso-catering-house`) are built and schema-marked as `BlogPosting` articles while living outside `/blog/` and, in one case, carrying a near-duplicate title/H1 of a true `Service`-schema page — a self-inflicted cannibalization risk that is independent of the SERP.

---

## Method note

Fetched via `render_page.py --mode auto --json` (all 38 sitemap URLs, pre-cached by the audit orchestrator) and re-parsed with `parse_html.py` for title/meta/H1/H2/schema/word-count/links/CTAs. SERP research used `WebSearch` against the literal SEMrush queries supplied. `WebSearch` returns AI-synthesized result summaries plus a top-links list, not raw SERP HTML — see **Limitations** for what that does and doesn't let me confirm.

```json
{
  "category": "Search Experience Optimization",
  "sxo_gap_score": 58,
  "scale": "0-100, independent of SEO Health Score",
  "dimension_scores": {
    "page_type_alignment": "5/15",
    "content_depth": "12/15",
    "ux_signals": "10/15",
    "schema": "9/15",
    "media": "6/15",
    "authority": "10/15",
    "freshness": "6/10"
  }
}
```

---

## 1. Page-Type Mismatch Table (priority keywords)

"SERP dominant type" = the format that actually occupies page 1 for that literal query, classified against `page-type-taxonomy.md`. "Directory/Listicle" below means Comparison-Page-shaped SERP per the taxonomy (listicle titles, multi-vendor treatment, "10 Best..." framing) or a pure vendor-marketplace/directory (Justdial, Sulekha, Sloshout, Venuelook).

| Query (vol/diff) | SERP dominant type — evidence | Virtuoso URL that competes | Verdict | Severity |
|---|---|---|---|---|
| **top 10 caterers in delhi** (320/30) | 5 of 6 results are third-party listicles/directories (Velog, Slideserve, Venuelook, LBB "Top 12", Sloshout "Top 20"); the 1 brand result (Eleven Course) self-published its **own** "Top 10" listicle naming itself inside it, not a plain service page | *None.* No Virtuoso page attempts a ranked/listicle format at all | **Type mismatch — no competing page exists** | **CRITICAL** |
| **best caterers in noida** (140/16) | 100% listicle/directory: Justdial, Sulekha, a **Medium.com** listicle, COOX, Sloshout "Top 20", a random WordPress blog ("...The Only Guide You Need"). **Zero** brand homepages appear | `/best-caterers-in-noida-virtuoso-catering-house` — single-brand narrative essay (H2s: "The Real Takeaway," "What This Looks Like From the Inside"), `BlogPosting` schema | Even a Medium post and a personal WordPress blog outrank the *format* Virtuoso is using here — this is a format problem, not an authority problem | **CRITICAL** |
| **best caterers in delhi** (720/34) | 5 of 7 results listicle/directory (Velog, Venuelook, Sloshout, COOX, LBB); 2 of 7 are brand homepages (Moets, Sevenseas) | `/best-wedding-caterers-in-delhi-what-sets-them-apart` — single-brand essay, no ranked comparison, `BlogPosting`, no `FAQPage` | Majority-listicle SERP; the 2 winning brand results are homepages with tight exact-match titles, not long single-brand essays | **HIGH** |
| **caterers in delhi** (4400/40) | Mixed: 3 of 7 results are brand homepages (guptacaterers.in, sevenseascatering.in, moetscatering.com) alongside Justdial/Sloshout/LBB/PartyKaro | No page targets this exact phrase. Homepage title is "Virtuoso Catering House — Luxury Catering, Delhi NCR" (no "caterers in Delhi"); `/caterers-in-delhi-finding-the-right-fit-for-your-event` exists but is a single-brand guide, not a hub page | Page **type** is proven viable here (43% brand homepages win slots) — this is a targeting/title gap, not a format problem | **HIGH** |
| **catering services in delhi** (4400/33) | 5 of 9 results are brand homepages (Moets, Food Tales, Chaykala, Baraat, Saltt) with exact-match titles, alongside Justdial/Sulekha/Lentlo | No page targets this exact phrase | Same pattern as above — brand-homepage format wins over half the results; Virtuoso simply isn't in the race | **HIGH** |
| **luxury caterers in delhi** (110/29) | 7 of 8 results are brand homepages/service pages with exact-match titles (Gupta Caterers, Mehar, Creative Kitchen, Elevencourse, Chaykala, Food Tales, Culinary Affaire); only 1 listicle (LBB) | `/luxury-brand-event-catering-delhi-ncr` exists but is scoped to **corporate brand activations only** (Lamborghini/Tesla/Ferrari/BMW), not general luxury/wedding catering. No page claims the broader phrase | The single most winnable gap on this list — SERP wants exactly the asset type Virtuoso already has (named-brand proof, Service schema) and no page is titled for it | **HIGH (opportunity)** |
| **indian wedding menu list** (1600/3) | 100% informational guide/listicle blog posts (WeddingWire.in, Akshramevents, DestinationWeddingBharat, Plannersy) — zero caterer service pages, zero Delhi-specific brands | `/blog/wedding-catering-menu-in-delhi` — right **type** (dish-by-dish breakdown blog), wrong primary phrase target | Type match already exists; this is a near-zero-difficulty (KD 3) keyword-targeting fix, not a rebuild | **HIGH (opportunity)** |
| **wedding caterers in delhi** (170/15) | 6 of 8 results directory/marketplace/listicle (Sulekha x2, Zoopgo "Top 50", IndiaMART, Sloshout x2); 2 of 8 brand homepages (Sevenseas, Moets) | `/wedding-caterers-in-delhi` — genuine `Service` + `FAQPage` schema page, matches the minority-but-real winning pattern | Right type, uphill SERP (75% directory-shaped) | MEDIUM |
| **caterers in noida** (1000/17) | 100% directories/marketplaces in this sample (Venuelook, COOX, Sulekha, Sloshout) — no brand homepages surfaced | `/wedding-caterers-in-noida` and `/best-catering-services-in-noida` target adjacent phrases ("wedding caterers in noida," "catering services in noida"), not the bare head term | Adjacent, not exact; SERP for the bare term leans aggregator | MEDIUM |
| **veg catering services near me** (1900/17) / **food catering services near me** (720/23) | Near-me intent resolves primarily via Google's Local Pack (map + 3 GBP listings), not the organic 10-blue-links this tool returns. Text results skewed to non-India directories/Yelp/Thumbtack — see Limitations | No Virtuoso page has an embedded map; no per-neighborhood pages exist beyond city level, despite `LocalBusiness`/`FoodEstablishment` schema on every page | This is a Local Pack / Google Business Profile problem, not a page-content problem — a better landing page alone cannot win a map pack slot | MEDIUM — GBP lane, not a page rewrite |
| **wedding catering cost** / **catering per plate cost** (210-320, low diff) | Directories showing per-vendor pricing (Weddingbazaar, Venuelook, Sloshout, Zoopgo) alongside dedicated cost-guide blog posts (Venuelook's own guide, Jafferbhai's, gourmetgrub.in x2) | `/blog/luxury-catering-cost-delhi-ncr` — right type, already live | **Aligned** — working example, see Section 4 | Working |
| wedding catering menu (590) / wedding dishes (880) / indian wedding veg food menu list (1300) | **Not reliably analysed.** The "wedding catering menu" pull returned entirely US-market results (LA/San Diego/Atlanta caterers) with no India signal; did not re-run with an explicit India qualifier | `/blog/wedding-catering-menu-in-delhi` is the type-analog | **NOT ANALYSED** — flagging rather than guessing, per instruction | N/A |

---

## 2. Findings by severity

### CRITICAL

**C1 — Listicle-coded queries have no competing page type on the domain.**
"top 10 caterers in delhi" and "best caterers in noida" are both, on the evidence above, won by ranked/multi-vendor list formats — and for "best caterers in noida" specifically, even a Medium.com post and a personal WordPress blog outrank every brand homepage in the result set, which means this is a pure format-matching problem, not a domain-authority problem. Virtuoso's two nearest pages (`/best-caterers-in-noida-virtuoso-catering-house`, and by extension the Delhi-side essays) are single-brand narrative articles — well-written, but structurally the wrong shape for what Google is rewarding here.
*Fix:* Either (a) build a genuine Virtuoso-authored "Best Caterers in Delhi/Noida" roundup that names Virtuoso plus real category peers — the tactic Eleven Course is already running on its own domain for "top 10 caterers in delhi" — or (b) treat this query shape as a parallel off-domain-placement target (WedMeGood, LBB-tier, Sloshout-tier), which is a different channel, not a ceiling on the website itself.

**C2 — Keyword cannibalization inside Virtuoso's own "wedding caterers in Delhi" cluster.**
`/wedding-caterers-in-delhi` (title: "Best Wedding Caterers in Delhi | Top Wedding Caterers, Delhi NCR | Virtuoso," H1: "Best Wedding Caterers in Delhi," `Service`+`FAQPage` schema) and `/best-wedding-caterers-in-delhi-what-sets-them-apart` (title: "Best Wedding Caterers in Delhi: What Sets Them Apart," same H1 phrase, `BlogPosting` schema, no `FAQPage`) are two independently indexable, live URLs both primarily targeting "best wedding caterers in delhi." A third page, `/caterers-in-delhi-finding-the-right-fit-for-your-event`, and a fourth, `/how-to-hire-wedding-caterers-in-delhi-for-a-luxury-wedding`, also sit in the same semantic space at top-level URLs (not `/blog/…`), each carrying `BlogPosting` schema. This is four pages competing for overlapping intent with inconsistent typing (schema says "article," URL structure says "core page"), which dilutes which single URL Google should rank and is a plausible, on-site explanation for underperformance independent of anything happening on the SERP.
*Fix:* Pick one canonical URL per intent (`/wedding-caterers-in-delhi` as the `Service`-schema page of record), and either merge/consolidate the three narrative essays into supporting `/blog/` content that internally links up to the canonical page, or differentiate their titles/H1s so they stop competing head-to-head.

### HIGH

**H1 — The two highest-volume head terms ("caterers in delhi" 4,400 vol, "catering services in delhi" 4,400 vol) have no page targeting the exact phrase, despite the winning format being proven achievable.** 3 of 7 results for "caterers in delhi" and 5 of 9 for "catering services in delhi" are single-brand homepages with tight, exact-match titles (moetscatering.com, sevenseascatering.in, foodtalescatering.com, chaykala.com, baraatcatering.com). Virtuoso's homepage title — "Virtuoso Catering House — Luxury Catering, Delhi NCR" — doesn't contain either phrase. This is the largest volume opportunity on the entire keyword list and it is a targeting gap, not a rebuild.

**H2 — "luxury caterers in delhi" is the single most winnable gap found.** 7 of 8 results are brand homepages/service pages with exact-match titles. Virtuoso already has the strongest possible proof asset for this phrase (Lamborghini Temerario, Tesla Centre Gurugram, Ferrari Track Day, BMW Civil Lines, Bath & Body Works — real, named, verifiable) but the only page addressing "luxury" (`/luxury-brand-event-catering-delhi-ncr`) is scoped narrowly to corporate brand activations. No page claims the broader phrase for weddings/private luxury events, where the same proof would also work as social proof of caliber.

**H3 — "indian wedding menu list" (1,600 volume, difficulty 3) is close to a free win.** The entire SERP is informational dish-list content, a type Virtuoso already produces (`/blog/wedding-catering-menu-in-delhi`), but that post is titled and keyed to "wedding catering menu in delhi," not the much higher-volume, near-zero-difficulty exact phrase ("indian wedding menu list," "indian wedding veg food menu list" at 1,300 vol/diff 8). This is a retitle-and-expand job, not new content architecture.

### MEDIUM

**M1 — Near-me queries ("veg catering services near me" 1,900 vol, "food catering services near me" 720 vol) are structurally a Google Business Profile / Local Pack problem, not a landing-page problem.** No Virtuoso page — including the Noida and Greater Noida location pages — has an embedded map, despite every page correctly carrying `LocalBusiness`/`FoodEstablishment` schema with `GeoCoordinates`. A stronger landing page cannot, by itself, win a map-pack slot; this is a GBP-optimization action (categories, services list, Posts, review velocity), which sits alongside the on-site work rather than limiting it.

**M2 — "wedding caterers in delhi" and "caterers in noida" are directory-majority SERPs (75-100% aggregator/listicle) where Virtuoso's Service-page format is a real but minority-share path.** Both already have a correctly-typed Virtuoso page; the gap here is competitive intensity, not a wrong page type.

### LOW

**L1 — Media is thin on exactly the pages carrying the most commercial intent.** The six `Service`-schema location/category pages carry 2 images each (vs. 27 on the homepage). For a visually-driven, "luxury"-positioned category, this under-delivers proof-by-photography right where bride's-family and corporate buyers are both actively comparing.

**L2 — Freshness signal is flat on the money pages.** All six core `Service` pages report a `2026-01-01` pseudo-publication date (evidently a default/launch date rather than a tracked "last updated"), while blog posts show genuine, varied dates through August 2026. The pages most in need of a visible freshness signal carry none.

**L3 — No `Review`/`AggregateRating` schema anywhere sampled.** Directory competitors (Justdial, Sulekha, Sloshout) display star ratings directly in search results; Virtuoso's pages have no equivalent structured trust signal, which matters specifically to the bride's-family persona actively comparing starred listings.

---

## 3. Named competitor note

None of the four named comparison competitors — The Kitchen Art Company, Foodlink, Food Inc Catering by Yum Yum Tree, Creative Cuisines Inc — appeared in any of the 14 SERP pulls run for this audit. The organic results for these queries are instead dominated by directories (Justdial, Sulekha, Sloshout, Venuelook, LBB, COOX, Zoopgo) and a different tier of "everyday" caterer brand homepages (Moets, Sevenseas, Chaykala, Baraat, Saltt, Gupta Caterers, Mehar, Creative Kitchen, Eleven Course). This is useful market context, not a contradiction of the competitor set Pallav wants used for positioning: it means the organic battle for these specific queries is currently against directories and mid-tier operators, not against the four premium comparison names.

---

## 4. What genuinely works

1. **CTA/inquiry architecture is a real strength, sitewide.** A persistent "Inquire" modal (nav.ejs) branches by intent (Wedding / Brand Activation / Private Celebration / Something Else) before dropping into a short form; a pre-filled WhatsApp deep link (`wa.me/…?text=…`), `tel:` link, and email are all present on every page. This is low-friction, persona-aware, and directly addresses the "Action" dimension well — one of the stronger parts of the site.
2. **`/blog/luxury-catering-cost-delhi-ncr` is exactly the page type the pricing-query SERP rewards** (educational cost-guide, matching Venuelook's own cost guide and gourmetgrub.in's per-plate breakdowns). No structural change needed here — just reinforce the exact-match phrasing.
3. **`/luxury-brand-event-catering-delhi-ncr` correctly cross-links to all four matching named case studies** (Lamborghini, Tesla, Ferrari, Bath & Body Works) directly from the page — this is Virtuoso's best persona-fit page (see Section 6, 81/100 for the corporate buyer).
4. **Schema coverage is broad and largely accurate to content type**: `Service`+`FAQPage` on true service/location pages, `BlogPosting` on true articles, `LocalBusiness`/`FoodEstablishment`/`Organization`/`BreadcrumbList` sitewide. The exceptions are the four pages flagged in C2/H1, where the schema is technically correct for the content but the URL placement is not.
5. **Content is specific, not generic** — FSSAI certification callouts, real per-plate pricing tiers, named venues and named brand launches. This is a genuine strength on the Content Depth dimension (12/15) and is exactly what a PASS-framework read would want to see; the gap is placement/format, not substance.

---

## 5. Why well-optimized pages can still fail to rank (synthesis)

Four independent mechanisms are visible in this audit, and all four can suppress a page that is, by any on-page checklist, "well optimized":

1. **Format mismatch overrides quality.** Google is matching SERP format to query shape, not rewarding word count or keyword density — a Medium.com post beats a polished brand essay for "best caterers in noida" because it's shaped like the list the query wants (C1).
2. **Self-cannibalization dilutes the exact page Virtuoso needs to win.** Four URLs targeting near-identical "wedding caterers in Delhi" intent, two with near-duplicate titles, ask Google to arbitrate between Virtuoso's own pages instead of consolidating ranking signal onto one (C2).
3. **Scope-narrowing on title/H1 caps a page's addressable query set.** `/luxury-brand-event-catering-delhi-ncr` is well-built but can only ever rank for brand-activation-flavored queries because it never claims the broader "luxury caterers in delhi" phrase, even though its proof assets would support it (H2).
4. **Some queries aren't won on-page at all.** "Near me" intent is Local-Pack-gated; no amount of landing-page work substitutes for Google Business Profile optimization for that specific query shape (M1) — this sits alongside the website work as a parallel lane, not a limitation of what the site itself can achieve.

---

## 6. User stories (derived from SERP signals)

1. **As a bride's family member searching "best caterers in delhi" or "top 10 caterers in delhi,"** I want a comparative shortlist of real options, because I don't yet know who's credible, but I'm blocked by comparison fatigue — 5 of 7 and 5 of 6 results respectively are listicles/directories, and Virtuoso's page for this territory is a single-brand essay with no comparison table, so I bounce back to Google for a directory. *(Source: SERP format mix for both queries, C1/H)*

2. **As a bride's family member checking "veg catering services near me,"** I want confirmation this caterer actually serves my venue/area and handles Jain/vegetarian requirements at scale, because Indian weddings have strict dietary rules, but I'm blocked because this is Local-Pack territory and Virtuoso's location pages carry no embedded map despite valid `LocalBusiness` schema. *(Source: near-me intent pattern, M1)*

3. **As someone earlier in the journey searching "indian wedding menu list"** (awareness stage, not yet caterer-shopping), I want a categorized, shareable dish list, because menu planning starts before caterer selection, but I'm blocked because Virtuoso's matching post targets a different, lower-volume phrase and may never surface for the easier, higher-volume search. *(Source: 1,600 vol / difficulty-3 gap, H3)*

4. **As a corporate brand-activation buyer searching "luxury caterers in delhi,"** I want proof of comparable prestige-brand work before I put my reputation behind a recommendation, because senior stakeholders and press will be there, but I'm blocked because the only "luxury" page on the site is scoped to brand events alone and the broader phrase — which 7 of 8 results show is won by exact-match brand pages — has no dedicated Virtuoso page despite Virtuoso holding exactly the proof (Lamborghini/Tesla/Ferrari/BMW) this persona needs. *(Source: SERP dominance pattern, H2)*

5. **As a price-sensitive family member searching "catering per plate cost,"** I want a transparent number before I make contact, because per-plate cost is my fastest qualifying filter for a large guestlist, and here I'm actually well served — Virtuoso already runs a cost-guide post in the same format the SERP rewards. *(Source: cost-query SERP, Section 4)*

*(Stories span awareness → consideration → decision.)*

---

## 7. Persona scoring

Per `persona-scoring.md` (Relevance / Clarity / Trust / Action, 25 pts each). The two personas requested, scored against each one's best-fit live page.

| Persona | Page scored | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|---|
| **Corporate brand-activation buyer** | `/luxury-brand-event-catering-delhi-ncr` | 23/25 | 19/25 | 21/25 | 18/25 | **81/100** | Excellent |
| **Bride's family (large wedding)** | `/wedding-caterers-in-delhi` | 18/25 | 14/25 | 13/25 | 17/25 | **62/100** | Good |

**Corporate buyer (81/100):** Relevance is high because the page is purpose-built and directly cross-links to all four matching named case studies. Trust is strong for the same reason — named prestige brands are a rare, verifiable asset most Delhi NCR competitors can't show. Clarity and Action are docked because proof lives one click away in linked blog posts rather than inline on the page (logos/stats), and the CTA is the generic sitewide "Inquire" modal rather than persona-specific copy (e.g., "See our brand-launch capability").

**Bride's family (62/100):** Relevance is decent — the page has a "Top Wedding Caterers in Delhi: How Virtuoso Compares" section that engages the comparison need directly — but Trust is the weak dimension: one of the two case studies linked from this page is the BMW corporate launch, not a wedding, weakening the topical proof chain exactly where this persona wants wedding-specific evidence, and there's no visible review count/star rating to counter the star-rated directory listings this persona is also seeing on the same SERP.

**Weakest persona: Bride's family, 62/100.**
**Top issue:** Trust dimension (13/25) — proof density and wedding-specific case-study linking are both thinner than the corporate-buyer page gets.
**Recommended fix:** Add 2-3 named wedding case studies (with couple-level specifics, matching the treatment already given to Lamborghini/Tesla/Ferrari) directly linked from `/wedding-caterers-in-delhi`, and surface a review count/rating if one exists (or start collecting one visibly) to match the star-rating cue this persona sees on every directory competitor.

**Systemic issue across both personas:** Clarity is the second-weakest dimension for both (19/25 and 14/25) — proof and comparison content exist but require either a click-through or a scroll through prose rather than being scannable inline.

**Priority actions:**
1. Fix the bride's-family Trust gap on `/wedding-caterers-in-delhi` (wedding-specific case studies + visible rating).
2. Resolve the C2 cannibalization so ranking signal for "best wedding caterers in delhi" consolidates onto this same page instead of splitting with `/best-wedding-caterers-in-delhi-what-sets-them-apart`.
3. Claim the "luxury caterers in delhi" phrase (H2) — the corporate-buyer page pattern (81/100) shows Virtuoso already knows how to build a high-scoring page when proof is linked inline; apply the same pattern to a wedding/general-luxury version.

---

## 8. Limitations

- `WebSearch` returns AI-synthesized summaries plus a top-links list, not raw SERP HTML — PAA boxes, ad copy, featured-snippet formatting, and AI Overview presence/citations could not be directly observed. SERP feature analysis above is inferred from result-type patterns and title/domain signals, not a screenshot of the live SERP.
- Several generic queries without an explicit India/city qualifier returned US-market-biased results ("wedding catering menu," and to a lesser extent both "near me" queries) rather than India-localized results; these are marked NOT ANALYSED or caveated rather than guessed. "wedding dishes" and "indian wedding veg food menu list" were not independently searched at all.
- No rank-tracking tool was used — this audit describes what page **types** occupy page 1 for each query, not Virtuoso's current rank position (if any) for each one.
- Pages were parsed from server-rendered HTML (the site is EJS/Express, `is_spa: false`, fetched in `raw` mode) — above-the-fold visual layout and exact modal copy were inferred from source HTML/JS, not a rendered screenshot.
- The four named competitors (Kitchen Art, Foodlink, Food Inc by Yum Yum Tree, Creative Cuisines Inc) were not independently audited beyond noting their absence from these 14 SERP pulls.
- Persona scoring was time-boxed to each persona's single best-fit page rather than exhaustively re-scoring all 18 fetched pages against both personas.

---

## Cross-skill references

- E-E-A-T / proof-density gaps for the bride's-family persona → `/seo content` for a deeper case-study and trust-signal audit.
- Missing `Review`/`AggregateRating` schema (L3) → `/seo schema` for generation.
- Near-me/Local Pack gap (M1) → `/seo local` for Google Business Profile analysis.
- Cannibalized "wedding caterers in Delhi" cluster (C2) → `/seo page` for a URL-consolidation plan across the four affected pages.

Generate a PDF report? Use `/seo google report`.
