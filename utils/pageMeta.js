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
    path: '/',
    view: 'index',
    activePage: 'home',
    bodyClass: 'page-home',
    title: 'Virtuoso Catering House — Culinary Artistry for Unforgettable Occasions',
    description: 'Virtuoso Catering House is a luxury experiential catering company based in Noida, Delhi NCR, crafting bespoke F&B for weddings, brand activations, and private events.',
    ogImage: content.heroImage
  },
  about: {
    path: '/about',
    view: 'about',
    activePage: 'about',
    bodyClass: 'page-about',
    title: 'About — Virtuoso Catering House',
    description: 'Meet the founders of Virtuoso Catering House and how we take a project from first brief to final day of service.',
    ogImage: content.aboutHeroImage
  },
  ourWork: {
    path: '/our-work',
    view: 'our-work',
    activePage: 'our-work',
    bodyClass: 'page-our-work',
    title: 'Our Work — Virtuoso Catering House',
    description: 'A selection of weddings, brand activations, and private events designed and executed by Virtuoso Catering House.',
    ogImage: content.ourWork[0].image
  },
  social: {
    path: '/social',
    view: 'social',
    activePage: 'social',
    bodyClass: 'page-social',
    title: 'Social Media — Virtuoso Catering House',
    description: 'Follow Virtuoso Catering House on Instagram for events, menus, and behind-the-scenes.',
    ogImage: content.heroImage
  },
  blog: {
    path: '/blog',
    view: 'blog',
    activePage: 'blog',
    bodyClass: 'page-blog',
    title: 'Journal — Virtuoso Catering House',
    description: 'Notes on luxury catering, event design, and hospitality from the Virtuoso Catering House team.',
    ogImage: content.blogPosts.slice().sort((a, b) => new Date(b.date) - new Date(a.date))[0].image
  },
  services: {
    path: '/services',
    view: 'services',
    activePage: 'services',
    bodyClass: 'page-services',
    title: 'Services & Menus — Virtuoso Catering House',
    description: 'Weddings, brand activations, private dining, and bespoke menus from Virtuoso Catering House, a luxury experiential caterer in Noida.',
    ogImage: content.services[0].image
  },
  contact: {
    path: '/contact',
    view: 'contact',
    activePage: 'contact',
    bodyClass: 'page-contact',
    title: 'Inquire — Virtuoso Catering House',
    description: 'Start an inquiry with Virtuoso Catering House. Based in Noida, Delhi NCR, serving weddings, brand activations, and private events.',
    ogImage: content.contactOfficeImage
  },
  // Local-SEO landing pages migrated from the previous WordPress site.
  // Slugs, titles, and descriptions match the archived WordPress URLs
  // exactly so existing search rankings aren't disrupted.
  landingBestNoida: {
    path: '/best-catering-services-in-noida',
    view: 'landing',
    landingSlug: 'best-catering-services-in-noida',
    activePage: 'landing',
    bodyClass: 'page-landing',
    title: content.landingPages['best-catering-services-in-noida'].metaTitle,
    description: content.landingPages['best-catering-services-in-noida'].metaDescription,
    ogImage: content.landingPages['best-catering-services-in-noida'].image
  },
  landingGreaterNoida: {
    path: '/catering-services-in-greater-noida',
    view: 'landing',
    landingSlug: 'catering-services-in-greater-noida',
    activePage: 'landing',
    bodyClass: 'page-landing',
    title: content.landingPages['catering-services-in-greater-noida'].metaTitle,
    description: content.landingPages['catering-services-in-greater-noida'].metaDescription,
    ogImage: content.landingPages['catering-services-in-greater-noida'].image
  },
  landingCorporate: {
    path: '/corporate-catering-services-in-noida',
    view: 'landing',
    landingSlug: 'corporate-catering-services-in-noida',
    activePage: 'landing',
    bodyClass: 'page-landing',
    title: content.landingPages['corporate-catering-services-in-noida'].metaTitle,
    description: content.landingPages['corporate-catering-services-in-noida'].metaDescription,
    ogImage: content.landingPages['corporate-catering-services-in-noida'].image
  },
  landingBrandEvent: {
    path: '/luxury-brand-event-catering-delhi-ncr',
    view: 'landing',
    landingSlug: 'luxury-brand-event-catering-delhi-ncr',
    activePage: 'landing',
    bodyClass: 'page-landing',
    title: content.landingPages['luxury-brand-event-catering-delhi-ncr'].metaTitle,
    description: content.landingPages['luxury-brand-event-catering-delhi-ncr'].metaDescription,
    ogImage: content.landingPages['luxury-brand-event-catering-delhi-ncr'].image
  },
  // Real case-study posts recovered from the WordPress database backup.
  blogLamborghiniTemerario: {
    path: '/blog/what-we-did-for-the-launch-of-the-lamborghini-temerario',
    view: 'blog-post',
    activePage: 'blog',
    bodyClass: 'page-blog-post',
    title: 'Lamborghini Temerario Launch Catering, Delhi, 2025 - Virtuoso Catering House',
    description: content.blogPosts.find((p) => p.slug === 'what-we-did-for-the-launch-of-the-lamborghini-temerario').excerpt,
    ogImage: content.blogPosts.find((p) => p.slug === 'what-we-did-for-the-launch-of-the-lamborghini-temerario').image,
    post: content.blogPosts.find((p) => p.slug === 'what-we-did-for-the-launch-of-the-lamborghini-temerario')
  },
  blogTeslaGurugram: {
    path: '/blog/tesla-centre-gurugram-launch-catering',
    view: 'blog-post',
    activePage: 'blog',
    bodyClass: 'page-blog-post',
    title: 'Tesla Centre Gurugram Launch Catering, November 2025 - Virtuoso Catering House',
    description: content.blogPosts.find((p) => p.slug === 'tesla-centre-gurugram-launch-catering').excerpt,
    ogImage: content.blogPosts.find((p) => p.slug === 'tesla-centre-gurugram-launch-catering').image,
    post: content.blogPosts.find((p) => p.slug === 'tesla-centre-gurugram-launch-catering')
  },
  press: {
    path: '/press',
    view: 'press',
    activePage: 'press',
    bodyClass: 'page-press',
    title: 'Press — Virtuoso Catering House',
    description: 'Press coverage and mentions of Virtuoso Catering House, a luxury experiential catering company based in Noida, Delhi NCR.',
    ogImage: content.heroImage
  }
};

module.exports = { siteUrl, business, pages };
