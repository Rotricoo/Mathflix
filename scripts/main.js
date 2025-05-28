// ==========================
// === PAGE EFFECTS ===
// ==========================

// --- Page Fade-in Animation on Load ---
window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("page-loaded");
});

// ==========================
// === SPOILER BUTTON EFFECT ===
// ==========================

const spoilerBtn = document.getElementById("spoiler-btn");
let spoilerFixed = false;
let step = 0;
if (spoilerBtn) {
  function fixSpoilerBtn() {
    if (!spoilerFixed) {
      spoilerBtn.classList.add("spoiler-fixed");
      spoilerFixed = true;
      spoilerBtn.removeEventListener("mouseenter", fixSpoilerBtn);
      document
        .querySelector(".hero-content")
        .removeEventListener("mouseenter", fixSpoilerBtn);
      document
        .querySelector(".hero__see-details-btn")
        .removeEventListener("mouseenter", fixSpoilerBtn);
    }
  }
  spoilerBtn.addEventListener("mouseenter", fixSpoilerBtn);
  document
    .querySelector(".hero-content")
    .addEventListener("mouseenter", fixSpoilerBtn);
  document
    .querySelector(".hero__see-details-btn")
    .addEventListener("mouseenter", fixSpoilerBtn);

  spoilerBtn.addEventListener("click", () => {
    if (step === 0) {
      spoilerBtn.classList.add("active");
      spoilerBtn.innerText = "Are you sure?";
      step = 1;
    } else if (step === 1) {
      step = 2;
      let count = 3;
      const countdown = setInterval(() => {
        spoilerBtn.innerText = count;
        spoilerBtn.style.transform = `translateX(${(4 - count) * 50}px)`;
        count--;
        if (count < 0) {
          clearInterval(countdown);
          spoilerBtn.innerText = "";
          spoilerBtn.classList.add("exit");
        }
      }, 600);
    }
  });
}

// ==========================
// === SPLIDE CAROUSELS ===
// ==========================

// --- Top 10 Carousel with Auto Scroll ---
new Splide(".splide-top10", {
  type: "loop",
  drag: "free",
  focus: "center",
  perPage: 4,
  gap: "1rem",
  autoScroll: {
    speed: 0.5,
    pauseOnHover: true,
    pauseOnFocus: false,
  },
  pagination: false,
  breakpoints: {
    900: { perPage: 1.5, gap: "1rem" },
    1400: { perPage: 2.5, gap: "1.5rem" },
  },
}).mount(window.splide.Extensions);

// --- Simple Carousels (two, three, etc) ---
document.querySelectorAll(".splide-simple").forEach((el) => {
  new Splide(el, {
    type: "loop",
    perPage: 5,
    perMove: 1,
    gap: "1rem",
    pagination: false,
    arrows: true,
    breakpoints: {
      900: { perPage: 2, gap: "0.5rem" },
      1400: { perPage: 3, gap: "0.8rem" },
    },
  }).mount();
});

// --- Vertical Carousel for Posters ---
new Splide(".splide-vertical", {
  type: "loop",
  perPage: 3,
  focus: "center",
  gap: "5rem",
  pagination: false,
  arrows: true,
  breakpoints: {
    900: { perPage: 1, gap: "1rem" },
    1400: { perPage: 2, gap: "1.5rem" },
  },
}).mount();

// --- Séries ---
new Splide(".splide-series", {
  type: "loop",
  perPage: 5,
  gap: "1rem",
  pagination: false,
  arrows: true,
  breakpoints: {
    900: { perPage: 1, gap: "0.5rem" },
    1400: { perPage: 2, gap: "0.8rem" },
  },
}).mount();

// --- Maratonas ---
new Splide(".splide-hungergames", {
  type: "loop",
  perPage: 4,
  gap: "1rem",
  pagination: false,
  arrows: true,
  breakpoints: {
    900: { perPage: 1, gap: "0.5rem" },
    1400: { perPage: 2, gap: "0.8rem" },
  },
}).mount();

new Splide(".splide-harrypotter", {
  type: "loop",
  perPage: 3,
  gap: "1rem",
  pagination: false,
  arrows: true,
  breakpoints: {
    900: { perPage: 1, gap: "0.5rem" },
    1400: { perPage: 2, gap: "0.8rem" },
  },
}).mount();

new Splide(".splide-alien", {
  type: "loop",
  perPage: 3,
  gap: "1rem",
  pagination: false,
  arrows: true,
  breakpoints: {
    900: { perPage: 1, gap: "0.5rem" },
    1400: { perPage: 2, gap: "0.8rem" },
  },
}).mount();

