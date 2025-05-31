// ==========================
// === MATHFLIX MAIN SCRIPT - SECTION INDEX ===
// ==========================
// 1. PAGE LOADING EFFECTS
// 2. HERO SPOILER BUTTON FUNCTIONALITY
// 3. SPLIDE CAROUSEL CONFIGURATIONS
// 4. HEADER FUNCTIONALITY (Search, Notifications, Profile Menu)
// 5. HERO "SEE DETAILS" BUTTON HANDLER
// 6. ESC KEY MODAL MANAGEMENT
// 7. DYNAMIC HERO SECTION WITH AUTO-ROTATION
// 8. HEADER NAVIGATION (Series/Movies Filter)
// 9. VERTICAL CAROUSEL CLICK-TO-CENTER FUNCTIONALITY
// ==========================

// ==========================
// 1. PAGE LOADING EFFECTS
// ==========================
// Add smooth page load animation when DOM is ready
window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("page-loaded");
});

// ==========================
// 2. HERO SPOILER BUTTON FUNCTIONALITY
// ==========================
const spoilerBtn = document.getElementById("spoiler-btn");
let spoilerFixed = false;
let step = 0;

// Spoiler database - contains spoilers for each movie/series
const spoilers = {
  gonegirl:
    "Amy fakes her own disappearance to frame her husband Nick. In the end, she returns and forces Nick to stay with her.",
  arrival: "The aliens didn't come to invade, but to gift humans their language which allows seeing the future.",
  abouttime: "The secret to happiness isn't time travel, but appreciating each day as if you're living it for the second time.",
  marypoppins: "Mary Poppins didn't need magic to fix the Banks family; she just taught them to find fun in everything.",
  wandavision:
    "It's all an illusion created by Wanda to cope with grief after losing Vision. The townsfolk are hostages of her magic.",
  hungergames:
    "Across the saga, Katniss survives two Hunger Games, becomes the face of the rebellion, overthrows President Snow, and eventually finds peace in a post-war Panem with Peeta after many personal losses.",
};

// Initialize spoiler button behavior with multi-step confirmation
if (spoilerBtn) {
  // Fix spoiler button position after first interaction to prevent layout shifts
  function fixSpoilerBtn() {
    if (!spoilerFixed) {
      spoilerBtn.classList.add("spoiler-fixed");
      spoilerFixed = true;
      spoilerBtn.removeEventListener("mouseenter", fixSpoilerBtn);
      document.querySelector(".hero-content").removeEventListener("mouseenter", fixSpoilerBtn);
      document.querySelector(".hero__see-details-btn").removeEventListener("mouseenter", fixSpoilerBtn);
    }
  }

  // Attach fix function to multiple hover events for better UX
  spoilerBtn.addEventListener("mouseenter", fixSpoilerBtn);
  document.querySelector(".hero-content").addEventListener("mouseenter", fixSpoilerBtn);
  document.querySelector(".hero__see-details-btn").addEventListener("mouseenter", fixSpoilerBtn);

  // Multi-step spoiler reveal process with countdown animation
  spoilerBtn.addEventListener("click", () => {
    if (step === 0) {
      // Step 1: Ask for confirmation
      spoilerBtn.classList.add("active");
      spoilerBtn.innerText = "Are you sure?";
      step = 1;
    } else if (step === 1) {
      // Step 2: 3-second countdown with movement animation
      step = 2;
      let count = 3;
      const countdown = setInterval(() => {
        spoilerBtn.innerText = count;
        spoilerBtn.style.transform = `translateX(${(4 - count) * 50}px)`;
        count--;
        if (count < 0) {
          clearInterval(countdown);
          // Reset button state and show spoiler
          spoilerBtn.innerText = "Spoiler";
          spoilerBtn.style.transform = "";
          spoilerBtn.classList.remove("active");
          step = 0;

          // Show spoiler for current hero movie
          const currentMovieKey = document.querySelector(".hero__see-details-btn").dataset.movie;
          showSpoilerModal(currentMovieKey);
        }
      }, 600);
    }
  });
}

