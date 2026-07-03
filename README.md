# Virtuoso Catering House

A premium, awards-style marketing website for a luxury catering company, built with Node.js, Express, and EJS on the backend, and hand-crafted CSS with vanilla JavaScript + GSAP/ScrollTrigger on the front end. The site is statically generated (SSG) for production and deploys to Netlify as plain HTML + a serverless function.

## Local Development

```bash
npm install
npm run dev      # starts the Express dev server with nodemon (auto-restart on changes)
# or
npm start        # starts the Express dev server once, no auto-restart
```

The dev server runs at [http://localhost:3000](http://localhost:3000) and renders every page dynamically with EJS on each request — this is the fastest way to iterate on templates/styles locally.

## Production: Static Build

Production does **not** run the Express server. Instead, `npm run build` pre-renders every page to plain HTML in `/dist`:

```bash
npm run build
```

This:
- Renders `/`, `/about`, `/menu`, `/gallery`, `/contact`, and a `404.html` to static files in `/dist`
- Copies all of `/public` (css, js, images, downloads, favicon, robots.txt) into `/dist`
- Generates `/dist/sitemap.xml` from the same page list

The generated HTML is byte-identical in appearance to what the Express dev server renders — the same EJS templates, CSS, and JS run either way. Only *when* the HTML gets built changes (once at deploy time, instead of per-request).

## Deploying to Netlify

`netlify.toml` is already configured:

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Functions directory:** `netlify/functions`
- `/api/inquiry` is redirected to the `inquiry` Netlify Function so the contact form works exactly as it does locally — `public/js/form-handler.js` needs no changes.

To deploy:

1. Push this repo to GitHub (already done if you're reading this from the repo).
2. In Netlify: **Add new site → Import an existing project → select this repo.** Netlify reads `netlify.toml` and fills in the build settings automatically.
3. Add the SMTP environment variables (see below) under **Site settings → Environment variables**.
4. Deploy. Netlify serves the static pages from its global CDN and runs `netlify/functions/inquiry.js` on-demand whenever the contact form is submitted — no server to keep running or pay for.

## Environment Variables (Nodemailer / Contact Form)

Used both by the local Express dev server (via `.env`) and by the Netlify Function (via Netlify's dashboard env vars — same variable names, no `.env` file needed there).

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

**If no SMTP credentials are set, nothing crashes.** `POST /api/inquiry` (or the Netlify Function in production) still validates the submission normally and logs the inquiry details to the console instead of emailing — handy for testing without a mail provider configured yet.

## SEO / AEO

- `utils/pageMeta.js` centralizes each page's title, meta description, canonical URL, and Open Graph image — used by both the dev server and the static build so they never drift apart. `siteUrl` there is set to `https://www.virtuosocatering.com`.
- Every page includes Open Graph + Twitter Card tags, a canonical `<link>`, and `FoodEstablishment` JSON-LD structured data (name, address, phone, social profiles) in `views/partials/head.ejs`, sourced from `utils/pageMeta.js`.
- `public/robots.txt` points crawlers at `/sitemap.xml`, which is regenerated on every `npm run build`.

## File Structure

```
server.js                   Express app entry point (local dev only)
scripts/
  build.js                  Static site build: EJS -> /dist HTML, copies /public, writes sitemap.xml
netlify.toml                Netlify build config + /api/inquiry -> function redirect
netlify/functions/
  inquiry.js                Serverless contact-form handler (production)
routes/
  pages.js                  Renders all page views (dev server only: /, /about, /menu, /gallery, /contact)
  api.js                    POST /api/inquiry — dev-server equivalent of the Netlify function
utils/
  content.js                 Centralized placeholder copy/data for all pages
  pageMeta.js                 Per-page SEO metadata (title, description, canonical, OG) + business info
  mailer.js                   Nodemailer transport + console-log fallback
  validateInquiry.js          Shared form validation (used by both routes/api.js and the Netlify function)
views/
  partials/                  head, nav, footer, preloader, cursor, scripts includes
  index.ejs, about.ejs,
  menu.ejs, gallery.ejs,
  contact.ejs, 404.ejs
public/
  css/                        variables, base, typography, nav, hero, sections,
                              forms, footer, animations, pages, cursor, preloader
  js/                         smooth-scroll, cursor, nav, preloader, gsap-animations,
                              menu-filter, lightbox, form-handler, testimonials,
                              timeline, main
  images/, fonts/, downloads/, favicon.svg, robots.txt
```

## Notes

- **Images** are placeholder photography from [picsum.photos](https://picsum.photos) with stable seeds — swap the URLs in `utils/content.js` for real photography before launch.
- **Menu PDF**: `public/downloads/virtuoso-catering-house-menu.pdf` is a placeholder file — replace it with a real menu PDF (same filename, or update the link in `views/menu.ejs`).
- **Motion**: All scroll-driven animation respects `prefers-reduced-motion`, degrading to instant/simple states.
- **Custom cursor** and the lerped smooth-scroll are automatically disabled on touch/coarse-pointer devices.
- `/dist` is build output and is gitignored — it's regenerated by `npm run build` (Netlify runs this automatically on every deploy).
