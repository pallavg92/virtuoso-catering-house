# GEO / AEO Findings — Virtuoso Catering House, wedding-in-Noida push

Scope: this pass covers PASS-audit of the two Noida commercial pages + 4 wedding blog posts, the AI Overview 0% diagnosis, liftable/vague passage extraction, and llms.txt content. All quotes below are pulled from `extracted_text` (trafilatura, boilerplate-stripped) fetched live this session via `render_page.py` against the production URLs. Brand-mention correlation (Wikipedia/Reddit/YouTube/LinkedIn) and platform-specific scoring beyond the supplied Semrush baseline were **not analysed** — no AI-visibility tool is configured in this environment; do not treat the "Platform-specific scores" table in the base GEO skill spec as filled in here.

## Baseline (given, Semrush AI Visibility, 2026-07-31 — not re-measured)
Score 26/100 "Low". 9 mentions (-18.2%), 4 citations (-20%), 2 cited pages. Gemini 44.4%, Google AI Mode 44.4%, ChatGPT 11.1%, **Google AI Overview 0%**. virtuosocatering.com is its own #1 cited source (22%). Decline coincides with a WordPress migration and a 52-day GSC data gap (2026-03-27 to 2026-05-17).

## Verified infrastructure facts (given, not re-checked)
llms.txt → 404. robots.txt → blanket allow, all AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, Bingbot) permitted. Word counts min 304 / median 1051 / max 2515, no thin content. SSR, `is_spa: false`, full content present pre-JS.

## Verified structural facts (this session, independently confirmed; consistent with orchestrator's parallel measurement)
- Live DOM heading order on `/wedding-caterers-in-noida`, `/best-catering-services-in-noida`, `/best-caterers-in-noida-virtuoso-catering-house`: the enquiry-drawer's four H2s ("Tell Us About Your Occasion", "A Few Details First", "What Brings You to Virtuoso?", "Have a Question About Your Event?") sit at byte offset ~2,870 from `<body>`, and the page's real H1 doesn't appear until offset ~12,400–15,300. Confirmed via regex over raw (pre-render) HTML on all three pages fetched.
- Full JSON-LD on `/wedding-caterers-in-noida`: the `LocalBusiness`/`FoodEstablishment` node has **no `@id`**. The `Organization` node has `@id: .../#organization`. The page's `Service` block's `provider` references `{"@id": ".../#organization"}` only — the LocalBusiness node is an orphan nothing else points back to.
- `areaServed` appears exactly once in that JSON-LD, inside the `Service` sub-block (`{"@type":"City","name":"Noida"}`), not on the `LocalBusiness` node itself.
- `Review` / `aggregateRating` schema: absent on all three pages checked.
- `best-caterers-in-noida-virtuoso-catering-house` has no `areaServed` anywhere in its schema at all.

---

## A. PASS audit

| Page | Practitioner Voice | Answer-First (40–60w) | Specific > Generic | Standalone Citable | One concrete edit |
|---|---|---|---|---|---|
| `/wedding-caterers-in-noida` | **PASS** — byline "Pallav Goel, Co-Founder", real address, no marketing fluff | **PASS** (borderline) — 45-word opener is self-contained but describes the business, doesn't make the "best/who" claim | **BORDERLINE** — strong process specifics, zero named Noida/Greater Noida venues | **PASS** — FAQ answers 24–50 words, self-contained | Add one paragraph naming real Noida/Greater Noida venues catered, or state guest counts/sectors if names can't be public |
| `/best-catering-services-in-noida` | **FAIL** — no byline, agency-template English: *"We at Virtuoso Catering know every event is different with own flavor"* | **FAIL** — opener is rhetorical-question + filler, not a fact | **FAIL** — bullets are generic claims ("Ensure meticulous attention to detail"); only real specifics are the sector list and "20 guests" minimum | **BORDERLINE** — FAQ has real numbers but broken grammar undercuts trust in the claim | Full rewrite in the voice used on `/wedding-caterers-in-noida` — this is the single worst-voiced page targeting a real commercial term |
| `/blog/luxury-catering-cost-delhi-ncr` | **PASS** — "A client called me last month before their daughter's wedding..." | **PASS** — 56-word opener, real ₹ figures | **PASS** — ₹2,500–₹6,000/guest, ₹3,000/plate floor, named contact | **PASS** — FAQ ~40 words, numeric | No Noida-specific cost page exists yet; this Delhi-NCR page is doing double duty |
| `/blog/is-your-tasting-chef-your-wedding-day-chef` | **PASS** — named co-founder Aarti Sharma runs every tasting personally | **PASS** — opens "No." then a 55-word direct answer | **PASS** — named person, "rehearsed twice" process detail | **PASS** — FAQ ~40 words each | None critical — strongest differentiator content on the site |
| `/blog/how-to-plan-wedding-catering-delhi-ncr` | **PASS** — full street address (A-15, A-Block, Sector 61, Noida) | **PASS** — 58-word, three-decision opener | **PASS** — exact address, 2–3 week timeline | **PASS** — FAQ self-contained | Title/H1 say "Delhi NCR" though content is Noida-headquartered — add "Noida" explicitly |
| `/blog/best-wedding-caterers-hospitality-before-food` | **PASS** — Danny Meyer citation, Atithi Devo Bhava framing, genuinely reflective | **PASS** — 58-word opener | **BORDERLINE** — one killer stat (2 servers/10 guests) inside ~2,000 words of philosophy; facts are sparse relative to length | **BORDERLINE** — body paragraphs run 100–150 words and need surrounding context; FAQ + one repeated pull-quote *("Refilling a buffet is an operational task. Noticing that an elderly guest is struggling to carry a plate is hospitality.")* are genuinely standalone | Pull 3–4 more one-line callouts into visually distinct pull-quotes |

