// Appends a captured contact to a Google Sheet via an Apps Script web app.
//
// Posted from the server rather than the browser, deliberately. The handoff
// design called the webhook client-side with mode:'no-cors', which publishes
// the URL to every visitor and lets anyone write rows into the sheet directly.
// Going through our own endpoint keeps the URL private and means a row is only
// written for a submission that already passed validation.
//
// Every failure here is swallowed. The sheet is a convenience copy: the
// authoritative record is the notification email, and a reader who has already
// been given their download must never see an error because a spreadsheet was
// unreachable.
const WEBHOOK = () => process.env.SHEET_WEBHOOK_URL;

// Apps Script answers a POST with a 302 to script.googleusercontent.com, so
// redirects have to be followed or every write looks like a failure.
const TIMEOUT_MS = 4000;

async function logToSheet(row) {
  const url = WEBHOOK();
  if (!url) {
    console.log('[sheet] skipped — SHEET_WEBHOOK_URL not set');
    return { logged: false, reason: 'not configured' };
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      redirect: 'follow',
      // text/plain avoids a CORS preflight and is what Apps Script expects to
      // read from e.postData.contents.
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        ts: new Date().toISOString(),
        name: row.name || '',
        email: row.email || '',
        source: row.source || '',
        page: row.page || '',
        attribution: row.attribution || ''
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS)
    });

    if (!res.ok) {
      console.error(`[sheet] REJECTED http ${res.status}`);
      return { logged: false, reason: `http ${res.status}` };
    }
    console.log(`[sheet] appended ${row.source || 'row'} — ${row.email || 'no email'}`);
    return { logged: true };
  } catch (err) {
    // Includes the timeout. Logged, never thrown.
    console.error('[sheet] FAILED', err.message);
    return { logged: false, reason: err.message };
  }
}

module.exports = { logToSheet };
