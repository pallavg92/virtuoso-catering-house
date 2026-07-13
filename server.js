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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Canonicalize to the www host declared in utils/pageMeta.js (siteUrl).
// Google was indexing virtuosocatering.com and www.virtuosocatering.com
// as two separate pages, splitting ranking signal on the homepage.
app.use((req, res, next) => {
  if (req.hostname === 'virtuosocatering.com') {
    return res.redirect(301, `https://www.virtuosocatering.com${req.originalUrl}`);
  }
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
