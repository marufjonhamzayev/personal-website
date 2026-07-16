document.addEventListener("DOMContentLoaded", () => {
  // Theme toggle (dark/light)
  const themeToggle = document.getElementById("theme-toggle");
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  const savedTheme = localStorage.getItem("site-theme");
  const initialTheme = savedTheme || (prefersLight ? "light" : "dark");
  document.documentElement.setAttribute("data-theme", initialTheme);

  themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("site-theme", nextTheme);
  });

  // Cursor-following glow effect
  const cursorGlow = document.getElementById("cursor-glow");
  const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;

  if (supportsFinePointer) {
    let ticking = false;
    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 3;

    window.addEventListener("mousemove", (e) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          cursorGlow.style.setProperty("--mx", `${lastX}px`);
          cursorGlow.style.setProperty("--my", `${lastY}px`);
          ticking = false;
        });
      }
    });
  }

  // Mobile nav toggle
  const navToggle = document.getElementById("nav-toggle");
  const siteNav = document.getElementById("site-nav");

  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Footer year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Scroll-reveal
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealEls = document.querySelectorAll(".reveal");

  if (prefersReducedMotion) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  // Active nav link highlighting
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".site-nav a");

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((section) => navObserver.observe(section));
});
