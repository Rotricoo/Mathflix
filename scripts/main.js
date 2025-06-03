// ==========================
// === MATHFLIX MAIN SCRIPT - NAVIGATION INDEX ===
// ==========================
// 1. PAGE LOADING EFFECTS
// 2. HERO SPOILER BUTTON FUNCTIONALITY
// 3. SPLIDE CAROUSEL CONFIGURATIONS
// 4. HEADER FUNCTIONALITY (Search, Notifications, Profile Menu)
// 5. HERO "SEE DETAILS" BUTTON HANDLER
// 6. ESC KEY MODAL MANAGEMENT
// 7. DYNAMIC HERO SECTION WITH AUTO-ROTATION
// 8. HEADER NAVIGATION (Movies/Series Filter)
// 9. VERTICAL CAROUSEL CLICK-TO-CENTER FUNCTIONALITY
// 10. DYNAMIC SERIES CAROUSELS SYSTEM
// 11. FOOTER NAVIGATION LINKS
// ==========================

// ==========================
// 1. PAGE LOADING EFFECTS
// ==========================
/**
 * Add smooth page load animation when DOM is ready
 */
window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("page-loaded");
});

// ==========================
// 2. HERO SPOILER BUTTON FUNCTIONALITY
// ==========================
const spoilerBtn = document.getElementById("spoiler-btn");
let spoilerFixed = false;
let spoilerStep = 0;

/**
 * Spoiler database - contains spoilers for each movie/series
 */
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
  alien1:
    "The alien bursts from Kane's chest during dinner. Only Ripley survives by ejecting the xenomorph into space. Plot twist: Ash the android was programmed to bring the alien back to Earth at any cost.",
  rupaul:
    "They're all actually men! But seriously, the real tea is that every season someone gets eliminated for not knowing the words to the lip sync, and RuPaul's wig collection is worth more than most countries.",
};

/**
 * Initialize spoiler button behavior with multi-step confirmation
 */
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
    if (spoilerStep === 0) {
      // Step 1: Ask for confirmation
      spoilerBtn.classList.add("active");
      spoilerBtn.innerText = "Are you sure?";
      spoilerStep = 1;
    } else if (spoilerStep === 1) {
      // Step 2: 3-second countdown with movement animation
      spoilerStep = 2;
      let count = 3;
      const countdown = setInterval(() => {
        spoilerBtn.innerText = count;
        spoilerBtn.style.transform = `translateX(${(4 - count) * 50}px)`;
        count--;
        if (count < 0) {
          clearInterval(countdown);
          spoilerBtn.classList.add("exit");
          // Get current hero movie key for spoiler content
          const currentHeroKey = document.querySelector(".hero__see-details-btn").dataset.movie;
          setTimeout(() => showSpoilerModal(currentHeroKey), 600);
        }
      }, 600);
    }
  });
}

/**
 * Create and display spoiler modal with auto-close timer
 * @param {string} movieKey - The movie key to show spoiler for
 */
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

/**
 * Initialize all carousel configurations after DOM is loaded
 */
