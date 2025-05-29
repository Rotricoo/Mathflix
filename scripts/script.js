// ==========================
// === SECTION INDEX (script.js)
// ==========================
// 1. MOVIE MODAL LOGIC
// 2. MOVIE RANKING LOGIC
// 3. SEARCH & RANDOM MOVIE (FILMES)
// 4. SEARCH AUTOCOMPLETE LOGIC
// ==========================

// ==========================
// 1. MOVIE MODAL LOGIC
// ==========================

// --- List of vertical movies ---
const verticalMovies = ["screen", "chucky", "tifannychucky", "seedschucky", "substance"];

// --- Open movie modal when clicking a thumb or button (delegated for dynamic elements) ---
document.addEventListener("click", function (e) {
  const target = e.target.closest(".open-movie-modal");
  if (target && target.dataset.movie) {
    e.preventDefault();
    openMovieModal(target.dataset.movie);
  }
});

function openMovieModal(key) {
  const info = window.moviesData[key];
  if (!info) return;

  // Render genres as clickable buttons
  const genresHtml = info.genre.map((g) => `<button class="movie-genre" data-genre="${g}">${g}</button>`).join(", ");

  document.getElementById("movie-modal-title").textContent = info.title;
  document.getElementById("movie-modal-meta").innerHTML = `
    <li><strong>Year:</strong> <span>${info.year}</span></li>
    <li><strong>Age:</strong> <span>${info.age}</span></li>
    <li><strong>Duration:</strong> <span>${info.duration}</span></li>
    <li><strong>Origin:</strong> <span>${info.origin}</span></li>
    <li><strong>Locations:</strong> <span>${
      Array.isArray(info.locations) ? info.locations.join(" / ") : info.locations
    }</span></li>
    <li><strong>Director:</strong> <span>${info.director}</span></li>
    <li><strong>Cast:</strong> <span>${info.cast.join(", ")}</span></li>
    <li><strong>Genre:</strong> ${genresHtml}</li>
  `;
  document.getElementById("movie-modal-description").textContent = info.description;

  // Check if movie is vertical
  const isVertical = verticalMovies.includes(key);

  if (isVertical) {
    document.querySelector(".movie-modal__media").style.display = "none";
    document.querySelector(".movie-modal__media-vertical").style.display = "flex";

    document.getElementById("vertical-modal-poster").src = info.poster;
    document.getElementById("vertical-modal-poster").alt = info.title;
    document.getElementById("vertical-modal-trailer").src = info.trailer;
    document.getElementById("vertical-modal-poster").style.display = "block";
    document.getElementById("vertical-modal-trailer").style.display = "none";
    document.getElementById("toggle-vertical-media").textContent = "See Trailer";

    // Toggle between poster and trailer
    document.getElementById("toggle-vertical-media").onclick = function () {
      const poster = document.getElementById("vertical-modal-poster");
      const trailer = document.getElementById("vertical-modal-trailer");
      if (poster.style.display !== "none") {
        poster.style.display = "none";
        trailer.style.display = "block";
        this.textContent = "See Poster";
      } else {
        poster.style.display = "block";
        trailer.style.display = "none";
        this.textContent = "See Trailer";
      }
    };
  } else {
    document.querySelector(".movie-modal__media").style.display = "flex";
    document.querySelector(".movie-modal__media-vertical").style.display = "none";
    document.getElementById("movie-modal-poster").src = info.poster;
    document.getElementById("movie-modal-poster").alt = info.title;
    document.getElementById("movie-modal-trailer").src = info.trailer;
  }

  // Ranking
  currentMovieKey = key;
  renderRanking(currentMovieKey);

  document.getElementById("movie-modal").style.display = "flex";
}

// --- Close movie modal ---
const closeModalBtn = document.querySelector(".movie-modal__close");
const modalBackdrop = document.querySelector(".movie-modal__backdrop");
function closeMovieModal() {
  document.getElementById("movie-modal").style.display = "none";
  document.getElementById("movie-modal-trailer").src = "";
  document.getElementById("vertical-modal-trailer").src = "";
}
if (closeModalBtn) closeModalBtn.onclick = closeMovieModal;
if (modalBackdrop) modalBackdrop.onclick = closeMovieModal;

// --- Close movie modal with ESC ---
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    const modal = document.getElementById("movie-modal");
    if (modal && modal.style.display === "flex") {
      closeMovieModal();
    }
  }
});

