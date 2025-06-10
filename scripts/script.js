/**
 *
 * This file manages the core interactive functionality of the MathFlix application:
 * - User authentication and privilege management
 * - Movie modal system with dual layout support (horizontal/vertical)
 * - Rating and comment system with admin controls
 * - Modal event handling and ESC key management
 * - LocalStorage data persistence for ratings and comments
 * - Responsive layout switching for different screen sizes
 *
 * =============================================================================
 * SECTIONS OVERVIEW:
 * =============================================================================
 *
 * 1.  GLOBAL VARIABLES & CONFIGURATIONS
 *     - Admin privilege checking and user role management
 *     - Movie key tracking and layout configuration
 *     - Search pagination state management
 *     - Vertical movies list for horror collection layout
 *
 * 2.  LOCALSTORAGE MANAGEMENT
 *     - Movie data persistence (ratings and comments)
 *     - Cross-session data preservation
 *     - Safe error handling for storage operations
 *
 * 3.  MOVIE MODAL SYSTEM
 *     - Global click handler with event delegation
 *     - Modal opening with metadata population
 *     - Dual layout system (horizontal/vertical) selection
 *     - Responsive media handling and toggle functionality
 *     - Modal closing and resource cleanup
 *     - Event listener management and duplicate prevention
 *     - ESC key handling for all modals with priority system
 *     - MutationObserver for automatic listener setup
 *
 * 4.  MOVIE RANKING & COMMENT SYSTEM
 *     - Complete star rating interface (1-5 stars)
 *     - Admin-only editing with visual feedback for all users
 *     - Comment button and preview system
 *     - Character-limited comment editing (300 chars)
 *     - Read-only mode for non-admin users
 *     - Robust comment popup creation and management
 *     - Event delegation for dynamically created elements
 *     - Testing and debugging functions for development
 *
 * =============================================================================
 * USER PRIVILEGE SYSTEM:
 * =============================================================================
 *
 * Admin Users (can edit):
 * - Username: "mathdigo"
 * - Can modify star ratings (1-5 stars)
 * - Can add/edit comments (up to 300 characters)
 * - Changes are saved to localStorage immediately
 *
 * Regular Users (read-only):
 * - Can view all ratings and comments
 * - Star ratings appear interactive but clicks are ignored
 * - Comment popups open in read-only mode
 * - No data modification capabilities
 *
 * =============================================================================
 * LAYOUT SYSTEM:
 * =============================================================================
 *
 * Horizontal Layout:
 * - Desktop: Side-by-side poster and trailer display
 * - Mobile/Tablet: Toggle between poster and trailer with button
 * - Used for most movies in the database
 *
 * Vertical Layout:
 * - Portrait poster with toggle functionality
 * - Optimized for vertical poster presentation
 * - Toggle button to switch between poster and trailer
 *
 * Mobile Responsiveness:
 * - ≤768px: Toggle buttons for media switching
 * - >768px: Side-by-side display for horizontal layout
 *
 * =============================================================================
 * MODAL MANAGEMENT:
 * =============================================================================
 *
 * Priority System for ESC Key:
 * 1. Movie Modal (highest priority)
 * 2. Search Modal
 * 3. Notification Modal
 * 4. Other utility modals
 * 5. Profile menu dropdown (lowest priority)
 *
 * Event Handling:
 * - Global event delegation for performance
 * - Automatic listener cleanup to prevent memory leaks
 * - MutationObserver for dynamic content handling
 * - Backdrop click detection for modal closing
 * - Resource cleanup (video stopping) on modal close
 *
 * =============================================================================
 * DEPENDENCIES:
 * =============================================================================
 *
 * External Dependencies:
 * - LocalStorage API for data persistence
 * - MutationObserver API for DOM monitoring
 * - MouseEvent API for event simulation
 *
 * Internal Dependencies:
 * - movies.js - Complete movie database (window.moviesData)
 * - main.js - Carousel system and navigation
 * - main-sections.css - Modal styling and responsive design
 *
 * Global Variables Created:
 * - window.closeMovieModal - Modal closing function
 * - window.testCommentSystem - Testing and debugging
 * - window.simulateCommentClick - Development testing
 * - window.showCommentBox - Comment popup display
 * - window.handleStarClick - Star rating handler
 * - window.ensureCommentPopupExists - Popup creation
 *
 * Global Variables Used:
 * - currentMovieKey - Currently displayed movie
 * - isAdminUser - Current user admin status
 * - currentPage - Search pagination state
 * - currentResults - Search results array
 * - verticalMovies - Array of movies using vertical layout
 *
 * =============================================================================
 * PERFORMANCE OPTIMIZATIONS:
 * =============================================================================
 *
 * - Event delegation for dynamic content handling
 * - Listener deduplication with dataset flags
 * - Resource cleanup (video stopping) on modal close
 * - Lazy popup creation only when needed
 * - Efficient DOM queries with element caching
 * - Memory leak prevention with proper event cleanup
 * - MutationObserver for automatic setup of dynamic elements
 *
 * =============================================================================
 * TESTING & DEBUGGING:
 * =============================================================================
 *
 * Available Console Functions:
 * - window.testCommentSystem() - Complete system verification
 * - window.simulateCommentClick() - Test event delegation
 * - checkAdminUser() - Verify user privileges
 * - getCurrentMovieData() - Debug current movie state
 *
 * Development Features:
 * - Comprehensive console logging for all operations
 * - Error handling with fallback behaviors
 * - State verification at critical points
 * - Manual testing functions for quality assurance
 *
 * =============================================================================
 * VERSION: 2.0 - Production Ready Release
 * LAST UPDATED: June 10, 2025
 * =============================================================================
 */