document.addEventListener("DOMContentLoaded", function () {
  // AGUARDAR UM POUCO PARA GARANTIR QUE TODO O CSS CARREGOU
  setTimeout(() => {
    console.log("🔍 Initializing Top 10 carousel...");

    // VERIFICAR SE O ELEMENTO EXISTE
    const top10Element = document.querySelector(".splide-top10");
    if (!top10Element) {
      console.error("❌ Top 10 element not found!");
      return;
    }

    // INICIALIZAR TOP 10 COM CONFIGURAÇÃO MAIS SIMPLES
    try {
      const top10Splide = new Splide(".splide-top10", {
        type: "loop",
        drag: "free",
        focus: "center",
        perPage: 4,
        gap: "3rem",
        autoScroll: {
          speed: 0.5,
          pauseOnHover: true,
          pauseOnFocus: false,
        },
        pagination: false,
        // BREAKPOINTS SIMPLIFICADOS
        breakpoints: {
          480: {
            perPage: 1.8,
            gap: "1rem",
          },
          768: {
            perPage: 2.3,
            gap: "1.5rem",
          },
          1024: {
            perPage: 3,
            gap: "2rem",
          },
          1440: {
            perPage: 3.5,
            gap: "2.5rem",
          },
        },
      }).mount(window.splide.Extensions);

      console.log("✅ Top 10 carousel initialized successfully");
    } catch (error) {
      console.error("❌ Error initializing Top 10:", error);
    }

    // DEPOIS inicializar outros carrosséis
    // Standard horizontal carousels
    document.querySelectorAll(".splide-simple").forEach((el) => {
      new Splide(el, {
        type: "loop",
        perPage: 4,
        perMove: 1,
        gap: "1rem",
        pagination: false,
        arrows: true,
        breakpoints: {
          480: { perPage: 2.3, gap: "0.5rem" },
          768: { perPage: 3.5, gap: "0.8rem" },
          1024: { perPage: 3, gap: "1rem" },
          1440: { perPage: 4.5, gap: "2rem" },
          1441: { perPage: 3.5, gap: "4rem" },
        },
      }).mount();
    });

    // Vertical carousel
    const verticalSplideElement = new Splide(".splide-vertical", {
      type: "loop",
      perPage: 5,
      focus: "center",
      gap: "1rem",
      pagination: false,
      arrows: true,
      autoWidth: false,
      trimSpace: false,
      speed: 600,
      easing: "ease",
      breakpoints: {
        480: { perPage: 2.5, gap: "0.5rem" },
        768: { perPage: 3.5, gap: "0.8rem" },
        1024: { perPage: 3, gap: "1rem" },
        1440: { perPage: 4.5, gap: "2rem" },
        1441: { perPage: 5.5, gap: "4rem" },
      },
    }).mount();

    window.verticalSplide = verticalSplideElement;

    // Marathon carousels com delay maior
    setTimeout(() => {
      const marathonConfigs = [
        { selector: ".splide-hungergames", perPage: 4, perPageLarge: 5, gap: "3rem" }, // VOLTA para 3rem
        { selector: ".splide-harrypotter", perPage: 3, perPageLarge: 4, gap: "3rem" }, // VOLTA para 3rem
        { selector: ".splide-alien", perPage: 3, perPageLarge: 4, gap: "3rem" }, // VOLTA para 3rem
        { selector: ".splide-toystory", perPage: 3, perPageLarge: 4, gap: "3rem" }, // VOLTA para 3rem
        { selector: ".splide-xmen", perPage: 3, perPageLarge: 4, gap: "3rem" }, // VOLTA para 3rem
      ];

      marathonConfigs.forEach(({ selector, perPage, perPageLarge, gap }) => {
        const element = document.querySelector(selector);
        if (element) {
          new Splide(selector, {
            type: "loop",
            perPage,
            perMove: 1,
            gap: gap || "2rem",
            pagination: false,
            arrows: true,
            speed: 600,
            easing: "ease",
            breakpoints: {
              480: { perPage: 2.2, gap: "1rem" },
              768: { perPage: 3.2, gap: "1.5rem" },
              1024: { perPage: 3.5, gap: "2rem" },
              1440: { perPage: perPageLarge, gap: "2rem" },
              1441: { perPage: perPageLarge + 1, gap: "2rem" },
            },
          }).mount();
          console.log(`✅ Marathon carousel mounted: ${selector}`);
        }
      });
    }, 1500);
  }, 500); // Delay inicial para aguardar CSS
});

// ==========================
// 4. HEADER FUNCTIONALITY (Search, Notifications, Profile Menu)
// ==========================

/**
 * Handle search modal opening with proper focus management
 * @param {Event} e - Click event
 */
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

/**
 * Initialize all header button functionality
 */
