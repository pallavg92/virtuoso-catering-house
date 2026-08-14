# Semantic Cluster & Cannibalization Findings — Virtuoso Catering House

Status: partial pass, written mid-analysis at coordinator request. Sections marked
**Not analysed** below were not reached — do not treat their absence as "no issue."

## Category Score (Content Architecture / Semantic Clustering): 58/100

Real strengths: the Delhi/Noida geographic split is SERP-validated (near-zero URL
overlap between city SERPs), and `utils/redirects.js` shows two prior cannibalization
cases already caught and fixed by hand. Real deductions: unresolved query-ownership
collision on the highest-intent Delhi wedding pages, a live internal-link bug that
blurs the Delhi/Noida split it otherwise respects, a mis-ranking homepage vs.
dedicated-page signal on Noida, and the single largest volume/difficulty opportunity
in the whole keyword set (the menu cluster) currently owned by nobody.

---

## Question 1: The Menu Cluster — real SERPs, verdict, what to build

| Keyword | Vol/Diff | What actually ranks (US-run WebSearch) | Read |
|---|---|---|---|
| indian wedding menu list | 1600/3 | weddingwire.in, akshramevents.com, destinationweddingbharat.com, plannersy.com (2 different URLs), sodjla.com, happywedding.app — all small/mid wedding-content blogs and event-planning companies running content marketing | High confidence: query is disambiguated by "Indian," so geo-bias in a US-run search is low |
| indian wedding veg food menu list | 1300/8 | Same publisher set; 3 exact-URL overlaps with the row above (weddingwire, destinationweddingbharat, plannersy) | Same cluster as above, separate post (veg-specific spoke) |
| wedding menu | 1600/3 | 100% Western wedding-industry: Knot, Minted, Paperlust, VistaPrint | **Not winnable, not relevant.** Un-disambiguated query, dominated by huge global platforms Virtuoso cannot outrank and shouldn't try to |
| wedding menu list / wedding dishes / wedding reception menu / marriage reception menu / wedding catering menu / reception menu (bare) | 590–1000, diff 3–15 | 100% US catering-company and wedding-vendor blogs (Knot, Minted, Perfect Setting, Landmark Catering Utah, 440 Elm) | Likely geo-personalization bias in my read (I cannot confirm the India SERP from here), **but** these bare phrasings are not India-disambiguated either way — same conclusion as above, don't target bare |
| shadi ka menu (Hindi variant, spot-checked) | 110–390 | Thin/weak SERP: Google-Translate-wrapped pages, Wikipedia noise (unrelated "Shadi" name entries) | Real but modest opportunity — weak competition, weak demand signal. Not enough to justify a standalone page |

