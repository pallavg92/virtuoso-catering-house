# Structured Data / Schema.org Audit — virtuosocatering.com

Audited: all 38 sitemap URLs (`virtuosocatering.com-audit/sitemap-urls.txt`).
**Category score: 60 / 100**

## Methodology note (production vs. dist)

Production is Express rendering `views/*.ejs` on Hostinger; `dist/` is a separate static build for a Netlify target. They are **not guaranteed identical** (confirmed separately for images). For structured data specifically, I verified they *are* identical: I live-fetched 5 URLs spanning every page archetype — `/` , `/blog/what-we-did-for-the-launch-of-the-lamborghini-temerario`, `/team/pallav-goel`, `/about`, `/press` — via the bundled `render_page.py` tool (`--mode never`, raw HTML, `is_spa=False` confirmed on all five, i.e. no client-side injection) and diffed the extracted JSON-LD against the corresponding `dist/*.html` files. **Every block matched byte-for-byte** (e.g. block 1 = 1126 bytes / block 2 = 781 bytes on both live `/` and `dist/index.html`). This is expected: the only dist-specific post-processing step, `scripts/html-post.js`, regex-matches `<img\b[^>]*>` exclusively and never touches `<script type="application/ld+json">`. So all findings below are grounded in live URLs (cited as such) and cross-checked against `dist/` for the other 33 pages plus the `views/*.ejs` source that generates all of it. Where I only spot-checked `dist/` (not live), I say so.

---

## Direct answers

**1. Do the two homepage JSON-LD blocks conflict?** Yes — they are **orphaned duplicates, not linked**. Block 1 (`@type: ["LocalBusiness","FoodEstablishment"]`) has **no `@id`** at all. Block 2 (`@type: "Organization"`, `@id: ".../#organization"`) repeats the identical `name` and `address` with an `@id`. Nothing in the graph ties them together — see Critical-1 below. Confirmed live on `https://www.virtuosocatering.com/` and on all 38 pages via `dist/`.

**2. Which blog posts have BlogPosting markup?** All of them. 22 pages render `views/blog-post.ejs` (18 under `/blog/` + 4 standalone pillar pages: `/best-caterers-in-noida-virtuoso-catering-house`, `/how-to-hire-wedding-caterers-in-delhi-for-a-luxury-wedding`, `/best-wedding-caterers-in-delhi-what-sets-them-apart`, `/caterers-in-delhi-finding-the-right-fit-for-your-event`), and every one of the corresponding `pageMeta.js` entries sets a `post` object with `.title`, so `head.ejs`'s `<% if (post && post.title) %>` guard (line 122) fires on all 22, unconditionally. **0 of 22 are missing BlogPosting.** (The brief says "20 blog posts" — actual count is 22 including the 4 non-`/blog/` pillar pages, all using the same template and same schema logic.)

**3. Is BreadcrumbList emitted?** Yes, on 37 of 38 pages, matching `pageMeta.js`'s `breadcrumbs` arrays exactly. Home is the one exception, correctly: `pages.home.breadcrumbs` has length 1, and `partials/head.ejs:166` / `partials/breadcrumb.ejs:1` both gate on `breadcrumbs.length > 1`, so no BreadcrumbList renders there (confirmed live: `https://www.virtuosocatering.com/` has exactly 2 JSON-LD blocks, no BreadcrumbList).

**4. Claims not visible on the page / aggregateRating?** No AggregateRating or Review markup exists anywhere on the site — correct, and do not add it. `utils/content.js:2243-2264` testimonials render as unrated prose quotes (name + role only, no star value anywhere in the DOM), so there is no legitimate `ratingValue` to source a `Review`/`AggregateRating` from. That said, one real "claims not visible" problem does exist: **`servesCuisine` asserts "Mexican" and "Bakery"**, sitewide, with no supporting menu content anywhere on the crawled site (detail in High-3 below).

**5. Is `areaServed` declared?** Only on the 7 commercial/Service pages (6 city landers + `/services`), each with a single `{"@type":"City","name":"<one city>"}`. It is **not** declared on the core `LocalBusiness`/`FoodEstablishment` node itself — the block that actually renders on every page and is the one Google's LocalBusiness guidance expects it on. `/about` visibly states the served region ("caters across Delhi NCR, including Noida, Greater Noida, Delhi and Gurugram" — `utils/content.js:2401`), so this is addable without fabrication.

