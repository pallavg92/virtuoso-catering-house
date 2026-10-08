const path = require('path');
const express = require('express');
const router = express.Router();
const { processHtml } = require('../scripts/html-post');
const content = require('../utils/content');
const { siteUrl, business, pages } = require('../utils/pageMeta');
const redirects = require('../utils/redirects');
const { sendInquiry, sendEnquiryAcknowledgement } = require('../utils/mailer');
const { logLeadToSheet } = require('../utils/sheetLog');
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
router.get('/blog/welcome-drinks-for-guests', (req, res) => render(res, pages.blogWelcomeDrinks));
router.get('/blog/indian-diwali-grazing-table', (req, res) => render(res, pages.blogDiwaliGrazing));
router.get('/blog/dips-for-a-grazing-table', (req, res) => render(res, pages.blogFiveDips));
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

  // The threshold checkbox is the whole point of this lander: it is what keeps
  // enquiries below the engagement level off the phone. `required` in the
  // markup is trivially bypassed, so the real gate is here.
  if (req.body.budgetConfirmed !== 'yes') {
    errors.budgetConfirmed = 'Please confirm the engagement level to continue.';
  }

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

// Diwali 2026 paid lander. Unlike the first-birthday page this one keeps its
// own thank-you state in the page, so the form posts JSON here and stays put.
// Validation is repeated on this side because `required` in the markup is
// trivially bypassed, and the threshold tick is the whole point of the page.
router.get('/lp/diwali-2026', (req, res) => render(res, pages.lpDiwali2026));
// The plan variant: same form, same rules, same conversion. Only the words
// around the form differ, which is the whole point of running the two.
router.get('/lp/diwali-2026-plan', (req, res) => render(res, pages.lpDiwali2026Plan));

router.post(['/lp/diwali-2026', '/lp/diwali-2026-plan'], async (req, res) => {
  const body = req.body || {};
  const str = (v) => (typeof v === 'string' ? v.trim() : '');
  const errors = {};

  const name = str(body.name);
  // The page sends +91XXXXXXXXXX; accept a bare ten digits too, in case the
  // markup is ever reused somewhere that does not add the prefix.
  const digits = str(body.phone).replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '');
  const email = str(body.email);

  if (name.length < 2) errors.name = 'Please enter your name.';
  if (!/^[6-9]\d{9}$/.test(digits)) errors.phone = 'Please enter a ten digit mobile number.';
  if (!str(body.partyType)) errors.partyType = 'Please choose corporate or private.';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(str(body.eventDate))) errors.eventDate = 'Please choose the date of your party.';
  if (!str(body.guestCount)) errors.guestCount = 'Please choose how many guests you expect.';
  if (str(body.eventLocation).length < 2) errors.eventLocation = 'Please tell us where the party is.';
  // Email is required here as well as in the markup: `required` is trivially
  // bypassed, and the acknowledgement and the Meta match both depend on it.
  if (!email) {
    errors.email = 'Please enter your email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    errors.email = 'That address does not read as an email.';
  }
  if (str(body.budgetConfirmed) !== 'yes') errors.budgetConfirmed = 'Please confirm the pricing to check your date.';

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ ok: false, errors });
  }

  const fields = {
    name,
    email,
    phone: '+91' + digits,
    eventDate: str(body.eventDate),
    eventType: str(body.eventType) || 'Diwali Party',
    guestCount: str(body.guestCount),
    // Two different questions, two different lines in the lead email: what
    // kind of party it is, and where it is being held.
    partyType: str(body.partyType),
    eventLocation: str(body.eventLocation),
    eventVision: str(body.eventVision),
    budgetConfirmed: 'yes',
    pageVariant: str(body.pageVariant),
    // This page carries its own utm fields rather than the site's attribution
    // script, so they are reshaped into the form the lead email prints.
    attribution: {
      utmSource: str(body.utm_source),
      utmMedium: str(body.utm_medium),
      utmCampaign: str(body.utm_campaign),
      utmContent: str(body.utm_content),
      utmTerm: str(body.utm_term),
      gclid: str(body.gclid),
      fbclid: str(body.fbclid),
      landingPage: str(body.page_url)
    }
  };

  try {
    await sendInquiry(fields);
  } catch (err) {
    console.error('Diwali lander: failed to send inquiry email', err);
    return res.status(500).json({
      ok: false,
      errors: { _general: 'We could not send your enquiry. Please call us on +91 87009 15463.' }
    });
  }

  if (email) {
    try {
      await sendEnquiryAcknowledgement(fields);
    } catch (ackErr) {
      console.error('Diwali lander: acknowledgement failed', ackErr.message);
    }
  }

  // Only a real, in-season enquiry is reported to Meta as a Lead. An enquiry
  // with no guest count, or for a date after Diwali, is emailed like any
  // other but stays out of the conversion the ads optimise towards: those
  // rarely book, and reporting them trains delivery to find more of them.
  // The browser applies the same two tests, so the pair stays consistent.
  const LAST_DATE = '2026-11-08';
  const minGuests = parseInt(fields.guestCount, 10);
  const qualified = Number.isFinite(minGuests) && fields.eventDate <= LAST_DATE;

  // Every enquiry goes to the lead sheet, qualified or not, in the shape the
  // connector script expects: its own field names, and a shared secret it
  // checks before writing. Unawaited; failures are logged inside, never thrown.
  logLeadToSheet({
    name: fields.name,
    phone: fields.phone,
    email: fields.email,
    event_date: fields.eventDate,
    guests: fields.guestCount,
    utm_content: fields.attribution.utmContent,
    utm_source: fields.attribution.utmSource,
    counted: qualified
  });

  if (!qualified) {
    return res.json({ ok: true });
  }

  // Same event id goes back to the page, so the browser pixel and this server
  // report are collapsed by Meta into one conversion instead of two.
  const eventId = newEventId();
  await sendMetaEvent({
    eventName: 'Lead',
    eventId,
    req,
    userData: { email, phone: fields.phone, city: '' },
    customData: {
      content_name: 'Diwali 2026',
      value: minGuests * 3500,
      currency: 'INR'
    },
    // Whichever of the two pages posted, so Events Manager shows the real one.
    sourceUrl: siteUrl + req.path
  });

  return res.json({ ok: true, eventId });
});

router.get('/lp/first-birthday/thank-you', (req, res) => render(res, {
  ...pages.lpFirstBirthdayThanks,
  // Empty when someone opens the URL directly rather than via the form; the
  // template falls back to generating its own id in that case.
  eventId: typeof req.query.eid === 'string' ? req.query.eid : ''
}));

router.get('/best-caterers-in-noida-virtuoso-catering-house', (req, res) => render(res, pages.bestCaterersNoida));
router.get('/best-caterers-in-delhi', (req, res) => render(res, pages.bestCaterersDelhi));
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