// Create and display spoiler modal with auto-close timer
function showSpoilerModal(movieKey) {
  // Create spoiler modal if it doesn't exist
  if (!document.getElementById("spoiler-modal")) {
    const spoilerModal = document.createElement("div");
    spoilerModal.id = "spoiler-modal";
    spoilerModal.className = "search-modal";
    spoilerModal.innerHTML = `
      <div class="search-modal__backdrop"></div>
      <div class="search-modal__content">
        <button id="spoiler-modal-close" aria-label="Close">&times;</button>
        <div class="spoiler-content">
          <h2>🚨 SPOILER ALERT! 🚨</h2>
          <p id="spoiler-text"></p>
          <div class="spoiler-timer">Auto-close in <span id="spoiler-countdown">10</span>s</div>
        </div>
      </div>
    `;
    document.body.appendChild(spoilerModal);
  }

  const spoilerModal = document.getElementById("spoiler-modal");
  const spoilerText = document.getElementById("spoiler-text");
  const spoilerCountdown = document.getElementById("spoiler-countdown");
  const spoilerClose = document.getElementById("spoiler-modal-close");

  // Display spoiler text for the specific movie
  spoilerText.textContent = spoilers[movieKey] || "This movie is so secret we don't even have a spoiler for it!";
  spoilerModal.style.display = "flex";

  // Auto-close timer (10 seconds)
  let timeLeft = 10;
  const timer = setInterval(() => {
    timeLeft--;
    spoilerCountdown.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      spoilerModal.style.display = "none";
    }
  }, 1000);

  // Manual close button
  spoilerClose.onclick = () => {
    clearInterval(timer);
    spoilerModal.style.display = "none";
  };
}

// ==========================
// 3. SPLIDE CAROUSEL CONFIGURATIONS
// ==========================

// Top 10 Carousel with continuous auto-scroll
new Splide(".splide-top10", {
  type: "loop",
  drag: "free",
  focus: "center",
  perPage: 4,
  gap: "1.5rem",
  autoScroll: {
    speed: 0.5,
    pauseOnHover: true,
    pauseOnFocus: false,
  },
  pagination: false,
  breakpoints: {
    1100: { perPage: 2.5, gap: "1rem" },
    1200: { perPage: 3, gap: "1rem" },
    1400: { perPage: 3.5, gap: "1rem" },
    1600: { perPage: 6, gap: "3rem" },
    1800: { perPage: 6, gap: "5rem" },
  },
}).mount(window.splide.Extensions);

// Standard horizontal carousels for movie/series galleries
document.querySelectorAll(".splide-simple").forEach((el) => {
  new Splide(el, {
    type: "loop",
    perPage: 4,
    perMove: 1,
    gap: "1rem",
    pagination: false,
    arrows: true,
    breakpoints: {
      1200: { perPage: 3, gap: "1rem" },
      1600: { perPage: 4.5, gap: "2rem" },
      1800: { perPage: 5.5, gap: "4rem" },
    },
  }).mount();
});

// Vertical poster carousel with center focus (5 visible items)
const verticalSplideElement = new Splide(".splide-vertical", {
  type: "loop",
  perPage: 5, // Show 5 posters: 1 center + 2 on each side
  focus: "center",
  gap: "1rem",
  pagination: false,
  arrows: true,
  autoWidth: false,
  trimSpace: false,
  speed: 600, // Smooth transition speed
  easing: "ease",
  breakpoints: {
    900: { perPage: 3, gap: "1rem" },
    1200: { perPage: 3, gap: "1rem" },
    1400: { perPage: 4, gap: "1rem" },
    1600: { perPage: 5, gap: "1.5rem" },
    1800: { perPage: 5, gap: "2rem" },
  },
}).mount();

// Store vertical splide reference globally for external access
window.verticalSplide = verticalSplideElement;

