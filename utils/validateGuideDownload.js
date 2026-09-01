// Validation for the Journal guide download.
//
// Deliberately only name and email. The menu download asks for five fields
// because someone requesting a full catering menu is already close to an
// enquiry; a reader who arrived from an Instagram reel about cheese is not,
// and every extra field on cold social traffic costs completions. This is a
// list-building capture, not a lead-qualification form.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Whitelist. The client sends a key, never a path, so no request can ever name
// an arbitrary file on the server to be handed back as a download.
const ASSETS = {
  'cheese-board-guide': {
    url: '/downloads/virtuoso-catering-house-cheese-board-guide.pdf',
    label: 'Cheese Board Guide'
  }
};

function validateGuideDownload(body) {
  const errors = {};
  const name = (body.name || '').trim();
  const email = (body.email || '').trim();
  const asset = (body.asset || '').trim();

  if (!name || name.length < 2) errors.name = 'A name is required.';
  if (!email) errors.email = 'An email address is required.';
  else if (!EMAIL_RE.test(email)) errors.email = 'That address does not read as an email.';
  if (!ASSETS[asset]) errors._general = 'That download is not available.';

  return errors;
}

function extractFields(body) {
  return {
    name: (body.name || '').trim(),
    email: (body.email || '').trim(),
    asset: (body.asset || '').trim(),
    page: (body.page || '').trim(),
    attribution: (body.attribution || '').trim()
  };
}

module.exports = { validateGuideDownload, extractFields, ASSETS, EMAIL_RE };
