const header = document.querySelector(".header");
    let previousScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 10 || currentScrollY < previousScrollY) {
        header.classList.remove("nav-hidden");
      } else {
        header.classList.add("nav-hidden");
      }
      previousScrollY = currentScrollY;
    }, { passive: true });