// Marathon series carousels with delayed initialization
document.addEventListener("DOMContentLoaded", function () {
  // Small delay to ensure DOM is fully ready
  setTimeout(() => {
    const marathonConfigs = [
      { selector: ".splide-hungergames", perPage: 4, perPageLarge: 5 },
      { selector: ".splide-harrypotter", perPage: 3, perPageLarge: 4 },
      { selector: ".splide-alien", perPage: 3, perPageLarge: 4 },
      { selector: ".splide-toystory", perPage: 3, perPageLarge: 4 },
      { selector: ".splide-xmen", perPage: 3, perPageLarge: 4 },
    ];

    marathonConfigs.forEach(({ selector, perPage, perPageLarge }) => {
      const element = document.querySelector(selector);
      if (element) {
        new Splide(selector, {
          type: "loop",
          perPage,
          perMove: 1, // Move one slide at a time (like series carousels)
          gap: "3rem",
          pagination: false,
          arrows: true,
          speed: 600, // Smooth transition speed
          easing: "ease", // Smooth easing
          breakpoints: {
            900: { perPage: 1, gap: "0.5rem" },
            1200: { perPage: 3, gap: "1.2rem" },
            1400: { perPage: 3.5, gap: "2.5rem" },
            1600: { perPage: perPageLarge, gap: "2rem" },
            1800: { perPage: perPageLarge + 1, gap: "2.5rem" },
          },
        }).mount();
        console.log(`✅ Marathon carousel mounted: ${selector}`);
      } else {
        console.warn(`❌ Marathon carousel element not found: ${selector}`);
      }
    });
  }, 1000);
});

// ==========================
// 4. HEADER FUNCTIONALITY (Search, Notifications, Profile Menu)
// ==========================

// Global variables for header modals and menus
let searchModal, notificationModal, comingSoonModal, profileMenu, profileToggle;

// Handle search modal opening with proper focus management
function handleSearchClick(e) {
  console.log("🔍 Search button clicked", e);
  if (e) e.preventDefault();

  const searchModal = document.getElementById("search-modal");
  if (!searchModal) return;

  searchModal.style.display = "flex";

  // Focus search input and reset form state
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.value = "";
    setTimeout(() => searchInput.focus(), 100);
  }

  const searchResult = document.getElementById("search-result");
  if (searchResult) {
    searchResult.textContent = "";
    searchResult.style.display = "none";
  }

  const searchSubmit = document.getElementById("search-submit");
  if (searchSubmit) {
    searchSubmit.style.display = "inline-block";
  }
}

// Initialize all header button functionality
function initializeHeaderButtons() {
  // Get DOM elements
  searchModal = document.getElementById("search-modal");
  notificationModal = document.getElementById("notification-modal");
  comingSoonModal = document.getElementById("coming-soon-modal");
  profileMenu = document.getElementById("profile-menu");
  profileToggle = document.getElementById("profile-menu-toggle");

  const searchBtn = document.getElementById("search-btn");
  const searchClose = document.getElementById("search-close");
  const notificationBtn = document.getElementById("notification-btn");
  const notificationClose = document.getElementById("notification-close");

  // Search button functionality
  if (searchBtn) {
    searchBtn.addEventListener("click", function (e) {
      e.stopPropagation(); // Prevent event bubbling
      handleSearchClick(e);
    });
  }

  if (searchClose && searchModal) {
    searchClose.onclick = () => {
      searchModal.style.display = "none";
    };
  }

  // Notification button with click-outside-to-close
  if (notificationBtn && notificationModal) {
    notificationBtn.onclick = () => {
      notificationModal.style.display = "flex";

      // Set up click-outside-to-close listener
      const handleOutsideClick = function (event) {
        if (
          !notificationModal.querySelector(".search-modal__content").contains(event.target) &&
          event.target !== notificationBtn
        ) {
          notificationModal.style.display = "none";
          document.removeEventListener("click", handleOutsideClick);
        }
      };
      setTimeout(() => document.addEventListener("click", handleOutsideClick), 100);
    };
  }

  if (notificationClose && notificationModal) {
    notificationClose.onclick = () => {
      notificationModal.style.display = "none";
    };
  }

  // Profile menu dropdown with click-outside-to-close
  if (profileToggle && profileMenu) {
    profileToggle.onclick = function (e) {
      e.stopPropagation();
      const isOpen = profileMenu.style.display === "block";
      profileMenu.style.display = isOpen ? "none" : "block";
      this.setAttribute("aria-expanded", !isOpen);

      if (!isOpen) {
        setTimeout(() => {
          const closeMenu = function (event) {
            if (!profileMenu.contains(event.target) && event.target !== profileToggle) {
              profileMenu.style.display = "none";
              profileToggle.setAttribute("aria-expanded", "false");
              document.removeEventListener("click", closeMenu);
            }
          };
          document.addEventListener("click", closeMenu);
        }, 10);
      }
    };
  }
}

