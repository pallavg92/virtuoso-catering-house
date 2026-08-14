require('dotenv').config();
const express = require('express');
const path = require('path');

const pagesRouter = require('./routes/pages');
const apiRouter = require('./routes/api');
const content = require('./utils/content');
const { siteUrl, business, pages } = require('./utils/pageMeta');
const bundleCss = require('./scripts/bundle-css');

const app = express();
const PORT = process.env.PORT || 3000;

// Regenerate the combined stylesheet on every boot so it can never go
// stale relative to the individual source files in public/css/.
bundleCss();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Security headers. Set by hand rather than pulling in helmet: this is the
// whole of what the site needs, and the dependency list is deliberately short.
// Applied before express.static so static assets carry them too.
//
// Deliberately NOT set here:
//   * Content-Security-Policy. The pages carry inline <script> blocks and load
//     Google Tag Manager and Meta Pixel, so a policy strict enough to be worth
//     having needs per-request nonces and an allowlist for both vendors. Done
//     carelessly it silently breaks analytics or the enquiry modal, so it wants
//     its own pass with every page tested, not a line added here.
//   * includeSubDomains / preload on HSTS. Both are effectively irreversible
//     for as long as max-age, and they would cover subdomains this repo never
//     mentions — a webmail or panel host on plain HTTP would become
//     unreachable. Worth adding once every subdomain is confirmed HTTPS.
app.use((req, res, next) => {
  // Browsers ignore HSTS received over plain HTTP, so this is inert in local
  // development and takes effect only on the live HTTPS origin.
  res.setHeader('Strict-Transport-Security', 'max-age=31536000');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=(), payment=()');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cache lifetimes for static assets, mirroring the scheme scripts/build.js
// writes into dist/.htaccess. That file only ever applied to the static build,
// which production does not serve, so until now every CSS, JS, font and image
// request came back with no Cache-Control at all and was refetched on each
// visit. Same policy, applied where it actually takes effect.
//
// The split matters: an image or font is immutable in practice, because
// changing one means writing a new filename. bundle.css and the JS are not —
// they keep their names and are regenerated on every boot, so a year-long
// immutable cache would pin visitors to a stale stylesheet after a deploy.
// A week is the same compromise dist/.htaccess makes. Worth revisiting with a
// content hash in the filename, which would let these be immutable too.
const ONE_YEAR = 31536000;
const ONE_WEEK = 604800;

app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders(res, filePath) {
    if (/\.(jpe?g|png|gif|webp|avif|svg|ico|woff2?)$/i.test(filePath)) {
      res.setHeader('Cache-Control', `public, max-age=${ONE_YEAR}, immutable`);
    } else if (/\.(css|js)$/i.test(filePath)) {
      res.setHeader('Cache-Control', `public, max-age=${ONE_WEEK}`);
    }
  }
}));

// Canonicalize to the www host declared in utils/pageMeta.js (siteUrl).
// Google was indexing virtuosocatering.com and www.virtuosocatering.com
// as two separate pages, splitting ranking signal on the homepage.
app.use((req, res, next) => {
  if (req.hostname === 'virtuosocatering.com') {
    return res.redirect(301, `https://www.virtuosocatering.com${req.originalUrl}`);
  }
  next();
});

// Rendered pages revalidate every time. This sits after express.static so it
// only touches HTML, and it completes the dist/.htaccess policy, which caps
// text/html at zero seconds. Express still sends an ETag, so a page that has
// not changed costs a 304 rather than a full body — fresh content without
// paying for it twice.
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  next();
});

app.use('/', pagesRouter);
app.use('/api', apiRouter);

// 404
app.use((req, res) => {
  res.status(404).render('404', {
    ...content,
    title: 'Page Not Found — Virtuoso Catering House',
    description: 'The page you are looking for does not exist.',
    activePage: '',
    canonicalUrl: siteUrl + req.originalUrl,
    ogImage: pages.home.ogImage,
    siteUrl,
    business
  });
});

app.listen(PORT, () => {
  console.log(`\n  Virtuoso Catering House — running at http://localhost:${PORT}\n`);
});