---

## Findings

### Critical

**C1. Two competing, unlinked entity declarations for the same business, on all 38 pages.**
`views/partials/head.ejs:71-98` emits `["LocalBusiness","FoodEstablishment"]` with **no `@id`**. `views/partials/head.ejs:100-120` emits `"Organization"` with `@id: "https://www.virtuosocatering.com/#organization"`. Both carry the identical `name` ("Virtuoso Catering House") and identical nested `PostalAddress`. Verified live on `https://www.virtuosocatering.com/`, `/about`, `/press`, `/team/pallav-goel`, and the Lamborghini blog post — byte-identical blocks 1 and 2 on every one.
Because block 1 has no `@id`, it can never be referenced from anywhere else in the graph — and nothing does. Every downstream reference in the codebase (`Service.provider` in `head.ejs:159`, `BlogPosting.publisher` in `head.ejs:143`, `Person.worksFor` in `views/team-member.ejs:87` and `views/about.ejs:134`) points at the **Organization** node instead, meaning the entity that actually carries `geo`, `servesCuisine`, and `priceRange` — the one that matters most for local search — is structurally cut off from every other schema block on the site. This is exactly the "duplicate/competing entity definitions" failure mode the audit brief flagged, confirmed as systemic (all 38 pages) rather than a one-off.
*Fix:* give the LocalBusiness/FoodEstablishment block its own stable `@id` (e.g. `siteUrl + '/#business'`) and either (a) merge the two into one node — `@type: ["Organization","LocalBusiness","FoodEstablishment"]` carrying every property currently split across both — or (b) keep them separate but have `Service.provider`, `BlogPosting.publisher`, and `Person.worksFor` reference the merged/local entity instead of the generic Organization, since a catering house's services and articles are provided by the local business, not an abstract corporate shell.

**C2. `/press` adds a third, also-unlinked "Organization" node on top of C1.**
`views/press.ejs:60-77` emits its own `"@type": "Organization"` block with `name`/`url` matching the other two but **no `@id`**, plus two more un-`@id`'d `"about": {"@type":"Organization", "name": ..., "url": ...}` stubs nested inside each `NewsArticle`. Confirmed live on `https://www.virtuosocatering.com/press` (block 4, 1115 bytes, `"id": null`) sitting alongside block 2's properly-`@id`'d Organization node on the same page. That's up to **four** separate "Organization" assertions for one business on a single URL, none of the extra three connected to the canonical one.
*Fix:* give this block `"@id": siteUrl + '/#organization'` (reusing the canonical id) so `subjectOf` merges onto the existing node instead of minting a duplicate.

### High

**H1. Person `@id`/`url` for Aarti Sharma points at a page that 404s.** `views/about.ejs:127,132` builds `"@id": siteUrl + '/team/' + founder.slug + '#person'` and `"url": siteUrl + '/team/' + founder.slug` for every founder in the loop. For `slug: 'aarti-sharma'` (`utils/content.js:2281`) that produces `https://www.virtuosocatering.com/team/aarti-sharma`. **Live-verified: this URL returns HTTP 404** (no route exists in `routes/pages.js` — only `/team/pallav-goel` is registered; confirmed on `https://www.virtuosocatering.com/about`, block 4, `"@id": ".../team/aarti-sharma#person"`, `"url"` same). An entity's own asserted canonical `url` resolving to a dead page is a concrete, checkable defect, not a style nit.
*Fix:* either ship `/team/aarti-sharma` (mirroring the Pallav Goel page, which already works and already reuses the founders data) or point `url`/`@id` at an anchor that actually exists (e.g. `/about#aarti-sharma`) until that page exists.

