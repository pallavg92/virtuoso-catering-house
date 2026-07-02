/**
 * Gallery page: category filtering plus a hand-built lightbox
 * (fade transition, arrow + keyboard navigation, focus handling).
 */
(function () {
  const filters = document.getElementById('gallery-filters');
  const grid = document.getElementById('gallery-grid');
  const lightbox = document.getElementById('lightbox');
  if (!grid || !lightbox) return;

  const filterBtns = filters ? Array.from(filters.querySelectorAll('.gallery-filters__btn')) : [];
  const allItems = Array.from(grid.querySelectorAll('.gallery-item'));

  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  let visibleItems = allItems.slice();
  let currentPos = 0;
  let lastFocused = null;

  function getVisible() {
    return allItems.filter((item) => !item.classList.contains('is-hidden'));
  }

  function applyFilter(filter) {
    allItems.forEach((item) => {
      const match = filter === 'all' || item.dataset.category === filter;
      item.classList.toggle('is-hidden', !match);
    });
    visibleItems = getVisible();
  }

  if (filters) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        applyFilter(btn.dataset.filter);
      });
    });
  }

  function openLightbox(item) {
    visibleItems = getVisible();
    currentPos = visibleItems.indexOf(item);
    if (currentPos === -1) currentPos = 0;
    lastFocused = document.activeElement;
    render();
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn && closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  function render() {
    const item = visibleItems[currentPos];
    if (!item) return;
    const img = item.querySelector('img');
    const caption = item.querySelector('.gallery-item__caption');
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt || '';
    lightboxCaption.textContent = caption ? caption.textContent : '';
  }

  function step(delta) {
    if (!visibleItems.length) return;
    currentPos = (currentPos + delta + visibleItems.length) % visibleItems.length;
    render();
  }

  allItems.forEach((item) => {
    item.addEventListener('click', () => openLightbox(item));
  });

  closeBtn && closeBtn.addEventListener('click', closeLightbox);
  prevBtn && prevBtn.addEventListener('click', () => step(-1));
  nextBtn && nextBtn.addEventListener('click', () => step(1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  });
})();
