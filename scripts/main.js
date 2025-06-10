/**
 * =============================================================================
 * MATHFLIX MAIN APPLICATION CONTROLLER
 * =============================================================================
 *
 * This file manages the core functionality of the MathFlix application:
 * - Page loading animations and initial setup
 * - Splide carousel configurations for all content sections
 * - Header functionality including search, notifications, and profile menu
 * - Dynamic hero section with auto-rotation and content filtering
 * - Navigation system for Movies/Series filtering with tag-based content
 * - Vertical carousel click-to-center functionality
 * - Dynamic series carousel generation based on content categories
 * - Footer navigation integration
 *
 * Dependencies:
 * - Splide.js for carousel functionality
 * - movies.js for content data
 * - script.js for modal functionality
 *
 * =============================================================================
 */

// =============================================================================
// 1. PAGE INITIALIZATION
// =============================================================================

/**
 * Initialize page loading animation when DOM is ready
 * Adds smooth fade-in effect to improve user experience
 */
window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("page-loaded");
  console.log("Page loading animation initialized");
});

// =============================================================================
// 2. SPLIDE CAROUSEL SYSTEM
// =============================================================================

/**
 * Splide Breakpoint Configuration Reference:
 *
 * Splide uses max-width logic for responsive breakpoints:
 * - 480: Applies from 0px to 480px (Mobile devices)
 * - 768: Applies from 481px to 768px (Tablet devices)
 * - 1024: Applies from 769px to 1024px (Small laptops)
 * - 1440: Applies from 1025px to 1440px (Desktop monitors)
 * - BASE: Applies from 1441px and above (Large displays)
 *
 * Screen Size Categories:
 * - Mobile phones: 320px-480px
 * - Tablets: 481px-768px
 * - Small laptops: 769px-1024px
 * - Desktop/MacBook: 1025px-1440px
 * - Large displays: 1441px+
 */

/**
 * Initialize all Splide carousels with responsive configurations
 * Sets up Top 10 featured carousel, standard horizontal carousels,
 * vertical horror collection, and marathon carousels
 */
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    console.log("Initializing carousel system...");

    initializeTop10Carousel();
    initializeStandardCarousels();
    initializeVerticalCarousel();
    initializeMarathonCarousels();
  }, 100);
});

/**
 * Initialize the featured Top 10 carousel with auto-scroll
 * Features continuous auto-scroll on desktop, manual control on mobile
 */
function initializeTop10Carousel() {
  const top10Element = document.querySelector(".splide-top10");
  if (!top10Element) {
    console.error("Top 10 carousel element not found");
    return;
  }

  try {
    const top10Splide = new Splide(".splide-top10", {
      type: "loop",
      drag: "free",
      focus: "center",
      perPage: 5.5,
      gap: "4rem",
      autoScroll: {
        speed: 0.5,
        pauseOnHover: true,
        pauseOnFocus: false,
      },
      pagination: false,
      breakpoints: {
        480: {
          perPage: 1.8,
          gap: "1rem",
          autoScroll: false,
        },
        768: {
          perPage: 2.3,
          gap: "2rem",
          autoScroll: false,
        },
        1024: {
          perPage: 3,
          gap: "2rem",
        },
        1440: {
          perPage: 4,
          gap: "4rem",
        },
      },
    }).mount(window.splide.Extensions);

    console.log("Top 10 carousel initialized successfully");
  } catch (error) {
    console.error("Error initializing Top 10 carousel:", error);
  }
}

/**
 * Initialize standard horizontal carousels for regular content sections
 * Used for most movie and series collections throughout the site
 */
function initializeStandardCarousels() {
  document.querySelectorAll(".splide-simple").forEach((element) => {
    new Splide(element, {
      type: "loop",
      perPage: 5,
      perMove: 1,
      gap: "4rem",
      pagination: false,
      arrows: true,
      breakpoints: {
        480: {
          perPage: 2.5,
          gap: "1rem",
        },
        768: {
          perPage: 2.8,
          gap: "1.5rem",
        },
        1024: {
          perPage: 3.5,
          gap: "2rem",
        },
        1440: {
          perPage: 4.2,
          gap: "2.5rem",
        },
      },
    }).mount();
  });

  console.log("Standard carousels initialized");
}

/**
 * Initialize vertical carousel for horror movie collection
 * Features click-to-center functionality and vertical poster layout
 */
function initializeVerticalCarousel() {
  const verticalSplideElement = new Splide(".splide-vertical", {
    type: "loop",
    focus: "center",
    perPage: 4.5,
    gap: "4rem",
    pagination: false,
    arrows: true,
    autoWidth: false,
    trimSpace: false,
    speed: 600,
    easing: "ease",
    breakpoints: {
      480: {
        perPage: 2.5,
        gap: "1rem",
      },
      768: {
        perPage: 3.0,
        gap: "1.5rem",
      },
      1024: {
        perPage: 3.5,
        gap: "2rem",
      },
      1440: {
        perPage: 4.5,
        gap: "2.5rem",
      },
    },
  }).mount();

  // Store reference globally for click-to-center functionality
  window.verticalSplide = verticalSplideElement;
  console.log("Vertical carousel initialized");
}

/**
 * Initialize marathon carousels for movie franchise collections
 * Sets up dedicated carousels for Hunger Games, Harry Potter, Alien, etc.
 */
function initializeMarathonCarousels() {
  setTimeout(() => {
    const marathonConfigs = [
      { selector: ".splide-hungergames" },
      { selector: ".splide-harrypotter" },
      { selector: ".splide-alien" },
      { selector: ".splide-toystory" },
      { selector: ".splide-xmen" },
    ];

    marathonConfigs.forEach(({ selector }) => {
      const element = document.querySelector(selector);
      if (element) {
        new Splide(selector, {
          type: "loop",
          perMove: 1,
          perPage: 4.5,
          gap: "4rem",
          pagination: false,
          arrows: true,
          speed: 600,
          easing: "ease",
          breakpoints: {
            480: {
              perPage: 2.7,
              gap: "1rem",
            },
            768: {
              perPage: 3.2,
              gap: "1.5rem",
            },
            1024: {
              perPage: 3,
              gap: "3rem",
            },
            1440: {
              perPage: 3.5,
              gap: "4rem",
            },
          },
        }).mount();
        console.log("Marathon carousel mounted:", selector);
      }
    });
  }, 1500);
}

// =============================================================================
// 3. HEADER FUNCTIONALITY
// =============================================================================

/**
 * Handle search modal opening with proper focus management
 * Resets form state and positions cursor in search input
 *
 * @param {Event} e - Click event object
 */
function handleSearchClick(e) {
  console.log("Search button activated");
  if (e) e.preventDefault();

  const searchModal = document.getElementById("search-modal");
  if (!searchModal) return;

  searchModal.style.display = "flex";

  // Reset and focus search input
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.value = "";
    setTimeout(() => searchInput.focus(), 100);
  }

  // Reset search results display
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
 * Initialize all header button functionality including search, notifications, and profile menu
 * Sets up event listeners with proper cleanup and outside-click-to-close behavior
 */
function initializeHeaderButtons() {
  // Get all header elements
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

  // Search close button with proper cleanup
  if (searchClose && searchModal) {
    const newSearchClose = searchClose.cloneNode(true);
    searchClose.parentNode.replaceChild(newSearchClose, searchClose);

    newSearchClose.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      searchModal.style.display = "none";
      console.log("Search modal closed via close button");
    });
  }

  // Search modal - close when clicking outside
  if (searchModal) {
    searchModal.addEventListener("click", function (e) {
      if (e.target === searchModal || e.target.classList.contains("search-modal__backdrop")) {
        searchModal.style.display = "none";
        console.log("Search modal closed via outside click");
      }
    });
  }

  // Notification button with click-outside-to-close
  if (notificationBtn && notificationModal) {
    notificationBtn.onclick = () => {
      notificationModal.style.display = "flex";

      // Set up outside click listener
      const handleOutsideClick = function (event) {
        const modalContent = notificationModal.querySelector(".search-modal__content");
        if (modalContent && !modalContent.contains(event.target) && event.target !== notificationBtn) {
          notificationModal.style.display = "none";
          document.removeEventListener("click", handleOutsideClick);
        }
      };
      setTimeout(() => document.addEventListener("click", handleOutsideClick), 100);
    };
  }

  // Notification close button
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

      // Close menu
      if (isOpen) {
        profileMenu.style.display = "none";
        this.setAttribute("aria-expanded", "false");
      } else {
        // Open menu
        profileMenu.style.display = "block";
        this.setAttribute("aria-expanded", "true");

        // Setup outside click to close
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

  // Profile menu item clicks
  document.addEventListener("click", function (e) {
    const profileAction = e.target.closest("[data-action]");
    if (profileAction) {
      const action = profileAction.dataset.action;

      if (action === "profile") {
        const profileModal = document.getElementById("profile-modal");
        if (profileModal) {
          profileModal.style.display = "flex";
          profileMenu.style.display = "none";
        }
      } else if (action === "logout") {
        alert("Logout functionality would go here");
        profileMenu.style.display = "none";
      }
    }
  });

  // Profile modal close button
  const profileModal = document.getElementById("profile-modal");
  if (profileModal) {
    const profileClose = profileModal.querySelector(".profile-modal__close");
    if (profileClose) {
      profileClose.addEventListener("click", function () {
        profileModal.style.display = "none";
      });
    }

    // Close on backdrop click
    profileModal.addEventListener("click", function (e) {
      if (e.target === profileModal || e.target.classList.contains("profile-modal__backdrop")) {
        profileModal.style.display = "none";
      }
    });
  }
}