**H2. `BlogPosting.author` is a dangling cross-page reference on all 22 article pages.** `views/partials/head.ejs:140-142` sets `"author": { "@id": siteUrl + '/team/pallav-goel#person' }` with no inline `name`. That `@id` is only *defined* (with a `name`) on `/team/pallav-goel` — a different URL. Confirmed live: `https://www.virtuosocatering.com/blog/what-we-did-for-the-launch-of-the-lamborghini-temerario` block 3 (`BlogPosting`) contains only `"author": {"@id": "https://www.virtuosocatering.com/team/pallav-goel#person"}` — no `name` anywhere on that page's structured data. Google's structured-data parser evaluates each URL's markup independently; it does not fetch other pages to resolve `@id` references. `@id`-linking across **multiple blocks on the same page** is supported and used correctly elsewhere on this site (e.g. `publisher: {"@id": ".../#organization"}` on the same page resolves fine because the Organization block is also on that page) — but this specific reference crosses a page boundary, so on the article page itself, `author` is effectively a name-less stub. Byline/author-rich-result eligibility depends on this.
*Fix:* inline `"name"` (and ideally `"url"`) alongside the `@id` in the BlogPosting author object, e.g. `{"@id": "...#person", "name": "Pallav Goel", "url": "https://www.virtuosocatering.com/team/pallav-goel"}`.

**H3. `servesCuisine` asserts cuisines with no visible support, and does so on pages with zero food content.** `utils/pageMeta.js:29`: `cuisines: ['Asian','Indian','Mexican','Continental','Bakery','Mughlai','Chinese','Sushi']`, rendered into every page's LocalBusiness/FoodEstablishment block. The visible `/services` sample menu (`utils/content.js:2415-2473`) and blog copy substantiate Indian, Chinese (multiple posts, e.g. `utils/content.js:651,671,695,1068,1099`), Sushi ("Kyoto Sushi Experience"), Continental, and Asian (Thai/Teppanyaki). **"Mexican" and "Bakery" have no supporting evidence anywhere on the crawled site** — the only near-hit is one blog post about *industry-wide* 2026 trends mentioning "Indo-Mexican plates" as a general market trend, not a dish Virtuoso serves (`utils/content.js:1068`). Because this block is injected sitewide via `head.ejs`, the claim also appears on pages with no food content at all — `/privacy-policy`, `/contact`, `/social` (all confirmed via `dist/`) — which is the sharpest version of "schema asserting claims not visible on the page."
*Fix:* drop "Mexican" and "Bakery" from `servesCuisine`, or add visible menu items that support them before re-adding.

### Medium

**M1. FAQPage on 24 of 38 pages, zero current SERP benefit.** Per current policy (Google retired FAQ rich results for all sites May 7 2026), this is Info-priority by rule, not Critical — flagging as Medium here only because of scale: `post.faq` renders `FAQPage` on all 18 `/blog/` posts + `/best-caterers-in-noida-virtuoso-catering-house` (`views/blog-post.ejs:143-158`), and `data.faq` renders it on 5 of the 6 commercial landers (`views/landing.ejs:258-273`) — `corporate-catering-services-in-noida` is the one lander without an `faq` block in `utils/content.js`, so it alone lacks FAQPage. None of this is broken (all blocks parse and validate structurally), it simply carries no Google SERP feature anymore; any AI/GEO citation value is unconfirmed. No action required; do not expand this pattern on the expectation of a rich result.

**M2. `/services` collapses 4 named, distinct offerings into one generic Service node.** The page visibly lists Weddings, Brand Activations, Mixology, and Bespoke Menus as separate H3 cards with their own copy (`utils/content.js:9-61`, rendered in `views/services.ejs:40-66`), but `utils/pageMeta.js:515` only assigns `pages.services.service = { name: 'Luxury Event Catering', areaServed: 'Delhi NCR' }` — one umbrella Service, not four. Confirmed live/dist: `services.html` block 3 is a single `Service`/`City` node, 488 bytes.
*Fix:* add a `hasOfferCatalog`/`OfferCatalog` with one `Service` per row (see generated JSON-LD below).

**M3. No `openingHoursSpecification` despite genuine, visible hours.** `/contact` visibly states "Tastings by appointment · Tuesday — Saturday, 10am–6pm" (`views/contact.ejs:44-46`), but the LocalBusiness/FoodEstablishment block never carries this. This is a real, non-fabricated addable property (see generated JSON-LD below).

