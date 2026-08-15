# Local SEO Re-Audit — Wedding-in-Noida Push
virtuosocatering.com · Audited 2026-08-15 · Focus: Google Business Profile (GBP) as the primary AEO (answer engine optimization, meaning how the site shows up in AI answers, not just search results) asset for "wedding caterers in noida"

This file builds on the full local audit from 2026-08-14 (`virtuosocatering.com-audit/findings/local.md`) and the wedding strategy document already on file (`virtuosocatering.com-audit/WEDDING-NOIDA-STRATEGY.md`). It does not repeat the differentiation testing, the full NAP source comparison, or the schema deep-dive already done there. It goes deeper on five specific questions, with GBP treated as the center of the audit, not an afterthought, because this business's AI mentions are about 89% Gemini plus Google AI Mode, and Gemini reads Google Business Profile directly. A quick plain-language note on why that matters: think of GBP as the business's ID card that Google and Gemini read first, before they ever look at the website itself.

## Business type and vertical (unchanged)
Hybrid (visible street address at A-15, A-Block, Sector 61, Noida, plus explicit Delhi NCR service-area language). Vertical: food service and catering. Schema.org has no dedicated "Caterer" type, so `["LocalBusiness","FoodEstablishment"]` remains the correct call, already implemented correctly.

## Score (carried forward, not re-derived)

| Dimension | Weight | Score | Weighted |
|---|---|---|---|
| GBP Signals | 25% | 48/100 | 12.0 |
| Reviews & Reputation | 20% | 20/100 | 4.0 |
| Local On-Page SEO | 20% | 65/100 | 13.0 |
| NAP Consistency & Citations | 15% | 70/100 | 10.5 |
| Local Schema Markup | 10% | 55/100 | 5.5 |
| Local Link & Authority Signals | 10% | 55/100 | 5.5 |
| **Total** | | | **51/100** |

Unchanged since yesterday because none of the inputs that would move it are newly visible this round; GBP itself is still unverifiable without login, and review count is still zero. The GBP score of 48/100 is built entirely from what's checkable on the website (Maps embed presence, absence of deprecated patterns) because the profile's actual fields, its categories, hours, photos, posts, Q&A, are invisible from outside. Treat 48 as a ceiling on confidence, not a measurement of the real profile, which could be better or worse. Section (a) below is how the owner closes that visibility gap.

---

## (a) GBP action list for "wedding caterers in noida"

**Every row below requires the owner (or someone with Manager access) to be logged into the Google Business Profile tied to virtuosocatering.com. None of it can be done by editing the website.** Where a check can be done just by looking (no login), that's noted.

