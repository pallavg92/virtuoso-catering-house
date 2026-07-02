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

  // Re-bind magnetic cursor hover targets whenever menu tabs / gallery
  // filters swap content in and out of the DOM's active state.
  document.addEventListener('click', () => {
    if (typeof window.__cursorRebind === 'function') {
      window.__cursorRebind();
    }
  });
})();
