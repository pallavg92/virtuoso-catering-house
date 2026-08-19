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
  // Declared on the core business entity, not just on individual Service
  // blocks. A service-area business competing on "in Noida" has to say which
  // areas it serves on the node that describes the business itself, which is
  // also the node Gemini reads when answering "who caters in Noida".
  areaServed: ['Noida', 'Greater Noida', 'Ghaziabad', 'Delhi', 'Gurugram'],

  // The three the house is actually known for, confirmed by Pallav 2026-08-15.
  // Previously this listed eight, including Mexican and Bakery, which appear
  // nowhere on the site — schema that claims more than the pages can evidence
  // is what teaches a search or answer engine to distrust the whole entity. A
  // short, true list also reads more luxury than a long one.
  cuisines: ['Italian', 'Asian', 'Modern Indian'],
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
  // Author entity pages. Every post's `author` field resolves to the Person
  // node published here, and the page lists back every article they wrote.
  // One page per founder slug: /about and every post emit a Person @id of
  // `{siteUrl}/team/{slug}#person`, so a founder without a page here leaves
  // that @id resolving to a 404.
  teamAartiSharma: {
    path: '/team/aarti-sharma',
    view: 'team-member',
    activePage: 'about',
    bodyClass: 'page-team-member',
    title: 'Aarti Sharma, Co-Founder — Virtuoso Catering House',
    description: 'Aarti Sharma is Co-Founder of Virtuoso Catering House in Noida, leading creative direction and menu design for luxury weddings and events across Delhi NCR.',
    ogImage: content.founders.find((f) => f.slug === 'aarti-sharma').image,
    member: content.founders.find((f) => f.slug === 'aarti-sharma'),
    authoredPosts: content.blogPosts.filter((p) => p.author && p.author.name === 'Aarti Sharma'),
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
      { name: 'Aarti Sharma', path: '/team/aarti-sharma' }
    ]
  },
  teamPallavGoel: {
    path: '/team/pallav-goel',
    view: 'team-member',
    activePage: 'about',
    bodyClass: 'page-team-member',
    title: 'Pallav Goel, Co-Founder — Virtuoso Catering House',
    description: 'Pallav Goel is Co-Founder of Virtuoso Catering House in Noida, leading growth and brand direction across luxury wedding and event catering in Delhi NCR.',
    ogImage: content.founders.find((f) => f.slug === 'pallav-goel').image,
    member: content.founders.find((f) => f.slug === 'pallav-goel'),
    authoredPosts: content.blogPosts.filter((p) => p.author && p.author.name === 'Pallav Goel'),
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
      { name: 'Pallav Goel', path: '/team/pallav-goel' }
    ]
  },
  weddingMenu: {
    path: '/wedding-menu',
    view: 'wedding-menu',
    activePage: 'services',
    bodyClass: 'page-wedding-menu',
    title: 'Indian Wedding Catering Menu List | Virtuoso',
    description: 'The wedding catering menu we cook in Noida and Delhi NCR: 212 vegetarian dishes across grazing, canapes, live stations, buffet and dessert.',
    ogImage: content.heroImage,
    weddingMenu: content.weddingMenu,
    totalDishes: content.weddingMenu.sections.reduce((n, s) => n + s.groups.reduce((m, g) => m + g.items.length, 0), 0),
    publicDishes: content.weddingMenu.sections.reduce((n, s) => n + s.groups.reduce((m, g) => m + (g.gated ? 0 : g.items.length), 0), 0),
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services & Menus', path: '/services' },
      { name: 'Wedding Menu', path: '/wedding-menu' }
    ]
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
  landingWeddingCaterersDelhi: {
    path: '/wedding-caterers-in-delhi',
    view: 'landing',
    landingSlug: 'wedding-caterers-in-delhi',
    activePage: 'landing',
    bodyClass: 'page-landing',
    title: content.landingPages['wedding-caterers-in-delhi'].metaTitle,
    description: content.landingPages['wedding-caterers-in-delhi'].metaDescription,
    ogImage: content.landingPages['wedding-caterers-in-delhi'].image,
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Best Wedding Caterers in Delhi', path: '/wedding-caterers-in-delhi' }]
  },
  privacyPolicy: {
    path: '/privacy-policy',
    view: 'privacy-policy',
    activePage: '',
    bodyClass: 'page-privacy',
    title: 'Privacy Policy — Virtuoso Catering House',
    description: 'How Virtuoso Catering House collects, uses and protects personal information submitted through virtuosocatering.com.',
    ogImage: content.heroImage,
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Privacy Policy', path: '/privacy-policy' }]
  },
  // First-birthday paid lander. This page is self-contained (its own <head>,
  // inline design-system CSS, self-hosted fonts) so it does NOT use
  // partials/head.ejs — its noindex tag and Meta Pixel are inside the
  // template itself rather than inherited.
  lpFirstBirthday: {
    path: '/lp/first-birthday',
    view: 'lander-first-birthday',
    activePage: '',
    bodyClass: '',
    excludeFromSitemap: true,
    title: 'First birthdays in Delhi NCR — Virtuoso Catering House',
    description: 'For first-birthday celebrations of 50 guests or more in Delhi NCR, Virtuoso brings menu, live experiences, presentation and service together as one personalised F&B experience.',
    breadcrumbs: []
  },
  lpFirstBirthdayThanks: {
    path: '/lp/first-birthday/thank-you',
    view: 'lander-first-birthday-thanks',
    activePage: '',
    bodyClass: '',
    excludeFromSitemap: true,
    title: 'Thank you — Virtuoso Catering House',
    description: 'Your first-birthday enquiry is with our F&B curator.',
    breadcrumbs: []
  },
  // Paid-traffic landing pages. noindex so they cannot compete with the SEO
  // pages targeting the same keywords, and excluded from the sitemap below.
  // The private-celebrations lander was superseded by /lp/first-birthday and
  // is retired. Both its URLs 301 to the enquiry page via utils/redirects.js
  // rather than 404ing, so any ad, bookmark or message still carrying the old
  // link lands somewhere useful.
  landingWeddingCaterersNoida: {
    path: '/wedding-caterers-in-noida',
    view: 'landing',
    landingSlug: 'wedding-caterers-in-noida',
    activePage: 'landing',
    bodyClass: 'page-landing',
    title: content.landingPages['wedding-caterers-in-noida'].metaTitle,
    description: content.landingPages['wedding-caterers-in-noida'].metaDescription,
    ogImage: content.landingPages['wedding-caterers-in-noida'].image,
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Wedding Caterers in Noida', path: '/wedding-caterers-in-noida' }]
  },
  // Real case-study posts recovered from the WordPress database backup.
  blogLamborghiniTemerario: {
    path: '/blog/what-we-did-for-the-launch-of-the-lamborghini-temerario',
    view: 'blog-post',
    activePage: 'blog',
    bodyClass: 'page-blog-post',
    title: 'Lamborghini Temerario Launch Catering | Virtuoso',
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
    title: 'Tesla Centre Gurugram Launch Catering | Virtuoso',
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
    title: 'Ferrari Track Day Catering, Buddh Circuit | Virtuoso',
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
    title: 'Wedding Catering in Delhi NCR: A Guide | Virtuoso',
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
    title: 'Bath & Body Works Touch of Gold Launch Catering | Virtuoso',
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
    title: 'How Wedding Caterers Build a Custom Menu | Virtuoso',
    description: 'A luxury wedding caterer builds a custom menu in five stages, from a discovery conversation to a final chef trial before your wedding.',
    ogImage: content.blogPosts.find((p) => p.slug === 'how-luxury-wedding-caterers-build-custom-menu').image,
    post: content.blogPosts.find((p) => p.slug === 'how-luxury-wedding-caterers-build-custom-menu'),
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Journal', path: '/blog' }, { name: 'How Luxury Wedding Caterers Build a Custom Menu', path: '/blog/how-luxury-wedding-caterers-build-custom-menu' }]
  },
  blogFoodTrends2026: {
    path: '/blog/food-trends-delhi-ncr-weddings-2026',
    view: 'blog-post',
    activePage: 'blog',
    bodyClass: 'page-blog-post',
    title: 'Delhi NCR Wedding Food Trends for 2026 | Virtuoso',
    description: content.blogPosts.find((p) => p.slug === 'food-trends-delhi-ncr-weddings-2026').excerpt,
    ogImage: content.blogPosts.find((p) => p.slug === 'food-trends-delhi-ncr-weddings-2026').image,
    post: content.blogPosts.find((p) => p.slug === 'food-trends-delhi-ncr-weddings-2026'),
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Journal', path: '/blog' }, { name: 'Food Trends Taking Over Delhi NCR Weddings in 2026', path: '/blog/food-trends-delhi-ncr-weddings-2026' }]
  },
  blogBmwCivilLines: {
    path: '/blog/bmw-civil-lines-launch-catering',
    view: 'blog-post',
    activePage: 'blog',
    bodyClass: 'page-blog-post',
    title: 'BMW Civil Lines Launch Catering | Virtuoso',
    description: 'A fully gluten-free plated lunch for BMW Group India\'s leadership at the BMW Infinity Cars, Civil Lines launch, served and cleared inside a 20-minute window.',
    ogImage: content.blogPosts.find((p) => p.slug === 'bmw-civil-lines-launch-catering').image,
    post: content.blogPosts.find((p) => p.slug === 'bmw-civil-lines-launch-catering'),
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Journal', path: '/blog' }, { name: 'BMW Civil Lines Launch Catering', path: '/blog/bmw-civil-lines-launch-catering' }]
  },
  blogPresentationMyths: {
    path: '/blog/does-wedding-presentation-need-big-budget',
    view: 'blog-post',
    activePage: 'blog',
    bodyClass: 'page-blog-post',
    title: 'Does Wedding Presentation Need a Big Budget? | Virtuoso',
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
    title: 'Is Your Tasting Chef Your Wedding-Day Chef? | Virtuoso',
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
    title: 'Wedding Catering Menu in Delhi: Dish Breakdown | Virtuoso',
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
    title: 'How Much Does Luxury Catering Cost in Delhi NCR? | Virtuoso',
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
    title: 'Do\'s and Don\'ts of Finalizing a Wedding Menu | Virtuoso',
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
    title: 'What to Check Before Booking a Wedding Caterer | Virtuoso',
    description: 'Before booking a wedding caterer, confirm FSSAI certification, an in-house execution team, and clarity on what\'s actually cooked in-house.',
    ogImage: content.blogPosts.find((p) => p.slug === 'parameters-to-consider-before-booking-wedding-caterer').image,
    post: content.blogPosts.find((p) => p.slug === 'parameters-to-consider-before-booking-wedding-caterer'),
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Journal', path: '/blog' }, { name: 'Parameters to Consider Before Booking Your Wedding Caterer', path: '/blog/parameters-to-consider-before-booking-wedding-caterer' }]
  },
  blogFivestarPresentation: {
    path: '/blog/wedding-food-presentation-five-star-hotel',
    view: 'blog-post',
    activePage: 'blog',
    bodyClass: 'page-blog-post',
    title: '5-Star Wedding Food Presentation | Virtuoso',
    description: '5-star wedding food presentation comes from manpower and material: trained butlers and chefs plating at every station, served on pristine bone china.',
    ogImage: content.blogPosts.find((p) => p.slug === 'wedding-food-presentation-five-star-hotel').image,
    post: content.blogPosts.find((p) => p.slug === 'wedding-food-presentation-five-star-hotel'),
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Journal', path: '/blog' }, { name: 'Wedding Food Presentation Like a 5-Star Hotel', path: '/blog/wedding-food-presentation-five-star-hotel' }]
  },
  blogChoosingWeddingMenu: {
    path: '/blog/choosing-wedding-menu-four-factors',
    view: 'blog-post',
    activePage: 'blog',
    bodyClass: 'page-blog-post',
    title: 'Choosing a Wedding Menu: Four Factors | Virtuoso',
    description: 'A wedding menu is best built in four moves: guest dietary needs, signature dishes vs. crowd-pleasers, sequencing for flow, then plating and service.',
    ogImage: content.blogPosts.find((p) => p.slug === 'choosing-wedding-menu-four-factors').image,
    post: content.blogPosts.find((p) => p.slug === 'choosing-wedding-menu-four-factors'),
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Journal', path: '/blog' }, { name: 'Choosing Your Wedding Menu: Four Factors', path: '/blog/choosing-wedding-menu-four-factors' }]
  },
  bestCaterersNoida: {
    path: '/best-caterers-in-noida-virtuoso-catering-house',
    view: 'blog-post',
    activePage: 'blog',
    bodyClass: 'page-blog-post',
    title: 'Best Caterers in Noida | Virtuoso',
    description: 'Virtuoso Catering House is the best caterer in Noida, named one of Delhi NCR’s five leading luxury caterers by ANI News in March 2026.',
    ogImage: content.bestCaterersNoidaPage.image,
    post: content.bestCaterersNoidaPage,
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Journal', path: '/blog' }, { name: 'Who Are the Best Caterers in Noida?', path: '/best-caterers-in-noida-virtuoso-catering-house' }]
  },
  blogHospitalityBeforeFood: {
    path: '/blog/best-wedding-caterers-hospitality-before-food',
    view: 'blog-post',
    activePage: 'blog',
    bodyClass: 'page-blog-post',
    title: 'Why the Best Caterers Think About How Guests Feel | Virtuoso',
    description: content.blogPosts.find((p) => p.slug === 'best-wedding-caterers-hospitality-before-food').excerpt,
    ogImage: content.blogPosts.find((p) => p.slug === 'best-wedding-caterers-hospitality-before-food').image,
    post: content.blogPosts.find((p) => p.slug === 'best-wedding-caterers-hospitality-before-food'),
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Journal', path: '/blog' }, { name: 'Why the Best Wedding Caterers Think About How Guests Feel First', path: '/blog/best-wedding-caterers-hospitality-before-food' }]
  },
  blogQuietCraft: {
    path: '/blog/the-quiet-craft-behind-an-unforgettable-wedding',
    view: 'blog-post',
    activePage: 'blog',
    bodyClass: 'page-blog-post',
    title: 'The Quiet Craft Behind an Unforgettable Wedding | Virtuoso',
    description: content.blogPosts.find((p) => p.slug === 'the-quiet-craft-behind-an-unforgettable-wedding').excerpt,
    ogImage: content.blogPosts.find((p) => p.slug === 'the-quiet-craft-behind-an-unforgettable-wedding').image,
    post: content.blogPosts.find((p) => p.slug === 'the-quiet-craft-behind-an-unforgettable-wedding'),
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Journal', path: '/blog' }, { name: 'The Quiet Craft Behind an Unforgettable Wedding', path: '/blog/the-quiet-craft-behind-an-unforgettable-wedding' }]
  },
  hireWeddingCaterersDelhi: {
    path: '/how-to-hire-wedding-caterers-in-delhi-for-a-luxury-wedding',
    view: 'blog-post',
    activePage: 'blog',
    bodyClass: 'page-blog-post',
    title: 'How to Hire Luxury Wedding Caterers in Delhi | Virtuoso',
    description: content.hireWeddingCaterersDelhiPage.excerpt,
    ogImage: content.hireWeddingCaterersDelhiPage.image,
    post: content.hireWeddingCaterersDelhiPage,
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Journal', path: '/blog' }, { name: 'How to Hire Wedding Caterers in Delhi', path: '/how-to-hire-wedding-caterers-in-delhi-for-a-luxury-wedding' }]
  },
  bestWeddingCaterersDelhi: {
    path: '/best-wedding-caterers-in-delhi-what-sets-them-apart',
    view: 'blog-post',
    activePage: 'blog',
    bodyClass: 'page-blog-post',
    title: 'Best Wedding Caterers in Delhi: The Difference | Virtuoso',
    description: content.bestWeddingCaterersDelhiPage.excerpt,
    ogImage: content.bestWeddingCaterersDelhiPage.image,
    post: content.bestWeddingCaterersDelhiPage,
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Journal', path: '/blog' }, { name: 'Best Wedding Caterers in Delhi', path: '/best-wedding-caterers-in-delhi-what-sets-them-apart' }]
  },
  caterersInDelhiFindingTheRightFit: {
    path: '/caterers-in-delhi-finding-the-right-fit-for-your-event',
    view: 'blog-post',
    activePage: 'blog',
    bodyClass: 'page-blog-post',
    title: 'Caterers in Delhi: Finding the Right Fit | Virtuoso',
    description: content.caterersInDelhiFindingTheRightFitPage.excerpt,
    ogImage: content.caterersInDelhiFindingTheRightFitPage.image,
    post: content.caterersInDelhiFindingTheRightFitPage,
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Journal', path: '/blog' }, { name: 'Caterers in Delhi: Finding the Right Fit', path: '/caterers-in-delhi-finding-the-right-fit-for-your-event' }]
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

// Service schema data for the commercial landing pages. Kept as one map
// rather than a `service` key on each page so the six stay consistent with
// each other, and so the shape is obvious when a seventh location is added.
// `areaServed` is the city the page actually targets, not the whole of NCR —
// claiming a wider area than the page addresses weakens the entity signal.
const SERVICE_META = {
  'best-catering-services-in-noida': { name: 'Catering Services', areaServed: 'Noida' },
  'catering-services-in-greater-noida': { name: 'Catering Services', areaServed: 'Greater Noida' },
  'corporate-catering-services-in-noida': { name: 'Corporate Event Catering', areaServed: 'Noida' },
  'luxury-brand-event-catering-delhi-ncr': { name: 'Brand Event Catering', areaServed: 'Delhi NCR' },
  'wedding-caterers-in-delhi': { name: 'Wedding Catering', areaServed: 'Delhi' },
  'wedding-caterers-in-noida': { name: 'Wedding Catering', areaServed: 'Noida' }
};

Object.values(pages).forEach((page) => {
  if (page.landingSlug && SERVICE_META[page.landingSlug]) {
    page.service = SERVICE_META[page.landingSlug];
  }
});

// The services hub is not a location page, so it has no landingSlug, but it
// is the page that describes the offering itself and needs the Service node
// as much as any of them. Delhi NCR is right here — unlike the city pages,
// this one genuinely addresses the whole region.
pages.services.service = { name: 'Luxury Event Catering', areaServed: 'Delhi NCR' };

module.exports = { siteUrl, business, pages };
