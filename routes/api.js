const express = require('express');
const router = express.Router();
const { sendInquiry } = require('../utils/mailer');
const { validateInquiry, extractFields } = require('../utils/validateInquiry');

router.post('/inquiry', async (req, res) => {
  const errors = validateInquiry(req.body);

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ ok: false, errors });
  }

  const fields = extractFields(req.body);

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
