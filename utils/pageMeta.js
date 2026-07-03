// Centralized per-page SEO/AEO metadata, shared by the Express dev server
// (routes/pages.js) and the static build script (scripts/build.js) so
// titles, descriptions, and canonical URLs never drift between the two.
const content = require('./content');

const siteUrl = 'https://www.virtuosocatering.com';

const business = {
  name: 'Virtuoso Catering House',
  telephone: '+91-8700915463',
  email: 'events@virtuosocatering.com',
  streetAddress: 'A-15, A-Block, Sector 61',
  addressLocality: 'Noida',
  addressRegion: 'Uttar Pradesh',
  postalCode: '201301',
  addressCountry: 'IN',
  sameAs: [
    'https://www.instagram.com/virtuosocateringhouse/',
    'https://pin.it/3EwnJeOiZ',
    'https://www.linkedin.com/company/virtuoso-caterings',
    'https://maps.app.goo.gl/VztH6YKQfN13Yogu7'
  ]
};

const pages = {
  home: {
    slug: 'index',
    path: '/',
    view: 'index',
    activePage: 'home',
    bodyClass: 'page-home',
    title: 'Virtuoso Catering House — Culinary Artistry for Unforgettable Occasions',
    description: 'Virtuoso Catering House is a boutique luxury caterer in Noida crafting bespoke menus for weddings, corporate events, and private dining.',
    ogImage: content.heroImage
  },
  about: {
    slug: 'about',
    path: '/about',
    view: 'about',
    activePage: 'about',
    bodyClass: 'page-about',
    title: 'About — Virtuoso Catering House',
    description: 'Eighteen years of boutique luxury catering — meet the chefs and events team behind Virtuoso Catering House.',
    ogImage: content.aboutHeroImage
  },
  menu: {
    slug: 'menu',
    path: '/menu',
    view: 'menu',
    activePage: 'menu',
    bodyClass: 'page-menu',
    title: 'Menus & Services — Virtuoso Catering House',
    description: 'Explore plated dinners, buffet, canapés, bar service, and dessert menus from Virtuoso Catering House, a boutique luxury caterer in Noida.',
    ogImage: content.services[0].image
  },
  gallery: {
    slug: 'gallery',
    path: '/gallery',
    view: 'gallery',
    activePage: 'gallery',
    bodyClass: 'page-gallery',
    title: 'Gallery — Virtuoso Catering House',
    description: 'Browse past weddings, corporate events, and private dinners catered by Virtuoso Catering House.',
    ogImage: content.gallery[0].image
  },
  contact: {
    slug: 'contact',
    path: '/contact',
    view: 'contact',
    activePage: 'contact',
    bodyClass: 'page-contact',
    title: 'Contact — Virtuoso Catering House',
    description: 'Start an inquiry with Virtuoso Catering House. Based in Noida, Uttar Pradesh, serving weddings, corporate events, and private dining.',
    ogImage: content.contactOfficeImage
  }
};

module.exports = { siteUrl, business, pages };
