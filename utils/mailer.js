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


// Brandbook palette, sampled from the logo and the design system.
const BRAND = {
  green: '#4F6E51',        // logo field — the header band matches it exactly
  ink: '#101F10',
  body: '#3B4738',
  muted: '#6C8168',
  ochre: '#935A11',
  parchment: '#FAF6EE',
  card: '#FEFCF7',
  hairline: '#E6DFCE'
};

function escapeHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// Email HTML is not web HTML: tables for layout, styles inlined, and only
// web-safe families. Cormorant Garamond and Work Sans cannot be relied on in
// a mail client, so Georgia and Helvetica stand in for them — closest common
// match to the brand's serif/sans pairing.
function acknowledgementHtml({ firstName, summary }) {
  const rows = summary.map(([label, value]) => `
              <tr>
                <td style="padding:6px 0;font:400 12px/1.5 Helvetica,Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:${BRAND.muted};width:38%;vertical-align:top;">${escapeHtml(label)}</td>
                <td style="padding:6px 0;font:400 15px/1.5 Helvetica,Arial,sans-serif;color:${BRAND.body};vertical-align:top;">${escapeHtml(value)}</td>
              </tr>`).join('');

  const detailsBlock = summary.length ? `
        <tr>
          <td style="padding:0 32px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BRAND.card};border:1px solid ${BRAND.hairline};">
              <tr><td style="padding:20px 24px;">
                <p style="margin:0 0 12px;font:400 12px/1.5 Helvetica,Arial,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:${BRAND.ochre};">What you shared</p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows}</table>
              </td></tr>
            </table>
          </td>
        </tr>
        <tr><td style="height:28px;line-height:28px;font-size:0;">&nbsp;</td></tr>` : '';

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>We have your enquiry</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.parchment};">
  <!-- Preview text: what shows beside the subject line in the inbox. -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Someone from our team will call you within one working day.</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BRAND.parchment};">
    <tr>
      <td align="center" style="padding:24px 12px;">

        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%;">

          <!-- Header. bgcolor matches the logo's own field so a blocked
               image still reads as a deliberate green band. -->
          <tr>
            <td align="center" bgcolor="${BRAND.green}" style="background:${BRAND.green};padding:28px 24px;">
              <img src="https://www.virtuosocatering.com/images/virtuoso-catering-house-logo.png"
                   width="240" alt="Virtuoso Catering House"
                   style="display:block;width:240px;max-width:70%;height:auto;border:0;outline:none;text-decoration:none;" />
            </td>
          </tr>

          <tr>
            <td style="background:${BRAND.card};padding:36px 32px 8px;">
              <p style="margin:0 0 6px;font:400 12px/1.5 Helvetica,Arial,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:${BRAND.ochre};">Enquiry received</p>
              <h1 style="margin:0 0 20px;font:400 30px/1.25 Georgia,'Times New Roman',serif;color:${BRAND.ink};">Thank you, ${escapeHtml(firstName)}.</h1>
              <p style="margin:0 0 16px;font:400 16px/1.65 Helvetica,Arial,sans-serif;color:${BRAND.body};">
                Your enquiry has reached our team. Someone will call you within one working day
                to understand what you are planning and talk through how we would approach it.
              </p>
            </td>
          </tr>

          <tr><td style="background:${BRAND.card};height:12px;line-height:12px;font-size:0;">&nbsp;</td></tr>
          ${detailsBlock ? `<tr><td style="background:${BRAND.card};">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${detailsBlock}</table>
          </td></tr>` : ''}

          <tr>
            <td style="background:${BRAND.card};padding:0 32px 32px;">
              <p style="margin:0 0 24px;font:400 15px/1.65 Helvetica,Arial,sans-serif;color:${BRAND.body};">
                If any of that is wrong, or you would rather speak sooner, call or WhatsApp us
                on <a href="tel:+918700915463" style="color:${BRAND.ochre};text-decoration:none;">+91 87009 15463</a>.
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr><td bgcolor="${BRAND.green}" style="background:${BRAND.green};">
                  <a href="https://wa.me/918700915463" style="display:inline-block;padding:13px 26px;font:600 14px/1 Helvetica,Arial,sans-serif;letter-spacing:.06em;color:#FFFFFF;text-decoration:none;">MESSAGE US ON WHATSAPP</a>
                </td></tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background:${BRAND.parchment};padding:22px 32px 8px;border-top:1px solid ${BRAND.hairline};">
              <p style="margin:0 0 4px;font:400 14px/1.6 Helvetica,Arial,sans-serif;color:${BRAND.body};">Virtuoso Catering House</p>
              <p style="margin:0;font:400 13px/1.6 Helvetica,Arial,sans-serif;color:${BRAND.muted};">
                A-15, A-Block, Sector 61, Noida 201301<br />
                <a href="tel:+918700915463" style="color:${BRAND.muted};text-decoration:none;">+91 87009 15463</a> &middot;
                <a href="https://www.virtuosocatering.com" style="color:${BRAND.muted};text-decoration:none;">virtuosocatering.com</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="background:${BRAND.parchment};padding:8px 32px 24px;">
              <p style="margin:0;font:400 11px/1.6 Helvetica,Arial,sans-serif;color:${BRAND.muted};">
                You are receiving this because you submitted an enquiry on virtuosocatering.com.
                <a href="https://www.virtuosocatering.com/privacy-policy" style="color:${BRAND.muted};">Privacy policy</a>.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
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
  const html = acknowledgementHtml({
    firstName,
    summary: [
      fields.eventType ? ['Occasion', fields.eventType] : null,
      fields.eventDate ? ['Date', readableDate(fields.eventDate)] : null,
      fields.guestCount ? ['Guests', fields.guestCount] : null,
      fields.eventLocation ? ['Where', fields.eventLocation] : null
    ].filter(Boolean)
  });

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
