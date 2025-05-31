// ==========================
// === MATHFLIX SCRIPT.JS - SECTION INDEX ===
// ==========================
// 1. GLOBAL VARIABLES & CONFIGURATIONS
// 2. LOCALSTORAGE MANAGEMENT FUNCTIONS
// 3. MOVIE MODAL SYSTEM (Open/Close/Events)
// 4. MOVIE RANKING & COMMENT SYSTEM
// 5. SEARCH & RANDOM MOVIE FUNCTIONALITY
// 6. SEARCH AUTOCOMPLETE & SUGGESTIONS
// 7. INITIALIZATION & STARTUP
// ==========================

// ==========================
// 1. GLOBAL VARIABLES & CONFIGURATIONS
// ==========================

// Admin configuration - set to true to allow ranking editing and comments
const isAdminUser = true; // Change to false to disable editing features

// Current movie key being displayed in modal
let currentMovieKey = null;

// List of movies that use vertical poster layout in modal
const verticalMovies = ["screen", "chucky", "tifannychucky", "seedschucky", "substance"];

// Search pagination variables
let currentPage = 1;
let currentResults = [];

// ==========================
// 2. LOCALSTORAGE MANAGEMENT FUNCTIONS
// ==========================

// Save movie data (rankings and comments) to localStorage
function saveMovieData(movieKey, data) {
  try {
    const existingData = JSON.parse(localStorage.getItem("mathflix_movies")) || {};
    existingData[movieKey] = data;
    localStorage.setItem("mathflix_movies", JSON.stringify(existingData));
    console.log(`💾 Saved data for movie: ${movieKey}`);
  } catch (error) {
    console.warn("❌ Error saving movie data:", error);
  }
}

// Load saved movie data (rankings and comments) from localStorage
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
// 3. MOVIE MODAL SYSTEM (Open/Close/Events)
// ==========================

// Handle clicks on movie thumbnails and buttons (delegated event listener)
document.addEventListener("click", function (e) {
  // EXCLUDE vertical carousel clicks - these are handled by main.js
  if (e.target.closest(".splide-vertical")) {
    return; // Let main.js handle vertical carousel interactions
  }

  // Check if clicked element is a movie modal trigger
  const target = e.target.closest(".open-movie-modal");
  if (target && target.dataset.movie) {
    e.preventDefault();
    openMovieModal(target.dataset.movie);
  }
});

// Open movie modal with all movie information
function openMovieModal(key) {
  const movieInfo = window.moviesData[key];
  if (!movieInfo) {
    console.error("❌ Movie not found:", key);
    return;
  }

  console.log(`🎬 Opening modal for: ${movieInfo.title}`);
  const movieModal = document.getElementById("movie-modal");

  // Generate genre buttons HTML
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

  // Determine if this is a vertical poster movie (different layout)
  const isVerticalMovie = verticalMovies.includes(key);

  if (isVerticalMovie) {
    // Setup vertical layout (poster + trailer toggle)
    document.querySelector(".movie-modal__media").style.display = "none";
    document.querySelector(".movie-modal__media-vertical").style.display = "flex";
    document.getElementById("vertical-modal-poster").src = movieInfo.poster;
    document.getElementById("vertical-modal-poster").alt = movieInfo.title;
    document.getElementById("vertical-modal-trailer").src = movieInfo.trailer;
    document.getElementById("vertical-modal-poster").style.display = "block";
    document.getElementById("vertical-modal-trailer").style.display = "none";
    document.getElementById("toggle-vertical-media").textContent = "See Trailer";

    // Toggle between poster and trailer for vertical movies
    document.getElementById("toggle-vertical-media").onclick = function () {
      const poster = document.getElementById("vertical-modal-poster");
      const trailer = document.getElementById("vertical-modal-trailer");

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
    };
  } else {
    // Setup horizontal layout (poster + trailer side by side)
    document.querySelector(".movie-modal__media").style.display = "flex";
    document.querySelector(".movie-modal__media-vertical").style.display = "none";
    document.getElementById("movie-modal-poster").src = movieInfo.poster;
    document.getElementById("movie-modal-poster").alt = movieInfo.title;
    document.getElementById("movie-modal-trailer").src = movieInfo.trailer;
  }

  // Initialize ranking system for this movie
  currentMovieKey = key;
  renderRanking(currentMovieKey);

  // Show the modal
  movieModal.style.display = "flex";
}

