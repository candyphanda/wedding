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

  // 2) Maps button
  document.getElementById("map-btn").href = cfg.mapsUrl;

  // 3) Music (YouTube player, hidden). Browsers only allow sound after a tap,
  //    so we start it when the guest opens the envelope.
  var player = null, wantMusic = false, musicBtn = document.getElementById("music-btn");

  window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player("yt-holder", {
      width: "200", height: "200", videoId: cfg.musicVideoId,
      playerVars: { loop: 1, playlist: cfg.musicVideoId, playsinline: 1, controls: 0 },
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
  var target = new Date(cfg.dateTime).getTime();
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
