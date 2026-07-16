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
  // github.com/schemaorg/schemaorg/issues/1813). The LocalBusiness JSON-LD in
  // partials/head.ejs declares @type as ["LocalBusiness", "FoodEstablishment"]
  // rather than the more specific "Restaurant" subtype, since FoodEstablishment
  // itself doesn't imply dine-in service and is required for servesCuisine to
  // validate (servesCuisine isn't a valid property on plain LocalBusiness).
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
    title: 'Virtuoso Catering House — Luxury Catering, Delhi NCR',
    description: 'Virtuoso Catering House is a luxury experiential caterer in Noida, Delhi NCR, crafting bespoke F&B for weddings, brand activations, and private events.',
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
    title: 'Lamborghini Temerario Launch Catering | Virtuoso Catering House',
    description: 'Virtuoso Catering House designed the F&B experience for the Lamborghini Temerario launch in Delhi: a grazing table built for circulation, not congregation.',
    ogImage: content.blogPosts.find((p) => p.slug === 'what-we-did-for-the-launch-of-the-lamborghini-temerario').image,
    post: content.blogPosts.find((p) => p.slug === 'what-we-did-for-the-launch-of-the-lamborghini-temerario'),
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Journal', path: '/blog' }, { name: 'Lamborghini Temerario Launch Catering', path: '/blog/what-we-did-for-the-launch-of-the-lamborghini-temerario' }]
  },
  blogTeslaGurugram: {
    path: '/blog/tesla-centre-gurugram-launch-catering',
    view: 'blog-post',
    activePage: 'blog',
    bodyClass: 'page-blog-post',
    title: 'Tesla Centre Gurugram Launch Catering | Virtuoso Catering House',
    description: 'Virtuoso Catering House designed the F&B experience for the Tesla Centre Gurugram opening: clean, aesthetic food for a room where every guest is working.',
    ogImage: content.blogPosts.find((p) => p.slug === 'tesla-centre-gurugram-launch-catering').image,
    post: content.blogPosts.find((p) => p.slug === 'tesla-centre-gurugram-launch-catering'),
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Journal', path: '/blog' }, { name: 'Tesla Centre Gurugram Launch Catering', path: '/blog/tesla-centre-gurugram-launch-catering' }]
  },
  blogFerrariTrackDay: {
    path: '/blog/ferrari-track-day-catering-buddh-international-circuit',
    view: 'blog-post',
    activePage: 'blog',
    bodyClass: 'page-blog-post',
    title: 'Ferrari Track Day Catering, Buddh Circuit | Virtuoso Catering House',
    description: 'Virtuoso Catering House led hospitality for La Esperienza Ferrari Delhi, a 4-day Ferrari APAC track day at Buddh Circuit, with an exclusively Italian menu.',
    ogImage: content.blogPosts.find((p) => p.slug === 'ferrari-track-day-catering-buddh-international-circuit').image,
    post: content.blogPosts.find((p) => p.slug === 'ferrari-track-day-catering-buddh-international-circuit'),
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Journal', path: '/blog' }, { name: 'Ferrari Track Day Catering', path: '/blog/ferrari-track-day-catering-buddh-international-circuit' }]
  },
  blogWeddingCateringGuide: {
    path: '/blog/how-to-plan-wedding-catering-delhi-ncr',
    view: 'blog-post',
    activePage: 'blog',
    bodyClass: 'page-blog-post',
    title: 'Wedding Catering in Delhi NCR: A Guide | Virtuoso Catering House',
    description: 'Planning wedding catering in Delhi NCR comes down to three decisions: menu by function, a specialist caterer over a banquet, and a real tasting before signing.',
    ogImage: content.blogPosts.find((p) => p.slug === 'how-to-plan-wedding-catering-delhi-ncr').image,
    post: content.blogPosts.find((p) => p.slug === 'how-to-plan-wedding-catering-delhi-ncr'),
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Journal', path: '/blog' }, { name: 'How to Plan Wedding Catering in Delhi NCR', path: '/blog/how-to-plan-wedding-catering-delhi-ncr' }]
  },
  blogBathBodyWorks: {
    path: '/blog/bath-body-works-touch-of-gold-product-launch',
    view: 'blog-post',
    activePage: 'blog',
    bodyClass: 'page-blog-post',
    title: 'Bath & Body Works Touch of Gold Launch Catering | Virtuoso Catering House',
    description: 'Virtuoso Catering House designed the catering for Bath & Body Works’ Touch of Gold launch at Promenade Mall: a single all-gold grazing table and branded food.',
    ogImage: content.blogPosts.find((p) => p.slug === 'bath-body-works-touch-of-gold-product-launch').image,
    post: content.blogPosts.find((p) => p.slug === 'bath-body-works-touch-of-gold-product-launch'),
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Journal', path: '/blog' }, { name: 'Bath & Body Works Touch of Gold Launch', path: '/blog/bath-body-works-touch-of-gold-product-launch' }]
  },
  blogMenuBuildingProcess: {
    path: '/blog/how-luxury-wedding-caterers-build-custom-menu',
    view: 'blog-post',
    activePage: 'blog',
    bodyClass: 'page-blog-post',
    title: 'How Wedding Caterers Build a Custom Menu | Virtuoso Catering House',
    description: 'A luxury wedding caterer builds a custom menu in five stages, from a discovery conversation to a final chef trial before your wedding.',
    ogImage: content.blogPosts.find((p) => p.slug === 'how-luxury-wedding-caterers-build-custom-menu').image,
    post: content.blogPosts.find((p) => p.slug === 'how-luxury-wedding-caterers-build-custom-menu'),
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Journal', path: '/blog' }, { name: 'How Luxury Wedding Caterers Build a Custom Menu', path: '/blog/how-luxury-wedding-caterers-build-custom-menu' }]
  },
  blogPresentationMyths: {
    path: '/blog/does-wedding-presentation-need-big-budget',
    view: 'blog-post',
    activePage: 'blog',
    bodyClass: 'page-blog-post',
    title: 'Does Wedding Presentation Need a Big Budget? | Virtuoso Catering House',
    description: 'A stunning wedding presentation doesn’t require a big budget. It takes a trained team, proper workspace, and dishes rehearsed until nothing is left to chance.',
    ogImage: content.blogPosts.find((p) => p.slug === 'does-wedding-presentation-need-big-budget').image,
    post: content.blogPosts.find((p) => p.slug === 'does-wedding-presentation-need-big-budget'),
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Journal', path: '/blog' }, { name: 'Does a Stunning Wedding Presentation Need a Big Budget?', path: '/blog/does-wedding-presentation-need-big-budget' }]
  },
  blogTastingChefContinuity: {
    path: '/blog/is-your-tasting-chef-your-wedding-day-chef',
    view: 'blog-post',
    activePage: 'blog',
    bodyClass: 'page-blog-post',
    title: 'Is Your Tasting Chef Your Wedding-Day Chef? | Virtuoso Catering House',
    description: content.blogPosts.find((p) => p.slug === 'is-your-tasting-chef-your-wedding-day-chef').excerpt,
    ogImage: content.blogPosts.find((p) => p.slug === 'is-your-tasting-chef-your-wedding-day-chef').image,
    post: content.blogPosts.find((p) => p.slug === 'is-your-tasting-chef-your-wedding-day-chef'),
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Journal', path: '/blog' }, { name: 'Is Your Tasting Chef Your Wedding-Day Chef?', path: '/blog/is-your-tasting-chef-your-wedding-day-chef' }]
  },
  blogWeddingMenuBreakdown: {
    path: '/blog/wedding-catering-menu-in-delhi',
    view: 'blog-post',
    activePage: 'blog',
    bodyClass: 'page-blog-post',
    title: 'Wedding Catering Menu in Delhi: Dish Breakdown | Virtuoso Catering House',
    description: 'Wedding catering in Delhi spans three function-specific menus: lighter dishes at the mehendi, live counters at cocktail, fuller spread at reception.',
    ogImage: content.blogPosts.find((p) => p.slug === 'wedding-catering-menu-in-delhi').image,
    post: content.blogPosts.find((p) => p.slug === 'wedding-catering-menu-in-delhi'),
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Journal', path: '/blog' }, { name: 'What’s on a Wedding Catering Menu in Delhi?', path: '/blog/wedding-catering-menu-in-delhi' }]
  },
  blogCateringCost: {
    path: '/blog/luxury-catering-cost-delhi-ncr',
    view: 'blog-post',
    activePage: 'blog',
    bodyClass: 'page-blog-post',
    title: 'How Much Does Luxury Catering Cost in Delhi NCR? | Virtuoso Catering House',
    description: content.blogPosts.find((p) => p.slug === 'luxury-catering-cost-delhi-ncr').excerpt,
    ogImage: content.blogPosts.find((p) => p.slug === 'luxury-catering-cost-delhi-ncr').image,
    post: content.blogPosts.find((p) => p.slug === 'luxury-catering-cost-delhi-ncr'),
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Journal', path: '/blog' }, { name: 'How Much Does Luxury Catering Cost in Delhi NCR?', path: '/blog/luxury-catering-cost-delhi-ncr' }]
  },
  blogWeddingMenuDosDonts: {
    path: '/blog/dos-and-donts-finalizing-wedding-menu',
    view: 'blog-post',
    activePage: 'blog',
    bodyClass: 'page-blog-post',
    title: 'Do\'s and Don\'ts of Finalizing a Wedding Menu | Virtuoso Catering House',
    description: 'The right way to finalize a wedding menu starts with a conversation with your caterer, not a line item list. Here are the do\'s and don\'ts that help.',
    ogImage: content.blogPosts.find((p) => p.slug === 'dos-and-donts-finalizing-wedding-menu').image,
    post: content.blogPosts.find((p) => p.slug === 'dos-and-donts-finalizing-wedding-menu'),
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Journal', path: '/blog' }, { name: 'Do\'s and Don\'ts of Finalizing a Wedding Menu', path: '/blog/dos-and-donts-finalizing-wedding-menu' }]
  },
  blogParametersBeforeBooking: {
    path: '/blog/parameters-to-consider-before-booking-wedding-caterer',
    view: 'blog-post',
    activePage: 'blog',
    bodyClass: 'page-blog-post',
    title: 'Parameters to Consider Before Booking Your Wedding Caterer | Virtuoso Catering House',
    description: 'Before booking a wedding caterer, confirm FSSAI certification, an in-house execution team, and clarity on what\'s actually cooked in-house.',
    ogImage: content.blogPosts.find((p) => p.slug === 'parameters-to-consider-before-booking-wedding-caterer').image,
    post: content.blogPosts.find((p) => p.slug === 'parameters-to-consider-before-booking-wedding-caterer'),
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Journal', path: '/blog' }, { name: 'Parameters to Consider Before Booking Your Wedding Caterer', path: '/blog/parameters-to-consider-before-booking-wedding-caterer' }]
  },
  bestCaterersNoida: {
    path: '/best-caterers-in-noida-virtuoso-catering-house',
    view: 'blog-post',
    activePage: '',
    bodyClass: 'page-best-caterers-noida',
    title: 'Best Caterers in Noida | Virtuoso Catering House',
    description: 'Virtuoso Catering House is the best caterer in Noida, named one of Delhi NCR’s five leading luxury caterers by ANI News in March 2026.',
    ogImage: content.bestCaterersNoidaPage.image,
    post: content.bestCaterersNoidaPage,
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Who Are the Best Caterers in Noida?', path: '/best-caterers-in-noida-virtuoso-catering-house' }]
  },
  weddingCaterersDelhiNcr: {
    path: '/wedding-caterers-delhi-ncr',
    view: 'blog-post',
    activePage: '',
    bodyClass: 'page-wedding-caterers-delhi-ncr',
    title: 'Wedding Caterers in Delhi NCR | Virtuoso Catering House',
    description: content.weddingCaterersDelhiNcrPage.excerpt,
    ogImage: content.weddingCaterersDelhiNcrPage.image,
    post: content.weddingCaterersDelhiNcrPage,
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Wedding Caterers in Delhi NCR', path: '/wedding-caterers-delhi-ncr' }]
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
