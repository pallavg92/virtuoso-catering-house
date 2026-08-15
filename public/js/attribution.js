// Records where a lead came from, and keeps it until they actually enquire.
//
// Two problems this solves.
//
// First, when a lead converts we currently cannot say which search, campaign
// or page produced it. Two leads closed in August 2026 and there was no way to
// tell which query earned them, which is exactly the information that should
// decide what we optimise next.
//
// Second, Google Ads offline conversion import needs the click id that brought
// the visitor here. Google appends it as `gclid` (or `gbraid`/`wbraid` for iOS
// and app traffic). It is only present on the landing URL, and the enquiry
// usually happens two or three pages later, so it has to be stored on arrival
// or it is gone. Without it a closed deal cannot be matched back to the click
// that produced it, and Smart Bidding never learns which clicks are worth
// buying.
//
// Deliberately first-party and minimal: click ids, campaign tags, landing page
// and referrer. No personal data, nothing that needs a consent banner beyond
// what the site already carries.
(function () {
  'use strict';

  var KEY = 'vch_attribution';
  var TTL_DAYS = 90; // Google Ads' default click-to-conversion window.

  function read() {
    try {
      var raw = window.localStorage.getItem(KEY);
      if (!raw) return null;
      var saved = JSON.parse(raw);
      if (!saved || !saved.savedAt) return null;
      if (Date.now() - saved.savedAt > TTL_DAYS * 864e5) {
        window.localStorage.removeItem(KEY);
        return null;
      }
      return saved;
    } catch (e) {
      return null; // Private mode, storage disabled, corrupt value.
    }
  }

  function capture() {
    var params = new URLSearchParams(window.location.search);
    var found = {};
    var keys = [
      'gclid', 'gbraid', 'wbraid', 'msclkid', 'fbclid',
      'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'
    ];

    keys.forEach(function (k) {
      var v = params.get(k);
      if (v) found[k] = v.slice(0, 200);
    });

    var previous = read();

    // Nothing new on this URL: keep whatever we already had. A visitor who
    // arrives on an ad and then browses must not lose the click id just
    // because the second page has a clean URL.
    if (!Object.keys(found).length) return previous;

    // A fresh click id supersedes an older one. Google attributes a conversion
    // to the most recent click, so last touch is the correct rule here even
    // though first touch would be right for a general analytics story.
    var record = {
      savedAt: Date.now(),
      landingPage: window.location.pathname + window.location.search,
      referrer: (document.referrer || '').slice(0, 300)
    };
    keys.forEach(function (k) { if (found[k]) record[k] = found[k]; });

    try {
      window.localStorage.setItem(KEY, JSON.stringify(record));
    } catch (e) { /* storage unavailable; the in-memory value below still works */ }

    return record;
  }

  var current = capture() || read();

  // If there is no ad click and no campaign tag, still record how they got
  // here. "Organic search, landed on the Noida wedding page" is exactly the
  // answer that was missing when the two August leads closed.
  window.vchAttribution = function () {
    var base = current || {};
    return {
      gclid: base.gclid || '',
      gbraid: base.gbraid || '',
      wbraid: base.wbraid || '',
      msclkid: base.msclkid || '',
      fbclid: base.fbclid || '',
      utmSource: base.utm_source || '',
      utmMedium: base.utm_medium || '',
      utmCampaign: base.utm_campaign || '',
      utmTerm: base.utm_term || '',
      utmContent: base.utm_content || '',
      landingPage: base.landingPage || (window.location.pathname + window.location.search),
      referrer: base.referrer || (document.referrer || ''),
      submittedFrom: window.location.pathname
    };
  };
})();
