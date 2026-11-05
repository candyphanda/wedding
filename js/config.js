// ====== The only file you need to edit for settings ======
// Everything that might change lives here, so you never have to touch the main code.
window.WEDDING = {
  // Wedding start time. "+07:00" = Vietnam time (so the countdown is right for friends in France too).
  dateTime: "2026-12-19T16:30:00+07:00",

  // Google Apps Script web-app URL (receives the RSVP answers and writes them in the Google Sheet).
  rsvpUrl: "https://script.google.com/macros/s/AKfycbz5Amo2H4LINqOQNQoJE6LSr0rwB8d__hG50TcciGA0fDXZ5Wh_OhYDKiwO9REvsDss/exec",


  // Which wedding day(s) the guest is invited to. Chosen by the link:  ...&day=19  |  day=20  |  day=both
  // Without ?day= the invitation is the 19 December one.
  defaultDay: "19",
  days: {
    "19": {
      title: "19.12.2026", cover: "19 . 12 . 2026", env: "19.12.2026", sd: ["19", "12", "26"],
      target: "2026-12-19T16:30:00+07:00",
      dates: [{ dow: "THỨ BẢY", d: "19 . 12 . 2026", t: "16:30",
                lunar: "(Tức ngày 11 tháng 11 năm Bính Ngọ)", en: "Saturday, 19 December 2026 · 4:30 pm" }],
      timeline:
        '<div class="tl-day">19/12/2026 · Thứ Bảy</div><ul class="tl">' +
        '<li class="reveal"><div class="tl-t">Sáng / Chiều<small>Morning / Afternoon</small></div><div class="tl-i">💍</div><div class="tl-e">Lễ Hỏi &amp; Đính Hôn<small>Engagement ceremony (family)</small></div></li>' +
        '<li class="reveal hl"><div class="tl-t">Buổi chiều tối<br>16:30<small>Evening</small></div><div class="tl-i">🥂</div><div class="tl-e">Tiệc Thân Mật Cùng Bạn Bè<small>Intimate party with friends · <b>You are invited</b></small></div></li></ul>' +
        '<div class="tl-day soft">20/12/2026 · Chủ Nhật</div><ul class="tl soft">' +
        '<li class="reveal"><div class="tl-t">Buổi sáng<small>Morning</small></div><div class="tl-i">🏡</div><div class="tl-e">Lễ Vũ Quy (Nhà Gái) &amp; Lễ Thành Hôn (Nhà Trai)<small>Wedding ceremonies</small></div></li></ul>'
    },
    "20": {
      title: "20.12.2026", cover: "20 . 12 . 2026", env: "20.12.2026", sd: ["20", "12", "26"],
      target: "2026-12-20T08:30:00+07:00",
      dates: [{ dow: "CHỦ NHẬT", d: "20 . 12 . 2026", t: "08:30",
                lunar: "(Tức ngày 12 tháng 11 năm Bính Ngọ)", en: "Sunday, 20 December 2026 · 8:30 am" }],
      timeline:
        '<div class="tl-day">20/12/2026 · Chủ Nhật</div><ul class="tl">' +
        '<li class="reveal hl"><div class="tl-t">Buổi sáng · 08:30<small>Morning</small></div><div class="tl-i">🥂</div><div class="tl-e">Tiệc Cưới<small>Wedding banquet</small></div></li>' +
        '<li class="reveal"><div class="tl-t">11:00<small>Late morning</small></div><div class="tl-i">🏡</div><div class="tl-e">Lễ Vũ Quy (Nhà Gái) &amp; Lễ Thành Hôn (Nhà Trai)<small>Wedding ceremonies</small></div></li></ul>'
    },
    "both": {
      title: "19 &amp; 20.12.2026", cover: "19 &amp; 20 . 12 . 2026", env: "19 &amp; 20.12.2026", sd: ["20", "12", "26"],
      target: "2026-12-19T16:30:00+07:00",
      dates: [{ dow: "THỨ BẢY", d: "19 . 12 . 2026", t: "16:30",
                lunar: "", en: "Saturday, 19 December 2026 · 4:30 pm" },
              { dow: "CHỦ NHẬT", d: "20 . 12 . 2026", t: "08:30",
                lunar: "", en: "Sunday, 20 December 2026 · 8:30 am" }],
      timeline:
        '<div class="tl-day">19/12/2026 · Thứ Bảy</div><ul class="tl">' +
        '<li class="reveal"><div class="tl-t">Chiều · 13:00<small>Afternoon</small></div><div class="tl-i">💍</div><div class="tl-e">Lễ Hỏi &amp; Đính Hôn<small>Engagement ceremony (family)</small></div></li>' +
        '<li class="reveal hl"><div class="tl-t">Buổi chiều tối<br>16:30<small>Evening</small></div><div class="tl-i">🥂</div><div class="tl-e">Tiệc Thân Mật Cùng Bạn Bè<small>Intimate party with friends</small></div></li></ul>' +
        '<div class="tl-day">20/12/2026 · Chủ Nhật</div><ul class="tl">' +
        '<li class="reveal hl"><div class="tl-t">Buổi sáng · 08:30<small>Morning</small></div><div class="tl-i">🥂</div><div class="tl-e">Tiệc Cưới<small>Wedding banquet</small></div></li>' +
        '<li class="reveal"><div class="tl-t">11:00<small>Late morning</small></div><div class="tl-i">🏡</div><div class="tl-e">Lễ Vũ Quy (Nhà Gái) &amp; Lễ Thành Hôn (Nhà Trai)<small>Wedding ceremonies</small></div></li></ul>'
    }
  },

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