// =============================================================================
// 1. GLOBAL VARIABLES & CONFIGURATIONS
// =============================================================================

/**
 * Check if current user has administrator privileges
 * Admin users can edit ratings and comments, regular users have read-only access
 *
 * @returns {boolean} True if user is admin, false otherwise
 */
function checkAdminUser() {
  try {
    const currentUser = localStorage.getItem("mathflix_current_user");
    const userRole = localStorage.getItem("mathflix_role");

    console.log("Admin check:", { user: currentUser, role: userRole });

    // Admin if user is "mathdigo" OR role is "admin"
    const isAdmin = currentUser === "mathdigo" || userRole === "admin";

    console.log("Admin status:", isAdmin);
    return isAdmin;
  } catch (error) {
    console.warn("Error checking admin privileges:", error);
    return false;
  }
}

// Current admin status - updated dynamically when needed
let isAdminUser = checkAdminUser();

// Current movie key being displayed in modal
let currentMovieKey = null;

// List of movies that use vertical poster layout in modal (horror collection)
const verticalMovies = ["screen", "chucky", "tifannychucky", "seedschucky", "substance"];

// Search pagination state
let currentPage = 1;
let currentResults = [];

// =============================================================================
// 2. LOCALSTORAGE MANAGEMENT
// =============================================================================

/**
 * Save movie data (rankings and comments) to localStorage
 * Preserves user ratings and comments across sessions
 *
 * @param {string} movieKey - Unique identifier for the movie
 * @param {Object} data - Movie data object containing rankings and comments
 */
function saveMovieData(movieKey, data) {
  try {
    const existingData = JSON.parse(localStorage.getItem("mathflix_movies")) || {};
    existingData[movieKey] = data;
    localStorage.setItem("mathflix_movies", JSON.stringify(existingData));
    console.log("Saved data for movie:", movieKey, data);
  } catch (error) {
    console.warn("Error saving movie data:", error);
  }
}

/**
 * Load saved movie data (rankings and comments) from localStorage
 * Retrieves previously saved user ratings and comments
 *
 * @param {string} movieKey - Unique identifier for the movie
 * @returns {Object|null} Saved movie data or null if not found
 */
function getSavedMovieData(movieKey) {
  try {
    const savedData = JSON.parse(localStorage.getItem("mathflix_movies")) || {};
    return savedData[movieKey] || null;
  } catch (error) {
    console.warn("Error loading saved data:", error);
    return null;
  }
}

// =============================================================================
// 3. MOVIE MODAL SYSTEM
// =============================================================================

/**
 * Global click handler for movie modal triggers
 * Uses event delegation for better performance and handles all modal opening clicks
 * Excludes vertical carousel clicks which are handled by main.js
 */
document.addEventListener("click", function (e) {
  // Exclude vertical carousel clicks - handled by main.js click-to-center functionality
  if (e.target.closest(".splide-vertical")) {
    return;
  }

  // Check if clicked element triggers movie modal
  const target = e.target.closest(".open-movie-modal");
  if (target && target.dataset.movie) {
    e.preventDefault();
    openMovieModal(target.dataset.movie);
  }
});

/**
 * Open movie modal with complete movie information
 * Handles both horizontal and vertical poster layouts based on movie type
 * Populates modal with metadata, sets up layout, and initializes rating system
 *
 * @param {string} key - Movie key to display from moviesData database
 */
