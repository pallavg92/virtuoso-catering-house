/**
 * Lightweight custom smooth-scroll.
 * Keeps the real window scroll (so native behavior, anchors, and
 * ScrollTrigger all keep working) but renders #smooth-content with a
 * lerped transform for that buttery "premium site" glide.
 */
(function () {
  const wrapper = document.getElementById('smooth-wrapper');
  const content = document.getElementById('smooth-content');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  if (!wrapper || !content || reduceMotion || isTouch) {
    window.__smoothScrollDisabled = true;
    return;
  }

  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  let current = window.scrollY || window.pageYOffset;
  let target = current;
  const ease = 0.09;
  let resizeTimer;

  wrapper.style.position = 'fixed';
  wrapper.style.top = '0';
  wrapper.style.left = '0';
  wrapper.style.width = '100%';
  wrapper.style.overflow = 'hidden';

  function setBodyHeight() {
    document.body.style.height = content.getBoundingClientRect().height + 'px';
  }

  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setBodyHeight, 150);
  }

  function raf() {
    target = window.scrollY || window.pageYOffset;
    current += (target - current) * ease;
    if (Math.abs(target - current) < 0.05) current = target;
    content.style.transform = `translate3d(0, ${-current}px, 0)`;
    if (window.ScrollTrigger) window.ScrollTrigger.update();
    requestAnimationFrame(raf);
  }

  setBodyHeight();
  window.addEventListener('resize', onResize);
  window.addEventListener('load', setBodyHeight);
  requestAnimationFrame(raf);

  // Re-measure whenever content changes size (images loading, filters, etc.)
  if (window.ResizeObserver) {
    new ResizeObserver(onResize).observe(content);
  }

  // Safety net: content height can shift for reasons a single ResizeObserver
  // tick might race with (late-loading map iframes, inline form errors,
  // the inquiry drawer opening/closing) — resync periodically so the page
  // can never scroll into "dead" space below the real content.
  setInterval(setBodyHeight, 600);

  window.__smoothScrollDisabled = false;
})();