function initializeHeaderButtons() {
  // Get DOM elements
  const searchModal = document.getElementById("search-modal");
  const notificationModal = document.getElementById("notification-modal");
  const profileMenu = document.getElementById("profile-menu");
  const profileToggle = document.getElementById("profile-menu-toggle");

  const searchBtn = document.getElementById("search-btn");
  const searchClose = document.getElementById("search-close");
  const notificationBtn = document.getElementById("notification-btn");
  const notificationClose = document.getElementById("notification-close");

  // Search button functionality
  if (searchBtn) {
    searchBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      handleSearchClick(e);
    });
  }

  if (searchClose && searchModal) {
    // Remover qualquer listener anterior
    const newSearchClose = searchClose.cloneNode(true);
    searchClose.parentNode.replaceChild(newSearchClose, searchClose);

    // Adicionar novo listener
    newSearchClose.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      searchModal.style.display = "none";
      console.log("❌ Search modal closed via X button");
    });

    console.log("✅ Search close button fixed");
  }

  // ADICIONAR também esta funcionalidade NOVA:
  // ADICIONAR fechar com clique fora
  if (searchModal) {
    searchModal.addEventListener("click", function (e) {
      // Só fechar se clicar diretamente no backdrop
      if (e.target === searchModal || e.target.classList.contains("search-modal__backdrop")) {
        searchModal.style.display = "none";
        console.log("❌ Search modal closed via outside click");
      }
    });
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
            if (!profileToggle.contains(event.target) && !profileMenu.contains(event.target)) {
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

/**
 * Setup hero "See Details" button functionality
 * Handles both regular movies/series and marathons
 */
document.addEventListener("DOMContentLoaded", function () {
  console.log("🎬 Setting up Hero See Details handler...");

  setTimeout(() => {
    const heroSeeDetailsBtn = document.querySelector(".hero__see-details-btn");

    if (!heroSeeDetailsBtn) {
      console.error("❌ Hero See Details button not found!");
      return;
    }

    console.log("✅ Hero See Details button found:", heroSeeDetailsBtn);

    heroSeeDetailsBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const key = this.dataset.movie;
      console.log(`🎬 See Details clicked! Dataset movie: "${key}"`);
      console.log("🎬 Current heroMovies array:", heroMovies);

      if (!key) {
        console.error("❌ No movie key found on See Details button");
        return;
      }

      // Find current hero in the array
      const currentHero = heroMovies.find((hero) => hero.key === key);
      console.log("🔍 Current hero found:", currentHero);

      if (!currentHero) {
        console.error(`❌ Hero not found in array for key: ${key}`);
        return;
      }

      console.log(`🎯 Hero type detected: "${currentHero.type}"`);

      if (currentHero.type === "marathon") {
        console.log(`🏃 MARATHON DETECTED: ${currentHero.title}`);

        // Get search elements
        const searchModal = document.getElementById("search-modal");
        const searchInput = document.getElementById("search-input");
        const searchSubmit = document.getElementById("search-submit");

        if (!searchModal || !searchInput || !searchSubmit) {
          console.error("❌ Search modal elements not found");
          return;
        }

        // Show search modal
        searchModal.style.display = "flex";
        console.log("✅ Search modal opened");

        // Determine search term based on key
        let searchTerm = "";
        console.log(`🔍 Determining search term for key: "${key}"`);

        switch (key) {
          case "hungergames":
            searchTerm = "hunger games";
            break;
          case "alien1":
            searchTerm = "alien";
            break;
          default:
            searchTerm = key;
        }

        console.log(`🔍 Search term determined: "${searchTerm}"`);

        // Set search term and focus
        searchInput.value = searchTerm;
        setTimeout(() => searchInput.focus(), 100);

        // Auto-trigger search
        setTimeout(() => {
          searchSubmit.click();
          console.log("🎯 Auto-triggered search for marathon");
        }, 400);

        console.log(`🎬 Marathon search setup complete for: ${currentHero.title}`);
      } else {
        // Default behavior for regular movies/series
        console.log(`🎬 Regular content detected: ${key}`);
        const thumb = document.querySelector(`img[data-movie="${key}"]`);

        if (thumb) {
          thumb.click();
        } else {
          // Fallback: try to open modal directly if available
          if (typeof openMovieModal === "function") {
            openMovieModal(key);
          }
        }
      }
    });

    console.log("✅ Hero See Details handler successfully attached");
  }, 2000);
});

