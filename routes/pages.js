const path = require('path');
const express = require('express');
const router = express.Router();
const { processHtml } = require('../scripts/html-post');
const content = require('../utils/content');
const { siteUrl, business, pages } = require('../utils/pageMeta');
const redirects = require('../utils/redirects');
const { sendInquiry, sendEnquiryAcknowledgement } = require('../utils/mailer');
const { validateInquiry, extractFields: extractInquiryFields } = require('../utils/validateInquiry');
const { sendEvent: sendMetaEvent, newEventId } = require('../utils/metaCapi');

// Images live in /public, which is what express.static() serves.
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

// Every page goes out through the same image post-processing the static build
// applies to /dist — width/height, fetchpriority on the hero, and a <picture>
// wrapper offering the pre-built .webp. Production serves this Express app
// rather than /dist, so without this hop none of it reached a real visitor.
//
// Cost is a single regex pass; the file reads behind it are memoised per
// asset path inside html-post, so a page pays for its images once per boot.
function render(res, page) {
  res.render(page.view, {
    ...content,
    ...page,
    canonicalUrl: siteUrl + (page.path === '/' ? '/' : page.path),
    siteUrl,
    business
  }, (err, html) => {
    if (err) return res.req.next(err);
    res.send(processHtml(html, PUBLIC_DIR).html);
  });
}

router.get('/sitemap.xml', (req, res) => {
  const urls = Object.values(pages)
    .filter((page) => !page.excludeFromSitemap)
    .map((page) => {
      const loc = siteUrl + (page.path === '/' ? '/' : page.path);

      // A real date or none at all. Stamping every URL with the current date
      // told Google all 38 pages changed on every request, which is how a
      // site teaches Google to ignore its lastmod altogether — and that is
      // exactly the freshness signal worth keeping accurate. Mirrors
      // writeSitemap() in scripts/build.js; keep the two in step.
      const modified = page.lastmod || (page.post && (page.post.updated || page.post.date));
      const lastmod = modified ? `\n    <lastmod>${modified}</lastmod>` : '';

      return `  <url>\n    <loc>${loc}</loc>${lastmod}\n  </url>`;
    })
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  res.type('application/xml').send(xml);
});

router.get('/', (req, res) => render(res, pages.home));
router.get('/about', (req, res) => render(res, pages.about));
router.get('/wedding-menu', (req, res) => render(res, pages.weddingMenu));
router.get('/our-work', (req, res) => render(res, pages.ourWork));
router.get('/team/aarti-sharma', (req, res) => render(res, pages.teamAartiSharma));
router.get('/team/pallav-goel', (req, res) => render(res, pages.teamPallavGoel));
router.get('/social', (req, res) => render(res, pages.social));
router.get('/blog', (req, res) => render(res, pages.blog));
router.get('/blog/what-we-did-for-the-launch-of-the-lamborghini-temerario', (req, res) => render(res, pages.blogLamborghiniTemerario));
router.get('/blog/tesla-centre-gurugram-launch-catering', (req, res) => render(res, pages.blogTeslaGurugram));
router.get('/blog/ferrari-track-day-catering-buddh-international-circuit', (req, res) => render(res, pages.blogFerrariTrackDay));
router.get('/blog/how-to-plan-wedding-catering-delhi-ncr', (req, res) => render(res, pages.blogWeddingCateringGuide));
router.get('/blog/bath-body-works-touch-of-gold-product-launch', (req, res) => render(res, pages.blogBathBodyWorks));
router.get('/blog/how-luxury-wedding-caterers-build-custom-menu', (req, res) => render(res, pages.blogMenuBuildingProcess));
router.get('/blog/food-trends-delhi-ncr-weddings-2026', (req, res) => render(res, pages.blogFoodTrends2026));
router.get('/blog/bmw-civil-lines-launch-catering', (req, res) => render(res, pages.blogBmwCivilLines));
router.get('/blog/five-cheeses-for-a-cheese-board', (req, res) => render(res, pages.blogCheeseBoard));
router.get('/blog/best-wedding-caterers-hospitality-before-food', (req, res) => render(res, pages.blogHospitalityBeforeFood));
router.get('/blog/the-quiet-craft-behind-an-unforgettable-wedding', (req, res) => render(res, pages.blogQuietCraft));
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
router.get('/wedding-caterers-in-delhi', (req, res) => render(res, pages.landingWeddingCaterersDelhi));
router.get('/wedding-caterers-in-noida', (req, res) => render(res, pages.landingWeddingCaterersNoida));
router.get('/privacy-policy', (req, res) => render(res, pages.privacyPolicy));
router.get('/press', (req, res) => render(res, pages.press));
// First-birthday paid lander. Unlike the rest of the site this form is a
// native POST with no JavaScript, so the server re-renders the page with
// errors and the visitor's own answers on failure, and 303s to the
// thank-you page (where the Meta Lead event fires) on success.
router.get('/lp/first-birthday', (req, res) => render(res, pages.lpFirstBirthday));

