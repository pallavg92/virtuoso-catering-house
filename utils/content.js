// Centralized placeholder content for Virtuoso Catering House.
// Images are sourced from picsum.photos (seeded, so they stay stable across reloads).
const img = (seed, w = 1600, h = 2000) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

const services = [
  {
    slug: 'weddings',
    title: 'Weddings',
    kicker: '01',
    copy: 'From the first toast to the last dance, every course is choreographed to the rhythm of your day — plated with restraint, seasoned with sentiment.',
    image: '/images/virtuoso-catering-house-weddings-service.jpg'
  },
  {
    slug: 'brand-activations',
    title: 'Brand Activations',
    kicker: '02',
    copy: 'Product launches, brand experiences, and press previews — for names that never compromise on how a room feels. We design the food and beverage language around the story being told.',
    image: '/images/virtuoso-catering-house-brand-activations-service.jpg'
  },
  {
    slug: 'mixology',
    title: 'Mixology',
    kicker: '03',
    copy: 'Live mixology stations and batch-crafted cocktail programs, built to move at the pace of the room — from a signature welcome pour to a full bar designed around your menu.',
    image: '/images/virtuoso-catering-house-mixology-service.jpg'
  },
  {
    slug: 'bespoke',
    title: 'Bespoke Menus',
    kicker: '04',
    copy: 'Every menu begins as a conversation. We build tasting notes around memory, provenance, and the story you want your guests to leave with.',
    image: '/images/virtuoso-catering-house-bespoke-menus-service.jpg'
  }
];

const instagramAccounts = [
  {
    handle: '@virtuosocateringhouse',
    url: 'https://www.instagram.com/virtuosocateringhouse/',
    label: 'Virtuoso Catering House',
    description: 'Events, menus, and behind-the-scenes from the Virtuoso team.',
    embedUrl: 'https://snapwidget.com/embed/1126703'
  },
  {
    handle: '@thefirstpourbyvirtuoso',
    url: 'https://www.instagram.com/thefirstpourbyvirtuoso/',
    label: 'The First Pōur By Virtuoso',
    description: 'Cocktail programs, bar service, and beverage craft from the Virtuoso bar team.',
    embedUrl: 'https://snapwidget.com/embed/1126761'
  }
];

