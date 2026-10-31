# Connect the RSVP form to Google Sheets (5 minutes)

Why this step? The website lives on GitHub Pages, which only shows pages. It cannot store answers.
So the form sends each answer to a small Google script, and the script writes a new row in your Sheet.

1. Open your Sheet (signed in as **candy.phan.da@gmail.com**):
   https://docs.google.com/spreadsheets/d/12i_hj-9Kpfk5uy0c8mWU2QxKPWTuuGaAPpqijpDXIPo/edit
   Make sure **Share → General access = Restricted** (only you). The form still works: the script runs as you.
2. In the Sheet: **Extensions → Apps Script**.
3. Delete the sample code, paste the whole content of `Code.gs`, click **Save**.
4. Click **Deploy → New deployment**. Click the gear icon, choose **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy**, accept the permission screen (Advanced → Go to project), and copy the **Web app URL** (it ends with `/exec`).
6. Open `js/config.js` and paste the URL between the quotes of `rsvpUrl`.
7. Test: open the site, fill the form, press XÁC NHẬN. A new row appears in the tab **RSVP**.

If you change `Code.gs` later: **Deploy → Manage deployments → Edit → New version**. The URL stays the same.

Privacy: guests' wishes are only in your Sheet. The website never displays them.