// Close movie modal and clean up
function closeMovieModal() {
  const movieModal = document.getElementById("movie-modal");
  if (movieModal) {
    movieModal.style.display = "none";

    // Stop all video trailers to save bandwidth
    const trailer = document.getElementById("movie-modal-trailer");
    const verticalTrailer = document.getElementById("vertical-modal-trailer");
    if (trailer) trailer.src = "";
    if (verticalTrailer) verticalTrailer.src = "";

    console.log("🔒 Movie modal closed");

    // If search modal was open before movie modal, keep it open and refocus
    const searchModal = document.getElementById("search-modal");
    if (searchModal && searchModal.style.display === "flex") {
      const searchInput = document.getElementById("search-input");
      if (searchInput) {
        setTimeout(() => searchInput.focus(), 100);
      }
    }
  }
}

// Setup modal close event listeners
document.addEventListener("DOMContentLoaded", function () {
  const movieModal = document.getElementById("movie-modal");

  if (movieModal) {
    // Close button (X) functionality
    const closeBtn = movieModal.querySelector(".movie-modal__close");
    if (closeBtn) {
      closeBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        closeMovieModal();
      });
    }

    // Click outside modal to close (only on backdrop, not content)
    movieModal.addEventListener("click", function (e) {
      // Only close if clicked directly on modal backdrop, not on content
      if (e.target === movieModal || e.target.classList.contains("movie-modal__backdrop")) {
        closeMovieModal();
      }
    });
  }
});

// Make closeMovieModal function available globally for main.js
window.closeMovieModal = closeMovieModal;

// ==========================
// 4. MOVIE RANKING & COMMENT SYSTEM
// ==========================

// Generate star rating HTML for a user
function renderStars(user, value, editable) {
  let starsHtml = "";

  // Create 5 stars, filled based on rating value
  for (let i = 1; i <= 5; i++) {
    starsHtml += `<span class="star${i <= value ? " filled" : ""}" data-user="${user}" data-value="${i}" ${
      editable ? "" : 'style="pointer-events:none"'
    }>★</span>`;
  }

  // Add comment button for admin users
  if (editable) {
    starsHtml += `<button class="comment-btn" data-user="${user}" title="Add comment" style="margin-left:8px;padding:2px 7px;font-size:1.1rem;border-radius:5px;border:none;background:#4aa042;color:#fff;cursor:pointer;">💬</button>`;
  }

  return starsHtml;
}

// Get truncated comment preview for display
function getCommentPreview(text) {
  if (!text) return "";
  if (text.length <= 15) return text;
  return text.slice(0, 15) + " ...";
}

// Render the complete ranking section with stars and comments
function renderRanking(movieKey) {
  const movieInfo = window.moviesData[movieKey];
  if (!movieInfo || !movieInfo.ranking) return;

  // Load any saved rankings/comments from localStorage
  const savedData = getSavedMovieData(movieKey);
  if (savedData) {
    movieInfo.ranking = savedData.ranking;
    movieInfo.comments = savedData.comments;
  }

  const container = document.getElementById("movie-modal-ranking");

  // Initialize comments object if it doesn't exist
  if (!movieInfo.comments) movieInfo.comments = { math: "", digo: "" };

  // Render ranking HTML with stars and comment previews
  container.innerHTML = `
    <div class="stars-row">
      <span class="stars-label">Math</span>
      ${renderStars("math", movieInfo.ranking.math, isAdminUser)}
      <span class="comment-text" id="comment-math" style="cursor:pointer; color:#4aa042; text-decoration:underline; margin-left:8px;">
        ${movieInfo.comments.math ? getCommentPreview(movieInfo.comments.math) : ""}
      </span>
    </div>
    <div class="stars-row">
      <span class="stars-label">Digo</span>
      ${renderStars("digo", movieInfo.ranking.digo, isAdminUser)}
      <span class="comment-text" id="comment-digo" style="cursor:pointer; color:#4aa042; text-decoration:underline; margin-left:8px;">
        ${movieInfo.comments.digo ? getCommentPreview(movieInfo.comments.digo) : ""}
      </span>
    </div>
  `;

  // Add click events for existing comment previews to show full text
  if (movieInfo.comments.math) {
    document.getElementById("comment-math").onclick = () => showCommentBox("math", true);
  }
  if (movieInfo.comments.digo) {
    document.getElementById("comment-digo").onclick = () => showCommentBox("digo", true);
  }
}

// Handle star rating clicks and comment button clicks (admin only)
document.addEventListener("click", function (e) {
  // Star rating click handling
  if (isAdminUser && e.target.classList.contains("star")) {
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
      console.log(`⭐ Updated ${user}'s rating to ${value} stars`);
    }
  }

  // Comment button click handling
  if (isAdminUser && e.target.classList.contains("comment-btn")) {
    const user = e.target.dataset.user;
    showCommentBox(user);
  }
});