// Initialize header functionality after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(initializeHeaderButtons, 100);
});

// =============================================================================
// 4. HERO "SEE DETAILS" BUTTON HANDLER
// =============================================================================

/**
 * Setup hero "See Details" button functionality
 * Handles both regular movies/series and marathon collections
 * For marathons, triggers search functionality instead of direct modal
 */
document.addEventListener("DOMContentLoaded", function () {
  console.log("Setting up Hero See Details handler...");

  setTimeout(() => {
    const heroSeeDetailsBtn = document.querySelector(".hero__see-details-btn");

    if (!heroSeeDetailsBtn) {
      console.error("Hero See Details button not found");
      return;
    }

    heroSeeDetailsBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const key = this.dataset.movie;
      console.log("See Details clicked for:", key);

      if (!key) {
        console.error("No movie key found on See Details button");
        return;
      }

      // Find current hero in the array
      const currentHero = heroMovies.find((hero) => hero.key === key);

      if (!currentHero) {
        console.error("Hero not found in array for key:", key);
        return;
      }

      console.log("Hero type detected:", currentHero.type);

      if (currentHero.type === "marathon") {
        console.log("Marathon detected:", currentHero.title);
        handleMarathonDetails(key, currentHero);
      } else {
        // Handle regular movies/series
        console.log("Regular content detected:", key);
        handleRegularContentDetails(key);
      }
    });

    console.log("Hero See Details handler successfully attached");
  }, 2000);
});

/**
 * Handle marathon details by opening search modal with appropriate search term
 *
 * @param {string} key - Marathon key identifier
 * @param {Object} currentHero - Hero object data
 */
function handleMarathonDetails(key, currentHero) {
  const searchModal = document.getElementById("search-modal");
  const searchInput = document.getElementById("search-input");
  const searchSubmit = document.getElementById("search-submit");

  if (!searchModal || !searchInput || !searchSubmit) {
    console.error("Search modal elements not found");
    return;
  }

  // Show search modal
  searchModal.style.display = "flex";

  // Determine search term based on key
  let searchTerm = "";
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

  console.log("Search term determined:", searchTerm);

  // Set search term and focus
  searchInput.value = searchTerm;
  setTimeout(() => searchInput.focus(), 100);

  // Auto-trigger search
  setTimeout(() => {
    searchSubmit.click();
    console.log("Auto-triggered search for marathon");
  }, 400);

  console.log("Marathon search setup complete for:", currentHero.title);
}

/**
 * Handle regular content details by triggering modal directly
 *
 * @param {string} key - Content key identifier
 */
function handleRegularContentDetails(key) {
  const thumb = document.querySelector(`img[data-movie="${key}"]`);

  if (thumb) {
    thumb.click();
  } else if (typeof openMovieModal === "function") {
    // Fallback: open modal directly if available
    openMovieModal(key);
  }
}

// =============================================================================
// 5. DYNAMIC HERO SECTION SYSTEM
// =============================================================================

/**
 * Hero content database with tag-based filtering system
 * Each hero has tags that determine where it appears (home, movies, series)
 */
const allHeroMovies = [
  {
    key: "gonegirl",
    title: "GONE GIRL",
    background: "assets/hero-banner/mainly-ban-gonegirl.png",
    text: "Between false leads, buried secrets, and a truth that was always an illusion, Nick and Amy play a deadly game where no one is who they seem to be.",
    textHighlight: "In the end, the question remains: who really disappeared?",
    type: "movie",
    textColor: "light",
    tags: ["home", "movies"],
    desktopStyles: {
      title: { fontSize: "8.5rem", letterSpacing: "-2px" },
      text: { fontSize: "1.5rem", maxWidth: "425px", lineHeight: "1.3" },
      textBold: { fontSize: "1.4rem", maxWidth: "400px", fontWeight: "800" },
    },
  },
  {
    key: "arrival",
    title: "ARRIVAL",
    background: "assets/hero-banner/mainly-ban-arrival.png",
    text: "When mysterious spacecraft touch down across the globe, an elite team led by linguist Louise Banks is brought together to investigate.",
    textHighlight: "As mankind teeters on the verge of global war, Banks races against time to decipher their intent.",
    type: "movie",
    textColor: "light",
    tags: ["home", "movies"],
    desktopStyles: {
      title: { fontSize: "9rem", letterSpacing: "1px" },
      text: { fontSize: "1.7rem", maxWidth: "420px", lineHeight: "1.3" },
      textBold: { fontSize: "1.4rem", maxWidth: "400px" },
    },
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
    tags: ["home", "movies"],
    desktopStyles: {
      title: { fontSize: "7rem", letterSpacing: "-2px" },
      text: { fontSize: "1.6rem", maxWidth: "420px", lineHeight: "1.3" },
      textBold: { fontSize: "1.4rem", maxWidth: "400px", lineHeight: "1.3" },
    },
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
    tags: ["home", "series"],
    desktopStyles: {
      title: { fontSize: "6.5rem", letterSpacing: "-2px" },
      text: { fontSize: "1.6rem", maxWidth: "410px", lineHeight: "1.3" },
      textBold: { fontSize: "1.4rem", maxWidth: "390px", lineHeight: "1.3" },
    },
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
    tags: ["home", "movies"],
    desktopStyles: {
      title: { fontSize: "5.5rem", letterSpacing: "-2px" },
      text: { fontSize: "1.7rem", maxWidth: "500px", lineHeight: "1.4" },
      textBold: { fontSize: "1.4rem", maxWidth: "450px", lineHeight: "1.3" },
    },
  },
  // Movies-only content
  {
    key: "substance",
    title: "SUBSTANCE",
    background: "assets/hero-banner/mainly-ban-substance.png",
    text: "A revolutionary drug promises to transform lives, but its true effects blur the line between reality and identity.",
    textHighlight: "When transformation becomes addiction, who are you really beneath the surface?",
    type: "movie",
    textColor: "light",
    tags: ["movies"],
    desktopStyles: {
      title: { fontSize: "8rem", letterSpacing: "-1px" },
      text: { fontSize: "1.8rem", maxWidth: "450px", lineHeight: "1.4" },
      textBold: { fontSize: "1.5rem", maxWidth: "400px" },
    },
  },
  {
    key: "alien1",
    title: "ALIEN",
    background: "assets/hero-banner/mainly-ban-alien.png",
    text: "In space, no one can hear you scream. The crew of the Nostromo discovers a deadly alien life form that begins to hunt them down.",
    textHighlight: "A sci-fi horror classic that redefined the genre and introduced the iconic character Ellen Ripley.",
    type: "marathon",
    textColor: "light",
    tags: ["movies"],
    desktopStyles: {
      title: {
        fontSize: "12rem",
        letterSpacing: "10px",
        color: "#00ff00",
        textShadow: "0 0 20px rgba(0, 255, 0, 0.8), 0 0 40px rgba(0, 255, 0, 0.4)",
        fontFamily: "'Courier New', monospace",
      },
      text: { fontSize: "1.7rem", maxWidth: "450px" },
      textBold: { fontSize: "1.5rem", maxWidth: "420px" },
    },
  },
  // Series-only content
  {
    key: "rupaul",
    title: "RUPAUL'S DRAG RACE",
    background: "assets/hero-banner/mainly-ban-rupaul.png",
    text: "RuPaul's Drag Race is a reality competition show where drag queens compete in various challenges to become America's Next Drag Superstar.",
    textHighlight: "Drag queens battle in dazzling challenges of fashion, performance, and charisma to claim the crown.",
    type: "Reality Show",
    textColor: "light",
    tags: ["series"],
    desktopStyles: {
      title: { fontSize: "6.5rem", letterSpacing: "-2px" },
      text: { fontSize: "2rem", maxWidth: "500px", lineHeight: "1.4" },
      textBold: { fontSize: "1.5rem", maxWidth: "450px" },
    },
  },
  {
    key: "doctorwho",
    title: "DOCTOR WHO",
    background: "assets/hero-banner/mainly-ban-doctorwho.png",
    text: "A mysterious Time Lord known as the Doctor travels through space and time, saving civilizations and rewriting history in a blue police box.",
    textHighlight: "Time is a big ball of wibbly wobbly... timey wimey stuff.",
    type: "series",
    textColor: "light",
    tags: ["series"],
    desktopStyles: {
      title: { fontSize: "7rem", letterSpacing: "1px" },
      text: { fontSize: "1.6rem", maxWidth: "480px", lineHeight: "1.4" },
      textBold: { fontSize: "1.4rem", maxWidth: "420px", fontWeight: "700" },
    },
  },
  {
    key: "theoffice",
    title: "THE OFFICE",
    background: "assets/hero-banner/mainly-ban-theoffice.png",
    text: "A mockumentary-style sitcom that captures the hilarious daily lives and absurd antics of employees at Dunder Mifflin's Scranton branch.",
    textHighlight: "Bears. Beets. Battlestar Galactica.",
    type: "series",
    textColor: "light",
    tags: ["series"],
    desktopStyles: {
      title: { fontSize: "7rem", letterSpacing: "-1px", fontFamily: "'Arial Black', sans-serif" },
      text: { fontSize: "1.7rem", maxWidth: "480px", color: "#e0e0e0", lineHeight: "1.4" },
      textBold: { fontSize: "1.5rem", maxWidth: "420px", fontWeight: "700" },
    },
  },
  {
    key: "agatha",
    title: "AGATHA ALL ALONG",
    background: "assets/hero-banner/mainly-ban-agatha.png",
    text: "In a mysterious twist from the Marvel universe, Agatha Harkness returns with her own secrets, spells, and sinister plans.",
    textHighlight: "It's been Agatha all along... simple!",
    type: "series",
    textColor: "light",
    tags: ["series"],
    desktopStyles: {
      title: { fontSize: "6rem", letterSpacing: "-1px" },
      text: { fontSize: "1.7rem", maxWidth: "480px", lineHeight: "1.4" },
      textBold: { fontSize: "1.5rem", maxWidth: "420px", fontWeight: "700" },
    },
  },
];

