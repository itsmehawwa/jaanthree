const year = document.getElementById("year");
if (year) {
  year.textContent = String(new Date().getFullYear());
}

const serviceItems = document.querySelectorAll(".service-list li");

if ("IntersectionObserver" in window && serviceItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  serviceItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 120}ms`;
    observer.observe(item);
  });
} else {
  serviceItems.forEach((item) => item.classList.add("is-visible"));
}

const flowerLayers = document.querySelectorAll(".falling-flowers");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const fallingItems = [
  {
    type: "blossom",
    // Natural cherry blossom — wide cleft petals + golden stamen
    svg: `<svg viewBox="0 0 80 80" aria-hidden="true">
      <defs>
        <radialGradient id="sakuraCenter" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fff8d0"/>
          <stop offset="55%" stop-color="#f0d060"/>
          <stop offset="100%" stop-color="#d4a020"/>
        </radialGradient>
      </defs>
      <g fill="currentColor">
        <path d="M40 42 C34 30 32 16 40 4 C38 10 39 16 40 20 C41 16 42 10 40 4 C48 16 46 30 40 42Z"/>
        <path d="M40 42 C52 36 66 32 76 42 C68 38 60 40 56 42 C60 44 68 46 76 42 C66 52 52 48 40 42Z"/>
        <path d="M40 42 C50 52 58 66 48 78 C50 70 48 62 46 58 C48 62 52 70 48 78 C38 66 36 52 40 42Z"/>
        <path d="M40 42 C30 52 22 66 32 78 C30 70 32 62 34 58 C32 62 28 70 32 78 C42 66 44 52 40 42Z"/>
        <path d="M40 42 C28 36 14 32 4 42 C12 38 20 40 24 42 C20 44 12 46 4 42 C14 52 28 48 40 42Z"/>
      </g>
      <g fill="#fff6f9" fill-opacity="0.4">
        <path d="M40 38 C36 30 36 20 40 12 C42 20 42 30 40 38Z"/>
        <path d="M42 42 C50 38 58 38 66 44 C58 42 50 44 42 42Z"/>
        <path d="M42 44 C48 52 52 60 46 68 C48 60 46 52 42 44Z"/>
        <path d="M38 44 C32 52 28 60 34 68 C32 60 34 52 38 44Z"/>
        <path d="M38 42 C30 38 22 38 14 44 C22 42 30 44 38 42Z"/>
      </g>
      <circle cx="40" cy="42" r="7" fill="url(#sakuraCenter)"/>
      <g stroke="#b8860b" stroke-width="1" stroke-linecap="round">
        <line x1="40" y1="42" x2="40" y2="33"/>
        <line x1="40" y1="42" x2="48" y2="36"/>
        <line x1="40" y1="42" x2="47" y2="48"/>
        <line x1="40" y1="42" x2="33" y2="48"/>
        <line x1="40" y1="42" x2="32" y2="36"/>
      </g>
      <g fill="#c9970d">
        <circle cx="40" cy="32" r="1.4"/>
        <circle cx="49" cy="35" r="1.4"/>
        <circle cx="48" cy="49" r="1.4"/>
        <circle cx="32" cy="49" r="1.4"/>
        <circle cx="31" cy="35" r="1.4"/>
      </g>
    </svg>`,
    colors: ["#f4a7bc", "#ef8faa", "#ffb6c8", "#e87d9a", "#ffc9d6"],
    sizeMin: 22,
    sizeMax: 40,
  },
  {
    type: "petal",
    // Single sakura petal with classic heart-notch tip
    svg: `<svg viewBox="0 0 64 64" aria-hidden="true">
      <path fill="currentColor" d="M32 8
        C20 16 12 30 14 42
        C15 50 22 56 29 60
        C30.5 54 31 48 32 44
        C33 48 33.5 54 35 60
        C42 56 49 50 50 42
        C52 30 44 16 32 8Z"/>
      <path fill="#fff8fb" fill-opacity="0.45" d="M32 16
        C24 22 18 32 20 40
        C21 46 26 51 30 54
        C30.8 49 31.2 45 32 42
        C32.8 45 33.2 49 34 54
        C38 51 43 46 44 40
        C46 32 40 22 32 16Z"/>
      <path fill="none" stroke="#d47890" stroke-opacity="0.4" stroke-width="1"
        d="M32 18 C32 30 32 42 32 54"/>
    </svg>`,
    colors: ["#ffb3c6", "#f59bb3", "#ffcdd9", "#e889a2", "#f8adc0"],
    sizeMin: 14,
    sizeMax: 26,
  },
  {
    type: "leaf",
    // Pink cherry leaf — tip, midrib + veins
    svg: `<svg viewBox="0 0 64 64" aria-hidden="true">
      <path fill="currentColor" d="M32 2
        C46 12 56 28 52 46
        C50 54 42 60 32 63
        C22 60 14 54 12 46
        C8 28 18 12 32 2Z"/>
      <path fill="#fff5f8" fill-opacity="0.35" d="M32 8
        C42 16 48 28 46 42
        C44 50 38 56 32 58
        C32 40 32 24 32 8Z"/>
      <path fill="none" stroke="#c45a78" stroke-opacity="0.45" stroke-width="1.4"
        d="M32 6 C32 24 32 44 32 60"/>
      <path fill="none" stroke="#c45a78" stroke-opacity="0.3" stroke-width="1"
        d="M32 18 C42 24 48 30 50 36
           M32 30 C42 34 48 40 50 46
           M32 18 C22 24 16 30 14 36
           M32 30 C22 34 16 40 14 46
           M32 42 C40 46 44 50 46 54
           M32 42 C24 46 20 50 18 54"/>
    </svg>`,
    colors: ["#f0a0b4", "#e889a2", "#f8b4c4", "#dfa0b0", "#ffc1d0"],
    sizeMin: 16,
    sizeMax: 32,
  },
  {
    type: "leaf-tilt",
    // Angled pink leaf
    svg: `<svg viewBox="0 0 64 64" aria-hidden="true">
      <path fill="currentColor" d="M50 4
        C54 8 56 12 54 16
        C60 28 56 44 42 54
        C32 60 20 58 12 50
        C8 44 10 34 18 24
        C28 12 42 6 50 4Z"/>
      <path fill="#fff5f8" fill-opacity="0.3" d="M48 10
        C52 20 50 34 40 44
        C34 48 28 48 24 46
        C32 34 40 20 48 10Z"/>
      <path fill="none" stroke="#c45a78" stroke-opacity="0.4" stroke-width="1.3"
        d="M50 6 C36 20 24 36 14 50"/>
      <path fill="none" stroke="#c45a78" stroke-opacity="0.25" stroke-width="0.9"
        d="M44 12 C36 22 28 32 24 38
           M38 22 C32 30 26 38 22 44
           M40 30 C34 36 28 42 26 46"/>
    </svg>`,
    colors: ["#e891a8", "#f5a8bb", "#d97890", "#ffb3c6"],
    sizeMin: 14,
    sizeMax: 28,
  },
  {
    type: "bud",
    // Closed pink cherry bud with tiny sepals
    svg: `<svg viewBox="0 0 64 64" aria-hidden="true">
      <path fill="currentColor" d="M32 10
        C42 14 48 24 46 36
        C44 46 38 52 32 56
        C26 52 20 46 18 36
        C16 24 22 14 32 10Z"/>
      <path fill="#fff5f8" fill-opacity="0.4" d="M32 16
        C38 18 42 26 41 34
        C40 40 36 46 32 48
        C32 36 32 24 32 16Z"/>
      <path fill="#d97890" d="M24 50
        C26 46 30 44 32 44
        C34 44 38 46 40 50
        C38 54 34 58 32 60
        C30 58 26 54 24 50Z"/>
      <path fill="#c45a78" d="M28 52 C30 50 32 50 32 50 C32 50 34 50 36 52
        C34 56 32 58 32 58 C32 58 30 56 28 52Z"/>
      <line x1="32" y1="58" x2="32" y2="64" stroke="#c45a78" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,
    colors: ["#f2a0b6", "#e889a2", "#ffb6c8", "#d97890", "#f8adc0"],
    sizeMin: 10,
    sizeMax: 20,
  },
];

