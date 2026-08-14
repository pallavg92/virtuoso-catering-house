# Local SEO Audit — virtuosocatering.com
Audited: 2026-08-14 · Business: Virtuoso Catering House, luxury catering, Delhi NCR (Noida-based, serves Delhi, Noida, Greater Noida, Gurugram) · Type: **Hybrid** (staffed atelier/tasting room with a visible street address, plus explicit service-area language for the wider NCR)

## Score: 51 / 100

| Dimension | Weight | Score | Weighted |
|---|---|---|---|
| GBP Signals | 25% | 48/100 | 12.0 |
| Reviews & Reputation | 20% | 20/100 | 4.0 |
| Local On-Page SEO | 20% | 65/100 | 13.0 |
| NAP Consistency & Citations | 15% | 70/100 | 10.5 |
| Local Schema Markup | 10% | 55/100 | 5.5 |
| Local Link & Authority Signals | 10% | 55/100 | 5.5 |
| **Total** | | | **50.5 → 51** |

---

## The headline question: are the location pages genuinely differentiated, or templated swaps?

**Genuinely differentiated — confirmed by direct measurement, not just a read-through.** Pairwise 5-gram Jaccard similarity across all 10 live location/service pages: maximum 0.207, median 0.076, zero pairs at or above 0.30 (the conventional "heavy shared boilerplate" line), zero at or above 0.60 (near-duplicate). My own close read of the source content in `utils/content.js` corroborates this — no cluster shares copy-pasted paragraphs. **This is the correct headline finding, and it reverses the risk hypothesis this audit started with:** location-page content is not where the exposure is. The real structural gap, detailed below, is the near-total absence of on-site review/rating signal and embedded map/GBP proof (Reviews 20/100, GBP 48/100) — that combination, not doorway pages, is the biggest verified local-ranking risk on this site.

### Cluster 1 — /wedding-caterers-in-delhi vs /wedding-caterers-in-noida
**Safe differentiation.** Delhi page frames around "what 'best' means," names four real competitors (The Kitchen Art Company, Foodlink, Food Inc Catering by Yum Yum Tree, Creative Cuisines Inc) and closes with an FSSAI-verification pitch. Noida page frames entirely differently: function-by-function menu philosophy ("At the mehendi, regional cuisines tend to land best... the mehendi is usually followed by the engagement or cocktail night, which is where the party mode and the most exciting eating of the whole wedding actually happens"), the caterer-vs-banquet ownership argument (food/presentation/crockery), live-sushi-bar and celebrity-chef sections, zero competitor list, zero pricing FAQ. Distinct FAQ sets, distinct specialization frameworks, distinct H1s.

### Cluster 2 — /best-catering-services-in-noida vs /catering-services-in-greater-noida vs /best-caterers-in-noida-virtuoso-catering-house
**Differentiated at the copy level, but two real issues live here that are unrelated to duplication:**
1. **Title/query overlap (Medium).** `/best-catering-services-in-noida` ships `metaTitle: 'Catering Services in Noida | Best Caterers, Noida'`; `/best-caterers-in-noida-virtuoso-catering-house` ships `title: 'Best Caterers in Noida | Virtuoso Catering House'`. Both `<title>` tags target the identical head query "best caterer(s) in Noida" with two different URLs. Body copy does not overlap (consistent with the similarity data) — this is a SERP-competition risk, not a content risk.
2. **Standalone thin content (Low-Medium, not a cross-page issue).** `/best-catering-services-in-noida` is legacy WordPress copy (per its own code comment: "migrated from the previous WordPress site... slugs, titles, and descriptions match the archived WordPress URLs exactly") and reads generically on its own merits, independent of any sibling page: *"Offer for housewarming events, best catering services in Noida. This includes showers, pujas, and other religious gatherings."* / *"Ensure with meticulous attention to detail, seamless execution of your event."* Its "Service Areas We Cover In Noida" list is bare sector numbers with no named venues: *"Sector 18, 62, 63, 104, 137. Noida Extension (Greater Noida West). Ghaziabad. Greater Noida. Indirapuram. Delhi NCR (on request)."* `/catering-services-in-greater-noida`, by contrast, names Jaypee Greens, Pari Chowk, Sector 150/151, Knowledge Park I–III, the Yamuna Expressway farmhouse corridor, quotes co-founder Aarti Sharma by name running tastings personally, and explains a specific operational reason for its claims ("the farmhouses along the Yamuna Expressway... have no permanent kitchen to speak of... So we build the kitchen on site"). `/best-caterers-in-noida-virtuoso-catering-house` is a third, editorial register again — it cites the actual ANI News award title and date and names the other four honorees (Orange Blossom, The Salt House Catering Services, Rajbhog Caterers, The Kitchen Art Company). All three are genuinely different pieces of writing; only the first is weak in isolation.