function openMovieModal(key) {
  const movieInfo = window.moviesData[key];
  if (!movieInfo) {
    console.error("Movie not found:", key);
    return;
  }

  console.log("Opening modal for:", movieInfo.title);
  const movieModal = document.getElementById("movie-modal");

  // Update admin status when opening modal
  isAdminUser = checkAdminUser();
  console.log("Modal opened - Admin status:", isAdminUser);

  // Generate clickable genre buttons for filtering
  const genresHtml = movieInfo.genre
    .map((genre) => `<button class="movie-genre" data-genre="${genre}">${genre}</button>`)
    .join(", ");

  // Populate modal with movie metadata
  document.getElementById("movie-modal-title").textContent = movieInfo.title;
  document.getElementById("movie-modal-meta").innerHTML = `
    <li><strong>Year:</strong> <span>${movieInfo.year}</span></li>
    <li><strong>Age Rating:</strong> <span>${movieInfo.age}</span></li>
    <li><strong>Duration:</strong> <span>${movieInfo.duration}</span></li>
    <li><strong>Origin:</strong> <span>${movieInfo.origin}</span></li>
    <li><strong>Locations:</strong> <span>${
      Array.isArray(movieInfo.locations) ? movieInfo.locations.join(" / ") : movieInfo.locations
    }</span></li>
    <li><strong>Director:</strong> <span>${movieInfo.director}</span></li>
    <li><strong>Cast:</strong> <span>${movieInfo.cast.join(", ")}</span></li>
    <li><strong>Genre:</strong> ${genresHtml}</li>
  `;
  document.getElementById("movie-modal-description").textContent = movieInfo.description;

  // Determine layout type based on movie key
  const isVerticalMovie = verticalMovies.includes(key);

  if (isVerticalMovie) {
    setupVerticalLayout(movieInfo);
  } else {
    setupHorizontalLayout(movieInfo);
  }

  // Initialize ranking system for this movie
  currentMovieKey = key;
  renderRanking(currentMovieKey);

  // Display modal with high z-index
  movieModal.style.display = "flex";
  movieModal.style.zIndex = "10000";

  // Setup event listeners and spoiler system after modal is displayed
  setTimeout(() => {
    setupModalEventListeners();

    // Initialize spoiler functionality if available
    if (window.setupModalSpoiler) {
      console.log("Setting up spoiler for:", key);
      window.setupModalSpoiler(key);
    } else {
      console.error("setupModalSpoiler function not found");
    }
  }, 200);

  console.log("Modal display completed");
}

/**
 * Setup vertical layout for horror collection movies
 * Uses portrait poster with toggle button to switch between poster and trailer
 * Optimized for vertical poster presentation
 *
 * @param {Object} movieInfo - Movie information object from database
 */
function setupVerticalLayout(movieInfo) {
  console.log("Setting up vertical layout for:", movieInfo.title);

  // Hide horizontal layout and show vertical layout
  const horizontalMedia = document.querySelector(".movie-modal__media");
  const verticalMedia = document.querySelector(".movie-modal__media-vertical");

  if (horizontalMedia) {
    horizontalMedia.style.display = "none";
    console.log("Hidden horizontal layout");
  }
  if (verticalMedia) {
    verticalMedia.style.display = "flex";
    console.log("Showed vertical layout");
  }

  // Configure vertical poster and trailer elements
  const verticalPoster = document.getElementById("vertical-modal-poster");
  const verticalTrailer = document.getElementById("vertical-modal-trailer");

  if (verticalPoster) {
    verticalPoster.src = movieInfo.poster;
    verticalPoster.alt = movieInfo.title;
    verticalPoster.style.display = "block";
  }

  if (verticalTrailer) {
    verticalTrailer.src = movieInfo.trailer;
    verticalTrailer.style.display = "none";
  }

  // Setup toggle button for switching between poster and trailer
  const verticalToggleBtn = document.getElementById("toggle-vertical-media");
  if (verticalToggleBtn) {
    verticalToggleBtn.textContent = "See Trailer";
    verticalToggleBtn.style.display = "block";

    // Clear any existing event listeners
    verticalToggleBtn.onclick = null;

    // Setup toggle functionality
    verticalToggleBtn.onclick = function () {
      const poster = document.getElementById("vertical-modal-poster");
      const trailer = document.getElementById("vertical-modal-trailer");

      if (poster && trailer) {
        if (poster.style.display !== "none") {
          // Switch to trailer
          poster.style.display = "none";
          trailer.style.display = "block";
          this.textContent = "See Poster";
        } else {
          // Switch to poster
          poster.style.display = "block";
          trailer.style.display = "none";
          this.textContent = "See Trailer";
        }
      }
    };
  }
}

/**
 * Setup horizontal layout for standard movies
 * Desktop: Shows poster and trailer side by side
 * Mobile/Tablet: Shows toggle button to switch between poster and trailer
 *
 * @param {Object} movieInfo - Movie information object from database
 */
