// SECTION INDEX:
// 1. GLOBAL VARIABLES & CONFIGURATIONS
// 2. LOCALSTORAGE MANAGEMENT
// 3. MOVIE MODAL SYSTEM
// 4. MOVIE RANKING & COMMENT SYSTEM
// 5. SEARCH & RANDOM MOVIE FUNCTIONALITY
// 6. SEARCH AUTOCOMPLETE SYSTEM
// 7. PROFILE MODAL SYSTEM
// 8. APPLICATION INITIALIZATION
// 9. MOBILE MENU SYSTEM
// ==========================

// ==========================
// 1. GLOBAL VARIABLES & CONFIGURATIONS
// ==========================

/**
 * Check if current user has administrator privileges
 * Admin users can edit ratings and comments
 * @returns {boolean} True if user is admin, false otherwise
 */
function checkAdminUser() {
  try {
    const currentUser = localStorage.getItem("mathflix_current_user");
    const userRole = localStorage.getItem("mathflix_role");

    console.log(`🔍 Admin check: user="${currentUser}", role="${userRole}"`);

    // Admin if user is "mathdigo" OR role is "admin"
    const isAdmin = currentUser === "mathdigo" || userRole === "admin";

    console.log(`👑 Admin status: ${isAdmin}`);
    return isAdmin;
  } catch (error) {
    console.warn("❌ Error checking admin privileges:", error);
    return false;
  }
}

// Current admin status - updated dynamically when needed
let isAdminUser = checkAdminUser();

// Current movie key being displayed in modal
let currentMovieKey = null;

// List of movies that use vertical poster layout in modal (special layout handling)
const verticalMovies = ["screen", "chucky", "tifannychucky", "seedschucky", "substance"];

// Search pagination state
let currentPage = 1;
let currentResults = [];

// ==========================
// 2. LOCALSTORAGE MANAGEMENT
// ==========================

/**
 * Save movie data (rankings and comments) to localStorage
 * @param {string} movieKey - Unique identifier for the movie
 * @param {Object} data - Movie data object containing rankings and comments
 */
function saveMovieData(movieKey, data) {
  try {
    const existingData = JSON.parse(localStorage.getItem("mathflix_movies")) || {};
    existingData[movieKey] = data;
    localStorage.setItem("mathflix_movies", JSON.stringify(existingData));
    console.log(`💾 Saved data for movie: ${movieKey}`, data);
  } catch (error) {
    console.warn("❌ Error saving movie data:", error);
  }
}

/**
 * Load saved movie data (rankings and comments) from localStorage
 * @param {string} movieKey - Unique identifier for the movie
 * @returns {Object|null} Saved movie data or null if not found
 */
function getSavedMovieData(movieKey) {
  try {
    const savedData = JSON.parse(localStorage.getItem("mathflix_movies")) || {};
    return savedData[movieKey] || null;
  } catch (error) {
    console.warn("❌ Error loading saved data:", error);
    return null;
  }
}

// ==========================
// 3. MOVIE MODAL SYSTEM
// ==========================

/**
 * Global click handler for movie modal triggers
 * Uses event delegation for better performance
 */