**Verdict: partially winnable, and only with real qualification.** The "Indian"-qualified
variants are realistically winnable — the incumbents are small wedding-content
operators, not authority aggregators, consistent with the difficulty=3 score, and
several visibly recycle the same generic dish list ("Paneer Butter Masala, Dal
Makhani, Stuffed Kulchas, Rajma" appears near-verbatim across two unrelated domains),
meaning genuinely practitioner-sourced content (real executed menus, real photography,
an actual caterer's byline) has a real differentiation edge. But the intent is
**browsing/inspiration, not hiring** — this is a national keyword, not a Delhi one, so
most traffic won't be a Delhi NCR lead. Its value is topical authority, an internal-link
funnel into the Delhi commercial pages, and AI-citation surface area, not direct bookings.

**What to build:** one new pillar page — a comprehensive, categorized "Indian Wedding
Menu" guide (starters/mains/breads/regional/desserts, by function), ~2,800–3,200 words,
built from real Virtuoso dishes and photography, explicitly targeting "indian wedding
menu list" as primary and "indian wedding veg food menu list" as a secondary spoke
section. Do not build a page for bare "wedding menu" or the other un-qualified English
variants — fold them in as on-page synonyms only. Handle the Hindi variants as an FAQ
block on the same pillar, not separate pages. This is a genuine gap: no existing
Virtuoso page (including `/blog/wedding-catering-menu-in-delhi`, which is narrative/
Delhi-specific, not a categorized list) currently targets this cluster.

---

## Question 2: Cannibalization — the 5-page set, query ownership

Confirmed independently: these pages are not textual duplicates (consistent with the
content specialist's 5-gram Jaccard read). The collision is in **query ownership and
promise**, not copy. Two of these titles make almost the identical claim to Google.

| Page | Current signal | Query it should own | Verdict |
|---|---|---|---|
| `/wedding-caterers-in-delhi` | Landing template, Service schema (areaServed: Delhi), FAQ schema, Pallav's real voice | **"wedding caterers in delhi" + "wedding caterers in delhi ncr" + "best wedding caterers in delhi"** | Keep as the pillar. Strongest schema and most inbound links already point here — this should be the hub |
| `/best-wedding-caterers-in-delhi-what-sets-them-apart` | PDF-sourced, 6-criteria comparison guide | Currently claims the **same** "best wedding caterers in Delhi" promise as the row above — title tags are near-duplicates of intent | **Highest cannibalization risk in the set.** Recommend consolidating its unique material (the 6-criteria structure, live-station trend detail) into `/wedding-caterers-in-delhi` and 301-redirecting, or, if kept standalone, re-titling away from "best wedding caterers in Delhi" toward an unclaimed angle (e.g., a pre-booking checklist) so it stops competing head-on with the row above |
| `/how-to-hire-wedding-caterers-in-delhi-for-a-luxury-wedding` | PDF-sourced, boutique-vs-banquet decision framework | **"how to hire/choose a wedding caterer in Delhi"** (informational/decision-stage) | Keep, but trim the pricing-tier and FSSAI sections that duplicate the other two PDF pages almost figure-for-figure (₹800–1,500 / ₹1,500–2,500 / ₹2,500–4,000 / ₹4,000–6,500, non-veg +35% recur in three separate "unique" articles) — lean harder into the comparison framework, which is this page's one genuinely unclaimed angle |
| `/caterers-in-delhi-finding-the-right-fit-for-your-event` | PDF-sourced, all-event-types (not wedding-only), tier-matching guide | **"caterers in delhi" + "catering services in delhi"** (broad, non-wedding) | Keep, reposition explicitly as the generic/all-occasions page vs. the wedding-only pillar. This is the only one of the four not wedding-exclusive, so it's the natural owner of the two biggest, broadest keywords in the whole set (4,400 vol each) |
| `/best-caterers-in-noida-virtuoso-catering-house` | Short, proof/verification angle (ANI News, named clients) | **"best caterers in noida"** | Not a real Delhi-cluster collision — it's Noida, a different, SERP-confirmed-distinct geography. It's likely in this set only because of a bug (below). Keep as-is |

**Bug found, not guessed:** `utils/content.js` (`caterersInDelhiFindingTheRightFitPage`,
closing section) links to `/best-caterers-in-noida-virtuoso-catering-house` — the Noida
page — using the anchor text **"best caterers in Delhi."** That single mismatched
anchor is the most plausible reason the Noida page reads as part of the Delhi
cannibalization set. Fix: repoint that anchor to `/wedding-caterers-in-delhi` or
`/best-wedding-caterers-in-delhi-what-sets-them-apart`, whichever survives the
consolidation above.

**Additional Noida-side evidence (not part of the 5, flagged because it's live SERP
data):** searching "wedding caterers in noida" surfaces the Virtuoso **homepage**,
not the dedicated `/wedding-caterers-in-noida` page, in the top 10. The dedicated page
is the right architecture (its SERP has near-zero overlap with the generic Noida
caterer SERP, so it deserves to exist separately) but isn't yet winning its own
keyword internally — a signals/internal-linking issue, not a duplication issue.

---

## Cluster Map (cluster → owning page → gap)

| Cluster | Owning page(s) | Gap |
|---|---|---|
| Delhi wedding-caterer commercial | `/wedding-caterers-in-delhi` (pillar) + 3 PDF pages above | Query overlap, not coverage gap — see Q2 |
| Delhi generic caterer commercial ("caterers/catering services in delhi", 4,400 vol each) | `/caterers-in-delhi-finding-the-right-fit-for-your-event` (weak claim today) | Real SERP gap: zero Virtuoso URLs appear in any of 9 Delhi commercial keyword SERPs checked. Directory sites (JustDial, Sulekha, Sloshout, LBB, WeddingWire.in) and branded competitor sites own this territory. Not a content-architecture fix — flagging for the local-SEO/backlink workstream, not a new page |
| Noida commercial | `/best-catering-services-in-noida`, `/wedding-caterers-in-noida`, `/best-caterers-in-noida-virtuoso-catering-house`, `/corporate-catering-services-in-noida` | No coverage gap; internal-signal gap (see homepage mis-ranking above) |
| Greater Noida | `/catering-services-in-greater-noida` | None — correctly separated, confirmed distinct SERP from Noida proper |
| **Menu / informational (highest opportunity)** | **None** | See Q1 — full pillar gap |
| Pricing (wedding catering cost, per-plate cost) | `/blog/luxury-catering-cost-delhi-ncr` | Existing page is already correctly Delhi-NCR-qualified, which is the right call — bare "catering per plate cost" / "catering price list" SERPs I checked are 100% US catering-cost-guide content, confirming the qualified approach over chasing the bare term |
| Near-me / transactional (veg catering services near me, etc.) | None dedicated | Not a content gap — "near me" queries are Local-Pack/directory-dominated by structure (Yelp/Thumbtack in my US read, JustDial/Sulekha-equivalent expected in India), not blog-content-winnable. Belongs to GBP/local-SEO workstream, not this cluster plan |
| Molecular bar for wedding | `/services` (mentions mixology only in passing) | Real, specific gap: dedicated competitor content exists (WeddingInDelhi.com has a full page on it) and Virtuoso already runs this service line but has no page optimized for it |
| Indian wedding cocktail party | None, and should stay that way | **Not a catering keyword.** SERP is 100% fashion/outfit content (David's Bridal, Pinterest, WedMeGood dress photos, Weddingplz). Exclude from the content cluster — this is the exact kind of false-positive text similarity the SERP-overlap method exists to catch |
| Buddh International Circuit events | `/blog/ferrari-track-day-catering-buddh-international-circuit` | Already owned by a strong, specific case study. No action |

---

## What genuinely works

- Delhi/Noida split is SERP-real, not just assumed — confirmed near-zero organic URL
  overlap between the two cities' SERPs across every keyword pair checked.
- `utils/redirects.js` shows active cluster governance: `/wedding-caterers-delhi-ncr`
  was already re-scoped to a Journal editorial specifically to resolve cannibalization
  against `/wedding-caterers-in-delhi`, and a muddled Delhi/Noida-mixed page was
  cleaned into a Noida-only pillar. This is prior art worth continuing, not redoing.
- Delhi/NCR-qualifying the cost and menu-in-Delhi content (rather than chasing bare
  global terms) is the correct instinct and matches what the real SERPs reward.

## Not analysed (do not assume clean)

- Full 30–50 keyword PAA/related-search expansion (worked from the supplied seed set only)
- Exhaustive pairwise SERP matrix (used the pre-grouping/boundary-check optimization, not full N×N)
- "wedding catering images" / "indian wedding catering images" (image-intent, needs Google Images-specific read)
- Hindi variants "shadi menu list" and "shadi me khane ka menu list" individually (only "shadi ka menu" spot-checked; assumed similar behavior, not verified)
- Full `cluster-plan.json` link adjacency list and `cluster-map.html` visualization
- Template/word-count assignment per gap post
- `audit-data.json` structured entry for the Content Architecture category
