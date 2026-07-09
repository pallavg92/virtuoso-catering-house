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
router.get('/social', (req, res) => render(res, pages.social));
router.get('/gallery', (req, res) => res.redirect(301, '/social'));
router.get('/blog', (req, res) => render(res, pages.blog));
router.get('/blog/what-we-did-for-the-launch-of-the-lamborghini-temerario', (req, res) => render(res, pages.blogLamborghiniTemerario));
router.get('/blog/tesla-centre-gurugram-launch-catering', (req, res) => render(res, pages.blogTeslaGurugram));
router.get('/blog/ferrari-track-day-catering-buddh-international-circuit', (req, res) => render(res, pages.blogFerrariTrackDay));
router.get('/services', (req, res) => render(res, pages.services));
router.get('/menu', (req, res) => res.redirect(301, '/services'));
router.get('/contact', (req, res) => render(res, pages.contact));
router.get('/best-catering-services-in-noida', (req, res) => render(res, pages.landingBestNoida));
router.get('/catering-services-in-greater-noida', (req, res) => render(res, pages.landingGreaterNoida));
router.get('/corporate-catering-services-in-noida', (req, res) => render(res, pages.landingCorporate));
router.get('/luxury-brand-event-catering-delhi-ncr', (req, res) => render(res, pages.landingBrandEvent));
router.get('/press', (req, res) => render(res, pages.press));

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
router.get('/lamborghini-temerario-launch-catering-delhi-2025', (req, res) => res.redirect(301, '/blog/what-we-did-for-the-launch-of-the-lamborghini-temerario'));
router.get('/tesla-centre-gurugram-launch-catering-november-2025', (req, res) => res.redirect(301, '/blog/tesla-centre-gurugram-launch-catering'));

// The following pages were published on WordPress with a title and target
// keyword reserved but no content ever written — redirect to the closest
// live equivalent rather than 404.
router.get('/luxury-event-catering-delhi-ncr', (req, res) => res.redirect(301, '/blog'));
router.get('/luxury-automotive-event-catering-delhi-ncr', (req, res) => res.redirect(301, '/luxury-brand-event-catering-delhi-ncr'));
router.get('/luxury-fashion-and-retail-event-catering-delhi-ncr', (req, res) => res.redirect(301, '/services'));
router.get('/luxury-wedding-catering-delhi-ncr', (req, res) => res.redirect(301, '/services'));
router.get('/luxury-private-event-catering-delhi-ncr', (req, res) => res.redirect(301, '/services'));

// WordPress used nested page hierarchy (parent/child permalinks), not flat
// slugs, under the "Luxury Brand Event" parent — confirmed via real,
// currently-indexed Search Console URLs that would otherwise 404.
router.get('/luxury-brand-event-catering-delhi-ncr/luxury-automotive-event-catering-delhi-ncr', (req, res) => res.redirect(301, '/luxury-brand-event-catering-delhi-ncr'));
router.get('/luxury-brand-event-catering-delhi-ncr/luxury-automotive-event-catering-delhi-ncr/lamborghini-temerario-launch-catering-delhi-2025', (req, res) => res.redirect(301, '/blog/what-we-did-for-the-launch-of-the-lamborghini-temerario'));
router.get('/luxury-brand-event-catering-delhi-ncr/luxury-fashion-and-retail-event-catering-delhi-ncr', (req, res) => res.redirect(301, '/services'));
router.get('/luxury-brand-event-catering-delhi-ncr/luxury-wedding-catering-delhi-ncr', (req, res) => res.redirect(301, '/services'));
router.get('/luxury-brand-event-catering-delhi-ncr/luxury-private-event-catering-delhi-ncr', (req, res) => res.redirect(301, '/services'));

// A WordPress-uploaded menu PDF still has real Search Console impression
// volume (1,299 in the last 90 days) — redirect it to the current download
// instead of letting it 404 now that /wp-content/ is no longer served.
router.get('/wp-content/uploads/2025/04/Virtuoso-Menu-Chefs-Special-Most-Loved.pdf', (req, res) => res.redirect(301, '/downloads/virtuoso-catering-house-menu.pdf'));

module.exports = router;
