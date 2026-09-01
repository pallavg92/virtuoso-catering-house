/**
 * Entry welcome popup + exit-intent popup. Both funnel into the same
 * global Inquire drawer (inquire-drawer.js); this module only owns
 * showing/hiding its own two panels and deciding when to trigger them.
 */
(function () {
  const entryPopup = document.getElementById('entry-popup');
  const exitPopup = document.getElementById('exit-popup');
  // Any popup that should fire on scroll depth carries [data-scroll-popup].
  // Selector rather than a fixed id, so a second offer (the Journal guide
  // download) reuses this logic instead of copying it.
  const scrollPopup = document.querySelector('[data-scroll-popup]');
  if (!entryPopup && !exitPopup && !scrollPopup) return;

  const SESSION_KEY_ENTRY = 'vch_entry_popup_seen';
  const SESSION_KEY_EXIT = 'vch_exit_popup_seen';
  const SESSION_KEY_SCROLL = 'vch_menu_scroll_popup_seen';
  const SESSION_KEY_INQUIRY_SENT = 'vch_inquiry_sent';
  const SKIP_PATHS = ['/contact'];

  // How far down the page the scroll popup waits. The menu is ~28,000px tall,
  // so this lands inside the live stations: far enough that the visitor has
  // read real content, early enough that there is still page left to sell.
  const SCROLL_TRIGGER = 0.45;

  function open(popup) {
    if (!popup) return;
    popup.classList.add('is-open');
    popup.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function close(popup) {
    if (!popup) return;
    popup.classList.remove('is-open');
    popup.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function bindDismiss(popup) {
    if (!popup) return;
    popup.querySelectorAll('[data-popup-dismiss]').forEach((el) => {
      el.addEventListener('click', () => close(popup));
    });
  }

  bindDismiss(entryPopup);
  bindDismiss(exitPopup);
  bindDismiss(scrollPopup);

  window.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    [entryPopup, exitPopup, scrollPopup].forEach((popup) => {
      if (popup && popup.classList.contains('is-open')) close(popup);
    });
  });

  if (SKIP_PATHS.includes(window.location.pathname)) return;

  // Entry popup — once per session, after a calm delay, and never once
  // an inquiry has already been sent this session. Suppressed where the
  // scroll popup lives: two interruptions on one page is one too many, and
  // the scroll popup is the one with something specific to say.
  if (
    entryPopup &&
    !scrollPopup &&
    !sessionStorage.getItem(SESSION_KEY_ENTRY) &&
    !sessionStorage.getItem(SESSION_KEY_INQUIRY_SENT)
  ) {
    setTimeout(() => {
      if (sessionStorage.getItem(SESSION_KEY_INQUIRY_SENT)) return;
      open(entryPopup);
      sessionStorage.setItem(SESSION_KEY_ENTRY, '1');
    }, 6000);
  }

  // Exit-intent popup — fine-pointer devices only (there's no reliable,
  // non-annoying equivalent on touch), once per session, and it ignores
  // the first few seconds on page so an accidental cursor flick toward
  // the address bar right after load doesn't trigger it.
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (
    exitPopup &&
    isFinePointer &&
    !sessionStorage.getItem(SESSION_KEY_EXIT) &&
    !sessionStorage.getItem(SESSION_KEY_INQUIRY_SENT)
  ) {
    const armedAt = Date.now() + 4000;
    document.addEventListener('mouseleave', (e) => {
      if (Date.now() < armedAt) return;
      if (e.clientY > 0) return;
      if (sessionStorage.getItem(SESSION_KEY_EXIT)) return;
      if (sessionStorage.getItem(SESSION_KEY_INQUIRY_SENT)) return;
      if (entryPopup && entryPopup.classList.contains('is-open')) return;
      open(exitPopup);
      sessionStorage.setItem(SESSION_KEY_EXIT, '1');
    });
  }

  // Scroll popup — fires on depth rather than a timer, because depth is the
  // only signal that says someone is actually reading. Once per session, and
  // never after an inquiry has already been sent.
  if (scrollPopup && !sessionStorage.getItem(SESSION_KEY_SCROLL)) {
    let ticking = false;

    function checkDepth() {
      ticking = false;
      if (sessionStorage.getItem(SESSION_KEY_SCROLL)) return;
      if (sessionStorage.getItem(SESSION_KEY_INQUIRY_SENT)) return;
      // Never interrupt a form that is already open.
      if (document.querySelector('.inquire-drawer.is-open')) return;

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      if (window.scrollY / scrollable < SCROLL_TRIGGER) return;

      open(scrollPopup);
      sessionStorage.setItem(SESSION_KEY_SCROLL, '1');
      window.removeEventListener('scroll', onScroll);
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(checkDepth);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  }
})();
