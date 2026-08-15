// Inquiry-form validation, used by the Express route in routes/api.js, which
// serves the form in production as well as locally.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s-]{6,}$/;

function validateInquiry(body) {
  const errors = {};
  const name = (body.name || '').trim();
  const email = (body.email || '').trim();
  const phone = (body.phone || '').trim();
  const eventType = (body.eventType || '').trim();
  const guestCount = (body.guestCount || '').trim();

  if (!name || name.length < 2) errors.name = 'Please enter your full name.';
  // Email is only required when we have no phone number. The paid-traffic
  // landers ask for a mobile instead — one reliable contact route is enough,
  // and every extra field measurably costs conversions on cold ad traffic.
  if (!email && !phone) {
    errors.email = 'Please enter an email address or a mobile number.';
  } else if (email && !EMAIL_RE.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!phone || !PHONE_RE.test(phone)) errors.phone = 'Please enter a valid mobile number.';
  if (!eventType) errors.eventType = 'Please select an event type.';
  // guestCount accepts a band ("101-150", "Not finalised yet") from the
  // landers as well as a plain number from the site's inquiry drawer, so it
  // is only rejected when it is a number that makes no sense.
  if (guestCount && !isNaN(Number(guestCount)) && Number(guestCount) < 0) {
    errors.guestCount = 'Guest count must be a positive number.';
  }

  return errors;
}

function extractFields(body) {
  return {
    name: (body.name || '').trim(),
    email: (body.email || '').trim(),
    phone: (body.phone || '').trim(),
    eventDate: (body.eventDate || '').trim(),
    eventType: (body.eventType || '').trim(),
    guestCount: (body.guestCount || '').trim(),
    // Supplied by the paid-traffic landers only. The vision note is the
    // whole basis of the curator call, so it must survive to the inbox.
    eventLocation: (body.eventLocation || '').trim(),
    eventVision: (body.eventVision || '').trim(),
    // Captured on arrival by public/js/attribution.js. Not validated and never
    // required: it is diagnostic, and a missing value must never block a real
    // enquiry. Trimmed to keep a hostile payload out of the inbox.
    attribution: sanitiseAttribution(body.attribution)
  };
}

const ATTRIBUTION_KEYS = [
  'gclid', 'gbraid', 'wbraid', 'msclkid', 'fbclid',
  'utmSource', 'utmMedium', 'utmCampaign', 'utmTerm', 'utmContent',
  'landingPage', 'referrer', 'submittedFrom'
];

function sanitiseAttribution(raw) {
  if (!raw || typeof raw !== 'object') return {};
  const out = {};
  ATTRIBUTION_KEYS.forEach((k) => {
    const v = raw[k];
    if (typeof v === 'string' && v.trim()) out[k] = v.trim().slice(0, 300);
  });
  return out;
}

module.exports = { validateInquiry, extractFields, sanitiseAttribution, EMAIL_RE, PHONE_RE };
