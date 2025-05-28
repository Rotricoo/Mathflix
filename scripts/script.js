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
// === GENERAL MODALS (Search, Notification, Coming Soon) ===
// ==========================

// --- Search Modal ---
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
if (searchSubmit) {
  let currentPage = 1;
  let currentResults = [];

  function renderSearchPage(page = 1) {
    const perPage = 10;
    const totalPages = Math.ceil(currentResults.length / perPage);
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const pageResults = currentResults.slice(start, end);

    searchResult.innerHTML = `
      <div class="search-thumbs-wrapper">
        <div class="search-thumbs-grid">
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
                <button ${page === 1 ? "disabled" : ""} id="search-prev">Prev</button>
                <span>Page ${page} of ${totalPages}</span>
                <button ${page === totalPages ? "disabled" : ""} id="search-next">Next</button>
              </div>`
            : ""
        }
      </div>
    `;
    // Ativa os botões para abrir o modal do filme
    document.querySelectorAll(".open-movie-modal").forEach((el) => {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        const key = this.dataset.movie;
        const info = window.moviesData[key];
        if (!info) return;
        document.querySelector(`img[data-movie="${key}"]`).click();
      });
    });
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
}
if (searchInput) {
  searchInput.addEventListener("focus", () => {
    searchResult.textContent = "";
    searchResult.style.display = "none";
    searchSubmit.style.display = "inline-block";
  });
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchSubmit.click();
    }
  });
}

// --- Notification Modal ---
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

// --- Coming Soon Modal for Navigation Links ---
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

// --- Setup modal close for all modals ---
setupModalCloseOnBackdrop("search-modal", "search-modal__content", "search-close");
setupModalCloseOnBackdrop("notification-modal", "search-modal__content", "notification-close");
setupModalCloseOnBackdrop("coming-soon-modal", "search-modal__content", "coming-soon-close");

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

// SPOILER BUTTON
const spoilerBtn = document.getElementById("spoiler-btn");
let spoilerFixed = false;
let step = 0;
if (spoilerBtn) {
  function fixSpoilerBtn() {
    if (!spoilerFixed) {
      spoilerBtn.classList.add("spoiler-fixed");
      spoilerFixed = true;
      spoilerBtn.removeEventListener("mouseenter", fixSpoilerBtn);
      document.querySelector(".hero-content").removeEventListener("mouseenter", fixSpoilerBtn);
      document.querySelector(".hero__see-details-btn").removeEventListener("mouseenter", fixSpoilerBtn);
    }
  }
  spoilerBtn.addEventListener("mouseenter", fixSpoilerBtn);
  document.querySelector(".hero-content").addEventListener("mouseenter", fixSpoilerBtn);
  document.querySelector(".hero__see-details-btn").addEventListener("mouseenter", fixSpoilerBtn);

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
// === MOVIE MODAL LOGIC ===
// ==========================

// --- Vertical Movies List ---
const verticalMovies = ["screen", "chucky", "tifannychucky", "seedschucky", "substance"];

// --- Open Movie Modal on Thumbnail Click ---
// (Só pode existir UM bloco para .open-movie-modal!)
document.querySelectorAll(".open-movie-modal").forEach((img) => {
  img.addEventListener("click", function (e) {
    e.preventDefault();
    const key = this.dataset.movie;
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
  });
});

// --- Close Movie Modal on X or Backdrop Click ---
const closeModalBtn = document.querySelector(".movie-modal__close");
const modalBackdrop = document.querySelector(".movie-modal__backdrop");
if (closeModalBtn) {
  closeModalBtn.onclick = () => {
    document.getElementById("movie-modal").style.display = "none";
    document.getElementById("movie-modal-trailer").src = "";
    document.getElementById("vertical-modal-trailer").src = "";
  };
}
if (modalBackdrop) {
  modalBackdrop.onclick = () => {
    document.getElementById("movie-modal").style.display = "none";
    document.getElementById("movie-modal-trailer").src = "";
    document.getElementById("vertical-modal-trailer").src = "";
  };
}

// --- Close Movie Modal with Escape Key ---
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    const modal = document.getElementById("movie-modal");
    if (modal && modal.style.display === "flex") {
      modal.style.display = "none";
      document.getElementById("movie-modal-trailer").src = "";
      document.getElementById("vertical-modal-trailer").src = "";
    }
  }
});

// ==========================
// === MOVIE RANKING LOGIC ===
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
  // Adiciona evento para abrir o popup ao clicar no preview
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

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".open-movie-modal").forEach((img) => {
    img.addEventListener("click", function (e) {
      e.preventDefault();
      const key = this.dataset.movie;
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
    });
  });
});

// --- Search Functionality ---

if (searchSubmit) {
  let currentPage = 1;
  let currentResults = [];

  function renderSearchPage(page = 1) {
    const perPage = 10;
    const totalPages = Math.ceil(currentResults.length / perPage);
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const pageResults = currentResults.slice(start, end);

    searchResult.innerHTML = `
      <div class="search-thumbs-wrapper">
        <div class="search-thumbs-grid">
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
                <button ${page === 1 ? "disabled" : ""} id="search-prev">Prev</button>
                <span>Page ${page} of ${totalPages}</span>
                <button ${page === totalPages ? "disabled" : ""} id="search-next">Next</button>
              </div>`
            : ""
        }
      </div>
    `;
    // Ativa os botões para abrir o modal do filme
    document.querySelectorAll(".open-movie-modal").forEach((el) => {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        const key = this.dataset.movie;
        const info = window.moviesData[key];
        if (!info) return;
        document.querySelector(`img[data-movie="${key}"]`).click();
      });
    });
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
}
document.addEventListener("DOMContentLoaded", function () {
  // ...existing code...

  const randomBtn = document.getElementById("random-movie-btn");
  if (randomBtn) {
    randomBtn.addEventListener("click", function handleRandomClick() {
      const keys = Object.keys(window.moviesData);
      if (!keys.length) return;
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      const info = window.moviesData[randomKey];
      if (!info) return;

      let countdown = 10;
      const notificationResult = document.getElementById("notification-result");
      notificationResult.innerHTML = `
        <div class="random-card" style="margin:2rem auto 0 auto; background:#181818e6; border-radius:1.2rem; box-shadow:0 4px 24px #000a; padding:2.5rem 2rem 2rem 2rem; max-width:340px; display:flex; flex-direction:column; align-items:center;">
          <div style="font-size:1.2em; color:#4caf50; font-weight:bold; margin-bottom:0.7em;">Your random pick is:</div>
          <div style="font-size:1.5em; color:#fff; font-weight:bold; margin-bottom:1.2em;">${info.title}</div>
          <button id="go-random-movie" class="random-movie-btn" style="margin-top:0;">Go to movie (${countdown}s)</button>
        </div>
      `;

      const goBtn = document.getElementById("go-random-movie");
      let timer = setInterval(() => {
        countdown--;
        if (goBtn) goBtn.textContent = `Go to movie (${countdown}s)`;
        if (countdown <= 0) {
          clearInterval(timer);
          document.getElementById("notification-modal").style.display = "none";
          setTimeout(() => {
            document.querySelector(`img[data-movie="${randomKey}"]`).click();
            // Restaura o conteúdo original
            notificationResult.innerHTML = `
              No notifications for you, Math! 🍿
              <button id="random-movie-btn" class="random-movie-btn">Surprise Me!</button>
            `;
            document.getElementById("random-movie-btn").addEventListener("click", handleRandomClick);
          }, 350);
        }
      }, 1000);

      goBtn.addEventListener("click", () => {
        clearInterval(timer);
        document.getElementById("notification-modal").style.display = "none";
        setTimeout(() => {
          document.querySelector(`img[data-movie="${randomKey}"]`).click();
          notificationResult.innerHTML = `
            No notifications for you, Math! 🍿
            <button id="random-movie-btn" class="random-movie-btn">Surprise Me!</button>
          `;
          document.getElementById("random-movie-btn").addEventListener("click", handleRandomClick);
        }, 350);
      });
    });
  }
});