### Cluster 3 — /best-wedding-caterers-in-delhi-what-sets-them-apart vs /caterers-in-delhi-finding-the-right-fit-for-your-event vs /how-to-hire-wedding-caterers-in-delhi-for-a-luxury-wedding
**The most distinct pages on the site** (all three score below 0.08 similarity against anything else, per the measurement above). Confirmed distinct angles: a "six criteria" buyer checklist; a "spectrum" piece (buffet-operator vs. boutique) that is the one place carrying the full named-competitor roster with real detail (*"The Kitchen Art Company, in the market since 1997 and led by chef Puneet Sikand... Creative Cuisines Inc, operating out of Vasant Vihar since 2006"*); and a "boutique vs. banquet" framework. The one real, evidence-backed issue in this cluster has nothing to do with overlap: `/how-to-hire-wedding-caterers-in-delhi-for-a-luxury-wedding` is flagged in its own source comment (`utils/content.js`, above the object definition) as **"Published verbatim as supplied... No wording changed"** and originally linked to two URLs that don't exist on this site (`/wedding-catering-packages-in-delhi`, `/wedding-caterers-in-delhi` before correction). That page names three competitors found nowhere else on the site or in the brand's documented comparison set — Royal Delights Catering, Tandoori Tales, Turban Tales — with specific unverified claims (*"received consistent recognition from local event planners for reliable high-volume delivery"*). This directly contradicts the standard `/press.ejs` sets for itself: *"Every feature below links to the original, published article... no reconstructed quotes, no unverifiable claims."* Flagged below as High — it's a provenance/trust issue, not a duplication issue.
Also within this cluster: `/best-wedding-caterers-in-delhi-what-sets-them-apart` (title: *"Best Wedding Caterers in Delhi: What Sets Them Apart"*) carries forward the Cluster-1 title overlap with `/wedding-caterers-in-delhi` (title: *"Best Wedding Caterers in Delhi | Top Wedding Caterers, Delhi NCR"*) — same query pair already logged, not double-counted.

---

## NAP — exact text as rendered, source by source

| Source | Address (verbatim) | Phone (verbatim) |
|---|---|---|
| JSON-LD `LocalBusiness`/`FoodEstablishment` (every page, `partials/head.ejs`) | streetAddress "A-15, A-Block, Sector 61", addressLocality "Noida", addressRegion "Uttar Pradesh", postalCode "201301", addressCountry "IN" | `"telephone": "+91-8700915463"` |
| JSON-LD `Organization` (every page, same partial) | Identical fields to above | `"+91-8700915463"` |
| Footer, sitewide (`partials/footer.ejs`) | "A-15, A-Block, Sector 61" / "Noida, **UP** 201301" | "+91 87009 15463" (visible), `href="tel:+918700915463"` |
| `/contact` page body | "A-15, A-Block, Sector 61" / "Noida, **Uttar Pradesh** 201301" | "+91 87009 15463", `href="tel:+918700915463"` |
| `/about` page (leadership copy) | "Virtuoso Catering House is based at A-15, A-Block, Sector 61, Noida, Uttar Pradesh, India" (no PIN stated) | not stated |
| `/privacy-policy` | "A-15, A-Block, Sector 61, Noida, Uttar Pradesh 201301, India" | "+91 87009 15463" |
| WhatsApp CTAs (float button, popup drawer) | — | `https://wa.me/918700915463` |

**Verdict: consistent.** Every source agrees on the street, sector, city, state and PIN, and the phone digits are identical everywhere (the schema/dash, tel-URI/no-separator, and display/spaced formats are all standard, valid renderings of the same number, not a discrepancy). One real inconsistency: the footer abbreviates **"UP"** while every other surface spells out **"Uttar Pradesh."** Low severity, one-line fix.

Because NAP is pulled from a single `business` object in `utils/pageMeta.js` and rendered through one shared `partials/head.ejs`/`partials/footer.ejs` on all 38 pages, schema-level drift is structurally close to impossible here — a genuine strength, not just current-state luck.