// Placeholder case studies — replace with real work write-ups (blog-format) as they're published.
const ourWork = [
  {
    title: 'Lamborghini Temerario — Product Launch',
    image: '/images/lamborghini-temerario-hero.jpg',
    link: '/blog/what-we-did-for-the-launch-of-the-lamborghini-temerario'
  },
  {
    title: 'Tesla Centre Gurugram — Grand Opening',
    image: '/images/virtuoso-catering-house-tesla-centre-gurugram-exterior-2025.jpg',
    link: '/blog/tesla-centre-gurugram-launch-catering'
  },
  {
    title: 'Ferrari Track Day — Buddh International Circuit',
    image: '/images/virtuoso-catering-house-esperienza-ferrari-buddh-circuit-2026.jpg',
    link: '/blog/ferrari-track-day-catering-buddh-international-circuit'
  },
  {
    title: 'A Wedding Reception',
    image: '/images/virtuoso-catering-house-weddings-service.jpg',
    link: '/blog/how-to-plan-wedding-catering-delhi-ncr'
  }
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
  },
  {
    slug: 'what-we-did-for-the-launch-of-the-lamborghini-temerario',
    url: '/blog/what-we-did-for-the-launch-of-the-lamborghini-temerario',
    title: 'How We Designed an F&B Experience That Felt Like the Car',
    excerpt: 'Virtuoso Catering House designed and executed the complete hospitality experience for the Delhi launch of the Lamborghini Temerario, a grazing table built for circulation, not congregation.',
    date: '2026-05-22',
    image: '/images/lamborghini-temerario-hero.jpg',
    relatedLink: { path: '/luxury-brand-event-catering-delhi-ncr', label: 'See how we approach luxury brand event catering across Delhi NCR' },
    lead: [
      'Virtuoso Catering House designed and executed the complete hospitality experience for the Delhi launch of the Lamborghini Temerario at Lamborghini Delhi, Sarita Vihar, on April 30, 2025. The event hosted 100 UHNI guests including automotive media and senior Lamborghini clientele. The brief was precise: the food and beverage experience should feel like the car. That brief took three weeks to translate into a concept.'
    ],
    sections: [
      {
        heading: 'The Brief',
        paragraphs: [
          'Lamborghini’s design language for the Temerario is built around movement, precision, and the absence of excess. Our brief was not to feed guests. It was to support a narrative. Every F&B decision we made was tested against one question: does this interrupt the car, or does it belong to it? The answer shaped everything from the table format to the service timing to the colour of the mocktail.'
        ],
        pullQuote: 'Does this interrupt the car, or does it belong to it?'
      },
      {
        heading: 'The Concept',
        paragraphs: [
          'We anchored the experience around a single grazing table designed for circulation rather than congregation. The logic was spatial: a seated format would have broken the flow of 100 guests moving around the car across the Lamborghini Delhi showroom floor. A grazing table with clear sightlines to the Temerario let hospitality disappear into the background while remaining present.',
          'The table featured imported cheeses, exotic cut fruits, mousse eggs, and refined Mediterranean nibblers. Nothing required instruction. Nothing required a plate. Guests could engage with the food and return to the car without interruption.',
          'For beverages, we introduced a purple-themed sparkling mocktail aligned with the Temerario’s colour language. This was a deliberate visual decision. When a guest holds the drink, the colour reads as part of the room. That continuity is what makes hospitality feel designed rather than catered.'
        ],
        image: {
          src: '/images/lamborghini-temerario-grazing-table.jpg',
          caption: 'The grazing table, staged beneath the Lamborghini crest, built for circulation, not congregation.'
        }
      },
      {
        heading: 'The Execution',
        paragraphs: [
          'As UHNI guests and media arrived at Lamborghini Delhi on Mathura Road, they were welcomed immediately at the grazing table. We rotated sushi and delicate nibblers sparingly through the evening, timed to guest movement rather than a fixed kitchen schedule. The goal was that the food appeared when guests were ready for it.',
          'Managing hospitality flow for 100 guests in a showroom environment requires a specific back-of-house rotation that most boutique caterers skip. The service team was briefed to move with the room, not against it. No hovering. No interruption. Presence without intrusion.',
          'The evening concluded with guests leaving with quiet comfort rather than a sense of excess. That outcome requires restraint at every decision point: portion sizing, service timing, and how staff move through a luxury space.'
        ],
        images: [
          { src: '/images/lamborghini-temerario-canapes.jpg', caption: 'Mousse eggs, finished in the Temerario’s purple.' },
          { src: '/images/lamborghini-temerario-sushi.jpg', caption: 'Sushi, rotated sparingly through the evening.' }
        ]
      },
      {
        heading: 'Why Brand Activation Catering Is Different',
        paragraphs: [
          'Luxury brand activation catering requires a fundamentally different approach from wedding catering. At a wedding, the food is part of the celebration. At a brand launch, the food must be invisible enough to support the product narrative while being distinctive enough to reflect the brand’s values. Most caterers default to wedding-format thinking for brand events. That is the gap Virtuoso Catering House was built to fill.',
          'We work with luxury automotive, fashion, and retail brands across Delhi NCR to design F&B experiences where hospitality serves the brand story, not the other way around. Previous automotive work includes catering for La Esperienza Ferrari Delhi by Ferrari APAC and BMW dealer events across Delhi NCR.'
        ]
      }
    ],
    faq: [
      { q: 'What type of catering did Virtuoso Catering House provide for the Lamborghini Temerario launch?', a: 'Virtuoso Catering House designed and executed the complete F&B experience for the Lamborghini Temerario Delhi launch at Lamborghini Delhi, Sarita Vihar on April 30, 2025. This included a bespoke grazing concept, a branded purple mocktail aligned with the car’s colour language, and timed canapé rotation for 100 UHNI guests and automotive media.' },
      { q: 'How does Virtuoso approach catering for luxury automotive brand events?', a: 'Every automotive brief starts with the brand’s design language, not a standard menu. We develop F&B concepts where the food, beverage format, and service choreography reflect the aesthetic of the car or brand being launched. For the Temerario, that meant movement, precision, and restraint across every element.' },
      { q: 'What is the difference between brand activation catering and wedding catering?', a: 'At a wedding, the F&B is central to the celebration. At a brand activation, the F&B must support the product narrative without competing with it. The two require different spatial logic, service timing, and presentation philosophy. Virtuoso was built specifically to serve both formats at the luxury tier.' },
      { q: 'Does Virtuoso Catering House work with other luxury automotive brands?', a: 'Yes. In addition to Lamborghini, Virtuoso has catered for Ferrari APAC and BMW dealer events across Delhi NCR. We work with luxury automotive clients where the F&B brief requires concept-level thinking, not standard catering packages.' },
      { q: 'How far in advance should a luxury brand book Virtuoso for a vehicle launch event?', a: 'For brand launches and automotive activations, we recommend a minimum of six to eight weeks. This allows time to develop a concept genuinely aligned with the brand’s identity rather than adapting an existing format. The Lamborghini Temerario brief required three weeks of concept development before a single menu item was confirmed.' }
    ],
    author: {
      name: 'Pallav Goel',
      linkedin: 'https://www.linkedin.com/in/pallavg16',
      bio: 'Pallav Goel is the Co-Founder of Virtuoso Catering House. He leads the overall growth, strategy, and business direction of Virtuoso, setting the standards for which clients the company works with and how the brand positions itself in the luxury events market.'
    }
  },
  {
    slug: 'tesla-centre-gurugram-launch-catering',
    url: '/blog/tesla-centre-gurugram-launch-catering',
    title: 'Serving 150 Senior Journalists and HNI Guests at India’s First All-in-One Tesla Facility',
    excerpt: 'Virtuoso Catering House designed and executed the complete F&B experience for the opening of Tesla Centre Gurugram, with clean, aesthetic food built for a room where every guest is working.',
    date: '2026-05-23',
    image: '/images/virtuoso-catering-house-tesla-centre-gurugram-exterior-2025.jpg',
    relatedLink: { path: '/luxury-brand-event-catering-delhi-ncr', label: 'See how we approach luxury brand event catering across Delhi NCR' },
    lead: [
      'Virtuoso Catering House designed and executed the complete F&B experience for the opening of Tesla Centre Gurugram at Orchid Business Park, Badshahpur Sohna Road, Gurugram in November 2025. The event hosted 150 guests including senior automotive journalists, PR professionals, and HNI clients. The brief was precise: clean, aesthetic food that works in a busy, high-energy environment where guests are moving, networking, and experiencing the space simultaneously.'
    ],
    sections: [
      {
        heading: 'The Brief',
        paragraphs: [
          'Tesla’s design language is built around minimalism, precision, and the absence of clutter. The guest profile made the brief more specific. Senior journalists and PR professionals at a high-profile launch are working while they eat. They are talking, photographing, networking, and forming opinions simultaneously.',
          'The food needed to be easy to consume standing up, visually clean enough to not distract from the space, and distinctive enough to reflect the premium nature of the occasion. We do not use a standard menu for brand events. Every menu starts with the brief, not the other way around.'
        ],
        image: {
          src: '/images/virtuoso-catering-house-tesla-india-showroom-gurugram-2025.jpg',
          caption: 'The showroom floor guests moved through all evening, food rotating around them rather than the other way around.'
        }
      },
      {
        heading: 'The Concept',
        paragraphs: [
          'The Tesla space itself shaped the service format. It is a large open plan facility designed for movement and exploration. A conventional catering setup with fixed stations would have created congregation points that interrupted the guest flow around the cars. We decided against any fixed station format entirely and instead moved food through the room on a timed rotation. That decision sounds simple. It required twice the staffing and three times the logistics planning of a standard setup.',
          'We developed a menu built around quick bites that photograph well and eat cleanly in a standing format. The selection included Thai curry, chipotle bowls, a curated assortment of canapés, and a mocktail program designed to complement the food without overwhelming it.',
          'Every item on the menu went through a formal trial process before the event. The criteria for approval: it had to look aesthetic on a plate and taste good eaten quickly in a busy room. Several items that tasted excellent were adjusted for presentation before approval. That trial process is not optional for us. It is how we ensure the menu we design in a kitchen translates correctly to a live event environment.'
        ],
        pullQuote: 'That decision sounds simple. It required twice the staffing and three times the logistics planning of a standard setup.',
        image: {
          src: '/images/virtuoso-catering-house-live-cooking-station-tesla-centre-gurugram-2025-1.jpg',
          caption: 'Chefs plating live at the counter, timed to the rhythm of the room, not a fixed kitchen schedule.'
        }
      },
      {
        heading: 'The Execution',
        paragraphs: [
          'Tesla Centre Gurugram is a large format space combining retail, service, and charging infrastructure. Managing F&B for 150 guests across that kind of environment requires a specific approach to placement and replenishment. No food stations were positioned, as the aim was to support guest flow rather than interrupt it, ensuring hospitality was present throughout the space without creating bottlenecks.',
          'Service timing was calibrated to the event rhythm. As journalists moved through the facility and experienced the cars, food was prepared and rotated to ensure freshness throughout. Nothing sat. Nothing ran out at the wrong moment. The result was a hospitality experience that felt effortless because the planning behind it was not.'
        ],
        images: [
          { src: '/images/virtuoso-catering-house-behind-the-scenes-tesla-centre-gurugram-2025.jpg', caption: 'The team before doors opened, skewers staged and ready for the first rotation.' },
          { src: '/images/virtuoso-catering-house-canape-tesla-centre-gurugram-2025.jpg', caption: 'Built to be eaten in one bite, standing, without breaking a conversation.' }
        ]
      },
      {
        heading: 'Why This Format Works for High-Profile Brand Launches',
        paragraphs: [
          'High-profile launches with press and PR guests require a fundamentally different F&B approach from weddings or private dinners. The guests are there to work. They are forming impressions, taking photographs, and filing stories. The catering must support that environment without competing with it. Food that is difficult to eat standing up creates awkward moments at exactly the wrong time. Food that looks generic undermines the premium positioning of the brand being launched.',
          'The brief at Tesla was to make the catering invisible in the best sense: present, excellent, and completely aligned with the space it was serving. Virtuoso Catering House has executed luxury brand activation catering for Ferrari APAC, Lamborghini, BMW, and Tesla India across Delhi NCR. Each brief is different. The standard is not.',
          'The Tesla Centre Gurugram opening was covered by Times of India, Economic Times, and India Today among others.'
        ]
      }
    ],
    faq: [
      { q: 'What type of catering did Virtuoso provide for the Tesla Centre Gurugram launch?', a: 'Virtuoso Catering House designed and executed the complete F&B experience for the Tesla Centre Gurugram opening at Orchid Business Park, Badshahpur Sohna Road in November 2025. The event served 150 guests including senior automotive journalists, PR professionals, and HNI clients with Thai curry, chipotle bowls, curated canapés, and a mocktail program.' },
      { q: 'Does Virtuoso conduct menu trials before events?', a: 'Yes. Every menu goes through a formal trial process before the event. Each dish is tasted and assessed against two criteria: aesthetic presentation and ease of consumption in a live event environment. Dishes that do not meet both criteria are adjusted or replaced before final approval.' },
      { q: 'What is the guest capacity Virtuoso can serve at luxury brand activations?', a: 'We have served events ranging from intimate 50 guest brand previews to 150 plus guest flagship launches. For the Tesla Centre Gurugram opening we served 150 senior journalists and HNI guests across a large format multi-zone facility.' },
      { q: 'Does Virtuoso Catering House work with other luxury automotive brands in Delhi NCR?', a: 'Yes. In addition to Tesla India, Virtuoso has catered for Ferrari APAC, Lamborghini, and BMW dealer events across Delhi NCR. We are one of the few catering companies in Delhi NCR with a dedicated track record in luxury automotive brand event hospitality.' }
    ],
    author: {
      name: 'Pallav Goel',
      linkedin: 'https://www.linkedin.com/in/pallavg16',
      bio: 'Pallav Goel is the Co-Founder of Virtuoso Catering House. He leads the overall growth, strategy, and business direction of Virtuoso, setting the standards for which clients the company works with and how the brand positions itself in the luxury events market.'
    }
  },
  {
    slug: 'ferrari-track-day-catering-buddh-international-circuit',
    url: '/blog/ferrari-track-day-catering-buddh-international-circuit',
    title: 'Serving 300 Ferraristas, Media, and Celebrities an Exclusively Italian Menu at Buddh International Circuit',
    excerpt: 'Virtuoso Catering House designed and executed the complete hospitality experience for La Esperienza Ferrari Delhi, a four day Ferrari APAC track day at Buddh International Circuit, built around an exclusively Italian menu.',
    date: '2026-05-02',
    image: '/images/virtuoso-catering-house-esperienza-ferrari-buddh-circuit-2026.jpg',
    relatedLink: { path: '/luxury-brand-event-catering-delhi-ncr', label: 'See how we approach luxury brand event catering across Delhi NCR' },
    lead: [
      'Virtuoso Catering House designed and executed the complete hospitality experience for La Esperienza Ferrari Delhi, a four day track day hosted by Ferrari APAC at the Buddh International Circuit from 9 to 12 April 2026. The event brought together 300 guests across Ferraristas, media, and celebrities. The brief was exact: an exclusively Italian menu, sourced down to the water, held to one standard through every stage of planning. Only the best for the best.'
    ],
    sections: [
      {
        heading: 'The Brief',
        paragraphs: [
          'Ferrari APAC’s brief for La Esperienza Ferrari Delhi left no room for interpretation. Every element of the menu needed to be exclusively Italian, from the imported water down to the core ingredients. Only the best for the best was not a tagline for this brief. It was the standard every dish was measured against before it reached a guest.',
          'Three hundred guests meant three distinct audiences in one room across four days. Ferraristas who know Italian food intimately. International media covering the event professionally. Celebrities who expect precision without needing to ask for it. The menu had to hold up to all three at once.'
        ],
        image: {
          src: '/images/virtuoso-catering-house-team-esperienza-ferrari-2026.jpg',
          caption: 'The team behind four days of service, ready before the first guest arrived.'
        }
      },
      {
        heading: 'The Concept',
        paragraphs: [
          'We built the experience around a rotation service and a live, premium Italian buffet, kept moving across the four days rather than fixed in one place. The format let guests engage with the food between track sessions without pulling them away from the cars for long.',
          'Buddh International Circuit is not a single venue. It is a segregated site spread across paddock, hospitality, and track areas, which meant nothing could be arranged on the fly. Every rotation, every replenishment, and every ingredient delivery had to be planned before the first guest arrived, not adjusted in the moment.'
        ],
        pullQuote: 'Buddh International Circuit is a segregated site. Nothing could be arranged on the fly.',
        images: [
          { src: '/images/virtuoso-catering-house-pasta-bar-ferrari-track-day-2026.jpg', caption: 'The Pasta Bar, one station in an exclusively Italian buffet.' },
          { src: '/images/virtuoso-catering-house-butter-basil-rice-ferrari-track-day-2026.jpg', caption: 'Butter Basil Rice, plated live through all four days.' }
        ]
      },
      {
        heading: 'The Execution',
        paragraphs: [
          'Authentic Italian cooking at a mobile site is a real challenge, not a logistical footnote. Hard cooking methods including frying and sizzling were not permitted in the paddock, which meant the entire live component of the menu had to be reworked around what could be finished and plated without an open flame, while still tasting and looking like it came straight out of an Italian kitchen.',
          'The clearest measure of whether that worked came from the guests themselves. Over the four days, Italian drivers walked up to Aarti Sharma, our co founder, to say the food was excellent. One driver put it plainly: the food is excellent, and trust me, I am saying this as an Italian.'
        ],
        images: [
          { src: '/images/virtuoso-catering-house-fromagerie-platter-ferrari-track-day-2026-1.jpg', caption: 'The fromagerie platter, styled entirely in Ferrari red.' },
          { src: '/images/virtuoso-catering-house-fromagerie-platter-ferrari-track-day-2026-2.jpg', caption: 'Guests moving through the display across all four evenings.' }
        ]
      },
      {
        heading: 'Why Track Day Hospitality Is a Different Discipline',
        paragraphs: [
          'Track day hospitality moves at a different rhythm from a single evening launch. Guests circulate between track sessions, hospitality areas, and the paddock across four full days, which means the food has to sustain interest and energy far longer than a three hour dinner service.',
          'The Ferrari brief also removed any room for substitution. An exclusively Italian menu is a specific, verifiable standard, not a stylistic choice, and every ingredient decision was made against that standard first.',
          'La Esperienza Ferrari Delhi was covered by HT Auto and Bollywood Hungama.'
        ],
        image: {
          src: '/images/virtuoso-catering-house-ferrari-buddh-circuit-2026.jpg',
          caption: 'The cars this entire brief was built around.'
        }
      }
    ],
    faq: [
      { q: 'What catering did Virtuoso provide for Ferrari’s track day event at Buddh International Circuit?', a: 'Virtuoso Catering House designed and executed the complete hospitality experience for La Esperienza Ferrari Delhi, a four day Ferrari APAC track day at Buddh International Circuit from 9 to 12 April 2026, serving 300 guests across Ferraristas, media, and celebrities with an exclusively Italian menu.' },
      { q: 'Does Virtuoso Catering House cater exclusively Italian menus?', a: 'Yes. For La Esperienza Ferrari Delhi, every element of the menu was sourced to an exclusively Italian standard, including the drinking water, built around a live rotation buffet with no hard cooking methods permitted in the paddock area.' },
      { q: 'What challenges come with catering at a racetrack like Buddh International Circuit?', a: 'Buddh International Circuit is a segregated site across paddock, hospitality, and track areas, which means logistics have to be planned in advance rather than adjusted on the fly. For this event, paddock restrictions on hard cooking methods also required the live menu to be reworked around what could be finished without an open flame.' },
      { q: 'Which luxury automotive brands has Virtuoso catered for in Delhi NCR?', a: 'Virtuoso Catering House has executed luxury brand activation catering for Ferrari APAC, Lamborghini, Tesla India, and BMW across Delhi NCR, alongside weddings, private dining, and bespoke menu work.' }
    ],
    author: {
      name: 'Pallav Goel',
      linkedin: 'https://www.linkedin.com/in/pallavg16',
      bio: 'Pallav Goel is the Co-Founder of Virtuoso Catering House. He leads the overall growth, strategy, and business direction of Virtuoso, setting the standards for which clients the company works with and how the brand positions itself in the luxury events market.'
    }
  },
  {
    slug: 'bath-body-works-touch-of-gold-product-launch',
    url: '/blog/bath-body-works-touch-of-gold-product-launch',
    title: 'Designing an All-Gold Grazing Table for Bath & Body Works’ Touch of Gold Launch',
    excerpt: 'Virtuoso Catering House designed and executed the catering for Bath & Body Works’ Touch of Gold product launch at Promenade Mall, built around a single all-gold grazing table and branded food elements.',
    date: '2026-02-09',
    image: '/images/virtuoso-catering-house-grazing-table-bath-body-works-2026.jpg',
    relatedLink: { path: '/luxury-brand-event-catering-delhi-ncr', label: 'See how we approach luxury brand event catering across Delhi NCR' },
    lead: [
      'Virtuoso Catering House designed and executed the catering for the Touch of Gold product launch by Bath & Body Works at Promenade Mall on 9 February 2026, serving a room of clients and influencers with a single all-gold grazing table built to carry the new product range through the food itself.'
    ],
    sections: [
      {
        heading: 'The Challenge',
        paragraphs: [
          'A product launch built around a room of clients and influencers is also a room built for photographs. The table needed to read instantly in a single frame, on brand and unmistakably gold, without the visual clutter that comes from spreading a menu across multiple stations.',
          'Bath & Body Works wanted the food itself to feel branded, not just styled to match a colour palette. That meant the menu had to carry the Touch of Gold identity in the ingredients and presentation, not only in the table linen and florals around it.',
          'For Aarti Sharma, our co-founder, the brief carried a personal history. "Before Bath & Body Works entered India, I used to specifically purchase their products when I was on trips abroad. I was incredibly excited to execute a table for this iconic brand," she said.'
        ],
        image: {
          src: '/images/virtuoso-catering-house-aarti-sharma-truffle-tower-bath-body-works-2026.jpg',
          caption: 'Aarti Sharma, our co-founder, beside the gold truffle tower ahead of the launch.'
        }
      },
      {
        heading: 'The Concept',
        paragraphs: [
          'We built the display around a single all-gold grazing table rather than multiple stations spread across the venue. A gold truffle tower anchored the table, surrounded by Bath & Body Works branded macarons and a tight edit of small nibblers and one-bite canapés.',
          'Keeping the menu to bite-sized, one-hand formats was a deliberate choice. It kept the table visually clean and let guests move through the space and mingle without needing to balance a plate, which matters in a room where the point is conversation and photographs, not a seated meal.'
        ],
        pullQuote: 'A single all-gold grazing table, not multiple stations. One tight edit of bite-size food kept the room moving.',
        images: [
          { src: '/images/virtuoso-catering-house-gold-truffle-tower-bath-body-works-2026.jpg', caption: 'The gold truffle tower, the anchor of the grazing table.' },
          { src: '/images/virtuoso-catering-house-branded-macarons-bath-body-works-2026.jpg', caption: 'Bath & Body Works branded macarons, stamped with the logo.' }
        ]
      },
      {
        heading: 'The Menu',
        paragraphs: [
          'The truffle tower and the branded macarons were the two signature items on the table, both foiled and finished to match the Touch of Gold range exactly. Alongside them sat a tight edit of small nibblers and one-bite canapés, chosen to keep the table clutter-free rather than to fill it.',
          'The beverage programme carried the gold theme into the glass as well as the table, with edible glitter drinks delivered through an exclusive partnership with Sepoy & Co.',
          'Gauri from Bath & Body Works summed up the brief afterward: "Everything was perfect, we just handed over the brief to Virtuoso and they created the perfect menu and delivered it seamlessly with flawless execution."'
        ]
      }
    ],
    faq: [
      { q: 'What catering did Virtuoso provide for Bath & Body Works’ Touch of Gold launch?', a: 'Virtuoso Catering House designed and executed the catering for the Touch of Gold product launch by Bath & Body Works at Promenade Mall on 9 February 2026, built around a single all-gold grazing table with a gold truffle tower, branded macarons, and a beverage programme delivered through an exclusive partnership with Sepoy & Co.' },
      { q: 'Does Virtuoso Catering House design branded food elements for product launches?', a: 'Yes. For the Bath & Body Works Touch of Gold launch, the truffle tower and macarons were both foiled and finished to match the product range itself, carrying the brand through the food, not only the table styling.' },
      { q: 'What kind of beverage programme did Virtuoso build for the Bath & Body Works launch?', a: 'Edible glitter drinks, delivered through an exclusive partnership with Sepoy & Co., designed to carry the event’s gold theme into the glass as well as the table.' }
    ],
    author: {
      name: 'Pallav Goel',
      linkedin: 'https://www.linkedin.com/in/pallavg16',
      bio: 'Pallav Goel is the Co-Founder of Virtuoso Catering House. He leads the overall growth, strategy, and business direction of Virtuoso, setting the standards for which clients the company works with and how the brand positions itself in the luxury events market.'
    }
  },
  {
    slug: 'how-to-plan-wedding-catering-delhi-ncr',
    url: '/blog/how-to-plan-wedding-catering-delhi-ncr',
    title: 'How to Plan Wedding Catering in Delhi NCR: A Practical Guide',
    excerpt: 'Planning wedding catering in Delhi NCR comes down to three decisions: matching the menu to each function’s mood, choosing a specialist caterer over a banquet kitchen, and locking your date with a real tasting before anything is signed.',
    date: '2026-07-08',
    image: img('mv-blog-wedding-guide', 1200, 800),
    relatedLink: { path: '/luxury-wedding-catering-delhi-ncr', label: 'See how we approach wedding catering across Noida and Delhi NCR' },
    lead: [
      'Planning wedding catering in Delhi NCR comes down to three decisions: matching the menu to each function’s mood instead of repeating one menu across the wedding, choosing a specialist caterer over a banquet kitchen for exclusive ownership of food and presentation, and locking your date with a tasting at the caterer’s own kitchen before anything is signed.'
    ],
    sections: [
      {
        heading: 'Match the Menu to Each Function, Not the Guest List',
        paragraphs: [
          'A wedding is not one event. It is a sequence of functions, and each one carries its own energy. The mehendi is usually followed by the engagement or cocktail, which tends to be the most exciting day of the entire celebration. That changes what should be served. Regional cuisines do well at the mehendi, and meals are generally kept lighter, because guests are pacing themselves for what comes next.',
          'The engagement is where people actually indulge. Guests are in full celebration mode, and this is usually the day families are most willing to explore favourite dishes and more ambitious formats. Planning the same heavy, elaborate menu across every function misses this rhythm entirely.'
        ]
      },
      {
        heading: 'How Much Food Knowledge the Family Brings In',
        paragraphs: [
          'The single biggest factor in how a wedding menu comes together is not the budget. It is how initiated the decision makers are into food. Some families want a small number of true favourites, done well, with a setup that matches the vibe and theme of the party. Others arrive already fluent in what is possible.',
          'Families further along that curve ask for speciality Indian catering, restaurant pop-up concepts inside the wedding, and sometimes a celebrity chef for a single section of the event. Celebrity chefs typically bring their own team and take ownership of the planning and menu for that one section only, while everything else runs alongside it. A live sushi bar is one of the cleanest examples of this: done well, it looks sophisticated and restrained in a way a standard live counter does not.'
        ]
      },
      {
        heading: 'Why a Specialized Caterer Outperforms a Banquet Kitchen',
        paragraphs: [
          'A banquet’s food passes through one team among many the venue is running at once. A specialized caterer’s exclusive focus is the food itself, which is why the difference shows up in three specific places: the food, the presentation, and the crockery and cutlery. Those three pillars are what separate a caterer from a banquet on any given day, not the size of the menu.'
        ],
        pullQuote: 'The food, the presentation, and the crockery and cutlery. Those three pillars are what separate a caterer from a banquet.'
      },
      {
        heading: 'When to Book',
        paragraphs: [
          'Book as soon as the venue is finalised, and ideally before. Most couples move from their first tasting to a locked menu within two to three weeks, so starting early keeps that timeline realistic instead of compressing it into the final month. Rates can also move once a date is set, though how much depends entirely on the caterer being considered.'
        ]
      },
      {
        heading: 'What the Tasting Process Actually Looks Like',
        paragraphs: [
          'Every engagement starts with a private tasting at our experience centre, A-15, A-Block, Sector 61, Noida, not at a live event. Hosting the tasting away from an active wedding gives families room to taste, adjust, and ask honest questions without the noise of someone else’s celebration happening around them. It is easier to adjust a dish on a plate in front of you than to describe it over a call.'
        ]
      },
      {
        heading: 'Every Wedding Starts With a Conversation, Not a Package',
        paragraphs: [
          'We do not sell fixed packages. Every wedding menu is built around the two families involved, the mood of each function, and how far into the world of food they want to go. Start with your venue and your date, and the rest can be built from there.'
        ]
      }
    ],
    faq: [
      { q: 'How far in advance should I book a wedding caterer in Delhi NCR?', a: 'As soon as your venue is finalised, and ideally even before. Most couples move from their first tasting to a locked menu within two to three weeks, and rates or availability can shift once a date is confirmed, so starting early keeps more of the calendar open.' },
      { q: 'What is the difference between a wedding caterer and banquet catering?', a: 'A banquet’s food is handled by one team among several the venue runs simultaneously. A specialized caterer’s exclusive focus is the food, which shows up in three places specifically: the food itself, the presentation, and the crockery and cutlery.' },
      { q: 'Should the menu be the same across all wedding functions?', a: 'No. Each function has its own mood. The mehendi is typically followed by the engagement or cocktail, the most exciting day of the celebration, so mehendi menus tend to favour lighter, regional dishes while engagement menus can be more indulgent and ambitious.' },
      { q: 'Do you offer celebrity chef or specialty catering concepts for weddings?', a: 'Yes. For families further along in their food knowledge, we offer speciality Indian catering, restaurant pop-up concepts, and celebrity chef sections, where a chef brings their own team and owns the menu for one specific part of the event, such as a live sushi bar.' },
      { q: 'Where does the tasting process happen?', a: 'At our experience centre, A-15, A-Block, Sector 61, Noida, not at a live event, so families can taste and refine the menu in an unhurried, private setting before anything is finalised.' }
    ],
    author: {
      name: 'Pallav Goel',
      linkedin: 'https://www.linkedin.com/in/pallavg16',
      bio: 'Pallav Goel is the Co-Founder of Virtuoso Catering House. He leads the overall growth, strategy, and business direction of Virtuoso, setting the standards for which clients the company works with and how the brand positions itself in the luxury events market.'
    }
  },
  {
    slug: 'does-wedding-presentation-need-big-budget',
    url: '/blog/does-wedding-presentation-need-big-budget',
    title: 'Does a Stunning Wedding Presentation Need a Big Budget? Here Is What Actually Makes the Difference',
    excerpt: 'A stunning wedding presentation does not require a massive budget. It requires a trained culinary team, a proper working space, and dishes rehearsed enough times that nothing is left to chance.',
    date: '2026-07-14',
    image: '/images/virtuoso-catering-house-presentation-myths-hero.jpg',
    relatedLink: { path: '/luxury-wedding-catering-delhi-ncr', label: 'See how we approach wedding catering across Noida and Delhi NCR' },
    lead: [
      'A stunning wedding presentation does not require a massive budget. It requires a trained culinary team, a proper working space for chefs to plate under pressure, and dishes rehearsed enough times that nothing is left to chance. At Virtuoso, servers carry the food. Chefs create the presentation.'
    ],
    sections: [
      {
        heading: 'Why Budget Is Not the Deciding Factor',
        paragraphs: [
          'Most people assume plating quality tracks directly with how much a couple spends on catering. That assumption misses what is actually happening in the kitchen. Couples who end up with presentation that looks intentional, not just expensive, are the ones whose caterer treats plating as a discipline rather than a finishing touch.',
          'A bigger budget can buy more elaborate ingredients or a larger footprint for live stations, but it does not buy plating discipline. That comes from training, workspace, and repetition, not from the size of the invoice.'
        ]
      },
      {
        heading: 'It Takes a Trained Team and the Right Working Space',
        paragraphs: [
          'Plating and food artistry require chefs who have the skill to do it and a kitchen setup that gives them room to actually do it. A cramped or poorly organized workstation on the day will show up on the plate, regardless of how premium the ingredients are.'
        ]
      },
      {
        heading: 'Servers Do Not Create the Presentation, Chefs Do',
        paragraphs: [
          'This is a common misunderstanding: guests assume the person setting the plate down is responsible for how it looks. In reality, servers carry and place the food. The plating, the actual artistry on the plate, is done by the chefs before it ever reaches a server’s hands.'
        ]
      },
      {
        heading: 'Why Rehearsal Matters More Than Most Couples Realize',
        paragraphs: [
          'Our chefs run through every dish twice before the wedding day: once during the tasting rehearsal and once during a dedicated chef’s rehearsal. That repetition is what keeps plating consistent across the full guest count instead of just the first few plates out of the kitchen. By the time your wedding happens, the presentation has already been tested, adjusted, and finalized well in advance.'
        ]
      },
      {
        heading: 'The Real Takeaway',
        paragraphs: [
          'A stunning wedding presentation is not a line item you can buy more of. It is the result of discipline: a trained team, a proper working space, and a dish rehearsed enough times that nothing is left to chance.'
        ]
      }
    ],
    faq: [
      { q: 'Does spending more on catering guarantee better food presentation?', a: 'No. A bigger budget can fund more elaborate ingredients or a larger setup, but plating quality comes from a trained culinary team and repeated rehearsal, not from how much is spent overall.' },
      { q: 'Who is responsible for how wedding food looks on the plate, the servers or the chefs?', a: 'Chefs are responsible for the presentation. They plate and finish each dish before it is handed to a server, whose role is to carry and place the food, not to design how it looks.' },
      { q: 'How do caterers keep plating consistent across hundreds of guests?', a: 'Consistency comes from rehearsal. Our chefs run through every dish twice, once during a tasting rehearsal and once during a dedicated chef’s rehearsal, before the wedding day, so the plating you see at the tasting is the same plating your guests receive.' }
    ],
    author: {
      name: 'Pallav Goel',
      linkedin: 'https://www.linkedin.com/in/pallavg16',
      bio: 'Pallav Goel is the Co-Founder of Virtuoso Catering House. He leads the overall growth, strategy, and business direction of Virtuoso, setting the standards for which clients the company works with and how the brand positions itself in the luxury events market.'
    }
  },
  {
    slug: 'how-luxury-wedding-caterers-build-custom-menu',
    url: '/blog/how-luxury-wedding-caterers-build-custom-menu',
    title: 'How Do Luxury Wedding Caterers Build a Custom Menu? A Step-by-Step Look Inside Virtuoso’s Process',
    excerpt: 'A luxury wedding caterer builds a custom menu in five stages, from a discovery conversation to a final chef trial. Here is exactly how that process works at Virtuoso.',
    date: '2026-07-14',
    image: '/images/virtuoso-catering-house-menu-planning-hero.jpg',
    relatedLink: { path: '/luxury-wedding-catering-delhi-ncr', label: 'See how we approach wedding catering across Noida and Delhi NCR' },
    lead: [
      'A luxury wedding caterer builds a custom menu in five stages: a discovery conversation about your story and guests, a hands-on tasting session, menu customization for dietary and cultural needs, ingredient sourcing, and a final chef trial before sign-off. At Virtuoso, this runs across several weeks before your wedding date.'
    ],
    sections: [
      {
        heading: 'Step 1: The Discovery Conversation',
        paragraphs: [
          'This is a sit-down conversation, not a form to fill out. We ask about the cities you grew up in, the dish your family makes that nobody else gets right, and the two or three dishes you already know have to be on the table. The goal by the end of this conversation is a flavor brief, not a guest count.'
        ]
      },
      {
        heading: 'Step 2: The Tasting Session',
        paragraphs: [
          'Nothing served at the tasting is a mockup. If a dish is on the table during your tasting, it is cooked by the same kitchen team, using the same process, that will serve your wedding. This is deliberate. It is the stage where a dish that sounds good on paper either holds up or does not.',
          'Tastings happen at Virtuoso’s experience centre in Noida, Sector 61, not at a live event. "Tasting is the most important component of our discovery process. Unlike other caterers, we do not invite couples for tasting at our events. Instead, we host couples with family for an intimate tasting session at our experience centre. It leaves more space for conversation and honesty," said Aarti Sharma, co-founder of Virtuoso Catering House.'
        ]
      },
      {
        heading: 'Step 3: Menu Customization',
        paragraphs: [
          'After the tasting, the menu is adjusted for dietary needs, family traditions, and any dish the couple wants reworked. This is also where regional or cultural elements get folded in, so the final menu reads as personal rather than borrowed from a template.'
        ]
      },
      {
        heading: 'Step 4: Sourcing the Ingredients',
        paragraphs: [
          'Once the menu is locked, sourcing begins for seasonal and premium ingredients. A dish that tasted right in the tasting session can fall flat on the wedding day if the ingredients behind it are not sourced with the same care, so this step happens well before the final week of planning.'
        ]
      },
      {
        heading: 'Step 5: The Chef’s Trial Run and Final Sign-Off',
        paragraphs: [
          'Every dish is tested again in the kitchen before it is formally approved, checking plating, portioning, and consistency at the volume the wedding actually needs. Couples receive the final tasting notes and sign off here, which is what keeps the wedding day itself close to surprise-free.'
        ]
      },
      {
        heading: 'Wedding Day Execution',
        paragraphs: [
          'By the time the wedding arrives, nothing on the menu is being decided in real time. Live stations, trained servers, and a kitchen team run the same process that was tested weeks earlier, at the scale the day actually requires.'
        ]
      },
      {
        heading: 'Ready to Start Planning?',
        paragraphs: [
          'If you are planning your wedding, call us at +91 87009 15463 or write to virtuosocatering@gmail.com. We will get in touch and take you through the steps from here.'
        ]
      }
    ],
    faq: [
      { q: 'How long does it take to finalize a wedding catering menu?', a: 'Most couples move from the first tasting to a locked menu within two to three weeks. The timeline depends on how many rounds of customization are needed and how far out the wedding date is, but the tasting session is where most of the real decisions get made.' },
      { q: 'Can a wedding caterer customize a menu for dietary restrictions or religious requirements?', a: 'Yes. Dietary needs and cultural or religious requirements are gathered during the discovery conversation, before the tasting menu is even built, so the tasting already reflects what is actually possible to serve rather than a generic starting point.' },
      { q: 'What happens if a couple does not like a dish during the tasting?', a: 'That dish gets reworked or replaced before the trial run stage. The tasting session exists precisely to catch this early, so nothing reaches the trial run, let alone the wedding day, without the couple’s approval.' },
      { q: 'How many tasting sessions happen before a wedding?', a: 'Typically one structured tasting session covers the full menu, with a follow-up trial run for any dishes that were customized or reworked. Couples are not left choosing blind between rounds, since each reworked version is tasted before it is approved.' }
    ],
    author: {
      name: 'Pallav Goel',
      linkedin: 'https://www.linkedin.com/in/pallavg16',
      bio: 'Pallav Goel is the Co-Founder of Virtuoso Catering House. He leads the overall growth, strategy, and business direction of Virtuoso, setting the standards for which clients the company works with and how the brand positions itself in the luxury events market.'
    }
  },
  {
    slug: 'is-your-tasting-chef-your-wedding-day-chef',
    url: '/blog/is-your-tasting-chef-your-wedding-day-chef',
    title: 'Is the Chef at Your Wedding Tasting the Same One Cooking Your Wedding? Here Is the Catering Industry Truth',
    excerpt: 'At most wedding caterers, the chef who runs your tasting is not the chef who cooks your wedding. Here is why that gap happens, and how Virtuoso closes it.',
    date: '2026-07-15',
    image: '/images/virtuoso-catering-house-menu-planning-hero.jpg',
    relatedLink: { path: '/luxury-wedding-catering-delhi-ncr', label: 'See how we approach wedding catering across Noida and Delhi NCR' },
    lead: [
      'No. At most wedding caterers, the chef who runs your tasting is not the chef who cooks your wedding, since kitchen staff rotate by event availability. At Virtuoso, Aarti Sharma, our co-founder, personally runs your tasting at our Noida experience centre, and the same kitchen team she trains at rehearsal is who cooks your wedding.',
      'Couples spend hours picking the right dishes at a tasting, then assume that experience is locked in. In most catering operations, it is not. Kitchen staff get assigned event by event, and a caterer running multiple weddings on the same weekend cannot always guarantee the same hands touch every plate.'
    ],
    sections: [
      {
        heading: 'Why Tasting Day and Wedding Day Are Often Different Kitchens',
        paragraphs: [
          'Bigger catering companies typically operate with a bench of chefs who rotate across events based on availability. The chef who impressed you at the tasting might be booked on another wedding the same weekend as yours, and someone else steps in to execute the menu from a recipe card instead of firsthand experience with it.'
        ]
      },
      {
        heading: 'Why This Gap Matters More Than Couples Realize',
        paragraphs: [
          'A recipe on paper does not capture the small judgment calls a chef makes while cooking: seasoning it correctly, timing when it comes off heat, plating it the way it looked at the tasting. When a different chef executes it, small drifts happen, which is often why couples say the food tasted better at the tasting than at the wedding.'
        ]
      },
      {
        heading: 'How Virtuoso Closes That Gap',
        paragraphs: [
          'Tastings at Virtuoso are run personally by Aarti Sharma, our co-founder, at our experience centre in Noida’s Sector 61, not at a live event. The same team present at your tasting is the one that plates your wedding. Every dish is rehearsed twice before your day: once during the tasting itself, once during a dedicated chef’s rehearsal. There is no handoff between a tasting kitchen and an execution kitchen. What you approve is what gets cooked.'
        ]
      },
      {
        heading: 'The Real Takeaway',
        paragraphs: [
          'Continuity matters more than most couples are told to ask about. Before locking in a caterer, it is worth confirming whether the chef at your tasting will actually be the one in the kitchen on your wedding day.'
        ]
      }
    ],
    faq: [
      { q: 'Does the chef who runs your wedding tasting always cook your wedding?', a: 'Not always. Many catering companies rotate kitchen staff across events, so the chef at your tasting may not be the one cooking on the actual day unless the caterer specifically confirms continuity.' },
      { q: 'Why would a wedding menu taste different on the day compared to the tasting?', a: 'The most common reason is a change in who is cooking. Small judgment calls around seasoning, timing, and plating vary between chefs, even when they are using the same recipe.' },
      { q: 'How can couples make sure the same chef cooks their wedding as their tasting?', a: 'Ask the caterer directly. At Virtuoso, Aarti Sharma personally runs every tasting, and the same team rehearses each dish twice, once at the tasting and once at a dedicated chef’s rehearsal, before your wedding day, so continuity is built in rather than something you have to request.' }
    ],
    author: {
      name: 'Pallav Goel',
      linkedin: 'https://www.linkedin.com/in/pallavg16',
      bio: 'Pallav Goel is the Co-Founder of Virtuoso Catering House. He leads the overall growth, strategy, and business direction of Virtuoso, setting the standards for which clients the company works with and how the brand positions itself in the luxury events market.'
    }
  },
  {
    slug: 'wedding-catering-menu-in-delhi',
    url: '/blog/wedding-catering-menu-in-delhi',
    title: 'What’s Actually on a Wedding Catering Menu in Delhi? A Dish-by-Dish Breakdown by Function',
    excerpt: 'Wedding catering in Delhi typically spans three function-specific menus: lighter regional dishes at the mehendi, indulgent live counters at the cocktail, and a fuller multi-cuisine spread at the reception.',
    date: '2026-07-15',
    image: '/images/virtuoso-catering-house-weddings-service.jpg',
    relatedLink: { path: '/luxury-wedding-catering-delhi-ncr', label: 'See how we approach wedding catering across Noida and Delhi NCR' },
    lead: [
      'Wedding catering in Delhi typically spans three function-specific menus: lighter regional dishes at the mehendi, indulgent live counters and starters at the cocktail or engagement, and a fuller multi-cuisine spread, North Indian, Continental, Chinese, and fusion, at the reception. The dishes change by function because the mood of each one is different, not because of a fixed template.',
      'A family sat across from me a few months ago and said, "Just give us the reception menu for the mehendi too. We\'ll trim it down later." I\'ve learned to catch that sentence early, because it\'s where most Delhi wedding menus go wrong. Trimming a big menu doesn\'t give you a lighter one. It gives you a smaller version of the wrong thing.',
      'Ask ten Delhi families what should be on a wedding menu and you\'ll get ten different answers, because the honest answer depends on which function you\'re asking about. The mehendi, the cocktail night, and the reception aren\'t the same event in different outfits. They\'re three different moods, and the food has to keep pace with each one.'
    ],
    sections: [
      {
        heading: 'Mehendi: Lighter, Regional, and Built to Pace the Guests',
        paragraphs: [
          'The mehendi usually lands right before the real spectacle: the engagement or cocktail night, the one most guests quietly treat as the main event. Which means the mehendi\'s job isn\'t to impress. It\'s to not get in the way. Regional dishes do best here, kept deliberately light, so nobody\'s already full by the time the evening that actually matters shows up. Nothing sadder than a guest who peaked at 6pm.'
        ]
      },
      {
        heading: 'Cocktail and Engagement: Where the Real Eating Happens',
        paragraphs: [
          'This is the one function where restraint takes a night off. On purpose. Live counters, sharper flavours, a service pace that keeps people moving from one plate to the next. Starters carry more weight here than at any other function, because this is the night families are willing to be a little ambitious. A live sushi bar is the cleanest example of that ambition. It looks sophisticated, and just as important, it gives guests something to watch, not just eat. Half the appeal of a live counter is the theatre of it.'
        ]
      },
      {
        heading: 'Reception: The Full Spread',
        paragraphs: [
          'The reception is where the menu finally stops holding back: North Indian classics, Continental plates, Chinese counters, fusion dishes that take two cuisines and make them behave like one course. It\'s usually the largest, most formal function of the three, and the menu earns that scale honestly. Not a curated handful stretched thin to look like more. An actual full spread.'
        ]
      },
      {
        heading: 'How Far a Menu Goes Depends on the Family, Not the Budget',
        paragraphs: [
          'Some families want five dishes done so well nobody asks for a sixth. Others arrive already fluent in food. They\'ll ask for speciality Indian catering, a restaurant pop-up built inside the wedding, or a celebrity chef who brings their own team and simply owns one section of the menu outright. The live sushi bar is usually where that ownership model shows up first. Either way, it\'s rarely a budget conversation. It\'s a taste conversation that happens to have a budget attached to it.'
        ]
      },
      {
        heading: 'Vegetarian and Non-Vegetarian, Planned Separately, Not as an Afterthought',
        paragraphs: [
          'A wedding menu in Delhi rarely runs on one track, and it shouldn\'t. Vegetarian and non-vegetarian get planned as two distinct menus, not one menu with a few substitutions bolted on. The substitution approach has a tell: it makes the vegetarian plate feel like the understudy instead of the lead. Nobody wants to be someone\'s backup dinner at their own wedding.'
        ]
      },
      {
        heading: 'Ready to Start Planning Your Menu?',
        paragraphs: [
          'Call us at +91 87009 15463 or write to virtuosocatering@gmail.com. Or simply leave a hi on WhatsApp and we\'ll get in touch.'
        ]
      }
    ],
    faq: [
      { q: 'Does the wedding menu stay the same across all functions?', a: 'No, and it shouldn\'t. The mehendi, cocktail or engagement, and reception each carry a different mood, and the menu follows it: lighter and regional at the mehendi, indulgent live counters at the cocktail, a fuller multi-cuisine spread at the reception.' },
      { q: 'What cuisines are typically included in a Delhi wedding catering menu?', a: 'North Indian, South Indian, Continental, Chinese, and fusion. How far you take each one depends on the function, and how ambitious the family wants to get.' },
      { q: 'Are vegetarian and non-vegetarian menus planned differently for Delhi weddings?', a: 'Yes. Two distinct menus, not one menu with workarounds, so the vegetarian spread reads as a complete menu in its own right, not a scaled-down version of the other one.' }
    ],
    author: {
      name: 'Pallav Goel',
      linkedin: 'https://www.linkedin.com/in/pallavg16',
      bio: 'Pallav Goel is the Co-Founder of Virtuoso Catering House. He leads the overall growth, strategy, and business direction of Virtuoso, setting the standards for which clients the company works with and how the brand positions itself in the luxury events market.'
    }
  },
  {
    slug: 'luxury-catering-cost-delhi-ncr',
    url: '/blog/luxury-catering-cost-delhi-ncr',
    title: 'How Much Does Luxury Catering Cost in Delhi NCR?',
    excerpt: 'Luxury catering in Delhi NCR runs ₹2,500 to ₹6,000 per guest for corporate events and starts at ₹3,000 per plate for weddings. Here is what actually moves that number.',
    date: '2026-07-15',
    image: '/images/virtuoso-catering-house-bespoke-menus-service.jpg',
    relatedLink: { path: '/luxury-wedding-catering-delhi-ncr', label: 'See how we approach wedding catering across Noida and Delhi NCR' },
    lead: [
      'Luxury catering in Delhi NCR typically runs ₹2,500 to ₹6,000 per guest for corporate events, and starts at ₹3,000 per plate for a genuinely luxury wedding meal, with no fixed ceiling since the final number depends on what you choose for your guests. These ranges cover food only; bar and beverage service is always priced separately.',
      'A client called me last month before their daughter\'s wedding. First question, before hello, practically: "What\'s your per-plate rate?"',
      'I get this question every week. And every week, I have to disappoint people with the honest answer: it depends. Not because I\'m being cagey. Because "per plate" is the wrong unit to think in.',
      'Here\'s why. Two events, same guest count, same city, same season, one can cost ₹3,000 a head, the other ₹6,000. Not because one caterer is better at cooking. Because they\'re not buying the same thing.',
      'So let\'s actually answer the question people are searching for, with real numbers, and then explain what those numbers are actually made of.'
    ],
    sections: [
      {
        heading: 'The Honest Ranges',
        paragraphs: [
          'These are starting points, not quotes. Every number below assumes Delhi NCR, a full-service luxury caterer (not a banquet hall\'s in-house kitchen), and a guest count that isn\'t a wedding of 50.',
          'Corporate events, ₹2,500 to ₹6,000 per guest.',
          'Weddings, starting at ₹3,000 per plate for the core meal. There\'s no fixed ceiling above that. The number moves with what you choose for your guests, from the menu to the format to the level of service.',
          'A genuinely luxurious per-plate rate cannot realistically be executed under ₹3,000. Below that, something usually gets cut. Most Delhi NCR weddings also cluster around a small number of fixed muhurat dates each season, and every family with a date on that calendar is competing for the same venues, the same top-tier vendors, and the same skilled staff at once. That demand doesn\'t spread evenly across the year, it spikes on those specific dates, and the market prices accordingly. If you\'re set on a genuinely luxury standard, treat a quote well under ₹3,000 on a muhurat date with a little care, and ask exactly what it includes.'
        ]
      },
      {
        heading: 'Why We Don\'t Give You a Flat Number Upfront',
        paragraphs: [
          'We could. It would be easier for everyone, including us.',
          'But a flat per-plate rate assumes every event wants the same thing. And most people asking us for a quote don\'t yet know what they actually want. They know they want it to feel right. That\'s not a line item.',
          'So instead of a price list, we start with a conversation. What\'s the occasion. Who\'s in the room. What you want people to remember walking out. The number comes after that, not before. Because the number should reflect the event, not the other way around.',
          'This is also why "cheaper" caterers can quote faster. They\'re selling you a template with your logo on it. We\'re not.'
        ]
      },
      {
        heading: 'What Actually Moves Your Number',
        paragraphs: [
          'If you want to estimate your own budget honestly, these are the real levers, not the marketing ones.',
          'Menu complexity, not menu size. A more considered menu doesn\'t automatically cost less than a larger one, since every course is custom-built rather than mass-prepped.',
          'Staffing ratio. The team that "disappears into the background exactly when it should" isn\'t cheap to keep on payroll. More staff per guest means faster service, cleaner tables, and nobody waiting for their course. That ratio is invisible until it\'s missing.',
          'Sourcing and provenance. A dish built around a specific ingredient\'s story, where it came from, why this season, costs more than the same dish built to hit a food cost percentage.',
          'Service style. Plated service costs more than a buffet, per guest, every time. It also changes the entire feel of the room: plated says "we made this for you," a buffet line says "help yourself." Both have their place. They are not the same event.',
          'Season and venue logistics. An outdoor Delhi wedding in October behaves very differently from one in June. Kitchens get built on-site, timelines get compressed. None of that shows up on a menu, and all of it shows up on an invoice.'
        ],
        pullQuote: 'Curation costs more than collection. It also gets remembered more.'
      },
      {
        heading: 'The Real Question to Ask',
        paragraphs: [
          'Not "what\'s your rate." Ask: what experience am I actually trying to create, and what does that cost, done properly, without cutting corners on the parts nobody will forgive you for cutting.',
          'That\'s the conversation we\'d rather have. Menus, tastings, and a number that means something, once we know what we\'re actually building.',
          'Get in touch: virtuosocatering@gmail.com · +91 87009 15463'
        ]
      }
    ],
    faq: [
      { q: 'What is the average per-plate cost for a wedding in Delhi NCR?', a: 'For a genuinely luxury standard, the core wedding meal starts at ₹3,000 per plate in Delhi NCR. There\'s no fixed ceiling; the final number depends on the choices you make for your guests.' },
      { q: 'Why can\'t a luxury wedding caterer go below ₹3,000 a plate?', a: 'Below ₹3,000, something in the execution usually gets cut. Most Delhi NCR weddings also cluster around a limited number of fixed muhurat dates, so demand for top-tier venues, vendors, and staff spikes on those dates, and pricing follows. If you\'re set on a genuinely luxury standard, treat a much lower quote with care and ask exactly what it includes.' },
      { q: 'How much does corporate event catering cost in Delhi NCR?', a: 'Corporate catering in Delhi NCR typically runs ₹2,500 to ₹6,000 per guest, with the number moving based on menu complexity, staffing, and execution rather than guest count alone.' }
    ],
    author: {
      name: 'Pallav Goel',
      linkedin: 'https://www.linkedin.com/in/pallavg16',
      bio: 'Pallav Goel is the Co-Founder of Virtuoso Catering House. He leads the overall growth, strategy, and business direction of Virtuoso, setting the standards for which clients the company works with and how the brand positions itself in the luxury events market.'
    }
  },
  {
    slug: 'dos-and-donts-finalizing-wedding-menu',
    url: '/blog/dos-and-donts-finalizing-wedding-menu',
    title: 'Do\'s and Don\'ts of Finalizing a Wedding Menu: How to Avoid 40 Dishes Nobody Remembers',
    excerpt: 'The right way to finalize a wedding menu starts with a conversation with your caterer, not a line item list. Here are the do\'s and don\'ts that keep a menu from ballooning to forty dishes nobody remembers.',
    date: '2026-07-15',
    image: '/images/virtuoso-catering-house-menu-planning-hero.jpg',
    relatedLink: { path: '/wedding-caterers-delhi-ncr', label: 'See how we approach wedding catering across Delhi NCR' },
    lead: [
      'The right way to finalize a wedding menu starts with a conversation, not a line item list: what food genuinely matters to you, and what your guests actually expect to eat. Everything else gets decided from there. The wrong way is adding dish after dish from a template until the list hits forty items nobody asked for.',
      'Most wedding menus don\'t fail because of bad dishes. They fail because they were built line item by line item instead of from an actual conversation. The couples who end up with a menu they and their guests remember are the ones who sat down with their caterer and talked through two questions before adding a single item: what food matters to us, and what will our guests actually want to eat.'
    ],
    sections: [
      {
        heading: 'Do: Start With What Food Matters to You',
        paragraphs: [
          'Before any list gets drawn up, sit with your caterer and talk through the dishes that actually mean something, a family recipe, a cuisine tied to where you grew up, a dish from your first date. That conversation gives the menu a spine. Everything added after should connect back to it, not compete with it.'
        ]
      },
      {
        heading: 'Don\'t: Start With a Template and Add to It',
        paragraphs: [
          'Working from a standard package and adding line items on top is how a menu grows without anyone deciding it should. Each addition feels small in the moment, one more starter, one more counter, but there\'s no conversation anchoring any of it, so the list just keeps growing until someone finally asks why there are forty dishes.'
        ]
      },
      {
        heading: 'Do: Talk Through What Guests Actually Expect',
        paragraphs: [
          'Your guests bring their own expectations to a wedding, shaped by their background, the season, the region. A real conversation with your caterer should cover who\'s coming and what they\'ll genuinely look for, not guess at it after the menu is already printed. That\'s different from asking a caterer to vaguely aim for "crowd-pleasers."'
        ]
      },
      {
        heading: 'Don\'t: Add Dishes to Cover Every Guess About What Guests Might Want',
        paragraphs: [
          'Trying to preempt every possible guest preference by adding a dish for each one is how "what will people want to eat" turns into forty options instead of ten thoughtful ones. It\'s a guessing exercise dressed up as generosity. A caterer who\'s actually talked through your guest list with you can tell you what\'s genuinely worth including, instead of hedging with more dishes.'
        ],
        pullQuote: 'It\'s a guessing exercise dressed up as generosity.'
      },
      {
        heading: 'Do: Let the Caterer Push Back',
        paragraphs: [
          'A caterer who only says yes to every request isn\'t doing their job. Part of that opening conversation should be the caterer telling you honestly which additions are worth it and which ones are there out of habit or nerves. That pushback is what keeps a menu tight.'
        ]
      },
      {
        heading: 'Don\'t: Treat the Menu as a Checklist to Fill',
        paragraphs: [
          'Approaching a wedding menu like a checklist, appetizers, mains, live counters, desserts, and filling each category until it feels complete is how a menu grows without ever being examined as a whole. The conversation should decide what\'s on the list, not the categories.'
        ]
      },
      {
        heading: 'The Real Takeaway',
        paragraphs: [
          'A wedding menu built from a real conversation, what matters to you, what your guests expect, rarely needs forty dishes to feel complete. It\'s the menus built without that conversation, filled in line item by line item, that end up long and forgettable.'
        ]
      }
    ],
    faq: [
      { q: 'What\'s the first step in finalizing a wedding menu?', a: 'A conversation with your caterer about two things: the dishes that genuinely matter to you, and what your guests are likely to expect. That conversation should happen before any list of items is drawn up, not after.' },
      { q: 'How do I know if a dish belongs on the menu or not?', a: 'It should connect back to either what matters to you personally or what your guests genuinely expect, not just be there because it fits a category like "starters" or "live counters" that felt incomplete without it.' },
      { q: 'Should I let my caterer push back on menu requests?', a: 'Yes. A caterer who tells you honestly which additions are worth it and which ones aren\'t is more useful than one who agrees to everything, since that honesty is often what keeps a forty-item list from happening in the first place.' }
    ],
    author: {
      name: 'Pallav Goel',
      linkedin: 'https://www.linkedin.com/in/pallavg16',
      bio: 'Pallav Goel is the Co-Founder of Virtuoso Catering House. He leads the overall growth, strategy, and business direction of Virtuoso, setting the standards for which clients the company works with and how the brand positions itself in the luxury events market.'
    }
  },
  {
    slug: 'parameters-to-consider-before-booking-wedding-caterer',
    url: '/blog/parameters-to-consider-before-booking-wedding-caterer',
    title: 'Parameters to Consider Before Booking Your Wedding Caterer',
    excerpt: 'Before booking a wedding caterer, confirm four things: an FSSAI-certified kitchen, an in-house team that actually executes the menu, clarity on what\'s cooked in-house, and real connections to specialty chefs for anything else.',
    date: '2026-07-15',
    image: '/images/virtuoso-catering-house-weddings-service.jpg',
    relatedLink: { path: '/wedding-caterers-delhi-ncr', label: 'See how we approach wedding catering across Delhi NCR' },
    lead: [
      'Before booking a wedding caterer, confirm four things: an FSSAI-certified kitchen, an in-house team that actually executes the menu rather than subcontracting it, clarity on how much of the menu is cooked in-house versus outsourced, and real connections to specialty restaurants or chefs for anything outside the caterer\'s core kitchen.',
      'Most couples evaluate a wedding caterer on menu and price. Those matter, but they don\'t tell you whether the caterer can actually deliver what\'s on the proposal. Four operational questions do a better job of predicting whether your wedding day goes smoothly than any tasting alone.'
    ],
    sections: [
      {
        heading: 'Does the Kitchen Have Valid FSSAI Certification?',
        paragraphs: [
          'This is the baseline, not a bonus. FSSAI certification means the kitchen has been inspected against food safety standards, covering everything from ingredient storage to hygiene during preparation. A caterer should be able to produce this on request without hesitation. If they can\'t, that\'s worth treating as a serious flag, not a minor gap.'
        ]
      },
      {
        heading: 'Does the Caterer Have an In-House Team to Execute the Menu?',
        paragraphs: [
          'A proposal is only as good as the team standing behind it on the actual day. Ask directly whether the chefs and service staff who show up at your wedding are the caterer\'s own trained team, or whether execution gets handed off to a different crew brought in for the event. A caterer without a real in-house team is harder to hold accountable if something goes wrong.'
        ]
      },
      {
        heading: 'How Much of the Menu Is Actually Cooked In-House?',
        paragraphs: [
          'A long, multi-cuisine menu looks impressive on a proposal, but not every kitchen can execute every cuisine well. Ask specifically how much of the menu is prepared in-house versus sourced or subcontracted elsewhere. This isn\'t automatically a dealbreaker, but you should know where each dish is actually coming from, rather than assuming a single kitchen is producing all of it.'
        ]
      },
      {
        heading: 'Does the Caterer Have Connections Beyond Their Own Kitchen?',
        paragraphs: [
          'Sometimes a family wants something genuinely outside a caterer\'s core strength, a specific regional specialty, an authentic cuisine that needs its own dedicated chef, or a pop-up-style section led by an outside name. A caterer with real relationships to specialty restaurants or chefs can bring that in properly instead of attempting a weaker in-house version or turning the request down outright.'
        ],
        pullQuote: 'A caterer with real relationships to specialty restaurants or chefs can bring that in properly, instead of attempting a weaker in-house version.'
      },
      {
        heading: 'The Real Takeaway',
        paragraphs: [
          'Menu and price are what get discussed first, but certification, team ownership, execution transparency, and outside connections are what actually determine whether the wedding you were promised is the wedding you get.'
        ]
      }
    ],
    faq: [
      { q: 'Why does FSSAI certification matter for a wedding caterer?', a: 'It confirms the kitchen has been inspected against food safety standards covering ingredient storage, preparation hygiene, and handling. A caterer should be able to provide this without hesitation, and its absence is a legitimate reason for concern.' },
      { q: 'Why does it matter if a caterer\'s team is in-house versus outsourced?', a: 'An in-house team is the same group that was assessed during your tasting and planning conversations, which makes accountability clearer if something goes wrong on the day. An outsourced or last-minute crew introduces a layer of uncertainty a couple usually isn\'t told about upfront.' },
      { q: 'Should a caterer be able to bring in outside specialists for certain dishes?', a: 'Ideally, yes, when a request is genuinely outside their core strength. A caterer with real relationships to specialty restaurants or chefs can deliver that properly instead of offering a weaker in-house substitute or declining the request altogether.' }
    ],
    author: {
      name: 'Pallav Goel',
      linkedin: 'https://www.linkedin.com/in/pallavg16',
      bio: 'Pallav Goel is the Co-Founder of Virtuoso Catering House. He leads the overall growth, strategy, and business direction of Virtuoso, setting the standards for which clients the company works with and how the brand positions itself in the luxury events market.'
    }
  },
  {
    slug: 'wedding-food-presentation-five-star-hotel',
    url: '/blog/wedding-food-presentation-five-star-hotel',
    title: 'How Do You Get Wedding Food Presentation That Looks Like a 5-Star Hotel?',
    excerpt: '5-star wedding food presentation comes from two things: manpower and material. Trained butlers and chefs plating at every station, served on pristine bone china and hand-made mono servers.',
    date: '2026-07-16',
    image: '/images/blog/virtuoso-catering-house-plated-fine-dining-wedding-presentation.jpg',
    relatedLink: { path: '/luxury-wedding-catering-delhi-ncr', label: 'See how we approach wedding catering across Noida and Delhi NCR' },
    lead: [
      '5-star hotel presentation at a wedding comes from two things: manpower and material. A large team of trained servers and butlers plates the food at every station guests touch, the buffet, the pop-up restaurant, the live counters, while the crockery itself, pristine bone china and hand-made mono servers, carries the rest. Virtuoso brings both to weddings across Delhi NCR.',
      'There\'s real science here. A study titled "Neatness counts," published in the journal Appetite, found that plating the same food more neatly measurably increased how much people liked its taste. A 2024 study reported in The Conversation went further: the shape, size, and colour of the plate itself changed how appealing a dessert looked and how much it was judged to be worth, with black plates reading as more premium than white. Presentation isn\'t decoration. It changes what your guests taste and what they assume your wedding cost.'
    ],
    sections: [
      {
        heading: 'At the Buffet: Butlers Plate, Guests Simply Ask',
        paragraphs: [
          'The buffet is where most wedding presentation falls apart, and catering guides are candid about why: portioning is left in the hands of guests, so plates come out inconsistent and the spread degrades as the night goes on. The 5-star answer is butler-plated service. Guests walk up and ask for what they want, and a trained butler composes the plate for them. The brain processes how food looks before it registers flavour, so a plate that arrives composed, rather than self-assembled, sets up the experience before the first bite.'
        ]
      },
      {
        heading: 'At the Pop-Up Restaurant: A Kitchen Brought to the Wedding',
        paragraphs: [
          'A restaurant pop-up inside a wedding only works when it\'s built like an actual restaurant, and that means the chefs set it up complete with its own plating counter. Dishes are finished and composed at that counter the way they would be in the restaurant\'s own kitchen, not carried across a lawn losing their composure on the way.'
        ]
      },
      {
        heading: 'At the Live Counters: Chefs Plate Their Own Dishes',
        paragraphs: [
          'Indian wedding catering analysis for 2025 and 2026 is blunt about the shift: experiential food stations are replacing traditional buffets as the centrepiece of premium weddings. But a live counter only delivers that experience if a chef is actually finishing and plating the dish in front of the guest. That moment is the closest a wedding gets to a 5-star kitchen, because it is one, moved into the room.'
        ]
      },
      {
        heading: 'None of This Works Understaffed',
        paragraphs: [
          'Butlers at the buffet, chefs at their counters, a full brigade running the pop-up, all simultaneously, across every function of a wedding. Catering guides are direct that composed, individually plated service needs more hands than a buffet: each plate is prepared and garnished for presentation, and someone has to run it. That is exactly why most caterers default to formats that need fewer people. Presentation at this level is a manpower commitment before it is anything else, a massive team of knowledgeable servers and chefs, each trained for the specific station they run.'
        ],
        pullQuote: 'Presentation at this level is a manpower commitment before it is anything else.'
      },
      {
        heading: 'The Crockery Is Half the Presentation',
        paragraphs: [
          'There\'s a reason 5-star hotels standardise on bone china. The bone ash in its body makes it translucent, so under event lighting it takes on a soft glow that flatters the food on it, and it\'s light in the hand yet resistant to chipping. It has carried associations of refinement since it was the tableware of royalty, and guests register that the moment they pick it up. The same dish reads completely differently on pristine bone china than on standard catering stock, which is why the selection matters down to the hand-made mono servers used for individual portions. The plate is the one part of the presentation every guest physically holds all night.'
        ]
      },
      {
        heading: 'The Real Takeaway',
        paragraphs: [
          'The research says guests taste presentation, value presentation, and remember presentation. Delivering it at wedding scale is a staffing and equipment decision: butlers plating at the buffet, chefs plating at their own live counters, a pop-up restaurant with its own plating counter, and bone china worth serving on. Virtuoso brings all of it, the manpower, the trained servers and chefs at every station, and the finest crockery selection, pristine bone china and hand-made mono servers included, to weddings across Delhi NCR.'
        ]
      },
      {
        heading: 'Sources',
        paragraphs: [],
        links: [
          { path: 'https://www.sciencedirect.com/science/article/abs/pii/S0195666311005459', label: 'Zellner et al., "Neatness counts: How plating affects liking for the taste of food," Appetite' },
          { path: 'https://theconversation.com/psychology-can-change-the-way-food-tastes-heres-how-to-use-it-to-make-the-most-of-your-meals-269212', label: 'Psychology can change the way food tastes, The Conversation' },
          { path: 'https://www.zola.com/expert-advice/buffet-vs-plated-which-style-of-catering-to-choose', label: 'Buffet vs. plated: which style of catering to choose, Zola' },
          { path: 'https://www.leonardspalazzo.com/style-of-service/', label: 'What style of service is right for your event, Leonard\'s Palazzo' },
          { path: 'https://weddingsbyeventcrafter.com/2025-2026-indian-wedding-trend-experiential-food-stations/', label: '2025/2026 Indian wedding trend: experiential food stations, Weddings by Event Crafter' },
          { path: 'https://www.wedica.in/live-counters-at-indian-weddings-planning-guide/', label: 'Live counters at Indian weddings: planning guide, Wedica' },
          { path: 'https://jqyceramics.com/why-do-luxury-hotels-consistently-choose-bone-china-tableware-sets/', label: 'Why luxury hotels choose bone china tableware, JQY Ceramics' },
          { path: 'https://pitochina.com/bone-china-vs-porcelain-dinnerware-a-complete-guide-for-hospitality/', label: 'Bone china vs porcelain: a guide for hospitality, Pito' }
        ]
      }
    ],
    faq: [
      { q: 'Does food presentation actually change how food tastes?', a: 'Yes, measurably. A study in the journal Appetite found that plating the same food more neatly increased how much people liked its taste. A separate 2024 study found the plate itself, its shape, size, and colour, shifts how appealing food looks and how much people think it is worth.' },
      { q: 'Do guests serve themselves at a butler-plated buffet?', a: 'No. Guests walk up to the buffet and ask for what they want, and a trained butler composes the plate for them. The spread stays pristine through the night, portions stay consistent, and every plate leaves the buffet looking intentional.' },
      { q: 'Why do luxury hotels and caterers use bone china?', a: 'Bone china is lighter, smoother, and translucent because of the bone ash in its body, giving it a soft glow under lighting that enhances the food on it, while staying resistant to chipping. It is the standard at 5-star properties because guests associate it with refinement the moment they pick it up.' }
    ],
    author: {
      name: 'Pallav Goel',
      linkedin: 'https://www.linkedin.com/in/pallavg16',
      bio: 'Pallav Goel is the Co-Founder of Virtuoso Catering House. He leads the overall growth, strategy, and business direction of Virtuoso, setting the standards for which clients the company works with and how the brand positions itself in the luxury events market.'
    }
  }
];

