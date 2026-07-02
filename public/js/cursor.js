/**
 * Custom cursor: a small dot that tracks instantly, plus a lagging ring
 * that scales up over any element flagged [data-cursor="hover"].
 */
(function () {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isFinePointer) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  const ease = 0.18;
  let hasMoved = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    if (!hasMoved) {
      ringX = mouseX;
      ringY = mouseY;
      hasMoved = true;
      dot.classList.remove('is-hidden');
      ring.classList.remove('is-hidden');
    }
  });

  document.addEventListener('mouseleave', () => {
    dot.classList.add('is-hidden');
    ring.classList.add('is-hidden');
  });
  document.addEventListener('mouseenter', () => {
    dot.classList.remove('is-hidden');
    ring.classList.remove('is-hidden');
  });

  function raf() {
    ringX += (mouseX - ringX) * ease;
    ringY += (mouseY - ringY) * ease;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  function bindHoverTargets(root = document) {
    root.querySelectorAll('[data-cursor="hover"]').forEach((el) => {
      el.addEventListener('mouseenter', () => ring.classList.add('is-hovering'));
      el.addEventListener('mouseleave', () => ring.classList.remove('is-hovering'));
    });
  }

  bindHoverTargets();

  // Re-bind after dynamic content swaps (menu filter, lightbox open, etc.)
  window.__cursorRebind = bindHoverTargets;
})();
