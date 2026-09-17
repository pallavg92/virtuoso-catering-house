/* Hero background video.

   The hero photo stays in the markup and keeps painting first, so the
   measurement Google takes of how fast the page shows its biggest element is
   unchanged. The video layers over it and only fades in once it can actually
   play, which means a slow or refused download leaves the photo in place
   rather than a black box.

   The file address lives in data-src, not src, so nothing downloads for
   visitors who have asked for less motion or turned on data saving. */
(function () {
  const video = document.querySelector('[data-hero-video]');
  if (!video) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const saveData = !!(connection && connection.saveData);
  if (reduceMotion || saveData) return;

  const hero = video.closest('.hero');

  video.addEventListener('canplay', function () {
    video.classList.add('is-ready');
    // Tells the stylesheet to deepen the scrim, since moving footage washes
    // out the headline in a way the still photograph never did.
    if (hero) hero.classList.add('has-video');
  }, { once: true });

  // The clip loops, so it never fires the browser's own 'ended' event. A wrap
  // back to the start is the only signal that a full pass has played, and
  // popups.js waits for it before showing the welcome.
  let lastTime = 0;
  video.addEventListener('timeupdate', function () {
    if (video.currentTime < lastTime) {
      document.dispatchEvent(new CustomEvent('vch:hero-video-ended'));
    }
    lastTime = video.currentTime;
  });

  Array.prototype.forEach.call(video.querySelectorAll('source[data-src]'), function (source) {
    source.src = source.getAttribute('data-src');
  });
  video.load();

  const attemptPlay = function () {
    const started = video.play();
    // Autoplay is refused by low power mode on iOS and by some browser
    // settings. The photo underneath is already the right picture, so a
    // refusal needs no handling beyond not throwing.
    if (started && typeof started.catch === 'function') started.catch(function () {});
  };

  attemptPlay();

  // Stop decoding frames nobody can see. Saves battery on a phone left open
  // further down the page, and CPU on a background tab.
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          attemptPlay();
        } else {
          video.pause();
        }
      });
    }, { threshold: 0 }).observe(video);
  }

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      video.pause();
    } else if (video.getBoundingClientRect().bottom > 0) {
      attemptPlay();
    }
  });
})();
