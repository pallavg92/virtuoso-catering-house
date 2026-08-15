# Virtuoso Catering House

A premium, awards-style marketing website for a luxury catering company, built with Node.js, Express, and EJS on the backend, and hand-crafted CSS with vanilla JavaScript + GSAP/ScrollTrigger on the front end. Production runs the Express app on Hostinger, rendering every page from the same EJS templates used in development.

## Local Development

```bash
npm install
npm run dev      # starts the Express dev server with nodemon (auto-restart on changes)
# or
npm start        # starts the Express dev server once, no auto-restart
```

The dev server runs at [http://localhost:3000](http://localhost:3000) and renders every page dynamically with EJS on each request — this is the fastest way to iterate on templates/styles locally.

## Production: Express on Hostinger

Production runs `server.js` directly on Hostinger's Node hosting, behind their
`hcdn` edge. Every page is rendered per request from the EJS templates in
`views/`, and `routes/api.js` handles the Inquire drawer and menu-download
forms. There is no separate production codepath: what the dev server renders is
what visitors get.

**This matters when adding an optimisation.** The site previously deployed to
Netlify as a static build, and several SEO fixes were written as build-time
steps against `/dist`. After the move to Hostinger those steps kept running at
build time and kept never reaching a visitor — the live sitemap advertised a
fake `lastmod`, images shipped unsized and unwrapped, and static assets carried
no `Cache-Control` for months. Anything that changes the HTML or the response
headers has to live in the Express path (`server.js`, `routes/`, `views/`) to
have any effect. `scripts/html-post.js` is shared by both paths and takes an
`assetRoot` for exactly this reason.

## Deploying

Pushing to `main` on GitHub deploys to Hostinger.

There is no build step to run first — Express renders from `views/` at request
time. SMTP credentials live in the Hostinger environment, not in the repo (see
Environment Variables below).

Verify a deploy landed by checking something the change should have altered, for
example:

```bash
curl -sI https://www.virtuosocatering.com/ | grep -i cache-control
curl -s https://www.virtuosocatering.com/sitemap.xml | head -20
```

## Optional: Static Build

`npm run build` still pre-renders every page to `/dist` and is wired to
`npm run serve:dist`. It is **not** what production serves — it is useful for
inspecting a fully static export, and `scripts/build.js` remains the reference
implementation for the sitemap and image passes.

```bash
npm run build
```

## Environment Variables (Nodemailer / Contact Form)

Used by the Express app both locally (via `.env`) and in production (set them in Hostinger's environment settings — same variable names, no `.env` file deployed).

Copy `.env.example` to `.env` for local development:

```bash
cp .env.example .env
```

| Variable              | Description                                                          |
| ---------------------- | --------------------------------------------------------------------- |
| `SMTP_HOST`           | Your SMTP server host                                                |
| `SMTP_PORT`           | SMTP port (587 for TLS, 465 for SSL, etc.)                            |
| `SMTP_SECURE`         | `"true"` for port 465, `"false"` otherwise                            |
| `SMTP_USER`           | SMTP username                                                         |
| `SMTP_PASS`           | SMTP password / app password                                          |
| `INQUIRY_TO_EMAIL`    | Address inquiries are delivered to                                    |
| `INQUIRY_FROM_EMAIL`  | The "from" address used when sending (often must match `SMTP_USER`)   |
| `PORT`                | Port the local Express dev server listens on (default `3000`)         |

**If no SMTP credentials are set, nothing crashes.** `POST /api/inquiry` still validates the submission normally and logs the inquiry details to the console instead of emailing — handy for testing without a mail provider configured yet.

## SEO / AEO

- `utils/pageMeta.js` centralizes each page's title, meta description, canonical URL, and Open Graph image — used by both the dev server and the static build so they never drift apart. `siteUrl` there is set to `https://www.virtuosocatering.com`.
- Every page includes Open Graph + Twitter Card tags, a canonical `<link>`, and `FoodEstablishment` JSON-LD structured data (name, address, phone, social profiles) in `views/partials/head.ejs`, sourced from `utils/pageMeta.js`.
- `public/robots.txt` points crawlers at `/sitemap.xml`, which the Express app generates per request in `routes/pages.js` from the same `pages` registry the routes use. Each URL carries its real `lastmod`, or none — never a synthetic "today", which would teach Google to ignore the field.

## File Structure

```
server.js                   Express app entry point — runs in production and locally
scripts/
  build.js                  Optional static export: EJS -> /dist HTML, copies /public, writes sitemap.xml
  html-post.js              Image passes (width/height, fetchpriority, <picture>/webp) shared by the Express path and the static build
routes/
  pages.js                  Renders all page views and /sitemap.xml (/, /about, /our-work, /blog, /services, /contact, /team/*; /menu redirects to /services)
  api.js                    POST /api/inquiry and /api/menu-download — serves the forms in production
utils/
  content.js                 Centralized placeholder copy/data for all pages (services, ourWork, blogPosts, testimonials, process, founders, menu, etc.)
  pageMeta.js                 Per-page SEO metadata (title, description, canonical, OG) + business info
  mailer.js                   Nodemailer transport + console-log fallback
  validateInquiry.js          Form validation used by routes/api.js
views/
  partials/                  head, nav (includes the global Inquire drawer), footer, preloader, cursor, scripts includes
  index.ejs, about.ejs,
  our-work.ejs, gallery.ejs,
  blog.ejs, services.ejs,
  contact.ejs, 404.ejs
public/
  css/                        variables, base, typography, nav, hero, sections,
                              forms, footer, animations, pages, cursor, preloader
  js/                         smooth-scroll, cursor, nav, preloader, gsap-animations,
                              menu-filter, lightbox, inquire-drawer, testimonials,
                              timeline, main
  images/, fonts/, downloads/, favicon.svg, robots.txt
```

## Notes

- **Images** are placeholder photography from [picsum.photos](https://picsum.photos) with stable seeds — swap the URLs in `utils/content.js` for real photography before launch.
- **Our Work / Blog** (`ourWork` and `blogPosts` in `utils/content.js`) are placeholder entries — replace with real case studies and posts as they're written.
- **Menu PDF**: `public/downloads/virtuoso-catering-house-menu.pdf` is a placeholder file — replace it with a real menu PDF (same filename, or update the link in `views/services.ejs`).
- **Inquire** is a global slide-in drawer (markup in `views/partials/drawers.ejs`, behavior in `public/js/inquire-drawer.js`), reachable from any page via the nav, footer, or CTA buttons — not a dedicated page navigation. The drawers and popups render at the *end* of `<body>`, included from `views/partials/scripts.ejs`: their titles are `<h2>`s, so rendering them near the top put four form headings ahead of every page's own `<h1>` in the heading outline. Keep them last.
- **Lead attribution**: `public/js/attribution.js` records click ids (`gclid`/`gbraid`/`wbraid`/`msclkid`) and UTM tags on arrival, holds them in `localStorage` for 90 days, and both lead forms post them with the submission. They print at the bottom of the inbox email. This is what makes Google Ads offline conversion import possible later, and it is why the click id must be captured on the landing page rather than at submit time.
- **Motion**: All scroll-driven animation respects `prefers-reduced-motion`, degrading to instant/simple states.
- **Custom cursor** and the lerped smooth-scroll are automatically disabled on touch/coarse-pointer devices.
- `/dist` is build output and is gitignored. It is regenerated by `npm run build` and is **not** what production serves — see Production above.