function setupHorizontalLayout(movieInfo) {
  console.log("Setting up horizontal layout for:", movieInfo.title);

  const isMobileOrTablet = window.innerWidth <= 768;

  // Hide vertical layout and show horizontal layout
  const horizontalMedia = document.querySelector(".movie-modal__media");
  const verticalMedia = document.querySelector(".movie-modal__media-vertical");

  if (verticalMedia) {
    verticalMedia.style.display = "none";
    console.log("Hidden vertical layout");
  }
  if (horizontalMedia) {
    horizontalMedia.style.display = "flex";
    console.log("Showed horizontal layout");
  }

  if (isMobileOrTablet) {
    // Mobile/Tablet: Compact layout with toggle functionality
    const poster = document.getElementById("movie-modal-poster");
    const trailer = document.getElementById("movie-modal-trailer");
    const trailerContainer = document.querySelector(".movie-modal__trailer");

    if (poster && trailer) {
      poster.src = movieInfo.poster;
      poster.alt = movieInfo.title;
      trailer.src = movieInfo.trailer;

      // Show poster by default, hide trailer
      poster.style.display = "block";
      if (trailerContainer) trailerContainer.style.display = "none";
    }

    // Create or get toggle button for mobile/tablet
    let toggleBtn = document.querySelector(".movie-modal__media .movie-modal__toggle-btn");
    if (!toggleBtn) {
      toggleBtn = document.createElement("button");
      toggleBtn.className = "movie-modal__toggle-btn";
      if (horizontalMedia) horizontalMedia.appendChild(toggleBtn);
    }

    if (toggleBtn) {
      toggleBtn.textContent = "See Trailer";
      toggleBtn.style.display = "block";

      // Clear existing event listeners
      toggleBtn.onclick = null;

      // Setup toggle functionality for mobile/tablet
      toggleBtn.onclick = function () {
        const poster = document.getElementById("movie-modal-poster");
        const trailerContainer = document.querySelector(".movie-modal__trailer");

        if (poster && trailerContainer) {
          if (poster.style.display !== "none") {
            // Switch to trailer
            poster.style.display = "none";
            trailerContainer.style.display = "block";
            this.textContent = "See Poster";
          } else {
            // Switch to poster
            poster.style.display = "block";
            trailerContainer.style.display = "none";
            this.textContent = "See Trailer";
          }
        }
      };
    }
  } else {
    // Desktop: Side-by-side layout showing both poster and trailer
    const poster = document.getElementById("movie-modal-poster");
    const trailer = document.getElementById("movie-modal-trailer");
    const trailerContainer = document.querySelector(".movie-modal__trailer");

    if (poster && trailer) {
      poster.src = movieInfo.poster;
      poster.alt = movieInfo.title;
      trailer.src = movieInfo.trailer;

      // Show both elements side by side on desktop
      poster.style.display = "block";
      if (trailerContainer) trailerContainer.style.display = "block";
    }

    // Hide toggle button on desktop for horizontal movies
    const toggleBtn = document.querySelector(".movie-modal__media .movie-modal__toggle-btn");
    if (toggleBtn) toggleBtn.style.display = "none";
  }
}

/**
 * Close movie modal and cleanup resources
 * Stops video trailers to save bandwidth and restore focus if needed
 */
function closeMovieModal() {
  console.log("closeMovieModal called");

  const movieModal = document.getElementById("movie-modal");
  if (movieModal) {
    movieModal.style.display = "none";

    // Stop all video trailers to save bandwidth
    const trailer = document.getElementById("movie-modal-trailer");
    const verticalTrailer = document.getElementById("vertical-modal-trailer");
    if (trailer) trailer.src = "";
    if (verticalTrailer) verticalTrailer.src = "";

    console.log("Movie modal closed and cleaned up");

    // Restore focus to search input if search modal was open before movie modal
    const searchModal = document.getElementById("search-modal");
    if (searchModal && searchModal.style.display === "flex") {
      const searchInput = document.getElementById("search-input");
      if (searchInput) {
        setTimeout(() => searchInput.focus(), 100);
      }
    }
  }
}

// Make closeMovieModal globally available for HTML onclick attributes
window.closeMovieModal = closeMovieModal;

// Backup global assignment for compatibility
if (typeof globalThis !== "undefined") {
  globalThis.closeMovieModal = closeMovieModal;
}

console.log("closeMovieModal function made globally available");

/**
 * Setup modal event listeners with simplified approach
 * Configures close button and backdrop click handlers
 */
