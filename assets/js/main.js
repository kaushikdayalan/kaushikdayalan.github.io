/* ================================================================
   KAUSHIK DAYALAN - Portfolio JS
   ================================================================ */

(function () {
  'use strict';

  // ---------------------- Typing Effect ----------------------
  function initTypingEffect() {
    const element = document.getElementById('typingText');
    if (!element) return;

    const titles = [
      'Data Engineer',
      'Data Scientist',
      'ML Engineer',
      'Platform Builder',
    ];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
      const current = titles[titleIndex];

      if (isDeleting) {
        element.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
      } else {
        element.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
      }

      if (!isDeleting && charIndex === current.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typeSpeed = 500;
      }

      setTimeout(type, typeSpeed);
    }

    type();
  }

  // ---------------------- Navigation ----------------------
  function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    function handleScroll() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    if (navToggle && navLinks) {
      navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active')
          ? 'hidden'
          : '';
      });

      navLinks.querySelectorAll('.nav-link').forEach((link) => {
        link.addEventListener('click', () => {
          navToggle.classList.remove('active');
          navLinks.classList.remove('active');
          document.body.style.overflow = '';
        });
      });
    }

    const sections = document.querySelectorAll('.section');
    const navLinkEls = document.querySelectorAll('.nav-link:not(.nav-cta)');

    function highlightNav() {
      let current = '';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
      });

      navLinkEls.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    }

    window.addEventListener('scroll', highlightNav, { passive: true });
  }

  // ---------------------- Scroll Animations ----------------------
  function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    fadeElements.forEach((el) => observer.observe(el));
  }

  // ---------------------- Smooth Scroll ----------------------
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // ---------------------- Contact Form ----------------------
  function initContactForm() {
    const form = document.getElementById('contactForm');
    const btn = document.getElementById('formSubmitBtn');
    const status = document.getElementById('formStatus');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      btn.disabled = true;
      btn.querySelector('span').textContent = 'Sending...';
      status.textContent = '';
      status.className = 'form-status';

      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(Object.fromEntries(new FormData(form))),
        });
        const data = await res.json();
        if (data.success) {
          status.textContent = '✓ Message sent — I\'ll get back to you soon.';
          status.className = 'form-status success';
          form.reset();
        } else {
          throw new Error(data.message || 'Submission failed');
        }
      } catch (err) {
        status.textContent = '✗ Something went wrong. Try emailing directly.';
        status.className = 'form-status error';
      } finally {
        btn.disabled = false;
        btn.querySelector('span').textContent = 'Send Message';
      }
    });
  }

  // ---------------------- Init ----------------------
  document.addEventListener('DOMContentLoaded', () => {
    initTypingEffect();
    initNavigation();
    initScrollAnimations();
    initSmoothScroll();
    initContactForm();
  });
})();
