# Schema.org Re-Audit — virtuosocatering.com — 2026-08-15

Methodology: read `views/partials/head.ejs`, `views/about.ejs`, `views/team-member.ejs`, `views/press.ejs`, `utils/pageMeta.js`, `utils/content.js` (source of truth, Express/EJS on Hostinger — `dist/` is not what production serves), then fetched live URLs via `claude-seo run render_page.py --json-ld-output` to confirm what's actually deployed. All 8 live JSON-LD blocks below were pulled straight from production, not reconstructed from source.

Priority is ranked by AEO impact — how much each issue muddies the single coherent entity a model needs in order to state confidently who this business is — not by spec pedantry. Gemini + Google AI Mode are ~89% of this business's AI mentions.

---

## 1. CRITICAL — Two un-merged descriptions of the same business, sitewide

**Still open.** Confirmed live on `/`, `/about`, `/team/aarti-sharma`, `/press`, `/privacy-policy`, `/contact`, `/services`, `/wedding-caterers-in-noida` — every page carries both blocks.

- `views/partials/head.ejs:71-98` — `["LocalBusiness","FoodEstablishment"]`, **no `@id`**. Carries `geo`, `servesCuisine`, `priceRange` — the richer node.
- `views/partials/head.ejs:100-120` — `Organization`, `@id: ".../#organization"`. Carries none of the above.
- Everything downstream — `Service.provider` (`head.ejs:159`), `BlogPosting.publisher` (`head.ejs:143`), `Person.worksFor` (`views/about.ejs:134`, `views/team-member.ejs:89`) — references `#organization` only. The richer node is never pointed to by anything. A model reading any single page gets either an address/geo/cuisine-less "Organization" or a same-named "LocalBusiness" with no linkage proving it's the same entity. That's the split that most directly undermines "who is this business" clarity.

**Fix — merge into one node.** Replace both `<script>` blocks in `head.ejs:71-120` with this single block (deletes the second block entirely; every existing `#organization` reference elsewhere in the codebase keeps working unchanged):

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "FoodEstablishment"],
  "@id": "<%= siteUrl %>/#organization",
  "name": "<%= business.name %>",
  "description": "<%= business.description %>",
  "image": "<%= ogImage %>",
  "logo": "<%= business.logo %>",
  "url": "<%= siteUrl %>",
  "telephone": "<%= business.telephone %>",
  "email": "<%= business.email %>",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "<%= business.streetAddress %>",
    "addressLocality": "<%= business.addressLocality %>",
    "addressRegion": "<%= business.addressRegion %>",
    "postalCode": "<%= business.postalCode %>",
    "addressCountry": "<%= business.addressCountry %>"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": <%= business.latitude %>,
    "longitude": <%= business.longitude %>
  },
  "areaServed": [
    { "@type": "City", "name": "Noida" },
    { "@type": "City", "name": "Greater Noida" },
    { "@type": "City", "name": "Delhi" },
    { "@type": "City", "name": "Gurugram" }
  ],
  "servesCuisine": <%- JSON.stringify(business.cuisines) %>,
  "priceRange": "$$$",
  "sameAs": <%- JSON.stringify(business.sameAs) %>
}
</script>
```

`areaServed` list is grounded in `views/about.ejs` copy (`utils/content.js:2402`): "caters across Delhi NCR, including Noida, Greater Noida, Delhi and Gurugram" — not invented.

---

## 2. CRITICAL — servesCuisine asserts cuisines the site itself says it doesn't cook

**Still open.** Live-confirmed on `/` (home.jsonld.json), `/about`, `/press`, `/privacy-policy`, `/contact`, `/services`, `/wedding-caterers-in-noida` — unconditional, sitewide, defined once at `utils/pageMeta.js:29`:

```js
cuisines: ['Asian', 'Indian', 'Mexican', 'Continental', 'Bakery', 'Mughlai', 'Chinese', 'Sushi'],
```

The site's own authoritative cuisine list — "Cuisines We Cook" on `/services`, `utils/content.js:2019-2022` — explicitly says *"We would rather cook fifteen things properly than list forty"* and lists: North Indian/Mughlai, South Indian, Bengali/Awadhi, Gujarati/Rajasthani/Marathi, Italian/Mediterranean, Lebanese/Levantine, Pan-Asian (incl. sushi), Continental, Tandoor/grill, Chaat/street food. **Mexican and Bakery appear nowhere in that list or anywhere else in the site's menu content.** This isn't just clutter on content-less pages (`/privacy-policy`, `/contact` both serve this array with zero food content around it) — it's a wrong, confidently-stated fact a model could cite and be wrong about, which is worse for AEO trust than a gap.

**Fix — `utils/pageMeta.js:29`, replace with:**

```js
cuisines: ['North Indian', 'Mughlai', 'South Indian', 'Bengali', 'Gujarati', 'Rajasthani', 'Italian', 'Mediterranean', 'Lebanese', 'Pan-Asian', 'Continental', 'Chaat / Street Food'],
```

(This one edit also fixes finding #2's `servesCuisine` line and every page listed above, since it's a single shared value.)

---

## 3. HIGH — /press mints a third, un-@id'd Organization node

**Still open.** Live-confirmed: `https://www.virtuosocatering.com/press` block 4 (`views/press.ejs:60-77`) emits `"@type":"Organization"` with **no `@id`**, name/url matching the canonical node but structurally disconnected from it. Every additional anonymous "Organization" mention increases the odds a crawler treats it as a distinct or ambiguous entity instead of reinforcing the one canonical node — exactly backwards for entity consolidation.

