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
  },
  {
    slug: 'what-we-did-for-the-launch-of-the-lamborghini-temerario',
    url: '/blog/what-we-did-for-the-launch-of-the-lamborghini-temerario',
    title: 'How We Designed an F&B Experience That Felt Like the Car',
    excerpt: 'Virtuoso Catering House designed and executed the complete hospitality experience for the Delhi launch of the Lamborghini Temerario, a grazing table built for circulation, not congregation.',
    date: '2026-05-22',
    image: '/images/lamborghini-temerario-hero.jpg',
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
    slug: 'how-to-plan-wedding-catering-delhi-ncr',
    title: 'How to Plan Wedding Catering in Delhi NCR: A Practical Guide',
    excerpt: 'A practical guide to planning wedding catering in Delhi NCR, from matching the menu to each function’s mood to knowing when a specialized caterer actually outperforms a banquet kitchen.',
    date: '2026-07-08',
    image: img('mv-blog-wedding-guide', 1200, 800),
    lead: [
      'Most couples do not need a fixed price list. They need to know how to think about the decision. The right wedding catering setup depends less on a formula and more on how initiated the family is into food, and on matching every function, from the mehendi to the wedding day itself, to its own mood rather than repeating the same menu four times.'
    ],
    sections: [
      {
        heading: 'Match the Menu to the Day, Not Just the Guest List',
        paragraphs: [
          'A wedding is not one event. It is a sequence of them, and each one carries its own energy. The mehendi is usually followed by the engagement or cocktail, which tends to be the most exciting day of the entire celebration. That changes what should be served. Regional cuisines do well at the mehendi, and meals are generally kept lighter, because guests are pacing themselves for what comes next.',
          'The engagement is where people actually indulge. Guests are in full celebration mode, and this is usually the day families are most willing to explore favourite dishes and more ambitious formats. Planning the same heavy, elaborate menu across every function misses this rhythm entirely.'
        ]
      },
      {
        heading: 'How Much F&B Knowledge Does the Family Bring In?',
        paragraphs: [
          'The single biggest factor in how a wedding menu comes together is not the budget. It is how initiated the decision makers are into food. Some families want a small number of true favourites, done well, with a setup that matches the vibe and theme of the party. Others arrive already fluent in what is possible.',
          'Families further along that curve ask for speciality Indian catering, restaurant pop up concepts inside the wedding, and sometimes a celebrity chef for a single section of the event. Celebrity chefs typically bring their own team and take ownership of the planning and menu for that one section only, while everything else runs alongside it. A sushi bar is one of the cleanest examples. Done well, it looks sophisticated and restrained in a way a standard live counter does not.'
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
          'Book as soon as the venue is finalised, and ideally before. Rates can move once a date is set, though how much depends entirely on the caterer being considered. Waiting until closer to the date narrows both the menu options and the team available to execute them properly.'
        ]
      },
      {
        heading: 'What the Tasting Process Actually Looks Like',
        paragraphs: [
          'Every engagement starts with a private tasting. For Virtuoso, that means inviting clients to our experience centre in Noida, Sector 61, where the menu can be tasted and refined before anything is finalised. It is easier to adjust a dish on a plate in front of you than to describe it over a call.'
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
      { q: 'How far in advance should I book a wedding caterer in Delhi NCR?', a: 'As soon as your venue is finalised, and ideally even before. Rates and availability can shift once a date is confirmed, though this depends on the specific caterer you are working with.' },
      { q: 'What is the difference between a wedding caterer and banquet catering?', a: 'A banquet’s food is handled by one team among several the venue runs simultaneously. A specialized caterer’s exclusive focus is the food, which shows up in three places specifically: the food itself, the presentation, and the crockery and cutlery.' },
      { q: 'Should the menu be the same across all wedding functions?', a: 'No. Each function has its own mood. The mehendi is typically followed by the engagement or cocktail, the most exciting day of the celebration, so mehendi menus tend to favour lighter, regional dishes while engagement menus can be more indulgent and ambitious.' },
      { q: 'Do you offer celebrity chef or specialty catering concepts for weddings?', a: 'Yes. For families further along in their food knowledge, we offer speciality Indian catering, restaurant pop up concepts, and celebrity chef sections, where a chef brings their own team and owns the menu for one specific part of the event, such as a live sushi bar.' },
      { q: 'Where does the tasting process happen?', a: 'At our experience centre in Noida, Sector 61, where clients taste and refine the menu in person before anything is finalised.' }
    ],
    author: {
      name: 'Pallav Goel',
      linkedin: 'https://www.linkedin.com/in/pallavg16',
      bio: 'Pallav Goel is the Co-Founder of Virtuoso Catering House. He leads the overall growth, strategy, and business direction of Virtuoso, setting the standards for which clients the company works with and how the brand positions itself in the luxury events market.'
    }
  }
];

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
    metaTitle: 'Best Catering Services in Noida You Must Try in 2026',
    metaDescription: 'Make your celebrations memorable with Virtuoso Catering, the best catering services in Noida offering gourmet dishes and exceptional event experiences.',
    eyebrow: 'Noida',
    h1: 'Enjoy Delicious Food with Virtuoso Best Catering Services in Noida',
    image: img('mv-landing-noida', 2400, 1200),
    lead: {
      heading: 'Catering Services in Noida for Weddings and Events',
      paragraphs: [
        'Seeking top-notch catering services in Noida? If so, then Virtuoso, best caterers in Noida is here to cater to your needs.',
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
    metaDescription: 'Virtuoso Catering House designs food and beverage experiences for luxury brand launches across Delhi NCR, including automotive reveals, retail openings, and activations for Lamborghini, Tesla, Ferrari APAC, and BMW.',
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
      intro: 'Four briefs, four different rooms, one discipline: the food never gets in front of the brand it’s serving.',
      items: [
        { title: 'Lamborghini Temerario, Delhi', points: ['The Delhi launch at Lamborghini’s Sarita Vihar showroom, 100 UHNI guests and automotive media, April 2025.', 'A single circulation-first grazing table, timed sushi and canape rotation, a purple-themed mocktail matched to the Temerario’s colour language.'] },
        { title: 'Tesla Centre Gurugram', points: ['The opening of Tesla Centre Gurugram at Orchid Business Park, 150 senior journalists, PR, and HNI clients, November 2025.', 'No fixed stations. Food rotated through the space on a timed cycle so nothing interrupted guest flow around the cars.'] },
        { title: 'Ferrari APAC & BMW', points: ['Luxury automotive brand activation catering executed for Ferrari APAC and BMW dealer events across Delhi NCR.', 'Each brief built from the brand’s design language, not a repeated format from the last launch.'] }
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
      { q: 'Which luxury brands has Virtuoso catered for in Delhi NCR?', a: 'Virtuoso Catering House has executed luxury brand activation catering for Lamborghini, Tesla India, Ferrari APAC, and BMW across Delhi NCR, alongside weddings, private dining, and bespoke menu work.' },
      { q: 'What guest capacity can Virtuoso handle for a brand activation?', a: 'We’ve served events from intimate 50-guest brand previews to 150-plus guest flagship launches. That includes 150 senior journalists and HNI guests at the Tesla Centre Gurugram opening, and 100 UHNI guests and automotive media at the Lamborghini Temerario launch.' }
    ],
    author: {
      name: 'Pallav Goel',
      linkedin: 'https://www.linkedin.com/in/pallavg16',
      bio: 'Pallav Goel is the Co-Founder of Virtuoso Catering House. He leads the brand’s growth and strategy in the luxury experiential catering space, deciding which clients the house takes on and what standard it holds itself to. That includes its automotive and brand activation work across Delhi NCR, from the Lamborghini Temerario launch to the Tesla Centre Gurugram opening.'
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

module.exports = {
  services,
  instagramAccounts,
  ourWork,
  blogPosts,
  landingPages,
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
  blogHeroImage: '/images/virtuoso-catering-house-journal-hero.svg'
};