/**
 * Filter hero movies by tag for different page contexts
 *
 * @param {string} tag - Tag to filter by ('home', 'movies', 'series')
 * @returns {Array} Filtered hero movies array
 */
function filterHeroMoviesByTag(tag) {
  return allHeroMovies.filter((movie) => movie.tags.includes(tag));
}

// Hero system state
let heroMovies = filterHeroMoviesByTag("home"); // Start with home content
let currentHeroIndex = 0;
let heroInterval = null;
let heroInitialized = false;

/**
 * Create navigation dots and arrow buttons for hero section
 * Generates interactive elements for manual hero navigation
 */
function createHeroIndicators() {
  const heroNavigation = document.createElement("div");
  heroNavigation.className = "hero-navigation";

  // Create indicator dots
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

  // Create navigation buttons
  const prevBtn = document.createElement("button");
  prevBtn.className = "hero-nav-btn hero-nav-prev";
  prevBtn.innerHTML = "&#10094;";
  prevBtn.addEventListener("click", () => {
    clearInterval(heroInterval);
    currentHeroIndex = (currentHeroIndex - 1 + heroMovies.length) % heroMovies.length;
    updateHero(currentHeroIndex);
    restartHeroInterval();
  });

  const nextBtn = document.createElement("button");
  nextBtn.className = "hero-nav-btn hero-nav-next";
  nextBtn.innerHTML = "&#10095;";
  nextBtn.addEventListener("click", () => {
    clearInterval(heroInterval);
    currentHeroIndex = (currentHeroIndex + 1) % heroMovies.length;
    updateHero(currentHeroIndex);
    restartHeroInterval();
  });

  // Add elements to hero content
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    heroContent.appendChild(heroNavigation);
    heroContent.appendChild(prevBtn);
    heroContent.appendChild(nextBtn);
  }
}

/**
 * Update hero content with smooth fade animation
 *
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

  if (!hero || !heroContent) return;

  // Update active indicator dot
  document.querySelectorAll(".hero-nav-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });

  // Start fade-out animation
  heroContent.classList.add("fade-out");

  setTimeout(() => {
    // Update content
    if (heroTitle) heroTitle.textContent = hero.title;
    if (heroText) heroText.textContent = hero.text;
    if (heroTextBold) heroTextBold.textContent = hero.textHighlight;
    if (heroTypeText) heroTypeText.textContent = hero.type.toUpperCase();
    if (heroButton) heroButton.dataset.movie = hero.key;

    // Update background with overlay gradients
    if (heroBackground) {
      heroBackground.style.background = `
        linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 20%, transparent 60%),
        linear-gradient(to bottom, transparent 80%, black 100%), 
        url("${hero.background}") top center / cover no-repeat`;
    }

    // Apply custom desktop styles
    applyDesktopHeroStyles(hero);

    // Start fade-in animation
    heroContent.classList.remove("fade-out");
    heroContent.classList.add("fade-in");

    setTimeout(() => {
      heroContent.classList.remove("fade-in");
    }, 800);
  }, 400);
}

/**
 * Apply custom desktop styles to hero elements
 *
 * @param {Object} hero - Hero object with desktopStyles property
 */
function applyDesktopHeroStyles(hero) {
  const isDesktop = window.matchMedia("(min-width: 1025px) and (max-width: 1440px)").matches;

  if (!isDesktop || !hero.desktopStyles) {
    clearCustomHeroStyles();
    return;
  }

  const heroTitle = document.querySelector(".hero__title");
  const heroText = document.querySelector(".hero__text:not(.hero__text-bold)");
  const heroTextBold = document.querySelector(".hero__text-bold");

  // Apply title styles
  if (hero.desktopStyles.title && heroTitle) {
    Object.entries(hero.desktopStyles.title).forEach(([property, value]) => {
      if (property === "fontSize") {
        heroTitle.style.setProperty("font-size", value, "important");
      } else {
        heroTitle.style[property] = value;
      }
    });

    // Handle gradient text effect
    if (hero.desktopStyles.title.background) {
      heroTitle.style.background = hero.desktopStyles.title.background;
      heroTitle.style.backgroundSize = hero.desktopStyles.title.backgroundSize || "200%";
      heroTitle.style.backgroundClip = "text";
      heroTitle.style.webkitBackgroundClip = "text";
      heroTitle.style.color = "transparent";
      heroTitle.style.webkitTextFillColor = "transparent";
    }
  }

  // Apply text styles
  if (hero.desktopStyles.text && heroText) {
    Object.entries(hero.desktopStyles.text).forEach(([property, value]) => {
      if (property === "fontSize" || property === "maxWidth") {
        heroText.style.setProperty(kebabCase(property), value, "important");
      } else {
        heroText.style[property] = value;
      }
    });
  }

  // Apply bold text styles
  if (hero.desktopStyles.textBold && heroTextBold) {
    Object.entries(hero.desktopStyles.textBold).forEach(([property, value]) => {
      if (property === "fontSize" || property === "maxWidth") {
        heroTextBold.style.setProperty(kebabCase(property), value, "important");
      } else {
        heroTextBold.style[property] = value;
      }
    });
  }

  console.log("Applied custom desktop styles for:", hero.title);
}

/**
 * Convert camelCase to kebab-case for CSS properties
 *
 * @param {string} str - CamelCase string
 * @returns {string} kebab-case string
 */
function kebabCase(str) {
  return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

/**
 * Clear custom hero styles and reset to CSS defaults
 */
function clearCustomHeroStyles() {
  const heroTitle = document.querySelector(".hero__title");
  const heroText = document.querySelector(".hero__text:not(.hero__text-bold)");
  const heroTextBold = document.querySelector(".hero__text-bold");

  [heroTitle, heroText, heroTextBold].forEach((element) => {
    if (element) {
      // Remove properties with important using removeProperty
      element.style.removeProperty("font-size");
      element.style.removeProperty("max-width");
      element.style.removeProperty("width");

      // Clear other properties
      const propertiesToClear = [
        "color",
        "textShadow",
        "letterSpacing",
        "fontFamily",
        "transform",
        "animation",
        "background",
        "backgroundSize",
        "backgroundClip",
        "webkitBackgroundClip",
        "webkitTextFillColor",
        "fontWeight",
        "fontStyle",
        "padding",
        "borderRadius",
        "border",
        "borderLeft",
        "lineHeight",
      ];

      propertiesToClear.forEach((prop) => {
        element.style[prop] = "";
      });
    }
  });
}

/**
 * Start hero rotation system with auto-interval
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
 * Recreate hero indicators when switching between page contexts
 */
function recreateHeroIndicators() {
  // Remove existing navigation elements
  const existingElements = [".hero-navigation", ".hero-nav-prev", ".hero-nav-next"];

  existingElements.forEach((selector) => {
    const element = document.querySelector(selector);
    if (element) element.remove();
  });

  // Create new navigation based on current heroMovies array
  createHeroIndicators();
  console.log("Recreated hero indicators for", heroMovies.length, "items");
}

/**
 * Initialize hero system with hover pause functionality
 */
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

    console.log("Hero system initialized");
  }
});

