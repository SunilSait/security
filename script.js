// ============================================================
//  SecureForce — Main Script
//  Dark Mode | RTL | Navbar Scroll | Animations | FAQ | Counter
// ============================================================

(function () {
  'use strict';

  // ─── Dark Mode ─────────────────────────────────────────────
  const DARK_KEY = 'sf-theme';
  function applyTheme(isDark) {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    document.querySelectorAll('.dark-toggle i').forEach(icon => {
      icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    });
    localStorage.setItem(DARK_KEY, isDark ? 'dark' : 'light');
  }
  function initDarkMode() {
    const saved = localStorage.getItem(DARK_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved ? saved === 'dark' : prefersDark;
    applyTheme(isDark);
    document.addEventListener('click', e => {
      if (e.target.closest('.dark-toggle')) {
        const current = document.documentElement.getAttribute('data-theme') === 'dark';
        applyTheme(!current);
      }
    });
  }

  // ─── RTL ───────────────────────────────────────────────────
  const RTL_KEY = 'sf-dir';
  function applyDir(isRTL) {
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    localStorage.setItem(RTL_KEY, isRTL ? 'rtl' : 'ltr');
  }
  function initRTL() {
    const saved = localStorage.getItem(RTL_KEY);
    if (saved) applyDir(saved === 'rtl');
    document.addEventListener('click', e => {
      if (e.target.closest('.rtl-toggle')) {
        const current = document.documentElement.getAttribute('dir') === 'rtl';
        applyDir(!current);
      }
    });
  }

  // ─── Navbar Scroll ─────────────────────────────────────────
  function initNavScroll() {
    const nav = document.getElementById('navbar');
    const authIcons = document.querySelector('.auth-top-icons');
    if (!nav && !authIcons) return;

    let lastScrollY = window.scrollY;
    const threshold = 50;

    const onScroll = () => {
      const currentScrollY = window.scrollY;

      if (nav) {
        nav.classList.toggle('scrolled', currentScrollY > 20);
      }

      // Check if mobile menu is open to prevent layout glitches
      const mobileMenu = document.getElementById('nav-mobile');
      const isMobileMenuOpen = mobileMenu && mobileMenu.classList.contains('open');

      if (!isMobileMenuOpen && currentScrollY > lastScrollY && currentScrollY > threshold) {
        // Scrolling down - hide
        if (nav) nav.classList.add('nav-hidden');
        if (authIcons) authIcons.classList.add('nav-hidden');
      } else {
        // Scrolling up - show
        if (nav) nav.classList.remove('nav-hidden');
        if (authIcons) authIcons.classList.remove('nav-hidden');
      }

      lastScrollY = Math.max(0, currentScrollY);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ─── Hamburger ─────────────────────────────────────────────
  function initHamburger() {
    const btn    = document.getElementById('nav-hamburger');
    const mobile = document.getElementById('nav-mobile');
    if (!btn || !mobile) return;
    btn.addEventListener('click', () => {
      const open = mobile.classList.toggle('open');
      btn.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
    // Close on outside click
    document.addEventListener('click', e => {
      if (!e.target.closest('#navbar') && !e.target.closest('#nav-mobile')) {
        mobile.classList.remove('open');
        btn.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
    // Close on nav link click
    mobile.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobile.classList.remove('open');
        btn.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ─── Intersection Observer Animations ──────────────────────
  function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
  }

  // ─── Counter Animation ─────────────────────────────────────
  function animateCounter(el, target, suffix = '') {
    const duration = 2200;
    const start = performance.now();
    const isFloat = target % 1 !== 0;
    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = isFloat
        ? (eased * target).toFixed(1)
        : Math.floor(eased * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  function initCounters() {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.dataset.target || '0');
          const suffix = el.dataset.suffix || '';
          animateCounter(el, target, suffix);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));
  }

  // ─── FAQ Accordion ─────────────────────────────────────────
  function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item   = btn.closest('.faq-item');
        const answer = item.querySelector('.faq-answer');
        const isOpen = item.classList.contains('open');
        // Close all
        document.querySelectorAll('.faq-item.open').forEach(openItem => {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-answer').style.maxHeight = '0';
        });
        // Toggle clicked
        if (!isOpen) {
          item.classList.add('open');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  }

  // ─── Password Toggle ───────────────────────────────────────
  function initPasswordToggle() {
    document.querySelectorAll('.toggle-password').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = btn.closest('.input-wrapper').querySelector('input');
        const icon  = btn.querySelector('i');
        if (input.type === 'password') {
          input.type = 'text';
          icon.className = 'fa-solid fa-eye-slash';
        } else {
          input.type = 'password';
          icon.className = 'fa-solid fa-eye';
        }
      });
    });
  }

  // ─── Countdown Timer ───────────────────────────────────────
  function initCountdown(targetDate) {
    const ids = ['cd-days','cd-hours','cd-mins','cd-secs'];
    if (!ids.every(id => document.getElementById(id))) return;
    function update() {
      const diff = new Date(targetDate) - new Date();
      if (diff <= 0) return;
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000)  / 60000);
      const s = Math.floor((diff % 60000)    / 1000);
      document.getElementById('cd-days').textContent  = String(d).padStart(2,'0');
      document.getElementById('cd-hours').textContent = String(h).padStart(2,'0');
      document.getElementById('cd-mins').textContent  = String(m).padStart(2,'0');
      document.getElementById('cd-secs').textContent  = String(s).padStart(2,'0');
    }
    update();
    setInterval(update, 1000);
  }

  // ─── Smooth scroll for anchor links ────────────────────────
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
          e.preventDefault();
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }

  // ─── Enquiry form hash scroll ────────────────────────────
  function initHashScroll() {
    if (window.location.hash) {
      setTimeout(() => {
        const el = document.querySelector(window.location.hash);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 90;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 400);
    }
  }

  // ─── Init ─────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initRTL();
    setTimeout(() => {
      initNavScroll();
      initHamburger();
      initAnimations();
      initCounters();
      initFAQ();
      initPasswordToggle();
      initSmoothScroll();
      initHashScroll();
      // Countdown: 30 days from now
      const cd = new Date();
      cd.setDate(cd.getDate() + 30);
      initCountdown(cd.toISOString());
    }, 50);
  });

  // Expose countdown for coming-soon page
  window.sfCountdown = initCountdown;

})();