document.addEventListener("click", function (e) {
  // Exclude vertical carousel clicks - handled by main.js
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
 * Handles both horizontal and vertical poster layouts
 * @param {string} key - Movie key to display
 */
function openMovieModal(key) {
  const movieInfo = window.moviesData[key];
  if (!movieInfo) {
    console.error("❌ Movie not found:", key);
    return;
  }

  console.log(`🎬 Opening modal for: ${movieInfo.title}`);
  const movieModal = document.getElementById("movie-modal");

  // Update admin status when opening modal
  isAdminUser = checkAdminUser();
  console.log(`🔄 Modal opened - Admin status: ${isAdminUser}`);

  // Generate clickable genre buttons
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

  // ✅ FORÇAR exibição do modal
  movieModal.style.display = "flex";
  movieModal.style.zIndex = "10000";

  // ✅ FORÇAR setup dos listeners após pequeno delay
  setTimeout(() => {
    setupModalEventListeners();
  }, 100);

  console.log("🎬 Modal forced to display");
}

/**
 * Setup vertical layout for specific movies (poster + trailer toggle)
 * @param {Object} movieInfo - Movie information object
 */
function setupVerticalLayout(movieInfo) {
  console.log("🎬 Setting up VERTICAL layout for:", movieInfo.title);

  // ESCONDER layout horizontal e MOSTRAR layout vertical
  const horizontalMedia = document.querySelector(".movie-modal__media");
  const verticalMedia = document.querySelector(".movie-modal__media-vertical");

  if (horizontalMedia) {
    horizontalMedia.style.display = "none";
    console.log("❌ Hidden horizontal layout");
  }
  if (verticalMedia) {
    verticalMedia.style.display = "flex";
    console.log("✅ Showed vertical layout");
  }

  // Configurar poster e trailer vertical
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

  // Configurar botão de toggle vertical
  const verticalToggleBtn = document.getElementById("toggle-vertical-media");
  if (verticalToggleBtn) {
    verticalToggleBtn.textContent = "See Trailer";
    verticalToggleBtn.style.display = "block";

    // Remover listeners anteriores
    verticalToggleBtn.onclick = null; // Simplesmente limpar evento anterior

    // Toggle entre poster e trailer
    document.getElementById("toggle-vertical-media").onclick = function () {
      const poster = document.getElementById("vertical-modal-poster");
      const trailer = document.getElementById("vertical-modal-trailer");

      if (poster && trailer) {
        if (poster.style.display !== "none") {
          // Trocar para trailer
          poster.style.display = "none";
          trailer.style.display = "block";
          this.textContent = "See Poster";
        } else {
          // Trocar para poster
          poster.style.display = "block";
          trailer.style.display = "none";
          this.textContent = "See Trailer";
        }
      }
    };
  }
}

/**
 * Setup horizontal layout for standard movies (poster + trailer side by side)
 * @param {Object} movieInfo - Movie information object
 */
function setupHorizontalLayout(movieInfo) {
  console.log("🎬 Setting up HORIZONTAL layout for:", movieInfo.title);

  const isMobileOrTablet = window.innerWidth <= 768;

  // ESCONDER layout vertical e MOSTRAR layout horizontal
  const horizontalMedia = document.querySelector(".movie-modal__media");
  const verticalMedia = document.querySelector(".movie-modal__media-vertical");

  if (verticalMedia) {
    verticalMedia.style.display = "none";
    console.log("❌ Hidden vertical layout");
  }
  if (horizontalMedia) {
    horizontalMedia.style.display = "flex";
    console.log("✅ Showed horizontal layout");
  }

  if (isMobileOrTablet) {
    // MOBILE/TABLET: Layout retangular pequeno com toggle
    const poster = document.getElementById("movie-modal-poster");
    const trailer = document.getElementById("movie-modal-trailer");
    const trailerContainer = document.querySelector(".movie-modal__trailer");

    if (poster && trailer) {
      poster.src = movieInfo.poster;
      poster.alt = movieInfo.title;
      trailer.src = movieInfo.trailer;

      // Mostrar poster por padrão, esconder trailer
      poster.style.display = "block";
      if (trailerContainer) trailerContainer.style.display = "none";
    }

    // Configurar botão de toggle (criar se não existir)
    let toggleBtn = document.querySelector(".movie-modal__media .movie-modal__toggle-btn");
    if (!toggleBtn) {
      toggleBtn = document.createElement("button");
      toggleBtn.className = "movie-modal__toggle-btn";
      if (horizontalMedia) horizontalMedia.appendChild(toggleBtn);
    }

    if (toggleBtn) {
      toggleBtn.textContent = "See Trailer";
      toggleBtn.style.display = "block";

      // Remover listeners anteriores
      toggleBtn.onclick = null; // Simplesmente limpar evento anterior

      // Função de toggle
      document.querySelector(".movie-modal__media .movie-modal__toggle-btn").onclick = function () {
        const poster = document.getElementById("movie-modal-poster");
        const trailerContainer = document.querySelector(".movie-modal__trailer");

        if (poster && trailerContainer) {
          if (poster.style.display !== "none") {
            // Trocar para trailer
            poster.style.display = "none";
            trailerContainer.style.display = "block";
            this.textContent = "See Poster";
          } else {
            // Trocar para poster
            poster.style.display = "block";
            trailerContainer.style.display = "none";
            this.textContent = "See Trailer";
          }
        }
      };
    }
  } else {
    // DESKTOP: Layout horizontal normal (poster + trailer lado a lado)
    const poster = document.getElementById("movie-modal-poster");
    const trailer = document.getElementById("movie-modal-trailer");
    const trailerContainer = document.querySelector(".movie-modal__trailer");

    if (poster && trailer) {
      poster.src = movieInfo.poster;
      poster.alt = movieInfo.title;
      trailer.src = movieInfo.trailer;

      // Para desktop, mostrar ambos lado a lado
      poster.style.display = "block";
      if (trailerContainer) trailerContainer.style.display = "block";
    }

    // Esconder botão de toggle para filmes horizontais no desktop
    const toggleBtn = document.querySelector(".movie-modal__media .movie-modal__toggle-btn");
    if (toggleBtn) toggleBtn.style.display = "none";
  }
}

/**
 * Close movie modal and cleanup resources
 * Stops video trailers to save bandwidth
 */
function closeMovieModal() {
  console.log("🔒 closeMovieModal called");

  const movieModal = document.getElementById("movie-modal");
  if (movieModal) {
    movieModal.style.display = "none";

    // Stop all video trailers to save bandwidth
    const trailer = document.getElementById("movie-modal-trailer");
    const verticalTrailer = document.getElementById("vertical-modal-trailer");
    if (trailer) trailer.src = "";
    if (verticalTrailer) verticalTrailer.src = "";

    console.log("🔒 Movie modal closed and cleaned up");

    // If search modal was open before movie modal, restore focus
    const searchModal = document.getElementById("search-modal");
    if (searchModal && searchModal.style.display === "flex") {
      const searchInput = document.getElementById("search-input");
      if (searchInput) {
        setTimeout(() => searchInput.focus(), 100);
      }
    }
  }
}

// ✅ TORNAR FUNÇÃO GLOBAL
window.closeMovieModal = closeMovieModal;

// ✅ ADICIONAR como backup apenas se globalThis existir
if (typeof globalThis !== "undefined") {
  globalThis.closeMovieModal = closeMovieModal;
}

console.log("✅ closeMovieModal function made globally available");

/**
 * ✅ MODAL EVENT MANAGEMENT - Versão simplificada
 */

/**
 * Setup modal event listeners - versão direta sem cloning
 */
function setupModalEventListeners() {
  console.log("🔧 Setting up modal event listeners - SIMPLE VERSION");

  const movieModal = document.getElementById("movie-modal");
  if (!movieModal || movieModal.dataset.listenersAttached) {
    console.log("❌ Modal not found or already configured");
    return;
  }

  // Marcar como configurado
  movieModal.dataset.listenersAttached = "true";

  const closeBtn = movieModal.querySelector(".movie-modal__close");
  if (!closeBtn) {
    console.log("❌ Close button not found");
    return;
  }

  // ✅ CLOSE BUTTON - evento simples
  closeBtn.onclick = function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("❌ Close button clicked");
    closeMovieModal();
  };

  // ✅ BACKDROP - evento simples
  movieModal.onclick = function (e) {
    if (e.target === movieModal || e.target.classList.contains("movie-modal__backdrop")) {
      console.log("❌ Backdrop clicked");
      closeMovieModal();
    }
  };

  console.log("✅ Modal event listeners attached successfully");
}

/**
 * FORÇAR setup de listeners - versão simples
 */
function forceSetupModalListeners() {
  const movieModal = document.getElementById("movie-modal");
  if (movieModal && !movieModal.dataset.listenersAttached) {
    console.log("🔧 Force setup modal listeners");
    setupModalEventListeners();
  }
}

/**
 * ESC KEY handler para todos os modais
 */
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.keyCode === 27) {
    console.log("⌨️ ESC key pressed");

    // PRIORITY 1: Movie modal
    const movieModal = document.getElementById("movie-modal");
    if (movieModal && movieModal.style.display === "flex") {
      console.log("❌ Closing movie modal via ESC");
      closeMovieModal();
      return;
    }

    // PRIORITY 2: Search modal
    const searchModal = document.getElementById("search-modal");
    if (searchModal && searchModal.style.display === "flex") {
      console.log("❌ Closing search modal via ESC");
      searchModal.style.display = "none";
      return;
    }

    // PRIORITY 3: Notification modal
    const notificationModal = document.getElementById("notification-modal");
    if (notificationModal && notificationModal.style.display === "flex") {
      console.log("❌ Closing notification modal via ESC");
      notificationModal.style.display = "none";
      return;
    }

    // PRIORITY 4: Other modals
    const modals = ["coming-soon-modal", "spoiler-modal", "surprise-modal", "comment-popup", "profile-modal"];

    modals.forEach((id) => {
      const el = document.getElementById(id);
      if (el && (el.style.display === "flex" || el.style.display === "block")) {
        el.style.display = "none";
        console.log(`❌ Closed ${id} via ESC`);
      }
    });

    // PRIORITY 5: Profile menu dropdown
    const profileMenu = document.getElementById("profile-menu");
    const profileToggle = document.getElementById("profile-menu-toggle");
    if (profileMenu && profileMenu.style.display === "block") {
      profileMenu.style.display = "none";
      if (profileToggle) profileToggle.setAttribute("aria-expanded", "false");
      console.log("❌ Closed profile menu via ESC");
    }
  }
});

