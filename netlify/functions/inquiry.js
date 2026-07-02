// Netlify serverless function backing the contact form on the static
// build. Mirrors routes/api.js exactly (same validation + mailer logic)
// but in Netlify's function handler shape instead of an Express route.
// The frontend calls /api/inquiry; netlify.toml redirects that to this
// function, so public/js/form-handler.js needs no changes at all.
const { sendInquiry } = require('../../utils/mailer');
const { validateInquiry, extractFields } = require('../../utils/validateInquiry');

const JSON_HEADERS = { 'Content-Type': 'application/json' };

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: JSON_HEADERS, body: JSON.stringify({ ok: false, errors: { _general: 'Method not allowed.' } }) };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch (err) {
    return { statusCode: 400, headers: JSON_HEADERS, body: JSON.stringify({ ok: false, errors: { _general: 'Invalid request body.' } }) };
  }

  const errors = validateInquiry(body);
  if (Object.keys(errors).length > 0) {
    return { statusCode: 400, headers: JSON_HEADERS, body: JSON.stringify({ ok: false, errors }) };
  }

  const fields = extractFields(body);

  try {
    const result = await sendInquiry(fields);
    return {
      statusCode: 200,
      headers: JSON_HEADERS,
      body: JSON.stringify({
        ok: true,
        message: 'Your inquiry has been received. Our events team will be in touch within two business days.',
        method: result.method
      })
    };
  } catch (err) {
    console.error('Failed to send inquiry email:', err);
    return {
      statusCode: 500,
      headers: JSON_HEADERS,
      body: JSON.stringify({ ok: false, errors: { _general: 'Something went wrong sending your inquiry. Please try again or email us directly.' } })
    };
  }
};