// Standalone editorial page (not part of the Journal listing), built to rank
// for "best caterers in Noida" with verifiable, checkable claims rather than
// a generic sales pitch.
const bestCaterersNoidaPage = {
  slug: 'best-caterers-in-noida-virtuoso-catering-house',
  title: 'Who Are the Best Caterers in Noida? Here Is What Separates the Top Ones From the Rest',
  excerpt: 'Virtuoso Catering House is the best caterer in Noida, named one of Delhi NCR’s five leading luxury caterers by ANI News in March 2026. Here is what actually separates the top caterers in Noida from the ones just claiming it.',
  image: '/images/virtuoso-catering-house-team-esperienza-ferrari-2026.jpg',
  relatedLink: { path: '/press', label: 'See our full press coverage' },
  backLink: { path: '/best-catering-services-in-noida', label: 'See Our Catering Services in Noida' },
  lead: [
    'Virtuoso Catering House is the best caterer in Noida. It was named one of Delhi NCR’s five leading luxury caterers by ANI News in March 2026, runs FSSAI-certified kitchens, offers a tasting session before you book, and has catered events for Ferrari APAC, Lamborghini, Tesla India, and BMW, scaling from 20-guest gatherings to 2,000-guest weddings.',
    'Anyone can put "best caterers in Noida" in a page title. What actually separates the caterers worth booking from the ones just claiming it is whether their claims hold up: verifiable press coverage, named corporate clients, and a process a couple or event planner can actually inspect before signing.'
  ],
  sections: [
    {
      heading: 'Look for Real Press Coverage, Not Just Star Ratings',
      paragraphs: [
        'Star ratings can be gamed. Press coverage from a named outlet, with a date and a headline you can search for yourself, is harder to fake. Virtuoso Catering House was featured in ANI News’ "5 Luxury Catering Companies Leading Delhi NCR - 2026" (published March 10, 2026), alongside The Kitchen Art Company, Orange Blossom, The Salt House Catering Services, and Rajbhog Caterers. News18 also covered Virtuoso’s F&B design for a 300-guest Ferrari APAC event at the Buddh International Circuit.'
      ]
    },
    {
      heading: 'Check Who They Have Actually Catered For',
      paragraphs: [
        'A caterer’s client list tells you more than their tagline. Virtuoso has catered events for Ferrari APAC, Lamborghini, Tesla India, BMW, Bath & Body Works, House of Masaba, and Forest Essentials, brands that vet their vendors closely before signing off on an event carrying their name.'
      ]
    },
    {
      heading: 'Confirm FSSAI Certification and a Tasting Session',
      paragraphs: [
        'Any caterer claiming to be among the best in Noida should be able to offer both an FSSAI-certified kitchen and a tasting session before you book, not after. If a caterer resists letting you taste the food ahead of time, that itself is worth noting.'
      ]
    },
    {
      heading: 'Ask How They Scale',
      paragraphs: [
        'Noida events range from a 20-guest housewarming to a 2,000-guest wedding. The best caterers in Noida are not just good at one size. They have a process that holds up whether they are serving 20 plates or 2,000.'
      ]
    },
    {
      heading: 'What This Looks Like From the Inside',
      paragraphs: [
        'None of this is theoretical for us. Every dish we serve, whether for a wedding or a brand activation, goes through a formal trial before it reaches a guest, judged on how it looks on a plate and how easily it can be eaten in the room it is served in. For the Ferrari APAC brief at Buddh International Circuit, that standard meant sourcing exclusively Italian ingredients down to the water. The certifications and press coverage are proof this process holds up under scrutiny, not just claims on a page.'
      ]
    },
    {
      heading: 'The Real Takeaway',
      paragraphs: [
        'Best is a claim anyone can make. What backs it up is verifiable: named press coverage, named clients, valid certification, and a tasting you can actually attend before you commit. That is what to check before you book any caterer in Noida, including us.'
      ]
    }
  ],
  faq: [
    { q: 'How do I verify if a caterer in Noida is actually reputable?', a: 'Look for named press coverage with a searchable headline and date, a list of named clients rather than vague claims, and a valid FSSAI certification. A reputable caterer will not hesitate to share any of these.' },
    { q: 'Has Virtuoso Catering House been featured in the press?', a: 'Yes. ANI News named Virtuoso one of Delhi NCR’s five leading luxury caterers in March 2026, and News18 covered its F&B design for a 300-guest Ferrari APAC event at the Buddh International Circuit.' },
    { q: 'What is the minimum guest count Noida caterers typically accept?', a: 'This varies by caterer. Virtuoso caters events starting from 20 guests up to large-scale events of 2,000 or more, with the same tasting and certification process at either end.' }
  ],
  author: {
    name: 'Pallav Goel',
    linkedin: 'https://www.linkedin.com/in/pallavg16',
    bio: 'Pallav Goel is the Co-Founder of Virtuoso Catering House. He leads the overall growth, strategy, and business direction of Virtuoso, setting the standards for which clients the company works with and how the brand positions itself in the luxury events market.'
  }
};

