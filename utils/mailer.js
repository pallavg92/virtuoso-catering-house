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
    `Email: ${fields.email}`,
    `Mobile: ${fields.phone || '—'}`,
    `Event Date: ${fields.eventDate || '—'}`,
    `Event Type: ${fields.eventType || '—'}`,
    `Guest Count: ${fields.guestCount || '—'}`
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

module.exports = { sendInquiry, sendMenuDownloadRequest };