/**
 * OBSERVER simples para detectar modal
 */
const modalObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    // Só observar nodes adicionados
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === 1 && node.id === "movie-modal") {
        console.log("🎬 MODAL DETECTED! Setting up listeners...");
        forceSetupModalListeners();
      }
    });
  });
});

// ✅ INICIAR observer quando DOM estiver pronto
document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 Starting SIMPLE modal observer...");

  // Observar apenas adições no body
  modalObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });

  console.log("✅ SIMPLE modal observer started");
});

// ==========================
// 4. MOVIE RANKING & COMMENT SYSTEM
// ==========================

/**
 * Render the complete ranking section with stars and comments
 * Displays same interface for all users but admin controls are hidden
 * @param {string} movieKey - Movie key to render ranking for
 */
function renderRanking(movieKey) {
  const movieInfo = window.moviesData[movieKey];
  if (!movieInfo || !movieInfo.ranking) return;

  // Update admin status
  isAdminUser = checkAdminUser();
  console.log(`🎭 Rendering ranking for ${movieKey} - Admin: ${isAdminUser}`);

  // Load any saved rankings/comments from localStorage
  const savedData = getSavedMovieData(movieKey);
  if (savedData) {
    movieInfo.ranking = savedData.ranking;
    movieInfo.comments = savedData.comments;
    console.log(`💾 Loaded saved data for ${movieKey}:`, savedData);
  }

  const container = document.getElementById("movie-modal-ranking");

  // Initialize comments object if it doesn't exist
  if (!movieInfo.comments) movieInfo.comments = { math: "", digo: "" };

  // Render ranking HTML - looks identical for all users
  container.innerHTML = `
    <div class="stars-row">
      <span class="stars-label">Math</span>
      ${renderStars("math", movieInfo.ranking.math)}
      <span class="comment-text" id="comment-math" style="cursor:pointer; color:#4aa042; text-decoration:underline; margin-left:8px;">
        ${movieInfo.comments.math ? getCommentPreview(movieInfo.comments.math) : ""}
      </span>
    </div>
    <div class="stars-row">
      <span class="stars-label">Digo</span>
      ${renderStars("digo", movieInfo.ranking.digo)}
      <span class="comment-text" id="comment-digo" style="cursor:pointer; color:#4aa042; text-decoration:underline; margin-left:8px;">
        ${movieInfo.comments.digo ? getCommentPreview(movieInfo.comments.digo) : ""}
      </span>
    </div>
  `;

  // Add click events for existing comment previews
  if (movieInfo.comments.math) {
    document.getElementById("comment-math").onclick = () => showCommentBox("math", !isAdminUser);
  }
  if (movieInfo.comments.digo) {
    document.getElementById("comment-digo").onclick = () => showCommentBox("digo", !isAdminUser);
  }
}