/**
 * Listen for screen size changes and reapply styles
 */
window.addEventListener("resize", () => {
  if (heroMovies && heroMovies[currentHeroIndex]) {
    applyDesktopHeroStyles(heroMovies[currentHeroIndex]);
  }
});

// =============================================================================
// 6. HEADER NAVIGATION SYSTEM
// =============================================================================

/**
 * Initialize header navigation for Movies/Series filtering
 * Sets up event listeners for navigation buttons and content filtering
 */
document.addEventListener("DOMContentLoaded", function () {
  const homeBtn = document.querySelector(".header__nav-tittle:nth-child(1) a");
  const moviesBtn = document.querySelector(".header__nav-tittle:nth-child(2) a");
  const seriesBtn = document.querySelector(".header__nav-tittle:nth-child(3) a");

  // Movies filter functionality
  if (moviesBtn) {
    moviesBtn.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Movies filter activated");

      updateNavigationState(this);
      showMoviesContent();
      switchHeroContext("movies");
    });
  }

  // Series filter functionality
  if (seriesBtn) {
    seriesBtn.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Series filter activated");

      updateNavigationState(this);
      showSeriesContent();
      switchHeroContext("series");
    });
  }

  // Home button functionality
  if (homeBtn) {
    homeBtn.addEventListener("click", function (e) {
      if (window.location.pathname.endsWith("index.html")) {
        e.preventDefault();
        console.log("Home filter activated");

        updateNavigationState(this);
        showHomeContent();
        switchHeroContext("home");
      }
    });
  }
});

/**
 * Update navigation state by highlighting active button
 *
 * @param {HTMLElement} activeButton - The clicked navigation button
 */
function updateNavigationState(activeButton) {
  document.querySelectorAll(".header__nav-tittle").forEach((item) => {
    item.classList.remove("header__nav-tittle--active");
  });
  activeButton.parentElement.classList.add("header__nav-tittle--active");
}

/**
 * Show movies-specific content and hide series content
 */
function showMoviesContent() {
  // Hide series sections except digo happy
  document.querySelectorAll(".gallery__container.series").forEach((section) => {
    if (!section.classList.contains("digohappy")) {
      section.style.display = "none";
    }
  });

  // Show movie-related sections
  document.querySelectorAll(".gallery__container.digohappy").forEach((section) => {
    section.style.display = "block";
  });

  document
    .querySelectorAll(".gallery__container.marathon-section, .gallery__container-vertical, .gallery__container.top10")
    .forEach((section) => {
      section.style.display = "";
    });
}

/**
 * Show series-specific content and hide movie content
 */
function showSeriesContent() {
  // Hide movie sections
  document
    .querySelectorAll(".gallery__container.marathon-section, .gallery__container-vertical, .gallery__container.top10")
    .forEach((section) => {
      section.style.display = "none";
    });

  document.querySelectorAll(".gallery__container.digohappy").forEach((section) => {
    section.style.display = "none";
  });

  // Hide non-dynamic series sections
  document.querySelectorAll(".gallery__container.series").forEach((section) => {
    if (!section.classList.contains("series-dynamic") && !section.classList.contains("digohappy")) {
      section.style.display = "none";
    }
  });

  // Create and show dynamic series carousels
  createDynamicSeriesCarousels();

  setTimeout(() => {
    document.querySelectorAll(".gallery__container.series-dynamic").forEach((section) => {
      section.style.display = "block";
    });
  }, 200);
}

/**
 * Show home content (default state)
 */
function showHomeContent() {
  // Show basic sections
  document.querySelectorAll(".gallery__container.top10, .gallery__container-vertical, .marathon-section").forEach((section) => {
    section.style.display = "";
  });

  // Show non-dynamic series sections, hide dynamic ones
  document.querySelectorAll(".gallery__container.series").forEach((section) => {
    if (!section.classList.contains("series-dynamic")) {
      section.style.display = "block";
    } else {
      section.style.display = "none";
    }
  });
}

/**
 * Switch hero context based on navigation selection
 *
 * @param {string} context - Context to switch to ('home', 'movies', 'series')
 */
function switchHeroContext(context) {
  heroMovies = filterHeroMoviesByTag(context);
  clearInterval(heroInterval);
  currentHeroIndex = 0;

  recreateHeroIndicators();
  updateHero(currentHeroIndex);
  restartHeroInterval();

  console.log("Switched to", context, "hero with", heroMovies.length, "options");
}

// =============================================================================
// 7. VERTICAL CAROUSEL CLICK-TO-CENTER FUNCTIONALITY
// =============================================================================

// Flag to prevent multiple simultaneous carousel movements
let isVerticalSplideMoving = false;

/**
 * Handle clicks on vertical carousel posters with click-to-center functionality
 * Centers clicked items before opening modal for better user experience
 */
document.addEventListener("click", function (e) {
  // Only process clicks on images within the vertical carousel
  if (e.target.tagName === "IMG" && e.target.closest(".splide-vertical")) {
    e.preventDefault();
    e.stopPropagation();

    // Ignore clicks if carousel is currently moving
    if (isVerticalSplideMoving) {
      console.log("Vertical carousel is moving, ignoring click");
      return;
    }

    const movieKey = e.target.dataset.movie;
    const clickedSlide = e.target.closest(".splide__slide");

    console.log("Clicked on vertical carousel item:", movieKey);

    if (window.verticalSplide && clickedSlide) {
      // Check if clicked slide is already centered (active)
      const isActive = clickedSlide.classList.contains("is-active");

      if (!isActive) {
        // Find the index of the clicked slide (excluding clones)
        const originalSlides = document.querySelectorAll(".splide-vertical .splide__slide:not(.splide__slide--clone)");
        let targetIndex = -1;

        originalSlides.forEach((slide, index) => {
          if (slide.querySelector(`img[data-movie="${movieKey}"]`)) {
            targetIndex = index;
          }
        });

        console.log("Target slide index found:", targetIndex);

        if (targetIndex !== -1) {
          // Set flag to prevent multiple movements
          isVerticalSplideMoving = true;

          // Move to the target slide
          window.verticalSplide.go(targetIndex);

          // Reset flag and open modal after movement completes
          setTimeout(() => {
            isVerticalSplideMoving = false;
            console.log("Vertical carousel movement completed");

            // Open modal since slide is now centered
            if (typeof openMovieModal === "function") {
              openMovieModal(movieKey);
            }
          }, 700);
        } else {
          console.warn("Could not find target slide index");
        }
      } else {
        // Slide is already centered - open modal immediately
        console.log("Slide already centered, opening modal immediately");
        if (typeof openMovieModal === "function") {
          openMovieModal(movieKey);
        }
      }
    }
  }
});

// =============================================================================
// 8. DYNAMIC SERIES CAROUSELS SYSTEM
// =============================================================================

/**
 * Configuration for dynamic series carousels
 * Defines how series are categorized and displayed
 */
const seriesCarouselConfigs = [
  {
    id: "weekend-binge-carousel",
    title: "To Watch in One Weekend",
    filter: (movie) => movie.categories && movie.categories.includes("weekend-serie"),
    containerClass: "series-dynamic",
  },
  {
    id: "cozy-comfort-carousel",
    title: "To Feel Cozy and Comfy",
    filter: (movie) => movie.categories && movie.categories.includes("cozy-serie"),
    containerClass: "series-dynamic",
  },
  {
    id: "endless-journey-carousel",
    title: "For the Endless Journey",
    filter: (movie) => movie.categories && movie.categories.includes("long-serie"),
    containerClass: "series-dynamic",
  },
];

/**
 * Create dynamic series carousels based on content categories
 * Generates carousels dynamically from movie database filtering
 */
