// Netlify serverless function backing the menu-download gate on the static
// build. Mirrors routes/api.js exactly (same validation + mailer logic)
// but in Netlify's function handler shape instead of an Express route.
// The frontend calls /api/menu-download; netlify.toml redirects that to
// this function, so public/js/menu-download-drawer.js needs no changes.
const { sendMenuDownloadRequest } = require('../../utils/mailer');
const { validateMenuDownload, extractFields } = require('../../utils/validateMenuDownload');

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

  const errors = validateMenuDownload(body);
  if (Object.keys(errors).length > 0) {
    return { statusCode: 400, headers: JSON_HEADERS, body: JSON.stringify({ ok: false, errors }) };
  }

  const fields = extractFields(body);

  try {
    const result = await sendMenuDownloadRequest(fields);
    return {
      statusCode: 200,
      headers: JSON_HEADERS,
      body: JSON.stringify({
        ok: true,
        message: 'Thank you — your download will begin shortly.',
        downloadUrl: '/downloads/virtuoso-catering-house-menu.pdf',
        method: result.method
      })
    };
  } catch (err) {
    console.error('Failed to send menu download request email:', err);
    return {
      statusCode: 500,
      headers: JSON_HEADERS,
      body: JSON.stringify({ ok: false, errors: { _general: 'Something went wrong. Please try again or email us directly.' } })
    };
  }
};
