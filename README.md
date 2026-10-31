# Wedding Invitation Website — Kiểu Ngô & Ngọc Phan

An online, mobile-first wedding invitation sent to ~100+ friends as a link.
Guests open a "sealed envelope", read our love story, see the date and venue, confirm attendance (RSVP), and can send a gift through the bank QR code.

> Status: **Planning / draft idea.** No site code yet. This README is the project brief.

---

## 1. Decision: how do we build and share it?

| Option | Verdict |
|---|---|
| Design directly in Claude (artifact/chat) | Good for prototyping only. It cannot give 100 friends a permanent link with RSVP storage. |
| **Static website on GitHub Pages** | **Chosen.** Free, permanent link, fits the Git repo we already have, easy to update. |
| Wedding-card platform (e.g. the template site) | Paid/limited customisation, less control over our story and photos. |

**Plan:** Claude writes the code → we preview locally → push to GitHub → publish with GitHub Pages → share one link (personalised per guest, see §5).

GitHub Pages has no backend, so the RSVP form sends answers to a **Google Sheet** through a Google Apps Script (free). Candy reads all answers in one spreadsheet.

---

## 2. Event details (from `Photo/2. Wedding location.png`)

| | |
|---|---|
| Couple | Kiểu Ngô & Ngọc Phan |
| Date | Saturday, **19.12.2026**, 16:30 (11th day of 11th month, Bính Ngọ) |
| Venue | At the family homes of the groom and bride, Thụy Ninh, Thái Thụy, Thái Bình (now Tây Thụy Anh commune, Hưng Yên province) |
| Groom's family | Ngô Hữu Cương & Lê Thị Lụa |
| Bride's family | Phan Văn Đoàn & Trần Thị Nguyệt |

> The `Template/` screenshots show another couple's invitation (03.10.2026). They are **style references only**; none of their text or photos is reused.

---

## 3. Page structure (one long scrolling page, modelled on `Template/`)

| # | Section | Template reference | Content |
|---|---|---|---|
| 0 | Welcome / envelope | `0. Wellcome.png` | Sealed envelope, "Tap to open". The tap also starts the music. |
| 1 | Cover | `1. Pics_ Couple + Wedding date.png` | Couple photo, "The Wedding of", names, date |
| 2 | Invitation card | `2. Wedding location.png` | Date, time, lunar date, venue, both families, "Get directions" button (Google Maps) |
| 3 | Save the date | `3. Save the date _ Lovely quote.png` | Full-screen photo, 19 · 12 · 26, short quote |
| 4 | Our love story | `4. Love story start.png` | 5 periods, each with photo + short text (§4) |
| 5 | Timeline | `5. Timeline + Dresscode.png` | Two days, see §3b. Dress code removed. |
| 6 | Album + countdown | `6. Album + Countdown time.png` | 3–4 photos, live countdown to 19.12.2026 |
| 7 | RSVP + gift | `7. Confirm to come...png` | Form (name, wish, attending yes/no, guests) + bank QR |
| 8 | Thank you | `7. ...png` (bottom) | Closing photo and "Thank you!" |

Floating music button (play/pause) on every section.

### 3b. Timeline (confirmed by Candy)

| Day | Event |
|---|---|
| 19/12/2026 | Morning/Afternoon: Lễ Hỏi & Đính Hôn |
| 19/12/2026 | Evening: Tiệc Thân Mật Cùng Bạn Bè (Intimate dinner with friends) |
| 20/12/2026 | Lễ Vũ Quy (bride's family) & Lễ Thành Hôn (groom's family) |

Exact times are not set yet (see open questions).

### 3c. Language

Vietnamese is the main language. English appears as a smaller second line under key texts (names, date, venue, RSVP form), or via a small VI / EN switch at the top. Decision to confirm: second line vs switch (recommended: second line, so nobody has to find a button).

### 3d. RSVP form fields (confirmed from Candy's screenshot)

