// Centralized placeholder content for Virtuoso Catering House.
// Images are sourced from picsum.photos (seeded, so they stay stable across reloads).
const img = (seed, w = 1600, h = 2000) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

const services = [
  {
    slug: 'weddings',
    title: 'Weddings',
    kicker: '01',
    copy: 'From the first toast to the last dance, every course is choreographed to the rhythm of your day — plated with restraint, seasoned with sentiment.',
    image: img('mv-wedding-table', 1400, 1800)
  },
  {
    slug: 'brand-activations',
    title: 'Brand Activations',
    kicker: '02',
    copy: 'Product launches, brand experiences, and press previews — for names that never compromise on how a room feels. We design the food and beverage language around the story being told.',
    image: img('mv-brand-activation', 1400, 1800)
  },
  {
    slug: 'private-dining',
    title: 'Private Dining',
    kicker: '03',
    copy: 'An intimate table, a chef in your kitchen, a menu written for no one else. Private dining the way it was meant to feel — unhurried.',
    image: img('mv-private-dining', 1400, 1800)
  },
  {
    slug: 'bespoke',
    title: 'Bespoke Menus',
    kicker: '04',
    copy: 'Every menu begins as a conversation. We build tasting notes around memory, provenance, and the story you want your guests to leave with.',
    image: img('mv-bespoke-menu', 1400, 1800)
  }
];

// Replace [second-account-handle] once the second Instagram account is confirmed.
const instagramAccounts = [
  {
    handle: '@virtuosocateringhouse',
    url: 'https://www.instagram.com/virtuosocateringhouse/',
    label: 'Virtuoso Catering House',
    description: 'Events, menus, and behind-the-scenes from the Virtuoso team.',
    embedUrl: 'https://snapwidget.com/embed/1126703'
  },
  {
    handle: '[@second-account-handle]',
    url: '#',
    label: '[Second Account Name]',
    description: '[Add a description once this account is confirmed.]',
    embedUrl: null
  }
];

// Placeholder case studies — replace with real work write-ups (blog-format) as they're published.
const ourWork = [
  { slug: 'ferrari-apac-launch', title: 'Ferrari APAC — Product Launch Experience', image: img('mv-work-1', 1200, 1500) },
  { slug: 'aravalli-wedding', title: 'A Wedding in the Aravalli Hills', image: img('mv-work-2', 1200, 1500) },
  { slug: 'lamborghini-activation', title: 'Lamborghini Delhi — Brand Activation Dinner', image: img('mv-work-3', 1200, 1500) },
  { slug: 'masaba-afterparty', title: 'House of Masaba — Runway After-Party', image: img('mv-work-4', 1200, 1500) },
  { slug: 'private-anniversary', title: 'A Private Anniversary, Six Guests, One Table', image: img('mv-work-5', 1200, 1500) }
];

// Placeholder blog posts — replace with real posts as they're written.
const blogPosts = [
  {
    slug: 'wedding-menu-around-a-love-story',
    title: 'Designing a Wedding Menu Around a Love Story',
    excerpt: 'How we translate a couple’s history — where they met, what they cook together — into a tasting menu that feels personal rather than performed.',
    date: '2026-05-14',
    image: img('mv-blog-1', 1200, 800)
  },
  {
    slug: 'what-a-launch-dinner-requires',
    title: 'What a Product Launch Dinner Actually Requires',
    excerpt: 'Notes from the field on pacing a room, briefing a brand team, and building a menu that supports the story on stage instead of competing with it.',
    date: '2026-04-02',
    image: img('mv-blog-2', 1200, 800)
  },
  {
    slug: 'plating-for-camera-vs-guest',
    title: 'Plating for the Camera vs. Plating for the Guest',
    excerpt: 'A dish built for a photograph and a dish built to be eaten are not always the same thing. Here is how we design for both.',
    date: '2026-02-19',
    image: img('mv-blog-3', 1200, 800)
  }
];

