# CLAUDE.md — Wedding Invitation Website

Instructions for Claude when working in this folder. Read `README.md` first for the full plan.

## Project
Mobile-first wedding invitation website for **Kiểu Ngô & Ngọc Phan**, wedding **19.12.2026**, shared as a link with ~100+ friends. Hosted on GitHub Pages. Style reference: screenshots in `Template/` (another couple's invitation; inspiration only, never copy their text, names or photos).

## About the user
Candy PHAN works in data migration and onboarding. She reads Python and basic scripts but is not a web developer.
- **Explain every piece of code in plain language**, with a simple example, so she can learn and explain it to others.
- Give a clear recommendation and the reason, not a list of "it depends".
- Be specific to this project; no generic advice.
- She writes English and sometimes French. Invitation copy is **Vietnamese** unless told otherwise.

## Working agreement
- **Ask before creating or deleting any file.** Propose the change first. `README.md` and `CLAUDE.md` are the only files added so far.
- Build **one section at a time** and let Candy review before moving on.
- Never overwrite or modify originals in `Photo/`, `Template/`, `Music/`, `Bank_QRcode/`. Work on optimised copies in `assets/`.
- Do not commit, push or publish unless Candy asks. When she does, commit in small steps with clear messages.
- Never invent personal facts (dates, places, family names, story details). If something is missing, list it as a question.

## Folder map
- `Photo/` originals: couple, wedding photos, `Wedding location.png` (the invitation text), `Love story/` (photos + `My love story.txt`)
- `Template/` style screenshots (0–7), not for publishing
- `Music/Music.txt` YouTube link for *Marry You*
- `Bank_QRcode/VCB_QRcode.jpg` gift QR code
- Planned: `index.html`, `css/`, `js/`, `assets/` (optimised files only)

## Technical rules
- Plain HTML, CSS, JavaScript. No build step, no framework, no npm unless Candy agrees.
- Mobile first (design at ~390 px wide, vertical scroll); check on desktop too.
- Fonts: elegant serif/script pair, Vietnamese diacritics must render correctly (use Google Fonts with Vietnamese subset, e.g. Cormorant Garamond, Playfair Display, Great Vibes). Test with "Kiểu Ngô", "Ngọc Phan".
- Palette taken from the template: cream background, brown, gold, black and white accents.
- Images: resize to max ~1600 px wide, export WebP, target under 400 KB each; use `loading="lazy"`.
- Music: YouTube IFrame player started by the user's tap on the envelope (browsers block autoplay). Provide a visible play/pause button.
- Personalisation: read `?to=GuestName` from the URL and show it safely (escape HTML, never inject raw text).
- RSVP: send to a Google Apps Script web endpoint that appends to a Google Sheet. Fields: name, attending (yes/no), number of guests, wish, timestamp. Keep the endpoint URL in one config constant.
- Countdown to **2026-12-19 16:30 (Europe/Hanoi, UTC+7)**.
- Accessibility: alt text on photos, readable contrast, tap targets at least 44 px.

## Privacy and safety
- The published repo will be public. Publish only: optimised photos, the QR image, site code.
- Keep original large photos and `Template/` out of Git via `.gitignore`.
- Display the QR account-holder name as text next to the QR.
- Add `<meta name="robots" content="noindex">` so the page is not indexed by search engines.
- Do not put phone numbers, addresses beyond what is on the invitation, or any ID numbers on the site.

## Key facts (source of truth: `Photo/2. Wedding location.png`)
- Saturday 19.12.2026 at 16:30 (11/11 lunar year Bính Ngọ)
- At the family homes of the groom and bride, Thụy Ninh, Thái Thụy, Thái Bình (now Tây Thụy Anh commune, Hưng Yên)
- Love story periods: 2006, 2021, 2022–2024, 2025, 2026 (texts in `Photo/Love story/My love story.txt`)

## Confirmed decisions
- Bride Ngọc Phan, groom Kiểu Ngô. Language: Vietnamese main, English as a smaller second line.
- Cover photo: `Photo/1.Couple.jpg`. Public GitHub repo is OK. RSVP saved to Google Sheet.
- Timeline: 19/12 morning/afternoon Lễ Hỏi & Đính Hôn; 19/12 evening Tiệc Thân Mật Cùng Bạn Bè; 20/12 Lễ Vũ Quy (bride's family) & Lễ Thành Hôn (groom's family). No dress code section.
- RSVP form fields: name, wish, attendance dropdown, "bring anyone" dropdown, XÁC NHẬN button.

## Current status
Planning. Open items are in `README.md` §10 (event times and addresses, album photos, GitHub/Google accounts, bank account-holder name). Next step once Candy approves: optimise photos, then build section 0 (envelope).