function createDynamicSeriesCarousels() {
  console.log("Creating dynamic series carousels...");

  if (!window.moviesData) {
    console.warn("Movie data not available for dynamic carousels");
    return;
  }

  // Find insertion point
  const insertPoint = document.querySelector(".gallery__container.series:not(.digohappy):not(.series-dynamic)");
  if (!insertPoint) {
    console.warn("Insert point not found for dynamic carousels");
    return;
  }

  // Clear existing dynamic carousels
  document.querySelectorAll(".gallery__container.series-dynamic").forEach((el) => {
    el.remove();
  });

  // Create carousel elements first
  const carouselElements = [];

  seriesCarouselConfigs.forEach((config) => {
    // Filter series based on configuration
    const filteredSeries = [];

    for (const key in window.moviesData) {
      const movie = window.moviesData[key];
      if (config.filter(movie)) {
        filteredSeries.push({ key, ...movie });
      }
    }

    // Only create carousel if there are series
    if (filteredSeries.length === 0) {
      console.log("No series found for", config.title);
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

    // Create DOM element
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = carouselHTML;
    const carouselElement = tempDiv.firstElementChild;

    carouselElements.push({ element: carouselElement, config });
    console.log("Created carousel:", config.title, "with", filteredSeries.length, "series");
  });

  // Insert all carousels in correct order
  let currentInsertPoint = insertPoint;

  carouselElements.forEach(({ element, config }) => {
    currentInsertPoint.insertAdjacentElement("afterend", element);
    currentInsertPoint = element;
    console.log("Inserted carousel:", config.title);
  });

  // Initialize Splide for all carousels
  setTimeout(() => {
    carouselElements.forEach(({ config }) => {
      const splideElement = document.getElementById(config.id);
      if (splideElement) {
        new Splide(`#${config.id}`, {
          type: "loop",
          perPage: 5.5,
          perMove: 1,
          gap: "2rem",
          pagination: false,
          arrows: true,
          breakpoints: {
            480: { perPage: 1.8, gap: "1rem" },
            768: { perPage: 2.6, gap: "1.5rem" },
            1024: { perPage: 3.5, gap: "2rem" },
            1441: { perPage: 4.5, gap: "2rem" },
          },
        }).mount();

        console.log("Splide initialized for:", config.title);
      }
    });
  }, 100);
}

// =============================================================================
// 9. FOOTER NAVIGATION INTEGRATION
// =============================================================================

/**
 * Setup footer navigation links to trigger header navigation
 * Creates seamless navigation experience between header and footer
 */
document.addEventListener("DOMContentLoaded", function () {
  const footerHome = document.getElementById("footer-home");
  const footerMovies = document.getElementById("footer-movies");
  const footerSeries = document.getElementById("footer-series");

  // Footer Home button
  if (footerHome) {
    footerHome.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Footer Home clicked");
      triggerHeaderNavigation(1);
      scrollToTop();
    });
  }

  // Footer Movies button
  if (footerMovies) {
    footerMovies.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Footer Movies clicked");
      triggerHeaderNavigation(2);
      scrollToTop();
    });
  }

  // Footer Series button
  if (footerSeries) {
    footerSeries.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Footer Series clicked");
      triggerHeaderNavigation(3);
      scrollToTop();
    });
  }

  console.log("Footer navigation links initialized");
});

/**
 * Trigger header navigation button programmatically
 *
 * @param {number} buttonIndex - Index of header button to trigger (1=Home, 2=Movies, 3=Series)
 */
function triggerHeaderNavigation(buttonIndex) {
  const headerBtn = document.querySelector(`.header__nav-tittle:nth-child(${buttonIndex}) a`);
  if (headerBtn) {
    headerBtn.click();
    console.log("Triggered header navigation for button", buttonIndex);
  }
}

/**
 * Scroll to top of page smoothly
 */
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// =============================================================================
// 10. MOBILE MENU SYSTEM - VERSÃO FUNCIONAL
// =============================================================================

function initializeMobileMenu() {
  console.log("📱 Initializing mobile menu system...");

  if (window.innerWidth <= 768) {
    createMobileMenuElements();
    setupMobileMenuEventListeners();
    setupMobileMenuActions();
    setupMobileHeaderControls();
    setupBackupMobileControls();

    // Setup resize handler
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        const mobileOverlay = document.querySelector(".mobile-menu-overlay");
        if (mobileOverlay) mobileOverlay.classList.remove("active");
      }
    });

    console.log("✅ Mobile menu system initialized");
  }
}

/**
 * Create mobile menu DOM elements
 */
function createMobileMenuElements() {
  console.log("🔧 Creating mobile menu elements...");

  const header = document.querySelector(".header");
  if (!header) {
    console.error("❌ Header not found");
    return;
  }

  // Remove existing elements to prevent duplicates
  const existingToggle = document.querySelector(".mobile-menu-toggle");
  const existingOverlay = document.querySelector(".mobile-menu-overlay");

  if (existingToggle) existingToggle.remove();
  if (existingOverlay) existingOverlay.remove();

  // Show APENAS mobile search controls
  const mobileControls = document.querySelector(".mobile-header-controls");
  if (mobileControls && window.innerWidth <= 480) {
    mobileControls.style.display = "flex";
    console.log("✅ Mobile search controls activated");
  }

  // Create hamburger button
  const hamburger = document.createElement("button");
  hamburger.className = "mobile-menu-toggle";
  hamburger.setAttribute("aria-label", "Mobile menu");
  hamburger.innerHTML = `
    <span class="hamburger-line"></span>
    <span class="hamburger-line"></span>
    <span class="hamburger-line"></span>
  `;

  // Insert at beginning of header
  header.insertBefore(hamburger, header.firstChild);
  console.log("✅ Hamburger button created");

  // Create menu overlay (COM notification DENTRO do menu)
  const overlay = document.createElement("div");
  overlay.className = "mobile-menu-overlay";
  overlay.innerHTML = `
    <div class="mobile-menu-content">
      <!-- Logo MAIOR (120px) -->
      <div class="mobile-menu-logo">
        <img src="assets/icons/mathflix-logo.svg" alt="Mathflix">
      </div>
      
      <!-- Profile DISCRETO como botão -->
      <div class="mobile-menu-profile">
        <img src="assets/icons/mathflix-icon.svg" alt="Profile">
        <span>Math</span>
      </div>
      
      <!-- Navigation (SEM search) -->
      <nav class="mobile-menu-nav">
        <a href="#" id="mobile-home">Home</a>
        <a href="#" id="mobile-movies">Movies</a>
        <a href="#" id="mobile-series">Series</a>
      </nav>
      
      <!-- NOTIFICATION BUTTON DENTRO DO MENU -->
      <button class="mobile-menu-notification" id="mobile-menu-notification">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 16v-5a6 6 0 0 0-12 0v5"></path>
          <rect x="6" y="16" width="12" height="2" rx="1"></rect>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        <span>Notifications</span>
      </button>
      
      <!-- Logout no mesmo lugar -->
      <button class="mobile-menu-logout" id="mobile-logout">
        Logout
      </button>
    </div>
  `;

  document.body.appendChild(overlay);
  console.log("✅ Mobile overlay created (notification inside menu)");
}

/**
 * Setup mobile menu event listeners
 */
function setupMobileMenuEventListeners() {
  console.log("🔧 Setting up mobile menu event listeners...");

  const mobileToggle = document.querySelector(".mobile-menu-toggle");
  const mobileOverlay = document.querySelector(".mobile-menu-overlay");

  if (!mobileToggle || !mobileOverlay) {
    console.error("❌ Mobile menu elements not found");
    return;
  }

  // Main hamburger click
  mobileToggle.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    console.log("🍔 Hamburger clicked!");

    const isActive = mobileToggle.classList.contains("active");

    if (isActive) {
      closeMobileMenu();
    } else {
      // Open menu
      mobileToggle.classList.add("active");
      mobileOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
      console.log("📱 Mobile menu OPENED");
    }
  });

  // Close when clicking outside
  mobileOverlay.addEventListener("click", function (e) {
    if (e.target === mobileOverlay) {
      closeMobileMenu();
    }
  });

  console.log("✅ Mobile menu event listeners configured");
}

/**
 * Setup mobile menu action buttons
 */