const brandQuote = 'We believe true luxury lives in restraint — in every detail considered, every moment beautiful, and every experience built to be remembered.';

const testimonials = [
  {
    quote: 'They did not just cater our wedding — they translated us into an experience. Guests are still talking about it months later.',
    name: 'Ananya Kapoor',
    role: 'Private Wedding, Udaipur'
  },
  {
    quote: 'Impeccable timing, impeccable execution, and a team that disappeared into the background exactly when they should have.',
    name: 'Rohan Mehta',
    role: 'Brand Experience Lead'
  },
  {
    quote: 'Working with Virtuoso on our launch felt less like hiring caterers and more like adding a creative partner to the room.',
    name: 'Ishita Sen',
    role: 'Founder, House of Sen'
  },
  {
    quote: 'A dinner that felt like it was designed for exactly the six of us, because it was. That is the whole difference.',
    name: 'Vikram Malhotra',
    role: 'Private Client, Delhi NCR'
  }
];

// How Virtuoso works, from first brief to the final day of service.
const process = [
  { step: '01', title: 'The Brief', copy: 'Every project begins with a conversation — your event, your guests, the story you want told. We listen before we plan.' },
  { step: '02', title: 'Concept & Tasting', copy: 'We design a menu and experience concept, then invite you to taste it — refining flavor, pacing, and presentation until it is exactly right.' },
  { step: '03', title: 'Design & Rehearsal', copy: 'Service choreography, styling, and staffing are mapped in detail, so nothing on the day is left to chance.' },
  { step: '04', title: 'The Final Day', copy: 'We execute — quietly, precisely, and completely present, so you experience the event as a guest, not a host.' }
];

const founders = [
  {
    name: 'Aarti Sharma',
    role: 'Co-Founder',
    bio: 'Aarti builds luxury catering experiences that sit at the intersection of experiential F&B, beverage innovation, and large-scale event production — from live experiential stations and mixology concepts to refined plated dining and immersive guest journeys. Her work spans premium weddings, brand launches, and high-profile corporate experiences. Every detail — presentation, pacing, pour — is designed to feel seamless, memorable, and deeply intentional.',
    image: img('mv-founder-aarti', 1300, 1600)
  },
  {
    name: 'Pallav Goel',
    role: 'Co-Founder',
    bio: 'Pallav leads Virtuoso’s growth, strategy, and brand direction — deciding which clients the house takes on and what standard it holds itself to. His focus is building Virtuoso into the definitive name in luxury experiential catering across India, from automotive launches to fashion activations to premium private events across Delhi NCR and beyond.',
    image: img('mv-founder-pallav', 1300, 1600)
  }
];

