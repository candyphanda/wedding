// ====== The only file you need to edit for settings ======
// Everything that might change lives here, so you never have to touch the main code.
window.WEDDING = {
  // Wedding start time. "+07:00" = Vietnam time (so the countdown is right for friends in France too).
  dateTime: "2026-12-19T16:30:00+07:00",

  // Google Apps Script web-app URL (receives the RSVP answers and writes them in the Google Sheet).
  rsvpUrl: "https://script.google.com/macros/s/AKfycbz5Amo2H4LINqOQNQoJE6LSr0rwB8d__hG50TcciGA0fDXZ5Wh_OhYDKiwO9REvsDss/exec",

  // Default YouTube video ID (the part after v= in the link). Each side below can have its own.
  musicVideoId: "XuFDO-2UOrM",

  // Used when the link has no ?side=
  defaultSide: "bride",

  // What changes between the bride's guests and the groom's guests.
  // The side is chosen by the link:  ...?to=Linh&side=bride&guests=friends
  sides: {
    bride: {
      shortNames: "Ngọc & Kiểu",
      coverNames: "NGỌC PHAN & KIỂU NGÔ",
      monogram: "N<span>&amp;</span>K",
      name1: "Ngọc Phan",
      name2: "Kiểu Ngô",
      venueTitle: "TẠI TƯ GIA NHÀ GÁI",
      venueEn: "At the bride's family home",
      address: "Thôn Đoài, Thụy Ninh, Thái Thụy, Thái Bình",
      addressNote: "(xã Tây Thụy Anh, tỉnh Hưng Yên)",
      mapsUrl: "https://maps.app.goo.gl/KwGY2qR7UHLGVD7g7",
      qrImage: "assets/qr/qr-bride.png",
      bankName: "Vietcombank",
      musicVideoId: "XuFDO-2UOrM",     // Marry You - Bruno Mars (Music/Music_bride.txt)
      firstFamily: "bride"            // family shown on the left
    },
    groom: {
      shortNames: "Kiểu & Ngọc",
      coverNames: "KIỂU NGÔ & NGỌC PHAN",
      monogram: "K<span>&amp;</span>N",
      name1: "Kiểu Ngô",
      name2: "Ngọc Phan",
      venueTitle: "TẠI TƯ GIA NHÀ TRAI",
      venueEn: "At the groom's family home",
      address: "Thôn Gang, Thụy Ninh, Thái Thụy, Thái Bình",
      addressNote: "(xã Tây Thụy Anh, tỉnh Hưng Yên)",
      mapsUrl: "https://maps.app.goo.gl/Fr5FGVz3VfRbvfcC6",
      qrImage: "assets/qr/qr-groom.png",
      bankName: "TPBank",
      musicVideoId: "pBTp2RWxq-s",     // I Do - 911 (Music/Music_groom.txt)
      firstFamily: "groom"
    }
  }
};
