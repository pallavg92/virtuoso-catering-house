# Virtuoso Catering House

A premium, awards-style marketing website for a luxury catering company, built with Node.js, Express, and EJS on the backend, and hand-crafted CSS with vanilla JavaScript + GSAP/ScrollTrigger on the front end.

## Getting Started

```bash
npm install
npm run dev      # starts the server with nodemon (auto-restart on server changes)
# or
npm start        # starts the server once, no auto-restart
```

The site runs at [http://localhost:3000](http://localhost:3000) by default.

## Environment Variables (Nodemailer / Contact Form)

Copy `.env.example` to `.env` and fill in SMTP credentials to send real emails from the inquiry form:

```bash
cp .env.example .env
```

| Variable             | Description                                              |
|----------------------|------------------------------------------------------------|
| `SMTP_HOST`          | Your SMTP server host                                      |
| `SMTP_PORT`          | SMTP port (587 for TLS, 465 for SSL, etc.)                  |
| `SMTP_SECURE`        | `"true"` for port 465, `"false"` otherwise                  |
| `SMTP_USER`          | SMTP username                                               |
| `SMTP_PASS`          | SMTP password / app password                                 |
| `INQUIRY_TO_EMAIL`   | Address inquiries are delivered to                           |
| `INQUIRY_FROM_EMAIL` | The "from" address used when sending (often must match `SMTP_USER`) |
| `PORT`               | Port the Express server listens on (default `3000`)         |

**If no SMTP credentials are set, the server does not crash or fail requests.** Instead, `POST /api/inquiry` validates the submission normally and logs the inquiry details to the console — handy for local development without a mail provider.

## File Structure

```
server.js                  Express app entry point
routes/
  pages.js                 Renders all page views (/, /about, /menu, /gallery, /contact)
  api.js                   POST /api/inquiry — validation + Nodemailer send
utils/
  content.js                Centralized placeholder copy/data for all pages
  mailer.js                 Nodemailer transport + console-log fallback
views/
  partials/                 head, nav, footer, preloader, cursor, scripts includes
  index.ejs, about.ejs,
  menu.ejs, gallery.ejs,
  contact.ejs, 404.ejs
public/
  css/                       variables, base, typography, nav, hero, sections,
                             forms, footer, animations, pages, cursor, preloader
  js/                        smooth-scroll, cursor, nav, preloader, gsap-animations,
                             menu-filter, lightbox, form-handler, testimonials,
                             timeline, main
  images/, fonts/, downloads/
```

## Notes

- **Images** are placeholder photography from [picsum.photos](https://picsum.photos) with stable seeds — swap the URLs in `utils/content.js` for real photography before launch.
- **Menu PDF**: `public/downloads/virtuoso-catering-house-menu.pdf` is a placeholder file — replace it with a real menu PDF (same filename, or update the link in `views/menu.ejs`).
- **Motion**: All scroll-driven animation respects `prefers-reduced-motion`, degrading to instant/simple states.
- **Custom cursor** and the lerped smooth-scroll are automatically disabled on touch/coarse-pointer devices.