/**
 * Generate star rating HTML for a user
 * Always looks interactive but only works for admins
 * @param {string} user - Username (math or digo)
 * @param {number} value - Current rating value
 * @returns {string} HTML string for stars and comment button
 */
function renderStars(user, value) {
  let starsHtml = "";

  // Create 5 stars, filled based on rating value
  for (let i = 1; i <= 5; i++) {
    starsHtml += `<span class="star${
      i <= value ? " filled" : ""
    }" data-user="${user}" data-value="${i}" style="cursor:pointer;">★</span>`;
  }

  // Add comment button for all users - always looks the same
  starsHtml += `<button class="comment-btn" data-user="${user}" title="Comment" style="margin-left:8px;padding:2px 7px;font-size:1.1rem;border-radius:5px;border:none;background:#4aa042;color:#fff;cursor:pointer;">💬</button>`;

  return starsHtml;
}

/**
 * Handle star rating clicks and comment button clicks
 */
document.addEventListener("click", function (e) {
  // Star rating click handling (admin only, silent for users)
  if (e.target.classList.contains("star")) {
    console.log(`⭐ Star clicked - Admin: ${isAdminUser}`);

    if (!isAdminUser) {
      console.log("❌ User tried to edit ratings (silently blocked)");
      return; // Silently ignore click for non-admin users
    }

    const user = e.target.dataset.user;
    const value = parseInt(e.target.dataset.value, 10);

    if (currentMovieKey && window.moviesData[currentMovieKey]) {
      // Update rating
      window.moviesData[currentMovieKey].ranking[user] = value;

      // Save to localStorage
      saveMovieData(currentMovieKey, {
        ranking: window.moviesData[currentMovieKey].ranking,
        comments: window.moviesData[currentMovieKey].comments,
      });

      // Re-render to show updated rating
      renderRanking(currentMovieKey);
      console.log(`⭐ Admin updated ${user}'s rating to ${value} stars`);
    }
  }

  // Comment button click handling (all users can view)
  if (e.target.classList.contains("comment-btn")) {
    const user = e.target.dataset.user;
    showCommentBox(user, !isAdminUser);
  }
});

/**
 * Show comment popup for adding/editing/viewing comments
 * @param {string} user - Username (math or digo)
 * @param {boolean} readOnly - Whether the comment should be read-only
 */
