/**
 * Central home for GSAP + ScrollTrigger driven motion:
 * load-in reveals for hero/page-intro bands, scroll-triggered reveals
 * for everything else, count-up stats, magnetic buttons, and parallax media.
 */
(function () {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (reduceMotion) {
    document.querySelectorAll('.reveal-up, .reveal-line, .section-header__line').forEach((el) => {
      el.classList.add('in-view');
    });
    return;
  }

  const LOAD_SCOPE_SELECTOR = '.hero__content, .page-intro__content';

  function staggerIn(elements, baseDelay = 0) {
    elements.forEach((el, i) => {
      setTimeout(() => el.classList.add('in-view'), baseDelay + i * 110);
    });
  }

  function initLoadReveals() {
    document.querySelectorAll(LOAD_SCOPE_SELECTOR).forEach((scope) => {
      const title = scope.querySelector('.hero__title, .page-intro__title');
      const els = scope.querySelectorAll('.reveal-up, .reveal-line');
      if (title) title.classList.add('in-view');
      staggerIn(Array.from(els), 100);
    });
  }

  function initScrollReveals() {
    const items = gsap.utils.toArray('.reveal-up').filter(
      (el) => !el.closest(LOAD_SCOPE_SELECTOR)
    );

    ScrollTrigger.batch(items, {
      start: 'top 88%',
      once: true,
      onEnter: (batch) => {
        batch.forEach((el, i) => setTimeout(() => el.classList.add('in-view'), i * 90));
      }
    });

    ScrollTrigger.batch('.section-header__line', {
      start: 'top 90%',
      once: true,
      onEnter: (batch) => batch.forEach((el) => el.classList.add('in-view'))
    });
  }

  function initCounters() {
    document.querySelectorAll('[data-count-to]').forEach((el) => {
      const target = parseFloat(el.getAttribute('data-count-to'));
      const suffix = el.getAttribute('data-suffix') || '';
      const counter = { val: 0 };

      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(counter, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = Math.round(counter.val).toLocaleString() + suffix;
            }
          });
        }
      });
    });
  }

  function initMagnetic() {
    if (!fine) return;
    document.querySelectorAll('[data-magnetic]').forEach((el) => {
      const strength = 0.35;
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;
        gsap.to(el, { x: relX * strength, y: relY * (strength + 0.1), duration: 0.6, ease: 'power3.out' });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
      });
    });
  }

  function initParallax() {
    document.querySelectorAll('[data-parallax] img').forEach((img) => {
      gsap.fromTo(
        img,
        { yPercent: -9 },
        {
          yPercent: 9,
          ease: 'none',
          scrollTrigger: {
            trigger: img.closest('[data-parallax]'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
    });

  }

  function start() {
    initLoadReveals();
    initScrollReveals();
    initCounters();
    initMagnetic();
    initParallax();
    ScrollTrigger.refresh();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