function setupModalEventListeners() {
  console.log("Setting up modal event listeners");

  const movieModal = document.getElementById("movie-modal");
  if (!movieModal || movieModal.dataset.listenersAttached) {
    console.log("Modal not found or already configured");
    return;
  }

  // Mark as configured to prevent duplicate listeners
  movieModal.dataset.listenersAttached = "true";

  const closeBtn = movieModal.querySelector(".movie-modal__close");
  if (!closeBtn) {
    console.log("Close button not found");
    return;
  }

  // Close button event handler
  closeBtn.onclick = function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("Close button clicked");
    closeMovieModal();
  };

  // Backdrop click event handler
  movieModal.onclick = function (e) {
    if (e.target === movieModal || e.target.classList.contains("movie-modal__backdrop")) {
      console.log("Backdrop clicked");
      closeMovieModal();
    }
  };

  console.log("Modal event listeners attached successfully");
}

/**
 * Force setup of modal listeners if not already attached
 */
function forceSetupModalListeners() {
  const movieModal = document.getElementById("movie-modal");
  if (movieModal && !movieModal.dataset.listenersAttached) {
    console.log("Force setup modal listeners");
    setupModalEventListeners();
  }
}

/**
 * Global ESC key handler for all modals
 * Closes modals in priority order when ESC key is pressed
 */
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.keyCode === 27) {
    console.log("ESC key pressed");

    // Priority 1: Movie modal
    const movieModal = document.getElementById("movie-modal");
    if (movieModal && movieModal.style.display === "flex") {
      console.log("Closing movie modal via ESC");
      closeMovieModal();
      return;
    }

    // Priority 2: Search modal
    const searchModal = document.getElementById("search-modal");
    if (searchModal && searchModal.style.display === "flex") {
      console.log("Closing search modal via ESC");
      searchModal.style.display = "none";
      return;
    }

    // Priority 3: Notification modal
    const notificationModal = document.getElementById("notification-modal");
    if (notificationModal && notificationModal.style.display === "flex") {
      console.log("Closing notification modal via ESC");
      notificationModal.style.display = "none";
      return;
    }

    // Priority 4: Other modals
    const modals = ["coming-soon-modal", "spoiler-modal", "surprise-modal", "comment-popup", "profile-modal"];

    modals.forEach((id) => {
      const el = document.getElementById(id);
      if (el && (el.style.display === "flex" || el.style.display === "block")) {
        el.style.display = "none";
        console.log("Closed", id, "via ESC");
      }
    });

    // Priority 5: Profile menu dropdown
    const profileMenu = document.getElementById("profile-menu");
    const profileToggle = document.getElementById("profile-menu-toggle");
    if (profileMenu && profileMenu.style.display === "block") {
      profileMenu.style.display = "none";
      if (profileToggle) profileToggle.setAttribute("aria-expanded", "false");
      console.log("Closed profile menu via ESC");
    }
  }
});

/**
 * Modal detection observer for automatic listener setup
 * Watches for modal elements being added to DOM and sets up listeners
 */
const modalObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === 1 && node.id === "movie-modal") {
        console.log("Modal detected! Setting up listeners...");
        forceSetupModalListeners();
      }
    });
  });
});

// Initialize modal observer when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  console.log("Starting modal observer...");

  // Observe additions to body
  modalObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });

  console.log("Modal observer started");
});

// =============================================================================
// 4. MOVIE RANKING & COMMENT SYSTEM - COMPLETE ENGLISH VERSION
// =============================================================================

/**
 * Render the complete ranking section with stars and comments
 * Displays identical interface for all users but admin controls are conditionally functional
 *
 * @param {string} movieKey - Movie key to render ranking for
 */
function renderRanking(movieKey) {
  const movieInfo = window.moviesData[movieKey];
  if (!movieInfo || !movieInfo.ranking) return;

  // Update admin status
  isAdminUser = checkAdminUser();
  console.log("Rendering ranking for", movieKey, "- Admin:", isAdminUser);

  // Load any saved rankings/comments from localStorage
  const savedData = getSavedMovieData(movieKey);
  if (savedData) {
    movieInfo.ranking = savedData.ranking;
    movieInfo.comments = savedData.comments;
    console.log("Loaded saved data for", movieKey, ":", savedData);
  }

  const container = document.getElementById("movie-modal-ranking");

  // Initialize comments object if it doesn't exist
  if (!movieInfo.comments) movieInfo.comments = { math: "", digo: "" };

  // Render ranking HTML structure
  container.innerHTML = `
    <div class="stars-row">
      <span class="stars-label">Math</span>
      ${renderStars("math", movieInfo.ranking.math)}
    </div>
    <div class="stars-row">
      <span class="stars-label">Digo</span>
      ${renderStars("digo", movieInfo.ranking.digo)}
    </div>
  `;

  console.log("Ranking rendered successfully");
}

/**
 * Generate star rating HTML for a user with comment preview
 * Always appears interactive but functionality depends on admin status
 *
 * @param {string} user - Username (math or digo)
 * @param {number} value - Current rating value (1-5)
 * @returns {string} HTML string for stars, comment button, and preview
 */
