# Backlink Profile Audit — virtuosocatering.com

Audited: 2026-08-14. Domain: https://www.virtuosocatering.com

## Data Tier

`backlinks_auth.py --check` confirms **Tier 0 (Basic)**. Moz API and Bing Webmaster API are both
unconfigured (`available: false` for both). Available sources: Common Crawl web graph and the local
backlink verification crawler (extended here with real headless-browser rendering to avoid JS/bot-block
false negatives — see Methodology).

**Domain Authority, Page Authority, and Spam Score were NOT measured and are NOT estimated anywhere in
this report.** Any of those numbers would require the Moz or DataForSEO extension.

## Category Score: INSUFFICIENT DATA (Tier 0)

Ran through `validate_backlink_report.py` — status **PASS** (0 errors, 0 warnings, 1 info note, applied
throughout this report). Per the skill's own scoring rubric, a Backlink Health Score is built from 7
weighted factors (referring domains 20%, domain quality distribution 20%, anchor text naturalness 15%,
toxic link ratio 20%, link velocity 10%, follow/nofollow ratio 5%, geographic relevance 10%). At Tier 0,
only **2 of 7** have any observable data at all (a toxic-risk read and a single follow/nofollow
observation, both from manually re-rendering the two known press URLs — N=2 pages, not a real link
graph). That is below the "fewer than 4 factors" threshold the skill sets for reporting a number, so no
formal 0-100 score is given.

**If the audit rollup needs a single placeholder number:** use **15–20/100, confidence 0.30**. Basis:
zero verified referring links from the two flagship claimed press mentions (see below), no toxic-link
signals detected anywhere I could check, and a clean domain history — i.e., "thin/near-zero built link
equity, nothing alarming, nothing built yet." This is a directional read only, not a true weighted score,
and should not be compared numerically against categories or domains scored with Moz/DataForSEO data.

## The Core Finding: Claimed Press Coverage vs. What Actually Links Back

`utils/content.js` (`pressMentions` array, ~line 1814) and the live `/press` page claim exactly two press
mentions. Both were independently re-verified: first with `verify_backlinks.py` (raw HTTP GET), then with
`render_page.py --mode always` (real Playwright-Chromium render) because the raw pass flagged both as
JS-rendered/bot-blocked and could not be trusted on its own. Every `<a href>` in the fully rendered DOM of
each page was checked for `virtuosocatering.com`.

| Outlet (as labeled on site) | Claimed URL | HTTP status observed | Link to virtuosocatering.com present? | Follow/nofollow |
|---|---|---|---|---|
| "News18" | `https://m.dailyhunt.in/news/india/english/r+news+india-epaper-dhfacc36dfce9c4bb68db0e89d033c921b/virtuoso+catering+house+curates+ferrarilevel+hospitality+experiences+across+delhi+ncr-newsid-dhfacc36dfce9c4bb68db0e89d033c921b_473d30305b3611f1bac78f0ddb48c3b3` | 200 (raw GET and rendered) | **No — zero occurrences of the domain anywhere in the rendered HTML** | N/A, no link exists |
| "ANI News" | `https://www.aninews.in/news/business/5-luxury-catering-companies-leading-delhi-ncr-202620260310161710/` | 403 on raw GET (Cloudflare bot-block); **200 on real render** | **No — zero occurrences of virtuosocatering.com.** A link does exist on the brand name, but it points to Instagram (`instagram.com/virtuosocateringhouse`), not the website | Followed (`rel="noopener"`, no nofollow/ugc/sponsored) — but to Instagram, not the site |

**Verdict: 0 of 2 claimed press mentions pass any backlink equity to virtuosocatering.com.** Both pages
are real, live, and correctly name "Virtuoso Catering House" (no fabrication — this is not a case of
invented coverage). But neither is a backlink to the site in the SEO sense.

Supporting detail on each:

- **Dailyhunt/"News18" URL**: Confirmed real article, headline and body correctly describe Virtuoso's
  Ferrari APAC event work, founders named correctly (Pallav Goel, Aarti Sharma, founded Sept 2024). But
  the page's own JSON-LD schema states `publisher: "Dailyhunt"` and `author: "R News India"` — **not
  News18**. I could not find a News18-branded version of this article; the only live URL on file is this
  Dailyhunt syndication. This is a labeling discrepancy between the site's `pressAndClients`/`pressMentions`
  attribution and what the live page's own metadata says. Schema also tags the piece
  `articleSection: "Health"`, `keywords: "#Featured Writers, #GenZ"` — consistent with syndicated
  wire/PR content, not a dedicated News18 business-desk placement. All outbound links on the page are
  Dailyhunt's own nav/share/app-store/social chrome; none point to Virtuoso.
- **ANI News URL**: Real, live listicle ("5 Luxury Catering Companies..."), byline tag "VMPL" (a
  wire/PR-distribution marker common across Indian portals), correctly grouped with the four other named
  competitors from the same piece. Every one of the five companies in the article — including Kitchen Art
  Company, Orange Blossom, Salt House Catering, Rajbhog Caterers — gets an Instagram-only link, never a
  website link. This looks like the piece's standard format, not something specific to Virtuoso.

The `/press` page copy itself ("Every feature below links to the original, published article. Virtuoso
Catering House is named in each") is technically accurate — it only claims the *article names the brand*,
not that the article *links back*. So this is not a false claim on-site, but it is a real gap if anyone
(including AI answer engines or a future analyst) reads "press coverage" as backlink authority. Source:
Verify crawler + Playwright render, direct observation (confidence: 0.95).

## Domain History (`domain_history.py`)

- Registered 2024-11-15, ~1.74 years old, registrar Name SRS AB, expires 2026-11-15.
- No expired-domain heritage risk: single continuous WHOIS registration, nothing to suggest the domain
  was previously owned/repurposed from an unrelated topic.
- `risk: unknown` only because no `--baseline-topic` was supplied for shift detection — this is a missing
  optional parameter, not a red flag.

## Common Crawl Web Graph (`commoncrawl_graph.py`) — confidence 0.50, domain-level only

```
in_crawl: true | in_rankings: false | pagerank: null | harmonic_centrality: null | n_hosts: null
note: "Domain found in CC crawl but below ranking threshold (too small/new for PageRank rankings)."
release: cc-main-2026-jan-feb-mar
```

Read this as **"below ranking threshold,"** not "no authority" (this exact framing is enforced by
`validate_backlink_report.py`, which flagged it as an info-level check and passed). Two important limits:

1. **Common Crawl returned zero referring domains — and cannot return any.** `commoncrawl_graph.py --help`
   documents `--top-referrers` as a "legacy no-op; referring domains are not extracted." This tool never
   surfaces a referring-domain list at all, regardless of domain size. So "no referring domains found via
   CC" is a tooling ceiling, not a finding of zero backlinks.
2. No known-backlinks list beyond the two press URLs was available, so there was nothing else to run
   through the verify crawler at Tier 0.

## Toxic / Spam Risk

`parasite_risk.py` scanned the two known press source URLs and returned `overall_risk: "high"` with flag
`third-party-authorship-density` for the grouped `/news/` section. This is a heuristic read of the
*source pages'* content type (both read as third-party/wire-syndicated content rather than staff
journalism) — consistent with the "R News India" and "VMPL" bylines found manually above. **This is not a
finding of a toxic backlink to virtuosocatering.com**, since neither page actually links to the site;
there is nothing live to flag as toxic. Read it as: these placements, if ever converted into real links,
would be low-editorial-weight wire placements rather than staff-reported journalism — useful for valuing
future press pickups, not a current toxic-link problem.

No link schemes, PBN patterns, or spam signals were found anywhere I could check — but this is an
absence-of-evidence result under very limited visibility (2 known URLs, no referring-domain list), not a
clean bill of health from a comprehensive scan.

## What Genuinely Works

