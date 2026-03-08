const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileMenu = document.getElementById("mobileMenu");
const mobileOverlay = document.getElementById("mobileOverlay");
const mobileCloseBtn = document.getElementById("mobileCloseBtn");

function openMenu() {
  hamburgerBtn.classList.add("is-open");
  mobileMenu.classList.add("is-open");
  mobileOverlay.classList.add("is-open");
  document.body.classList.add("menu-open");
  hamburgerBtn.setAttribute("aria-expanded", "true");
  mobileMenu.setAttribute("aria-hidden", "false");
}

function closeMenu() {
  hamburgerBtn.classList.remove("is-open");
  mobileMenu.classList.remove("is-open");
  mobileOverlay.classList.remove("is-open");
  document.body.classList.remove("menu-open");
  hamburgerBtn.setAttribute("aria-expanded", "false");
  mobileMenu.setAttribute("aria-hidden", "true");
}

hamburgerBtn.addEventListener("click", () =>
  mobileMenu.classList.contains("is-open") ? closeMenu() : openMenu(),
);
mobileCloseBtn.addEventListener("click", closeMenu);
mobileOverlay.addEventListener("click", closeMenu);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mobileMenu.classList.contains("is-open"))
    closeMenu();
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 768 && mobileMenu.classList.contains("is-open"))
    closeMenu();
});

// Smooth scroll
const scrollLinks = document.querySelectorAll(".scroll-link");
scrollLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const id = link.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  });
});

// Intersection Observer
const observerOptions = {
  root: null, // Surveille par rapport au viewport
  threshold: 0.15, // Déclenche quand 15% de la section est visible
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      // Une fois animé, on peut arrêter de surveiller l'élément
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// On cible tous nos éléments à animer
document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
  observer.observe(el);
});
