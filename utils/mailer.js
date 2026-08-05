const nodemailer = require('nodemailer');

// Lazily builds a transporter if SMTP credentials are present in the
// environment. Without them, sendInquiry() falls back to logging the
// submission to the console so local development never breaks.
function buildTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  });
}

async function sendInquiry(fields) {
  const transporter = buildTransporter();
  const to = process.env.INQUIRY_TO_EMAIL || 'virtuosocatering@gmail.com';
  const from = process.env.INQUIRY_FROM_EMAIL || 'virtuosocatering@gmail.com';

  const subject = `New Inquiry — ${fields.eventType || 'General'} — ${fields.name}`;
  const text = [
    `Name: ${fields.name}`,
    `Email: ${fields.email || '—'}`,
    `Mobile: ${fields.phone || '—'}`,
    `Event Date: ${fields.eventDate || '—'}`,
    `Event Type: ${fields.eventType || '—'}`,
    `Guest Count: ${fields.guestCount || '—'}`,
    `Location: ${fields.eventLocation || '—'}`,
    '',
    'What they are imagining:',
    fields.eventVision || '—'
  ].join('\n');

  if (!transporter) {
    console.log('\n----- INQUIRY (SMTP not configured — logged instead) -----');
    console.log(text);
    console.log('------------------------------------------------------------\n');
    return { delivered: false, method: 'console' };
  }

  await transporter.sendMail({
    from,
    to,
    replyTo: fields.email,
    subject,
    text
  });

  return { delivered: true, method: 'smtp' };
}

