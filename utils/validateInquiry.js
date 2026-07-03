// Shared inquiry-form validation, used by both the Express dev route
// (routes/api.js) and the Netlify serverless function (netlify/functions/inquiry.js).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateInquiry(body) {
  const errors = {};
  const name = (body.name || '').trim();
  const email = (body.email || '').trim();
  const eventType = (body.eventType || '').trim();
  const message = (body.message || '').trim();
  const guestCount = (body.guestCount || '').trim();

  if (!name || name.length < 2) errors.name = 'Please enter your full name.';
  if (!email || !EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.';
  if (!eventType) errors.eventType = 'Please select an event type.';
  if (!message || message.length < 10) errors.message = 'Tell us a little more about your event (10+ characters).';
  if (guestCount && (isNaN(Number(guestCount)) || Number(guestCount) < 0)) {
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
    message: (body.message || '').trim()
  };
}

module.exports = { validateInquiry, extractFields };