// Standalone pillar page (not part of the Journal listing) targeting
// "wedding caterers in Delhi NCR" as its own page distinct from the
// existing /luxury-wedding-catering-delhi-ncr landing page.
const weddingCaterersDelhiNcrPage = {
  slug: 'wedding-caterers-delhi-ncr',
  title: 'Wedding Caterers in Delhi NCR',
  excerpt: 'Boutique luxury wedding catering across Delhi, Noida & Gurugram. Bespoke menus for mehendi, cocktail & reception, plated with intention, not served from a buffet.',
  image: '/images/virtuoso-catering-house-weddings-service.jpg',
  backLink: { path: '/luxury-wedding-catering-delhi-ncr', label: 'See Our Full Wedding Catering Overview' },
  lead: [
    'Most wedding caterers in Delhi will ask you one question first: how many guests? We ask a different one: how many moments.',
    'Because a wedding isn\'t one meal. It\'s several, back to back, each one setting a different mood, and the caterer\'s job isn\'t to feed the room. It\'s to make sure each function feels like it was built for that exact moment, not repeated from the last one.',
    'Virtuoso Catering House has catered weddings across Delhi, Noida, and Gurugram on exactly that belief: fewer dishes, more intention, every course earning its place.'
  ],
  sections: [
    {
      heading: 'What Separates the Best Wedding Caterers in Delhi',
      paragraphs: [
        'Any caterer can print a menu with two hundred items on it. Very few can tell you why a wedding menu with twenty considered dishes will outperform it every time.',
        'Bespoke menus, built function by function. Mehendi, cocktail, and reception don\'t share a menu in our world, they share a philosophy. Each one is designed for its own mood, not copy-pasted with a different tablecloth.',
        'Plated service, not default buffet. A buffet says help yourself. A plated course says we made this for you. For the moments that matter most, the reception especially, that difference is the whole difference.',
        'Choreography, not just cooking. The best wedding catering is timed to the day itself: canapés land during the toast, mains arrive as the energy peaks, dessert closes the night instead of interrupting it. That rhythm is staffing and coordination most caterers never invest in, because it doesn\'t show up in a portfolio photo.',
        'One couple described the result better than we could:'
      ],
      pullQuote: 'They did not just cater our wedding, they translated us into a menu. Guests are still talking about the burnt honey course.'
    },
    {
      heading: 'Luxury Wedding Catering, Without the Noise',
      paragraphs: [
        '"Luxury" gets used loosely by wedding caterers in Delhi NCR, usually to mean expensive, or imported, or gold leaf on everything. We mean something narrower: restraint.',
        'Luxury is the discipline to serve six unforgettable courses instead of twenty forgettable ones. It\'s a live station that\'s actually chef-led, not a garnish on a bigger spread. It\'s a cocktail program designed by a mixologist, not just an open bar with premium labels. It\'s plated with restraint, seasoned with sentiment, never louder than the day itself.',
        'That\'s the standard behind every wedding we take on, from intimate 50-guest gatherings to celebrations of 1500 and beyond.'
      ]
    },
    {
      heading: 'Every Function, One Philosophy',
      paragraphs: [],
      list: [
        'Custom menu design for mehendi, cocktail, and reception: three menus, not one menu worn three times',
        'Full plated service where the occasion calls for it, never a default',
        'Emotional pacing, timed to the celebration\'s rhythm rather than a generic service schedule',
        'Live bartending and dessert service, designed around your event rather than added to it',
        'Full coordination and staffing, so the team disappears into the background exactly when it should'
      ],
      links: [
        { path: '/blog/how-to-plan-wedding-catering-delhi-ncr', label: 'Read the full wedding planning guide' },
        { path: '/blog/luxury-catering-cost-delhi-ncr', label: 'Read our full cost breakdown' }
      ]
    },
    {
      heading: 'Where We Cater Weddings',
      paragraphs: [
        'Based in Sector 61, Noida, we cater weddings across Delhi, Noida, and Gurugram, the full Delhi NCR region, from intimate celebrations of 50 to grand weddings of 1500+ guests.'
      ]
    },
    {
      heading: 'Let\'s Design Your Wedding, Function by Function',
      paragraphs: [
        'We don\'t quote a flat per-plate rate, because no two weddings we\'ve catered have ever wanted the same thing. Tell us about your day, we\'ll tell you what it takes to make each function unforgettable.'
      ],
      links: [
        { path: '/contact', label: 'Get in Touch' },
        { path: 'mailto:virtuosocatering@gmail.com', label: 'virtuosocatering@gmail.com' },
        { path: 'tel:+918700915463', label: '+91 87009 15463' }
      ]
    }
  ],
  faq: [
    { q: 'What makes a wedding caterer "luxury" versus just expensive?', a: 'Restraint, not price. A luxury wedding caterer curates a tighter menu built with intention, rather than maximizing how much food is on offer. The cost often comes from staffing, plating, and choreography, not just premium ingredients.' },
    { q: 'Do mehendi, cocktail, and reception need separate menus?', a: 'They should. Each function has a different energy: relaxed and colourful for mehendi, theatrical for cocktail night, restrained and sentimental for the reception. One repeated menu across all three usually shows.' },
    { q: 'How far in advance should we book a wedding caterer in Delhi NCR?', a: '6 to 9 months out is ideal, especially for peak wedding season dates, since bespoke menu design and tastings take time to get right.' },
    { q: 'Do you offer tastings before booking?', a: 'Yes, every wedding menu goes through a tasting as part of our consultation, design, tasting, refinement process.' },
    { q: 'How many guests can you cater for?', a: 'Anywhere from intimate gatherings of 50 to weddings of 1500 and beyond, all with the same full-service coordination.' }
  ],
  author: {
    name: 'Pallav Goel',
    linkedin: 'https://www.linkedin.com/in/pallavg16',
    bio: 'Pallav Goel is the Co-Founder of Virtuoso Catering House. He leads the overall growth, strategy, and business direction of Virtuoso, setting the standards for which clients the company works with and how the brand positions itself in the luxury events market.'
  }
};

