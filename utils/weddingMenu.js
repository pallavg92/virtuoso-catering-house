// The Wedding Signatures Menu, as structured data.
//
// This is the same menu as public/downloads/virtuoso-catering-house-menu.pdf,
// transcribed so it can be published as a real page. The PDF was earning ~1,468
// Search Console impressions from position 24 while /blog/wedding-catering-menu-in-delhi,
// the page that should own the topic, contained no dish names at all. A PDF
// cannot carry internal links, schema, or a usable phone layout; this can.
//
// The shape mirrors schema.org: sections map to MenuSection, groups to nested
// MenuSection, and items to MenuItem, so views/wedding-menu.ejs can emit valid
// Menu markup without reshaping anything. business.hasMenu points at the page.
//
// `choose` is the count where the printed menu says "Choose any N". It is
// shown to the reader because it is genuinely useful when planning, and it is
// the detail a generic recycled dish list on a competitor blog cannot fake.
const weddingMenu = {
  title: 'The Wedding Signatures Menu',
  summary: 'A vegetarian tasting menu, curated end to end for understated luxury.',
  closing: 'Every menu above is a starting point. Final selections are always written around your event, your guests, and the season.',
  sections: [
    {
      number: '01',
      name: 'Welcome & Grazing',
      groups: [
        {
          name: '360° Grazing Experience',
          note: 'An immersive grazing table, curated with refined flavours and artful presentation.',
          items: ['Tomato & Olive Crostini', 'Creamy Guacamole Bowl', 'Corn & Cheese Crostinis', 'Cumin Sour Cream Bowl', 'Spicy Hummus Platter', 'Assorted Chips & Tostadas Basket', 'Beetroot Hummus Platter', 'Artisan Bread Baskets', 'Classic Hummus Platter', 'Fromage Atelier with Exotic Fresh Fruit Croquembouche', 'Falafel Skewers', 'Seasonal Salad Medley', 'Sumac Pita Bread Bites', 'Dry Cakes, Cupcakes & Cookie Display', 'Quinoa Salad with Chilli Lime Dressing', 'Flavoured Chocolate Bite Towers', 'Hot Salsa Bowl']
        },
        {
          name: 'Grill by the Bar — Live',
          choose: 4,
          note: 'Served with mashed potato, grilled vegetables and assorted sauces.',
          items: ['Black Pepper Jus', 'Spinach Chimichurri Mushrooms with Cream Cheese', 'Red Pepper Romesco', 'Chilli Jaggery Caramel Pineapple', 'Truffle Makhani', 'Stuffed Chermoula Cottage Cheese', 'Lemon Caper Sauce', 'Paprika Spiced Baby Potatoes', 'Gochujang Sweet Potato with Tahini', 'Pesto Grilled Paneer Skewers']
        },
        {
          name: 'Rolling Snack Service',
          note: 'A curated selection of most-loved street-style snacks, served in rotation.',
          items: ['Butter Salted Popcorn', 'Paprika Lemon Sweet Corn', 'Kolkatta Jhal Muri', 'Chana Jor Garam', 'Paan Bites', 'Spicy Dilli Peanut Chaat', "90's Nostalgia Platter"]
        }
      ]
    },
    {
      number: '02',
      name: 'Canapés',
      groups: [
        {
          name: 'Circulated Bites',
          choose: 6,
          note: 'Thoughtfully crafted, bite-sized creations, circulated throughout the event.',
          items: ['Lahori Paneer Tikka with Green Chutney Pipette', 'Cashew-Crusted Beetroot & Feta Kebab with Fig Chutney', 'Hari Mirch Paneer Tikka with Tomato Parmesan Fondue', 'Nasi Goreng Arancini with Sambal & Coconut Sauce', 'Basil Pesto Paneer Tikka with Sun-Dried Tomato Crème Pipette', 'Thai Chilli Basil Cottage Cheese', 'Truffle-Scented Wild Mushroom Galouti', 'Kung Fu Potato', 'Dilli Matra with Masala Lavash & Tamarind Salad', 'Jackfruit Shikampuri Kebab with Chilli Guava Salsa', 'Chhowke Huye Matar Ki Tikki with Mango Salsa', 'Almond, Spinach & Cream Cheese Fritters, Bravas Sauce', 'Soya Chaap Tikka Masala on a Baby Saffron Paratha', 'Corn & Cheese Crisperz with Spicy Chutney', 'Lotus Stem Galawat Kebab', 'Trio of Crostinis', 'Thecha Malai Soya Chaap', 'Loaded Peri Peri Fries', 'Chilli Cheese Mushroom Duplex']
        },
        {
          name: "Chef's Edit Bites",
          choose: 6,
          note: 'A curated selection of bite-sized creations, hand-crafted by our head chef.',
          items: ['Beet & Truffle Kebab, Khari Crisp, Fig Mousse', 'Quattro Formaggi Dahi Kebab, Parmesan, Red Pepper Jam', 'Tandoori Broccoli, Gunpowder, Ginger Malai Sauce', 'Mushroom Pepper Fry, Coin Malabari Parotta, Water Chestnut', 'Rock Corn Tempura, Chilli Garlic Sea Salt, Mango Miso Gel', 'Goat Cheese Fritters, Salted Almonds & Spinach, Muhammara Chutney', 'Dal Pakwan 2.0, Pickled Onion & Chutneys, Chilli Gherkin Relish', 'Stuffed Sweet Potato Croquette, Spiced Mozzarella, Pineapple Compote', 'Spinach & Corn Phyllo Cigars, Cranberry Chutney', 'Nasi Goreng Arancini, Sambal Coconut Sauce, Jasmine Rice', 'Szechwan Paneer Tikka, Kaffir Lime Aioli, Lotus Root Crisps', 'Gochujang Cottage Cheese, Three Peppers, Korean Chilli Paste', 'Wasabi Malai Paneer Tikka, Gomae Sauce, Wasabi Caviars', 'Broccoli 65, Gunpowder, Lemon Curd', 'Rajma Galouti Cornetto, Rice Paper Cones, Truffle Cream Cheese']
        }
      ]
    },
    {
      number: '03',
      name: 'Live Stations',
      groups: [
        { name: 'Hearty Soup Station', choose: 2, note: 'Freshly simmered gourmet soups, served with focaccia bread & flavoured butter.', items: ['Creamy Corn Chowder', 'Truffle Cream of Mushroom', 'Minestrone Genovese', 'Broccoli & Almond Soup', 'Classic Manchow', 'Sweet Corn Soup', 'Roast Tomato & Basil'] },
        { name: 'Burmese Khao Suey — Live', note: 'Slow-simmered coconut curry over tender noodles, with handcrafted toppings.', items: ['Lemon Wedges', 'Chopped Spring Onion Greens', 'Toasted Peanuts', 'Fried Wonton Crisps', 'Fried Garlic Crisps', 'Crushed Chilli Flakes', 'Fried Onions', 'In-House Chilli Oil', 'Fresh Cilantro', 'Crispy Fried Noodles'] },
        { name: 'Dilli Chaat Station', choose: 4, note: "The charm of Delhi's bustling lanes, brought straight to your event.", items: ['Dahi Bhalla with Mango / Beetroot Dahi', 'Bhalla Papdi Chaat', 'Gol Gappa (4 Flavoured Waters)', 'Mumbai Pav Bhaji', 'Shahi Aloo Tikki', 'Matar Kulcha', 'Street-Style Sev Puri', 'Fateh Ki Kachodi', 'Nukkad Bhel Puri', 'Khasta Pyaaz Kachodi & Khatti Kadhi', 'Moong Dal Chila, Paneer Stuffing'] },
        { name: 'Fusion Chaat Station', choose: 3, note: 'A modern twist on the classic chaat counter.', items: ['Taco Samosa Chaat', 'Falafel Dahi Chaat', 'Asian Crunch Noodle Chaat', 'Smoked Corn & Burrata Chaat', 'Avocado Dahi Puri', 'Tex-Mex Nachos Chaat'] },
        { name: 'Dimsum Kart', choose: 3, note: 'Handcrafted momos and artisanal dumplings, freshly steamed.', items: ['Truffle Cream Cheese Dimsum', 'Exotic Mushroom & Chilli Oil', 'Korean Chilli Garlic Dimsum', 'Sui Mai Dumpling', 'Water Chestnut & Asparagus Dimsum', 'Crystal Vegetable Dumpling'] },
        { name: 'Pasta Fresca — Live', note: 'Bespoke pasta, sauces and toppings, crafted to order. Served with bread & Parmesan shavings.', items: ['Pasta: Fusilli, Rigatoni, Farfalle', 'Sauce: Creamy Pesto, Creamy Alfredo, Arrabbiata, Rosé'] },
        { name: 'Virtuoso Artisan Pizzeria', note: 'Hand-rolled thin crust & Napoletana pizzas, baked fresh in our live oven.', items: ['La Vera Margherita', 'Fusion Delight (Pesto Cottage Cheese & Jalapeño)', 'Veggie Gardenia (Roasted Peppers, Onion & Mushroom)', 'Tomato Basil Pesto Burrata Pizza'] },
        { name: 'Indian Fusion Teppanyaki', choose: 2, note: 'A ready-to-eat kulhad rice, tossed on the grill, served with onion & green chutney.', items: ['Kulhad Rice with Rajma', 'Kulhad Rice with Chhole & Palak', 'Kulhad Rice with Soya Rara', 'Kulhad Rice with Truffle Mushroom Masala'] },
        { name: 'Asian Wok Bar', note: 'Live oriental counter, tossed noodles with a choice of exotic veggies.', items: ['Sauces (choose any two): Hot Garlic, Manchurian, Garlic Soy & Ginger, Chilli Basil', 'Vegetables: Bell Peppers, Zucchini, Napa Cabbage, Baby Corn, Mushroom, Water Chestnut, Corn Kernels, Bok Choy, Carrot'] },
        { name: 'Tawa Pao Counter', choose: 2, note: 'Finished with desi ghee, coriander & ginger; served with butter pao, onion salad & green chutney.', items: ['Amritsari Paneer Bhurjee', 'Tawa Mushroom Masala', 'Paneer Khurchan', 'Soya Chaap Tak-a-Tak'] },
        { name: 'Sushi Live Station', choose: 3, note: 'Hand-rolled by expert chefs, served with wasabi, pickled ginger & soy.', items: ['Veggie Tempura Roll', 'California Uramaki Roll', 'Asparagus Tempura Roll', 'Philadelphia Cheese Roll', 'Spicy Avocado Roll', 'Tofu Rock n Roll', 'Mixed Vegetable Roll', 'Firecracker Asparagus Roll', 'Avocado Uramaki Roll'] },
        { name: 'Sabores de México', choose: 2, note: 'Live-prepared tacos, quesadillas and nachos, loaded with bold flavours.', items: ['Tex-Mex Beans Quesadilla', 'Burrito Bowl', 'Loaded Cheese Nachos', 'Rolled Burritos', 'Soft Shell Peri Peri Cottage Cheese Taco'] },
        { name: 'Levantine Live Station', note: 'Live-prepared shawarmas, with authentic condiments and vibrant salads.', items: ['Paneer Shawarma Roll', 'Falafel Shawarma Roll', 'Soya Shawarma Roll', 'Sides: Classic & Spicy Hummus, Toum, Tzatziki, Muhammara, Garlic Tahini, Beetroot Labneh, Arabic Pickle, Greek & Fattoush Salad, Assorted Lavash, Sumac & Classic Pita'] },
        { name: 'Teppanyaki', note: 'Fresh vegetables and sauces, flame-seared and finished live on the grill.', items: ['Vegetables: Zucchini, Wild Mushrooms, Spinach, Pak Choi, Bean Sprout, Water Chestnuts, Bell Peppers, Baby Corn, Broccoli, Black & White Fungus Mushroom, Snow Peas', 'Sauces: Black Bean, Chilli Oyster, Chilli Garlic, Teriyaki, Garlic Soy, Yellow Curry, BBQ', 'Protein: Silken Tofu', 'Rice & Noodles: Japanese Stir-Fried Rice & Noodles'] },
        { name: 'Risotto & Ravioli Studio', choose: 2, note: 'Creamy, slow-cooked risottos and delicate handmade ravioli, finished to order.', items: ['Wild Mushroom Risotto — Porcini, Thyme, Aged Grana Padano', 'Ricotta & Spinach Ravioli — Sage Brown Butter, Cream, Parmigiano', 'Risotto Napoletana — San Marzano Tomatoes, Basil, Extra-Virgin Olive Oil, Parmigiano', 'Mushroom Ravioli Rosa — Tomato, Basil, Parmesan, Italian Herbs'] },
        { name: 'The Thai Table', note: 'Live Somtam (Thai papaya salad) and a Thai charcoal grill.', items: ['Live Somtam — Raw Papaya, Carrot, Red Chilli, Tamarind, Peanuts', 'Assorted Mushroom Skewer — Teriyaki Glaze, Avocado & Jalapeño Salsa', 'Mapo Tofu', 'Miso Butter Broccoli Skewer — Chilli Garlic Broccoli, Miso Butter Brush, Peanuts', 'Kra Paw Mushroom', 'Firm Tofu & Chestnut Skewer — Red Curry Glaze, Fried Basil', 'Steamed Jasmine Rice', 'Mock Meat Skewer — Gochujang Glaze, Sesame & Peanut Crumble'] },
        { name: 'Choose Your Live Station', choose: 6, note: 'Live stations bring theatre and freshness to the dining experience.', items: ['Sabores de México', 'Indian Teppanyaki (Fusion Food)', 'Asian Wok Bar', 'Pasta Fresca Station', 'Levantine Station', 'Tawa Pao Counter', 'Virtuoso Artisan Pizzeria', 'Risotto & Ravioli Studio', 'Dumplings Kart', 'Teppanyaki', 'The Kyoto Sushi Experience', 'The Thai Table'] }
      ]
    },
    {
      number: '04',
      name: 'Buffet',
      groups: [
        { name: 'Indian Mains, Vegetarian', note: 'A royal spread inspired by the Mughal era, live-styled with tempering and tableside service for the dal.', items: ['Clove-Smoked Dal Makhani', 'Baby Potato Changezi', 'Kokum-Infused Dal Tadka', 'Gucchi Matar Makhani', 'Sriracha Paneer Makhani', 'Aged Cheese & Lasooni Palak Corn Makhana', 'Mushroom Khurchan', 'Peas & Caramelized Onion Pulao', 'Jalapeño Beetroot Malai Kofta', 'Assorted Vegetable Dum Biryani'] },
        { name: 'Gourmet Khichdi Tadka Station', note: 'Khichdi reimagined as comfort haute cuisine, with jasmine and Assamese black rice blends, global infusions and luxurious toppings.', items: ['Edamame, Asparagus & Enoki Mushroom Khichdi', 'Achari Rajma Chawal Khichdi'] },
        { name: 'Progressive Kulcha Bar', note: 'Contemporary and heritage Indian breads, elevated with artisanal fillings and spiced butters.', items: ['Smoked Amritsari Paneer Bhurjee Kulcha', 'Truffle Wild Mushroom & Cheese Kulcha', 'Spiced Potato & Bhuna Onion Kulcha', 'Pindi Chhole', 'Butters: Butterfly Pea Flower, Pesto, Honey & Peri Peri Chilli, Coriander & Green Chilli, Lasooni, Confit Garlic & Cumin Curd Dip', 'Accompaniments: Smoky Tamarind-Date Chutney Jelly, Spiced Nut & Seed Crumble, Crushed Papad, Avocado Cilantro Chutney, Pico de Gallo, Mint Raita Mousse'] },
        { name: 'Indian Regional Mains', note: "A journey across India's diverse culinary landscapes.", items: ['Rajasthani: Paneer Laung Latta, Bikaneri Paratha, Dal Baati & Choorma, Gatta Curry', 'Gujarati: Sev Tamatar, Gujarati Kadhi', 'Kashmiri: Dum Aloo Kashmiri, Nadru Yakhni (Lotus Stem)', 'Goan: Goan Vegetable Xacuti, Kokum Kadhi'] },
        { name: 'DIY Raita', note: 'A personal touch of service. Build your own curd dish, exactly to your taste.', items: ['Base: Whipped Cumin Raita, Whipped Sweet Raita', 'Add-ins: Soaked Boondi, Pomegranate & Aloo Masala, Chopped Onion Tomato & Cucumber, Fried Garlic, Pineapple & Mint, Apple Cinnamon, Banana & Grape with Black Salt'] },
        { name: 'Salads', choose: 5, items: ['Greek Salad with Sumac Tahini Dressing & Pita Chips', 'Grain & Hearty Salad Bowls', 'Rocket, Pear & Walnut Salad with Dijon Mustard & Mojito Dressing', 'Mediterranean Couscous with Roasted Veggies & Feta', 'Tex-Mex Salad with Chipotle Cheese Sauce & Tortilla Chips', 'Avocado Quinoa Salad in Dates & Tamarind Dressing', 'Italian Panzanella Salad', 'Asian Soba Noodle Salad with Sesame Soy Dressing', 'Classic Caesar Salad with Parmesan Shards & Croutons', 'Red Rice, Butter Corn & Cucumber Salad in Honey Ginger Dressing'] },
        { name: 'Classic Condiments', items: ['Indian Green Salad', 'Greek Salad', 'Lachha & Sirka Pyaaz', 'Chilli Lime Corn & Pineapple Salad', 'Mooli Aur Anaar Lachha'] },
        { name: 'Assorted Breads', note: 'Fresh from the tandoor.', items: ['Classic: Butter Tandoori Roti, Laccha Paratha (Ajwain, Pudina, Dhaniya), Butter Naan, Garlic Naan, Missi Roti, Stuffed Naan, Malabari Paratha', "Chef's Edit: Sundried Tomato & Olive Naan, Jalapeño Coriander Garlic Naan, Rosemary Butter Roti, Parmesan Garlic Naan, Cheese Truffle Kulcha, Mirchi Ajwain Paratha, Khameeri Roti"] }
      ]
    },
    {
      number: '05',
      name: 'Desserts',
      groups: [
        { name: 'The Dessert Cabinet', choose: 6, note: 'Mono-portion, chef-crafted sweet creations, artfully stationed.', items: ['Dark Chocolate Mousse with Orange & Praline', 'Hazelnut Praline Parfait', 'Sea Salt Caramel & Chocolate Entremet', 'Mini Donut Display', 'Deconstructed Cheesecake with Fresh Fruit Compote', 'Rich Belgian Chocolate Tartelette', 'Fresh Fruit Trifle Cups', 'Lemon Tartelette', 'Panna Cotta with Berry Compote', 'Banoffee Pie', 'Sticky Date Pudding with Toffee Sauce'] },
        { name: 'Live Gelato Experience', note: 'Freshly scooped to order, served in waffle cone or individual cups.', items: ['Strawberry Sorbet', 'Belgian Chocolate', 'Stracciatella', 'Pista / Mango', 'Vanilla Bean'] },
        { name: 'The Golden Griddle Co.', note: 'Waffles, pancakes and crêpes, prepared fresh to order with gourmet toppings.', items: ['Belgian Waffles, Classic Buttermilk Pancakes, Thin French Crêpes', 'Toppings: Belgian Chocolate Sauce & White Chocolate Ganache, Caramel & Salted Caramel Drizzle, Nutella & Hazelnut Spread', 'Fresh Fruits & Nuts: Strawberries, Blueberries, Kiwi, Banana, Apple, Toasted Almonds, Pistachios, Walnuts', 'Finishes: Whipped Cream & Mascarpone, Gold Dust & Edible Flowers, Chocolate Shavings'] },
        { name: 'Indian Desserts Selection', choose: 5, note: 'A decadent finale of artisanal sweets, miniature pastries and indulgent confections.', items: ['Bengali Rasgulla', 'Raj Bhog', 'Gulab Jamun', 'Live Jalebi with Rabri Fountain', 'Gajar Halwa', 'Punjabi Panjeeri Live', 'Moong Dal Halwa', 'Milk Cake Khurchan', 'Kesar Rasmalai', 'Til Wali Kulfi (Mango, Strawberry, Pista, Paan)', 'Rabri Rasmalai', 'Kesar Kulhad Firni', 'Live Malpua with Rabri'] }
      ]
    }
  ]
};

module.exports = weddingMenu;
