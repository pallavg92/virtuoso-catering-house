/**
 * Contact page: submits the inquiry form via fetch to /api/inquiry,
 * rendering inline field errors or a success message without a reload.
 */
(function () {
  const form = document.getElementById('inquiry-form');
  if (!form) return;

  const statusEl = document.getElementById('inquiry-status');
  const submitBtn = document.getElementById('inquiry-submit');

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

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();
    clearStatus();

    form.classList.add('is-submitting');
    submitBtn.disabled = true;

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/inquiry', {
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

      setStatus(data.message || 'Thank you — your inquiry has been received.', 'success');
      form.reset();
    } catch (err) {
      setStatus('Something went wrong sending your inquiry. Please try again shortly.', 'error');
    } finally {
      form.classList.remove('is-submitting');
      submitBtn.disabled = false;
    }
  });
})();
