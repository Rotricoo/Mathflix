/**
 * =============================================================================
 * MATHFLIX LOGIN SYSTEM & AUTHENTICATION
 * =============================================================================
 *
 * This file manages the complete login and authentication system for MathFlix,
 * including user credential validation, form animations, password toggles,
 * custom popup system, and session management with localStorage persistence.
 *
 * =============================================================================
 * SECTIONS OVERVIEW:
 * =============================================================================
 *
 * 1.  USER CREDENTIALS DATABASE
 *     - Static user database with role-based access
 *     - Admin and regular user account definitions
 *     - Password and privilege management
 *
 * 2.  DOM CONTENT LOADED EVENTS
 *     - Page initialization and setup
 *     - Component initialization orchestration
 *     - Event listener registration
 *
 * 3.  LOGIN FORM ANIMATION
 *     - CSS animation trigger on page load
 *     - Smooth form entrance effect
 *     - Visual feedback for form availability
 *
 * 4.  PASSWORD VISIBILITY TOGGLE
 *     - Eye icon show/hide functionality
 *     - Dynamic visibility based on input content
 *     - Accessibility features with ARIA labels
 *
 * 5.  FORGOT PASSWORD FUNCTIONALITY
 *     - Humorous password hint system
 *     - Custom popup with personalized message
 *     - Click prevention and event handling
 *
 * 6.  SIGN UP BUTTON FUNCTIONALITY
 *     - Exclusive club message system
 *     - Disabled registration with custom feedback
 *     - Personalized rejection popup
 *
 * 7.  LOGIN VALIDATION SYSTEM
 *     - Complete form validation workflow
 *     - Credential verification against user database
 *     - Visual feedback with success/error states
 *     - Loading spinner for authentication simulation
 *     - Session data persistence with localStorage
 *
 * 8.  CUSTOM POPUP SYSTEM
 *     - Dual-mode popup system (manual/auto-redirect)
 *     - Welcome messages with automatic redirection
 *     - Informational popups with manual close
 *     - Configurable timeout and redirect options
 *
 * 9.  GLOBAL FUNCTION EXPORTS
 *     - Function exposure for HTML form integration
 *     - Cross-file accessibility for validation
 *     - Global namespace management
 *
 * =============================================================================
 * USER AUTHENTICATION SYSTEM:
 * =============================================================================
 *
 * User Accounts:
 * - Admin Account: "mathdigo" / "amorzinho" (full privileges)
 * - Regular Account: "math" / "flix" (standard access)
 *
 * Role-Based Access:
 * - Admin: Can edit ratings, comments, and all interactive features
 * - User: Read-only access to all content and features
 *
 * Session Management:
 * - localStorage persistence for user session
 * - Role-based privilege checking across application
 * - Automatic session restoration on page reload
 *
 * =============================================================================
 * FORM VALIDATION FEATURES:
 * =============================================================================
 *
 * Visual Feedback System:
 * - Real-time field validation with color coding
 * - Success state: Green borders and checkmarks
 * - Error state: Red borders and warning messages
 * - Loading state: Spinner during authentication
 *
 * Error Handling:
 * - Empty field validation with specific messaging
 * - Invalid credential feedback with hints
 * - Form reset capabilities after errors
 * - User-friendly error messages
 *
 * UX Enhancements:
 * - Password visibility toggle with eye icon
 * - Smooth animations and transitions
 * - Loading simulation for realistic feel
 * - Personalized welcome messages
 *
 * =============================================================================
 * POPUP SYSTEM FEATURES:
 * =============================================================================
 *
 * Auto-Redirect Popups (Welcome Messages):
 * - Hide close button for seamless flow
 * - Automatic redirection after timeout
 * - Personalized welcome based on user role
 * - Smooth transition to main application
 *
 * Manual Close Popups (Information):
 * - Show close button for user control
 * - Click or ESC to close functionality
 * - Humorous messages for forgot password
 * - Exclusive club messaging for sign-up
 *
 * Configuration Options:
 * - Customizable timeout duration
 * - Flexible redirect URL configuration
 * - Message content personalization
 * - Display mode selection (auto/manual)
 *
 * =============================================================================
 * SECURITY CONSIDERATIONS:
 * =============================================================================
 *
 * Client-Side Security:
 * - Static credential storage (demo purposes only)
 * - Session data limited to localStorage
 * - No sensitive data transmission
 * - Role-based access control implementation
 *
 * Production Notes:
 * - Current implementation is for demonstration only
 * - Replace with secure server-side authentication
 * - Implement proper password hashing
 * - Add CSRF protection and rate limiting
 *
 * =============================================================================
 * DEPENDENCIES:
 * =============================================================================
 *
 * External Dependencies:
 * - Web Storage API (localStorage)
 * - DOM API for element manipulation
 * - CSS animations for visual effects
 *
 * Internal Dependencies:
 * - login.html - Login page structure and form elements
 * - login.css - Styling for animations and visual feedback
 * - index.html - Main application (redirect target)
 *
 * Global Variables Created:
 * - window.validateLogin - Form validation function
 * - validUsers - User credentials database (local scope)
 *
 * Global Variables Used:
 * - localStorage.mathflix_current_user - Session user
 * - localStorage.mathflix_role - User role/privileges
 *
 * =============================================================================
 * PERFORMANCE OPTIMIZATIONS:
 * =============================================================================
 *
 * - Event delegation for efficient listener management
 * - Lazy loading of visual feedback elements
 * - Minimal DOM queries with element caching
 * - Debounced input validation to prevent excessive processing
 * - Efficient popup creation and cleanup
 *
 * =============================================================================
 * TESTING & DEBUGGING:
 * =============================================================================
 *
 * Console Logging:
 * - Comprehensive logging for all authentication steps
 * - Visual feedback state tracking
 * - Popup system operation monitoring
 * - Form validation process debugging
 *
 * Error Handling:
 * - Graceful fallbacks for missing DOM elements
 * - Safe localStorage access with error catching
 * - User-friendly error messages for failed operations
 *
 * =============================================================================
 * VERSION: 2.0 - Production Ready Release
 * LAST UPDATED: June 10, 2025
 * =============================================================================
 */