// Weighted mix: blossoms, petals, pink leaves, and buds
const spawnWeights = [
  "blossom",
  "blossom",
  "petal",
  "petal",
  "petal",
  "leaf",
  "leaf-tilt",
  "bud",
  "bud",
];

function pickItem() {
  const type = spawnWeights[Math.floor(Math.random() * spawnWeights.length)];
  return fallingItems.find((item) => item.type === type) || fallingItems[0];
}

function createFallingFlowers(layer, count = 22, idPrefix = "sakura") {
  if (!layer || prefersReducedMotion) return;

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i += 1) {
    const item = pickItem();
    const petal = document.createElement("span");
    petal.className = `petal petal--${item.type}`;
    petal.innerHTML = item.svg;

    // Unique gradient ids so multiple blossoms don't clash
    if (item.type === "blossom") {
      const uid = `${idPrefix}-${i}`;
      petal.innerHTML = item.svg.replace(/sakuraCenter/g, uid);
    }

    const size =
      item.sizeMin + Math.random() * (item.sizeMax - item.sizeMin);
    const left = Math.random() * 100;
    const fallDuration = 10 + Math.random() * 14;
    const swayDuration = 3.5 + Math.random() * 5;
    const delay = -Math.random() * fallDuration;
    const drift = (Math.random() - 0.5) * 140;
    const sway = 14 + Math.random() * 32;
    const color =
      item.colors[Math.floor(Math.random() * item.colors.length)];

    petal.style.left = `${left}%`;
    petal.style.setProperty("--size", `${size}px`);
    petal.style.setProperty("--fall-duration", `${fallDuration}s`);
    petal.style.setProperty("--sway-duration", `${swayDuration}s`);
    petal.style.setProperty("--fall-delay", `${delay}s`);
    petal.style.setProperty("--drift", `${drift}px`);
    petal.style.setProperty("--sway", `${sway}px`);
    petal.style.setProperty("--petal-color", color);
    petal.style.setProperty(
      "--petal-opacity",
      String(0.55 + Math.random() * 0.35)
    );

    fragment.appendChild(petal);
  }

  layer.appendChild(fragment);
}