// ==========================
// 2. MOVIE RANKING LOGIC
// ==========================

const loggedUser = localStorage.getItem("mathflixUser");
const userRole = localStorage.getItem("mathflixRole");
const isAdminUser = userRole === "admin";
let currentMovieKey = null;

// --- LocalStorage helpers for rankings/comments ---
function getSavedMovieData(key) {
  const saved = localStorage.getItem("movieData_" + key);
  return saved ? JSON.parse(saved) : null;
}
function saveMovieData(key, data) {
  localStorage.setItem("movieData_" + key, JSON.stringify(data));
}

// Render stars for a given user, with comment button if admin
function renderStars(user, value, editable) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    stars += `<span class="star${i <= value ? " filled" : ""}" data-user="${user}" data-value="${i}" ${
      editable ? "" : 'style="pointer-events:none"'
    }>★</span>`;
  }
  // Add comment button if admin
  if (editable) {
    stars += `<button class="comment-btn" data-user="${user}" title="Add comment" style="margin-left:8px;padding:2px 7px;font-size:1.1rem;border-radius:5px;border:none;background:#4aa042;color:#fff;cursor:pointer;">💬</button>`;
  }
  return stars;
}

function getCommentPreview(text) {
  if (!text) return "";
  if (text.length <= 15) return text;
  return text.slice(0, 15) + " ...";
}

// Render ranking section with comments
function renderRanking(movieKey) {
  const info = window.moviesData[movieKey];
  if (!info || !info.ranking) return;

  // Load saved data from localStorage (if exists)
  const saved = getSavedMovieData(movieKey);
  if (saved) {
    info.ranking = saved.ranking;
    info.comments = saved.comments;
  }

  const container = document.getElementById("movie-modal-ranking");
  if (!info.comments) info.comments = { math: "", digo: "" };
  container.innerHTML = `
    <div class="stars-row">
      <span class="stars-label">Math</span>
      ${renderStars("math", info.ranking.math, isAdminUser)}
      <span class="comment-text" id="comment-math" style="cursor:pointer; color:#4aa042; text-decoration:underline; margin-left:8px;">
        ${info.comments.math ? getCommentPreview(info.comments.math) : ""}
      </span>
    </div>
    <div class="stars-row">
      <span class="stars-label">Digo</span>
      ${renderStars("digo", info.ranking.digo, isAdminUser)}
      <span class="comment-text" id="comment-digo" style="cursor:pointer; color:#4aa042; text-decoration:underline; margin-left:8px;">
        ${info.comments.digo ? getCommentPreview(info.comments.digo) : ""}
      </span>
    </div>
  `;
  // Add event to open popup on preview click
  if (info.comments.math) {
    document.getElementById("comment-math").onclick = () => showCommentBox("math", true);
  }
  if (info.comments.digo) {
    document.getElementById("comment-digo").onclick = () => showCommentBox("digo", true);
  }
}

// Handle star click (only in admin mode)
document.addEventListener("click", function (e) {
  if (isAdminUser && e.target.classList.contains("star")) {
    const user = e.target.dataset.user;
    const value = parseInt(e.target.dataset.value, 10);
    if (currentMovieKey && window.moviesData[currentMovieKey]) {
      window.moviesData[currentMovieKey].ranking[user] = value;
      saveMovieData(currentMovieKey, {
        ranking: window.moviesData[currentMovieKey].ranking,
        comments: window.moviesData[currentMovieKey].comments,
      });
      renderRanking(currentMovieKey);
    }
  }
  // Handle comment button click (only admin)
  if (isAdminUser && e.target.classList.contains("comment-btn")) {
    const user = e.target.dataset.user;
    showCommentBox(user);
  }
});