function setupMobileMenuActions() {
  console.log("🔧 Setting up mobile menu actions...");

  // Profile discreto
  const mobileProfile = document.querySelector(".mobile-menu-profile");
  if (mobileProfile) {
    mobileProfile.addEventListener("click", () => {
      console.log("👤 Mobile profile clicked");
      closeMobileMenu();
      setTimeout(() => {
        const profileModal = document.getElementById("profile-modal");
        if (profileModal) {
          profileModal.style.display = "flex";
        } else {
          console.error("❌ Profile modal not found");
        }
      }, 300);
    });
    console.log("✅ Mobile profile connected");
  }

  // Notification DENTRO do menu
  const mobileNotification = document.getElementById("mobile-menu-notification");
  if (mobileNotification) {
    mobileNotification.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("🔔 Mobile menu notification clicked");

      closeMobileMenu();

      setTimeout(() => {
        console.log("🔔 Opening notification modal...");
        const notificationModal = document.getElementById("notification-modal");
        if (notificationModal) {
          notificationModal.style.display = "flex";
          console.log("✅ Notification modal opened successfully");
        } else {
          console.error("❌ Notification modal not found!");
        }
      }, 300);
    });
    console.log("✅ Mobile notification connected");
  }

  // Logout
  const mobileLogout = document.getElementById("mobile-logout");
  if (mobileLogout) {
    mobileLogout.addEventListener("click", () => {
      console.log("🚪 Mobile logout clicked");
      closeMobileMenu();
      setTimeout(() => {
        alert("Logout functionality would go here");
      }, 300);
    });
    console.log("✅ Mobile logout connected");
  }

  // Navigation links
  const mobileLinks = document.querySelectorAll(".mobile-menu-nav a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const action = e.target.id.replace("mobile-", "");
      console.log(`🔗 Mobile nav clicked: ${action}`);

      closeMobileMenu();

      // Trigger header navigation
      setTimeout(() => {
        const headerNavItems = document.querySelectorAll(".header__nav-tittle a");
        if (action === "home" && headerNavItems[0]) headerNavItems[0].click();
        if (action === "movies" && headerNavItems[1]) headerNavItems[1].click();
        if (action === "series" && headerNavItems[2]) headerNavItems[2].click();
        console.log(`✅ Triggered header navigation for: ${action}`);
      }, 300);
    });
  });

  console.log("✅ Mobile navigation connected");
}

/**
 * Setup mobile header controls (APENAS search no header)
 */
function setupMobileHeaderControls() {
  console.log("🔧 Setting up mobile header controls...");

  // Search button no header mobile
  const mobileSearchBtn = document.getElementById("mobile-header-search");
  if (mobileSearchBtn) {
    mobileSearchBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("🔍 Mobile header search clicked");

      // Abre o modal diretamente
      const searchModal = document.getElementById("search-modal");
      if (searchModal) {
        searchModal.style.display = "flex";
        const searchInput = document.getElementById("search-input");
        if (searchInput) {
          searchInput.value = "";
          setTimeout(() => searchInput.focus(), 100);
        }
        console.log("✅ Search modal opened from mobile header");
      } else {
        console.error("❌ Search modal not found!");
      }
    });
    console.log("✅ Mobile search button connected");
  } else {
    console.error("❌ Mobile search button not found!");
  }
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
  const mobileToggle = document.querySelector(".mobile-menu-toggle");
  const mobileOverlay = document.querySelector(".mobile-menu-overlay");

  if (mobileToggle && mobileOverlay) {
    mobileToggle.classList.remove("active");
    mobileOverlay.classList.remove("active");
    document.body.style.overflow = "";
    console.log("❌ Mobile menu closed");
  }
}

/**
 * BACKUP MOBILE CONTROLS - Se as outras funções falharem
 */
function setupBackupMobileControls() {
  console.log("🛡️ Setting up backup mobile controls...");

  // BACKUP Search
  document.addEventListener("click", function (e) {
    if (e.target.closest("#mobile-header-search")) {
      e.preventDefault();
      e.stopPropagation();
      console.log("🔍 BACKUP: Mobile search clicked");

      const searchModal = document.getElementById("search-modal");
      if (searchModal) {
        searchModal.style.display = "flex";
        const searchInput = document.getElementById("search-input");
        if (searchInput) {
          searchInput.value = "";
          setTimeout(() => searchInput.focus(), 100);
        }
        console.log("✅ BACKUP: Search modal opened");
      }
    }
  });

  // BACKUP Notification
  document.addEventListener("click", function (e) {
    if (e.target.closest("#mobile-menu-notification")) {
      e.preventDefault();
      e.stopPropagation();
      console.log("🔔 BACKUP: Mobile notification clicked");

      // Close mobile menu first
      const mobileOverlay = document.querySelector(".mobile-menu-overlay");
      const mobileToggle = document.querySelector(".mobile-menu-toggle");
      if (mobileOverlay && mobileToggle) {
        mobileToggle.classList.remove("active");
        mobileOverlay.classList.remove("active");
        document.body.style.overflow = "";
      }

      setTimeout(() => {
        const notificationModal = document.getElementById("notification-modal");
        if (notificationModal) {
          notificationModal.style.display = "flex";
          console.log("✅ BACKUP: Notification modal opened");
        }
      }, 300);
    }
  });

  console.log("✅ Backup mobile controls activated");
}

// ✅ MÚLTIPLAS INICIALIZAÇÕES para garantir que funcione
document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 DOM Ready - initializing mobile menu...");
  setTimeout(initializeMobileMenu, 100);
});

window.addEventListener("load", function () {
  console.log("🚀 Window Load - initializing mobile menu...");
  setTimeout(initializeMobileMenu, 200);
});

// ✅ BACKUP caso as outras falhem
setTimeout(() => {
  console.log("🚀 Timeout backup - initializing mobile menu...");
  initializeMobileMenu();
}, 1000);

console.log("✅ Mobile menu system loaded and ready");
// =============================================================================
// 11. SEARCH AUTOCOMPLETE & FUNCTIONALITY SYSTEM
// =============================================================================

/**
 * Initialize search autocomplete functionality
 */
(function initializeAutocomplete() {
  const searchInput = document.getElementById("search-input");

  if (!searchInput) {
    console.warn("⚠️ Search input not found for autocomplete");
    return;
  }

  // Create or get autocomplete dropdown element
  let searchAutocomplete = document.getElementById("search-autocomplete");
  if (!searchAutocomplete) {
    searchAutocomplete = document.createElement("ul");
    searchAutocomplete.id = "search-autocomplete";
    searchAutocomplete.className = "autocomplete-list";
    searchInput.parentNode.insertBefore(searchAutocomplete, searchInput.nextSibling);
    console.log("✅ Autocomplete dropdown created");
  }

  /**
   * Generate autocomplete suggestions as user types
   */
  searchInput.addEventListener("input", function () {
    const query = this.value.trim().toLowerCase();
    searchAutocomplete.innerHTML = "";

    // Don't show suggestions for empty queries
    if (!query || !window.moviesData) return;

    const suggestions = [];

    // Search through all movie data for matches
    for (const key in window.moviesData) {
      const movie = window.moviesData[key];

      // Check various movie properties for matches
      const searchCategories = [
        { field: movie.title, category: "Title" },
        { field: movie.director, category: "Director" },
        { field: movie.cast, category: "Actor", isArray: true },
        { field: movie.genre, category: "Genre", isArray: true },
      ];

      searchCategories.forEach(({ field, category, isArray }) => {
        if (!field) return;

        if (isArray) {
          field.forEach((item) => {
            if (item.toLowerCase().includes(query)) {
              suggestions.push({ label: item, category, key });
            }
          });
        } else {
          if (field.toLowerCase().includes(query)) {
            suggestions.push({ label: field, category, key });
          }
        }
      });
    }

    // Remove duplicate suggestions
    const uniqueSuggestions = [];
    const seenSuggestions = new Set();

    for (const suggestion of suggestions) {
      const suggestionId = suggestion.label + suggestion.category;
      if (!seenSuggestions.has(suggestionId)) {
        uniqueSuggestions.push(suggestion);
        seenSuggestions.add(suggestionId);
      }
    }

    // Display up to 8 suggestions
    uniqueSuggestions.slice(0, 8).forEach((suggestion) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `<span>${suggestion.label}</span><span class="autocomplete-category">${suggestion.category}</span>`;

      // Click handler for autocomplete suggestions
      listItem.addEventListener("click", function (event) {
        event.stopPropagation();
        searchInput.value = suggestion.label;
        searchAutocomplete.innerHTML = "";

        // Trigger search with selected suggestion
        const searchSubmit = document.getElementById("search-submit");
        if (searchSubmit) searchSubmit.click();
        console.log(`🔍 Autocomplete selected: ${suggestion.label} (${suggestion.category})`);
      });

      searchAutocomplete.appendChild(listItem);
    });
  });

  // Close autocomplete when clicking outside
  document.addEventListener("click", function (e) {
    if (searchAutocomplete && !searchAutocomplete.contains(e.target) && e.target !== searchInput) {
      searchAutocomplete.innerHTML = "";
    }
  });

  console.log("✅ Autocomplete system initialized");
})();

// =============================================================================
// 12. SEARCH & RANDOM MOVIE FUNCTIONALITY
// =============================================================================