new Splide(".splide-toystory", {
  type: "loop",
  perPage: 3,
  gap: "1rem",
  pagination: false,
  arrows: true,
  breakpoints: {
    900: { perPage: 1, gap: "0.5rem" },
    1400: { perPage: 2, gap: "0.8rem" },
  },
}).mount();

new Splide(".splide-xmen", {
  type: "loop",
  perPage: 3,
  gap: "1rem",
  pagination: false,
  arrows: true,
  breakpoints: {
    900: { perPage: 1, gap: "0.5rem" },
    1400: { perPage: 2, gap: "0.8rem" },
  },
}).mount();

new Splide(".splide-digohappy", {
  type: "loop",
  perPage: 5,
  gap: "1rem",
  pagination: false,
  arrows: true,
  breakpoints: {
    900: { perPage: 1, gap: "0.5rem" },
    1400: { perPage: 2, gap: "0.8rem" },
  },
}).mount();

// ==========================
// === HEADER FUNCTIONALITY ===
// ==========================

// --- Profile Menu Toggle ---
const profileToggle = document.getElementById("profile-menu-toggle");
const profileMenu = document.getElementById("profile-menu");

if (profileToggle && profileMenu) {
  profileToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = profileMenu.style.display === "block";
    profileMenu.style.display = isOpen ? "none" : "block";
    profileToggle.setAttribute("aria-expanded", !isOpen);
  });
  document.addEventListener("click", (e) => {
    if (!profileMenu.contains(e.target) && e.target !== profileToggle) {
      profileMenu.style.display = "none";
      profileToggle.setAttribute("aria-expanded", "false");
    }
  });
  profileToggle.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      profileMenu.style.display = "none";
      profileToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// ==========================
// === HEADER BUTTONS (SEARCH, NOTIFICATION, COMING SOON) ===
// ==========================

const searchBtn = document.getElementById("search-btn");
const searchModal = document.getElementById("search-modal");
const searchClose = document.getElementById("search-close");
const searchInput = document.getElementById("search-input");
const searchSubmit = document.getElementById("search-submit");
const searchResult = document.getElementById("search-result");

if (searchBtn && searchModal) {
  searchBtn.addEventListener("click", () => {
    searchModal.style.display = "flex";
    searchInput.value = "";
    searchResult.textContent = "";
    searchResult.style.display = "none";
    searchSubmit.style.display = "inline-block";
    searchInput.focus();
  });
}
if (searchClose) {
  searchClose.addEventListener("click", () => {
    searchModal.style.display = "none";
  });
}

const notificationBtn = document.getElementById("notification-btn");
const notificationModal = document.getElementById("notification-modal");
const notificationClose = document.getElementById("notification-close");

if (notificationBtn && notificationModal) {
  notificationBtn.addEventListener("click", () => {
    notificationModal.style.display = "flex";
  });
}
if (notificationClose) {
  notificationClose.addEventListener("click", () => {
    notificationModal.style.display = "none";
  });
}

const comingSoonModal = document.getElementById("coming-soon-modal");
const comingSoonClose = document.getElementById("coming-soon-close");
const navLinks = document.querySelectorAll('.header__nav-tittle a[href="#"]');

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    comingSoonModal.style.display = "flex";
  });
});
if (comingSoonClose) {
  comingSoonClose.addEventListener("click", () => {
    comingSoonModal.style.display = "none";
  });
}

// --- Helper: Close modal when clicking outside content ---
function setupModalCloseOnBackdrop(modalId, contentClass, closeBtnId) {
  const modal = document.getElementById(modalId);
  const content = modal?.querySelector(`.${contentClass}`);
  const closeBtn = document.getElementById(closeBtnId);

  if (modal && content) {
    modal.addEventListener("mousedown", (e) => {
      if (!content.contains(e.target)) {
        modal.style.display = "none";
      }
    });
  }
  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }
}
setupModalCloseOnBackdrop(
  "search-modal",
  "search-modal__content",
  "search-close"
);
setupModalCloseOnBackdrop(
  "notification-modal",
  "search-modal__content",
  "notification-close"
);
setupModalCloseOnBackdrop(
  "coming-soon-modal",
  "search-modal__content",
  "coming-soon-close"
);

// ==========================
// === HERO "SEE DETAILS" BUTTON ===
// ==========================
document.addEventListener("DOMContentLoaded", function () {
  const heroSeeDetailsBtn = document.querySelector(".hero__see-details-btn");
  if (heroSeeDetailsBtn) {
    heroSeeDetailsBtn.addEventListener("click", function () {
      const key = this.dataset.movie;
      if (!key) return;
      const thumb = document.querySelector(`img[data-movie="${key}"]`);
      if (thumb) thumb.click();
    });
  }
});
