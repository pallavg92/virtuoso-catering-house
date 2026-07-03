require('dotenv').config();
const express = require('express');
const path = require('path');

const pagesRouter = require('./routes/pages');
const apiRouter = require('./routes/api');
const { siteUrl, business, pages } = require('./utils/pageMeta');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', pagesRouter);
app.use('/api', apiRouter);

// 404
app.use((req, res) => {
  res.status(404).render('404', {
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