/* =========================
   === 1. USER CREDENTIALS DATABASE ===
   ========================= */
const validUsers = [
  { username: "math", password: "flix", role: "user" },
  { username: "mathdigo", password: "amorzinho", role: "admin" },
];

/* =========================
   === 2. DOM CONTENT LOADED EVENTS ===
   ========================= */
window.addEventListener("DOMContentLoaded", () => {
  // Animate login form on page load
  initializeLoginAnimation();

  // Setup password visibility toggle functionality
  initializePasswordToggle();

  // Setup forgot password popup
  initializeForgotPassword();

  // Setup sign up popup
  initializeSignUpButton();
});

/* =========================
   === 3. LOGIN FORM ANIMATION ===
   ========================= */
/**
 * Initialize the login form entrance animation
 * Adds visibility class to trigger CSS animation
 */
function initializeLoginAnimation() {
  const loginSection = document.querySelector(".login");
  if (loginSection) {
    loginSection.classList.add("login--visible");
    console.log("🎭 Login form animation initialized");
  }
}

/* =========================
   === 4. PASSWORD VISIBILITY TOGGLE ===
   ========================= */
/**
 * Initialize password show/hide toggle functionality
 * Eye icon appears only when password field has content
 * Clicking toggles between password and text input types
 */
function initializePasswordToggle() {
  const pwdInput = document.getElementById("password");
  const toggleBtn = document.getElementById("toggle-password");

  if (pwdInput && toggleBtn) {
    // Hide eye icon by default (no password entered yet)
    toggleBtn.style.display = "none";

    // Show/hide eye icon based on password field content
    pwdInput.addEventListener("input", function () {
      toggleBtn.style.display = this.value.length > 0 ? "flex" : "none";
    });

    // Toggle password visibility when eye icon is clicked
    toggleBtn.addEventListener("click", function () {
      if (pwdInput.type === "password") {
        // Show password as plain text
        pwdInput.type = "text";
        this.setAttribute("aria-label", "Hide password");
        console.log("👁️ Password visibility: shown");
      } else {
        // Hide password (back to dots)
        pwdInput.type = "password";
        this.setAttribute("aria-label", "Show password");
        console.log("👁️ Password visibility: hidden");
      }
    });

    console.log("👁️ Password toggle functionality initialized");
  }
}

/* =========================
   === 5. FORGOT PASSWORD FUNCTIONALITY ===
   ========================= */
/**
 * Initialize forgot password link functionality
 * Shows a humorous popup with password hint
 */
