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
    slug: 'corporate',
    title: 'Corporate Events',
    kicker: '02',
    copy: 'Boardroom breakfasts to gala dinners for five hundred — precision service that reflects the standard your brand keeps everywhere else.',
    image: img('mv-corporate-gala', 1400, 1800)
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

const gallery = [
  { id: 1, category: 'weddings', caption: 'A coastal reception, plated in the last light.', image: img('mv-gal-1', 1200, 1500) },
  { id: 2, category: 'corporate', caption: 'Product launch dinner for a design house, 180 covers.', image: img('mv-gal-2', 1400, 1000) },
  { id: 3, category: 'private-dining', caption: 'Seven courses, one table, a birthday for two.', image: img('mv-gal-3', 1200, 1600) },
  { id: 4, category: 'weddings', caption: 'Late summer, olive groves, hand-torn burrata.', image: img('mv-gal-4', 1400, 1000) },
  { id: 5, category: 'canapes', caption: 'Passed hors d’oeuvres for a rooftop opening.', image: img('mv-gal-5', 1200, 1500) },
  { id: 6, category: 'corporate', caption: 'A quiet boardroom breakfast before the keynote.', image: img('mv-gal-6', 1400, 1000) },
  { id: 7, category: 'weddings', caption: 'The cake cut just after midnight.', image: img('mv-gal-7', 1200, 1600) },
  { id: 8, category: 'private-dining', caption: 'Wine pairing dinner, six guests, cellar table.', image: img('mv-gal-8', 1400, 1000) },
  { id: 9, category: 'canapes', caption: 'Bite-sized courses for a gallery opening.', image: img('mv-gal-9', 1200, 1500) },
  { id: 10, category: 'desserts', caption: 'A dessert course built like a still life.', image: img('mv-gal-10', 1200, 1600) },
  { id: 11, category: 'corporate', caption: 'An anniversary dinner for four hundred employees.', image: img('mv-gal-11', 1400, 1000) },
  { id: 12, category: 'desserts', caption: 'Petit fours, plated at the pass.', image: img('mv-gal-12', 1200, 1500) }
];

const signatureDishes = [
  { title: 'Charred Octopus, Nduja, Blood Orange', image: img('mv-dish-1', 1200, 1500) },
  { title: 'Hand-Rolled Cacio e Pepe, Aged Reserve', image: img('mv-dish-2', 1200, 1500) },
  { title: 'Dry-Aged Duck Breast, Cherry, Smoked Honey', image: img('mv-dish-3', 1200, 1500) },
  { title: 'Burnt Basque Cheesecake, Fig Leaf Oil', image: img('mv-dish-4', 1200, 1500) },
  { title: 'Heirloom Tomato, Stracciatella, Basil Oil', image: img('mv-dish-5', 1200, 1500) },
  { title: 'Saffron Risotto, Langoustine, Sea Fennel', image: img('mv-dish-6', 1200, 1500) }
];

const stats = [
  { value: 18, suffix: '+', label: 'Years in Service' },
  { value: 1240, suffix: '', label: 'Events Catered' },
  { value: 12, suffix: '', label: 'Culinary Awards' },
  { value: 96, suffix: '%', label: 'Client Referral Rate' }
];

const testimonials = [
  {
    quote: 'They did not just cater our wedding — they translated us into a menu. Guests are still talking about the burnt honey course.',
    name: 'Elena & Marcus',
    role: 'Private Wedding, Sonoma'
  },
  {
    quote: 'Impeccable timing, impeccable plating, and a team that disappeared into the background exactly when they should have.',
    name: 'Priya Raman',
    role: 'Head of Events, Solstice Capital'
  },
  {
    quote: 'We have used four catering houses over the years. Virtuoso Catering House is the only one we have never had to give notes to.',
    name: 'Julian Ferro',
    role: 'Founder, Ferro & Related'
  },
  {
    quote: 'A tasting menu that felt like it was written for exactly six people, because it was. That is the whole difference.',
    name: 'Naomi Osei',
    role: 'Private Client'
  }
];

const team = [
  { name: 'Adrienne Laurent', role: 'Executive Chef & Founder', image: img('mv-team-1', 900, 1100) },
  { name: 'Kofi Mensah', role: 'Culinary Director', image: img('mv-team-2', 900, 1100) },
  { name: 'Simone Vasquez', role: 'Head of Events', image: img('mv-team-3', 900, 1100) },
  { name: 'Theo Bianchi', role: 'Pastry Chef', image: img('mv-team-4', 900, 1100) },
  { name: 'Margaux Ferreira', role: 'Sommelier & Bar Director', image: img('mv-team-5', 900, 1100) },
  { name: 'Idris Whitfield', role: 'Operations Director', image: img('mv-team-6', 900, 1100) }
];

const timeline = [
  { year: '2008', title: 'A Kitchen of Three', copy: 'Adrienne Laurent begins cooking private dinners out of a rented commercial kitchen in the Mission.' },
  { year: '2012', title: 'First Wedding Season', copy: 'Virtuoso Catering House caters its first full wedding season — eleven events, one small van, no days off.' },
  { year: '2016', title: 'The Atelier Opens', copy: 'A dedicated culinary atelier and tasting room opens, built for menu development and private tastings.' },
  { year: '2019', title: 'National Recognition', copy: 'Named among the country’s leading event caterers by a national culinary guild.' },
  { year: '2022', title: 'Bespoke Division Launches', copy: 'A dedicated bespoke-menu division is formed to serve private clients and small-format dinners.' },
  { year: '2026', title: 'Eighteen Years On', copy: 'Now a team of forty, still tasting every dish before it leaves the kitchen.' }
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

const eventTypes = [
  'Wedding',
  'Corporate Event',
  'Private Dining',
  'Bespoke Menu / Other'
];

module.exports = {
  services,
  gallery,
  signatureDishes,
  stats,
  testimonials,
  team,
  timeline,
  menu,
  eventTypes,
  heroImage: img('mv-hero', 2400, 1500),
  aboutHeroImage: img('mv-about-hero', 2400, 1400),
  founderImage: img('mv-founder', 1300, 1600),
  contactOfficeImage: img('mv-office', 1400, 1700)
};