// Show comment input box for admin
function showCommentBox(user, readOnly = false) {
  const info = window.moviesData[currentMovieKey];
  if (!info) return;
  const prev = info.comments && info.comments[user] ? info.comments[user] : "";
  const popup = document.getElementById("comment-popup");
  const label = document.getElementById("comment-popup-label");
  const input = document.getElementById("comment-popup-input");
  const saveBtn = document.getElementById("comment-popup-save");
  const cancelBtn = document.getElementById("comment-popup-cancel");
  const count = document.getElementById("comment-popup-count");

  label.textContent = `Comment for ${user === "math" ? "Math" : "Digo"}:`;
  input.value = prev;
  count.textContent = `${input.value.length}/300`;
  popup.style.display = "flex";
  input.focus();

  if (readOnly && !isAdminUser) {
    input.setAttribute("readonly", "readonly");
    saveBtn.style.display = "none";
    count.style.display = "none";
  } else {
    input.removeAttribute("readonly");
    saveBtn.style.display = "";
    count.style.display = "";
  }

  // Update counter live
  input.oninput = () => {
    count.textContent = `${input.value.length}/300`;
  };

  // Save comment
  saveBtn.onclick = () => {
    info.comments[user] = input.value.slice(0, 300);
    saveMovieData(currentMovieKey, {
      ranking: info.ranking,
      comments: info.comments,
    });
    popup.style.display = "none";
    renderRanking(currentMovieKey);
  };

  // Cancel
  cancelBtn.onclick = () => {
    popup.style.display = "none";
  };
}

// ==========================
// 3. SEARCH & RANDOM MOVIE (FILMES)
// ==========================

if (typeof searchSubmit !== "undefined" && searchSubmit) {
  let currentPage = 1;
  let currentResults = [];

  // Section: 3. SEARCH & RANDOM MOVIE (FILMES)
  function renderSearchPage(page = 1) {
    const perPage = 10;
    const totalPages = Math.ceil(currentResults.length / perPage);
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const pageResults = currentResults.slice(start, end);

    // Quantos cartões na última linha?
    const cardsInLastRow = pageResults.length > 5 ? pageResults.length - 5 : pageResults.length;
    const columns = Math.min(pageResults.length, 5);

    // Só preencher slots invisíveis à direita na última linha
    const emptySlots = (columns - (pageResults.length % columns)) % columns;

    // Ajustar largura da grid dinamicamente
    const gridWidth = columns * 200 + (columns - 1) * 32; // 200px card + 2rem gap

    searchResult.innerHTML = `
      <div class="search-thumbs-wrapper" style="max-width:${gridWidth}px;">
        <div class="search-thumbs-grid" style="max-width:${gridWidth}px; grid-template-columns: repeat(${columns}, 1fr);">
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
          ${"<div class='search-thumb-card' style='visibility:hidden'></div>".repeat(emptySlots)}
        </div>
        ${
          totalPages > 1
            ? `<div class="search-pagination">
                <button ${page === 1 ? "disabled" : ""} id="search-prev">Prev</button>
                <span>Page ${page} of ${totalPages}</span>
                <button ${page === totalPages ? "disabled" : ""} id="search-next">Next</button>
              </div>`
            : ""
        }
      </div>
    `;

    // Paginação
    if (totalPages > 1) {
      const prev = document.getElementById("search-prev");
      const next = document.getElementById("search-next");
      if (prev)
        prev.onclick = () => {
          currentPage--;
          renderSearchPage(currentPage);
        };
      if (next)
        next.onclick = () => {
          currentPage++;
          renderSearchPage(currentPage);
        };
    }
  }

  searchSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    const query = searchInput.value.trim().toLowerCase();
    if (!query) return;

    // --- MathDigo Easter Egg ---
    if (query === "mathdigo") {
      currentResults = Object.keys(window.moviesData).map((key) => ({ ...window.moviesData[key], key }));
    } else {
      currentResults = [];
      for (const key in window.moviesData) {
        const movie = window.moviesData[key];
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

    currentPage = 1;
    if (currentResults.length > 0) {
      renderSearchPage(currentPage);
      searchResult.style.display = "block";
      searchSubmit.style.display = "inline-block";
    } else {
      searchResult.textContent = "Sorry, we couldn't find that. \n Maybe try searching on our sibling Flix?";
      searchResult.style.display = "block";
      searchSubmit.style.display = "none";
    }
  });

  // Enter key triggers search
  if (searchInput) {
    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        searchSubmit.click();
      }
    });
  }
}