(function initializeSearchSystem() {
  // Get search elements
  const searchSubmit = document.getElementById("search-submit");
  const searchInput = document.getElementById("search-input");
  const searchResult = document.getElementById("search-result");

  // Exit if search elements don't exist
  if (!searchSubmit || !searchInput || !searchResult) {
    console.warn("⚠️ Search elements not found");
    return;
  }

  /**
   * Render search results with pagination
   * @param {number} page - Page number to render
   */
  function renderSearchPage(page = 1) {
    // Ajustar quantidade por página baseado no tamanho da tela
    let perPage;
    const screenWidth = window.innerWidth;

    if (screenWidth <= 480) {
      perPage = 4; // Mobile: máximo 4 resultados (2x2)
    } else if (screenWidth <= 768) {
      perPage = 6; // Tablet: máximo 6 resultados (2x3 ou 3x2)
    } else {
      perPage = 8; // Desktop: máximo 8 resultados (4x2 ou 5x2)
    }

    const totalPages = Math.ceil(currentResults.length / perPage);
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const pageResults = currentResults.slice(start, end);

    // Ajustar container height baseado no número de resultados
    const searchResultContainer = document.getElementById("search-result");
    if (pageResults.length > 4 && screenWidth > 480) {
      searchResultContainer.classList.add("two-rows");
    } else {
      searchResultContainer.classList.remove("two-rows");
    }

    // Determinar colunas baseado no resultado e tamanho da tela
    let columns;

    if (screenWidth <= 480) {
      // Mobile: sempre 2 colunas máximo
      columns = pageResults.length === 1 ? 1 : 2;
    } else if (screenWidth <= 768) {
      // Tablet: até 3 colunas
      if (pageResults.length === 1) columns = 1;
      else if (pageResults.length === 2) columns = 2;
      else columns = 3;
    } else {
      // Desktop: lógica original
      const isLargeScreen = window.innerWidth >= 1600;
      if (pageResults.length === 1) {
        columns = 1;
      } else if (pageResults.length === 2) {
        columns = 2;
      } else if (pageResults.length === 3) {
        columns = 3;
      } else if (pageResults.length === 4) {
        columns = 4;
      } else {
        columns = isLargeScreen ? 5 : 4;
      }
    }

    // Gerar HTML dos resultados
    searchResult.innerHTML = `
      <div class="search-thumbs-wrapper">
        <div class="search-thumbs-grid" style="grid-template-columns: repeat(${columns}, 1fr); max-width: ${
      columns * 200 + (columns - 1) * 16
    }px;">
          ${pageResults
            .map(
              (movie) => `
                <div class="search-thumb-card">
                  <img class="search-thumb-img open-movie-modal" src="${movie.poster}" alt="${movie.title}" data-movie="${movie.key}" />
                  <div class="search-thumb-title">${movie.title}</div>
                  <button class="search-thumb-btn open-movie-modal" data-movie="${movie.key}">See Details</button>
                </div>
              `
            )
            .join("")}
        </div>
        ${
          totalPages > 1
            ? `<div class="search-pagination">
                <button ${page === 1 ? "disabled" : ""} id="search-prev">Previous</button>
                <span>Page ${page} of ${totalPages} (${currentResults.length} total)</span>
                <button ${page === totalPages ? "disabled" : ""} id="search-next">Next</button>
              </div>`
            : ""
        }
      </div>
    `;

    // Setup pagination click handlers
    if (totalPages > 1) {
      const prevBtn = document.getElementById("search-prev");
      const nextBtn = document.getElementById("search-next");

      if (prevBtn && !prevBtn.disabled) {
        prevBtn.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          currentPage--;
          renderSearchPage(currentPage);
        };
      }

      if (nextBtn && !nextBtn.disabled) {
        nextBtn.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          currentPage++;
          renderSearchPage(currentPage);
        };
      }
    }
  }

  /**
   * Main search functionality
   * Searches across multiple movie properties
   */
  searchSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    const query = searchInput.value.trim().toLowerCase();
    const randomHint = document.getElementById("search-random-hint");

    // Exit if no search query
    if (!query) {
      if (randomHint) randomHint.style.display = "none";
      return;
    }

    console.log(`🔍 Searching for: "${query}"`);

    // Easter Egg - show all movies
    if (query === "mathdigo") {
      currentResults = Object.keys(window.moviesData).map((key) => ({ ...window.moviesData[key], key }));
      console.log("🥚 Easter egg activated - showing all movies!");
    } else {
      // Regular search across multiple fields
      currentResults = [];
      for (const key in window.moviesData) {
        const movie = window.moviesData[key];

        // Search in multiple movie properties
        if (
          movie.title.toLowerCase().includes(query) ||
          (movie.director && movie.director.toLowerCase().includes(query)) ||
          (movie.origin && movie.origin.toLowerCase().includes(query)) ||
          (movie.year && movie.year.toString().includes(query)) ||
          (movie.genre && movie.genre.some((g) => g.toLowerCase().includes(query))) ||
          (movie.cast && movie.cast.some((a) => a.toLowerCase().includes(query)))
        ) {
          currentResults.push({ ...movie, key });
        }
      }
    }

    // Reset to first page and display results
    currentPage = 1;

    if (currentResults.length > 0) {
      renderSearchPage(currentPage);
      searchResult.style.display = "block";
      searchSubmit.style.display = "inline-block";
      if (randomHint) randomHint.style.display = "flex";
      console.log(`✅ Found ${currentResults.length} results`);
    } else {
      // No results found
      searchResult.textContent = "Sorry, we couldn't find that. \n Maybe try searching on our sibling Flix?";
      searchResult.style.display = "block";
      searchSubmit.style.display = "none";
      if (randomHint) randomHint.style.display = "flex";
      console.log("❌ No results found");
    }
  });

  // Allow Enter key to trigger search
  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      searchSubmit.click();
    }
  });

  console.log("✅ Search system initialized");
})();

/**
 * Search button click handler
 */
function handleSearchClick() {
  console.log("🔍 handleSearchClick called");
  const searchModal = document.getElementById("search-modal");
  if (searchModal) {
    searchModal.style.display = "flex";
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.value = "";
      setTimeout(() => searchInput.focus(), 100);
    }
    console.log("✅ Search modal opened");
  }
}

// Search button listeners
document.addEventListener("click", function (e) {
  if (e.target.id === "search-btn" || e.target.closest("#search-btn")) {
    e.preventDefault();
    e.stopPropagation();
    console.log("🔍 Search button clicked");
    handleSearchClick();
  }
});

// Close search modal when clicking outside (preserving internal functionality)
document.addEventListener("click", function (e) {
  const searchModal = document.getElementById("search-modal");
  if (searchModal && searchModal.style.display === "flex") {
    const searchModalContent = searchModal.querySelector(".search-modal__content");

    // Only close if clicked outside the modal content and not on search-related elements
    if (
      searchModalContent &&
      !searchModalContent.contains(e.target) &&
      e.target.id !== "search-btn" &&
      e.target.id !== "search-submit" &&
      !e.target.closest("#search-btn") &&
      !e.target.closest("#search-submit") &&
      !e.target.closest("#search-autocomplete")
    ) {
      searchModal.style.display = "none";
      console.log("❌ Search modal closed via outside click");
    }
  }
});

// =============================================================================
// 13. RANDOM MOVIE SYSTEM
// =============================================================================

/**
 * Random movie main function
 * Sorteia um filme e exibe modal com countdown
 */