// Initialize header buttons after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(initializeHeaderButtons, 100);
});

// ==========================
// 5. HERO "SEE DETAILS" BUTTON HANDLER
// ==========================
document.addEventListener("DOMContentLoaded", function () {
  const heroSeeDetailsBtn = document.querySelector(".hero__see-details-btn");
  if (heroSeeDetailsBtn) {
    heroSeeDetailsBtn.addEventListener("click", function () {
      const key = this.dataset.movie;
      if (!key) return;

      // Check if current hero is a marathon series
      const currentHero = heroMovies.find((hero) => hero.key === key);
      if (currentHero && currentHero.type === "marathon") {
        // Open search modal with pre-filled marathon name
        const searchModal = document.getElementById("search-modal");
        const searchInput = document.getElementById("search-input");
        const searchSubmit = document.getElementById("search-submit");

        searchModal.style.display = "flex";
        searchInput.value = key.replace("games", " games"); // Format: "hungergames" -> "hunger games"
        searchInput.focus();

        // Auto-trigger search after brief delay
        setTimeout(() => searchSubmit.click(), 300);
      } else {
        // Default behavior for regular movies/series - trigger thumbnail click
        const thumb = document.querySelector(`img[data-movie="${key}"]`);
        if (thumb) thumb.click();
      }
    });
  }
});

// ==========================
// 6. ESC KEY MODAL MANAGEMENT
// ==========================
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    // PRIORITY 1: Movie modal (highest priority)
    const movieModal = document.getElementById("movie-modal");
    if (movieModal && movieModal.style.display === "flex") {
      // Use proper close function from script.js if available
      if (typeof closeMovieModal === "function") {
        closeMovieModal();
      } else {
        // Fallback close behavior
        movieModal.style.display = "none";
        const trailer = document.getElementById("movie-modal-trailer");
        const verticalTrailer = document.getElementById("vertical-modal-trailer");
        if (trailer) trailer.src = "";
        if (verticalTrailer) verticalTrailer.src = "";

        // Maintain search modal open if it was open before movie modal
        const searchModal = document.getElementById("search-modal");
        if (searchModal && searchModal.style.display === "flex") {
          const searchInput = document.getElementById("search-input");
          if (searchInput) {
            setTimeout(() => searchInput.focus(), 100);
          }
        }
      }
      return; // Stop here, don't close other modals
    }

    // PRIORITY 2: Other modals
    const modals = [
      "search-modal",
      "notification-modal",
      "coming-soon-modal",
      "spoiler-modal",
      "surprise-modal",
      "comment-popup",
    ];
    modals.forEach((id) => {
      const el = document.getElementById(id);
      if (el && el.style.display === "flex") el.style.display = "none";
    });

    // PRIORITY 3: Profile menu dropdown
    const profileMenu = document.getElementById("profile-menu");
    const profileToggle = document.getElementById("profile-menu-toggle");
    if (profileMenu && profileMenu.style.display === "block") {
      profileMenu.style.display = "none";
      if (profileToggle) profileToggle.setAttribute("aria-expanded", "false");
    }
  }
});

// ==========================
// 7. DYNAMIC HERO SECTION WITH AUTO-ROTATION
// ==========================

