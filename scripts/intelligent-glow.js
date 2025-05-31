// ==========================
// === INTELLIGENT GLOW SYSTEM ===
// ==========================
// Automatically extracts dominant colors from images and applies dynamic glow effects

class IntelligentGlow {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.processedImages = new Set();
    this.colorCache = new Map();

    console.log("🌟 Intelligent Glow System initialized");
  }

  // Check if device supports hover (desktop/laptop)
  supportsHover() {
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }

  // Extract dominant color from image using canvas analysis
  async extractDominantColor(img) {
    return new Promise((resolve) => {
      try {
        // Check cache first
        const cacheKey = img.src;
        if (this.colorCache.has(cacheKey)) {
          resolve(this.colorCache.get(cacheKey));
          return;
        }

        // Set canvas size (smaller for performance)
        const maxSize = 50;
        const scale = Math.min(maxSize / img.naturalWidth, maxSize / img.naturalHeight);

        this.canvas.width = img.naturalWidth * scale;
        this.canvas.height = img.naturalHeight * scale;

        // Draw image to canvas
        this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);

        // Get image data
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        const data = imageData.data;

        // Analyze colors using histogram approach
        const colorMap = new Map();
        const skipPixels = 4; // Sample every 4th pixel for performance

        for (let i = 0; i < data.length; i += skipPixels * 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];

          // Skip transparent pixels
          if (a < 128) continue;

          // Round colors to reduce noise and group similar colors
          const roundedR = Math.round(r / 20) * 20;
          const roundedG = Math.round(g / 20) * 20;
          const roundedB = Math.round(b / 20) * 20;

          const colorKey = `${roundedR},${roundedG},${roundedB}`;
          colorMap.set(colorKey, (colorMap.get(colorKey) || 0) + 1);
        }

        // Find the most common color (excluding very dark/light colors)
        let dominantColor = null;
        let maxCount = 0;

        for (const [colorKey, count] of colorMap.entries()) {
          const [r, g, b] = colorKey.split(",").map(Number);

          // Skip colors that are too dark or too light
          const brightness = (r + g + b) / 3;
          if (brightness < 30 || brightness > 220) continue;

          // Skip colors with very low saturation (gray-ish)
          const saturation = this.calculateSaturation(r, g, b);
          if (saturation < 20) continue;

          if (count > maxCount) {
            maxCount = count;
            dominantColor = { r, g, b };
          }
        }

        // Fallback to average color if no suitable dominant color found
        if (!dominantColor) {
          dominantColor = this.calculateAverageColor(data);
        }

        // Enhance the color for glow effect
        const glowColor = this.enhanceColorForGlow(dominantColor);

        // Cache the result
        this.colorCache.set(cacheKey, glowColor);

        resolve(glowColor);
      } catch (error) {
        console.warn("🚨 Error extracting color from image:", error);
        resolve("rgba(255, 255, 255, 0.3)"); // Fallback
      }
    });
  }

  // Calculate color saturation
  calculateSaturation(r, g, b) {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    return max === 0 ? 0 : ((max - min) / max) * 100;
  }

  // Fallback: calculate average color
  calculateAverageColor(data) {
    let r = 0,
      g = 0,
      b = 0,
      count = 0;

    for (let i = 0; i < data.length; i += 16) {
      // Sample every 4th pixel
      if (data[i + 3] > 128) {
        // Skip transparent pixels
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        count++;
      }
    }

    return count > 0
      ? {
          r: Math.round(r / count),
          g: Math.round(g / count),
          b: Math.round(b / count),
        }
      : { r: 255, g: 255, b: 255 };
  }

  // Enhance color for better glow visibility
  enhanceColorForGlow(color) {
    let { r, g, b } = color;

    // Boost saturation more aggressively
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const saturation = max === 0 ? 0 : (max - min) / max;

    if (saturation < 0.6) {
      // Boost the dominant channel more
      if (r === max) r = Math.min(255, r * 1.4);
      else if (g === max) g = Math.min(255, g * 1.4);
      else if (b === max) b = Math.min(255, b * 1.4);
    }

    // Ensure good brightness for visibility
    const brightness = (r + g + b) / 3;
    if (brightness < 100) {
      const boost = 100 - brightness;
      r = Math.min(255, r + boost);
      g = Math.min(255, g + boost);
      b = Math.min(255, b + boost);
    }

    // Return with higher opacity and better intensity
    return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, 0.8)`;
  }

  // Apply glow effect to an image element
  async applyGlowToImage(img) {
    // Skip if already processed or device doesn't support hover
    if (this.processedImages.has(img) || !this.supportsHover()) {
      return;
    }

    try {
      // Mark as processed
      this.processedImages.add(img);

      // Add glow class
      img.classList.add("glow-img");

      // Determine if should use enhanced glow
      const shouldEnhance = img.closest(".gallery__container.top10") || img.classList.contains("gallery__thumbnail-vertical");

      if (shouldEnhance) {
        img.classList.add("glow-enhanced");
      }

      // Wait for image to load if not already loaded
      if (!img.complete) {
        await new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      }

      // Extract and apply color
      const glowColor = await this.extractDominantColor(img);

      // Set CSS custom property on the image element
      img.style.setProperty("--image-glow-color", glowColor);

      console.log(`✨ Applied intelligent glow to image: ${glowColor}`);
    } catch (error) {
      console.warn("❌ Failed to apply glow to image:", error);
    }
  }

  // Process all images with .glow-img class
  async processAllGlowImages() {
    if (!this.supportsHover()) {
      console.log("📱 Touch device detected - skipping glow effects");
      return;
    }

    const images = document.querySelectorAll("img[data-movie], .gallery__thumbnail, .gallery__thumbnail-vertical");
    console.log(`🔍 Found ${images.length} images to process for intelligent glow`);

    // Process images in batches to avoid blocking
    const batchSize = 5;
    for (let i = 0; i < images.length; i += batchSize) {
      const batch = Array.from(images).slice(i, i + batchSize);

      await Promise.all(batch.map((img) => this.applyGlowToImage(img)));

      // Small delay between batches
      if (i + batchSize < images.length) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }

    console.log("🌟 Intelligent glow processing completed");
  }

  // Initialize the system
  init() {
    // Wait for DOM and images to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.processAllGlowImages());
    } else {
      // DOM already loaded, wait a bit for images then process
      setTimeout(() => this.processAllGlowImages(), 1000);
    }

    // Re-process when new images are added (like from search results)
    const observer = new MutationObserver((mutations) => {
      let hasNewImages = false;

      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            // Element node
            const newImages = node.querySelectorAll
              ? node.querySelectorAll("img[data-movie], .gallery__thumbnail, .gallery__thumbnail-vertical")
              : node.tagName === "IMG"
              ? [node]
              : [];

            if (newImages.length > 0) {
              hasNewImages = true;
              newImages.forEach((img) => this.applyGlowToImage(img));
            }
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
}

// Initialize the intelligent glow system
const intelligentGlow = new IntelligentGlow();
intelligentGlow.init();

// Make it available globally
window.intelligentGlow = intelligentGlow;