**M4. `areaServed` missing from the core LocalBusiness/FoodEstablishment node.** See Direct Answer 5. `/about` (`utils/content.js:2401`) visibly names Noida, Greater Noida, Delhi and Gurugram as the served area — addable without fabrication.

### Low

**L1. No `ImageObject` anywhere; every image reference is a bare URL string** (`business.logo`, `post.image`, `member.image`, `ogImage` — all string concatenation in `head.ejs`). Notably cheap to fix: `scripts/html-post.js:33-100` already reads real width/height off every local image file at build time for `<img>` tag sizing — that same lookup could feed `ImageObject.width`/`height` in the JSON-LD.

**L2. `/blog` (listing) and `/our-work` (portfolio index) carry no `Blog`/`CollectionPage`/`ItemList` markup** — confirmed live/dist, both pages only get the sitewide LocalBusiness + Organization + BreadcrumbList, nothing describing the list of posts/projects itself.

**L3. `priceRange` is hardcoded `"$$$"` in `head.ejs:95` rather than sourced from `business`** — not a validation error (schema.org accepts the literal string), just a maintainability note; if pricing tier ever changes it has to be edited in the template rather than the data file.

**L4. `@type: ["LocalBusiness","FoodEstablishment"]` is a mildly redundant multi-type array** since FoodEstablishment already extends LocalBusiness in schema.org's hierarchy. Harmless (Google accepts it, and `utils/content.js:22-28` documents *why* — schema.org has no dedicated "Caterer" type), not worth changing.

### Info

**I1. FAQPage generally (see M1)** — Google retired FAQ rich results for all sites May 7 2026. Info per standing rule, not a defect to fix urgently; just don't invest further in it for SERP purposes.

---

## What genuinely works

- **Zero JSON-LD parse/syntax errors** across all 38 pages (verified by parsing every `<script type="application/ld+json">` block in `dist/` plus 5 live spot-checks) — every block is valid JSON, correct `@context: "https://schema.org"`, no deprecated types (no HowTo, no SpecialAnnouncement).
- **BreadcrumbList coverage is complete and correctly gated** (37/38, home correctly excluded at length 1).
- **BlogPosting coverage is complete** — 22/22 article-template pages, with `headline`, `image`, `datePublished`, `dateModified`, `mainEntityOfPage` all present on every one (spot-checked live on the Lamborghini post).
- **No fabricated ratings.** The team correctly did not add AggregateRating/Review despite having testimonials to work with, because those testimonials carry no visible star rating — exactly the right call per this audit's constraint.
- **Press schema doesn't overreach.** `views/press.ejs`'s `subjectOf` array includes only the 2 mentions in `pressMentions` (`utils/content.js:1814-1829`) that carry a verified, checkable URL — not the other 4 outlets that appear as logos on the homepage press marquee without a confirmed article. The code comment at `utils/content.js:1805-1809` explicitly documents this discipline ("Do NOT populate this from Semrush/AI citation reports... A fabricated 'featured in' claim is worse than a short list"). The `about.html`/`press.html` claims match `/contact`'s visible address, phone, and email exactly, character for character.
- **Person entity linking between `/about` and `/team/pallav-goel` is done correctly** — same `@id`, byte-identical node (888 bytes both places), which is the right pattern; it just isn't finished for Aarti Sharma (H1).
- **Service + areaServed present on all 7 commercial pages**, each scoped to the one city the page actually targets rather than overclaiming "Delhi NCR" everywhere (`utils/pageMeta.js:495-496` comment is explicit about this discipline).
- **About page's own restraint extends into what schema does *not* claim** — no `foundingDate`, `numberOfEmployees`, or `award` anywhere, because `utils/content.js:2300-2305` documents that none of those are verifiable yet. Good guardrail to keep in place for any future schema additions.

---

## Generated JSON-LD for the highest-value fixes