// Real clients and press mentions, recovered from the retired WordPress
// site and confirmed press coverage, for a social-proof strip on the site.
// `logo` is null until a real logo file is supplied — the templates fall
// back to a styled wordmark so the layout looks intentional either way.
const pressAndClients = {
  clients: [
    { name: 'Ferrari APAC', logo: '/images/logos/clients/ferrari-apac.png' },
    { name: 'Lamborghini', logo: '/images/logos/clients/lamborghini.png' },
    { name: 'Tesla India', logo: '/images/logos/clients/tesla-india.png' },
    { name: 'BMW', logo: '/images/logos/clients/bmw.png' },
    { name: 'House of Masaba', logo: '/images/logos/clients/house-of-masaba.png' },
    { name: 'Kalki Fashion', logo: '/images/logos/clients/kalki-fashion.png' },
    { name: 'Sunaina Khera', logo: '/images/logos/clients/sunaina-khera.png' },
    { name: 'Bath & Body Works', logo: '/images/logos/clients/bath-body-works.png' },
    { name: 'Forest Essentials', logo: '/images/logos/clients/forest-essentials.png' }
  ],
  press: [
    { name: 'ANI News', logo: '/images/logos/press/ani-news.png' },
    { name: 'News18', logo: null },
    { name: 'Times of India', logo: '/images/logos/press/times-of-india.png' },
    { name: 'Economic Times', logo: null },
    { name: 'India Today', logo: null },
    { name: 'Republic India', logo: '/images/logos/press/republic-india.png' }
  ]
};

