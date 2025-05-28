// ==========================
// === LOGIN PAGE EVENTS  ===
// ==========================
window.addEventListener("DOMContentLoaded", () => {
  // Animate login form on load
  const loginSection = document.querySelector(".login");
  if (loginSection) loginSection.classList.add("login--visible");

  // === Password show/hide toggle setup ===
  const pwdInput = document.getElementById("password");
  const toggleBtn = document.getElementById("toggle-password");
  if (pwdInput && toggleBtn) {
    // Hide eye icon by default
    toggleBtn.style.display = "none";
    pwdInput.addEventListener("input", function () {
      toggleBtn.style.display = this.value.length > 0 ? "flex" : "none";
    });

    // Toggle password visibility on click
    toggleBtn.addEventListener("click", function () {
      if (pwdInput.type === "password") {
        pwdInput.type = "text";
        this.setAttribute("aria-label", "Hide password");
      } else {
        pwdInput.type = "password";
        this.setAttribute("aria-label", "Show password");
      }
    });
  }

  // === Forgot password popup ===
  const forgot = document.querySelector(".login__forgot");
  if (forgot) {
    forgot.addEventListener("click", function (e) {
      e.preventDefault();
      showCustomPopup("Math, are you sure you forgot? \nYour password is literally 'flix' 😅");
    });
  }

  // === Sign up popup ===
  const btn = document.querySelector(".login__button-secondary");
  if (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      showCustomPopup("Sorry, sign up is closed! \nThis club is exclusive for Math.");
    });
  }
});

// ==========================
// === LOGIN VALIDATION   ===
// ==========================
const validUsers = [
  { username: "math", password: "flix", role: "user" },
  { username: "mathdigo", password: "amorzinho", role: "admin" },
];

/**
 * Validate login form and provide feedback
 */
function validateLogin(event) {
  event.preventDefault();

  // Get input values
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const username = usernameInput.value.trim().toLowerCase();
  const password = passwordInput.value.trim();
  const errorMessage = document.getElementById("error-message");

  // Remove previous feedback
  usernameInput.classList.remove("error", "success");
  passwordInput.classList.remove("error", "success");
  errorMessage.textContent = "";

  // === Empty fields validation ===
  if (!username || !password) {
    errorMessage.textContent = "Fill in both fields!\n(Hint: Try 'Math' and 'Flix' or your secret combo!)";
    if (!username) usernameInput.classList.add("error");
    if (!password) passwordInput.classList.add("error");
    return;
  }

  // === Show spinner (fake loader) ===
  document.getElementById("login-spinner").style.display = "block";

  setTimeout(() => {
    document.getElementById("login-spinner").style.display = "none";

    // === Check credentials ===
    const found = validUsers.find((u) => u.username === username && u.password === password);

    if (found) {
      usernameInput.classList.add("success");
      passwordInput.classList.add("success");
      // Salva usuário e role
      localStorage.setItem("mathflixUser", username);
      localStorage.setItem("mathflixRole", found.role);
      showCustomPopup(found.role === "admin" ? "Welcome, Math & Digo!" : "Welcome, Math!", {
        autoRedirect: true,
        timeout: 2000,
        redirectTo: "index.html",
      });
    } else {
      errorMessage.textContent = "Invalid username or password.";
      usernameInput.classList.add("error");
      passwordInput.classList.add("error");
    }
  }, 1000);
}

// ==========================
// === CUSTOM POPUP LOGIC ===
// ==========================
/**
 * Show a custom popup with message and options
 * @param {string} message - The message to display
 * @param {object} options - { autoRedirect, timeout, redirectTo }
 */
function showCustomPopup(message, options = {}) {
  const popup = document.getElementById("custom-popup");
  const msg = document.getElementById("custom-popup-message");
  const closeBtn = document.getElementById("custom-popup-close");
  msg.textContent = message;

  // Show popup
  popup.style.display = "flex";

  // Welcome popup: hide button and auto-redirect
  if (options.autoRedirect) {
    closeBtn.style.display = "none";
    setTimeout(() => {
      popup.style.display = "none";
      window.location.href = options.redirectTo || "index.html";
    }, options.timeout || 2000);
  } else {
    // Other popups: show button and close on click
    closeBtn.style.display = "inline-block";
    closeBtn.onclick = () => {
      popup.style.display = "none";
    };
  }
}