- **Internal claim hygiene is good.** `utils/content.js` (lines ~1805–1813) carries an explicit rule that
  a mention only enters `pressMentions` after someone opens the live URL and confirms the brand is
  actually named, and explicitly warns against populating it from AI-citation/Semrush reports because
  those can be false positives. Outlets referenced only in passing (Times of India, Economic Times, India
  Today) are deliberately kept as logo-only trust signals on the homepage marquee, not backed by a
  specific article claim on `/press`. That is more disciplined than most sites in this category.
- Domain history is clean (see above).
- The site is crawled by Common Crawl and `/press` ships `Organization`/`NewsArticle` schema.org markup —
  the correct mechanism for AI answer engines to cite the coverage even without a hyperlink.
- Both claimed placements are at least real and accurately naming the brand — a low bar, but one this
  site clears, and one that is easy to fail (fabricated or misattributed "featured in" claims are common
  in this category).

## Link-Earning Opportunities (Delhi NCR luxury catering) — not verified, offered as category-standard leads

I have no Tier-0 way to check whether any of these already exist for Virtuoso, so these are opportunities,
not confirmed gaps:

- Wedding directory vendor profiles with real dofollow links (WedMeGood, WeddingWire India, ShaadiSaga)
  are standard for this category.
- Venue partner/preferred-vendor pages for venues already served (e.g., Buddh International Circuit for
  the Ferrari APAC event, Yamuna Expressway farmhouse venues) typically carry a real followed link.
- The ANI News placement is a concrete, low-effort outreach target: the piece already exists, already
  names the brand correctly, and already links out — a request to swap/add the website URL alongside the
  Instagram link is realistic since the article's publisher relationship is already established.
- Trade/industry association and local Noida/Delhi business directory listings.
- Named brand clients (Ferrari APAC, Lamborghini, Tesla India, BMW, Bath & Body Works, House of Masaba) —
  if any of those brands' own event recap or PR pages name the caterer, that would be a natural,
  high-authority link; not checked in this pass.
- Competitor comparison (Kitchen Art Company, Foodlink, Food Inc by Yum Yum Tree, Creative Cuisines Inc)
  could not be run — any of their backlink profiles would need Moz or DataForSEO, neither configured.

## What I Could Not Measure (explicit limits)

- Domain Authority, Page Authority, Spam Score — require Moz API. Not configured, not estimated.
- Referring domain count, list, or growth trend — require Moz/DataForSEO/Bing; Common Crawl does not
  extract this at all at any tier of this tool.
- Anchor text distribution across a real link graph — only one real external anchor text was found to
  observe in this entire pass (the Instagram link on the ANI page).
- Follow/nofollow ratio across a real link graph — same limit, N=1 real link found.
- Link velocity/trend over time — DataForSEO (Tier 3) only.
- Geographic distribution of links — DataForSEO or Bing only.
- Competitor backlink comparison — not possible at Tier 0.
- Whether Virtuoso already has WedMeGood/WeddingWire/etc. listings — not checked; would need per-directory
  lookups outside the two available tools.

## Sources / Methodology

- `backlinks_auth.py --check --json` — tier confirmation.
- `domain_history.py virtuosocatering.com --json`.
- `commoncrawl_graph.py virtuosocatering.com --json` (release cc-main-2026-jan-feb-mar).
- `verify_backlinks.py --target https://www.virtuosocatering.com --links <2 known press URLs> --json`.
- `render_page.py --mode always` on both press URLs (real Playwright-Chromium render) — used specifically
  because the verify crawler flagged both pages as JS-rendered/bot-blocked on plain HTTP GET; rendering
  was necessary to avoid a JS false negative per the skill's own guidance. HTML saved and grepped for
  every `href` containing "virtuosocatering" plus manual review of link context.
- `parasite_risk.py` on both press URLs.
- `validate_backlink_report.py --report report_data.json --json` — status PASS (0 errors, 0 warnings, 1
  info note; the info note's guidance is applied throughout this report).
- Source review: `utils/content.js` (`pressMentions`, `pressAndClients`), `views/press.ejs`,
  `views/index.ejs`.
- Live fetch of `https://www.virtuosocatering.com/press` — confirms production output matches the source
  templates reviewed.