// --- Random Movie ("Surprise Me!") ---
function showRandomMovieCard() {
  // Mostra o novo modal
  const surpriseModal = document.getElementById("surprise-modal");
  const surpriseContent = document.getElementById("surprise-modal-content");
  surpriseModal.style.display = "flex";

  const keys = Object.keys(window.moviesData);
  if (!keys.length) return;
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  const info = window.moviesData[randomKey];
  if (!info) return;

  let countdown = 10;
  surpriseContent.innerHTML = `
    <button id="surprise-close" aria-label="Close" style="position:absolute;top:0.1rem;right:1rem;background:none;border:none;color:#fff;font-size:3rem;cursor:pointer;">&times;</button>
    <div class="random-card">
      <div style="font-size:1.2em; color:#4caf50; font-weight:bold; margin-bottom:0.7em;">Your random pick is:</div>
      <div style="font-size:1.5em; color:#fff; font-weight:bold; margin-bottom:1.2em;">${info.title}</div>
      <div style="display:flex; gap:1rem;">
        <button id="go-random-movie" class="random-movie-btn" style="margin-top:0;">Go to movie (${countdown}s)</button>
        <button id="reroll-random-movie" class="random-movie-btn" style="margin-top:0; background:#222; color:#4caf50; border:1.5px solid #4caf50;">Reroll</button>
      </div>
    </div>
  `;

  const goBtn = document.getElementById("go-random-movie");
  const rerollBtn = document.getElementById("reroll-random-movie");
  const closeBtn = document.getElementById("surprise-close");
  let timer = setInterval(() => {
    countdown--;
    if (goBtn) goBtn.textContent = `Go to movie (${countdown}s)`;
    if (countdown <= 0) {
      clearInterval(timer);
      surpriseModal.style.display = "none";
      setTimeout(() => {
        document.querySelector(`img[data-movie="${randomKey}"]`).click();
      }, 350);
    }
  }, 1000);

  goBtn.addEventListener("click", () => {
    clearInterval(timer);
    surpriseModal.style.display = "none";
    setTimeout(() => {
      document.querySelector(`img[data-movie="${randomKey}"]`).click();
    }, 350);
  });

  rerollBtn.addEventListener("click", () => {
    clearInterval(timer);
    showRandomMovieCard();
  });

  closeBtn.addEventListener("click", () => {
    clearInterval(timer);
    surpriseModal.style.display = "none";
  });
}

// Substitua o evento do botão:
document.addEventListener("DOMContentLoaded", function () {
  const randomBtn = document.getElementById("random-movie-btn");
  if (randomBtn) {
    randomBtn.addEventListener("click", showRandomMovieCard);
  }
});

// ==========================
// 4. SEARCH AUTOCOMPLETE LOGIC
// ==========================
if (typeof searchInput !== "undefined" && searchInput) {
  const searchAutocomplete = document.createElement("ul");
  searchAutocomplete.id = "search-autocomplete";
  searchAutocomplete.className = "autocomplete-list";
  searchInput.parentNode.insertBefore(searchAutocomplete, searchInput.nextSibling);

  // Section: 5. SEARCH AUTOCOMPLETE LOGIC
  searchInput.addEventListener("input", function () {
    const query = this.value.trim().toLowerCase();
    searchAutocomplete.innerHTML = "";
    if (!query) return;

    const suggestions = [];
    for (const key in window.moviesData) {
      const movie = window.moviesData[key];
      if (movie.title.toLowerCase().includes(query)) {
        suggestions.push({ label: movie.title, category: "Title", key });
      }
      if (movie.director && movie.director.toLowerCase().includes(query)) {
        suggestions.push({ label: movie.director, category: "Director", key });
      }
      if (movie.cast) {
        movie.cast.forEach((actor) => {
          if (actor.toLowerCase().includes(query)) {
            suggestions.push({ label: actor, category: "Actor", key });
          }
        });
      }
      if (movie.genre) {
        movie.genre.forEach((genre) => {
          if (genre.toLowerCase().includes(query)) {
            suggestions.push({ label: genre, category: "Genre", key });
          }
        });
      }
    }

    // Remove duplicates by label+category
    const unique = [];
    const seen = new Set();
    for (const s of suggestions) {
      const id = s.label + s.category;
      if (!seen.has(id)) {
        unique.push(s);
        seen.add(id);
      }
    }

    unique.slice(0, 8).forEach((s) => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${s.label}</span><span class="autocomplete-category">${s.category}</span>`;
      li.onclick = () => {
        searchInput.value = s.label;
        searchAutocomplete.innerHTML = "";
        if (typeof searchSubmit !== "undefined" && searchSubmit) searchSubmit.click();
      };
      searchAutocomplete.appendChild(li);
    });
  });

  document.addEventListener("click", (e) => {
    if (!searchAutocomplete.contains(e.target) && e.target !== searchInput) {
      searchAutocomplete.innerHTML = "";
    }
  });
}