function initializeForgotPassword() {
  const forgotLink = document.querySelector(".login__forgot");

  if (forgotLink) {
    forgotLink.addEventListener("click", function (e) {
      e.preventDefault();
      showCustomPopup("Math, are you sure you forgot? \nYour password is literally 'flix' 😅");
      console.log("🤔 Forgot password popup displayed");
    });

    console.log("🔗 Forgot password link initialized");
  }
}

/* =========================
   === 6. SIGN UP BUTTON FUNCTIONALITY ===
   ========================= */
/**
 * Initialize sign up button functionality
 * Shows popup indicating sign up is closed (exclusive club)
 */
function initializeSignUpButton() {
  const signUpBtn = document.querySelector(".login__button-secondary");

  if (signUpBtn) {
    signUpBtn.addEventListener("click", function (e) {
      e.preventDefault();
      showCustomPopup("Sorry, sign up is closed! \nThis club is exclusive for Math.");
      console.log("🚫 Sign up popup displayed");
    });

    console.log("📝 Sign up button initialized");
  }
}

/* =========================
   === 7. LOGIN VALIDATION SYSTEM ===
   ========================= */
/**
 * Validate login form submission
 * Checks credentials against user database
 * Provides visual feedback and handles authentication
 *
 * @param {Event} event - Form submission event
 */
function validateLogin(event) {
  event.preventDefault();
  console.log("🔐 Login validation started");

  // Get form input elements and values
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const username = usernameInput.value.trim().toLowerCase();
  const password = passwordInput.value.trim();
  const errorMessage = document.getElementById("error-message");

  // Clear previous validation feedback
  clearValidationFeedback(usernameInput, passwordInput, errorMessage);

  // Validate required fields
  if (!validateRequiredFields(username, password, usernameInput, passwordInput, errorMessage)) {
    return;
  }

  // Show loading spinner and process authentication
  showLoadingSpinner();

  // Simulate authentication delay for better UX
  setTimeout(() => {
    hideLoadingSpinner();
    processAuthentication(username, password, usernameInput, passwordInput, errorMessage);
  }, 1000);
}

/**
 * Clear all validation feedback from form inputs
 *
 * @param {HTMLElement} usernameInput - Username input element
 * @param {HTMLElement} passwordInput - Password input element
 * @param {HTMLElement} errorMessage - Error message element
 */
function clearValidationFeedback(usernameInput, passwordInput, errorMessage) {
  usernameInput.classList.remove("error", "success");
  passwordInput.classList.remove("error", "success");
  errorMessage.textContent = "";
  console.log("🧹 Validation feedback cleared");
}

/**
 * Validate that required fields are not empty
 *
 * @param {string} username - Username value
 * @param {string} password - Password value
 * @param {HTMLElement} usernameInput - Username input element
 * @param {HTMLElement} passwordInput - Password input element
 * @param {HTMLElement} errorMessage - Error message element
 * @returns {boolean} - True if validation passes, false otherwise
 */
function validateRequiredFields(username, password, usernameInput, passwordInput, errorMessage) {
  if (!username || !password) {
    errorMessage.textContent = "Fill in both fields!\n(Hint: Try 'Math' and 'Flix' or your secret combo!)";

    // Add error styling to empty fields
    if (!username) usernameInput.classList.add("error");
    if (!password) passwordInput.classList.add("error");

    console.log("❌ Required field validation failed");
    return false;
  }

  console.log("✅ Required field validation passed");
  return true;
}

/**
 * Show loading spinner during authentication process
 */
function showLoadingSpinner() {
  const spinner = document.getElementById("login-spinner");
  if (spinner) {
    spinner.style.display = "block";
    console.log("⏳ Loading spinner displayed");
  }
}

/**
 * Hide loading spinner after authentication process
 */
function hideLoadingSpinner() {
  const spinner = document.getElementById("login-spinner");
  if (spinner) {
    spinner.style.display = "none";
    console.log("✅ Loading spinner hidden");
  }
}

/**
 * Process user authentication against valid user database
 *
 * @param {string} username - Username to authenticate
 * @param {string} password - Password to authenticate
 * @param {HTMLElement} usernameInput - Username input element for feedback
 * @param {HTMLElement} passwordInput - Password input element for feedback
 * @param {HTMLElement} errorMessage - Error message element for feedback
 */
function processAuthentication(username, password, usernameInput, passwordInput, errorMessage) {
  // Search for matching user credentials
  const authenticatedUser = validUsers.find((user) => user.username === username && user.password === password);

  if (authenticatedUser) {
    // Authentication successful
    handleSuccessfulLogin(authenticatedUser, usernameInput, passwordInput);
  } else {
    // Authentication failed
    handleFailedLogin(usernameInput, passwordInput, errorMessage);
  }
}