function showCommentBox(user, readOnly = false) {
  const movieInfo = window.moviesData[currentMovieKey];
  if (!movieInfo) return;

  console.log(`💬 Comment box for ${user} - ReadOnly: ${readOnly}`);

  // Get existing comment or empty string
  const existingComment = movieInfo.comments && movieInfo.comments[user] ? movieInfo.comments[user] : "";

  // Get popup elements
  const popup = document.getElementById("comment-popup");
  const label = document.getElementById("comment-popup-label");
  const input = document.getElementById("comment-popup-input");
  const saveBtn = document.getElementById("comment-popup-save");
  const cancelBtn = document.getElementById("comment-popup-cancel");
  const count = document.getElementById("comment-popup-count");

  // Setup popup content - same label for everyone
  label.textContent = `Comment for ${user === "math" ? "Math" : "Digo"}:`;
  input.value = existingComment;
  count.textContent = `${input.value.length}/300`;
  popup.style.display = "flex";
  input.focus();

  // Handle read-only mode for non-admin users (hidden behavior)
  if (readOnly) {
    input.setAttribute("readonly", "readonly");
    saveBtn.style.display = "none";
    count.style.display = "none";
  } else {
    input.removeAttribute("readonly");
    saveBtn.style.display = "";
    count.style.display = "";
  }

  // Update character count as user types (only if editable)
  input.oninput = () => {
    if (!readOnly) {
      count.textContent = `${input.value.length}/300`;
    }
  };

  // Save comment functionality (only for admin)
  saveBtn.onclick = () => {
    if (!readOnly) {
      movieInfo.comments[user] = input.value.slice(0, 300); // Limit to 300 characters

      // Save to localStorage
      saveMovieData(currentMovieKey, {
        ranking: movieInfo.ranking,
        comments: movieInfo.comments,
      });

      popup.style.display = "none";
      renderRanking(currentMovieKey);
      console.log(`💬 Admin updated comment for ${user}`);
    }
  };

  // Cancel functionality
  cancelBtn.onclick = () => {
    popup.style.display = "none";
  };
}

/**
 * Get truncated preview of comment text
 * @param {string} comment - Full comment text
 * @returns {string} Truncated comment preview
 */
function getCommentPreview(comment) {
  if (!comment) return "";
  return comment.length > 50 ? comment.substring(0, 50) + "..." : comment;
}

// ==========================
// 5. SEARCH & RANDOM MOVIE FUNCTIONALITY
// ==========================

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
 * ✅ SEARCH BUTTON CLICK HANDLER
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

// ✅ SEARCH BUTTON LISTENERS
document.addEventListener("click", function (e) {
  if (e.target.id === "search-btn" || e.target.closest("#search-btn")) {
    e.preventDefault();
    e.stopPropagation();
    console.log("🔍 Search button clicked");
    handleSearchClick();
  }
});

// ==========================
// 🎲 RANDOM MOVIE SYSTEM - SEÇÃO ÚNICA E COMPLETA
// ==========================

/**
 * ✅ RANDOM MOVIE MAIN FUNCTION
 * Sorteia um filme e exibe modal com countdown
 */
function showRandomMovieCard() {
  console.log("🎲 showRandomMovieCard function called");

  if (!window.moviesData) {
    console.error("❌ Movie data not available!");
    return;
  }

  // ✅ Sortear filme UMA VEZ
  const movieKeys = Object.keys(window.moviesData);
  const randomKey = movieKeys[Math.floor(Math.random() * movieKeys.length)];
  const movieInfo = window.moviesData[randomKey];

  if (!movieInfo) {
    console.error("❌ Random movie not found!");
    return;
  }

  console.log(`🎲 Random movie selected: ${movieInfo.title} (key: ${randomKey})`);

  // ✅ Criar/obter modal
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

  // ✅ Preencher conteúdo do modal
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

  // ✅ Exibir modal
  randomModal.style.display = "flex";

  // ✅ Limpar timers anteriores
  if (window.randomMovieTimer) {
    clearInterval(window.randomMovieTimer);
    window.randomMovieTimer = null;
  }

  // ✅ Setup dos botões - SEM event listeners duplicados
  const goBtn = document.getElementById("go-random-movie");
  const rerollBtn = document.getElementById("reroll-random-movie");
  const closeBtn = document.getElementById("random-close");

  // ✅ Countdown timer
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

  // ✅ Eventos dos botões - INLINE para evitar conflitos
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
        openMovieModal(randomKey); // USA O MESMO randomKey
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

  // ✅ Fechar clicando no backdrop
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
 * ✅ RANDOM MOVIE EVENT LISTENERS - VERSÃO LIMPA
 */

// ✅ Listener principal - EXCLUINDO cliques dentro do modal
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
 * ✅ FORCE SETUP de botões random quando página carregar
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
 * ✅ FUNÇÃO DE TESTE
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

console.log("✅ Random movie system initialized");

// ==========================
// FIM DA SEÇÃO RANDOM MOVIE
// ==========================

// ==========================
// 6. SEARCH AUTOCOMPLETE SYSTEM
// ==========================

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

  console.log("✅ Autocomplete system initialized");
})();

// ==========================
// 7. PROFILE MODAL SYSTEM
// ==========================

/**
 * Initialize profile modal functionality
 * Sets up dropdown menu and event handlers
 */
