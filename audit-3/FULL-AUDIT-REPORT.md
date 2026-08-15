# SEO + AEO Audit #3 — virtuosocatering.com

**Date:** 2026-08-15 (evening)
**Previous:** audit-1 scored 69/100 (morning), audit-2 measured the first fix batch (afternoon)
**Since audit-2:** five commits shipped — pricing removal, internal links, page rewrites, schema merge, heading restructure, lead attribution

---

## 1. Performance improved on every page measured

This is the headline, and it is the first time performance has moved at all.

| Page (mobile) | audit-1 | audit-2 | **audit-3** |
|---|---|---|---|
| `/` | 63 | 65 | **68** |
| `/wedding-caterers-in-noida` | — | 56 | **63** |
| `/best-catering-services-in-noida` | — | 58 | **65** |
| `/wedding-caterers-in-delhi` | — | 55 | **62** |
| `/blog/luxury-catering-cost-delhi-ncr` | — | 62 | **68** |

**Every page up, by 6 to 7 points.** Homepage LCP improved from **6.1s to 4.7s**.

### Why, and it is worth understanding

Audit-2's fixes (WebP, image dimensions) moved the homepage by two points, because images were never the constraint. This round moved it by six, and the cause is almost certainly the **heading restructure**.

Moving the enquiry drawers and both popups from the top of the document to the end of `<body>` was done for the heading outline. The side effect is that the browser now reaches the page's real content sooner instead of parsing two dialogs and two popups first. A 1.4-second LCP improvement is consistent with that.

Worth noting because it was not the reason the change was made. The SEO fix paid a performance dividend.

### A caution repeated

The first PSI run this round returned **53** for the homepage, which would have read as a 12-point regression. Three consecutive re-runs all returned **68**. That was noise.

**Single PageSpeed runs are unreliable, TBT especially.** Nothing in these reports should be acted on from one run. This is the second time it has caught me out in a day.

---

## 2. Everything shipped today is live and verified

| Change | Verified |
|---|---|
| Stale pricing removed | 0 rupee figures across all six pages |
| Schema merged to one entity | `@id` = `/#organization`, `areaServed` live, cuisines corrected |
| Heading outline | 39/39 pages open with their own heading |
| Drawers relocated | present on all 39 pages, zero duplicate ids |
| Noida page rewrite | live, old agency copy gone |
| Wedding page quotable lead | live |
| Lead attribution | `attribution.js` 200, both forms posting it |
| SVG `<picture>` defect | 0 SVGs wrapped |

**The only rupee figures remaining** are the FSSAI licence thresholds (₹12 lakh / ₹20 crore) on `/caterers-in-delhi-finding-the-right-fit-for-your-event`. Those are statutory, not pricing, and were kept deliberately.

**`/contact` was flagged then cleared.** Its first heading is "Tell Us About", which initially looked like the drawer leaking back in. It is the page's own `<h1>`, which is legitimate for a contact page.

**`attribution.js` costs 3,876 bytes** uncompressed. Negligible, and it did not dent any score.

---

## 3. On-page — stable, three items unchanged

| Check | Result |
|---|---|
| HTTP 200 | 39 / 39 |
| Missing / duplicate titles | 0 / 0 |
| Missing / duplicate meta descriptions | 0 / 0 |
| Zero or multiple H1 | 0 |
| Missing canonicals / mismatches | 0 / 0 |
| Missing Open Graph | 0 |
| Images missing width/height | **0** |

Word counts 304 to 2,509, median 1,051. No thin content.

**Unchanged since audit-1, still open:**
- **22 of 39 titles exceed 60 characters** and truncate
- **11 of 39 meta descriptions exceed 160 characters**
- **39 of 156 images have no `alt`**

None are hard. They have simply never been the most valuable thing on the list.

---

## 4. The performance ceiling is still the two tracking scripts

`Reduce unused JavaScript` remains the single largest opportunity on all five pages: **689 KiB, 4,840 ms** aggregate.

The composition has not changed since audit-2 and is entirely third-party:

```
gtag.js (GA4)               ~68 KB wasted
fbevents.js (Meta Pixel)    ~38 KB wasted
Meta signals config         ~32 KB wasted
```

No first-party JavaScript appears in the list. Your own code is clean, and today's additions did not change that.

**Deferring these is now the highest-value performance work remaining**, and it is being held pending a decision because it touches analytics. With LCP at 4.7s and the threshold at 2.5s, this is what stands between the current scores and good ones.

---

## 5. New finding: deploys fail silently

This surfaced twice today and is the most operationally important thing in this report.

Production stalled **three commits behind** `origin/main` for over 20 minutes. An empty commit pushed specifically to re-trigger the webhook did **not** move it. It required manual intervention on the hosting side.

Both times, GitHub reported success. Nothing in the normal workflow indicated the site was stale.

**The risk:** you push, assume it is live, and it is not. Today that was caught because the audit was checking. Ordinarily it would not be.

**Recommendation:** expose the running commit so this is a five-second check. The cheapest version is a build-stamped value rendered into an HTML comment or a `/version` route, set from the deploy. Then "did that deploy?" has an answer rather than a guess.

---

## 6. Still open, carried forward

**Static asset caching** — previously confirmed at 746 KiB across 24 resources. Hostinger serves static files from its own edge without invoking Node, so the `express.static` config cannot reach them. Fix is hPanel or a `public/.htaccess`, not the repo.

**Security headers** — deliberately unset pending a decision on HSTS. Code preserved in commit `8f47f5b`.

**The 52-day Search Console gap** (2026-03-27 to 2026-05-17) — still unexplained. It does **not** coincide with the site migration, which was late June or early July, so the earlier theory was wrong.

**Reviews** — zero `Review` schema. Reviews exist on Google and JustDial; the count and rating are still unknown, and they cannot be marked up as first-party reviews regardless.

---

## 7. What is genuinely strong

- **SEO 100/100 and best practices 100/100** on every page Google tested, across all three audits
- **CLS 0.000 to 0.003** sitewide
- Accessibility 96 to 100
- Zero duplicate or missing titles, descriptions, canonicals or Open Graph across 39 URLs
- Search traffic **up 18% clicks and 29% impressions** over the prior 28 days
- Location pages genuinely differentiated, max pairwise similarity 0.207
- Your own domain is your **#1 AI citation source at 22%**
- Every lead route now records its own source
