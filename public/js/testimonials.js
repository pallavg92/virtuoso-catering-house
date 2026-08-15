/**
 * Testimonial slider: simple fade-crossfade carousel with autoplay,
 * pause-on-hover, dot navigation, and arrow controls.
 */
(function () {
  const slider = document.getElementById('testimonial-slider');
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll('.testimonial-slide'));
  const dots = Array.from(slider.querySelectorAll('.testimonial-slider__dot'));
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');

  let index = 0;
  let timer = null;
  const AUTOPLAY_MS = 6000;

  function show(i) {
    index = (i + slides.length) % slides.length;
    slides.forEach((s, si) => s.classList.toggle('is-active', si === index));
    dots.forEach((d, di) => d.classList.toggle('is-active', di === index));
  }

  function next() { show(index + 1); }
  function prev() { show(index - 1); }

  function startAutoplay() {
    stopAutoplay();
    timer = setInterval(next, AUTOPLAY_MS);
  }
  function stopAutoplay() {
    if (timer) clearInterval(timer);
  }

  nextBtn && nextBtn.addEventListener('click', () => { next(); startAutoplay(); });
  prevBtn && prevBtn.addEventListener('click', () => { prev(); startAutoplay(); });
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      show(parseInt(dot.dataset.index, 10));
      startAutoplay();
    });
  });

  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);

  show(0);
  startAutoplay();
})();
