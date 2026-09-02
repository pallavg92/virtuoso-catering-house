/**
 * Google Apps Script web app that appends a captured contact to the sheet.
 *
 * Paste into Extensions > Apps Script on the target Sheet, then:
 *   Deploy > New deployment > Web app
 *   Execute as:      Me
 *   Who has access:  Anyone
 * Copy the /exec URL into SHEET_WEBHOOK_URL on the server.
 *
 * Sheet headers, row 1, in this order:
 *   timestamp | name | email | source | page | attribution
 *
 * Set the spreadsheet's timezone to (GMT+05:30) Calcutta under
 * File > Settings > Time zone. The server sends UTC, which is correct in
 * transit; the sheet is where it becomes readable in local time.
 *
 * Re-deploy as a NEW VERSION after any edit; Apps Script keeps serving the
 * previously deployed code otherwise, which is the usual reason an edit here
 * appears to do nothing.
 */
function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents);
    SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].appendRow([
      // A real Date object, not the ISO string. Sheets then stores an actual
      // datetime, which sorts and filters correctly and renders in whatever
      // timezone the spreadsheet is set to (File > Settings > Time zone).
      // Writing the raw string instead gives you text that looks like a date
      // and behaves like a label.
      d.ts ? new Date(d.ts) : new Date(),
      d.name || '',
      d.email || '',
      d.source || '',
      d.page || '',
      d.attribution || ''
    ]);
    return ContentService.createTextOutput('ok');
  } catch (err) {
    // Returning 200 with a body keeps a malformed post from retrying forever.
    return ContentService.createTextOutput('error: ' + err.message);
  }
}