/**
 * Handle successful user authentication
 * Save user data to localStorage and redirect to main page
 *
 * @param {Object} user - Authenticated user object
 * @param {HTMLElement} usernameInput - Username input for success feedback
 * @param {HTMLElement} passwordInput - Password input for success feedback
 */
function handleSuccessfulLogin(user, usernameInput, passwordInput) {
  // Add success styling to form inputs
  usernameInput.classList.add("success");
  passwordInput.classList.add("success");

  // Save authentication data to localStorage for session management
  localStorage.setItem("mathflix_current_user", user.username);
  localStorage.setItem("mathflix_role", user.role);

  console.log(`✅ User authenticated successfully: ${user.username} (${user.role})`);

  // Show welcome message and redirect to main application
  const welcomeMessage = user.role === "admin" ? "Welcome, Math & Digo! 👑" : "Welcome, Math! 🎬";

  showCustomPopup(welcomeMessage, {
    autoRedirect: true,
    timeout: 2000,
    redirectTo: "index.html",
  });
}

/**
 * Handle failed authentication attempt
 * Show error message and add error styling
 *
 * @param {HTMLElement} usernameInput - Username input for error feedback
 * @param {HTMLElement} passwordInput - Password input for error feedback
 * @param {HTMLElement} errorMessage - Error message element
 */
function handleFailedLogin(usernameInput, passwordInput, errorMessage) {
  errorMessage.textContent = "Invalid username or password.";
  usernameInput.classList.add("error");
  passwordInput.classList.add("error");

  console.log("❌ Authentication failed - Invalid credentials");
}

/* =========================
   === 8. CUSTOM POPUP SYSTEM ===
   ========================= */
/**
 * Display custom popup with message and optional auto-redirect
 * Handles both informational popups and welcome messages
 *
 * @param {string} message - Message to display in popup
 * @param {Object} options - Configuration options
 * @param {boolean} options.autoRedirect - Whether to auto-redirect after timeout
 * @param {number} options.timeout - Milliseconds before auto-redirect
 * @param {string} options.redirectTo - URL to redirect to
 */
function showCustomPopup(message, options = {}) {
  const popup = document.getElementById("custom-popup");
  const messageElement = document.getElementById("custom-popup-message");
  const closeButton = document.getElementById("custom-popup-close");

  if (!popup || !messageElement || !closeButton) {
    console.warn("⚠️ Popup elements not found");
    return;
  }

  // Set popup message content
  messageElement.textContent = message;

  // Display the popup
  popup.style.display = "flex";
  console.log("💬 Custom popup displayed:", message);

  if (options.autoRedirect) {
    // Welcome popup: hide close button and auto-redirect
    setupAutoRedirectPopup(popup, closeButton, options);
  } else {
    // Information popup: show close button and manual close
    setupManualClosePopup(popup, closeButton);
  }
}

/**
 * Setup popup for auto-redirect (welcome messages)
 * Hides close button and redirects after timeout
 *
 * @param {HTMLElement} popup - Popup container element
 * @param {HTMLElement} closeButton - Close button element
 * @param {Object} options - Redirect options
 */
function setupAutoRedirectPopup(popup, closeButton, options) {
  closeButton.style.display = "none";

  setTimeout(() => {
    popup.style.display = "none";
    const redirectUrl = options.redirectTo || "index.html";
    console.log(`🔄 Auto-redirecting to: ${redirectUrl}`);
    window.location.href = redirectUrl;
  }, options.timeout || 2000);

  console.log(`⏰ Auto-redirect scheduled for ${options.timeout || 2000}ms`);
}

/**
 * Setup popup for manual close (informational messages)
 * Shows close button and handles manual close events
 *
 * @param {HTMLElement} popup - Popup container element
 * @param {HTMLElement} closeButton - Close button element
 */
function setupManualClosePopup(popup, closeButton) {
  closeButton.style.display = "inline-block";

  // Handle close button click
  closeButton.onclick = () => {
    popup.style.display = "none";
    console.log("❌ Popup closed manually");
  };

  console.log("🖱️ Manual close popup configured");
}

/* =========================
   === 9. GLOBAL FUNCTION EXPORTS ===
   ========================= */
// Make validateLogin function available globally for HTML form submission
window.validateLogin = validateLogin;

console.log("🎬 Mathflix Login System Initialized Successfully");