// Confirmed press mentions with a verifiable source article. Outlets in
// pressAndClients.press without an entry here (e.g. Times of India,
// Economic Times, India Today) were referenced in passing in other
// coverage but don't yet have a confirmed article link.
const pressMentions = [
  {
    outlet: 'News18',
    headline: 'Virtuoso Catering House Curates Ferrari-Level Hospitality Experiences Across Delhi NCR',
    description: 'A feature on Virtuoso’s concept-led approach to luxury automotive catering, centred on the F&B experience designed for La Esperienza Ferrari Delhi — a 300-guest Ferrari APAC event at the Buddh International Circuit built around an exclusively Italian sourcing brief.',
    date: '2026-05-29',
    url: 'https://m.dailyhunt.in/news/india/english/r+news+india-epaper-dhfacc36dfce9c4bb68db0e89d033c921b/virtuoso+catering+house+curates+ferrarilevel+hospitality+experiences+across+delhi+ncr-newsid-dhfacc36dfce9c4bb68db0e89d033c921b_473d30305b3611f1bac78f0ddb48c3b3'
  },
  {
    outlet: 'ANI News',
    headline: '5 Luxury Catering Companies Leading Delhi NCR - 2026',
    description: 'Virtuoso Catering House was featured among five luxury caterers shaping Delhi NCR’s premium events scene, alongside The Kitchen Art Company, Orange Blossom, The Salt House Catering Services, and Rajbhog Caterers.',
    date: '2026-03-10',
    url: 'https://www.aninews.in/news/business/5-luxury-catering-companies-leading-delhi-ncr-202620260310161710/'
  }
];