## areaServed in schema

**Declared, but only at the page level, not the entity level.** Each of the 6 commercial landing pages carries a `Service` node with a single-city `areaServed`, e.g. (from the live `/catering-services-in-greater-noida` HTML): `"areaServed":{"@type":"City","name":"Greater Noida"}`. That is deliberate and well-reasoned — a code comment in `pageMeta.js` explains: *"claiming a wider area than the page addresses weakens the entity signal."* What's missing: the sitewide `LocalBusiness`/`FoodEstablishment` node in `partials/head.ejs` — the one on every single page, including the homepage — has **no `areaServed` property at all**, and also has no `openingHoursSpecification` (despite real posted hours existing in the visible HTML on `/contact`: "Tastings by appointment, Tuesday — Saturday, 10am–6pm") and no `aggregateRating`.

## Review / testimonial signals on-site

**Structurally absent.** Grepped the full codebase (`utils/content.js`, every `.ejs` view): zero instances of `aggregateRating`, `reviewCount`, `ratingValue`, or a `Review` schema node anywhere. No star rating, no review count, and no link to a live Google/WedMeGood review page is rendered anywhere on the site. A DuckDuckGo check (unverified, needs manual confirmation) surfaced what look like real third-party profiles — a WedMeGood listing titled "Virtuoso Catering House - Noida | Price, Menu & Reviews," a JustDial listing, and a WeddingWire.in listing — none of which are linked from `virtuosocatering.com` itself (the schema `sameAs` array only contains Instagram, Pinterest, LinkedIn, and a Google Maps short link). The four testimonials that do exist (homepage + all 6 landing pages, identical set, e.g. *"They did not just cater our wedding — they translated us into an experience," — Ananya Kapoor, Private Wedding, Udaipur*) are marketing copy: no date, no photo, no verification badge, and one is attributed to a wedding in Udaipur — outside the Delhi NCR service area — which visibly undercuts the hyper-local pitch on the Noida/Delhi pages it appears on.

## GBP optimization checklist

| Signal | Status |
|---|---|
| Google Maps iframe embed | Present on `/contact` only. Absent from homepage and all 6 location landing pages. |
| "View on Google Maps" / directions link | Present (`maps.app.goo.gl/VztH6YKQfN13Yogu7`) — footer (every page) + `/contact`. |
| Deprecated GBP chat CTA ("Message us on Google") | None found — live-site lint via `gbp_deprecation_lint.py` returned `"ok": true`, 0 findings. |
| `*.business.site` legacy URL | None found anywhere in the codebase or live HTML. |
| GBP review widget / rating badge | Absent. |
| GBP posts / photo evidence embedded on-site | Absent (real event photography exists on `/our-work` and in blog case studies, but nothing sourced from or labeled as GBP). |
| Primary GBP category correctness | **Cannot verify without GBP access** — see Limitations. |

## Citation presence (Tier 1)

