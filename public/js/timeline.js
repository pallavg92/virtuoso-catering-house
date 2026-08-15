/**
 * About page: draws the gold timeline progress line in step with scroll
 * position through the milestones list.
 */
(function () {
  const list = document.getElementById('timeline-list');
  const progress = document.getElementById('timeline-progress');
  if (!list || !progress) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function update() {
    const rect = list.getBoundingClientRect();
    const viewportH = window.innerHeight;
    const total = rect.height;
    const visibleStart = viewportH * 0.75;
    const traveled = visibleStart - rect.top;
    const pct = Math.min(Math.max(traveled / total, 0), 1);
    progress.style.height = (pct * 100) + '%';
  }

  if (reduceMotion) {
    progress.style.height = '100%';
    return;
  }

  function loop() {
    update();
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