function renderStars(user, value) {
  let starsHtml = "";

  // Create 5 stars, filled based on rating value
  for (let i = 1; i <= 5; i++) {
    starsHtml += `<span class="star${
      i <= value ? " filled" : ""
    }" data-user="${user}" data-value="${i}" style="cursor:pointer;" onclick="handleStarClick(this)">★</span>`;
  }

  // Get existing comment for preview display
  const movieInfo = window.moviesData[currentMovieKey];
  const existingComment = movieInfo && movieInfo.comments ? movieInfo.comments[user] || "" : "";
  const commentPreview = existingComment ? getShortCommentPreview(existingComment) : "";

  // Add comment button with emoji for interaction
  starsHtml += `<button class="comment-btn" data-user="${user}" title="Add Comment" style="margin-left:8px;padding:4px 8px;font-size:0.9rem;border-radius:4px;border:none;background:#4aa042;color:#fff;cursor:pointer;">💬</button>`;

  // Add comment preview if exists (15 characters next to button with larger font and no underline)
  if (commentPreview) {
    starsHtml += `<span class="comment-preview" data-user="${user}" style="margin-left:6px;color:#4aa042;font-style:italic;font-size:1.2rem;cursor:pointer;text-decoration:none;" title="Click to view full comment">${commentPreview}</span>`;
  }

  return starsHtml;
}

/**
 * Handle star rating clicks with admin privilege verification
 * Only admin users can modify ratings, regular users clicks are silently ignored
 *
 * @param {HTMLElement} starElement - The clicked star element
 * @returns {boolean} False to prevent default behavior
 */
function handleStarClick(starElement) {
  console.log("Star clicked - Admin status:", isAdminUser);

  if (!isAdminUser) {
    console.log("Non-admin user tried to edit ratings (silently blocked)");
    return false;
  }

  const user = starElement.dataset.user;
  const value = parseInt(starElement.dataset.value, 10);

  if (currentMovieKey && window.moviesData[currentMovieKey]) {
    // Update rating in memory
    window.moviesData[currentMovieKey].ranking[user] = value;

    // Persist changes to localStorage
    saveMovieData(currentMovieKey, {
      ranking: window.moviesData[currentMovieKey].ranking,
      comments: window.moviesData[currentMovieKey].comments,
    });

    // Re-render to show updated rating
    renderRanking(currentMovieKey);
    console.log("Admin updated", user + "'s rating to", value, "stars");
  }

  return false;
}

/**
 * Get short preview of comment text for display next to button
 * Limits to 15 characters with ellipsis for compact display
 *
 * @param {string} comment - Full comment text
 * @returns {string} Truncated comment preview (15 chars max)
 */
function getShortCommentPreview(comment) {
  if (!comment || comment.trim() === "") return "";
  const trimmed = comment.trim();
  return trimmed.length > 15 ? trimmed.substring(0, 15) + "..." : trimmed;
}

/**
 * Ensure comment popup exists in DOM, create if missing
 * Forces creation of popup with all necessary elements and styling
 *
 * @returns {HTMLElement} The comment popup element
 */
