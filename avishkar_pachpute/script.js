document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");
  const yearSpan = document.getElementById("year");
  const navLinks = document.querySelectorAll(".nav-link");
  const tiltElements = document.querySelectorAll(".tilt");
  const contactForm = document.getElementById("contact-form");

  // Set current year in footer
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Theme handling
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light");
    themeToggle.innerHTML = '<i class="ri-sun-line"></i>';
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const isLight = document.body.classList.contains("light");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    themeToggle.innerHTML = isLight
      ? '<i class="ri-sun-line"></i>'
      : '<i class="ri-moon-line"></i>';
  });

  // Mobile menu
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    menuToggle.innerHTML = nav.classList.contains("open")
      ? '<i class="ri-close-line"></i>'
      : '<i class="ri-menu-3-line"></i>';
  });

  // Close menu on link click (mobile)
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (nav.classList.contains("open")) {
        nav.classList.remove("open");
        menuToggle.innerHTML = '<i class="ri-menu-3-line"></i>';
      }
    });
  });

  // Highlight nav links based on scroll
  const sections = document.querySelectorAll("section[id]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
          if (entry.isIntersecting) {
            navLinks.forEach((lnk) => lnk.classList.remove("active"));
            link.classList.add("active");
          }
        }
      });
    },
    { threshold: 0.3 }
  );
  sections.forEach((section) => observer.observe(section));

  // Simple tilt effect
  tiltElements.forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`;
      el.style.boxShadow = "0 25px 45px rgba(15,23,42,0.9)";
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
      el.style.boxShadow = "";
    });
  });

  // Contact form demo (no backend yet)
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you! This is a demo form. Connect it to a backend/email service to receive messages.");
      contactForm.reset();
    });
  }
});