// Fewer flowers on phones keeps scrolling smooth on lower-end devices
const isSmallScreen = window.matchMedia("(max-width: 719px)").matches;

flowerLayers.forEach((layer, index) => {
  const isHero = layer.classList.contains("falling-flowers--hero");
  // More flowers in the first section so they're clearly visible there
  const count = isHero ? 40 : 24;
  createFallingFlowers(
    layer,
    isSmallScreen ? Math.round(count * 0.6) : count,
    isHero ? "heroSakura" : `pageSakura${index}`
  );
});

// Exhibition pop-up banner
const expoBanner = document.getElementById("expo-banner");

function openExpoBanner() {
  if (!expoBanner) return;
  expoBanner.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeExpoBanner() {
  if (!expoBanner) return;
  expoBanner.hidden = true;
  document.body.style.overflow = "";
}

if (expoBanner) {
  // Show every time the site is opened; closing only hides it for this visit
  window.setTimeout(openExpoBanner, 600);

  expoBanner.querySelectorAll("[data-expo-close]").forEach((el) => {
    el.addEventListener("click", closeExpoBanner);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !expoBanner.hidden) {
      closeExpoBanner();
    }
  });
}

// Mobile-only gallery lightbox (tap photo to expand)
const galleryLightbox = document.getElementById("gallery-lightbox");
const galleryLightboxImage = galleryLightbox
  ? galleryLightbox.querySelector(".gallery-lightbox__image")
  : null;
const mobileGalleryQuery = window.matchMedia("(max-width: 719px)");

function isMobileGallery() {
  return mobileGalleryQuery.matches;
}

function openGalleryLightbox(img) {
  if (!galleryLightbox || !galleryLightboxImage || !img) return;
  galleryLightboxImage.src = img.currentSrc || img.src;
  galleryLightboxImage.alt = img.alt || "Gallery photo";
  galleryLightbox.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeGalleryLightbox() {
  if (!galleryLightbox || !galleryLightboxImage) return;
  galleryLightbox.hidden = true;
  galleryLightboxImage.removeAttribute("src");
  document.body.style.overflow = "";
}

if (galleryLightbox && galleryLightboxImage) {
  document.querySelectorAll(".gallery-item img").forEach((img) => {
    img.addEventListener("click", () => {
      if (!isMobileGallery()) return;
      openGalleryLightbox(img);
    });
  });

  galleryLightbox.querySelectorAll("[data-lightbox-close]").forEach((el) => {
    el.addEventListener("click", closeGalleryLightbox);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !galleryLightbox.hidden) {
      closeGalleryLightbox();
    }
  });
}