function initializeProfileModal() {
  console.log("🔧 Initializing profile modal system...");

  const profileToggle = document.getElementById("profile-menu-toggle");
  const profileMenu = document.getElementById("profile-menu");

  if (!profileToggle || !profileMenu) {
    console.error("❌ Profile elements not found!");
    return;
  }

  // Remove any existing event listeners first
  const newToggle = profileToggle.cloneNode(true);
  profileToggle.parentNode.replaceChild(newToggle, profileToggle);

  // Add click event to the new element
  newToggle.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    console.log("🎯 Profile toggle clicked!");

    const isVisible = profileMenu.style.display === "block";
    profileMenu.style.display = isVisible ? "none" : "block";
    newToggle.setAttribute("aria-expanded", !isVisible ? "true" : "false");

    console.log("👤 Menu:", isVisible ? "CLOSED" : "OPENED");
  });

  // Handle dropdown clicks
  document.addEventListener("click", function (e) {
    // Close when clicking outside
    if (!newToggle.contains(e.target) && !profileMenu.contains(e.target)) {
      if (profileMenu.style.display === "block") {
        profileMenu.style.display = "none";
        newToggle.setAttribute("aria-expanded", "false");
      }
    }

    // Handle Profile link
    if (e.target.closest("a[data-action='profile']")) {
      e.preventDefault();
      profileMenu.style.display = "none";
      newToggle.setAttribute("aria-expanded", "false");
      openProfileModal();
    }

    // Handle Logout link
    if (e.target.closest("a[data-action='logout']")) {
      e.preventDefault();
      profileMenu.style.display = "none";
      newToggle.setAttribute("aria-expanded", "false");
      handleLogout();
    }
  });

  console.log("✅ Profile dropdown initialized successfully!");
}

/**
 * Update profile information in the modal
 * @param {string} username - Current username
 * @param {string} userRole - Current user role
 */
function updateProfileInfo(username, userRole) {
  console.log(`� Updating profile info for: ${username} (${userRole})`);

  // Update avatar letter
  const avatarLetter = document.getElementById("profile-avatar-letter");
  if (avatarLetter) {
    avatarLetter.textContent = username.charAt(0).toUpperCase();
  }

  // Update username
  const usernameEl = document.getElementById("profile-username");
  if (usernameEl) {
    usernameEl.textContent = username.charAt(0).toUpperCase() + username.slice(1);
  }

  // Update role
  const roleEl = document.getElementById("profile-role");
  if (roleEl) {
    const roleText = userRole === "admin" ? "Administrator" : "Movie Enthusiast";
    roleEl.textContent = roleText;
  }

  // Update last login
  const lastLoginEl = document.getElementById("profile-last-login");
  if (lastLoginEl) {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    lastLoginEl.textContent = `Today at ${timeString}`;
  }

  console.log("✅ Profile info updated successfully");
}

/**
 * Open profile modal with current user data
 */
function openProfileModal() {
  console.log("🔧 openProfileModal called");

  const profileModal = document.getElementById("profile-modal");
  if (!profileModal) {
    console.error("❌ Profile modal not found in HTML!");
    return;
  }

  console.log("✅ Profile modal found");

  // Get current user info
  const currentUser = localStorage.getItem("mathflix_current_user") || "math";
  const userRole = localStorage.getItem("mathflix_role") || "user";

  console.log(`👤 Opening profile for: ${currentUser}`);

  // ✅ ATUALIZAR informações do perfil diretamente
  updateProfileInfo(currentUser, userRole);

  // ✅ CALCULAR estatísticas
  updateProfileStats(currentUser);

  // ✅ FORÇAR exibição
  profileModal.style.display = "flex";
  profileModal.style.zIndex = "10000";

  // Setup modal handlers after showing modal
  setupProfileModalHandlers();

  console.log("✅ Profile modal opened and handlers attached");
}
/**
 * Close profile modal
 */
function closeProfileModal() {
  const profileModal = document.getElementById("profile-modal");
  if (profileModal) {
    profileModal.style.display = "none";
    console.log("❌ Profile modal closed");
  }
}

/**
 * Calculate and update profile statistics
 * @param {string} username - Current username
 */
