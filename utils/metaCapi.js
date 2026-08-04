// Meta Conversions API — sends conversion events to Meta from the server,
// alongside the browser pixel.
//
// DEDUPLICATION is the whole reason this file is careful. The same lead is
// reported twice: once by fbq() in the visitor's browser and once from here.
// Meta collapses the pair into a single conversion only when BOTH carry the
// same event_name and the same event_id. Break that and every conversion is
// counted twice, which quietly doubles your reported results and ruins the
// cost-per-lead figure you'd be optimising against.
//
// Two hard rules:
//   1. Never throw. A Meta outage must not stop an enquiry reaching the inbox.
//   2. No-op without a token, so local dev and any un-configured environment
//      simply send nothing rather than erroring.
const crypto = require('crypto');

const GRAPH_VERSION = 'v21.0';
const TIMEOUT_MS = 2000;

// Meta requires user data to be SHA-256 hashed, over a normalised value.
// Normalisation has to match what the browser pixel does or the hashes
// differ and the event never matches a person.
function hash(value) {
  if (!value) return undefined;
  const normalised = String(value).trim().toLowerCase();
  if (!normalised) return undefined;
  return crypto.createHash('sha256').update(normalised).digest('hex');
}

// Phone numbers must be digits only, including country code. Visitors type
// "98765 43210", "+91 98765-43210" or "098765 43210"; all three are the same
// person and must produce the same hash.
function hashPhone(value) {
  if (!value) return undefined;
  let digits = String(value).replace(/\D/g, '');
  if (!digits) return undefined;
  digits = digits.replace(/^0+/, '');
  // Bare 10-digit Indian mobile — prepend the country code Meta expects.
  if (digits.length === 10) digits = '91' + digits;
  return crypto.createHash('sha256').update(digits).digest('hex');
}

// The _fbp cookie and the fbclid click ID materially improve match rates.
// fbc has a required shape: fb.1.<timestamp>.<fbclid>
function readIdentifiers(req) {
  const cookieHeader = req.headers.cookie || '';
  const cookies = Object.fromEntries(
    cookieHeader.split(';').map((c) => {
      const i = c.indexOf('=');
      return i === -1 ? [c.trim(), ''] : [c.slice(0, i).trim(), decodeURIComponent(c.slice(i + 1))];
    }).filter(([k]) => k)
  );

  let fbc = cookies._fbc;
  const fbclid = req.query && req.query.fbclid;
  if (!fbc && fbclid) fbc = `fb.1.${Date.now()}.${fbclid}`;

  return { fbp: cookies._fbp, fbc };
}

function clientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) return String(forwarded).split(',')[0].trim();
  return req.ip || req.socket?.remoteAddress;
}

/**
 * Send one conversion event to Meta.
 *
 * @param {object}  opts
 * @param {string}  opts.eventName  Standard event, e.g. 'Lead'
 * @param {string}  opts.eventId    MUST match the browser event_id for dedup
 * @param {object}  opts.req        Express request, for IP/UA/cookies
 * @param {object} [opts.userData]  { email, phone, city }
 * @param {object} [opts.customData]
 * @param {string} [opts.sourceUrl]
 * @returns {Promise<{sent: boolean, reason?: string}>} Never rejects.
 */
async function sendEvent({ eventName, eventId, req, userData = {}, customData = {}, sourceUrl }) {
  const pixelId = process.env.META_PIXEL_ID;
  const token = process.env.META_CAPI_TOKEN;

  if (!pixelId || !token) return { sent: false, reason: 'not configured' };

  const { fbp, fbc } = readIdentifiers(req);

  const user_data = {
    em: hash(userData.email),
    ph: hashPhone(userData.phone),
    ct: hash(userData.city),
    country: hash('in'),
    client_ip_address: clientIp(req),
    client_user_agent: req.headers['user-agent'],
    fbp,
    fbc
  };
  Object.keys(user_data).forEach((k) => user_data[k] === undefined && delete user_data[k]);

  const payload = {
    data: [{
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      action_source: 'website',
      event_source_url: sourceUrl,
      user_data,
      custom_data: customData
    }]
  };
  if (process.env.META_CAPI_TEST_CODE) payload.test_event_code = process.env.META_CAPI_TEST_CODE;

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(token)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(TIMEOUT_MS)
      }
    );
    const body = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.error('Meta CAPI rejected event:', res.status, JSON.stringify(body));
      return { sent: false, reason: `http ${res.status}` };
    }
    return { sent: true, received: body.events_received };
  } catch (err) {
    // Timeout, DNS failure, Meta outage — all non-fatal by design.
    console.error('Meta CAPI request failed:', err.message);
    return { sent: false, reason: err.message };
  }
}

// One id per conversion, shared with the browser pixel so Meta can dedupe.
function newEventId() {
  return crypto.randomUUID();
}

module.exports = { sendEvent, newEventId, hash, hashPhone };