function showRandomMovieCard() {
  console.log("🎲 showRandomMovieCard function called");

  if (!window.moviesData) {
    console.error("❌ Movie data not available!");
    return;
  }

  // Sortear filme UMA VEZ
  const movieKeys = Object.keys(window.moviesData);
  const randomKey = movieKeys[Math.floor(Math.random() * movieKeys.length)];
  const movieInfo = window.moviesData[randomKey];

  if (!movieInfo) {
    console.error("❌ Random movie not found!");
    return;
  }

  console.log(`🎲 Random movie selected: ${movieInfo.title} (key: ${randomKey})`);

  // Criar/obter modal
  let randomModal = document.getElementById("random-movie-modal");
  if (!randomModal) {
    randomModal = document.createElement("div");
    randomModal.id = "random-movie-modal";
    randomModal.className = "modal search-modal";
    randomModal.style.zIndex = "9999";
    randomModal.innerHTML = `
      <div class="modal__backdrop search-modal__backdrop"></div>
      <div class="modal__content search-modal__content" style="border: 2px solid #4aa042; background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);">
        <button id="random-close" class="modal__close" aria-label="Close">&times;</button>
        <div id="random-content" style="text-align: center; padding: 2rem;">
          <!-- Content será preenchido dinamicamente -->
        </div>
      </div>
    `;
    document.body.appendChild(randomModal);
    console.log("✅ Random modal created");
  }

  // Preencher conteúdo do modal
  const randomContent = document.getElementById("random-content");
  let countdown = 10;

  randomContent.innerHTML = `
    <div class="random-movie-container" style="gap: 1.5rem;">
      <div class="random-movie-title" style="color: #4caf50; font-size: 1.3rem; font-weight: bold;">
        Your random pick is:
      </div>
      <div style="color: #fff; font-size: 1.8rem; font-weight: bold; margin: 1rem 0;">
        ${movieInfo.title}
      </div>
      <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
        <button id="go-random-movie" class="random-movie-btn" data-movie-key="${randomKey}">
          Go to movie (${countdown}s)
        </button>
        <button id="reroll-random-movie" class="random-movie-btn" style="background: #222; border: 1.5px solid #4caf50;">
          Reroll
        </button>
      </div>
    </div>
  `;

  // Exibir modal
  randomModal.style.display = "flex";

  // Limpar timers anteriores
  if (window.randomMovieTimer) {
    clearInterval(window.randomMovieTimer);
    window.randomMovieTimer = null;
  }

  // Setup dos botões
  const goBtn = document.getElementById("go-random-movie");
  const rerollBtn = document.getElementById("reroll-random-movie");
  const closeBtn = document.getElementById("random-close");

  // Countdown timer
  window.randomMovieTimer = setInterval(() => {
    countdown--;
    if (goBtn) goBtn.textContent = `Go to movie (${countdown}s)`;

    if (countdown <= 0) {
      clearInterval(window.randomMovieTimer);
      window.randomMovieTimer = null;
      randomModal.style.display = "none";

      // Fechar search modal se estiver aberto
      const searchModal = document.getElementById("search-modal");
      if (searchModal) searchModal.style.display = "none";

      setTimeout(() => {
        openMovieModal(randomKey);
        console.log(`🎬 Auto-opened: ${movieInfo.title}`);
      }, 350);
    }
  }, 1000);

  // Eventos dos botões - INLINE para evitar conflitos
  if (goBtn) {
    goBtn.onclick = function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log(`🎬 Manual open: ${movieInfo.title} (key: ${randomKey})`);

      if (window.randomMovieTimer) {
        clearInterval(window.randomMovieTimer);
        window.randomMovieTimer = null;
      }

      randomModal.style.display = "none";
      const searchModal = document.getElementById("search-modal");
      if (searchModal) searchModal.style.display = "none";

      setTimeout(() => {
        openMovieModal(randomKey);
      }, 350);
    };
  }

  if (rerollBtn) {
    rerollBtn.onclick = function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log("🔄 Reroll clicked");

      if (window.randomMovieTimer) {
        clearInterval(window.randomMovieTimer);
        window.randomMovieTimer = null;
      }

      showRandomMovieCard(); // Nova tentativa
    };
  }

  if (closeBtn) {
    closeBtn.onclick = function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log("❌ Random modal closed manually");

      if (window.randomMovieTimer) {
        clearInterval(window.randomMovieTimer);
        window.randomMovieTimer = null;
      }

      randomModal.style.display = "none";
    };
  }

  // Fechar clicando no backdrop
  randomModal.onclick = function (e) {
    if (e.target === randomModal || e.target.classList.contains("search-modal__backdrop")) {
      if (window.randomMovieTimer) {
        clearInterval(window.randomMovieTimer);
        window.randomMovieTimer = null;
      }
      randomModal.style.display = "none";
      console.log("❌ Random modal closed via backdrop");
    }
  };

  console.log("✅ Random movie modal setup complete");
}

/**
 * Random movie event listeners
 */
// Listener principal - EXCLUINDO cliques dentro do modal
document.addEventListener("click", function (e) {
  // IGNORAR cliques dentro do random modal
  if (e.target.closest("#random-movie-modal")) {
    return;
  }

  // Detectar botões de random movie
  if (
    e.target.id === "random-movie-btn" ||
    e.target.id === "random-movie-btn-bottom" ||
    e.target.closest("#random-movie-btn") ||
    e.target.closest("#random-movie-btn-bottom") ||
    (e.target.classList.contains("random-movie-btn") && !e.target.closest("#random-movie-modal"))
  ) {
    e.preventDefault();
    e.stopPropagation();
    console.log("🎲 Random movie button clicked:", e.target.id || e.target.className);
    showRandomMovieCard();
  }
});

/**
 * Force setup de botões random quando página carregar
 */
window.addEventListener("load", function () {
  console.log("🔧 Force setting up random movie buttons...");

  // Setup direto nos botões existentes
  const randomButtons = document.querySelectorAll("#random-movie-btn, #random-movie-btn-bottom, .random-movie-btn");

  randomButtons.forEach((btn) => {
    if (btn && !btn.dataset.randomListenerAttached) {
      btn.dataset.randomListenerAttached = "true";

      btn.addEventListener("click", function (e) {
        // IGNORAR se clique for dentro do modal
        if (e.target.closest("#random-movie-modal")) {
          return;
        }

        e.preventDefault();
        e.stopPropagation();
        console.log("🎲 FORCE: Random button clicked");
        showRandomMovieCard();
      });

      console.log("✅ Force attached listener to:", btn.id || btn.className);
    }
  });

  console.log("✅ Random movie force setup completed");
});

/**
 * Função de teste
 */
window.testRandomMovie = function () {
  console.log("🧪 Testing random movie function...");
  if (typeof showRandomMovieCard === "function") {
    showRandomMovieCard();
    console.log("✅ Random movie function works!");
  } else {
    console.error("❌ showRandomMovieCard function not found!");
  }
};

console.log("✅ Search and Random movie systems initialized");

console.log("MathFlix Main Application Controller loaded successfully");

// =============================================================================
// 14. DYNAMIC CONTENT COUNTERS
// =============================================================================

/**
 * Count content statistics from movies database
 * Counts movies, series, and total content dynamically
 *
 * @returns {Object} Content statistics with movies, series, and total counts
 */
function getContentStatistics() {
  if (!window.moviesData) {
    console.warn("Movie data not available for statistics");
    return { movies: 0, series: 0, total: 0 };
  }

  let moviesCount = 0;
  let seriesCount = 0;

  // Count content by type
  for (const key in window.moviesData) {
    const movie = window.moviesData[key];

    // Check if it's a series (multiple ways to detect)
    const isSeries =
      movie.type === "series" ||
      movie.type === "Serie" ||
      movie.type === "Reality Show" ||
      (movie.categories &&
        movie.categories.some((cat) => cat.includes("serie") || cat.includes("series") || cat.includes("tv"))) ||
      // Check if title suggests it's a series
      movie.title.toLowerCase().includes("season") ||
      movie.title.toLowerCase().includes("temporada") ||
      // Known series from our database
      ["rupaul", "simpsons", "howmetyourmother", "howmetyourfather", "agatha", "wandavision", "theoffice", "doctorwho"].includes(
        key
      );

    if (isSeries) {
      seriesCount++;
    } else {
      moviesCount++;
    }
  }

  const total = moviesCount + seriesCount;

  console.log("Content Statistics:", {
    movies: moviesCount,
    series: seriesCount,
    total: total,
  });

  return {
    movies: moviesCount,
    series: seriesCount,
    total: total,
  };
}

/**
 * Update profile statistics with real content counts
 * Updates the profile modal with dynamic counts from database
 */
function updateProfileStatistics() {
  const stats = getContentStatistics();

  // Update profile modal elements
  const moviesElement = document.getElementById("profile-movies-watched");
  const seriesElement = document.getElementById("profile-series-watched");
  const totalElement = document.getElementById("profile-total-content");

  if (moviesElement) {
    moviesElement.textContent = stats.movies;
    console.log("Updated movies count:", stats.movies);
  }

  if (seriesElement) {
    seriesElement.textContent = stats.series;
    console.log("Updated series count:", stats.series);
  }

  if (totalElement) {
    totalElement.textContent = stats.total;
    console.log("Updated total count:", stats.total);
  }
}

/**
 * Initialize content statistics when page loads
 * Sets up automatic counting and updates profile when opened
 */
function initializeContentStatistics() {
  // Update immediately if movie data is already available
  if (window.moviesData) {
    updateProfileStatistics();
  }

  // Also update when profile modal is opened
  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-action='profile']") || e.target.closest(".mobile-menu-profile")) {
      setTimeout(() => {
        updateProfileStatistics();
      }, 100);
    }
  });

  console.log("✅ Content statistics system initialized");
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  // Delay to ensure movie data is loaded
  setTimeout(() => {
    initializeContentStatistics();
  }, 1000);
});

// Also initialize when window loads as backup
window.addEventListener("load", function () {
  setTimeout(() => {
    updateProfileStatistics();
  }, 1500);
});

/**
 * Global function to manually update statistics (for testing)
 */
window.updateStats = function () {
  updateProfileStatistics();
  const stats = getContentStatistics();
  console.log("Manual stats update:", stats);
  return stats;
};
