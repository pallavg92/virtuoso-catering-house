const express = require('express');
const router = express.Router();
const content = require('../utils/content');
const { siteUrl, business, pages } = require('../utils/pageMeta');

function render(res, page) {
  res.render(page.view, {
    ...content,
    ...page,
    canonicalUrl: siteUrl + (page.path === '/' ? '/' : page.path),
    siteUrl,
    business
  });
}

router.get('/', (req, res) => render(res, pages.home));
router.get('/about', (req, res) => render(res, pages.about));
router.get('/our-work', (req, res) => render(res, pages.ourWork));
router.get('/gallery', (req, res) => render(res, pages.gallery));
router.get('/blog', (req, res) => render(res, pages.blog));
router.get('/services', (req, res) => render(res, pages.services));
router.get('/menu', (req, res) => res.redirect(301, '/services'));
router.get('/contact', (req, res) => render(res, pages.contact));

module.exports = router;