function ensureCommentPopupExists() {
  let popup = document.getElementById("comment-popup");

  if (!popup) {
    console.log("Creating comment popup as it doesn't exist in DOM");

    // Create popup element from scratch
    popup = document.createElement("div");
    popup.id = "comment-popup";
    popup.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: none;
      justify-content: center;
      align-items: center;
      z-index: 10001;
    `;

    // Create complete popup structure with inline styles
    popup.innerHTML = `
      <div style="
        background: #1a1a1a;
        border: 2px solid #4aa042;
        border-radius: 8px;
        padding: 20px;
        max-width: 500px;
        width: 90%;
        color: white;
      ">
        <h3 id="comment-popup-label" style="margin: 0 0 15px 0; color: #4aa042;">Comment:</h3>
        <textarea id="comment-popup-input" placeholder="Write your comment here..." style="
          width: 100%;
          height: 120px;
          background: #2a2a2a;
          border: 1px solid #4aa042;
          border-radius: 4px;
          color: white;
          padding: 10px;
          font-family: inherit;
          resize: vertical;
          margin-bottom: 10px;
          box-sizing: border-box;
        "></textarea>
        <div id="comment-popup-count" style="
          color: #666;
          font-size: 1rem;
          margin-bottom: 15px;
        ">0/300</div>
        <div style="display: flex; gap: 10px; justify-content: flex-end;">
          <button id="comment-popup-cancel" style="
            background: #666;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
          ">Cancel</button>
          <button id="comment-popup-save" style="
            background: #4aa042;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
          ">Save</button>
        </div>
      </div>
    `;

    document.body.appendChild(popup);
    console.log("Comment popup created and added to DOM successfully");
  }

  return popup;
}

/**
 * Show comment popup for adding/editing/viewing comments
 * Handles both admin edit mode and user read-only mode
 * Ensures popup exists and properly configures all interactions
 *
 * @param {string} user - Username (math or digo)
 * @param {boolean} readOnly - Whether the comment should be read-only
 */
function showCommentBox(user, readOnly = false) {
  console.log("=== OPENING COMMENT BOX ===");
  console.log("User:", user, "Read-only mode:", readOnly, "Current movie:", currentMovieKey);

  // Guarantee popup exists before proceeding
  ensureCommentPopupExists();

  // Basic validation checks
  if (!currentMovieKey) {
    console.error("No current movie key available!");
    return;
  }

  const movieInfo = window.moviesData[currentMovieKey];
  if (!movieInfo) {
    console.error("No movie info found for key:", currentMovieKey);
    return;
  }

  // Initialize comments object if it doesn't exist
  if (!movieInfo.comments) {
    movieInfo.comments = { math: "", digo: "" };
  }

  // Get existing comment or empty string
  const existingComment = movieInfo.comments[user] || "";

  // Get popup elements - now guaranteed to exist
  const popup = document.getElementById("comment-popup");
  const label = document.getElementById("comment-popup-label");
  const input = document.getElementById("comment-popup-input");
  const saveBtn = document.getElementById("comment-popup-save");
  const cancelBtn = document.getElementById("comment-popup-cancel");
  const count = document.getElementById("comment-popup-count");

  console.log("Popup elements verification:", {
    popup: !!popup,
    label: !!label,
    input: !!input,
    saveBtn: !!saveBtn,
    cancelBtn: !!cancelBtn,
    count: !!count,
  });

  if (!popup || !label || !input || !saveBtn || !cancelBtn || !count) {
    console.error("CRITICAL: Some popup elements still not found after creation!");
    return;
  }

  console.log("All popup elements found, configuring popup interface...");

  // Setup popup content and labels
  label.textContent = `Comment for ${user === "math" ? "Math" : "Digo"}:`;
  input.value = existingComment;
  count.textContent = `${input.value.length}/300`;

  // Display popup with high z-index
  popup.style.display = "flex";
  popup.style.zIndex = "10001";

  // Focus input for immediate typing
  setTimeout(() => {
    input.focus();
    console.log("Input field focused for user interaction");
  }, 100);

  // Configure read-only mode for non-admin users
  if (readOnly) {
    input.setAttribute("readonly", "readonly");
    input.style.backgroundColor = "#f5f5f5";
    input.style.cursor = "default";
    saveBtn.style.display = "none";
    count.style.display = "none";
    label.textContent = `${user === "math" ? "Math" : "Digo"}'s Comment (View Only):`;

    if (!existingComment) {
      input.value = "No comment available.";
      input.style.fontStyle = "italic";
      input.style.color = "#666";
    }
  } else {
    // Configure edit mode for admin users
    input.removeAttribute("readonly");
    input.style.backgroundColor = "";
    input.style.cursor = "";
    input.style.fontStyle = "";
    input.style.color = "";
    saveBtn.style.display = "";
    count.style.display = "";
  }

  // Clear existing event listeners and create fresh ones
  const newInput = input.cloneNode(true);
  const newSaveBtn = saveBtn.cloneNode(true);
  const newCancelBtn = cancelBtn.cloneNode(true);

  input.parentNode.replaceChild(newInput, input);
  saveBtn.parentNode.replaceChild(newSaveBtn, saveBtn);
  cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);

  // Setup character count update as user types
  newInput.oninput = () => {
    if (!readOnly) {
      const currentLength = newInput.value.length;
      count.textContent = `${currentLength}/300`;

      // Visual feedback for approaching character limit
      if (currentLength > 280) {
        count.style.color = "#ff6b6b";
      } else {
        count.style.color = "#666";
      }
    }
  };

  // Setup save comment functionality for admin users
  newSaveBtn.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Save button clicked by admin user");

    if (!readOnly) {
      const newComment = newInput.value.slice(0, 300); // Enforce 300 character limit
      movieInfo.comments[user] = newComment;

      // Persist changes to localStorage
      saveMovieData(currentMovieKey, {
        ranking: movieInfo.ranking,
        comments: movieInfo.comments,
      });

      popup.style.display = "none";
      renderRanking(currentMovieKey); // Re-render to show updated preview
      console.log("Comment saved for", user, ":", newComment);
    }
  };

  // Setup cancel functionality
  newCancelBtn.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Cancel button clicked, closing popup");
    popup.style.display = "none";
  };

  // Setup ESC key handler for popup
  const escHandler = (e) => {
    if (e.key === "Escape") {
      popup.style.display = "none";
      document.removeEventListener("keydown", escHandler);
      console.log("Comment popup closed via ESC key");
    }
  };
  document.addEventListener("keydown", escHandler);

  // Setup backdrop click handler
  popup.onclick = (e) => {
    if (e.target === popup) {
      popup.style.display = "none";
      console.log("Comment popup closed via backdrop click");
    }
  };

  console.log("Comment popup setup completed successfully!");
}

