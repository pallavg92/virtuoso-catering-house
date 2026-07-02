const express = require('express');
const router = express.Router();
const { sendInquiry } = require('../utils/mailer');

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

router.post('/inquiry', async (req, res) => {
  const errors = validateInquiry(req.body);

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ ok: false, errors });
  }

  const fields = {
    name: (req.body.name || '').trim(),
    email: (req.body.email || '').trim(),
    phone: (req.body.phone || '').trim(),
    eventDate: (req.body.eventDate || '').trim(),
    eventType: (req.body.eventType || '').trim(),
    guestCount: (req.body.guestCount || '').trim(),
    message: (req.body.message || '').trim()
  };

  try {
    const result = await sendInquiry(fields);
    return res.json({
      ok: true,
      message: 'Your inquiry has been received. Our events team will be in touch within two business days.',
      method: result.method
    });
  } catch (err) {
    console.error('Failed to send inquiry email:', err);
    return res.status(500).json({
      ok: false,
      errors: { _general: 'Something went wrong sending your inquiry. Please try again or email us directly.' }
    });
  }
});

module.exports = router;
