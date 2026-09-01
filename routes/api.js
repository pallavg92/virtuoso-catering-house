const express = require('express');
const router = express.Router();
const { sendInquiry, sendMenuDownloadRequest, sendEnquiryAcknowledgement } = require('../utils/mailer');
const { validateInquiry, extractFields } = require('../utils/validateInquiry');
const { validateMenuDownload, extractFields: extractMenuDownloadFields } = require('../utils/validateMenuDownload');
const { validateGuideDownload, extractFields: extractGuideFields, ASSETS } = require('../utils/validateGuideDownload');

router.post('/inquiry', async (req, res) => {
  const errors = validateInquiry(req.body);

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ ok: false, errors });
  }

  const fields = extractFields(req.body);

  try {
    const result = await sendInquiry(fields);

    // Acknowledgement to the enquirer. Separate try/catch on purpose: the
    // enquiry has already reached the inbox, so a failure here is a missing
    // courtesy email, not a lost lead, and must not surface as an error.
    try {
      await sendEnquiryAcknowledgement(fields);
    } catch (ackErr) {
      console.error('Failed to send enquiry acknowledgement:', ackErr.message);
    }
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

    // Acknowledgement to the enquirer. Separate try/catch on purpose: the
    // enquiry has already reached the inbox, so a failure here is a missing
    // courtesy email, not a lost lead, and must not surface as an error.
    try {
      await sendEnquiryAcknowledgement(fields);
    } catch (ackErr) {
      console.error('Failed to send enquiry acknowledgement:', ackErr.message);
    }
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


// Journal guide download. Name and email only, in exchange for a PDF. The
// asset is looked up from a server-side whitelist by key, so the response can
// only ever be a file we chose to publish.
router.post('/guide-download', async (req, res) => {
  const errors = validateGuideDownload(req.body);

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ ok: false, errors });
  }

  const fields = extractGuideFields(req.body);
  const asset = ASSETS[fields.asset];

  // The capture is the point, so the download is never held hostage to email
  // delivery. If notifying the team fails, it is logged and the reader still
  // gets their guide.
  try {
    await sendInquiry({
      name: fields.name,
      email: fields.email,
      phone: '',
      eventType: 'Guide download',
      eventDate: '',
      guestCount: '',
      eventLocation: '',
      eventVision: `Downloaded "${asset.label}" from ${fields.page || 'the Journal'}. ${fields.attribution || ''}`.trim()
    });
  } catch (err) {
    console.error('Guide download: failed to notify the team', err.message);
  }

  return res.json({ ok: true, downloadUrl: asset.url });
});

module.exports = router;