| Field | Exactly what to do | Why | Login? |
|---|---|---|---|
| **Primary category** | First, check what it's currently set to (this alone is worth the login, since it's invisible from outside). If it's anything other than "Caterer," change it to "Caterer." If it's already "Caterer," leave it there, do not narrow it to a wedding-only category. | Primary category is the single strongest local ranking factor there is (Whitespark 2026 score: 193), and the wrong primary category is the single worst mistake (score: 176). Their own Search Console shows "caterers in noida" (2,350 impressions) and "catering services noida" (1,619) each dwarf "wedding caterers in noida" (426). Narrowing the primary category to weddings would trade the bigger number for the smaller one. | Yes |
| **Additional categories** | In the additional-categories field, type "Wedding buffet caterer" and "Corporate caterer." Select each only if Google's own autosuggest offers it (the field won't let you save something that isn't in Google's list, so this is safe to try either way). Two solid, accurate categories beat padding the list with ones that don't quite fit. | Captures the wedding and corporate search intent without touching the primary category that's carrying the bigger volume. BrightLocal 2026 benchmark: 3 to 5 additional categories is optimal. | Yes |
| **Business name** | Confirm it reads exactly "Virtuoso Catering House," nothing appended like "- Best Wedding Caterers Noida." | Google explicitly prohibits keyword-stuffed names and suspends listings for it. This is a check, not an addition. | No, viewable on Google Maps by anyone |
| **Services list** | Add distinct line items with two to three sentence descriptions: "Wedding catering, Noida and Greater Noida," "Mehendi and sangeet catering," "Cocktail night and reception catering," "Corporate and product launch catering," "Private celebration catering." | This is a field entirely under the owner's control that maps directly to what people search. | Yes |
| **Business description** (250 to 750 characters) | Draft: "Virtuoso Catering House designs wedding catering across every function, from the mehendi to the reception, for families in Noida and Greater Noida. Every wedding starts with a tasting at our Sector 61 experience centre, so nothing reaches your table that hasn't already been tested on ours. We also cater corporate events and brand launches across Delhi NCR." (approx. 330 characters) | Natural inclusion of the primary service plus the location, per GBP best practice. | Yes |
| **Service area** | Add as cities or localities, not sectors: Noida, Greater Noida, Greater Noida West (Noida Extension), Ghaziabad, Delhi, Gurugram. GBP's service-area field works at city, neighborhood, or postal-code level, it does not accept Noida's internal sector numbers as separate areas. | Correctness and trust, and it's what Gemini reads when it looks at the profile. One caveat to keep expectations honest: a March 2025 Sterling Sky finding says service area does not, on its own, currently move rankings, rankings hinge on the verified business address, category, and proximity. Set it up correctly anyway, but don't expect it alone to move position. | Yes |
| **Photos** (target 10+, refreshed periodically) | Upload, by category: exterior and signage of the Sector 61 experience centre, the tasting room, plated food from each function type shown on the wedding page (mehendi spread, live sushi bar, cocktail-night live counter), the team in service. Reuse real existing event photography already used on `/our-work` and in blog case studies rather than staging anything new. If real wedding-event photos exist, get the couple's permission before posting them. | 45% more direction requests with photos present (WebFX). Ranking benefit is "some vs. none," not "more is always better," so quality and variety matter more than raw count. | Yes, to upload |
| **Posts** | Post roughly weekly, using real assets: a tasting-room photo with a caption about the Noida wedding season, a repost of a real project (Lamborghini Temerario, Tesla Centre Gurugram, Ferrari Buddh Circuit, Bath & Body Works) framed for a GBP audience, a "now booking" note ahead of the November to February wedding season. | No direct ranking effect confirmed (WebFX testing), but posts can trigger "Post Justifications" (the snippet Google sometimes shows under a listing pulled from a recent post) and support the freshness signal that review velocity also depends on. | Yes |
| **Q&A** | Seed it with the same questions already planned for the on-page FAQ: cost per plate, guest capacity, multi-day/multi-function handling, whether the tasting chef cooks on the wedding day, dietary options (Jain, satvik, no onion no garlic). Business owners are explicitly allowed to post and answer their own Q&A entries, this is a different, permitted practice from reviews, which must come from real customers. | Gives Gemini and anyone scanning the profile pre-answered, specific content instead of an empty section. | Yes |
| **Website URL** | Keep it pointed at the homepage as the default (matches the broad "Caterer" primary category). If GBP exposes a separate secondary link field for this category (a "Menu" or "Book" style link, distinct from the main Website field), point that one at `/wedding-caterers-in-noida` while the wedding push is active. Confirm which secondary fields exist for this category while logged in. | Keeps the primary link aligned with the primary category (avoiding the "Diversity Update" risk of the site's strongest page and the map-pack listing effectively racing each other), while still giving the wedding page a dedicated doorway if one's available. | Yes |
| **Hours** | Set to match the real posted hours on `/contact` exactly: tastings by appointment, Tuesday to Saturday, 10am to 6pm. If GBP offers a "by appointment only" setting for this category, use it rather than plain hours, so the profile doesn't show "closed" to someone searching outside 10 to 6 when the business is, in fact, bookable. | "Business open at time of search" is a confirmed ranking factor (Sterling Sky controlled study). Once confirmed here, mirror the same hours into the site's own schema, which currently has none (flagged in the 2026-08-14 audit as a standing gap). | Yes |

---

## (b) Review strategy

Zero review signal is the single biggest local gap on this site (Reviews dimension: 20/100), and it's doing double damage: no star rating anywhere in search, and nothing quotable for Gemini to pull into an AI answer. **Nothing below suggests writing, editing, or inventing a single review. Every review referenced here has to come from a real client, in their own words.**

**How many.** Target 10 real Google reviews as the first milestone. That number isn't arbitrary: Sterling Sky's research found a noticeable ranking boost specifically going from 9 to 10 reviews, with no similar jump from 10 to 11 (the "Magic 10"). After that, sustain roughly 1 to 2 new reviews a month, indefinitely. This matters more than the first push: the same research found rankings "fall off a cliff" after about 3 weeks with no new review (the 18-day rule). A single burst to 10 followed by silence undoes itself within a month.

**From whom.** Split roughly evenly between wedding clients and everyone else (corporate, brand-launch, private-event). The wedding push is the reason for this file, but the bulk of actual search volume is general and corporate catering (2,350 plus 1,619 plus 389 impressions versus 426 for weddings), and a review lifts the whole profile's star rating, not just one page. Go back through however many months of completed events are reasonable to reach, and ask everyone from that list, not a filtered subset picked by how happy they seemed. Asking everyone through the same channel is what keeps this on the right side of Google's and the FTC's rules against "review gating" (routing happy clients to the public review link and unhappy ones to a private inbox).

**What to ask, and how.** Generate a direct "write a review" link from inside GBP (a dedicated short link, different from the general Maps directions link already in the site's `sameAs`), and send something like this within a week or two of the event, while it's fresh:

> "Hi [name], it was wonderful working on [their event] with you. If you have two minutes, would you leave us a Google review? [direct review link] It genuinely helps other Noida families finding us the way you did. Mention whichever part stood out, the tasting, a specific function, anything real."

Never send a pre-written review for them to copy. Ask them, loosely, to mention what actually happened: which functions Virtuoso handled, the venue or sector if they're comfortable naming it, and roughly when. That's not just good review copy, it's exactly the specific, checkable detail the account's own PASS content standard already prizes over generic praise, and specific detail is what a model like Gemini favors when it's deciding what to quote. No discount, freebie, or other incentive tied to leaving a review, and no ghostwriting a client's review even a flattering one they'd "just have to post." Both violate Google's policy and the FTC's rule (penalties up to $53,088 per violation).

**On-site companion.** The four existing testimonials (unattributed, reused sitewide, one wrongly pinned to a Udaipur wedding on Noida and Delhi pages) should be retired in favor of a handful of the new real reviews, shown with name, month, and event type. This isn't optional decoration: Google's guidance for review rich results requires the review text to actually be visible on the page for a person to read, not just sitting in schema with nothing to match it. Schema with no visible counterpart is both a rich-result eligibility problem and, more to the point here, gives Gemini nothing to quote.

**Exact schema, once real reviews exist (not before).**

Step 1, give the LocalBusiness node a stable `@id` so reviews can reference it, matching the pattern this codebase already uses for its Organization and Person nodes. In `views/partials/head.ejs`:
```
"@type": ["LocalBusiness", "FoodEstablishment"],
"@id": "<%= siteUrl %>/#localbusiness",
```

Step 2, once the real, current Google rating and count are known (visible to anyone on the public listing, no login needed just to look), add to that same node:
```
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "4.8",
  "reviewCount": "12",
  "bestRating": "5"
}
```
Replace 4.8 and 12 with the real numbers, and recheck monthly so it never goes stale, a drifted number is a real accuracy problem, not just a schema nicety.

Step 3, for each individual review actually shown on the page:
```
{
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": { "@id": "https://www.virtuosocatering.com/#localbusiness" },
  "author": { "@type": "Person", "name": "<their real name>" },
  "datePublished": "<YYYY-MM-DD>",
  "reviewBody": "<their actual words, unedited>",
  "reviewRating": { "@type": "Rating", "ratingValue": "<1-5>", "bestRating": "5" }
}
```
Do not add `aggregateRating` before genuine reviews exist behind it, and never invent the numbers. That's a fabricated-markup and manual-action risk, and it would break the no-fabrication standard already documented elsewhere in this codebase (the `/press` page's own editorial policy).

---

## (c) Local proof for /wedding-caterers-in-noida

The page (read directly from `utils/content.js`, 1,275 words) is genuinely good practitioner writing: function-by-function menu philosophy (mehendi versus cocktail night versus "elevated concepts"), the caterer-versus-banquet argument, a tasting invitation. What it's missing is Noida itself. The only local reference on the whole page is the business's own address in Sector 61. Zero named venues, zero named sectors beyond that, zero wedding-specific logistics that only someone who has actually catered a Noida wedding would know. Right now it reads as a good general wedding-catering page that happens to have a Noida title, not evidence of Noida-specific work.

Split what to add into two honest categories, because one needs the owner and one doesn't.

**Needs the owner's real records (do not write this without them):**
- A short block naming actual Noida and Greater Noida venues catered, by type where full names can't be used publicly: which society or sector clubhouses, which farmhouse addresses along the Yamuna Expressway corridor, any hotel or banquet-hall weddings. This is the same evidentiary move the site's own `/catering-services-in-greater-noida` page already makes well (it names Jaypee Greens, Pari Chowk, Sector 150/151, Knowledge Park I to III, and explains that Expressway farmhouses "have no permanent kitchen to speak of... we build the kitchen on site"). The wedding page should borrow that exact move, applied to weddings specifically: a multi-day farmhouse takeover, mehendi through reception across two or three days on one property, with a full kitchen assembled on-site for the whole run.
- Where a venue name genuinely can't be published, name what can be verified honestly instead: sector number, guest count, function types, month. Specificity, not the name itself, is what a competitor can't copy.
- A five-minute list from the owner is enough to start: venue name or type, month, guest count, functions catered.

**Writeable now, no new verification needed, because it's expertise the site already demonstrates elsewhere:**
- Multi-venue, multi-day logistics. A Noida wedding routinely spans two or three venues across three to five days, mehendi at a clubhouse, sangeet or cocktail at a farmhouse or banquet hall, wedding and reception at a hotel, each with different kitchen access and different rules. A caterer who has only worked one venue type can't plan across all three. The site argues this exact point generally already, it just hasn't been written for weddings.
- Society and RWA clubhouse constraints. A meaningful share of mid-size Noida sector weddings happen inside residential society clubhouses, which typically run on generator-limited power and enforce noise and open-flame restrictions the property manages, not the caterer. A short, honest section on adapting live counters for that setting (induction instead of open flame, quieter service formats) is real, checkable expertise nobody without clubhouse experience could write convincingly.
- Guest travel. A real share of Noida wedding guest lists live across the DND Flyway or the Noida-Greater Noida Expressway in Delhi or Gurugram. A short note on how that affects timing (an evening baraat colliding with Friday peak traffic on those roads, for instance) is specific and local in a way generic wedding content never is.
- Season. Noida weddings cluster in the same November to February window as the rest of North India, and farmhouse bookings along the Expressway corridor tighten early. Worth one line encouraging early tasting bookings tied to that specific local pattern, sharper than the page's current generic "book early" line.

---

## (d) Bing Places

**Yes, claim it.** Concrete steps:
1. Go to bing.com/places, sign in with a Microsoft account (separate from the Google login used for GBP).
2. Search "Virtuoso Catering House" first, an unclaimed listing sometimes already exists from data-aggregator feeds. Claim it if found (verification is typically phone or postcard, similar to GBP).
3. If none exists, Bing Places has historically offered a one-click import from an existing Google Business Profile, worth trying first since it guarantees matching NAP with no retyping. If unavailable, type the address and phone exactly as they appear in the site's schema and footer: A-15, A-Block, Sector 61, Noida, Uttar Pradesh 201301, +91-8700915463.
4. Mirror categories, services list, description, and photos from whatever GBP now has once (a) is done, this is a copy task, not a fresh content effort.

This is a separate, Microsoft-account login action, distinct from GBP.

**Why it's worth doing given the AI-mentions data specifically:** ChatGPT's local answers draw on the Bing web index first, along with Yelp, TripAdvisor, BBB, and Reddit, and do not read Google Business Profile at all. So everything in section (a) above helps Gemini and Google AI Mode (about 89% of this business's current AI mentions) but does nothing for ChatGPT. ChatGPT currently sits at about 11% of mentions, a single mention total, and Bing Places is the one lever on this whole list that reaches it. It's also a one-time setup task rather than ongoing work, so the effort-to-payoff ratio is good even though ChatGPT's overall share of local AI traffic is still small industry-wide (about 2%, per Sterling Sky). Treat this as laying a foundation, not a growth lever on its own.

---

## (e) Local competitors currently winning these SERPs

**Could not verify:** the actual Google local 3-pack (the map with three businesses that shows above organic results) for "wedding caterers in noida" or "caterers in noida." A live fetch of Google's results during this audit returned a blocked consent/verification page, not results, Google actively blocks automated fetching of its results pages. Even a successful page fetch wouldn't show the map pack anyway, since it's loaded by JavaScript inside Google Maps, invisible to any fetch-based tool. This needs either DataForSEO (not available this round) or a manual check: someone physically in or near Noida searching "caterers in noida" on a phone and screenshotting the three map-pack results.

**What was verifiable (live fetch, Bing's organic results):** not identical to Google's map pack, but a real, current, same-day signal. For both target phrases, the results are dominated by wedding and catering marketplace platforms, not standalone competitor caterer websites.
- "wedding caterers in noida": WeddingWire.in, WedMeGood, WeddingBazaar, Shaadiyari, WeddingSutra.com, Weddingz.in, DreamWeddingHub.
- "caterers in noida": CateringWale, Caterersnearme, Catereroo, Gala Caterers, WeddingWire.in again, CaterNinja, IndianCateres, Curated Catering. (Two further results, LBB and Aadhya Caterers, were Mumbai- and Hyderabad-focused respectively, not real local competition here.)

**What that means.** The organic competition for both phrases isn't one rival caterer to beat, it's aggregator platforms built specifically to rank for these searches. That's an independent confirmation, from a completely different angle, of the conclusion already reached in this account's broader AEO work: a strong presence ON WedMeGood specifically (already flagged as the single biggest off-site gap) may be more winnable, and more valuable, than trying to out-rank these platforms with the standalone page alone. It also means the GBP-driven local pack, which sits above these organic aggregator results rather than competing with them, is carrying even more of the real weight for these two queries than the blue links can, which reinforces the GBP-first framing of this whole audit from a different direction entirely.

**One more honest gap.** The site's own named competitor set across its Delhi pages (The Kitchen Art Company, Foodlink, Food Inc Catering by Yum Yum Tree, Creative Cuisines Inc) is Delhi-headquartered, not Noida-headquartered (Vasant Vihar, per the prior audit). Search Console shows this business is overwhelmingly a Noida search property, not a Delhi one, so nobody has yet identified the real Noida-based catering competition. Attempts to pull this from JustDial and DuckDuckGo during this audit were both blocked (a 404 on the JustDial category URL, a CAPTCHA from DuckDuckGo). The cheapest real fix: the owner, or a Noida-based contact, names two or three actual Noida catering competitors from direct market knowledge, or reads them off the map-pack screenshot suggested above. Once named, that sharpens `/wedding-caterers-in-noida`'s differentiation the same way the Delhi pages already do it with their four named competitors.

---

## Schema validation (delta from 2026-08-14)

Confirmed unchanged by direct source read this round: `["LocalBusiness","FoodEstablishment"]` subtype is correct, `geo` at 7 decimal places (exceeds the 5-decimal minimum), `priceRange: "$$$"` present, `FAQPage` and `BreadcrumbList` implemented on location pages, `areaServed` still exists only on per-page `Service` nodes (`views/partials/head.ejs` line 160), never on the core `LocalBusiness` node, and there is still no `openingHoursSpecification`, `aggregateRating`, or `Review` node anywhere in the codebase (grepped fresh this session, zero matches). New this round: the `LocalBusiness`/`FoodEstablishment` node has no `@id`, worth adding now (see (b), Step 1) so review markup has something stable to reference later. `sameAs` still lists only Instagram, Pinterest, LinkedIn, and the Google Maps short link, no Facebook Page despite a Meta Pixel already installed sitewide, and no Bing Places entry once (d) is done.

## GBP-relevant on-page signals (confirmed live this session)

| Signal | Status |
|---|---|
| Google Maps iframe embed | `/contact` only (`views/contact.ejs`). Absent from homepage and all 6 commercial landing pages, including `/wedding-caterers-in-noida`. |
| Internal editorial links to `/wedding-caterers-in-noida` | Still zero from all 22 blog posts (confirmed by grepping every `relatedLink` in `utils/content.js`, none point there). One link now exists from `/about`, added in commit `2bf2108` on 2026-08-14, but that's a single reference from a corporate page, not the wedding-topic blog links this page actually needs. |
| Footer "Areas & Specialties" list | `/wedding-caterers-in-noida` is present (`utils/content.js`, `commercialPages` array), already fixed. |
| `llms.txt` | Still 404. Cheap, additive, not corrective (crawlers aren't blocked). |
| robots.txt | Open (`Allow: /`), sitemap declared, no blockers. |

## NAP (unchanged, confirmed this session)

Single inconsistency remains: footer says "UP," every other surface (`/contact`, `/about`, `/privacy-policy`, schema) spells out "Uttar Pradesh." One-line fix, low severity. All other sources agree on street, sector, city, PIN, and phone.

## Citation presence

No new Tier 1 status confirmed this round (WedMeGood, JustDial, WeddingWire listings remain unlinked from the site's own `sameAs`, per the 2026-08-14 audit, still directional not certain). Two new, concrete additions from this session: claim **Bing Places** (section d) and add the **Facebook Page** to `sameAs` (Meta Pixel is already firing sitewide with no corresponding Page link, an easy citation this audit hadn't caught before).

---

## Top 10 prioritized actions

**Critical**
1. Log into GBP and confirm the current primary category. Set it to "Caterer" if it isn't already; do not narrow it to a wedding-only category given the real search volume. *(Needs GBP login.)*
2. Start the review sprint now: ask the last several months of clients (wedding first, then everyone else) for a real Google review via a direct write-review link. Target 10 as the first milestone, then sustain roughly 1 to 2 a month indefinitely. *(Login needed only to generate the link and check current rating/count; asking clients needs no login.)*

**High**
3. Add GBP additional categories ("Wedding buffet caterer," "Corporate caterer"), the full services list, and the rewritten business description from section (a). *(Needs GBP login.)*
4. Once 10 real reviews exist: replace the 4 generic testimonials with real, attributed ones on-site, and add the `@id`, `Review`, and `aggregateRating` schema exactly as specified in section (b). *(No login, code change.)*
5. Add the owner's real Noida and Greater Noida venue specifics to `/wedding-caterers-in-noida` (needs a short input list from the owner) and draft the multi-venue, clubhouse-constraint, and guest-travel content that's writeable today. *(Partly needs owner input, partly code/content change.)*
6. Claim and verify Bing Places, then mirror NAP, categories, services, description, and photos over from GBP. *(Needs a separate Microsoft-account login.)*
7. Repoint 6 to 8 of the 15 wedding-related blog posts at `/wedding-caterers-in-noida` with varied anchor text, still zero as of this session despite the new `/about` link. *(No login, code change.)*

**Medium**
8. Seed GBP Q&A with the existing wedding FAQ questions, and set a weekly Posts cadence using real existing event photography. *(Needs GBP login.)*
9. Get a manual check of the actual Noida map-pack composition (a phone search from or near Noida), and use it to name 2 to 3 real Noida-headquartered competitors, closing the gap flagged in section (e). *(No login, but needs the owner or a local contact, not automatable from here.)*
10. Add the Facebook Page to `sameAs`, and once manually confirmed, link the WedMeGood, JustDial, and WeddingWire listings from the 2026-08-14 audit into `sameAs` and the footer.

**Carried forward, unchanged, still valid:** the footer "UP" versus "Uttar Pradesh" fix, the Aarti Sharma `/team/aarti-sharma` 404, and the Udaipur-attributed testimonial appearing on Noida and Delhi pages, full detail in the 2026-08-14 `findings/local.md`.

---

## Limitations

No GBP API access and no DataForSEO were available this round, exactly as expected going in. Everything in section (a) is a recommendation to be actioned and verified by someone logged into the actual profile, not something this audit could confirm firsthand; the same applies to the real current review rating and count, review response rate, and photo/post history. A live Google search fetch during this session was blocked (returned a consent/troubleshooting page, not results), confirming Google actively blocks this kind of automated check. A Bing organic fetch succeeded and is reported above, but cannot see the JavaScript-rendered local map pack even on a page that does load. JustDial (404 on the category URL tried) and DuckDuckGo (CAPTCHA) both blocked automated access when attempted for competitor discovery. Proximity, which the Search Atlas ML study puts at 55.2% of local ranking variance, remains outside the website's control and isn't scored here.