/**
 * Robust event delegation system for comment system interactions
 * Uses document-level event delegation to catch dynamically created elements
 * Handles comment buttons, previews, and star ratings
 */
document.addEventListener("click", function (e) {
  console.log("=== DOCUMENT CLICK DETECTED ===");
  console.log("Target element:", e.target.tagName, e.target.className, e.target.textContent);

  // Comment button detection with multiple fallback methods
  if (e.target.classList.contains("comment-btn") || (e.target.tagName === "BUTTON" && e.target.textContent.includes("💬"))) {
    e.preventDefault();
    e.stopPropagation();

    let user = e.target.dataset.user || e.target.getAttribute("data-user");
    console.log("💬 COMMENT BUTTON DETECTED! User:", user);

    if (!user) {
      console.error("No user found for comment button, searching parent elements...");
      // Search for user attribute in parent elements as fallback
      let parent = e.target.parentElement;
      while (parent && !user) {
        const parentUser = parent.dataset.user || parent.getAttribute("data-user");
        if (parentUser) {
          user = parentUser;
          console.log("Found user in parent element:", user);
          break;
        }
        parent = parent.parentElement;
      }
    }

    if (user) {
      console.log("Opening comment box for user:", user);
      showCommentBox(user, !isAdminUser);
    } else {
      console.error("Could not determine user for comment button!");
    }
    return;
  }

  // Comment preview detection for clicking on preview text
  if (e.target.classList.contains("comment-preview")) {
    e.preventDefault();
    e.stopPropagation();

    const user = e.target.dataset.user || e.target.getAttribute("data-user");
    console.log("Comment preview clicked for user:", user);

    if (user) {
      showCommentBox(user, !isAdminUser);
    }
    return;
  }

  // Star rating detection for admin rating changes
  if (e.target.classList.contains("star")) {
    e.preventDefault();
    e.stopPropagation();

    console.log("Star clicked via event delegation");
    handleStarClick(e.target);
    return;
  }
});

/**
 * Testing and debugging function for comment system
 * Verifies all components and provides detailed logging
 * Available globally for console testing
 *
 * @returns {string} Test completion message
 */
window.testCommentSystem = function () {
  console.log("=== TESTING COMMENT SYSTEM ===");

  // Verify basic system state
  console.log("Current movie:", currentMovieKey);
  console.log("Admin status:", isAdminUser);
  console.log("Movie data available:", !!window.moviesData);

  // Force popup creation for testing
  ensureCommentPopupExists();

  // Verify popup was created successfully
  const popup = document.getElementById("comment-popup");
  console.log("Comment popup exists after creation:", !!popup);

  // Check for comment buttons in current DOM
  const commentButtons = document.querySelectorAll(".comment-btn");
  console.log("Comment buttons found:", commentButtons.length);

  commentButtons.forEach((btn, i) => {
    console.log(`Button ${i + 1}:`, {
      user: btn.dataset.user,
      text: btn.textContent,
      classes: btn.className,
    });
  });

  // Set test movie if none currently selected
  if (!currentMovieKey && window.moviesData) {
    currentMovieKey = Object.keys(window.moviesData)[0];
    console.log("Set test movie:", currentMovieKey);
  }

  console.log("Testing showCommentBox function directly...");
  showCommentBox("math", !isAdminUser);

  return "Test completed - popup should be visible now";
};

/**
 * Simulate comment button click for testing purposes
 * Creates and dispatches a real click event for debugging
 * Available globally for console testing
 *
 * @returns {string} Test result message
 */
window.simulateCommentClick = function () {
  console.log("=== SIMULATING COMMENT CLICK ===");

  const btn = document.querySelector(".comment-btn");
  if (btn) {
    console.log("Found comment button:", btn);
    console.log("Simulating click event...");

    // Create and dispatch real click event
    const clickEvent = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });

    btn.dispatchEvent(clickEvent);
    return "Click event dispatched successfully";
  } else {
    return "No comment button found in DOM";
  }
};

// Make functions globally available for direct access and testing
window.showCommentBox = showCommentBox;
window.handleStarClick = handleStarClick;
window.ensureCommentPopupExists = ensureCommentPopupExists;

console.log("Comment system loaded with forced popup creation capability");
console.log("Available test functions:");
console.log("- window.testCommentSystem()");
console.log("- window.simulateCommentClick()");
