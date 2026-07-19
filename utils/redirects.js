// Single source of truth for every 301 redirect on the site: legacy
// WordPress URLs (so old backlinks/bookmarks/search results don't 404) plus
// a couple of renamed in-app paths (/gallery, /menu). Consumed by:
//   - routes/pages.js (Express dev server)
//   - scripts/build.js (generates dist/.htaccess for the static deploy,
//     since the static host has no Express router to run these)
const redirects = [
  { from: '/gallery', to: '/social' },
  { from: '/menu', to: '/services' },

  // Legacy WordPress URLs
  { from: '/about-us', to: '/about' },
  { from: '/contact-us', to: '/contact' },
  { from: '/menu-cuisines', to: '/services' },
  { from: '/bespoke-experiences', to: '/services' },
  { from: '/blogs', to: '/blog' },
  { from: '/thank-you', to: '/contact' },
  { from: '/a-hosts-guide-to-house-party-planning', to: '/blog' },
  { from: '/what-we-did-for-the-launch-of-the-lamborghini-temerario', to: '/blog/what-we-did-for-the-launch-of-the-lamborghini-temerario' },
  { from: '/lamborghini-temerario-launch-catering-delhi-2025', to: '/blog/what-we-did-for-the-launch-of-the-lamborghini-temerario' },
  { from: '/tesla-centre-gurugram-launch-catering-november-2025', to: '/blog/tesla-centre-gurugram-launch-catering' },

  // Pages published on WordPress with a title/keyword reserved but no
  // content ever written — redirect to the closest live equivalent.
  { from: '/luxury-event-catering-delhi-ncr', to: '/blog' },
  { from: '/luxury-automotive-event-catering-delhi-ncr', to: '/luxury-brand-event-catering-delhi-ncr' },
  { from: '/luxury-fashion-and-retail-event-catering-delhi-ncr', to: '/services' },
  { from: '/luxury-private-event-catering-delhi-ncr', to: '/services' },

  // WordPress used nested page hierarchy (parent/child permalinks) under
  // the "Luxury Brand Event" parent — confirmed via real, currently-indexed
  // Search Console URLs that would otherwise 404. The most specific path
  // (grandchild) must stay ahead of its parent so an exact-match rewrite
  // engine resolves the deeper URL correctly.
  { from: '/luxury-brand-event-catering-delhi-ncr/luxury-automotive-event-catering-delhi-ncr/lamborghini-temerario-launch-catering-delhi-2025', to: '/blog/what-we-did-for-the-launch-of-the-lamborghini-temerario' },
  { from: '/luxury-brand-event-catering-delhi-ncr/luxury-automotive-event-catering-delhi-ncr', to: '/luxury-brand-event-catering-delhi-ncr' },
  { from: '/luxury-brand-event-catering-delhi-ncr/luxury-fashion-and-retail-event-catering-delhi-ncr', to: '/services' },
  { from: '/luxury-brand-event-catering-delhi-ncr/luxury-wedding-catering-delhi-ncr', to: '/luxury-wedding-catering-delhi-ncr' },
  { from: '/luxury-brand-event-catering-delhi-ncr/luxury-private-event-catering-delhi-ncr', to: '/services' },

  // A WordPress-uploaded menu PDF still has real Search Console impression
  // volume (1,299 in the last 90 days) — redirect it to the current
  // download instead of letting it 404 now that /wp-content/ isn't served.
  { from: '/wp-content/uploads/2025/04/Virtuoso-Menu-Chefs-Special-Most-Loved.pdf', to: '/downloads/virtuoso-catering-house-menu.pdf' }
];

module.exports = redirects;