1. Name (pre-filled from `?to=`)
2. Wish for the couple (text area)
3. Attendance dropdown: Xác nhận tham dự / Rất tiếc không tham dự (Confirm / Sorry, can't come)
4. "Do you bring anyone?" dropdown: 0, 1, 2, 3+ people
5. Button **XÁC NHẬN**

Answers are saved to a Google Sheet (confirmed).

---

## 4. Love story (Vietnamese, from `Photo/Love story/My love story.txt`)

| Year | Text | Photo to use |
|---|---|---|
| 2006 | Ánh nhìn đầu tiên ngày chung trường Cấp 2 | **Missing**: need a school-era photo (or an illustration) |
| 2021 | Phút gặp lại nơi xứ sở Bò Tót & Nhịp đập yêu thương | `Meeting at Spain.PNG` |
| 2022 – 2024 | Cùng nắm tay đi qua những phương trời Âu | `Travel in Italy`, `Travel at Rome, Italy`, `Travel in Nice, France`, `Travel in Switzerland` (small carousel) |
| 2025 | Lời hứa trăm năm & Đặt bút thành đôi tại Pháp | `Marriage proposal.PNG`, `Marriage at France.PNG` |
| 2026 | Ngày chung đôi – Trọn vẹn yêu thương tại Việt Nam | A wedding photo from `Photo/` |

Each period needs a short story (2–3 lines). Candy to write or approve; Claude can draft from the one-liners above.

---

## 5. Guest experience

- **One link for everyone**, personalised with the guest's name: `https://<username>.github.io/<repo>/?to=Linh`
  The envelope then reads "Trân trọng kính mời: Linh" and the RSVP form is pre-filled.
- **RSVP:** guest picks Yes / No and how many people come → saved to a Google Sheet.
- **Gift:** bank QR from `Bank_QRcode/VCB_QRcode.jpg`, with a "save image" button and the account name shown as text.
- **Music:** *Marry You* (Bruno Mars, saxophone cover by Nuno Cipriano) from `Music/Music.txt`. Phones block auto-play, so it starts when the guest taps "open the envelope".
- Works on phone first (most guests open it from Messenger/Zalo/WhatsApp).

---

## 6. Technical plan

- Plain **HTML + CSS + JavaScript**, no framework, so Candy can read every line and Claude explains each part.
- Photos are 9–14 MB each in the source folder. They must be **resized and converted to WebP (~200–400 KB)** before going on the site, otherwise the page will not load on a phone.
- YouTube embed for music (avoids hosting a copyrighted MP3 file).
- Planned folder layout (created only after the plan is approved):

```
index.html
css/style.css
js/main.js            # envelope, music, countdown, RSVP, ?to= name
assets/photos/        # optimised copies only
assets/qr/
README.md
CLAUDE.md
```

Source folders `Photo/`, `Template/`, `Music/`, `Bank_QRcode/` stay as the originals and are **not published** (see privacy).

---

## 7. Privacy and safety

- GitHub Pages on a free account needs a **public repository**. Anything in it is public, including the bank QR code. Only the QR (needed by guests) and optimised photos are published; the original 10 MB photos and `Template/` screenshots are kept out via `.gitignore`.
- Show the account holder's name next to the QR so guests can verify it.
- Optional: a simple "no-index" tag so search engines do not list the page.
- If a private repo is preferred, Cloudflare Pages or Netlify can host it from a private repo.

---

## 8. Roadmap

1. Approve this plan and answer the open questions below.
2. Optimise photos into `assets/`.
3. Build the page section by section, previewing after each one.
4. Connect the RSVP form to Google Sheets and test it.
5. Publish on GitHub Pages; test on iPhone and Android.
6. Send to 5 friends as a pilot, fix feedback.
7. Send to everyone with personalised links (a Google Sheet of names → links can be generated automatically).

## 9. Decisions made

- Bride: **Ngọc Phan**. Groom: **Kiểu Ngô**.
- Saturday **19.12.2026** at 16:30, at the family homes in Thái Bình.
- Language: Vietnamese (main) + English.
- Cover photo: `Photo/1.Couple.jpg`.
- Public GitHub repository is acceptable.
- RSVP answers go to a Google Sheet.
- Timeline: see §3b. Dress code: not included.

## 10. Still open

1. Times for each event on 19/12 and 20/12, and the address of each (groom's home vs bride's home). The invitation says 16:30 on 19/12, but the timeline says the friends' party is in the evening. Which time do friends arrive?
2. Photos for Save the Date, Album (3–4) and the 2006 and 2026 love story slots.
3. Google account to own the Sheet, GitHub username and repo name.
4. Bank name and account-holder name to display next to the QR code.
5. Wishes: private to the couple (recommended) or shown to all guests?
6. Should the page be for all guests, or should the 19/12 friends' dinner and the 20/12 ceremonies be shown only to guests who are invited to them?
