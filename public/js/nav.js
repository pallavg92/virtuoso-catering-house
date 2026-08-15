/**
 * Nav behavior: solid/blurred background after scrolling past the hero,
 * plus the full-screen mobile menu toggle.
 */
(function () {
  const nav = document.getElementById('site-nav');
  const toggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (nav) {
    const threshold = 80;
    function updateNavState() {
      const y = window.scrollY || window.pageYOffset;
      nav.classList.toggle('is-scrolled', y > threshold);
    }
    updateNavState();
    window.addEventListener('scroll', updateNavState, { passive: true });
  }

  if (toggle && mobileMenu) {
    function closeMenu() {
      mobileMenu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    function openMenu() {
      mobileMenu.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
      mobileMenu.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    toggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('is-open');
      isOpen ? closeMenu() : openMenu();
    });

    mobileMenu.querySelectorAll('.mobile-menu__link').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }
})();
