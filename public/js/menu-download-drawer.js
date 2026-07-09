/**
 * Menu-download side drawer: opens from [data-menu-download-trigger]
 * (the "Download Full Menu (PDF)" button on /services), captures the
 * visitor's details via /api/menu-download, then triggers the actual
 * PDF download once the request succeeds.
 */
(function () {
  const drawer = document.getElementById('menu-drawer');
  const overlay = document.getElementById('menu-drawer-overlay');
  const closeBtn = document.getElementById('menu-drawer-close');
  const triggers = document.querySelectorAll('[data-menu-download-trigger]');
  const form = document.getElementById('menu-download-form');
  if (!drawer || !form) return;

  let lastFocused = null;

  function openDrawer(e) {
    if (e) e.preventDefault();
    lastFocused = document.activeElement;
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const firstField = form.querySelector('input, select, textarea');
    if (firstField) firstField.focus();
  }

  function closeDrawer() {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  triggers.forEach((trigger) => trigger.addEventListener('click', openDrawer));
  overlay && overlay.addEventListener('click', closeDrawer);
  closeBtn && closeBtn.addEventListener('click', closeDrawer);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeDrawer();
  });

  const statusEl = document.getElementById('menu-download-status');
  const submitBtn = document.getElementById('menu-download-submit');

  function clearErrors() {
    form.querySelectorAll('.form-field').forEach((field) => field.classList.remove('has-error'));
    form.querySelectorAll('.form-field__error').forEach((el) => (el.textContent = ''));
  }

  function showErrors(errors) {
    Object.keys(errors).forEach((key) => {
      if (key === '_general') return;
      const errorEl = form.querySelector(`[data-error-for="${key}"]`);
      const field = errorEl ? errorEl.closest('.form-field') : null;
      if (errorEl) errorEl.textContent = errors[key];
      if (field) field.classList.add('has-error');
    });
  }

  function setStatus(message, type) {
    statusEl.textContent = message;
    statusEl.classList.remove('is-success', 'is-error');
    if (type) statusEl.classList.add(type === 'success' ? 'is-success' : 'is-error');
    requestAnimationFrame(() => statusEl.classList.add('is-visible'));
  }

  function clearStatus() {
    statusEl.classList.remove('is-visible', 'is-success', 'is-error');
    statusEl.textContent = '';
  }

  function triggerDownload(url) {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();
    clearStatus();

    form.classList.add('is-submitting');
    submitBtn.disabled = true;

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/menu-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        if (data.errors) showErrors(data.errors);
        setStatus(
          (data.errors && data.errors._general) || 'Please check the highlighted fields and try again.',
          'error'
        );
        return;
      }

      setStatus(data.message || 'Thank you — your download will begin shortly.', 'success');
      form.reset();
      if (data.downloadUrl) triggerDownload(data.downloadUrl);
    } catch (err) {
      setStatus('Something went wrong. Please try again shortly.', 'error');
    } finally {
      form.classList.remove('is-submitting');
      submitBtn.disabled = false;
    }
  });
})();