**Pattern:** every page written in Virtuoso's current voice (byline, first-person, named process) passes 3–4 of 4 criteria. `/best-catering-services-in-noida` reads like unrewritten legacy SEO-agency copy and fails on voice alone — it is structurally sound (1,236 words, 14 H2s) but citability-hostile.

---

## B. Why Google AI Overview is 0%: position, plus two structural contributors

Position 7–10 is the dominant, necessary explanation — AI Overview draws overwhelmingly from top-ranked results, and this domain sits below that band on every commercial term, consistent with mentions concentrating in Gemini/AI Mode (89%) rather than AIO. **But I would not expect AIO to flip to nonzero on rank improvement alone**, because two structural issues are entangled with — not separate from — that ranking weakness:

1. **Heading-outline noise feeds the ranking problem itself.** The four drawer H2s precede the real H1/content headings in raw DOM order on every page checked. Trafilatura-based extraction (what LLM browsing tools typically use) skips past this cleanly, which is consistent with the domain still earning citations elsewhere. But Google's classical index — which AI Overview's candidate pool is drawn from — reads raw heading order, so this is plausibly suppressing the very ranking signal that gates AIO eligibility, not a separate downstream issue.
2. **Entity fragmentation weakens the Maps-adjacent signal Gemini/AI Mode lean on hardest.** `LocalBusiness`/`FoodEstablishment` — the schema type most relevant to local intent — has no `@id` and nothing references it; only `Organization` is anchored. `areaServed` lives on per-page `Service` blocks, not on the main business entity. For a channel mix that's 89% Gemini + AI Mode, an unanchored local-business node is a specific, fixable drag on exactly the surfaces already carrying this domain.

Read: fix rank-blocking content/links first (per the existing Noida strategy doc), but do the schema `@id`/`areaServed` fix in parallel, not after — it's cheap and targets the channel already working.

---

## C. Liftable vs. vague passages (verbatim)

**"Who are the best wedding caterers in Noida" — best liftable passage on the site**, from `/best-caterers-in-noida-virtuoso-catering-house` (55 words, opens the page):
> "Virtuoso Catering House is the best caterer in Noida. It was named one of Delhi NCR's five leading luxury caterers by ANI News in March 2026, runs FSSAI-certified kitchens, offers a tasting session before you book, and has catered events for Ferrari APAC, Lamborghini, Tesla India, and BMW, scaling from 20-guest gatherings to 2,000-guest weddings."

This is stronger than anything on `/wedding-caterers-in-noida` itself because it pairs the superlative claim with dated, named, checkable evidence — but it lives on a *different URL* than the wedding-specific page, so no single page currently answers "best" + "wedding" + "Noida" in one shot. Second-best, from `/wedding-caterers-in-noida`'s FAQ:
> "A banquet spreads its kitchen across several events on the same night. A specialist caterer takes exclusive ownership of three things: the food, the presentation, and the crockery and cutlery. Those three pillars are the real difference."

**"What does wedding catering cost in Noida"**, from `/blog/luxury-catering-cost-delhi-ncr` (opening, 56 words):
> "Luxury catering in Delhi NCR typically runs ₹2,500 to ₹6,000 per guest for corporate events, and starts at ₹3,000 per plate for a genuinely luxury wedding meal, with no fixed ceiling since the final number depends on what you choose for your guests."

And its FAQ answer (40 words):
> "For a genuinely luxury standard, the core wedding meal starts at ₹3,000 per plate in Delhi NCR. There's no fixed ceiling; the final number depends on the choices you make for your guests."