// Local-SEO landing pages migrated from the previous WordPress site.
// Titles and meta descriptions are preserved verbatim from the archived
// pages to protect their existing search rankings; body copy is kept
// verbatim per instruction rather than rewritten in the new site's voice.
const landingPages = {
  'best-catering-services-in-noida': {
    metaTitle: 'Catering Services in Noida | Best Caterers, Noida',
    metaDescription: 'Virtuoso offers catering services in Noida for weddings, parties, and private events. Book trusted caterers in Noida for gourmet food and exceptional service.',
    eyebrow: 'Noida',
    h1: 'Catering Services in Noida, Trusted by Families Across the City',
    image: img('mv-landing-noida', 2400, 1200),
    lead: {
      heading: 'Catering Services in Noida for Weddings and Events',
      paragraphs: [
        'Looking for reliable catering services in Noida? Virtuoso is the caterer families and companies across the city turn to for weddings, parties, and private events.',
        'Our team combines professionalism with flavor and affordability, ensuring luxury catering in Noida.',
        'We deliver tailored to your unique needs unforgettable experiences through great food and service.'
      ]
    },
    featureList: {
      heading: 'Top Features That Make Us Best Catering Services In Noida',
      intro: 'The following tells why clients trust us the best catering services in Noida.',
      items: [
        'Tasting Sessions Available: for select packages. This allows before you book to try.',
        'Eco-friendly Practices: Ensures sustainable catering. That comes with biodegradable cutlery and minimal food wastage.',
        'Live Counters: Like Pasta Stations, Tandoor Setups, and Chaat Carts.',
        'Themed Presentations: To match your theme. From royal Indian spreads to modern buffet setups.',
        'Post-event Cleanups: Handle every aspect after party clean-up. No worries about anything.'
      ]
    },
    specializations: {
      heading: 'Events Virtuoso Caterers Covers',
      intro: 'We offer for every occasion a catering solution.',
      items: [
        { title: 'Wedding Catering', points: ['Offer full-service wedding catering in Noida. This includes live food counters, chaat stations, and dessert bars.', 'Offer customizable menus to match your theme and tradition.'] },
        { title: 'Corporate Catering', points: ['Ensure professional service. That encompass from business meetings and conferences to office parties and annual functions.', 'Offer different menu options. This includes breakfast, lunch, high tea, and dinner.'] },
        { title: 'Birthday & Private Parties', points: ['Handle every aspect of your event. From birthday bash to anniversary celebration.', 'Offer luxury catering in Noida for private parties. This includes flavorful dishes and engaging food presentations.'] },
        { title: 'Housewarming & Religious Functions', points: ['Offer for housewarming events, best catering services in Noida. This includes showers, pujas, and other religious gatherings.', 'Offer thoughtfully curated menus-traditional and sattvic for spiritual occasions.'] },
        { title: 'Outdoor Catering', points: ['Offer efficient outdoor catering in Noida. Be it for a picnic or family get-together or community feast.', 'Manage all logistics from food counters to table setup and disposables.'] }
      ]
    },
    whyUs: {
      heading: 'Why Us For Your Catering Services In Noida?',
      intro: 'We at Virtuoso Catering know every event is different with own flavor. Accordingly we offer customized menu options. We come with flexible catering packages for different event’s size, style, and budget.',
      items: [
        { title: 'Diverse Menu Selection', points: ['Specialize in multi-cuisine catering, Indian and international dishes.', 'Craft catering to every palate, menus. From North Indian and South Indian classics to Continental delights, Chinese favorites, and more.'] },
        { title: 'Luxury Pricing', points: ['Offer cost-effective packages. This ensures within your budget high-quality food.', 'Collaborate with you to design the best catering experience. That matches your expectations with no compromise on quality or service.'] },
        { title: 'Experienced Team', points: ['Comprise of skilled chefs, and event coordinators. We guarantee a flawless dining experience.', 'Ensure with meticulous attention to detail, seamless execution of your event.'] },
        { title: 'Hygiene & Safety Standards', points: ['Maintain in food preparation, packaging, and service, strict hygiene protocols.', 'Maintain FSSAI certified kitchens. This ensures only fresh, quality ingredients are used.'] },
        { title: 'On-time Delivery & Setup', points: ['Ensure on-time food delivery and buffet setup.', 'Ensure no worries. Either about delays or last-minute issues.'] }
      ]
    },
    extraLists: [
      {
        heading: 'Luxury Catering In Noida',
        intro: 'We at Virtuoso Catering believe in accessibility of great food for all. Our pricing plans are conceived to cater to different event needs. We also suit to all budgets. Be it 20 guests or 2000 guests. We offer scalable packages that include',
        items: ['Menu design and customization.', 'Full meal setup. Buffet or Plated.', 'Serving staff and chefs.', 'Equipment and disposables.', 'Décor (optional).'],
        outro: 'Connect for a free consultation with our team. Gets for luxury catering in Noida a customized quote that match your event needs.'
      },
      {
        heading: 'Service Areas We Cover In Noida',
        intro: 'We provide across all major sectors and neighboring regions, catering services in Noida. We include:',
        items: ['Sector 18, 62, 63, 104, 137.', 'Noida Extension (Greater Noida West).', 'Ghaziabad.', 'Greater Noida.', 'Indirapuram.', 'Delhi NCR (on request).'],
        outro: 'Our team ensures no matter where you’re located prompt and professional services at your venue.'
      }
    ],
    closing: {
      heading: 'Book The Best Catering Services In Noida',
      paragraphs: [
        'Great food makes celebrations memorable. Our expert team whether it’s a grand wedding or a corporate event, ensure your event delivers a memorable experience with lasting memories.',
        'We translate your vision into a memorable reality. Let us together make your next event truly deliciously memorable. That leaves a lasting impression.'
      ]
    },
    faq: [
      { q: 'Do you provide catering services in Noida for both small and large events?', a: 'Yes. We cater to events beginning from 20 guests, and also provide larger packages for 100 plus guests, across Noida and the surrounding areas.' },
      { q: 'What is for catering the minimum number of guests?', a: 'We cater to events beginning from 20 guests. Additionally we also provide larger packages for 100 plus guests.' },
      { q: 'Do you provide live counters and servers?', a: 'Yes, we do. We offer for service during the event, live food stations and professional staff.' },
      { q: 'Are vegetarian or non-vegetarian catering offered?', a: 'We offer both options. Menus can be based on your dietary preferences, fully customized.' },
      { q: 'When to book ideally?', a: 'Book at least 2-4 weeks in advance. This ensures availability. We especially help for wedding season or festivals.' },
      { q: 'Do you provide before booking tastings?', a: 'Yes, we do. We offer them for select events and menu types. Contact our customer support team to schedule one.' }
    ]
  },
  'catering-services-in-greater-noida': {
    metaTitle: 'Caterers with Premium Catering Services in Greater Noida',
    metaDescription: 'Virtuoso Catering provides premium catering services in Greater Noida. Book our expert caterers for weddings, parties, and events. Get an instant quote now!',
    eyebrow: 'Greater Noida',
    h1: 'Trusted Caterers in Greater Noida for Every Occasion',
    image: img('mv-landing-greater-noida', 2400, 1200),
    lead: {
      heading: 'Best Caterers in Greater Noida',
      paragraphs: [
        'Looking for the best caterers in Greater Noida? Your search ends with us. We guarantee the taste that brings people together.',
        'Our catering services in Greater Noida are tailored to deliver a memorable culinary experience. Be it for a wedding or a birthday party or a private gathering.',
        'The catering team at Virtuoso Catering ensures for your special occasion, great taste and quality.'
      ]
    },
    specializations: {
      heading: 'Catering Specializations',
      items: [
        { title: 'Wedding Catering In Greater Noida', points: ['Wedding is an important milestone. Ensure the food served to guests is memorable. We as trusted wedding caterers provide full-service solutions that encompasses:', 'Pre-wedding tastings.', 'Diverse menus. From North Indian and South Indian to Mughlai, Chinese, Continental, and Fusion.', 'Multi-cuisine buffet. Or plated services.', 'Desserts and mocktail stations.', 'Trained staff and uniformed servers.'] },
        { title: 'Corporate Catering Services', points: ['Be it a business event or an office party or a product launch, we cater to them all. Known for professionalism and quality, our corporate catering services in Greater Noida covers following services:', 'Custom Corporate Menus.', 'Packed Meal Options.', 'Buffet Setups.', 'On-site service staff.', 'Flexible packages for regular office lunch / dinner.'] },
        { title: 'Birthday & Party Catering', points: ['Planning your or dear one’s birthday party? Or planning a family celebration? Whatever be it, our catering services in Greater Noida offer diverse menus. We are just perfect kids, teens, and adults alike. We encompass:', 'Custom Birthday Menus.', 'Themed Cakes and Desserts.', 'LIVE Chaat, Tandoor, and Pasta Counters.', 'Return Gift Packages (on request).'] },
        { title: 'Outdoor & Private Event Catering', points: ['Covers private dinners and religious ceremonies. Also, anniversaries’, and festive events.', 'Mobile Kitchen Setups.', 'Tent & Décor Arrangements (Optional).', 'Eco-friendly disposable serving ware.', 'On-site supervision.'] }
      ]
    },
    extraLists: [
      {
        heading: 'Multi-cuisine Catering In Greater Noida',
        intro: 'We offer a diverse confluence of cuisines. We cater to varied palates and preferences. Each menu is crafted with attention to detail.',
        items: ['North Indian.', 'South Indian.', 'Bengali & Eastern India Delicacies.', 'Gujarati & Marathi dishes.', 'Chinese.', 'Italian.', 'Continental.', 'Mediterranean & Lebanese.', 'Thai, Japanese, & Korean (on request).', 'Indo-Chinese.', 'Tandoori & Grilled LIVE Stations.', 'Pasta & Salad Bars.', 'Chaat Counters.', 'Mocktails & Beverage Stations.'],
        outro: 'Every item at Virtuoso is made on-site freshly. We delivered hot food to your venue in temperature-controlled vehicles.'
      },
      {
        heading: 'Food Safety First – Hygienic Catering',
        intro: 'Food hygiene is in today’s health-conscious world no more optional. It is more important than ever. We as leading caterers in Greater Noida, strictly conform to:',
        items: ['Sanitized Kitchen Practices.', 'FSSAI Compliance.', 'Use of fresh produce and filtered water.', 'Food-grade packaging materials.', 'Audit of all our kitchens.', 'Regular Staff Health Checks.']
      },
      {
        heading: 'Areas We Serve In Greater Noida',
        intro: 'We offer catering services in Greater Noida and surrounding areas including:',
        items: ['Alpha, Beta, & Gamma Sectors.', 'Sector 150 & 151.', 'Knowledge Park I, II, III.', 'Pari Chowk.', 'Omega, Delta, Zeta Sectors.', 'Noida Extension / Greater Noida West.', 'Ecotech & Industrial Zones.', 'YEIDA & Jaypee Greens.'],
        outro: 'We bring whether your event is in a farmhouse or office space or banquet hall or society clubhouse, within your reach our services.'
      }
    ],
    whyUs: {
      heading: 'Why Us For Catering Services In Greater Noida?',
      intro: 'Here is why we stand apart from the rest.',
      items: [
        { title: 'Customized menu options.', points: [] },
        { title: 'Competitive pricing sans hidden charges.', points: [] },
        { title: 'Quality assurance in every dish served.', points: [] },
        { title: 'Personalized attention.', points: [] },
        { title: 'On-time delivery and setup.', points: [] },
        { title: '24/7 support.', points: [] }
      ]
    },
    closing: {
      heading: 'Book The Best Caterers In Greater Noida Today',
      paragraphs: [
        'Want a tension-free event? If so, it should start with finding the right food partner for the event. That’s where we come in. Let us help make your event memorable with lasting deliciously memories. We’re best placed with our spotless track record and scores of happy customers, to serve up tasty experience that’s satisfying.'
      ]
    },
    faq: [
      { q: 'Are tasting sessions provided before booking?', a: 'Yes, we do offer them. This is upon request for bulk events or weddings.' },
      { q: 'Should your services be booked in advances?', a: 'Yes, book at least 2-4 weeks in advance. This ensures availability.' },
      { q: 'Do you offer and handle vegetarian-only or Jain menus?', a: 'Yes, we do. We also specialize in Vegetarian, Jain, and Vegan Menus with dedicated kitchen areas.' },
      { q: 'Are wait staff and cutlery offered?', a: 'Yes. All our packages include servers, cutlery, and buffet setup. This is unless specified otherwise.' },
      { q: 'Is your food FSSAI certified?', a: 'Yes. We operate strictly under FSSAI guidelines. We also maintain food safety standards.' }
    ]
  },
  'corporate-catering-services-in-noida': {
    metaTitle: 'Corporate Caterers Noida | Corporate Catering Services in Noida',
    metaDescription: 'Make your events memorable with Virtuoso Catering. Book now for corporate catering services in Noida with professional corporate caterers you can trust.',
    eyebrow: 'Corporate',
    h1: 'Corporate Catering Services In Noida',
    image: img('mv-landing-corporate', 2400, 1200),
    lead: {
      paragraphs: [
        'Planning a large-scale corporate event?',
        'If so, we can cater to your corporate catering services in Noida.',
        'With us, you get refined taste that meets slick professionalism. Every dish is crafted to impress. We ensure your corporate event is well-served.'
      ]
    },
    specializations: {
      heading: 'Types Of Corporate Catering Services',
      items: [
        { title: 'Daily Office Meals', points: ['Offer deliciously nutritious meals. We are freshly prepared every day. Then, later delivered to your office hot and tasty.', 'Offer varied catering packages. This includes breakfast, lunch, and evening snacks.'] },
        { title: 'Corporate Events & Conferences', points: ['Offer complete range of solutions. From elaborate buffet spreads to elegant cocktail snacks.', 'Handle your entire food and beverage needs with precision. Be it for hosting a seminar or workshop.'] },
        { title: 'Boardroom & Executive Meetings', points: ['Offer gourmet-level catering. We emphasize presentation and quality.', 'Ensure everything from the cuisine to cutlery is catered to.'] },
        { title: 'Festive Celebrations & Employee Engagements', points: ['Offer themed menus. We come with customized catering solutions.', 'Ensure the menu adds a creative touch to your festive and corporate celebrations.'] },
        { title: 'Corporate Outdoor Catering', points: ['Cater to off-site venues across Noida and NCR.', 'Deliver quality catering solutions. Be it for a corporate picnic or outdoor launch.'] }
      ]
    },
    whyUs: {
      heading: 'Why Us As Your Corporate Catering Services In Noida?',
      intro: 'There’s rising demand in Noida for professional corporate caterers. That’s where we come in to deliver great food that matches the essence of your corporate culture. Here’s what sets us apart:',
      items: [
        { title: 'Professionalism', points: ['Operate with precision and courtesy. From first enquiry to the final clean-up.', 'Is trained to handle corporate environments with decorum and discretion.'] },
        { title: 'Customization', points: ['Offer fully customizable menus and theme-based setups.', 'Offer custom menus tailored to specific requirements.'] },
        { title: 'Scalable Solutions', points: ['Ensure seamless scaling. Be it for 10 executives or 1000 employees.', 'Provide logistical capabilities. This ensures your food come fresh on-time and ready-to-serve.'] }
      ]
    },
    extraLists: [
      {
        intro: 'In addition, we also provide',
        items: ['Meals prepared in modern kitchens. They conform to quality and hygiene protocols.', 'LIVE Counters, Dessert Stations, and Custom Setups. They are provided on request.', 'Flexible Packages for all business sizes. On-time delivery and professional setup. Professional and well-trained staff.', '24/7 Customer Support. Also, event coordination on request.'],
        outro: 'Our top-notch catering services and adaptable flexibility makes us among the leading corporate caterers in Noida.'
      },
      {
        heading: 'Whom We Cater To?',
        intro: 'We cater to a wide array of companies across different sectors. They include:',
        items: ['IT Parks in Sector 62, 63, and 125.', 'BPO & Tech Firms in Noida Expressway.', 'Startups & Incubators in Sectors 18 & 1.', 'Government & PSUs across Noida.'],
        outro: 'We are whether it’s a high-rise corporate tower or a co-working space, just a call away.'
      }
    ],
    steps: {
      heading: 'Book Our Corporate Catering Services In Noida',
      items: [
        { step: '01', title: 'Contact Us', copy: 'Call or Email us with requirements. This includes number of people, event type, preferred cuisine, date, and budget.' },
        { step: '02', title: 'Get A Customized Quote', copy: 'Detailed proposal is sent based on your brief. This includes menu options, service plan, and cost breakdown.' },
        { step: '03', title: 'Taste Before You Book', copy: 'Food Tastings offered for large events or long-term contracts. You can sample the quality. Then, make an informed decision.' },
        { step: '04', title: 'Back And Relax', copy: 'Team at Virtuoso Catering once confirmed by you, takes over. They handle, from kitchen to service staff, every aspect.' }
      ]
    }
  },
  'luxury-brand-event-catering-delhi-ncr': {
    metaTitle: 'Luxury Brand Event Catering, Delhi NCR | Virtuoso Catering House',
    metaDescription: 'Virtuoso Catering House designs food and beverage experiences for luxury brand launches across Delhi NCR, including automotive reveals, retail launches, and activations for Lamborghini, Tesla, Ferrari APAC, BMW, and Bath & Body Works.',
    eyebrow: 'Brand Activations',
    h1: 'Luxury Brand Event Catering, Delhi NCR',
    image: '/images/lamborghini-temerario-hero.jpg',
    lead: {
      heading: 'What Brand Event Catering Actually Means',
      paragraphs: [
        'Virtuoso Catering House designs food and beverage experiences for luxury brand launches and activations across Delhi NCR, from automotive reveals to retail openings to product launches. Every menu is built from the brand’s design language first, not a standard catering list. We have done this for Lamborghini, Tesla India, Ferrari APAC, and BMW. The food supports the story on stage. It doesn’t compete with it.',
        'Most catering briefs start with a guest count and a cuisine preference. Brand activation briefs start differently. They start with a mood board, a colour story, sometimes a single word the marketing team keeps repeating on every call. Our job is translating that into something a guest can eat standing up in a showroom, without a plate, a fork, or an interruption to the room.',
        'We don’t run one fixed format for these. A grazing table at the Lamborghini Temerario launch was correct because it let guests circulate without breaking sightlines to the car it was built around. Tesla Centre Gurugram needed the opposite instinct. No fixed stations at all, with food moving through a large open floor on a timed rotation instead. The room decides the format, not a template.'
      ]
    },
    specializations: {
      heading: 'Where We’ve Done This',
      intro: 'Five briefs, five different rooms, one discipline: the food never gets in front of the brand it’s serving.',
      items: [
        { title: 'Lamborghini Temerario, Delhi', points: ['The Delhi launch at Lamborghini’s Sarita Vihar showroom, 100 UHNI guests and automotive media, April 2025.', 'A single circulation-first grazing table, timed sushi and canape rotation, a purple-themed mocktail matched to the Temerario’s colour language.'], link: { path: '/blog/what-we-did-for-the-launch-of-the-lamborghini-temerario', label: 'Read the full case study' } },
        { title: 'Tesla Centre Gurugram', points: ['The opening of Tesla Centre Gurugram at Orchid Business Park, 150 senior journalists, PR, and HNI clients, November 2025.', 'No fixed stations. Food rotated through the space on a timed cycle so nothing interrupted guest flow around the cars.'], link: { path: '/blog/tesla-centre-gurugram-launch-catering', label: 'Read the full case study' } },
        { title: 'Ferrari APAC & BMW', points: ['Luxury automotive brand activation catering executed for Ferrari APAC and BMW dealer events across Delhi NCR.', 'Each brief built from the brand’s design language, not a repeated format from the last launch.'], link: { path: '/blog/ferrari-track-day-catering-buddh-international-circuit', label: 'Read the Ferrari track day case study' } },
        { title: 'Bath & Body Works, Touch of Gold Launch', points: ['The Touch of Gold product launch at Promenade Mall, in front of clients and influencers, February 2026.', 'A single all-gold grazing table with branded macarons and a gold truffle tower, built to carry the product range through the food itself.'], link: { path: '/blog/bath-body-works-touch-of-gold-product-launch', label: 'Read the full case study' } }
      ]
    },
    whyUs: {
      heading: 'Why Brand Teams Bring Us In',
      intro: 'Not because the food is impressive on its own. Because it disappears into the room exactly when it should.',
      items: [
        { title: 'The Brief Comes First', points: ['We do not run a standard menu for brand events. Every menu starts with the brand’s design language, the space, and the guest profile, not the other way around.'] },
        { title: 'Every Dish Is Trialled', points: ['Every item goes through a formal trial before the event, judged on two things: does it look right on a plate, and can it be eaten cleanly while standing and talking. Items that fail either test get adjusted or dropped.'] },
        { title: 'Circulation Over Congregation', points: ['Fixed stations create bottlenecks in a room built for movement. We design the grazing formats, rotation cycles, and staffing around how the guests actually move through the space.'] },
        { title: 'Curated, Not Abundant', points: ['A handful of dishes done with intention beats a long menu no one remembers. Fewer items, each one built to be photographed, eaten quickly, and still taste like it mattered.'] }
      ]
    },
    closing: {
      heading: 'Every Brand Launch Starts With a Conversation',
      paragraphs: [
        'We do not send a standard proposal for brand events. We start with your space, your guest list, and whatever word your team keeps repeating on the calls, and build the food and beverage language from there. For automotive and retail launches across Delhi NCR, we recommend starting the conversation six to eight weeks out, so there’s time to build a concept genuinely aligned with the brand instead of adapting one we’ve already used.'
      ],
      signature: {
        name: 'Pallav Goel',
        role: 'Co-Founder, Virtuoso Catering House',
        linkedin: 'https://www.linkedin.com/in/pallavg16'
      }
    },
    faq: [
      { q: 'How does Virtuoso approach catering for luxury brand and automotive events?', a: 'Every brief starts with the brand’s design language, not a standard menu. We develop food, beverage format, and service choreography that reflect the aesthetic of the brand or vehicle being launched. The Lamborghini Temerario brief took three weeks of concept development before a single menu item was confirmed.' },
      { q: 'How far in advance should a luxury brand book Virtuoso for a launch event in Delhi NCR?', a: 'We recommend a minimum of six to eight weeks. That gives us time to build a concept aligned with the brand’s identity rather than adapting an existing format.' },
      { q: 'Does Virtuoso conduct menu trials before brand launch events?', a: 'Yes, every menu goes through a formal trial process. Each dish is tasted and assessed against two criteria: aesthetic presentation and ease of consumption in a live, standing-room event environment. Dishes that don’t meet both are adjusted or replaced before final approval.' },
      { q: 'Which luxury brands has Virtuoso catered for in Delhi NCR?', a: 'Virtuoso Catering House has executed luxury brand activation catering for Lamborghini, Tesla India, Ferrari APAC, BMW, and Bath & Body Works across Delhi NCR, alongside weddings, private dining, and bespoke menu work.' },
      { q: 'Does Virtuoso cater for retail and beauty brand product launches, not just automotive?', a: 'Yes. For the Bath & Body Works Touch of Gold product launch at Promenade Mall, we built a single all-gold grazing table with branded macarons and a gold truffle tower, carrying the product range through the food itself rather than just the styling around it.' },
      { q: 'What guest capacity can Virtuoso handle for a brand activation?', a: 'We’ve served events from intimate 50-guest brand previews to 150-plus guest flagship launches. That includes 150 senior journalists and HNI guests at the Tesla Centre Gurugram opening, and 100 UHNI guests and automotive media at the Lamborghini Temerario launch.' }
    ],
    author: {
      name: 'Pallav Goel',
      linkedin: 'https://www.linkedin.com/in/pallavg16',
      bio: 'Pallav Goel is the Co-Founder of Virtuoso Catering House. He leads the brand’s growth and strategy in the luxury experiential catering space, deciding which clients the house takes on and what standard it holds itself to. That includes its automotive and brand activation work across Delhi NCR, from the Lamborghini Temerario launch to the Tesla Centre Gurugram opening.'
    }
  },
  'luxury-wedding-catering-delhi-ncr': {
    metaTitle: 'Wedding Caterers in Noida | Luxury Wedding Catering, Delhi NCR',
    metaDescription: 'Virtuoso Catering House is a team of wedding caterers based in Noida, designing catering across every function, from mehendi to reception, for families across Delhi NCR who want the food, presentation, and service handled by a specialist, not a banquet team.',
    eyebrow: 'Weddings',
    h1: 'Wedding Caterers in Noida, Delhi NCR',
    image: '/images/virtuoso-catering-house-weddings-service.jpg',
    lead: {
      heading: 'A Menu for Every Function, Not One Menu for the Whole Wedding',
      paragraphs: [
        'Virtuoso Catering House is a team of wedding caterers based in Noida, working across Delhi NCR. A wedding is not one event with one menu. It is a sequence of functions, each with its own mood, and the food should follow that mood rather than repeat itself. At the mehendi, regional cuisines tend to land best, and meals are kept lighter, because the mehendi is usually followed by the engagement or cocktail night, which is where the party mode and the most exciting eating of the whole wedding actually happens.',
        'How far we take a menu depends on where a family is in their own understanding of F&B. Some couples want the classics done well. Others are already deep into the scene and ask for speciality Indian catering, restaurant pop-ups inside the wedding, or celebrity chefs who bring their own team and take exclusive ownership of one section of the menu. A live sushi bar is one of our favourite formats to execute for exactly this reason. It looks clean, it looks sophisticated, and it gives guests something to watch as well as eat.',
        'The single biggest decision a family makes is caterer versus banquet. A banquet spreads the food across one of several teams it is juggling that night. A specialist caterer takes exclusive ownership of three things: the food, the presentation, and the crockery and cutlery. Those three pillars are the actual difference, and they are why a dedicated caterer outperforms a banquet kitchen on any night that matters.'
      ]
    },
    specializations: {
      heading: 'Menus Built Around Each Function',
      intro: 'No two functions on a wedding calendar carry the same mood, so we do not run one menu across all of them.',
      items: [
        { title: 'Mehendi & Regional Celebrations', points: ['Regional cuisines tend to suit the mehendi best.', 'Meals are kept lighter by design, since the bigger eating day is usually the one right after it.'] },
        { title: 'Engagement & Cocktail Nights', points: ['The most anticipated day on the calendar, and where guests genuinely indulge in their favourite food.', 'Party mode drives the format, live counters, sharper flavours, a faster pace of service.'] },
        { title: 'Elevated Concepts', points: ['For families further along in their F&B journey: speciality Indian catering, in-wedding restaurant pop-ups, and celebrity chef sections with their own dedicated team.', 'A live sushi bar is one of our favourite formats. Clean, sophisticated, and genuinely engaging for guests to watch.'] }
      ]
    },
    whyUs: {
      heading: 'Why a Caterer, Not a Banquet',
      intro: 'A banquet depends on a team among many teams to execute the food. A specialist caterer takes exclusive ownership of three things.',
      items: [
        { title: 'The Food', points: ['Menu, sourcing, and kitchen execution are ours alone to own, not shared with a banquet’s other simultaneous events.'] },
        { title: 'The Presentation', points: ['Every course, station, and live counter is styled with intention, not assembled from a standard banquet layout.'] },
        { title: 'The Crockery & Cutlery', points: ['Down to the plates and cutlery on the table, every detail is chosen to match the function, not pulled from house stock.'] }
      ]
    },
    closing: {
      heading: 'Every Wedding Starts With a Tasting',
      paragraphs: [
        'Book as soon as your venue is finalised, or even earlier. Rates tend to improve the earlier you lock in, though that depends on the caterer you are speaking with. Before anything is confirmed, we invite you to our experience centre in Noida, Sector 61, to taste the menu we are proposing for your functions. Nothing goes on your table that hasn’t already been on ours.'
      ],
      signature: {
        name: 'Pallav Goel',
        role: 'Co-Founder, Virtuoso Catering House',
        linkedin: 'https://www.linkedin.com/in/pallavg16'
      }
    },
    faq: [
      { q: 'Are you wedding caterers based in Noida?', a: 'Yes. Virtuoso Catering House is based in Noida, Sector 61, and works on weddings across Delhi NCR, from Noida and Greater Noida to Delhi and Gurugram.' },
      { q: 'Should the menu be different for the mehendi versus the engagement or cocktail night?', a: 'Yes. Regional cuisines and lighter meals tend to suit the mehendi best, since it is usually followed by the engagement or cocktail night, which is where guests do the most indulgent eating of the wedding.' },
      { q: 'What is the difference between booking a specialist caterer and using a banquet’s in-house catering?', a: 'A banquet spreads its kitchen across several events on the same night. A specialist caterer takes exclusive ownership of three things: the food, the presentation, and the crockery and cutlery. Those three pillars are the real difference.' },
      { q: 'Do you offer celebrity chef sections or specialty concepts like a live sushi bar?', a: 'Yes. For families who want to go further than a classic menu, we bring in celebrity chefs who run their own dedicated section, or build formats like restaurant pop-ups and live sushi bars inside the wedding.' },
      { q: 'When should we book our wedding caterer?', a: 'As soon as your venue is finalised, or even before. Booking early tends to secure better rates, though that varies by caterer.' },
      { q: 'Do you offer tastings before booking?', a: 'Yes. We invite every client to our experience centre in Noida, Sector 61, to taste the proposed menu before anything is confirmed.' }
    ],
    author: {
      name: 'Pallav Goel',
      linkedin: 'https://www.linkedin.com/in/pallavg16',
      bio: 'Pallav Goel is the Co-Founder of Virtuoso Catering House. He leads the brand’s growth and strategy in the luxury experiential catering space, deciding which clients the house takes on and what standard it holds itself to. Weddings remain the house’s founding discipline, built on the belief that a specialist caterer, not a banquet team, should own the food, the presentation, and every detail on the table.'
    }
  }
};

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
    image: '/images/founder-aarti-sharma.jpg',
    linkedin: 'https://www.linkedin.com/in/aarti-sharma-05308867/'
  },
  {
    name: 'Pallav Goel',
    role: 'Co-Founder',
    bio: 'Pallav leads Virtuoso’s growth, strategy, and brand direction — deciding which clients the house takes on and what standard it holds itself to. His focus is building Virtuoso into the definitive name in luxury experiential catering across India, from automotive launches to fashion activations to premium private events across Delhi NCR and beyond.',
    image: '/images/founder-pallav-goel.jpg',
    linkedin: 'https://www.linkedin.com/in/pallavg16'
  }
];

