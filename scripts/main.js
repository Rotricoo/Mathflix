// ==========================
// === SECTION INDEX (main.js)
// ==========================
// 1. PAGE EFFECTS
// 2. SPOILER BUTTON EFFECT
// 3. SPLIDE CAROUSELS
// 4. HEADER FUNCTIONALITY (Profile Menu)
// 5. HEADER BUTTONS (Search, Notification, Coming Soon)
// 6. HERO "SEE DETAILS" BUTTON
// 7. ESC KEY TO CLOSE MODALS
// 8. HERO SECTION DINÂMICO
// ==========================

// ==========================
// 1. PAGE EFFECTS
// ==========================
window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("page-loaded");
});

// ==========================
// 2. SPOILER BUTTON EFFECT
// ==========================
const spoilerBtn = document.getElementById("spoiler-btn");
let spoilerFixed = false;
let step = 0;

// Adicionar objeto de spoilers no início do arquivo
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

// Substituir o comportamento atual do botão Spoiler
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
          spoilerBtn.innerText = "Spoiler";
          spoilerBtn.style.transform = "";
          spoilerBtn.classList.remove("active");
          step = 0;

          // Mostrar spoiler bobo
          const currentMovieKey = document.querySelector(".hero__see-details-btn").dataset.movie;
          showSpoilerModal(currentMovieKey);
        }
      }, 600);
    }
  });
}

// Função para mostrar o modal de spoiler
function showSpoilerModal(movieKey) {
  // Criar modal de spoiler se não existir
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

  // Exibir o spoiler correspondente ao filme
  spoilerText.textContent = spoilers[movieKey] || "This movie is so secret we don't even have a spoiler for it!";
  spoilerModal.style.display = "flex";

  // Timer para fechar automaticamente (10 segundos)
  let timeLeft = 10; // Reduzido para 10 segundos
  const timer = setInterval(() => {
    timeLeft--;
    spoilerCountdown.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      spoilerModal.style.display = "none";
    }
  }, 1000);

  // Botão para fechar manualmente
  spoilerClose.onclick = () => {
    clearInterval(timer);
    spoilerModal.style.display = "none";
  };
}

// ==========================
// 3. SPLIDE CAROUSELS
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
[
  { selector: ".splide-hungergames", perPage: 4 },
  { selector: ".splide-harrypotter", perPage: 3 },
  { selector: ".splide-alien", perPage: 3 },
  { selector: ".splide-toystory", perPage: 3 },
  { selector: ".splide-xmen", perPage: 3 },
  { selector: ".splide-digohappy", perPage: 5 },
].forEach(({ selector, perPage }) => {
  new Splide(selector, {
    type: "loop",
    perPage,
    gap: "1rem",
    pagination: false,
    arrows: true,
    breakpoints: {
      900: { perPage: 1, gap: "0.5rem" },
      1400: { perPage: 2, gap: "0.8rem" },
    },
  }).mount();
});

// ==========================
// 4. HEADER FUNCTIONALITY (Profile Menu)
// ==========================
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
// 5. HEADER BUTTONS (SEARCH, NOTIFICATION, COMING SOON)
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
setupModalCloseOnBackdrop("search-modal", "search-modal__content", "search-close");
setupModalCloseOnBackdrop("notification-modal", "search-modal__content", "notification-close");
setupModalCloseOnBackdrop("coming-soon-modal", "search-modal__content", "coming-soon-close");

// ==========================
// 6. HERO "SEE DETAILS" BUTTON
// ==========================
document.addEventListener("DOMContentLoaded", function () {
  const heroSeeDetailsBtn = document.querySelector(".hero__see-details-btn");
  if (heroSeeDetailsBtn) {
    heroSeeDetailsBtn.addEventListener("click", function () {
      const key = this.dataset.movie;
      if (!key) return;

      // Verificar se é uma maratona
      const currentHero = heroMovies.find((hero) => hero.key === key);
      if (currentHero && currentHero.type === "marathon") {
        // Abrir a pesquisa com o nome da saga
        const searchModal = document.getElementById("search-modal");
        const searchInput = document.getElementById("search-input");
        const searchSubmit = document.getElementById("search-submit");

        searchModal.style.display = "flex";
        searchInput.value = key.replace("games", " games"); // "hungergames" -> "hunger games"
        searchInput.focus();

        // Dispara a pesquisa após um breve delay
        setTimeout(() => searchSubmit.click(), 300);
      } else {
        // Comportamento padrão para filmes regulares
        const thumb = document.querySelector(`img[data-movie="${key}"]`);
        if (thumb) thumb.click();
      }
    });
  }
});