const menu = {
  categories: [
    {
      slug: 'plated-dinners',
      label: 'Plated Dinners',
      items: [
        { name: 'Charred Octopus, Nduja, Blood Orange', desc: 'Applewood-charred octopus, whipped potato, blood orange gastrique.', tags: ['GF'] },
        { name: 'Saffron Risotto, Langoustine, Sea Fennel', desc: 'Carnaroli rice, Spanish saffron, butter-poached langoustine.', tags: ['GF'] },
        { name: 'Dry-Aged Duck Breast, Cherry, Smoked Honey', desc: 'Forty-day dry-aged duck, sour cherry jus, smoked wildflower honey.', tags: [] },
        { name: 'Roasted Cauliflower Steak, Romesco, Almond', desc: 'Whole roasted cauliflower, smoked romesco, marcona almond.', tags: ['V', 'GF'] },
        { name: 'Wagyu Striploin, Bone Marrow Jus, Charred Leek', desc: 'A5 striploin, roasted bone marrow, charred leek ash.', tags: ['GF'] }
      ]
    },
    {
      slug: 'buffet',
      label: 'Buffet',
      items: [
        { name: 'Heirloom Tomato & Stracciatella Board', desc: 'Market heirlooms, fresh stracciatella, aged balsamic, basil oil.', tags: ['V', 'GF'] },
        { name: 'Slow-Roasted Porchetta Station', desc: 'Herb-stuffed porchetta carved to order, salsa verde, soft rolls.', tags: [] },
        { name: 'Charred Corn & Cotija Salad', desc: 'Fire-roasted corn, cotija, lime crema, chili threads.', tags: ['V', 'GF'] },
        { name: 'Wild Mushroom & Farro Grain Bowl', desc: 'Toasted farro, roasted wild mushroom, pecorino, thyme.', tags: ['V'] },
        { name: 'Whole Roasted Branzino Station', desc: 'Mediterranean branzino, citrus fennel salad, herb oil.', tags: ['GF', 'DF'] }
      ]
    },
    {
      slug: 'canapes',
      label: 'Canapés',
      items: [
        { name: 'Smoked Trout, Rye, Crème Fraîche', desc: 'House-smoked trout, dark rye crisp, dill crème fraîche.', tags: [] },
        { name: 'Wagyu Tartare, Quail Yolk, Brioche', desc: 'Hand-cut wagyu tartare, quail egg yolk, toasted brioche.', tags: [] },
        { name: 'Heirloom Beet, Whipped Goat Cheese', desc: 'Roasted heirloom beet, whipped chèvre, candied pistachio.', tags: ['V', 'GF'] },
        { name: 'Uni Toast, Yuzu Kosho, Chive', desc: 'Sea urchin, brown butter brioche, yuzu kosho.', tags: [] },
        { name: 'Charred Shishito, Miso Aioli', desc: 'Blistered shishito peppers, sweet miso aioli.', tags: ['V', 'DF'] }
      ]
    },
    {
      slug: 'bar-service',
      label: 'Bar Service',
      items: [
        { name: 'Full Bar Program', desc: 'Custom cocktail menu development, premium spirits, glassware included.', tags: [] },
        { name: 'Champagne & Coupe Service', desc: 'Passed champagne service with vintage coupe glassware.', tags: [] },
        { name: 'Signature Cocktail Pairing', desc: 'Two bespoke cocktails designed around your tasting menu.', tags: [] },
        { name: 'Wine Pairing Program', desc: 'Sommelier-curated pairings by course, boutique and reserve selections.', tags: [] },
        { name: 'Non-Alcoholic Pairing Menu', desc: 'House-made shrubs, botanical infusions, zero-proof pairings.', tags: ['DF'] }
      ]
    },
    {
      slug: 'desserts',
      label: 'Desserts',
      items: [
        { name: 'Burnt Basque Cheesecake, Fig Leaf Oil', desc: 'Caramelized crust, silken center, fig leaf oil.', tags: ['GF'] },
        { name: 'Dark Chocolate Delice, Sea Salt', desc: 'Valrhona dark chocolate, olive oil, Maldon salt.', tags: ['GF'] },
        { name: 'Citrus Olive Oil Cake, Mascarpone', desc: 'Blood orange, extra virgin olive oil, whipped mascarpone.', tags: [] },
        { name: 'Petit Four Selection', desc: 'A rotating selection of five hand-finished petit fours.', tags: ['V'] },
        { name: 'Stone Fruit Tart, Almond Frangipane', desc: 'Seasonal stone fruit, almond frangipane, shortcrust.', tags: ['V'] }
      ]
    }
  ]
};

const eventTypes = ['Wedding', 'Private', 'Brand', 'Other'];

module.exports = {
  services,
  instagramAccounts,
  ourWork,
  blogPosts,
  brandQuote,
  testimonials,
  process,
  founders,
  menu,
  eventTypes,
  heroImage: '/images/hero-candlelit-florals.jpg',
  aboutHeroImage: img('mv-about-hero', 2400, 1400),
  contactOfficeImage: img('mv-office', 1400, 1700)
};