// Show comment popup for adding/editing comments
function showCommentBox(user, readOnly = false) {
  const movieInfo = window.moviesData[currentMovieKey];
  if (!movieInfo) return;

  // Get existing comment or empty string
  const existingComment = movieInfo.comments && movieInfo.comments[user] ? movieInfo.comments[user] : "";

  // Get popup elements
  const popup = document.getElementById("comment-popup");
  const label = document.getElementById("comment-popup-label");
  const input = document.getElementById("comment-popup-input");
  const saveBtn = document.getElementById("comment-popup-save");
  const cancelBtn = document.getElementById("comment-popup-cancel");
  const count = document.getElementById("comment-popup-count");

  // Setup popup content
  label.textContent = `Comment for ${user === "math" ? "Math" : "Digo"}:`;
  input.value = existingComment;
  count.textContent = `${input.value.length}/300`;
  popup.style.display = "flex";
  input.focus();

  // Handle read-only mode for non-admin users
  if (readOnly && !isAdminUser) {
    input.setAttribute("readonly", "readonly");
    saveBtn.style.display = "none";
    count.style.display = "none";
  } else {
    input.removeAttribute("readonly");
    saveBtn.style.display = "";
    count.style.display = "";
  }

  // Update character count as user types
  input.oninput = () => {
    count.textContent = `${input.value.length}/300`;
  };

  // Save comment functionality
  saveBtn.onclick = () => {
    movieInfo.comments[user] = input.value.slice(0, 300); // Limit to 300 characters

    // Save to localStorage
    saveMovieData(currentMovieKey, {
      ranking: movieInfo.ranking,
      comments: movieInfo.comments,
    });

    popup.style.display = "none";
    renderRanking(currentMovieKey);
    console.log(`💬 Updated comment for ${user}`);
  };

  // Cancel functionality
  cancelBtn.onclick = () => {
    popup.style.display = "none";
  };
}

// ==========================
// 5. SEARCH & RANDOM MOVIE FUNCTIONALITY
// ==========================

(function () {
  // Get search elements
  const searchSubmit = document.getElementById("search-submit");
  const searchInput = document.getElementById("search-input");
  const searchResult = document.getElementById("search-result");

  // Exit if search elements don't exist
  if (!searchSubmit || !searchInput || !searchResult) {
    console.warn("⚠️ Search elements not found");
    return;
  }

  // Render search results with pagination
  function renderSearchPage(page = 1) {
    const perPage = 8; // Maximum 8 results per page (4x2 or 5x2 grid)
    const totalPages = Math.ceil(currentResults.length / perPage);
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const pageResults = currentResults.slice(start, end);

    // Adjust container height based on number of results
    const searchResultContainer = document.getElementById("search-result");
    if (pageResults.length > 4) {
      searchResultContainer.classList.add("two-rows");
    } else {
      searchResultContainer.classList.remove("two-rows");
    }

    // Determine optimal grid columns based on result count and screen size
    let columns;
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
      // 5 or more movies - adjust for screen size
      columns = isLargeScreen ? 5 : 4;
    }

    // Generate search results HTML
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
                <span>Page ${page} of ${totalPages}</span>
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

  // Main search functionality
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

  // Random movie selection functionality
  function showRandomMovieCard() {
    const surpriseModal = document.getElementById("surprise-modal");
    const surpriseContent = document.getElementById("surprise-modal-content");

    if (!surpriseModal || !surpriseContent || !window.moviesData) return;

    surpriseModal.style.display = "flex";

    // Select random movie
    const movieKeys = Object.keys(window.moviesData);
    const randomKey = movieKeys[Math.floor(Math.random() * movieKeys.length)];
    const movieInfo = window.moviesData[randomKey];

    if (!movieInfo) return;

    console.log(`🎲 Random movie selected: ${movieInfo.title}`);

    // Setup countdown timer
    let countdown = 10;
    surpriseContent.innerHTML = `
      <button id="surprise-close" aria-label="Close" style="position:absolute;top:0.1rem;right:1rem;background:none;border:none;color:#fff;font-size:3rem;cursor:pointer;">&times;</button>
      <div class="random-card">
        <div style="font-size:1.2em; color:#4caf50; font-weight:bold; margin-bottom:0.7em;">Your random pick is:</div>
        <div style="font-size:1.5em; color:#fff; font-weight:bold; margin-bottom:1.2em;">${movieInfo.title}</div>
        <div style="display:flex; gap:1rem;">
          <button id="go-random-movie" class="random-movie-btn" style="margin-top:0;">Go to movie (${countdown}s)</button>
          <button id="reroll-random-movie" class="random-movie-btn" style="margin-top:0; background:#222; color:#4caf50; border:1.5px solid #4caf50;">Reroll</button>
        </div>
      </div>
    `;

    // Get button elements
    const goBtn = document.getElementById("go-random-movie");
    const rerollBtn = document.getElementById("reroll-random-movie");
    const closeBtn = document.getElementById("surprise-close");

    // Countdown timer that auto-opens movie after 10 seconds
    let timer = setInterval(() => {
      countdown--;
      if (goBtn) goBtn.textContent = `Go to movie (${countdown}s)`;

      if (countdown <= 0) {
        clearInterval(timer);
        surpriseModal.style.display = "none";
        // Small delay before opening movie to allow modal to close
        setTimeout(() => {
          const movieThumb = document.querySelector(`img[data-movie="${randomKey}"]`);
          if (movieThumb) movieThumb.click();
        }, 350);
      }
    }, 1000);

    // Manual "Go to movie" button
    goBtn.addEventListener("click", () => {
      clearInterval(timer);
      surpriseModal.style.display = "none";
      setTimeout(() => {
        const movieThumb = document.querySelector(`img[data-movie="${randomKey}"]`);
        if (movieThumb) movieThumb.click();
      }, 350);
    });

    // Reroll button - pick another random movie
    rerollBtn.addEventListener("click", () => {
      clearInterval(timer);
      showRandomMovieCard(); // Recursive call for new random selection
    });

    // Close button
    closeBtn.addEventListener("click", () => {
      clearInterval(timer);
      surpriseModal.style.display = "none";
    });
  }

  // Event listener for random movie button clicks
  document.addEventListener("click", function (e) {
    if (e.target.id === "random-movie-btn" || e.target.closest("#random-movie-btn")) {
      e.preventDefault();
      showRandomMovieCard();
    }
  });
})();

