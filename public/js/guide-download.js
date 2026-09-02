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

      // A guide download is an audience signup, not a lead, and the two must
      // not share an event name.
      //
      // Nothing is sent to Meta. Firing Lead here told the ad account that a
      // cheese-guide download is a conversion, which teaches delivery to find
      // more people who download cheese guides. That is the same failure that
      // filled the first-birthday campaign with unqualified enquiries, and
      // this audience has no relationship to the ad campaigns at all.
      //
      // GA4 gets a plain custom event rather than generate_lead, which is a
      // recommended event meaning a lead was generated and is designed to be
      // marked as a conversion. guide_download counts downloads without
      // putting them anywhere near conversion reporting.
      try {
        if (window.gtag) {
          window.gtag('event', 'guide_download', {
            guide: form.dataset.asset,
            page: form.dataset.page
          });
        }
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