Yelp/BBB (the skill's default Tier‑1 set) are not the relevant directories for an India-based caterer. A search-engine check (not a direct fetch — flagging confidence accordingly) surfaced apparent listings on **WedMeGood**, **JustDial**, **WeddingWire.in**, and a niche directory (Catereroo); none are linked from the site's own `sameAs` or footer. This matches the standing gap already tracked in the account's AEO notes (WedMeGood/GBP as a target list). **Needs manual/GBP-console confirmation** — treat as directional, not certain.

## Local schema validation

Correct subtype call: schema.org has no `Caterer` type (open, unresolved GitHub issue, cited directly in the code's own comment), so `["LocalBusiness","FoodEstablishment"]` is the defensible choice — better than forcing `Restaurant`, which would falsely imply dine-in service. `geo` uses 7 decimal places (28.5964201, 77.3641803), beating the 5-decimal minimum. `FAQPage` and `BreadcrumbList` are implemented on every location page. One integrity bug: the `Person` schema for co-founder Aarti Sharma (emitted on `/about`) sets `"url": siteUrl + "/team/aarti-sharma"` — that route returns **HTTP 404** (confirmed live; only `/team/pallav-goel` exists). She's the named, quoted authority behind the tasting-process trust claims on several location pages, so this is a real entity-graph gap, not cosmetic.

## What genuinely works

- NAP is architecturally single-sourced (`pageMeta.js` → shared partials) across all 38 pages — consistency here isn't an accident.
- **Location-page differentiation is real and measured**, not just claimed — see headline section above. Rare for a multi-location local site.
- Verifiable, dated, named press coverage (ANI News, News18, Times of India, Republic India) exposed as `NewsArticle` `subjectOf` schema on `/press`, with an explicit no-fabrication editorial policy stated on the page itself.
- Named, specific proof-of-work on the strongest location pages: Sarita Vihar showroom (Lamborghini Temerario, April 2025), Orchid Business Park (Tesla Centre Gurugram, Nov 2025), Promenade Mall (Bath & Body Works, Feb 2026), Buddh International Circuit (Ferrari APAC) — real venues, real dates, real guest counts.
- `Person` schema for both founders tied to the `Organization` via `worksFor`, building real entity structure (bar the one broken URL above).
- Zero deprecated GBP patterns anywhere on the live site.

## Top prioritized actions

**Critical**
1. Get real GBP rating/count and wire it into the sitewide `LocalBusiness` schema as `aggregateRating`, plus a visible on-page reviews module — only with real, current numbers, never estimated. This is the single largest verified gap on the site (Reviews dimension: 20/100).
2. Add a Google Maps embed to the homepage and to all 6 location landing pages — currently only `/contact` has one, so the pages built to rank for "[service] in [city]" carry zero embedded proof of the very location they target.

**High**
3. Resolve the "best caterer(s) in Noida" title overlap between `/best-catering-services-in-noida` and `/best-caterers-in-noida-virtuoso-catering-house` — differentiate the titles/intents or pick one primary target.
4. Resolve the parallel "best wedding caterers in Delhi" title overlap between `/wedding-caterers-in-delhi` and `/best-wedding-caterers-in-delhi-what-sets-them-apart`.
5. Fact-check or rewrite `/how-to-hire-wedding-caterers-in-delhi-for-a-luxury-wedding` — it's disclosed in-code as externally supplied verbatim and names three competitors (Royal Delights Catering, Tandoori Tales, Turban Tales) absent from the brand's own documented comparison set, undermining the zero-unverifiable-claims standard the rest of the site holds to.
6. Build a dedicated Gurugram location page — Gurugram is explicitly named as a served city (About page copy, the Delhi hiring guide) and has real proof of work (Tesla Centre Gurugram), but no dedicated landing page exists; all 6 current pages target Noida/Greater Noida/Delhi only.
7. Rewrite `/best-catering-services-in-noida` (and, lower priority, `/corporate-catering-services-in-noida`) off the legacy-WordPress template — both read generically in isolation (quoted above) against a site that has since proven it can do better on `/catering-services-in-greater-noida`.

**Medium**
8. Add `areaServed` (Delhi, Noida, Greater Noida, Gurugram) and `openingHoursSpecification` to the sitewide `LocalBusiness` node in `partials/head.ejs` — both currently exist only in visible text or at the single-page `Service` level, not at the core entity.
9. Fix Aarti Sharma's `Person` schema `url` (404 on `/team/aarti-sharma`) — build the page to mirror `/team/pallav-goel`, or point `url` at `/about`.
10. Swap or remove the Udaipur-attributed testimonial on Noida/Delhi NCR pages; ideally localize testimonials per page rather than reusing one fixed set of 4 everywhere.
11. Confirm and link the site's real third-party citations (WedMeGood, JustDial, WeddingWire) into `sameAs` and the footer once manually verified.

**Low**
12. Standardize "Uttar Pradesh" vs. "UP" between the footer and contact/about/privacy-policy text.
13. Add `/wedding-caterers-in-delhi` to the footer's "Areas & Specialties" column — currently the only one of the six landing pages missing from it (still reachable via homepage and cross-links, so this is low-impact).
14. Reconsider the `servesCuisine` schema list ("Mexican," "Chinese," "Sushi," "Bakery") against the bespoke-luxury-Indian-wedding brand positioning.

## Limitations

No GBP API or DataForSEO access was available for this audit. The following could **not** be verified and need GBP-console or paid-tool access to confirm: actual current review rating/count and review velocity (the 18-day-rule check is impossible without this), primary/secondary GBP category correctness, whether the listing is fully verified, live map-pack position for any query, and confirmed status of the WedMeGood/JustDial/WeddingWire listings referenced above (found via a search-engine fetch, not a direct citation-page fetch — treat as directional). Backlink profile and true off-site domain authority were not assessed. Proximity — 55.2% of local ranking variance per the Search Atlas ML study — is outside the website's control and isn't scored here.
