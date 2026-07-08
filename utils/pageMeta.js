// Centralized per-page SEO/AEO metadata, shared by the Express dev server
// (routes/pages.js) and the static build script (scripts/build.js) so
// titles, descriptions, and canonical URLs never drift between the two.
const content = require('./content');

const siteUrl = 'https://www.virtuosocatering.com';

const business = {
  name: 'Virtuoso Catering House',
  telephone: '+91-8700915463',
  email: 'virtuosocatering@gmail.com',
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
    description: 'Virtuoso Catering House is a luxury experiential catering company based in Noida, Delhi NCR, crafting bespoke F&B for weddings, brand activations, and private events.',
    ogImage: content.heroImage
  },
  about: {
    slug: 'about',
    path: '/about',
    view: 'about',
    activePage: 'about',
    bodyClass: 'page-about',
    title: 'About — Virtuoso Catering House',
    description: 'Meet the founders of Virtuoso Catering House and how we take a project from first brief to final day of service.',
    ogImage: content.aboutHeroImage
  },
  ourWork: {
    slug: 'our-work',
    path: '/our-work',
    view: 'our-work',
    activePage: 'our-work',
    bodyClass: 'page-our-work',
    title: 'Our Work — Virtuoso Catering House',
    description: 'A selection of weddings, brand activations, and private events designed and executed by Virtuoso Catering House.',
    ogImage: content.ourWork[0].image
  },
  social: {
    slug: 'social',
    path: '/social',
    view: 'social',
    activePage: 'social',
    bodyClass: 'page-social',
    title: 'Social Media — Virtuoso Catering House',
    description: 'Follow Virtuoso Catering House on Instagram for events, menus, and behind-the-scenes.',
    ogImage: content.heroImage
  },
  blog: {
    slug: 'blog',
    path: '/blog',
    view: 'blog',
    activePage: 'blog',
    bodyClass: 'page-blog',
    title: 'Journal — Virtuoso Catering House',
    description: 'Notes on luxury catering, event design, and hospitality from the Virtuoso Catering House team.',
    ogImage: content.blogPosts[0].image
  },
  services: {
    slug: 'services',
    path: '/services',
    view: 'services',
    activePage: 'services',
    bodyClass: 'page-services',
    title: 'Services & Menus — Virtuoso Catering House',
    description: 'Weddings, brand activations, private dining, and bespoke menus from Virtuoso Catering House, a luxury experiential caterer in Noida.',
    ogImage: content.services[0].image
  },
  contact: {
    slug: 'contact',
    path: '/contact',
    view: 'contact',
    activePage: 'contact',
    bodyClass: 'page-contact',
    title: 'Inquire — Virtuoso Catering House',
    description: 'Start an inquiry with Virtuoso Catering House. Based in Noida, Delhi NCR, serving weddings, brand activations, and private events.',
    ogImage: content.contactOfficeImage
  }
};

module.exports = { siteUrl, business, pages };