// ==========================
// 6. ESC KEY MODAL MANAGEMENT
// ==========================

/**
 * Handle ESC key to close modals in priority order
 */
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
          if (searchInput) setTimeout(() => searchInput.focus(), 100);
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

/**
 * Hero movie/series data for dynamic rotation
 */
const homeHeroMovies = [
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

/**
 * Movies-only hero array (for Movies filter)
 */
const moviesHeroMovies = [
  {
    key: "alien1",
    title: "ALIEN",
    background: "assets/hero-banner/mainly-ban-alien.png",
    text: "In space, no one can hear you scream. The crew of the Nostromo discovers a deadly alien life form that begins to hunt them down.",
    textHighlight: "A sci-fi horror classic that redefined the genre and introduced the iconic character Ellen Ripley.",
    type: "marathon",
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
    key: "gonegirl",
    title: "GONE GIRL",
    background: "assets/hero-banner/mainly-ban-gonegirl.png",
    text: "Between false leads, buried secrets, and a truth that was always an illusion, Nick and Amy play a deadly game where no one is who they seem to be.",
    textHighlight: "In the end, the question remains: who really disappeared?",
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

/**
 * Series-only hero array (for Series filter)
 */
const seriesHeroMovies = [
  {
    key: "rupaul",
    title: "RUPAUL'S DRAG RACE",
    background: "assets/hero-banner/mainly-ban-rupaul.png",
    text: "RuPaul's Drag Race is a reality competition show where drag queens compete in various challenges to become America's Next Drag Superstar.",
    textHighlight:
      "The line between reality and illusion blurs in this mind-bending series that combines classic sitcoms with the Marvel Cinematic Universe.",
    type: "Reality Show",
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
];

// Dynamic hero array - starts with home content
let heroMovies = homeHeroMovies;

// Hero rotation state variables
let currentHeroIndex = 0;
let heroInterval = null;

/**
 * Create navigation dots and arrow buttons for hero section
 */
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

/**
 * Update hero content with smooth fade animation
 * @param {number} index - Index of hero to display
 */
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

/**
 * Start hero rotation system
 */
function startHeroRotation() {
  if (heroInterval) clearInterval(heroInterval);
  updateHero(currentHeroIndex);
  restartHeroInterval();
}

/**
 * Restart auto-rotation timer (8 seconds interval)
 */
function restartHeroInterval() {
  if (heroInterval) clearInterval(heroInterval);
  heroInterval = setInterval(() => {
    currentHeroIndex = (currentHeroIndex + 1) % heroMovies.length;
    updateHero(currentHeroIndex);
  }, 8000);
}

/**
 * Recreate hero indicators when switching between pages
 */
function recreateHeroIndicators() {
  // Remove existing navigation
  const existingNavigation = document.querySelector(".hero-navigation");
  const existingPrevBtn = document.querySelector(".hero-nav-prev");
  const existingNextBtn = document.querySelector(".hero-nav-next");

  if (existingNavigation) existingNavigation.remove();
  if (existingPrevBtn) existingPrevBtn.remove();
  if (existingNextBtn) existingNextBtn.remove();

  // Create new navigation based on current heroMovies array
  createHeroIndicators();
  console.log(`🔄 Recreated hero indicators for ${heroMovies.length} items`);
}

/**
 * Initialize hero system with hover pause functionality
 */
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
// 8. HEADER NAVIGATION (Movies/Series Filter)
// ==========================

/**
 * Setup header navigation for filtering content
 */
document.addEventListener("DOMContentLoaded", function () {
  const homeBtn = document.querySelector(".header__nav-tittle:nth-child(1) a"); // Home (position 1)
  const moviesBtn = document.querySelector(".header__nav-tittle:nth-child(2) a"); // Movies (position 2)
  const seriesBtn = document.querySelector(".header__nav-tittle:nth-child(3) a"); // Series (position 3)

  console.log("🔧 Navigation buttons found:", { homeBtn, moviesBtn, seriesBtn });

  // MOVIES filter - show only movie content
  if (moviesBtn) {
    moviesBtn.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("🎬 Movies filter activated");

      // Update active navigation state
      document.querySelectorAll(".header__nav-tittle").forEach((item) => {
        item.classList.remove("header__nav-tittle--active");
      });
      this.parentElement.classList.add("header__nav-tittle--active");

      // Hide ALL series sections (including Digo Happy for movies mode)
      document.querySelectorAll(".gallery__container.series").forEach((section) => {
        if (!section.classList.contains("digohappy")) {
          section.style.display = "none";
        }
      });

      // Show "Digo Happy" section in Movies mode
      document.querySelectorAll(".gallery__container.digohappy").forEach((section) => {
        section.style.display = "block";
        console.log("✅ Showed Digo Happy section:", section);
      });

      // Show movie sections
      document
        .querySelectorAll(".gallery__container.marathon-section, .gallery__container-vertical, .gallery__container.top10")
        .forEach((section) => {
          section.style.display = "";
          console.log("✅ Showed movie section:", section);
        });

      // Switch to movies-only hero array
      heroMovies = moviesHeroMovies;
      clearInterval(heroInterval);
      currentHeroIndex = 0;

      // Recreate hero indicators for new array
      recreateHeroIndicators();
      updateHero(currentHeroIndex);
      restartHeroInterval();
      console.log(`🎬 Switched to movies hero with ${heroMovies.length} options`);
    });
  }

  // SERIES filter - show only series content
  if (seriesBtn) {
    seriesBtn.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("📺 Series filter activated");

      // Update active navigation state
      document.querySelectorAll(".header__nav-tittle").forEach((item) => {
        item.classList.remove("header__nav-tittle--active");
      });
      this.parentElement.classList.add("header__nav-tittle--active");

      // Hide non-series sections (movies, marathons, etc.)
      document
        .querySelectorAll(".gallery__container.marathon-section, .gallery__container-vertical, .gallery__container.top10")
        .forEach((section) => {
          section.style.display = "none";
          console.log("🚫 Hidden movie section:", section);
        });

      // Hide "Digo Happy" section when in Series mode
      document.querySelectorAll(".gallery__container.digohappy").forEach((section) => {
        section.style.display = "none";
        console.log("🚫 Hidden Digo Happy section:", section);
      });

      // Hide ALL original series carousels (non-dynamic ones)
      document.querySelectorAll(".gallery__container.series").forEach((section) => {
        // Hide if it's NOT a dynamic carousel and NOT digo happy
        if (!section.classList.contains("series-dynamic") && !section.classList.contains("digohappy")) {
          section.style.display = "none";
          console.log("🚫 Hidden original series section:", section);
        }
      });

      // Create dynamic series carousels when entering series mode
      createDynamicSeriesCarousels();

      // Show only the dynamic series carousels that were just created
      setTimeout(() => {
        document.querySelectorAll(".gallery__container.series-dynamic").forEach((section) => {
          section.style.display = "block";
          console.log("✅ Showed dynamic series section:", section);
        });
      }, 200);

      // Switch to series-only hero array
      heroMovies = seriesHeroMovies;
      clearInterval(heroInterval);
      currentHeroIndex = 0;

      // Recreate hero indicators for new array
      recreateHeroIndicators();
      updateHero(currentHeroIndex);
      restartHeroInterval();
      console.log(`📺 Switched to series hero with ${heroMovies.length} options`);
    });
  }

  // HOME button - reset to show all content
  if (homeBtn) {
    homeBtn.addEventListener("click", function (e) {
      if (window.location.pathname.endsWith("index.html")) {
        e.preventDefault();
        console.log("🏠 Home filter activated - showing all content");

        // Reset navigation active state
        document.querySelectorAll(".header__nav-tittle").forEach((item) => {
          item.classList.remove("header__nav-tittle--active");
        });
        this.parentElement.classList.add("header__nav-tittle--active");

        // Show basic sections (NOT the new categorized carousels)
        document
          .querySelectorAll(".gallery__container.top10, .gallery__container-vertical, .marathon-section")
          .forEach((section) => {
            section.style.display = "";
          });

        // Show only the original "Series" carousel and "Digo Happy" on HOME
        document.querySelectorAll(".gallery__container.series").forEach((section) => {
          if (!section.classList.contains("series-dynamic")) {
            section.style.display = "block";
          } else {
            section.style.display = "none";
          }
        });

        // Switch back to home hero array
        heroMovies = homeHeroMovies;
        clearInterval(heroInterval);
        currentHeroIndex = 0;

        // Recreate hero indicators for home array
        recreateHeroIndicators();
        updateHero(currentHeroIndex);
        restartHeroInterval();
        console.log(`🏠 Switched to home hero with ${heroMovies.length} options`);
      }
    });
  }
});