// ==========================
// 6. SEARCH AUTOCOMPLETE & SUGGESTIONS
// ==========================

(function () {
  const searchInput = document.getElementById("search-input");
  const searchSubmit = document.getElementById("search-submit");

  if (!searchInput) return;

  // Create or get autocomplete dropdown element
  let searchAutocomplete = document.getElementById("search-autocomplete");
  if (!searchAutocomplete) {
    searchAutocomplete = document.createElement("ul");
    searchAutocomplete.id = "search-autocomplete";
    searchAutocomplete.className = "autocomplete-list";
    searchInput.parentNode.insertBefore(searchAutocomplete, searchInput.nextSibling);
  }

  // Generate autocomplete suggestions as user types
  searchInput.addEventListener("input", function () {
    const query = this.value.trim().toLowerCase();
    searchAutocomplete.innerHTML = "";

    // Don't show suggestions for empty queries
    if (!query || !window.moviesData) return;

    const suggestions = [];

    // Search through all movie data for matches
    for (const key in window.moviesData) {
      const movie = window.moviesData[key];

      // Check movie title
      if (movie.title.toLowerCase().includes(query)) {
        suggestions.push({ label: movie.title, category: "Title", key });
      }

      // Check director
      if (movie.director && movie.director.toLowerCase().includes(query)) {
        suggestions.push({ label: movie.director, category: "Director", key });
      }

      // Check cast members
      if (movie.cast) {
        movie.cast.forEach((actor) => {
          if (actor.toLowerCase().includes(query)) {
            suggestions.push({ label: actor, category: "Actor", key });
          }
        });
      }

      // Check genres
      if (movie.genre) {
        movie.genre.forEach((genre) => {
          if (genre.toLowerCase().includes(query)) {
            suggestions.push({ label: genre, category: "Genre", key });
          }
        });
      }
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
        if (searchSubmit) searchSubmit.click();
      });

      searchAutocomplete.appendChild(listItem);
    });
  });

  // Allow Enter key to trigger search from input
  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && searchSubmit) {
      e.preventDefault();
      searchSubmit.click();
    }
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
      }
    }
  });
})();

// ==========================
// 7. INITIALIZATION & STARTUP
// ==========================

// Ensure movie data is loaded before any functionality is used
document.addEventListener("DOMContentLoaded", function () {
  // Check if movie data is available
  if (!window.moviesData || Object.keys(window.moviesData).length === 0) {
    console.warn("⚠️ Movie data not found, attempting to load...");

    // Try to load movie data if the function exists
    if (typeof loadMoviesData === "function") {
      loadMoviesData();
    }
  } else {
    console.log(`✅ Movie data loaded successfully: ${Object.keys(window.moviesData).length} movies available`);
  }
});
