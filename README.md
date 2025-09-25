# MathFlix 🎬

<div align="center">
  <img src="assets/icons/mathflix-logo.svg" alt="MathFlix Logo" width="200"/>

[![Status](https://img.shields.io/badge/Status-Complete-brightgreen.svg)](https://github.com/yourusername/mathflix)
[![Version](https://img.shields.io/badge/Version-2.0-blue.svg)](https://github.com/yourusername/mathflix)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

## Table of Contents

* [About the Project](#about-the-project)
* [Project Status](#project-status)
* [Features](#-features)
* [Technologies Used](#️-technologies-used)
* [Responsive Design](#-responsive-design)
* [Key Functionalities](#-key-functionalities)
* [Future Improvements](#-future-improvements)
* [Author](#-author)
* [License](#-license)

## About the Project

**MathFlix** started as a personal recreation of Netflix's interface, inspired by Alura's 7-day Challenge, but has evolved into a **complete streaming platform experience**. This personalized gift for my husband showcases his favorite movies and series while implementing advanced web development features.

What began as a simple homepage recreation has transformed into a fully functional platform with user authentication, dynamic content management, advanced search capabilities, and a comprehensive rating system.

## Project Status

**Completed Features:**
* Fully functional login/logout system
* Complete responsive design (Mobile, Tablet, Desktop)
* Advanced movie modal system with dual layouts
* Dynamic content carousels with Splide.js
* Intelligent search with autocomplete
* User rating and comment system
* Profile management system
* Random movie recommendation
* Content filtering (Movies/Series)
* Mobile-optimized hamburger menu
* Spoiler overlay system
* Dynamic statistics counter

## Features

### **User Interface & Experience**

* **Personalized Homepage** with curated movie collections
* **Dynamic Hero Section** with auto-rotating featured content
* **Professional Modal System** with horizontal and vertical layouts
* **Advanced Carousel System** powered by Splide.js
* **Responsive Design** optimized for all devices
* **Mobile-First Navigation** with hamburger menu system

### **Authentication & User Management**

* **Complete Login/Logout System** with localStorage persistence
* **User Profile Management** with dynamic statistics
* **Admin Privileges System** for content editing
* **Session Management** with automatic state preservation

### **Content Discovery**

* **Intelligent Search** with real-time autocomplete
* **Advanced Filtering** by Movies/Series categories
* **Random Movie Recommendation** system
* **Content Categorization** (Weekend Series, Cozy Content, Long Series)
* **Marathon Collections** for complete film series

### **Interactive Features**

* **Rating System** with 5-star reviews (Admin-only editing)
* **Comment System** with character limits and validation
* **Spoiler Protection** with timed overlay system
* **Dynamic Content Counters** showing real database statistics
* **Click-to-Center** functionality for vertical carousels

### **Mobile Experience**

* **Dedicated Mobile Interface** with touch-optimized controls
* **Responsive Modal System** with toggle functionality
* **Mobile Search Integration** with backdrop controls
* **Touch-Friendly Navigation** with swipe support

## Technologies Used

### **Frontend Technologies**

* **HTML5** - Semantic structure and accessibility
* **CSS3** - Advanced styling with CSS Grid and Flexbox
* **JavaScript ES6+** - Modern vanilla JavaScript functionality

### **External Libraries**

* **[Splide.js](https://splidejs.com/)** - Advanced carousel functionality
* **[Auto-Scroll Extension](https://github.com/Splidejs/splide-extension-auto-scroll)** - Automatic carousel scrolling
* **[Google Fonts](https://fonts.google.com/)** - Roboto font family

### **Development Tools**

* **Visual Studio Code** - Primary development environment
* **Chrome DevTools** - Testing and debugging
* **Git & GitHub** - Version control and collaboration

### **Responsive Design**

* **Mobile Small (≤480px)**
  * Hamburger menu navigation
  * Single-column layout
  * Touch-optimized controls
  * Compact hero section
 
* **Mobile/Tablet (481px-768px)**
  * Enhanced mobile interface
  * Improved carousel controls
  * Larger touch targets
  * Better content spacing

* **Tablet/Laptop (769px-1024px)**
  * Desktop navigation appears
  * Side-by-side content layout
  * Enhanced modal experience
  * Optimized carousel sizing

* **Desktop (1025px+)**
  * Full desktop experience
  * Multi-column layouts
  * Advanced hover effects
  * Complete feature set

## Key Functionalities

### **Content Management System**

```js
// Dynamic movie database with 80+ titles
window.moviesData = {
  movieKey: {
    title, genre, duration, year, cast, director,
    description, poster, trailer, tags, ranking
  }
}
```

### **Advanced Search System**

* Real-time autocomplete suggestions
* Multi-field search (title, director, cast, genre)
* Intelligent result pagination
* Easter egg commands

### **Rating & Comment System**

* Admin-only editing capabilities
* Persistent localStorage storage
* Character-limited comments (300 chars)
* Visual star rating interface

### **Responsive Modal System**

* Dual layout support
* Horizontal: Standard movie layout
* Vertical: Horror collection portrait layout
* Mobile: Toggle between poster/trailer
* Desktop: Side-by-side display

## Future Improvements

### Planned Features

- [ ] Backend integration (Node.js + Express)
- [ ] User registration system
- [ ] Personal watchlist (Save to Watch Later)
- [ ] Automated movie content fetching (via external APIs)
- [ ] MongoDB or local database for persistent content

### Technical Enhancements

- [ ] TypeScript for better structure and maintainability
- [ ] Lazy loading for optimized performance

## Author

**Rodrigo Souza**  
Front-End Student & Visual Designer exploring the world of Web Development

<div align="center">
  <a href="https://www.linkedin.com/in/rotrico/" target="_blank">
    <img alt="LinkedIn" src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white" />
  </a>
  <a href="https://github.com/Rotricoo" target="_blank">
    <img alt="GitHub" src="https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white" />
  </a>
  <a href="https://www.instagram.com/rotrico/" target="_blank">
    <img alt="Instagram" src="https://img.shields.io/badge/Instagram-E4405F?style=flat&logo=instagram&logoColor=white" />
  </a>
  <a href="https://www.behance.net/rotrico" target="_blank">
    <img alt="Behance" src="https://img.shields.io/badge/Behance-1769FF?style=flat&logo=behance&logoColor=white" />
  </a>
</div>

---

### About Me

I'm a front-end student and graphic designer who's recently fallen in love with web development.

This project began as a small creative challenge and evolved into a full-featured streaming platform. Through it, I’ve been exploring how to blend interface design, interactivity, and a good user experience—while still learning new things every day.

### Skills Practiced

- HTML5, CSS3, JavaScript (ES6+)
- Responsive Web Design
- UI/UX Design Principles
- DOM Manipulation & Logic Building
- Clean Code Structure & Reusability

  
### Skills Demonstrated
* JavaScript (ES6+)
* Responsive Web Design
* User Experience (UX) Design
* Performance Optimization
* Cross-browser Compatibility

## License

This project is licensed under the MIT License - see the LICENSE file for details.

<div align="center">
  <p><strong>Made with ❤️ for Math(My Matt)</strong></p>
</div>
