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
router.get('/blog/what-we-did-for-the-launch-of-the-lamborghini-temerario', (req, res) => render(res, pages.blogLamborghiniTemerario));
router.get('/services', (req, res) => render(res, pages.services));
router.get('/menu', (req, res) => res.redirect(301, '/services'));
router.get('/contact', (req, res) => render(res, pages.contact));
router.get('/best-catering-services-in-noida', (req, res) => render(res, pages.landingBestNoida));
router.get('/catering-services-in-greater-noida', (req, res) => render(res, pages.landingGreaterNoida));
router.get('/corporate-catering-services-in-noida', (req, res) => render(res, pages.landingCorporate));

// 301 redirects from the retired WordPress site's URLs to their closest
// equivalent on the new site, so existing backlinks/bookmarks/search
// results don't 404.
router.get('/about-us', (req, res) => res.redirect(301, '/about'));
router.get('/contact-us', (req, res) => res.redirect(301, '/contact'));
router.get('/menu-cuisines', (req, res) => res.redirect(301, '/services'));
router.get('/bespoke-experiences', (req, res) => res.redirect(301, '/services'));
router.get('/blogs', (req, res) => res.redirect(301, '/blog'));
router.get('/thank-you', (req, res) => res.redirect(301, '/contact'));
router.get('/a-hosts-guide-to-house-party-planning', (req, res) => res.redirect(301, '/blog'));
router.get('/what-we-did-for-the-launch-of-the-lamborghini-temerario', (req, res) => res.redirect(301, '/blog/what-we-did-for-the-launch-of-the-lamborghini-temerario'));

module.exports = router;