// Hero movie/series data for dynamic rotation
const heroMovies = [
  {
    key: "gonegirl",
    title: "GONE GIRL",
    background: "assets/hero-banner/mainly-ban-gonegirl.png",
    text: "Between false leads, buried secrets, and a truth that was always an illusion, Nick and Amy play a deadly game where no one is who they seem to be.",
    textHighlight: "In the end, the question remains: who really disappeared?",
    type: "movie",
    textColor: "light",
  },
  {
    key: "arrival",
    title: "ARRIVAL",
    background: "assets/hero-banner/mainly-ban-arrival.png",
    text: "When mysterious spacecraft touch down across the globe, an elite team led by linguist Louise Banks is brought together to investigate.",
    textHighlight: "As mankind teeters on the verge of global war, Banks races against time to decipher their intent.",
    type: "movie",
    textColor: "light",
  },
  {
    key: "abouttime",
    title: "ABOUT TIME",
    background: "assets/hero-banner/mainly-ban-abouttime.png",
    text: "At the age of 21, Tim discovers he can travel in time and change what happens and has happened in his own life.",
    textHighlight:
      "His decision to make his world a better place by getting a girlfriend turns out not to be as easy as you might think.",
    type: "movie",
    textColor: "light",
  },
  {
    key: "wandavision",
    title: "WANDAVISION",
    background: "assets/hero-banner/mainly-ban-wandavision.png",
    text: "Wanda Maximoff and Vision are living an idyllic suburban life, trying to conceal their true natures.",
    textHighlight:
      "The line between reality and illusion blurs in this mind-bending series that combines classic sitcoms with the Marvel Cinematic Universe.",
    type: "series",
    textColor: "light",
  },
  {
    key: "hungergames",
    title: "THE HUNGER GAMES",
    background: "assets/hero-banner/mainly-ban-hungergames.png",
    text: "Enter the world of Panem, where the Capitol rules over 13 districts and hosts an annual televised death match called The Hunger Games.",
    textHighlight:
      "Follow Katniss Everdeen's journey from tribute to revolutionary symbol in this dystopian saga of survival, politics, and rebellion.",
    type: "marathon",
    textColor: "light",
  },
];

// Hero rotation state variables
let currentHeroIndex = 0;
let heroInterval = null;

// Create navigation dots and arrow buttons for hero section
function createHeroIndicators() {
  const heroNavigation = document.createElement("div");
  heroNavigation.className = "hero-navigation";

  // Create indicator dots for each hero item
  heroMovies.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.className = "hero-nav-dot" + (index === 0 ? " active" : "");
    dot.dataset.index = index;
    dot.addEventListener("click", () => {
      clearInterval(heroInterval);
      currentHeroIndex = index;
      updateHero(currentHeroIndex);
      restartHeroInterval();
    });
    heroNavigation.appendChild(dot);
  });

  // Create previous button
  const prevBtn = document.createElement("button");
  prevBtn.className = "hero-nav-btn hero-nav-prev";
  prevBtn.innerHTML = "❮";
  prevBtn.addEventListener("click", () => {
    clearInterval(heroInterval);
    currentHeroIndex = (currentHeroIndex - 1 + heroMovies.length) % heroMovies.length;
    updateHero(currentHeroIndex);
    restartHeroInterval();
  });

  // Create next button
  const nextBtn = document.createElement("button");
  nextBtn.className = "hero-nav-btn hero-nav-next";
  nextBtn.innerHTML = "❯";
  nextBtn.addEventListener("click", () => {
    clearInterval(heroInterval);
    currentHeroIndex = (currentHeroIndex + 1) % heroMovies.length;
    updateHero(currentHeroIndex);
    restartHeroInterval();
  });

  // Add all navigation elements to hero content
  document.querySelector(".hero-content").appendChild(heroNavigation);
  document.querySelector(".hero-content").appendChild(prevBtn);
  document.querySelector(".hero-content").appendChild(nextBtn);
}

