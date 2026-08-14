# Connecting Search Console (and CrUX / GA4) to the audit tooling

**Why this is not already done:** every step below needs you signed into Google
Cloud Console and Search Console, and step 4 produces a service-account private
key. Account creation and credential handling are yours to do, not mine. Once
the config file exists I can read it and re-run the audit with real data.

Your Search Console property is already verified and collecting data — that part
is done. What is missing is **API access from this machine**, which is a
separate thing. `google_auth.py --check` currently reports
`Credential Tier: -1 — No credentials configured`.

---

## What this unlocks

The audit dated 2026-08-14 scored 69/100 with **no field data at all**. With
these credentials the next run gains:

| API | What the audit gets |
|---|---|
| Search Console | Real impressions, clicks, CTR, average position, and indexation status per URL |
| CrUX | Real-user Core Web Vitals, replacing lab estimates |
| PageSpeed Insights | Lab audits without running Chromium locally |
| GA4 | Organic traffic trends |

The single biggest gain is CrUX. Mobile LCP measured **2492 ms against a 2500 ms
threshold** in the lab — an 8 ms margin, under conditions kinder than a real
mid-tier handset on an Indian mobile network. Whether that actually passes for
real users is currently unknown.

Second biggest is GSC. Every ranking statement in the audit describes *what page
type* occupies page 1, not where Virtuoso actually sits. GSC replaces that
inference with fact.

---

## Steps

### 1. Google Cloud project
<https://console.cloud.google.com> → create or select a project.

### 2. Enable these APIs
APIs & Services → Library:
- Google Search Console API
- Chrome UX Report API
- PageSpeed Insights API
- Google Analytics Data API *(only if you want GA4)*

### 3. API key — covers PageSpeed and CrUX
Credentials → Create Credentials → API key. Restrict it to the PageSpeed
Insights and Chrome UX Report APIs.

This alone fixes the Core Web Vitals gap, and it needs no service account. If
you only do one thing, do this.

### 4. Service account — covers Search Console and GA4
IAM & Admin → Service Accounts → Create. Create a JSON key and download it.

**Keep this file outside the repo.** It is a private key. Somewhere like
`~/.config/claude-seo/service-account.json` is fine. Do not paste its contents
into chat — just tell me the path.

### 5. Grant it access
- **Search Console** → Settings → Users and permissions → Add user. Paste the
  service account's `client_email`. Read-only "Full" is enough for the audit;
  "Owner" is only needed if you later want the Indexing API.
- **GA4** *(optional)* → Admin → Property Access Management → Add, role Viewer.

### 6. Write the config

```bash
mkdir -p ~/.config/claude-seo
```

Then create `~/.config/claude-seo/google-api.json`:

```json
{
  "service_account_path": "/Users/pallavgoel/.config/claude-seo/service-account.json",
  "api_key": "YOUR_API_KEY",
  "default_property": "sc-domain:virtuosocatering.com",
  "ga4_property_id": "properties/YOUR_GA4_ID"
}
```

**On `default_property`** — the format depends on how the property was verified:
- Domain property → `sc-domain:virtuosocatering.com`
- URL-prefix property → `https://www.virtuosocatering.com/`

If unsure, check the property selector in Search Console. A domain property has
no `https://` prefix shown.

Include only the keys you have. The API key alone is valid and useful.

### 7. Verify

```bash
cd "/Users/pallavgoel/Desktop/Website Virtuoso" && .claude/skills/seo/bin/claude-seo run google_auth.py --check
```

Tier should move from `-1` to a positive number.

---

## The lower-effort alternative

If the Cloud Console setup is more than you want to do right now, export CSVs
from the Search Console UI instead — Performance → Export → CSV, and the Pages
report. Drop them anywhere in the repo and point me at them. That covers the
ranking and indexation gap, though not CrUX field vitals.
