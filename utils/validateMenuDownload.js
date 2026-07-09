// Shared menu-download-gate validation, used by both the Express dev route
// (routes/api.js) and the Netlify serverless function (netlify/functions/menu-download.js).
const { EMAIL_RE, PHONE_RE } = require('./validateInquiry');

function validateMenuDownload(body) {
  const errors = {};
  const name = (body.name || '').trim();
  const eventDate = (body.eventDate || '').trim();
  const guestCount = (body.guestCount || '').trim();
  const email = (body.email || '').trim();
  const phone = (body.phone || '').trim();

  if (!name || name.length < 2) errors.name = 'Please enter your full name.';
  if (!eventDate) errors.eventDate = 'Please share the day of your event.';
  if (!guestCount || isNaN(Number(guestCount)) || Number(guestCount) < 1) {
    errors.guestCount = 'Please enter an estimated guest count.';
  }
  if (!email || !EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.';
  if (!phone || !PHONE_RE.test(phone)) errors.phone = 'Please enter a valid mobile number.';

  return errors;
}

function extractFields(body) {
  return {
    name: (body.name || '').trim(),
    eventDate: (body.eventDate || '').trim(),
    guestCount: (body.guestCount || '').trim(),
    email: (body.email || '').trim(),
    phone: (body.phone || '').trim()
  };
}

module.exports = { validateMenuDownload, extractFields };
