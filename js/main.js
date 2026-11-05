// Main behaviour of the invitation. Each block does ONE job.
(function () {
  var cfg = window.WEDDING;

  // 1) Guest name from the link, e.g. ...index.html?to=Linh
  //    We use textContent (not innerHTML) so nobody can inject code through the URL.
  var params = new URLSearchParams(location.search);
  var guest = (params.get("to") || "").trim().slice(0, 60);
  if (guest) {
    document.getElementById("guest-name").textContent = guest;
    document.getElementById("f-name").value = guest;
  }

  // Which family invited this guest: ?side=bride (nhà gái) or ?side=groom (nhà trai).
  var side = (params.get("side") || "").trim().toLowerCase();
  if (side !== "bride" && side !== "groom") side = "";
  // Free label for your guest groups, e.g. ?guests=friends or ?guests=colleagues (saved in the Sheet).
  var group = (params.get("guests") || "").trim().slice(0, 40);

  // ?qr=no hides the wedding-gift QR block and the gift question (default: shown).
  if ((params.get("qr") || "").toLowerCase() === "no") {
    var g = document.querySelector(".gift"); if (g) g.style.display = "none";
    var gs = document.getElementById("f-gift"); if (gs) gs.style.display = "none";
  }

  // Which day(s): ?day=19 | ?day=20 | ?day=both  (default: cfg.defaultDay). Texts come from config.js (our own, safe).
  var day = (params.get("day") || "").trim().toLowerCase();
  if (!cfg.days[day]) day = cfg.defaultDay;
  var dd = cfg.days[day];
  document.title = document.title.replace(/19\.12\.2026/, dd.title.replace(/&amp;/g, "&"));
  document.getElementById("env-date").innerHTML = dd.env;
  document.getElementById("cover-date").innerHTML = dd.cover;
  document.getElementById("sd-date").innerHTML = dd.sd.map(function (x) { return "<span>" + x + "</span>"; }).join("");
  document.getElementById("date-block").innerHTML = dd.dates.map(function (x) {
    return '<div class="datebar"><span>' + x.dow + '</span><span class="d">' + x.d + '</span><span>' + x.t + '</span></div>' +
           '<p class="lunar">' + x.lunar + '</p><p class="en">' + x.en + '</p>';
  }).join("");
  document.getElementById("tl-body").innerHTML = dd.timeline;

  // Show the right names, order, address and directions for that side.
  var content = cfg.sides[side || cfg.defaultSide];
  document.querySelectorAll("[data-bind]").forEach(function (el) {
    var key = el.getAttribute("data-bind");
    if (key === "monogram") el.innerHTML = content[key];   // our own text from config.js, safe
    else if (content[key] !== undefined) el.textContent = content[key];
  });
  document.getElementById("fam-bride").style.order = content.firstFamily === "bride" ? 0 : 1;
  document.getElementById("fam-groom").style.order = content.firstFamily === "groom" ? 0 : 1;

  // QR code and bank name for that side
  document.getElementById("qr-img").src = content.qrImage;
  document.getElementById("qr-dl").href = content.qrImage;
  document.getElementById("bank-name").textContent = content.bankName;

  // 2) Maps button
  document.getElementById("map-btn").href = content.mapsUrl;

  // 3) Music (YouTube player, hidden). Browsers only allow sound after a tap,
  //    so we start it when the guest opens the envelope.
  var player = null, wantMusic = false, musicBtn = document.getElementById("music-btn");

  window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player("yt-holder", {
      width: "200", height: "200", videoId: (content.musicVideoId || cfg.musicVideoId),
      playerVars: { loop: 1, playlist: (content.musicVideoId || cfg.musicVideoId), playsinline: 1, controls: 0 },
      events: {
        onReady: function () { if (wantMusic) startMusic(); },
        onError: function () { musicBtn.hidden = true; }   // video can't be embedded: hide the button
      }
    });
  };
  function loadYouTube() {
    var s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(s);
  }
  function startMusic() {
    if (!player || !player.playVideo) return;
    player.playVideo();
    musicBtn.classList.add("playing"); musicBtn.classList.remove("muted");
  }
  musicBtn.addEventListener("click", function () {
    if (!player || !player.getPlayerState) return;
    if (player.getPlayerState() === 1) {            // 1 = playing
      player.pauseVideo(); musicBtn.classList.remove("playing"); musicBtn.classList.add("muted");
    } else { startMusic(); }
  });

  // 4) Open the envelope
  var envScreen = document.getElementById("envelope-screen");
  document.getElementById("open-btn").addEventListener("click", function () {
    envScreen.classList.add("gone");
    document.body.classList.remove("locked");
    musicBtn.hidden = false;
    wantMusic = true;
    if (player) startMusic();
    window.scrollTo(0, 0);
    setTimeout(function () { envScreen.style.display = "none"; }, 1000);
  });
  loadYouTube();

  // 5) Fade-in when scrolling
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    items.forEach(function (el) { io.observe(el); });
  } else { items.forEach(function (el) { el.classList.add("in"); }); }

  // 6) Countdown
  var target = new Date(dd.target).getTime();
  function pad(n) { return String(n).padStart(2, "0"); }
  function tick() {
    var diff = Math.max(0, target - Date.now());
    var s = Math.floor(diff / 1000);
    document.getElementById("cd-d").textContent = pad(Math.floor(s / 86400));
    document.getElementById("cd-h").textContent = pad(Math.floor(s % 86400 / 3600));
    document.getElementById("cd-m").textContent = pad(Math.floor(s % 3600 / 60));
    document.getElementById("cd-s").textContent = pad(s % 60);
  }
  tick(); setInterval(tick, 1000);

  // 7) RSVP form -> Google Sheet
  var form = document.getElementById("rsvp-form");
  var msg = document.getElementById("f-msg");
  var btn = document.getElementById("f-submit");

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    msg.className = "f-msg"; msg.textContent = "";
    var name = form.name.value.trim(), attending = form.attending.value;
    form.name.classList.toggle("err", !name);
    form.attending.classList.toggle("err", !attending);
    if (!name || !attending) {
      msg.classList.add("bad");
      msg.textContent = "Vui lòng nhập tên và chọn xác nhận tham dự. · Please enter your name and answer.";
      return;
    }
    if (form.website.value) return;                 // hidden field filled = robot, ignore

    var data = new URLSearchParams();
    data.append("name", name);
    data.append("attending", attending);
    data.append("guests", attending === "Có" ? (form.guests.value || "0") : "0");
    data.append("gift", form.gift.value);
    data.append("wish", form.wish.value.trim());
    data.append("link", guest);
    data.append("side", side);
    data.append("group", group);

    function done() {
      btn.disabled = true;
      msg.classList.add("ok");
      msg.textContent = attending === "Có"
        ? "Cảm ơn bạn! Chúng mình rất mong gặp bạn. · Thank you, we can't wait to see you!"
        : "Cảm ơn bạn đã báo cho chúng mình. · Thank you for letting us know.";
    }
    if (!cfg.rsvpUrl) { console.log("TEST MODE (no rsvpUrl):", Object.fromEntries(data)); done(); return; }

    btn.disabled = true;
    // no-cors: Google answers without CORS headers, so we can send but not read the reply.
    fetch(cfg.rsvpUrl, { method: "POST", mode: "no-cors", body: data })
      .then(done)
      .catch(function () {
        btn.disabled = false; msg.classList.add("bad");
        msg.textContent = "Chưa gửi được, vui lòng thử lại. · Could not send, please try again.";
      });
  });
})();
