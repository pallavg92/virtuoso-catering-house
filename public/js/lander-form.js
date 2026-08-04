/**
 * Paid-traffic landing page form.
 *
 * Posts to the same /api/menu-download endpoint the site-wide menu drawer
 * uses, so leads land in the existing inbox flow with no new backend. On
 * success it navigates to the thank-you page, which is where the Meta Lead
 * event fires — deliberately not fired here, so the conversion is counted
 * exactly once, at one place.
 */
(function () {
  const form = document.getElementById('lander-form');
  if (!form) return;

  const submitBtn = document.getElementById('lander-submit');
  const status = document.getElementById('lander-status');
  const THANKS_URL = '/lp/private-celebrations-delhi-ncr/thank-you';

  function setStatus(message, type) {
    status.textContent = message || '';
    status.className = 'lander__status' + (type === 'error' ? ' lander__status--error' : '');
  }

  function clearErrors() {
    form.querySelectorAll('[data-error-for]').forEach((el) => { el.textContent = ''; });
    form.querySelectorAll('input').forEach((el) => { el.removeAttribute('aria-invalid'); });
  }

  function showErrors(errors) {
    let firstInvalid = null;
    Object.keys(errors).forEach((field) => {
      const slot = form.querySelector('[data-error-for="' + field + '"]');
      const input = form.querySelector('[name="' + field + '"]');
      if (slot) slot.textContent = errors[field];
      if (input) {
        input.setAttribute('aria-invalid', 'true');
        if (!firstInvalid) firstInvalid = input;
      }
    });
    if (firstInvalid) firstInvalid.focus();
    if (errors._general) setStatus(errors._general, 'error');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();
    setStatus('');

    const payload = {
      name: form.elements.name.value,
      phone: form.elements.phone.value,
      email: form.elements.email.value,
      eventDate: form.elements.eventDate.value,
      guestCount: form.elements.guestCount.value
    };

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    try {
      const res = await fetch('/api/menu-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        showErrors(data.errors || { _general: 'Something went wrong. Please try again.' });
        submitBtn.disabled = false;
        submitBtn.textContent = form.dataset.submitLabel || 'Send Me the Menu';
        return;
      }

      window.location.href = THANKS_URL;
    } catch (err) {
      setStatus('Something went wrong. Please try again, or call us on +91 87009 15463.', 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = form.dataset.submitLabel || 'Send Me the Menu';
    }
  });
})();