// Update hero content with smooth fade animation
function updateHero(index) {
  const hero = heroMovies[index];
  const heroTitle = document.querySelector(".hero__title");
  const heroText = document.querySelector(".hero__text:not(.hero__text-bold)");
  const heroTextBold = document.querySelector(".hero__text-bold");
  const heroButton = document.querySelector(".hero__see-details-btn");
  const heroBackground = document.getElementById("background");
  const heroTypeText = document.querySelector(".hero__icon-text");
  const heroContent = document.querySelector(".hero-content");

  // Update active indicator dot
  document.querySelectorAll(".hero-nav-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });

  // Start fade-out animation
  heroContent.classList.add("fade-out");

  setTimeout(() => {
    // Update all hero content
    heroTitle.textContent = hero.title;
    heroText.textContent = hero.text;
    heroTextBold.textContent = hero.textHighlight;
    heroTypeText.textContent = hero.type.toUpperCase();
    heroButton.dataset.movie = hero.key;

    // Update background image with overlay gradients
    heroBackground.style.background = `
      linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 20%, transparent 60%),
      linear-gradient(to bottom, transparent 80%, black 100%), 
      url("${hero.background}") top center / cover no-repeat`;

    // Start fade-in animation
    heroContent.classList.remove("fade-out");
    heroContent.classList.add("fade-in");

    setTimeout(() => {
      heroContent.classList.remove("fade-in");
    }, 800);
  }, 400);
}

// Start hero rotation system
function startHeroRotation() {
  if (heroInterval) clearInterval(heroInterval);
  updateHero(currentHeroIndex);
  restartHeroInterval();
}

// Restart auto-rotation timer (8 seconds interval)
function restartHeroInterval() {
  if (heroInterval) clearInterval(heroInterval);
  heroInterval = setInterval(() => {
    currentHeroIndex = (currentHeroIndex + 1) % heroMovies.length;
    updateHero(currentHeroIndex);
  }, 8000);
}

// Initialize hero system with hover pause functionality
let heroInitialized = false;
document.addEventListener("DOMContentLoaded", function () {
  if (!heroInitialized) {
    heroInitialized = true;
    createHeroIndicators();
    startHeroRotation();

    // Pause rotation on hover, resume on mouse leave
    const hero = document.querySelector(".hero");
    if (hero) {
      hero.addEventListener("mouseenter", () => {
        if (heroInterval) {
          clearInterval(heroInterval);
          heroInterval = null;
        }
      });

      hero.addEventListener("mouseleave", () => {
        if (!heroInterval) {
          restartHeroInterval();
        }
      });
    }
  }
});

// ==========================
// 8. HEADER NAVIGATION (Series/Movies Filter)
// ==========================
document.addEventListener("DOMContentLoaded", function () {
  const seriesBtn = document.querySelector(".header__nav-tittle:nth-child(2) a");
  const moviesBtn = document.querySelector(".header__nav-tittle:nth-child(3) a");

  // Series filter - show only series content
  if (seriesBtn) {
    seriesBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // Update active navigation state
      document.querySelectorAll(".header__nav-tittle").forEach((item) => {
        item.classList.remove("header__nav-tittle--active");
      });
      this.parentElement.classList.add("header__nav-tittle--active");

      // Hide non-series sections
      document
        .querySelectorAll(".gallery__container.marathon-section, .gallery__container-vertical, .gallery__container.top10")
        .forEach((section) => {
          section.style.display = "none";
        });

      // Show only series sections
      document.querySelectorAll(".gallery__container.series").forEach((section) => {
        section.style.display = "block";
      });

      // Update hero to show a series
      for (let i = 0; i < heroMovies.length; i++) {
        if (heroMovies[i].type === "series") {
          clearInterval(heroInterval);
          currentHeroIndex = i;
          updateHero(currentHeroIndex);
          restartHeroInterval();
          break;
        }
      }
    });
  }

  // Movies filter - show only movie content
  if (moviesBtn) {
    moviesBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // Update active navigation state
      document.querySelectorAll(".header__nav-tittle").forEach((item) => {
        item.classList.remove("header__nav-tittle--active");
      });
      this.parentElement.classList.add("header__nav-tittle--active");

      // Hide series sections (except "To Make Digo Happy" which stays visible)
      document.querySelectorAll(".gallery__container.series").forEach((section) => {
        if (!section.classList.contains("digo-happy")) {
          section.style.display = "none";
        }
      });

      // Show movie sections
      document
        .querySelectorAll(".gallery__container.marathon-section, .gallery__container-vertical, .gallery__container.top10")
        .forEach((section) => {
          section.style.display = "";
        });

      // Update hero to show a movie
      for (let i = 0; i < heroMovies.length; i++) {
        if (heroMovies[i].type === "movie") {
          clearInterval(heroInterval);
          currentHeroIndex = i;
          updateHero(currentHeroIndex);
          restartHeroInterval();
          break;
        }
      }
    });
  }

  // Home button - reset to show all content
  const homeBtn = document.querySelector(".header__nav-tittle:first-child a");
  if (homeBtn) {
    homeBtn.addEventListener("click", function (e) {
      if (window.location.pathname.endsWith("index.html")) {
        e.preventDefault();

        // Reset navigation active state
        document.querySelectorAll(".header__nav-tittle").forEach((item) => {
          item.classList.remove("header__nav-tittle--active");
        });
        this.parentElement.classList.add("header__nav-tittle--active");

        // Show all sections
        document.querySelectorAll(".gallery__container, .gallery__container-vertical, .marathon-section").forEach((section) => {
          section.style.display = "";
        });
      }
    });
  }
});