**Fix — `views/press.ejs:60-77`, replace with:**

```html
<script type="application/ld+json">
<%- JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": siteUrl + '/#organization',
  "subjectOf": pressMentions.map(function(item) {
    return {
      "@type": "NewsArticle",
      "headline": item.headline,
      "url": item.url,
      "datePublished": item.date,
      "publisher": { "@type": "Organization", "name": item.outlet },
      "about": { "@id": siteUrl + '/#organization' }
    };
  })
}) %>
</script>
```

---

## 4. MEDIUM — areaServed absent from the core entity node

**Still open**, but resolved as a side effect of fix #1 above — `areaServed` currently exists only inside per-page `Service` sub-blocks (`head.ejs:160`, e.g. live on `/services` = `"City","name":"Delhi NCR"`, live on `/wedding-caterers-in-noida` = `"City","name":"Noida"`), never on the LocalBusiness/Organization node itself. Pages with no `service` local (home, about, press, privacy, contact — the majority of the site) currently state a geographic footprint nowhere at all. Fix #1's merged block adds this at the entity level; no separate change needed once that ships.

---

## 5. RESOLVED — /team/aarti-sharma Person entity

**Resolved and coherent.** Live-confirmed:
- `https://www.virtuosocatering.com/team/aarti-sharma` returns HTTP 200 (page exists) and emits `Person` `@id: "https://www.virtuosocatering.com/team/aarti-sharma#person"` (`views/team-member.ejs:78-92`).
- `https://www.virtuosocatering.com/about` emits a `Person` block with the **identical `@id`**, and the two blocks are byte-identical (1240 bytes each) — same `name`, `jobTitle`, `description`, `image`, `url`, `knowsAbout`, `worksFor: {"@id":".../#organization"}`, `sameAs`.
- This holds structurally, not by luck: `views/about.ejs:122-138` and `views/team-member.ejs:78-92` both read from the same `founders` array (`utils/content.js:2279-2298`), spread into every render via `routes/pages.js:23-28` (`...content`). One entity, two pages, no drift possible without editing the shared source.

No action needed here.

---

## 6. /wedding-caterers-in-noida — current schema and gaps

**Currently carries** (live-confirmed, 5 blocks): LocalBusiness+FoodEstablishment (no `@id` — fixed by #1), Organization (`@id`'d, fixed by #1), `Service` (`@id: ".../wedding-caterers-in-noida#service"`, `provider: {"@id":".../#organization"}`, `areaServed: {"City","Noida"}` — already correct, `head.ejs:148-164`), `BreadcrumbList`, and `FAQPage` (6 Q&As, `utils/content.js:2225-2232`).

- **Offer — not recommended yet.** Checked the page's actual content (`utils/content.js:2182-2238`): no per-plate or package pricing appears on this page, only "Rates tend to improve the earlier you lock in, though that depends on the caterer." Real numeric pricing (₹2,500–4,000 premium, ₹4,000–6,500+ luxury) exists only on `/blog/luxury-catering-cost-delhi-ncr`. Adding an `Offer` here without a genuine price on this page would be the same category of error as fabricating a rating — don't add one until the page itself publishes a real number.
- **Event — not legitimate.** `Event` requires a specific scheduled occurrence (`startDate`, a bookable instance). This is an evergreen service page describing an ongoing capability, not an event. Do not add.
- **areaServed on Service** — already correct as-is, no change needed.
- **FAQPage** — Info priority only. Per current Google policy, FAQ rich results are retired for all sites; this markup carries no SERP benefit. Any AI/GEO benefit is unconfirmed. Not worth removing (it's accurate, attributed content), but not a fix to prioritize either.

---

## Review / AggregateRating — none exist, correctly so

**Confirmed: no Review or AggregateRating markup exists anywhere on the site, and no genuine rating data exists yet to back one.** Do not fabricate. The testimonials in `utils/content.js:2243-2264` ("Ananya Kapoor," "Rohan Mehta," etc.) are not sourced/attributed with dates or verifiable platform origin — they should not be marked up as schema `Review` as-is.

**Exact markup to add once real, attributed reviews are collected** (e.g., from Google Business Profile with consent, or direct client sign-off with name + date):

```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": { "@id": "https://www.virtuosocatering.com/#organization" },
  "author": { "@type": "Person", "name": "[Real client name, attributed]" },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "[actual rating given, 1-5]",
    "bestRating": "5"
  },
  "reviewBody": "[Verbatim quote, not paraphrased]",
  "datePublished": "[ISO 8601 date the review was given]"
}
```

Once at least 3-5 genuine reviews exist, add an `aggregateRating` property directly on the merged entity node from fix #1 (not a standalone block):

```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "[calculated average of real ratings, not assumed]",
  "reviewCount": "[actual count]"
}
```

---

## Priority summary (AEO impact order)

1. **CRITICAL** — Merge `head.ejs:71-120` into one `@id`'d node (fix in this file, section 1)
2. **CRITICAL** — Correct `cuisines` array in `utils/pageMeta.js:29` (section 2)
3. **HIGH** — Add `@id` to `views/press.ejs:60-77` (section 3)
4. **MEDIUM** — `areaServed` on core entity (auto-resolved by #1)
5. **INFO** — Existing `FAQPage` on `/wedding-caterers-in-noida` — leave as-is, no SERP benefit either way
6. **RESOLVED** — `/team/aarti-sharma` Person entity, no action
7. **FUTURE** — Review/AggregateRating markup, only once real data exists