// ==========================
// 7. ESC KEY TO CLOSE MODALS
// ==========================
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    if (searchModal && searchModal.style.display === "flex") {
      searchModal.style.display = "none";
    }
    if (notificationModal && notificationModal.style.display === "flex") {
      notificationModal.style.display = "none";
    }
    if (comingSoonModal && comingSoonModal.style.display === "flex") {
      comingSoonModal.style.display = "none";
    }
    if (profileMenu && profileMenu.style.display === "block") {
      profileMenu.style.display = "none";
      profileToggle.setAttribute("aria-expanded", "false");
    }
  }
});

// ==========================
// 8. HERO SECTION DINÂMICO
// ==========================

// Array com dados dos filmes do hero - Personalizações avançadas
const heroMovies = [
  {
    key: "gonegirl",
    title: "GONE GIRL",
    background: "assets/hero-banner/mainly-ban-gonegirl.png",
    text: "Between false leads, buried secrets, and a truth that was always an illusion, Nick and Amy play a deadly game where no one is who they seem to be.",
    textHighlight: "In the end, the question remains: who really disappeared?",
    type: "movie",
    textColor: "light", // Para texto claro em fundo escuro
    customStyles: {
      titleColor: "#ffffff",
      titleGradient:
        "linear-gradient(90deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0.9) 100%)",
      accentColor: "#4caf50", // Verde padrão
      buttonColor: "#4caf50", // Verde padrão para botões
      dotColor: "#4caf50", // Cor da bolinha ativa
    },
  },
  {
    key: "arrival",
    title: "ARRIVAL",
    background: "assets/hero-banner/mainly-ban-arrival.png",
    text: "When mysterious spacecraft touch down across the globe, an elite team led by linguist Louise Banks is brought together to investigate.",
    textHighlight: "As mankind teeters on the verge of global war, Banks races against time to decipher their intent.",
    type: "movie",
    textColor: "light", // Para texto claro em fundo escuro
    customStyles: {
      titleColor: "#ffffff",
      titleGradient:
        "linear-gradient(90deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0.9) 100%)",
      accentColor: "#4caf50", // Verde padrão
      buttonColor: "#4caf50", // Verde padrão para botões
      dotColor: "#4caf50", // Cor da bolinha ativa
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
    textColor: "light", // Para texto claro em fundo escuro
    customStyles: {
      titleColor: "#ffffff",
      titleGradient:
        "linear-gradient(90deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0.9) 100%)",
      accentColor: "#4caf50", // Verde padrão
      buttonColor: "#4caf50", // Verde padrão para botões
      dotColor: "#4caf50", // Cor da bolinha ativa
    },
  },
  {
    key: "marypoppins",
    title: "MARY POPPINS",
    background: "assets/hero-banner/mainly-ban-marypoppins.png",
    text: "In the magical world of Mary Poppins, a nanny with extraordinary abilities brings joy and adventure to the lives of the Banks children.",
    textHighlight:
      "With her unique blend of kindness and whimsy, she teaches them valuable life lessons while battling the forces of negativity.",
    type: "movie",
    textColor: "light", // Para texto claro em fundo escuro
    customStyles: {
      titleColor: "#ffffff",
      titleGradient:
        "linear-gradient(90deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0.9) 100%)",
      accentColor: "#4caf50", // Verde padrão
      buttonColor: "#4caf50", // Verde padrão para botões
      dotColor: "#4caf50", // Cor da bolinha ativa
    },
  },
  {
    key: "wandavision",
    title: "WANDAVISION",
    background: "assets/hero-banner/mainly-ban-wandavision.png",
    text: "Wanda Maximoff and Vision are living an idyllic suburban life, trying to conceal their true natures. But as their surroundings begin to move through different decades and television tropes, they suspect things are not as they seem.",
    textHighlight:
      "The line between reality and illusion blurs in this mind-bending series that combines classic sitcoms with the Marvel Cinematic Universe.",
    type: "series",
    textColor: "light", // Para texto claro em fundo escuro
    customStyles: {
      titleColor: "#ffffff",
      titleGradient:
        "linear-gradient(90deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0.9) 100%)",
      accentColor: "#4caf50", // Verde padrão
      buttonColor: "#4caf50", // Verde padrão para botões
      dotColor: "#4caf50", // Cor da bolinha ativa
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
    textColor: "light", // Para texto claro em fundo escuro
    customStyles: {
      titleColor: "#ffffff",
      titleGradient:
        "linear-gradient(90deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0.9) 100%)",
      accentColor: "#4caf50", // Verde padrão
      buttonColor: "#4caf50", // Verde padrão para botões
      dotColor: "#4caf50", // Cor da bolinha ativa
    },
  },
];
// Índice atual do hero e variável para o intervalo
let currentHeroIndex = 0;
let heroInterval = null;

// Função para criar os indicadores de navegação (bolinhas)
function createHeroIndicators() {
  const heroNavigation = document.createElement("div");
  heroNavigation.className = "hero-navigation";

  // Adiciona as bolinhas indicadoras para cada filme
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

  // Adiciona os botões de navegação
  const prevBtn = document.createElement("button");
  prevBtn.className = "hero-nav-btn hero-nav-prev";
  prevBtn.innerHTML = "❮";
  prevBtn.addEventListener("click", () => {
    clearInterval(heroInterval);
    currentHeroIndex = (currentHeroIndex - 1 + heroMovies.length) % heroMovies.length;
    updateHero(currentHeroIndex);
    restartHeroInterval();
  });

  const nextBtn = document.createElement("button");
  nextBtn.className = "hero-nav-btn hero-nav-next";
  nextBtn.innerHTML = "❯";
  nextBtn.addEventListener("click", () => {
    clearInterval(heroInterval);
    currentHeroIndex = (currentHeroIndex + 1) % heroMovies.length;
    updateHero(currentHeroIndex);
    restartHeroInterval();
  });

  // Adiciona os elementos à navegação
  document.querySelector(".hero-content").appendChild(heroNavigation);
  document.querySelector(".hero-content").appendChild(prevBtn);
  document.querySelector(".hero-content").appendChild(nextBtn);
}

function startHeroRotation() {
  // Previne múltiplas inicializações
  if (heroInterval) {
    clearInterval(heroInterval);
  }

  // Mostra o primeiro filme imediatamente
  updateHero(currentHeroIndex);

  // Configura a rotação automática
  restartHeroInterval();
}

// Ajuste do tempo de rotação e botões de spoiler
function restartHeroInterval() {
  // Limpa o intervalo anterior se existir
  if (heroInterval) {
    clearInterval(heroInterval);
  }

  // Configura o novo intervalo (10 segundos em vez de 5)
  heroInterval = setInterval(() => {
    currentHeroIndex = (currentHeroIndex + 1) % heroMovies.length;
    updateHero(currentHeroIndex);
  }, 10000); // Aumentado para 10 segundos
}

function updateHero(index) {
  const hero = heroMovies[index];

  // Elementos que serão atualizados
  const heroTitle = document.querySelector(".hero__title");
  const heroText = document.querySelector(".hero__text:not(.hero__text-bold)");
  const heroTextBold = document.querySelector(".hero__text-bold");
  const heroButton = document.querySelector(".hero__see-details-btn");
  const heroBackground = document.getElementById("background");
  const heroTypeText = document.querySelector(".hero__icon-text");
  const heroContent = document.querySelector(".hero-content");
  const typeIcon = document.querySelector(".hero__icon");

  // Atualiza os indicadores de navegação
  document.querySelectorAll(".hero-nav-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
    // Ajusta a cor do dot ativo
    if (i === index) {
      dot.style.backgroundColor = hero.customStyles.dotColor || "#4caf50";
    } else {
      dot.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
    }
  });

  // Aplicar animação de fade-out
  heroContent.classList.add("fade-out");

  // Após breve delay, atualizar o conteúdo e aplicar fade-in
  setTimeout(() => {
    // Atualiza o texto
    heroTitle.textContent = hero.title;

    // Ajusta o tamanho da fonte com base no tamanho do título
    if (hero.title === "MARY POPPINS") {
      heroTitle.style.fontSize = "7.5rem";
    } else if (hero.title === "WANDAVISION") {
      heroTitle.style.fontSize = "6.5rem";
    } else if (hero.title === "THE HUNGER GAMES") {
      heroTitle.style.fontSize = "6rem";
    } else {
      heroTitle.style.fontSize = "9rem"; // Tamanho padrão
    }

    heroText.textContent = hero.text;
    heroTextBold.textContent = hero.textHighlight;

    // Atualiza o tipo (movie, series, maratona)
    heroTypeText.textContent = hero.type.toUpperCase();

    // Ajusta cor do texto conforme o fundo
    heroContent.classList.toggle("dark-text", hero.textColor === "dark");

    // Aplica personalizações de cores e estilos
    if (hero.customStyles) {
      // Personalização do título
      heroTitle.style.backgroundImage = hero.customStyles.titleGradient;

      // Personalização do botão
      if (heroButton) {
        heroButton.style.backgroundColor = hero.customStyles.buttonColor;
        heroButton.style.color = "#fff"; // Cor do texto sempre branca
        heroButton.style.fontWeight = "bold";
        heroButton.style.transition = "all 0.3s ease";
      }

      // Personalização do ícone de tipo (filme, série, maratona)
      if (heroTypeText) {
        heroTypeText.style.color = hero.customStyles.accentColor;
      }

      // Personalização do ícone
      if (typeIcon) {
        // Sempre usa o mesmo ícone, independentemente do tipo
        typeIcon.src = "assets/icons/mathflix-icon.svg";
      }
    }

    // Atualiza o botão "See details"
    heroButton.dataset.movie = hero.key;

    // Atualiza o background com o gradiente para legibilidade
    heroBackground.style.background = `
      linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 20%, transparent 60%),
      linear-gradient(to bottom, transparent 80%, black 100%), 
      url("${hero.background}") top center / cover no-repeat`;

    // Aplica animação de fade-in
    heroContent.classList.remove("fade-out");
    heroContent.classList.add("fade-in");

    // Remove a classe fade-in após a animação
    setTimeout(() => {
      heroContent.classList.remove("fade-in");
    }, 1000);
  }, 500);
}

// Inicializa apenas UMA vez quando o DOM estiver pronto
let heroInitialized = false;
document.addEventListener("DOMContentLoaded", function () {
  if (!heroInitialized) {
    heroInitialized = true;

    // Criar os indicadores de navegação
    createHeroIndicators();

    // Iniciar rotação
    startHeroRotation();

    // Pausa a rotação quando o mouse está sobre o hero
    document.querySelector(".hero").addEventListener("mouseenter", () => {
      clearInterval(heroInterval);
      heroInterval = null;
    });

    // Garantir que também pause quando o mouse estiver na área dos botões
    const heroButtonArea = document.querySelector(".hero__button");
    heroButtonArea.addEventListener("mouseenter", () => {
      clearInterval(heroInterval);
      heroInterval = null;
    });

    // Retoma a rotação quando o mouse sai
    document.querySelector(".hero").addEventListener("mouseleave", () => {
      if (!heroInterval && !heroButtonArea.matches(":hover")) {
        restartHeroInterval();
      }
    });

    heroButtonArea.addEventListener("mouseleave", () => {
      if (!heroInterval && !document.querySelector(".hero").matches(":hover")) {
        restartHeroInterval();
      }
    });
  }
});