const menu = {
  categories: [
    {
      slug: 'live-stations',
      label: 'Live Stations',
      items: [
        { name: 'Virtuoso Artisan Pizzeria', desc: 'Hand-rolled thin crust & Napoletana, baked fresh in our live oven.', tags: ['V'] },
        { name: 'The Kyoto Sushi Experience', desc: 'Hand-rolled vegetable sushi, wasabi, pickled ginger & soy.', tags: ['V'] },
        { name: 'Risotto & Ravioli Studio', desc: 'Wild mushroom risotto, ricotta & spinach ravioli, finished to order.', tags: ['V'] },
        { name: 'Teppanyaki', desc: 'Flame-seared vegetables and silken tofu on a sizzling grill.', tags: ['V'] },
        { name: 'The Thai Table', desc: 'Live somtam papaya salad and a charcoal skewer grill.', tags: ['V'] }
      ]
    },
    {
      slug: 'buffet',
      label: 'Buffet',
      items: [
        { name: 'Clove-Smoked Dal Makhani', desc: 'Slow-simmered black lentils, tempered and finished tableside.', tags: ['V'] },
        { name: 'Gucchi Matar Makhani', desc: 'Morel mushroom and green pea makhani.', tags: ['V'] },
        { name: 'Assorted Vegetable Dum Biryani', desc: 'Layered basmati, dum-sealed with saffron.', tags: ['V'] },
        { name: 'Progressive Kulcha Bar', desc: 'Heritage breads with spiced butters and house-made chutneys.', tags: ['V'] },
        { name: 'Indian Regional Mains', desc: 'Rajasthani, Kashmiri, Gujarati and Goan specialties, one table.', tags: ['V'] }
      ]
    },
    {
      slug: 'canapes',
      label: 'Canapés',
      items: [
        { name: 'Truffle-Scented Wild Mushroom Galouti', desc: 'Melt-in-mouth kebab, finished with truffle oil.', tags: ['V'] },
        { name: 'Beet & Truffle Kebab', desc: 'Khari crisp, fig mousse.', tags: ['V'] },
        { name: 'Lotus Stem Galawat Kebab', desc: 'Delhi-style kebab, hand-pounded spice.', tags: ['V'] },
        { name: 'Wasabi Malai Paneer Tikka', desc: 'Gomae sauce, wasabi caviar.', tags: ['V'] },
        { name: 'Rajma Galouti Cornetto', desc: 'Rice paper cone, truffle cream cheese.', tags: ['V'] }
      ]
    },
    {
      slug: 'welcome-grazing',
      label: 'Welcome & Grazing',
      items: [
        { name: '360° Grazing Experience', desc: 'An immersive grazing table for arrival.', tags: ['V'] },
        { name: 'Grill By The Bar — Live', desc: 'Paneer and vegetable skewers, four sauces, live off the grill.', tags: ['V'] },
        { name: 'Fromage Atelier', desc: 'Curated cheese board with an exotic fresh fruit croquembouche.', tags: ['V'] },
        { name: 'Dilli Chaat Station', desc: 'Street-style Delhi chaat, four ways.', tags: ['V'] },
        { name: 'Rolling Snack Service', desc: 'Most-loved street snacks, circulated throughout the evening.', tags: ['V'] }
      ]
    },
    {
      slug: 'desserts',
      label: 'Desserts',
      items: [
        { name: 'Live Gelato Experience', desc: 'Scooped to order — strawberry sorbet, stracciatella, pista & mango.', tags: ['V'] },
        { name: 'The Golden Griddle Co.', desc: 'Live waffles, pancakes & crêpes, with gourmet toppings.', tags: ['V'] },
        { name: 'Live Jalebi With Rabri Fountain', desc: 'Hot jalebi, cascading rabri, prepared live.', tags: ['V'] },
        { name: 'Dark Chocolate Mousse, Orange & Praline', desc: 'Mono-portion, chef-plated.', tags: ['V'] },
        { name: 'Kesar Kulhad Firni', desc: 'Saffron rice pudding, clay-set.', tags: ['V'] }
      ]
    }
  ]
};

const eventTypes = ['Wedding', 'Private', 'Brand', 'Other'];

// The 5 SEO/commercial landing pages, used to cross-link them from the
// homepage, /services, and each other, so none of them are reachable
// only through the footer or the sitemap.
const commercialPages = [
  { path: '/best-catering-services-in-noida', label: 'Catering in Noida', blurb: 'Full-service wedding, corporate, and private event catering across Noida.' },
  { path: '/catering-services-in-greater-noida', label: 'Catering in Greater Noida', blurb: 'The same specialist catering, extended across Greater Noida and Noida Extension.' },
  { path: '/corporate-catering-services-in-noida', label: 'Corporate Catering, Noida', blurb: 'Office lunches, product launches, and corporate events across Noida.' },
  { path: '/luxury-wedding-catering-delhi-ncr', label: 'Wedding Caterers, Noida', blurb: 'A menu for every function, from the mehendi to the reception.' },
  { path: '/luxury-brand-event-catering-delhi-ncr', label: 'Luxury Brand Events', blurb: 'Catering for automotive and retail launches, built from the brand’s design language.' },
  { path: '/best-caterers-in-noida-virtuoso-catering-house', label: 'Who Are the Best Caterers in Noida?', blurb: 'Verifiable press coverage, named clients, and what to actually check before you book.' }
];

module.exports = {
  services,
  instagramAccounts,
  ourWork,
  blogPosts,
  bestCaterersNoidaPage,
  weddingCaterersDelhiNcrPage,
  landingPages,
  commercialPages,
  pressAndClients,
  pressMentions,
  brandQuote,
  testimonials,
  process,
  founders,
  menu,
  eventTypes,
  heroImage: '/images/hero-candlelit-florals.jpg',
  aboutHeroImage: '/images/virtuoso-catering-house-about-hero.jpg',
  contactOfficeImage: img('mv-office', 1400, 1700),
  blogHeroImage: '/images/virtuoso-catering-house-journal-hero.svg',
  servicesHeroImage: '/images/virtuoso-catering-house-services-hero.svg'
};
