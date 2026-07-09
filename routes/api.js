const express = require('express');
const router = express.Router();
const { sendInquiry, sendMenuDownloadRequest } = require('../utils/mailer');
const { validateInquiry, extractFields } = require('../utils/validateInquiry');
const { validateMenuDownload, extractFields: extractMenuDownloadFields } = require('../utils/validateMenuDownload');

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

router.post('/menu-download', async (req, res) => {
  const errors = validateMenuDownload(req.body);

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ ok: false, errors });
  }

  const fields = extractMenuDownloadFields(req.body);

  try {
    const result = await sendMenuDownloadRequest(fields);
    return res.json({
      ok: true,
      message: 'Thank you — your download will begin shortly.',
      downloadUrl: '/downloads/virtuoso-catering-house-menu.pdf',
      method: result.method
    });
  } catch (err) {
    console.error('Failed to send menu download request email:', err);
    return res.status(500).json({
      ok: false,
      errors: { _general: 'Something went wrong. Please try again or email us directly.' }
    });
  }
});

module.exports = router;