**1. Merged, `@id`-anchored core entity** (resolves C1; replace the two head.ejs blocks with one, or add `@id` to block 1 and repoint C2/H1/H2/M4 references at it):
```json
{
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "FoodEstablishment"],
  "@id": "https://www.virtuosocatering.com/#business",
  "name": "Virtuoso Catering House",
  "description": "Virtuoso Catering House is a luxury experiential catering company based in Noida, Delhi NCR, crafting bespoke F&B for weddings, brand activations, and private events.",
  "url": "https://www.virtuosocatering.com",
  "logo": "https://www.virtuosocatering.com/images/virtuoso-catering-house-logo.png",
  "image": "https://www.virtuosocatering.com/images/hero-candlelit-florals.jpg",
  "telephone": "+91-8700915463",
  "email": "virtuosocatering@gmail.com",
  "priceRange": "$$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "A-15, A-Block, Sector 61",
    "addressLocality": "Noida",
    "addressRegion": "Uttar Pradesh",
    "postalCode": "201301",
    "addressCountry": "IN"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 28.5964201, "longitude": 77.3641803 },
  "areaServed": [
    { "@type": "City", "name": "Noida" },
    { "@type": "City", "name": "Greater Noida" },
    { "@type": "City", "name": "Delhi" },
    { "@type": "City", "name": "Gurugram" }
  ],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "10:00",
    "closes": "18:00",
    "description": "Tastings by appointment"
  },
  "servesCuisine": ["Asian", "Indian", "Continental", "Mughlai", "Chinese", "Sushi"],
  "sameAs": [
    "https://www.instagram.com/virtuosocateringhouse/",
    "https://pin.it/3EwnJeOiZ",
    "https://www.linkedin.com/company/virtuoso-caterings",
    "https://maps.app.goo.gl/VztH6YKQfN13Yogu7"
  ]
}
```
Note: `servesCuisine` above drops "Mexican" and "Bakery" per H3 — re-add only once visible menu content backs them.

**2. `hasOfferCatalog` for `/services`** (resolves M2 — add alongside, not instead of, the existing Service block):
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.virtuosocatering.com/services#service",
  "name": "Luxury Event Catering",
  "provider": { "@id": "https://www.virtuosocatering.com/#business" },
  "areaServed": { "@type": "City", "name": "Delhi NCR" },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Catering Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Weddings", "description": "From the first toast to the last dance, every course is choreographed to the rhythm of your day." } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Brand Activations", "description": "Product launches, brand experiences, and press previews with menus timed backwards from the run of show." } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mixology", "description": "Live mixology stations and batch-crafted cocktail programs built to move at the pace of the room." } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bespoke Menus", "description": "Menus built from a conversation about provenance and memory, not selected from a template." } }
    ]
  }
}
```

**3. Fixed `BlogPosting.author`** (resolves H2 — apply in `head.ejs:140-142`):
```json
"author": {
  "@id": "https://www.virtuosocatering.com/team/pallav-goel#person",
  "name": "Pallav Goel",
  "url": "https://www.virtuosocatering.com/team/pallav-goel"
}
```

---

## Files referenced
- `/Users/pallavgoel/Desktop/Website Virtuoso/views/partials/head.ejs` (all sitewide + conditional blocks)
- `/Users/pallavgoel/Desktop/Website Virtuoso/views/press.ejs:60-77`
- `/Users/pallavgoel/Desktop/Website Virtuoso/views/about.ejs:119-138`
- `/Users/pallavgoel/Desktop/Website Virtuoso/views/team-member.ejs:73-90`
- `/Users/pallavgoel/Desktop/Website Virtuoso/views/blog-post.ejs:143-158`
- `/Users/pallavgoel/Desktop/Website Virtuoso/views/landing.ejs:258-273`
- `/Users/pallavgoel/Desktop/Website Virtuoso/views/contact.ejs:36-46`
- `/Users/pallavgoel/Desktop/Website Virtuoso/utils/pageMeta.js:8-36, 491-517`
- `/Users/pallavgoel/Desktop/Website Virtuoso/utils/content.js:9-63, 1780-1829, 2279-2298, 2415-2473`
- `/Users/pallavgoel/Desktop/Website Virtuoso/routes/pages.js` (confirms `/team/aarti-sharma` has no route)
- `/Users/pallavgoel/Desktop/Website Virtuoso/scripts/html-post.js` (confirms dist-only post-processing never touches JSON-LD)
- Live: `https://www.virtuosocatering.com/`, `/about`, `/press`, `/team/pallav-goel`, `/team/aarti-sharma` (404), `/blog/what-we-did-for-the-launch-of-the-lamborghini-temerario`