router.post('/lp/first-birthday', async (req, res) => {
  const errors = validateInquiry(req.body);

  if (Object.keys(errors).length > 0) {
    return res.status(400).render(pages.lpFirstBirthday.view, {
      ...content,
      ...pages.lpFirstBirthday,
      canonicalUrl: siteUrl + pages.lpFirstBirthday.path,
      siteUrl,
      business,
      errors,
      values: req.body,
      status: 'Please check the highlighted fields.'
    });
  }

  const fields = extractInquiryFields(req.body);

  try {
    await sendInquiry(fields);
  } catch (err) {
    console.error('First-birthday lander: failed to send inquiry email', err);
    return res.status(500).render(pages.lpFirstBirthday.view, {
      ...content,
      ...pages.lpFirstBirthday,
      canonicalUrl: siteUrl + pages.lpFirstBirthday.path,
      siteUrl,
      business,
      errors: {},
      values: req.body,
      status: 'Something went wrong sending your enquiry. Please call us on +91 87009 15463.'
    });
  }

  // Acknowledgement to the enquirer, if they gave us an email. Guarded
  // separately so a courtesy-email failure never affects a captured lead.
  try {
    await sendEnquiryAcknowledgement(fields);
  } catch (ackErr) {
    console.error('First-birthday lander: acknowledgement failed', ackErr.message);
  }

  // Conversions API. The same event_id is handed to the thank-you page so the
  // browser pixel reports it too and Meta collapses the pair into one
  // conversion. Awaited (with a 2s timeout inside) rather than fired and
  // forgotten, so a failure is logged rather than lost — but it can never
  // reject, and the enquiry has already been emailed by this point either way.
  const eventId = newEventId();
  await sendMetaEvent({
    eventName: 'Lead',
    eventId,
    req,
    userData: { email: fields.email, phone: fields.phone, city: fields.eventLocation },
    customData: { content_name: 'First Birthday' },
    sourceUrl: siteUrl + '/lp/first-birthday'
  });

  // 303 so a refresh of the thank-you page cannot re-submit the form.
  return res.redirect(303, '/lp/first-birthday/thank-you?eid=' + encodeURIComponent(eventId));
});

router.get('/lp/first-birthday/thank-you', (req, res) => render(res, {
  ...pages.lpFirstBirthdayThanks,
  // Empty when someone opens the URL directly rather than via the form; the
  // template falls back to generating its own id in that case.
  eventId: typeof req.query.eid === 'string' ? req.query.eid : ''
}));

router.get('/best-caterers-in-noida-virtuoso-catering-house', (req, res) => render(res, pages.bestCaterersNoida));
router.get('/how-to-hire-wedding-caterers-in-delhi-for-a-luxury-wedding', (req, res) => render(res, pages.hireWeddingCaterersDelhi));
router.get('/best-wedding-caterers-in-delhi-what-sets-them-apart', (req, res) => render(res, pages.bestWeddingCaterersDelhi));
router.get('/caterers-in-delhi-finding-the-right-fit-for-your-event', (req, res) => render(res, pages.caterersInDelhiFindingTheRightFit));

// Every 301 redirect (renamed paths + retired WordPress URLs) lives in
// utils/redirects.js, shared with scripts/build.js so the static deploy
// gets the same list as this dev server.
redirects.forEach(({ from, to }) => {
  router.get(from, (req, res) => res.redirect(301, to));
});

module.exports = router;