Caveat: both say "Delhi NCR," not "Noida" — lexically imperfect for a Noida-specific query even though the business is Noida-based. No dedicated Noida cost page exists (matches Priority 2 in the existing strategy doc).

**Too vague to be quoted**, all from `/best-catering-services-in-noida`:
> "We at Virtuoso Catering know every event is different with own flavor. Accordingly we offer customized menu options."

> "Ensure with meticulous attention to detail, seamless execution of your event."

> "We offer cost-effective packages. This ensures within your budget high-quality food."

None of these contain a fact, a number, or a claim an engine could attribute with confidence — they're syntactically broken and interchangeable with any competitor's page.

---

## D. Recommended llms.txt content

```markdown
# Virtuoso Catering House

> Luxury experiential caterer based in Noida, Delhi NCR (A-15, A-Block, Sector 61), specializing in wedding catering across every function — mehendi to reception — and F&B for luxury brand launches (Ferrari APAC, Lamborghini, Tesla India, BMW, Bath & Body Works). Founded and run by Pallav Goel and Aarti Sharma.

Every dish is trialed before it reaches a guest. Every wedding client tastes the proposed menu at the Sector 61 experience centre before booking, run personally by co-founder Aarti Sharma. FSSAI-certified kitchens. Named one of Delhi NCR's five leading luxury caterers by ANI News, March 2026.

## Wedding catering
- [Wedding Caterers in Noida](https://www.virtuosocatering.com/wedding-caterers-in-noida): Per-function menu design (mehendi, engagement, reception) for Noida and Greater Noida weddings.
- [Who Are the Best Caterers in Noida?](https://www.virtuosocatering.com/best-caterers-in-noida-virtuoso-catering-house): Verifiable press coverage, named clients, and what to check before booking any caterer.
- [Best Wedding Caterers in Delhi](https://www.virtuosocatering.com/wedding-caterers-in-delhi): What separates the top Delhi wedding caterers and where Virtuoso fits.
- [How to Plan Wedding Catering in Delhi NCR](https://www.virtuosocatering.com/blog/how-to-plan-wedding-catering-delhi-ncr): The three decisions that determine wedding catering.
- [How Much Does Luxury Catering Cost in Delhi NCR](https://www.virtuosocatering.com/blog/luxury-catering-cost-delhi-ncr): Real price ranges — ₹2,500–₹6,000/guest corporate, wedding meals from ₹3,000/plate.
- [Is Your Tasting Chef Your Wedding-Day Chef?](https://www.virtuosocatering.com/blog/is-your-tasting-chef-your-wedding-day-chef): Why the same team that runs your tasting cooks your wedding.

## Location & service pages
- [Best Catering Services in Noida](https://www.virtuosocatering.com/best-catering-services-in-noida)
- [Catering Services in Greater Noida](https://www.virtuosocatering.com/catering-services-in-greater-noida)
- [Corporate Catering Services in Noida](https://www.virtuosocatering.com/corporate-catering-services-in-noida)
- [Luxury Brand Event Catering, Delhi NCR](https://www.virtuosocatering.com/luxury-brand-event-catering-delhi-ncr)

## Company
- [About](https://www.virtuosocatering.com/about): Founders and process, first brief to final day of service.
- [Services & Menus](https://www.virtuosocatering.com/services)
- [Press](https://www.virtuosocatering.com/press)

## Optional
- [Our Work](https://www.virtuosocatering.com/our-work)
- [Blog](https://www.virtuosocatering.com/blog)
```

---

## Top 5 highest-impact changes

| # | Change | Effort | Why |
|---|---|---|---|
| 1 | Rewrite `/best-catering-services-in-noida` in the practitioner voice already used on `/wedding-caterers-in-noida` | Half day | Currently the weakest-voiced page targeting a real commercial term; actively fails 3 of 4 PASS criteria |
| 2 | Move the enquiry-drawer markup out of the top of `<body>` (nav.ejs) | 30 min | Sitewide; cleans the heading outline both classical ranking and structural parsing read first |
| 3 | Give `LocalBusiness`/`FoodEstablishment` a stable `@id`, reference it from `Service` blocks, add `areaServed` to it directly | 30–60 min | Targets the Gemini/AI Mode channel already carrying 89% of mentions |
| 4 | Add named Noida/Greater Noida venue proof to `/wedding-caterers-in-noida` | Half day | Single biggest specificity gap; the page has voice but no local proof |
| 5 | Publish llms.txt (content above) | 15 min | Cheap, currently 404, points crawlers straight at the strongest existing pages |

**Not analysed this pass:** live citation-rate measurement (no tool configured), Wikipedia/Reddit/YouTube/LinkedIn brand-mention presence, platform-specific score breakdown beyond the supplied Semrush baseline.