function updateProfileStats(username) {
  console.log("📊 Calculating stats for:", username);

  const moviesWatchedEl = document.getElementById("profile-movies-watched");
  const seriesWatchedEl = document.getElementById("profile-series-watched");
  const avgRatingEl = document.getElementById("profile-avg-rating");

  // Check if elements exist
  if (!moviesWatchedEl || !seriesWatchedEl) {
    console.warn("⚠️ Stat elements not found, using defaults");
    return;
  }

  // Check if movie data exists
  if (!window.moviesData) {
    console.warn("⚠️ Movie data not available, using defaults");
    moviesWatchedEl.textContent = "85";
    seriesWatchedEl.textContent = "12";
    return;
  }

  try {
    let movieCount = 0;
    let seriesCount = 0;

    // Count movies vs series based on detection patterns
    for (const movieKey in window.moviesData) {
      const movieData = window.moviesData[movieKey];

      // Enhanced series detection with more patterns
      const isSeries =
        // Explicit series keys
        movieKey.includes("rupaul") ||
        movieKey.includes("simpsons") ||
        movieKey.includes("howmet") ||
        movieKey.includes("agatha") ||
        movieKey.includes("wandavision") ||
        movieKey.includes("theoffice") ||
        // Title-based detection
        (movieData.title &&
          (movieData.title.toLowerCase().includes("series") ||
            movieData.title.toLowerCase().includes("season") ||
            movieData.title.toLowerCase().includes("drag race") ||
            movieData.title.toLowerCase().includes("office") ||
            movieData.title.toLowerCase().includes("simpsons"))) ||
        // Categories-based detection
        (movieData.categories &&
          (movieData.categories.includes("series") ||
            movieData.categories.includes("sitcom") ||
            movieData.categories.includes("reality") ||
            movieData.categories.includes("competition") ||
            movieData.categories.includes("animation"))) ||
        // Duration-based detection (series usually don't have duration or have multiple episodes)
        (movieData.duration &&
          (movieData.duration.includes("Episodes") ||
            movieData.duration.includes("Seasons") ||
            movieData.duration.includes("Season")));

      if (isSeries) {
        seriesCount++;
        console.log(`📺 Series detected: ${movieKey} - ${movieData.title}`);
      } else {
        movieCount++;
        console.log(`🎬 Movie detected: ${movieKey} - ${movieData.title}`);
      }
    }

    // Update display
    moviesWatchedEl.textContent = movieCount;
    seriesWatchedEl.textContent = seriesCount;

    // Update total if element exists
    const totalContentEl = document.getElementById("profile-total-content");
    if (totalContentEl) {
      totalContentEl.textContent = movieCount + seriesCount;
    }

    console.log(`✅ Stats updated: ${movieCount} movies, ${seriesCount} series`);
    console.log(`📊 Total content: ${movieCount + seriesCount} items`);
  } catch (error) {
    console.error("❌ Error calculating stats:", error);
    // Fallback values
    moviesWatchedEl.textContent = "85";
    seriesWatchedEl.textContent = "12";
  }
}

/**
 * Setup profile modal event handlers
 */
function setupProfileModalHandlers() {
  const profileModal = document.getElementById("profile-modal");
  if (!profileModal) {
    console.warn("⚠️ Profile modal not found for handlers");
    return;
  }

  console.log("🔧 Setting up profile modal handlers...");

  // Close button handler
  const closeBtn = profileModal.querySelector(".profile-modal__close");
  if (closeBtn) {
    // Remove any existing listeners
    closeBtn.replaceWith(closeBtn.cloneNode(true));
    const newCloseBtn = profileModal.querySelector(".profile-modal__close");

    newCloseBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      closeProfileModal();
      console.log("❌ Profile modal closed via X button");
    });
  }

  // Click outside to close (backdrop only)
  profileModal.addEventListener("click", function (e) {
    // Only close if clicked directly on modal or backdrop, not content
    if (e.target === profileModal || e.target.classList.contains("profile-modal__backdrop")) {
      closeProfileModal();
      console.log("❌ Profile modal closed via outside click");
    }
  });

  // ESC key to close
  const escHandler = (e) => {
    if (e.key === "Escape") {
      const isProfileModalOpen = profileModal.style.display === "flex";
      if (isProfileModalOpen) {
        closeProfileModal();
        document.removeEventListener("keydown", escHandler);
        console.log("❌ Profile modal closed via ESC key");
      }
    }
  };
  document.addEventListener("keydown", escHandler);

  // Logout button in modal
  const logoutBtn = document.getElementById("profile-logout");
  if (logoutBtn) {
    // Remove any existing listeners
    logoutBtn.replaceWith(logoutBtn.cloneNode(true));
    const newLogoutBtn = document.getElementById("profile-logout");

    newLogoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log("🚪 Profile logout button clicked");
      handleLogout();
    });
  }

  console.log("✅ Profile modal handlers setup complete");
}

/**
 * Handle user logout with custom styled confirmation modal
 */