// ==========================
// 9. VERTICAL CAROUSEL CLICK-TO-CENTER FUNCTIONALITY
// ==========================

// Flag to prevent multiple simultaneous carousel movements
let isVerticalSplideMoving = false;

// Handle clicks on vertical carousel posters
document.addEventListener("click", function (e) {
  // Only process clicks on images within the vertical carousel
  if (e.target.tagName === "IMG" && e.target.closest(".splide-vertical")) {
    e.preventDefault();
    e.stopPropagation();

    // Ignore clicks if carousel is currently moving
    if (isVerticalSplideMoving) {
      console.log("🚫 Vertical carousel is already moving, ignoring click");
      return;
    }

    const movieKey = e.target.dataset.movie;
    const clickedSlide = e.target.closest(".splide__slide");

    console.log("🎬 Clicked on vertical carousel:", movieKey);

    if (verticalSplide && clickedSlide) {
      // Check if clicked slide is already centered (active)
      const isActive = clickedSlide.classList.contains("is-active");

      console.log("📍 Is slide already centered?", isActive);

      if (!isActive) {
        // Find the index of the clicked slide (excluding clones)
        const originalSlides = document.querySelectorAll(".splide-vertical .splide__slide:not(.splide__slide--clone)");
        let targetIndex = -1;

        originalSlides.forEach((slide, index) => {
          const imgInSlide = slide.querySelector("img[data-movie]");
          if (imgInSlide && imgInSlide.dataset.movie === movieKey) {
            targetIndex = index;
          }
        });

        console.log("🎯 Target slide index found:", targetIndex);

        if (targetIndex !== -1) {
          // Start carousel movement
          isVerticalSplideMoving = true;
          console.log("🔄 Moving carousel to slide:", targetIndex);
          verticalSplide.go(targetIndex);

          // Wait for carousel transition to complete
          const handleMoved = function () {
            console.log("✅ Carousel transition completed, opening modal");
            isVerticalSplideMoving = false;

            // Check if modal wasn't manually closed during transition
            const movieModal = document.getElementById("movie-modal");
            if (!movieModal || movieModal.style.display !== "flex") {
              // Small delay to ensure visual transition is complete
              setTimeout(() => {
                if (typeof openMovieModal === "function") {
                  openMovieModal(movieKey);
                }
              }, 650); // 650ms delay for smooth UX
            }

            // Clean up event listener
            verticalSplide.off("moved", handleMoved);
          };

          // Listen for carousel movement completion
          verticalSplide.on("moved", handleMoved);
          return;
        } else {
          console.warn("❌ Target slide index not found for movie:", movieKey);
          return;
        }
      } else {
        // Slide is already centered - open modal immediately
        console.log("⚡ Slide already centered, opening modal immediately");
        if (typeof openMovieModal === "function") {
          openMovieModal(movieKey);
        }
        return;
      }
    }

    console.log("❌ Something went wrong, NOT opening modal");
  }
});
