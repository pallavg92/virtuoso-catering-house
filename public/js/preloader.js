/**
 * Preloader: animates a thin gold progress line while assets load,
 * then fades the overlay out and unlocks scroll.
 */
(function () {
  const preloader = document.getElementById('preloader');
  const fill = document.getElementById('preloader-fill');
  if (!preloader) return;

  document.body.classList.add('preloader-active');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let progress = 0;
  let loaded = false;

  function tick() {
    if (!loaded) {
      // Ease toward 85% while waiting on real load event
      progress += (85 - progress) * 0.04;
      if (fill) fill.style.width = progress + '%';
      requestAnimationFrame(tick);
    }
  }

  function finish() {
    loaded = true;
    if (fill) fill.style.width = '100%';
    const delay = reduceMotion ? 0 : 350;
    setTimeout(() => {
      preloader.classList.add('is-hidden');
      document.body.classList.remove('preloader-active');
      document.dispatchEvent(new CustomEvent('preloader:done'));
    }, delay);
  }

  if (reduceMotion) {
    finish();
    return;
  }

  requestAnimationFrame(tick);

  if (document.readyState === 'complete') {
    setTimeout(finish, 500);
  } else {
    window.addEventListener('load', () => setTimeout(finish, 400));
    // Safety net in case load event is delayed by slow third-party assets
    setTimeout(finish, 3500);
  }
})();
