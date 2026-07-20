/* ============================================================
   Prisma Contabilidade — Interações
   ============================================================ */
(function () {
  "use strict";

  /* Header shadow on scroll */
  var header = document.getElementById("header");
  function onScroll() {
    if (window.scrollY > 12) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  var toggle = document.getElementById("menuToggle");
  var nav = document.getElementById("nav");
  function closeMenu() {
    nav.classList.remove("open");
    toggle.classList.remove("active");
    toggle.setAttribute("aria-expanded", "false");
  }
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.classList.toggle("active", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  /* Reveal on scroll */
  var revealTargets = document.querySelectorAll(
    ".card, .plan, .quote, .stat, .about-copy, .about-media, .faq-item, .section-head, .contact-form, .contact-copy"
  );
  revealTargets.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("visible"); });
  }

  /* Animated counters */
  var counters = document.querySelectorAll(".stat-num");
  function animateCounter(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    var prefix = el.getAttribute("data-prefix") || "";
    var duration = 1600;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = Math.floor(eased * target);
      el.textContent = prefix + value.toLocaleString("pt-BR") + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = prefix + target.toLocaleString("pt-BR") + suffix;
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          co.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { co.observe(el); });
  } else {
    counters.forEach(animateCounter);
  }

  /* Current year */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Contact form */
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    status.textContent = "";
    status.className = "form-status";

    var nome = form.nome;
    var email = form.email;
    var telefone = form.telefone;
    var valid = true;

    [nome, email, telefone].forEach(function (f) { f.classList.remove("invalid"); });

    if (!nome.value.trim()) { nome.classList.add("invalid"); valid = false; }
    if (!isValidEmail(email.value.trim())) { email.classList.add("invalid"); valid = false; }
    if (telefone.value.trim().length < 8) { telefone.classList.add("invalid"); valid = false; }

    if (!valid) {
      status.textContent = "Por favor, preencha os campos destacados.";
      status.classList.add("error");
      return;
    }

    // Simulação de envio. Integre aqui seu backend, e-mail ou CRM.
    var btn = form.querySelector("button[type=submit]");
    var original = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Enviando...";

    setTimeout(function () {
      btn.disabled = false;
      btn.textContent = original;
      form.reset();
      status.textContent = "Recebemos sua solicitação! Entraremos em contato em até 24h úteis.";
      status.classList.add("success");
    }, 900);
  });
})();