function handleLogout() {
  console.log("🚪 handleLogout called");

  // Create custom logout modal
  const logoutModal = document.createElement("div");
  logoutModal.id = "logout-modal";
  logoutModal.className = "logout-modal";
  logoutModal.innerHTML = `
    <div class="logout-modal__backdrop"></div>
    <div class="logout-modal__content">
      <div class="logout-modal__icon">🚪</div>
      <h2 class="logout-modal__title">Confirm Logout</h2>
      <p class="logout-modal__message">
        Are you sure you want to logout?<br>
        <span class="logout-modal__submessage">You'll need to login again to access MathFlix.</span>
      </p>
      <div class="logout-modal__buttons">
        <button class="logout-modal__btn logout-modal__btn--cancel" id="logout-cancel">
          Cancel
        </button>
        <button class="logout-modal__btn logout-modal__btn--confirm" id="logout-confirm">
          Yes, Logout
        </button>
      </div>
    </div>
  `;

  // Add modal to page
  document.body.appendChild(logoutModal);
  logoutModal.style.display = "flex";

  // Event handlers
  const cancelBtn = document.getElementById("logout-cancel");
  const confirmBtn = document.getElementById("logout-confirm");
  const backdrop = logoutModal.querySelector(".logout-modal__backdrop");

  // Cancel logout
  const cancelLogout = () => {
    logoutModal.remove();
    console.log("❌ Logout cancelled");
  };

  // Confirm logout
  const confirmLogout = () => {
    // Clear user session data
    localStorage.removeItem("mathflix_current_user");
    localStorage.removeItem("mathflix_role");

    console.log("🚪 User logged out successfully");

    // Close profile modal if open
    const profileModal = document.getElementById("profile-modal");
    if (profileModal) {
      profileModal.style.display = "none";
    }

    // Show success message
    logoutModal.querySelector(".logout-modal__content").innerHTML = `
        <div class="logout-modal__icon">🚪</div>
        <h2 class="logout-modal__title">Logged Out</h2>
        <p class="logout-modal__message">
          You have been successfully logged out.<br>
          <span class="logout-modal__submessage">Redirecting to login page...</span>
        </p>
      `;

    // Redirect after delay
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
  };

  // Attach event listeners
  if (cancelBtn) cancelBtn.addEventListener("click", cancelLogout);
  if (confirmBtn) confirmBtn.addEventListener("click", confirmLogout);
  if (backdrop) backdrop.addEventListener("click", cancelLogout);

  // ESC key to cancel
  const escHandler = (e) => {
    if (e.key === "Escape") {
      cancelLogout();
      document.removeEventListener("keydown", escHandler);
    }
  };
  document.addEventListener("keydown", escHandler);

  console.log("🚪 Logout confirmation modal opened");
}

// ==========================
// 8. APPLICATION INITIALIZATION
// ==========================

/**
 * Initialize application when DOM is ready
 * Ensures proper loading order and setup
 */
document.addEventListener("DOMContentLoaded", function () {
  console.log("🔧 DOM Content Loaded - Starting initialization...");

  // Set default user if none exists
  const currentUser = localStorage.getItem("mathflix_current_user");
  if (!currentUser) {
    localStorage.setItem("mathflix_current_user", "math");
    console.log("🔧 Set default user: math");
  }

  // Check if movie data is available
  if (!window.moviesData || Object.keys(window.moviesData).length === 0) {
    console.warn("⚠️ Movie data not found, attempting to load...");
    if (typeof loadMoviesData === "function") {
      loadMoviesData();
    }
  } else {
    console.log(`✅ Movie data loaded: ${Object.keys(window.moviesData).length} movies`);
  }

  // Wait for elements to be ready, then initialize profile modal
  setTimeout(() => {
    console.log("🔧 Initializing profile modal after DOM is ready...");
    initializeProfileModal();
  }, 100);
});

// ==========================
// 9. MOBILE MENU SYSTEM
// ==========================

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
        <img src="assets/icons/mathflix-icon-white.svg" alt="Profile">
        <span>Profile</span>
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
        if (typeof openProfileModal === "function") {
          openProfileModal();
        } else {
          console.error("❌ openProfileModal function not found");
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
        if (typeof handleLogout === "function") {
          handleLogout();
        } else {
          console.error("❌ handleLogout function not found");
        }
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
 * Setup mobile header controls (APENAS search no header) - FUNÇÃO COMPLETA
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

// ✅ TESTE FUNCTION para debug
window.testRandomMovie = function () {
  console.log("🧪 Testing random movie function...");
  if (typeof showRandomMovieCard === "function") {
    showRandomMovieCard();
    console.log("✅ Random movie function works!");
  } else {
    console.error("❌ showRandomMovieCard function not found!");
  }
};

// ✅ FORCE SETUP quando página carregar
window.addEventListener("load", function () {
  console.log("🔧 Window loaded - setting up random movie buttons...");

  // Force setup all random buttons
  document.querySelectorAll(".random-movie-btn, #random-movie-btn, #random-movie-btn-bottom").forEach((btn) => {
    if (btn && !btn.dataset.listenerAttached) {
      btn.dataset.listenerAttached = "true";
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log("🎲 FORCE: Random button clicked");
        if (typeof showRandomMovieCard === "function") {
          showRandomMovieCard();
        } else {
          console.error("❌ showRandomMovieCard not available!");
        }
      });
      console.log("✅ Force attached listener to:", btn.id || btn.className);
    }
  });
});

console.log("✅ Random movie force setup completed");
