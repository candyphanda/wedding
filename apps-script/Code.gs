// Google Apps Script: receives the RSVP form and adds one row to the Google Sheet.
// Paste this whole file into the Sheet's Apps Script editor (see SETUP.md).

var SHEET_NAME = "RSVP";
var HEADERS = ["Thời gian / Time", "Tên / Name", "Tham dự / Attending", "Số người đi cùng / Extra guests", "Tiền mừng / Gift", "Lời chúc / Wish", "Link cá nhân / Personal link"];

function doPost(e) {
  var lock = LockService.getScriptLock();   // avoids two guests writing the same row at the same time
  lock.waitLock(10000);
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) { sheet.appendRow(HEADERS); sheet.setFrozenRows(1); }

    var p = e.parameter;
    sheet.appendRow([
      new Date(),
      clean(p.name),
      clean(p.attending),
      clean(p.guests),
      clean(p.gift),
      clean(p.wish),
      clean(p.link)
    ]);
    return ContentService.createTextOutput("ok");
  } finally {
    lock.releaseLock();
  }
}

// A cell starting with = + - @ could be run as a formula, so we add an apostrophe in front.
function clean(v) {
  v = String(v || "").slice(0, 600);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

// Opening the web-app link in a browser just shows this line (useful to test the deployment).
function doGet() { return ContentService.createTextOutput("RSVP endpoint is running."); }
