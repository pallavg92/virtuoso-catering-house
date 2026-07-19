const express = require('express');
const router = express.Router();
const content = require('../utils/content');
const { siteUrl, business, pages } = require('../utils/pageMeta');
const redirects = require('../utils/redirects');

function render(res, page) {
  res.render(page.view, {
    ...content,
    ...page,
    canonicalUrl: siteUrl + (page.path === '/' ? '/' : page.path),
    siteUrl,
    business
  });
}

router.get('/sitemap.xml', (req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  const urls = Object.values(pages)
    .map((page) => {
      const loc = siteUrl + (page.path === '/' ? '/' : page.path);
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`;
    })
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  res.type('application/xml').send(xml);
});

router.get('/', (req, res) => render(res, pages.home));
router.get('/about', (req, res) => render(res, pages.about));
router.get('/our-work', (req, res) => render(res, pages.ourWork));
router.get('/social', (req, res) => render(res, pages.social));
router.get('/blog', (req, res) => render(res, pages.blog));
router.get('/blog/what-we-did-for-the-launch-of-the-lamborghini-temerario', (req, res) => render(res, pages.blogLamborghiniTemerario));
router.get('/blog/tesla-centre-gurugram-launch-catering', (req, res) => render(res, pages.blogTeslaGurugram));
router.get('/blog/ferrari-track-day-catering-buddh-international-circuit', (req, res) => render(res, pages.blogFerrariTrackDay));
router.get('/blog/how-to-plan-wedding-catering-delhi-ncr', (req, res) => render(res, pages.blogWeddingCateringGuide));
router.get('/blog/bath-body-works-touch-of-gold-product-launch', (req, res) => render(res, pages.blogBathBodyWorks));
router.get('/blog/how-luxury-wedding-caterers-build-custom-menu', (req, res) => render(res, pages.blogMenuBuildingProcess));
router.get('/blog/does-wedding-presentation-need-big-budget', (req, res) => render(res, pages.blogPresentationMyths));
router.get('/blog/is-your-tasting-chef-your-wedding-day-chef', (req, res) => render(res, pages.blogTastingChefContinuity));
router.get('/blog/wedding-catering-menu-in-delhi', (req, res) => render(res, pages.blogWeddingMenuBreakdown));
router.get('/blog/luxury-catering-cost-delhi-ncr', (req, res) => render(res, pages.blogCateringCost));
router.get('/blog/dos-and-donts-finalizing-wedding-menu', (req, res) => render(res, pages.blogWeddingMenuDosDonts));
router.get('/blog/parameters-to-consider-before-booking-wedding-caterer', (req, res) => render(res, pages.blogParametersBeforeBooking));
router.get('/blog/wedding-food-presentation-five-star-hotel', (req, res) => render(res, pages.blogFivestarPresentation));
router.get('/blog/choosing-wedding-menu-four-factors', (req, res) => render(res, pages.blogChoosingWeddingMenu));
router.get('/services', (req, res) => render(res, pages.services));
router.get('/contact', (req, res) => render(res, pages.contact));
router.get('/best-catering-services-in-noida', (req, res) => render(res, pages.landingBestNoida));
router.get('/catering-services-in-greater-noida', (req, res) => render(res, pages.landingGreaterNoida));
router.get('/corporate-catering-services-in-noida', (req, res) => render(res, pages.landingCorporate));
router.get('/luxury-brand-event-catering-delhi-ncr', (req, res) => render(res, pages.landingBrandEvent));
router.get('/luxury-wedding-catering-delhi-ncr', (req, res) => render(res, pages.landingWedding));
router.get('/press', (req, res) => render(res, pages.press));
router.get('/best-caterers-in-noida-virtuoso-catering-house', (req, res) => render(res, pages.bestCaterersNoida));
router.get('/wedding-caterers-delhi-ncr', (req, res) => render(res, pages.weddingCaterersDelhiNcr));

// Every 301 redirect (renamed paths + retired WordPress URLs) lives in
// utils/redirects.js, shared with scripts/build.js so the static deploy
// gets the same list as this dev server.
redirects.forEach(({ from, to }) => {
  router.get(from, (req, res) => res.redirect(301, to));
});

module.exports = router;