// ==========================
// 9. VERTICAL CAROUSEL CLICK-TO-CENTER FUNCTIONALITY
// ==========================

// Flag to prevent multiple simultaneous carousel movements
let isVerticalSplideMoving = false;

/**
 * Handle clicks on vertical carousel posters
 */
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

    if (window.verticalSplide && clickedSlide) {
      // Check if clicked slide is already centered (active)
      const isActive = clickedSlide.classList.contains("is-active");

      console.log("📍 Is slide already centered?", isActive);

      if (!isActive) {
        // Find the index of the clicked slide (excluding clones)
        const originalSlides = document.querySelectorAll(".splide-vertical .splide__slide:not(.splide__slide--clone)");
        let targetIndex = -1;

        originalSlides.forEach((slide, index) => {
          if (slide.querySelector(`img[data-movie="${movieKey}"]`)) {
            targetIndex = index;
          }
        });

        console.log("🎯 Target slide index found:", targetIndex);

        if (targetIndex !== -1) {
          // Set flag to prevent multiple movements
          isVerticalSplideMoving = true;

          // Move to the target slide
          window.verticalSplide.go(targetIndex);

          // Reset flag after movement completes
          setTimeout(() => {
            isVerticalSplideMoving = false;
            console.log("✅ Vertical carousel movement completed");

            // Now open the modal since slide is centered
            if (typeof openMovieModal === "function") {
              openMovieModal(movieKey);
            }
          }, 700); // Wait for slide transition to complete
        } else {
          console.warn("❌ Could not find target slide index");
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

// ==========================
// 10. DYNAMIC SERIES CAROUSELS SYSTEM
// ==========================

/**
 * Configuration for dynamic series carousels
 */
const seriesCarouselConfigs = [
  {
    id: "sitcoms-carousel",
    title: "Sitcoms",
    filter: (movie) => movie.categories && movie.categories.includes("sitcom"),
    containerClass: "series-dynamic",
  },
  {
    id: "reality-carousel",
    title: "Reality Shows",
    filter: (movie) => movie.categories && (movie.categories.includes("reality") || movie.categories.includes("competition")),
    containerClass: "series-dynamic",
  },
  {
    id: "marvel-carousel",
    title: "Marvel Universe",
    filter: (movie) => movie.categories && movie.categories.includes("marvel"),
    containerClass: "series-dynamic",
  },
  {
    id: "animation-carousel",
    title: "Animation",
    filter: (movie) => movie.categories && movie.categories.includes("animation"),
    containerClass: "series-dynamic",
  },
];

/**
 * Create dynamic series carousels based on filters
 */
function createDynamicSeriesCarousels() {
  console.log("🔧 Creating dynamic series carousels...");

  if (!window.moviesData) {
    console.warn("⚠️ Movie data not available for dynamic carousels");
    return;
  }

  // Find the first series container that is NOT digo happy and NOT dynamic
  const insertPoint = document.querySelector(".gallery__container.series:not(.digohappy):not(.series-dynamic)");
  if (!insertPoint) {
    console.warn("⚠️ Insert point not found for dynamic carousels");
    return;
  }

  // Clear existing dynamic carousels
  document.querySelectorAll(".gallery__container.series-dynamic").forEach((el) => {
    el.remove();
    console.log("🧹 Removed existing dynamic carousel");
  });

  seriesCarouselConfigs.forEach((config) => {
    // Filter series based on configuration
    const filteredSeries = [];

    for (const key in window.moviesData) {
      const movie = window.moviesData[key];
      if (config.filter(movie)) {
        filteredSeries.push({ key, ...movie });
      }
    }

    // Only create carousel if there are enough series
    if (filteredSeries.length === 0) {
      console.log(`📺 No series found for ${config.title}`);
      return;
    }

    // Create carousel HTML
    const carouselHTML = `
      <div class="gallery__container series ${config.containerClass}" data-carousel="${config.id}">
        <h2 class="gallery__title">${config.title}</h2>
        <div class="splide splide-simple" id="${config.id}">
          <div class="splide__track">
            <ul class="splide__list">
              ${filteredSeries
                .map(
                  (series) => `
                <li class="splide__slide">
                  <img
                    class="gallery__thumbnail open-movie-modal glow-img"
                    src="${series.poster}"
                    alt="${series.title}"
                    data-movie="${series.key}"
                  />
                </li>
              `
                )
                .join("")}
            </ul>
          </div>
        </div>
      </div>
    `;

    // Insert after the main carousel
    insertPoint.insertAdjacentHTML("afterend", carouselHTML);

    // Initialize Splide for this carousel
    setTimeout(() => {
      const splideElement = document.getElementById(config.id);
      if (splideElement) {
        new Splide(`#${config.id}`, {
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

        console.log(`✅ Dynamic carousel created: ${config.title} (${filteredSeries.length} series)`);
      }
    }, 100);
  });
}

// ==========================
// 11. FOOTER NAVIGATION LINKS
// ==========================

/**
 * Setup footer navigation links to trigger header navigation
 */
document.addEventListener("DOMContentLoaded", function () {
  const footerHome = document.getElementById("footer-home");
  const footerMovies = document.getElementById("footer-movies");
  const footerSeries = document.getElementById("footer-series");

  // Footer Home button
  if (footerHome) {
    footerHome.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("🏠 Footer Home clicked");

      // Trigger the header home button click
      const headerHomeBtn = document.querySelector(".header__nav-tittle:nth-child(1) a");
      if (headerHomeBtn) {
        headerHomeBtn.click();
        console.log("✅ Footer Home: Triggered header home navigation");
      }

      // Scroll to top smoothly
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Footer Movies button
  if (footerMovies) {
    footerMovies.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("🎬 Footer Movies clicked");

      // Trigger the header movies button click
      const headerMoviesBtn = document.querySelector(".header__nav-tittle:nth-child(2) a");
      if (headerMoviesBtn) {
        headerMoviesBtn.click();
        console.log("✅ Footer Movies: Triggered header movies navigation");
      }

      // Scroll to top smoothly
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Footer Series button
  if (footerSeries) {
    footerSeries.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("📺 Footer Series clicked");

      // Trigger the header series button click
      const headerSeriesBtn = document.querySelector(".header__nav-tittle:nth-child(3) a");
      if (headerSeriesBtn) {
        headerSeriesBtn.click();
        console.log("✅ Footer Series: Triggered header series navigation");
      }

      // Scroll to top smoothly
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  console.log("✅ Footer navigation links initialized");
});
