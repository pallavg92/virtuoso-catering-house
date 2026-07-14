// Centralized per-page SEO/AEO metadata, shared by the Express dev server
// (routes/pages.js) and the static build script (scripts/build.js) so
// titles, descriptions, and canonical URLs never drift between the two.
const content = require('./content');

const siteUrl = 'https://www.virtuosocatering.com';

const business = {
  name: 'Virtuoso Catering House',
  description: 'Virtuoso Catering House is a luxury experiential catering company based in Noida, Delhi NCR, crafting bespoke F&B for weddings, brand activations, and private events.',
  logo: 'https://www.virtuosocatering.com/images/virtuoso-catering-house-logo.png',
  telephone: '+91-8700915463',
  email: 'virtuosocatering@gmail.com',
  streetAddress: 'A-15, A-Block, Sector 61',
  addressLocality: 'Noida',
  addressRegion: 'Uttar Pradesh',
  postalCode: '201301',
  addressCountry: 'IN',
  // Resolved from the business's actual Google Maps listing (maps.app.goo.gl/VztH6YKQfN13Yogu7).
  latitude: 28.5964201,
  longitude: 77.3641803,
  // Virtuoso is a catering company, not a dine-in restaurant — schema.org has
  // no dedicated "Caterer" type (open feature request, never implemented:
  // github.com/schemaorg/schemaorg/issues/1813), so we use plain LocalBusiness
  // rather than the restaurant-oriented FoodEstablishment subtype, and list
  // cuisines directly rather than implying a fixed dine-in menu.
  cuisines: ['Asian', 'Indian', 'Mexican', 'Continental', 'Bakery', 'Mughlai', 'Chinese', 'Sushi'],
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
    ogImage: content.heroImage,
    breadcrumbs: [{ name: 'Home', path: '/' }]
  },
  about: {
    path: '/about',
    view: 'about',
    activePage: 'about',
    bodyClass: 'page-about',
    title: 'About — Virtuoso Catering House',
    description: 'Meet the founders of Virtuoso Catering House and how we take a project from first brief to final day of service.',
    ogImage: content.aboutHeroImage,
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }]
  },
  ourWork: {
    path: '/our-work',
    view: 'our-work',
    activePage: 'our-work',
    bodyClass: 'page-our-work',
    title: 'Our Work — Virtuoso Catering House',
    description: 'A selection of weddings, brand activations, and private events designed and executed by Virtuoso Catering House.',
    ogImage: content.ourWork[0].image,
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Our Work', path: '/our-work' }]
  },
  social: {
    path: '/social',
    view: 'social',
    activePage: 'social',
    bodyClass: 'page-social',
    title: 'Social Media — Virtuoso Catering House',
    description: 'Follow Virtuoso Catering House on Instagram for events, menus, and behind-the-scenes.',
    ogImage: content.heroImage,
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Social Media', path: '/social' }]
  },
  blog: {
    path: '/blog',
    view: 'blog',
    activePage: 'blog',
    bodyClass: 'page-blog',
    title: 'Journal — Virtuoso Catering House',
    description: 'Notes on luxury catering, event design, and hospitality from the Virtuoso Catering House team.',
    ogImage: content.heroImage,
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Journal', path: '/blog' }]
  },
  services: {
    path: '/services',
    view: 'services',
    activePage: 'services',
    bodyClass: 'page-services',
    title: 'Services & Menus — Virtuoso Catering House',
    description: 'Weddings, brand activations, mixology, and bespoke menus from Virtuoso Catering House, a luxury experiential caterer in Noida.',
    ogImage: content.services[0].image,
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Services & Menus', path: '/services' }]
  },
  contact: {
    path: '/contact',
    view: 'contact',
    activePage: 'contact',
    bodyClass: 'page-contact',
    title: 'Inquire — Virtuoso Catering House',
    description: 'Start an inquiry with Virtuoso Catering House. Based in Noida, Delhi NCR, serving weddings, brand activations, and private events.',
    ogImage: content.contactOfficeImage,
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Inquire', path: '/contact' }]
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
    ogImage: content.landingPages['best-catering-services-in-noida'].image,
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Catering Services in Noida', path: '/best-catering-services-in-noida' }]
  },
  landingGreaterNoida: {
    path: '/catering-services-in-greater-noida',
    view: 'landing',
    landingSlug: 'catering-services-in-greater-noida',
    activePage: 'landing',
    bodyClass: 'page-landing',
    title: content.landingPages['catering-services-in-greater-noida'].metaTitle,
    description: content.landingPages['catering-services-in-greater-noida'].metaDescription,
    ogImage: content.landingPages['catering-services-in-greater-noida'].image,
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Catering Services in Greater Noida', path: '/catering-services-in-greater-noida' }]
  },
  landingCorporate: {
    path: '/corporate-catering-services-in-noida',
    view: 'landing',
    landingSlug: 'corporate-catering-services-in-noida',
    activePage: 'landing',
    bodyClass: 'page-landing',
    title: content.landingPages['corporate-catering-services-in-noida'].metaTitle,
    description: content.landingPages['corporate-catering-services-in-noida'].metaDescription,
    ogImage: content.landingPages['corporate-catering-services-in-noida'].image,
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Corporate Catering Services in Noida', path: '/corporate-catering-services-in-noida' }]
  },
  landingBrandEvent: {
    path: '/luxury-brand-event-catering-delhi-ncr',
    view: 'landing',
    landingSlug: 'luxury-brand-event-catering-delhi-ncr',
    activePage: 'landing',
    bodyClass: 'page-landing',
    title: content.landingPages['luxury-brand-event-catering-delhi-ncr'].metaTitle,
    description: content.landingPages['luxury-brand-event-catering-delhi-ncr'].metaDescription,
    ogImage: content.landingPages['luxury-brand-event-catering-delhi-ncr'].image,
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Luxury Brand Event Catering Delhi NCR', path: '/luxury-brand-event-catering-delhi-ncr' }]
  },
  landingWedding: {
    path: '/luxury-wedding-catering-delhi-ncr',
    view: 'landing',
    landingSlug: 'luxury-wedding-catering-delhi-ncr',
    activePage: 'landing',
    bodyClass: 'page-landing',
    title: content.landingPages['luxury-wedding-catering-delhi-ncr'].metaTitle,
    description: content.landingPages['luxury-wedding-catering-delhi-ncr'].metaDescription,
    ogImage: content.landingPages['luxury-wedding-catering-delhi-ncr'].image,
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Luxury Wedding Catering Delhi NCR', path: '/luxury-wedding-catering-delhi-ncr' }]
  },
  // Real case-study posts recovered from the WordPress database backup.
  blogLamborghiniTemerario: {
    path: '/blog/what-we-did-for-the-launch-of-the-lamborghini-temerario',
    view: 'blog-post',
    activePage: 'blog',
    bodyClass: 'page-blog-post',
    title: 'Lamborghini Temerario Launch Catering, Delhi, 2025 | Virtuoso Catering House',
    description: content.blogPosts.find((p) => p.slug === 'what-we-did-for-the-launch-of-the-lamborghini-temerario').excerpt,
    ogImage: content.blogPosts.find((p) => p.slug === 'what-we-did-for-the-launch-of-the-lamborghini-temerario').image,
    post: content.blogPosts.find((p) => p.slug === 'what-we-did-for-the-launch-of-the-lamborghini-temerario'),
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Journal', path: '/blog' }, { name: 'Lamborghini Temerario Launch Catering', path: '/blog/what-we-did-for-the-launch-of-the-lamborghini-temerario' }]
  },
  blogTeslaGurugram: {
    path: '/blog/tesla-centre-gurugram-launch-catering',
    view: 'blog-post',
    activePage: 'blog',
    bodyClass: 'page-blog-post',
    title: 'Tesla Centre Gurugram Launch Catering, November 2025 | Virtuoso Catering House',
    description: content.blogPosts.find((p) => p.slug === 'tesla-centre-gurugram-launch-catering').excerpt,
    ogImage: content.blogPosts.find((p) => p.slug === 'tesla-centre-gurugram-launch-catering').image,
    post: content.blogPosts.find((p) => p.slug === 'tesla-centre-gurugram-launch-catering'),
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Journal', path: '/blog' }, { name: 'Tesla Centre Gurugram Launch Catering', path: '/blog/tesla-centre-gurugram-launch-catering' }]
  },
  blogFerrariTrackDay: {
    path: '/blog/ferrari-track-day-catering-buddh-international-circuit',
    view: 'blog-post',
    activePage: 'blog',
    bodyClass: 'page-blog-post',
    title: 'Ferrari Track Day Catering, Buddh International Circuit, April 2026 | Virtuoso Catering House',
    description: content.blogPosts.find((p) => p.slug === 'ferrari-track-day-catering-buddh-international-circuit').excerpt,
    ogImage: content.blogPosts.find((p) => p.slug === 'ferrari-track-day-catering-buddh-international-circuit').image,
    post: content.blogPosts.find((p) => p.slug === 'ferrari-track-day-catering-buddh-international-circuit'),
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Journal', path: '/blog' }, { name: 'Ferrari Track Day Catering', path: '/blog/ferrari-track-day-catering-buddh-international-circuit' }]
  },
  blogWeddingCateringGuide: {
    path: '/blog/how-to-plan-wedding-catering-delhi-ncr',
    view: 'blog-post',
    activePage: 'blog',
    bodyClass: 'page-blog-post',
    title: 'How to Plan Wedding Catering in Delhi NCR | Virtuoso Catering House',
    description: content.blogPosts.find((p) => p.slug === 'how-to-plan-wedding-catering-delhi-ncr').excerpt,
    ogImage: content.blogPosts.find((p) => p.slug === 'how-to-plan-wedding-catering-delhi-ncr').image,
    post: content.blogPosts.find((p) => p.slug === 'how-to-plan-wedding-catering-delhi-ncr'),
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Journal', path: '/blog' }, { name: 'How to Plan Wedding Catering in Delhi NCR', path: '/blog/how-to-plan-wedding-catering-delhi-ncr' }]
  },
  blogBathBodyWorks: {
    path: '/blog/bath-body-works-touch-of-gold-product-launch',
    view: 'blog-post',
    activePage: 'blog',
    bodyClass: 'page-blog-post',
    title: 'Bath & Body Works Touch of Gold Product Launch Catering, Noida | Virtuoso Catering House',
    description: content.blogPosts.find((p) => p.slug === 'bath-body-works-touch-of-gold-product-launch').excerpt,
    ogImage: content.blogPosts.find((p) => p.slug === 'bath-body-works-touch-of-gold-product-launch').image,
    post: content.blogPosts.find((p) => p.slug === 'bath-body-works-touch-of-gold-product-launch'),
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Journal', path: '/blog' }, { name: 'Bath & Body Works Touch of Gold Launch', path: '/blog/bath-body-works-touch-of-gold-product-launch' }]
  },
  blogMenuBuildingProcess: {
    path: '/blog/how-luxury-wedding-caterers-build-custom-menu',
    view: 'blog-post',
    activePage: 'blog',
    bodyClass: 'page-blog-post',
    title: 'How Luxury Wedding Caterers Build a Custom Menu | Virtuoso Catering House',
    description: content.blogPosts.find((p) => p.slug === 'how-luxury-wedding-caterers-build-custom-menu').excerpt,
    ogImage: content.blogPosts.find((p) => p.slug === 'how-luxury-wedding-caterers-build-custom-menu').image,
    post: content.blogPosts.find((p) => p.slug === 'how-luxury-wedding-caterers-build-custom-menu'),
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Journal', path: '/blog' }, { name: 'How Luxury Wedding Caterers Build a Custom Menu', path: '/blog/how-luxury-wedding-caterers-build-custom-menu' }]
  },
  press: {
    path: '/press',
    view: 'press',
    activePage: 'press',
    bodyClass: 'page-press',
    title: 'Press — Virtuoso Catering House',
    description: 'Press coverage and mentions of Virtuoso Catering House, a luxury experiential catering company based in Noida, Delhi NCR.',
    ogImage: content.heroImage,
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Press', path: '/press' }]
  }
};

module.exports = { siteUrl, business, pages };