function showRandomMovieCard() {
  const keys = Object.keys(window.moviesData);
  if (!keys.length) return;
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  const info = window.moviesData[randomKey];
  if (!info) return;

  let countdown = 10;
  const notificationResult = document.getElementById("notification-result");
  notificationResult.innerHTML = `
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
  let timer = setInterval(() => {
    countdown--;
    if (goBtn) goBtn.textContent = `Go to movie (${countdown}s)`;
    if (countdown <= 0) {
      clearInterval(timer);
      document.getElementById("notification-modal").style.display = "none";
      setTimeout(() => {
        document.querySelector(`img[data-movie="${randomKey}"]`).click();
        // Restore original content
        notificationResult.innerHTML = `
          <div>No notifications for you, Math! 🍿</div>
          <button id="random-movie-btn" class="random-movie-btn">Surprise Me!</button>
        `;
        document.getElementById("random-movie-btn").addEventListener("click", showRandomMovieCard);
      }, 350);
    }
  }, 1000);

  goBtn.addEventListener("click", () => {
    clearInterval(timer);
    document.getElementById("notification-modal").style.display = "none";
    setTimeout(() => {
      document.querySelector(`img[data-movie="${randomKey}"]`).click();
      notificationResult.innerHTML = `
        <div>No notifications for you, Math! 🍿</div>
        <button id="random-movie-btn" class="random-movie-btn">Surprise Me!</button>
      `;
      document.getElementById("random-movie-btn").addEventListener("click", showRandomMovieCard);
    }, 350);
  });

  rerollBtn.addEventListener("click", () => {
    clearInterval(timer);
    showRandomMovieCard();
  });
}

// Inicializa o botão "Surprise Me!"
document.addEventListener("DOMContentLoaded", function () {
  const randomBtn = document.getElementById("random-movie-btn");
  if (randomBtn) {
    randomBtn.addEventListener("click", showRandomMovieCard);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // ...existing code...

  // Hero "See details" button logic
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