async function sendMenuDownloadRequest(fields) {
  const transporter = buildTransporter();
  const to = process.env.INQUIRY_TO_EMAIL || 'virtuosocatering@gmail.com';
  const from = process.env.INQUIRY_FROM_EMAIL || 'virtuosocatering@gmail.com';

  const subject = `Menu Download — ${fields.name}`;
  const text = [
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Mobile: ${fields.phone}`,
    `Event Date: ${fields.eventDate}`,
    `Estimated Pax: ${fields.guestCount}`
  ].join('\n');

  if (!transporter) {
    console.log('\n----- MENU DOWNLOAD REQUEST (SMTP not configured — logged instead) -----');
    console.log(text);
    console.log('---------------------------------------------------------------------------\n');
    return { delivered: false, method: 'console' };
  }

  await transporter.sendMail({ from, to, replyTo: fields.email, subject, text });

  return { delivered: true, method: 'smtp' };
}


const fs = require('fs');
const path = require('path');

// The acknowledgement is a designed email kept as its own HTML file so it can
// be edited without touching this module. Two tokens are filled at send time:
// {{FIRST_NAME}} and {{DETAIL_ROWS}}. Read once at startup rather than per
// send — it never changes while the process is running.
const ACK_TEMPLATE = (() => {
  try {
    return fs.readFileSync(path.join(__dirname, '..', 'emails', 'enquiry-received.html'), 'utf8');
  } catch (err) {
    console.error('Acknowledgement template missing — falling back to plain text only:', err.message);
    return null;
  }
})();

function escapeHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// Builds only the rows we actually have a value for, so an enquiry without a
// date doesn't show an empty "Date" line. The final row drops its bottom
// padding to match the design, whichever row that turns out to be.
function detailRows(pairs) {
  const label = 'padding:11px 0 0 0;border-top:1px solid #e8e0d4;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;mso-line-height-rule:exactly;color:#5f5650;';
  const valueBase = 'border-top:1px solid #e8e0d4;font-family:Georgia,\'Times New Roman\',serif;font-size:16px;line-height:22px;mso-line-height-rule:exactly;color:#101f10;';

  return pairs.map(([name, value], i) => {
    const last = i === pairs.length - 1;
    const valuePad = last ? 'padding:11px 0 0 0;' : 'padding:11px 0 11px 0;';
    return `<tr>
                  <td class="lbl stack compact" width="130" style="width:130px;${label}" valign="top">${escapeHtml(name)}</td>
                  <td class="stack compact" style="${valuePad}${valueBase}" valign="top">${escapeHtml(value)}</td>
                </tr>`;
  }).join('\n                ');
}

// Formats an ISO date (2026-12-05) the way a person would read it. Anything
// unparseable is passed straight through rather than shown as "Invalid Date".
function readableDate(value) {
  if (!value) return '';
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

/**
 * Acknowledgement sent to the person who enquired.
 *
 * Deliberately quiet about what it promises: it repeats the details they
 * gave us so they can spot a mistyped date, and commits only to a call.
 * Nothing here should out-promise what the team can actually do.
 *
 * Returns rather than throws. A failed acknowledgement must never affect
 * the enquiry itself, which has already reached the inbox by this point.
 */
async function sendEnquiryAcknowledgement(fields) {
  // The first-birthday lander makes email optional, so there is often
  // nobody to write to. That is expected, not an error.
  if (!fields.email) return { delivered: false, method: 'no email supplied' };

  const transporter = buildTransporter();
  const from = process.env.INQUIRY_FROM_EMAIL || 'virtuosocatering@gmail.com';
  const firstName = String(fields.name || '').trim().split(/\s+/)[0] || 'there';

  const summary = [
    fields.eventType ? `Occasion: ${fields.eventType}` : null,
    fields.eventDate ? `Date: ${readableDate(fields.eventDate)}` : null,
    fields.guestCount ? `Guests: ${fields.guestCount}` : null,
    fields.eventLocation ? `Where: ${fields.eventLocation}` : null
  ].filter(Boolean);

  const subject = 'We have your enquiry — Virtuoso Catering House';

  const text = [
    `Dear ${firstName},`,
    '',
    'Thank you for getting in touch. Your enquiry has reached our team and',
    'someone will call you within one working day to understand what you are',
    'planning and talk through how we would approach it.',
    '',
    ...(summary.length ? ['Here is what you shared with us:', ...summary.map((l) => `  ${l}`), ''] : []),
    'If any of that is wrong, or you would rather speak sooner, call or',
    'WhatsApp us on +91 87009 15463.',
    '',
    'Warm regards,',
    'Virtuoso Catering House',
    'A-15, A-Block, Sector 61, Noida',
    '+91 87009 15463 · virtuosocatering.com'
  ].join('\n');

  if (!transporter) {
    console.log('\n----- ACKNOWLEDGEMENT (SMTP not configured — logged instead) -----');
    console.log(`To: ${fields.email}\n${text}`);
    console.log('--------------------------------------------------------------------\n');
    return { delivered: false, method: 'console' };
  }

  // Sent as multipart: the HTML for clients that render it, the plain text
  // for those that don't and for anyone reading with images off. Skipping the
  // text part is a well-known way to look like spam.
  const pairs = [
    fields.eventType ? ['Occasion', fields.eventType] : null,
    fields.eventDate ? ['Date', readableDate(fields.eventDate)] : null,
    fields.guestCount ? ['Guests', fields.guestCount] : null,
    fields.eventLocation ? ['Venue / Location', fields.eventLocation] : null
  ].filter(Boolean);

  const html = ACK_TEMPLATE
    ? ACK_TEMPLATE
        .replace('{{FIRST_NAME}}', escapeHtml(firstName))
        .replace('{{DETAIL_ROWS}}', detailRows(pairs))
    : undefined;

  await transporter.sendMail({
    from,
    to: fields.email,
    replyTo: process.env.INQUIRY_TO_EMAIL || 'virtuosocatering@gmail.com',
    subject,
    text,
    html,
    headers: {
      // Stops an out-of-office or another autoresponder bouncing back and
      // forth with this one.
      'Auto-Submitted': 'auto-replied',
      'X-Auto-Response-Suppress': 'All'
    }
  });

  return { delivered: true, method: 'smtp' };
}

module.exports = { sendInquiry, sendMenuDownloadRequest, sendEnquiryAcknowledgement };
