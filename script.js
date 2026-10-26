(function () {
  const music = document.getElementById("bgMusic");
  const button = document.getElementById("musicToggle");
  const text = document.getElementById("musicText");

  function startMusic() {
    if (!music || !music.paused) return;
    music.play().then(() => {
      button.classList.add("playing");
      text.textContent = "Pause";
    }).catch(() => {
      text.textContent = "Unavailable";
    });
  }

  startMusic();
  document.addEventListener("click", function firstInteraction() {
    startMusic();
    document.removeEventListener("click", firstInteraction);
  }, { once: true });

  button.addEventListener("click", function (event) {
    event.stopPropagation();
    if (music.paused) {
      music.play().then(() => {
        button.classList.add("playing");
        text.textContent = "Pause";
      }).catch(() => {
        text.textContent = "Unavailable";
      });
    } else {
      music.pause();
      button.classList.remove("playing");
      text.textContent = "Music";
    }
  });

  let autoScroll = true;
  let resumeTimer;
  let isLooping = false;
  const bottomFade = document.querySelector(".page-fade-bottom");
  const header = document.querySelector(".header");
  let previousScrollY = window.scrollY;

  function updateNavbar() {
    const currentScrollY = window.scrollY;
    if (currentScrollY <= 10 || currentScrollY < previousScrollY) {
      header.classList.remove("nav-hidden");
    } else if (currentScrollY > previousScrollY) {
      header.classList.add("nav-hidden");
    }
    previousScrollY = currentScrollY;
  }

  window.addEventListener("scroll", updateNavbar, { passive: true });

  function pauseAutoScroll() {
    autoScroll = false;
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => autoScroll = true, 1200);
  }

  window.addEventListener("wheel", function (event) {
    pauseAutoScroll();
    if (event.deltaY < 0) header.classList.remove("nav-hidden");
    else if (event.deltaY > 0 && window.scrollY > 10) header.classList.add("nav-hidden");
  }, { passive: true });

  ["touchstart", "keydown", "mousedown"].forEach(type => {
    window.addEventListener(type, pauseAutoScroll, { passive: true });
  });

  setInterval(() => {
    if (!autoScroll) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (window.scrollY >= max - 5) {
      if (isLooping) return;
      isLooping = true;
      setTimeout(() => {
        bottomFade.classList.add("looping");
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "instant" });
          bottomFade.classList.remove("looping");
          isLooping = false;
        }, 700);
      }, 10000);
    } else {
      window.scrollBy({ top: 2, behavior: "auto" });
    }
  }, 40);
})();
