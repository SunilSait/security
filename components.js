// ============================================================
//  SecureForce — Security Guard & Manpower Agency
//  Shared Components: Navbar + Footer
// ============================================================

(function () {
  'use strict';

  const BRAND_NAME    = 'SecureForce';
  const BRAND_TAGLINE = 'Guarding What Matters Most';
  const CURRENT_YEAR  = new Date().getFullYear();
  const PHONE         = '+91 98400 12345';
  const EMAIL         = 'info@secureforce.in';
  const ADDRESS       = '14 Command Tower, Anna Salai, Chennai — 600002';

  const NAV_LINKS = [
    { label: 'Home',        href: 'index.html' },
    { label: 'Home 2',      href: 'home2.html' },
    { label: 'About',       href: 'about.html' },
    { label: 'Services',    href: 'services.html' },
    { label: 'Pricing',     href: 'pricing.html' },
    { label: 'Contact',     href: 'contact.html' },
  ];

  const SOCIAL_LINKS = [
    { icon: 'fab fa-linkedin-in', href: '#', label: 'LinkedIn' },
    { icon: 'fab fa-facebook-f',  href: '#', label: 'Facebook' },
    { icon: 'fab fa-instagram',   href: '#', label: 'Instagram' },
    { icon: 'fab fa-twitter',     href: '#', label: 'Twitter' },
  ];

  // Shield logo SVG
  const LOGO_SVG = `<svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="var(--logo-primary)"/>
        <stop offset="100%" stop-color="var(--logo-secondary)"/>
      </linearGradient>
    </defs>
    <path d="M50 8 L86 24 L86 52 C86 70 70 84 50 92 C30 84 14 70 14 52 L14 24 Z" fill="url(#sfGrad)" fill-opacity="0.15" stroke="url(#sfGrad)" stroke-width="3" stroke-linejoin="round"/>
    <path d="M50 18 L78 31 L78 52 C78 66 66 78 50 85 C34 78 22 66 22 52 L22 31 Z" fill="url(#sfGrad)" fill-opacity="0.08"/>
    <path d="M38 50 L46 58 L64 40" stroke="url(#sfGrad)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  // ─── Render Navbar ───────────────────────────────────────
  function renderNavbar() {
    const desktopLinks = NAV_LINKS.map(link => {
      const isActive = link.href === currentPage ||
        (currentPage === '' && link.href === 'index.html');
      return `<li><a href="${link.href}" class="nav-link${isActive ? ' active' : ''}" aria-current="${isActive ? 'page' : 'false'}">${link.label}</a></li>`;
    }).join('');

    const mobileLinks = NAV_LINKS.map(link => {
      const isActive = link.href === currentPage || (currentPage === '' && link.href === 'index.html');
      return `<a href="${link.href}" class="${isActive ? 'active' : ''}">${link.label}</a>`;
    }).join('');

    const navHTML = `
    <nav id="navbar" role="navigation" aria-label="Main navigation">
      <div class="container">
        <div class="nav-inner">
          <a href="index.html" class="nav-logo" id="nav-logo" aria-label="${BRAND_NAME} - Home">
            ${LOGO_SVG}
            <span class="nav-logo-text">Secure<span>Force</span></span>
          </a>
          <ul class="nav-links" role="list">${desktopLinks}</ul>
          <div class="nav-actions">
            <button class="icon-btn dark-toggle" id="nav-dark-toggle" title="Toggle Dark Mode" aria-label="Toggle dark mode">
              <i class="fas fa-moon"></i>
            </button>
            <button class="icon-btn rtl-toggle" id="nav-rtl-toggle" title="Toggle RTL" aria-label="Toggle RTL direction">
              <i class="fas fa-exchange-alt"></i>
            </button>
            <a href="login.html" class="btn btn-secondary btn-sm" id="nav-signin">Sign In</a>
            <a href="contact.html#enquiry" class="btn btn-gold btn-sm btn-shine" id="nav-quote">Get a Quote</a>
            <button class="nav-hamburger" id="nav-hamburger" aria-label="Toggle mobile menu" aria-expanded="false">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="nav-mobile" id="nav-mobile" role="navigation" aria-label="Mobile navigation">
      ${mobileLinks}
      <div class="nav-mobile-actions">
        <div style="display:flex;gap:8px;margin-bottom:10px;">
          <button class="icon-btn dark-toggle" style="flex:1;height:42px;border-radius:var(--radius-sm);font-size:0.82rem;font-weight:600;display:flex;gap:8px;" aria-label="Toggle dark mode">
            <i class="fas fa-moon"></i> Theme
          </button>
          <button class="icon-btn rtl-toggle" style="flex:1;height:42px;border-radius:var(--radius-sm);font-size:0.82rem;font-weight:600;display:flex;gap:8px;" aria-label="Toggle RTL direction">
            <i class="fas fa-exchange-alt"></i> RTL
          </button>
        </div>
        <a href="login.html" class="btn btn-secondary btn-shine" id="mobile-signin" style="margin-bottom:8px;">Sign In</a>
        <a href="contact.html#enquiry" class="btn btn-gold btn-shine" id="mobile-quote">Get a Quote</a>
      </div>
    </div>`;

    const placeholder = document.getElementById('navbar-placeholder');
    if (placeholder) {
      placeholder.outerHTML = navHTML;
    } else {
      document.body.insertAdjacentHTML('afterbegin', navHTML);
    }
  }

  // ─── Render Footer ────────────────────────────────────────
  function renderFooter() {
    const socialHTML = SOCIAL_LINKS.map(s =>
      `<a href="${s.href}" aria-label="${s.label}"><i class="${s.icon}"></i></a>`
    ).join('');

    const footerHTML = `
    <footer id="footer" role="contentinfo">
      <div class="container">
        <div class="footer-top">
          <div class="footer-brand">
            <a href="index.html" class="footer-brand-logo" aria-label="${BRAND_NAME}">
              ${LOGO_SVG}
              <span class="footer-brand-name">Secure<span>Force</span></span>
            </a>
            <p class="footer-desc">${BRAND_TAGLINE} — Providing licensed, trained, and certified security personnel for residential, corporate, and event deployments across India.</p>
            <div class="footer-social">${socialHTML}</div>
          </div>

          <div class="footer-col">
            <h4>Quick Links</h4>
            <nav class="footer-links" aria-label="Quick links">
              <a href="index.html">Home</a>
              <a href="home2.html">Home 2 — Premium</a>
              <a href="about.html">About Us</a>
              <a href="services.html">Services</a>
              <a href="pricing.html">Pricing</a>
            </nav>
          </div>

          <div class="footer-col">
            <h4>Resources</h4>
            <nav class="footer-links" aria-label="Resources">
              <a href="contact.html">Contact Us</a>
              <a href="login.html">Sign In</a>
              <a href="signup.html">Sign Up</a>
              <a href="coming-soon.html">Coming Soon</a>
              <a href="404.html">404 Page</a>
            </nav>
          </div>

          <div class="footer-newsletter">
            <h4>Stay Informed</h4>
            <p>Subscribe for security advisories, deployment updates, and manpower solutions delivered to your inbox.</p>
            <form id="newsletter-form" onsubmit="event.preventDefault();document.getElementById('newsletter-success').style.display='block';this.style.display='none';">
              <input type="email" required placeholder="your@email.com" class="form-input"/>
              <button type="submit" class="btn btn-gold btn-full btn-shine" style="margin-top:10px;">Subscribe</button>
            </form>
            <p id="newsletter-success" style="display:none;color:var(--success);font-size:0.78rem;margin-top:8px;font-weight:600;">
              <i class="fas fa-check-circle"></i> Thank you for subscribing!
            </p>
          </div>
        </div>

        <div style="padding:28px 0 20px;border-top:1px solid rgba(255,255,255,0.08);margin-top:0;">
          <div style="display:flex;align-items:center;gap:24px;flex-wrap:wrap;justify-content:center;margin-bottom:14px;">
            <span style="display:flex;align-items:center;gap:8px;color:rgba(255,255,255,0.5);font-size:0.82rem;">
              <i class="fas fa-phone" style="color:var(--secondary);"></i>${PHONE}
            </span>
            <span style="display:flex;align-items:center;gap:8px;color:rgba(255,255,255,0.5);font-size:0.82rem;">
              <i class="fas fa-envelope" style="color:var(--secondary);"></i>${EMAIL}
            </span>
            <span style="display:flex;align-items:center;gap:8px;color:rgba(255,255,255,0.5);font-size:0.82rem;">
              <i class="fas fa-map-marker-alt" style="color:var(--secondary);"></i>${ADDRESS}
            </span>
          </div>
        </div>

        <div class="footer-bottom">
          <p style="margin:0;">&copy; ${CURRENT_YEAR} ${BRAND_NAME}. All Rights Reserved. Built with precision.</p>
          <div style="display:flex;gap:24px;align-items:center;flex-wrap:wrap;">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Licensing</a>
          </div>
        </div>
      </div>
    </footer>`;

    const placeholder = document.getElementById('footer-placeholder');
    if (placeholder) {
      placeholder.outerHTML = footerHTML;
    } else {
      document.body.insertAdjacentHTML('beforeend', footerHTML);
    }
  }

  // ─── Init ─────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    renderNavbar();
    renderFooter();
  });

})();
