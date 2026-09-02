/**
 * Journal guide download. Captures a name and email inside the offer popup,
 * then hands over the PDF.
 *
 * Kept separate from menu-download-drawer.js on purpose: that flow collects
 * five fields and opens a drawer, which is right for someone asking for a full
 * catering menu and wrong for a reader who arrived from a social post. This
 * one never leaves the panel.
 */
(function () {
  const form = document.getElementById('guide-download-form');
  if (!form) return;

  const submitBtn = document.getElementById('guide-submit');
  const statusEl = document.getElementById('guide-status');
  const label = submitBtn ? submitBtn.querySelector('span').textContent : '';

  function setStatus(message, isError) {
    if (!statusEl) return;
    statusEl.textContent = message || '';
    statusEl.className = 'inquiry-form__status' + (isError ? ' inquiry-form__status--error' : '');
  }

  function clearErrors() {
    form.querySelectorAll('[data-error-for]').forEach((el) => { el.textContent = ''; });
    form.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));
  }

  function showErrors(errors) {
    Object.entries(errors).forEach(([field, message]) => {
      const target = form.querySelector(`[data-error-for="${field}"]`);
      if (target) target.textContent = message;
      const input = form.querySelector(`[name="${field}"]`);
      if (input) input.setAttribute('aria-invalid', 'true');
    });
    if (errors._general) setStatus(errors._general, true);
  }

  // A browser-initiated click on an <a download>, rather than assigning
  // location: navigating away would close the popup and lose the confirmation.
  function triggerDownload(url) {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearErrors();
    setStatus('');

    const payload = {
      name: form.querySelector('[name="name"]').value,
      email: form.querySelector('[name="email"]').value,
      asset: form.dataset.asset,
      page: form.dataset.page,
      // vchAttribution is a function returning an object, not an object with a
      // .summary. Reading a property off the function silently yielded
      // undefined, so every guide download was recorded with no source at all.
      attribution: typeof window.vchAttribution === 'function' ? window.vchAttribution() : null
    };

    if (submitBtn) { submitBtn.disabled = true; submitBtn.querySelector('span').textContent = 'One moment'; }

    try {
      const res = await fetch('/api/guide-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        showErrors(data.errors || { _general: 'Something went wrong. Please try again.' });
        return;
      }

      // A download is a captured contact like any other, so it reports the
      // same way the enquiry drawer does.
      try {
        if (window.fbq) window.fbq('track', 'Lead', { content_name: form.dataset.page });
        if (window.gtag) window.gtag('event', 'generate_lead', { event_label: form.dataset.page });
      } catch (e) {}

      setStatus('Your guide is downloading. Thank you.', false);
      triggerDownload(data.downloadUrl);
    } catch (err) {
      setStatus('Something went wrong. Please try again.', true);
    } finally {
      if (submitBtn) { submitBtn.disabled = false; submitBtn.querySelector('span').textContent = label; }
    }
  });
})();
