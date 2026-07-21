/**
 * Entry welcome popup + exit-intent popup. Both funnel into the same
 * global Inquire drawer (inquire-drawer.js); this module only owns
 * showing/hiding its own two panels and deciding when to trigger them.
 */
(function () {
  const entryPopup = document.getElementById('entry-popup');
  const exitPopup = document.getElementById('exit-popup');
  if (!entryPopup && !exitPopup) return;

  const SESSION_KEY_ENTRY = 'vch_entry_popup_seen';
  const SESSION_KEY_EXIT = 'vch_exit_popup_seen';
  const SESSION_KEY_INQUIRY_SENT = 'vch_inquiry_sent';
  const SKIP_PATHS = ['/contact'];

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

  window.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (entryPopup && entryPopup.classList.contains('is-open')) close(entryPopup);
    if (exitPopup && exitPopup.classList.contains('is-open')) close(exitPopup);
  });

  if (SKIP_PATHS.includes(window.location.pathname)) return;

  // Entry popup — once per session, after a calm delay, and never once
  // an inquiry has already been sent this session.
  if (
    entryPopup &&
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
})();
