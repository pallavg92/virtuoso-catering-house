/**
 * Entry point for small page-wide behaviors that don't warrant their
 * own module: footer newsletter capture and cursor re-binding hooks.
 */
(function () {
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterNote = document.getElementById('newsletter-note');

  if (newsletterForm && newsletterNote) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      if (!input || !input.value) return;
      newsletterNote.textContent = 'Thank you — you’re on the list.';
      newsletterForm.reset();
    });
  }

  // Re-bind magnetic cursor hover targets whenever menu tabs swap
  // content in and out of the DOM's active state.
  document.addEventListener('click', () => {
    if (typeof window.__cursorRebind === 'function') {
      window.__cursorRebind();
    }
  });

  // Generic GA4 click tracking: any element carrying [data-track-event]
  // fires that event name on click. Best-effort only — a tracking
  // failure must never block the element's own default action (link
  // navigation, drawer open, etc.).
  document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-track-event]');
    if (!target) return;
    try {
      if (typeof gtag === 'function') {
        gtag('event', target.dataset.trackEvent);
      }
    } catch (trackingErr) {
      // Swallow — never block the element's own action.
    }
  });
})();
