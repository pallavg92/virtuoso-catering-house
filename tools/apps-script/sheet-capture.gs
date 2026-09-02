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
 * Re-deploy as a NEW VERSION after any edit; Apps Script keeps serving the
 * previously deployed code otherwise, which is the usual reason an edit here
 * appears to do nothing.
 */
function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents);
    SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].appendRow([
      d.ts || new Date().toISOString(),
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
