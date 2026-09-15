/**
 * Curated catalog of Dallas & Fort Worth venues, addresses, and smart lookup helper
 */

export const CATEGORIES = {
  MUST_SEES: 'Must-Sees Dallas',
  FOOD_BBQ: 'Food & BBQ',
  BARS_NIGHTLIFE: 'Bars & Nightlife',
  ENTERTAINMENT: 'Entertainment & Sports',
  SHOPPING_CULTURE: 'Shopping & Culture'
};

export const DALLAS_VENUES = [
  // Airports & Travel
  {
    keywords: ['fly', 'leon', 'dfw', 'airport', 'flight', 'arrival', 'boarding'],
    name: 'Dallas/Fort Worth International Airport (DFW)',
    address: '2400 Aviation Dr, DFW Airport, TX 75261',
    neighborhood: 'DFW Airport',
    category: CATEGORIES.MUST_SEES,
    mapsQuery: 'Dallas Fort Worth International Airport, 2400 Aviation Dr, DFW Airport, TX 75261'
  },
  // Must-Sees Dallas
  {
    keywords: ['meow wolf', 'the real unreal', 'grapevine mills'],
    name: 'Meow Wolf Grapevine ("The Real Unreal")',
    address: '3000 Grapevine Mills Pkwy Suite 253, Grapevine, TX 76051',
    neighborhood: 'Grapevine',
    category: CATEGORIES.MUST_SEES,
    mapsQuery: 'Meow Wolf Grapevine, 3000 Grapevine Mills Pkwy Suite 253, Grapevine, TX 76051'
  },
  {
    keywords: ['arboretum', 'pumpkin village', 'white rock lake'],
    name: 'Dallas Arboretum and Botanical Garden',
    address: '8525 Garland Rd, Dallas, TX 75218',
    neighborhood: 'White Rock Lake / East Dallas',
    category: CATEGORIES.MUST_SEES,
    mapsQuery: 'Dallas Arboretum and Botanical Garden, 8525 Garland Rd, Dallas, TX 75218'
  },
  {
    keywords: ['reunion tower', 'geo-deck', 'geodeck', 'observation'],
    name: 'Reunion Tower GeO-Deck',
    address: '300 Reunion Blvd E, Dallas, TX 75207',
    neighborhood: 'Downtown Dallas',
    category: CATEGORIES.MUST_SEES,
    mapsQuery: 'Reunion Tower, 300 Reunion Blvd E, Dallas, TX 75207'
  },
  {
    keywords: ['perot museum', 'perot'],
    name: 'Perot Museum of Nature and Science',
    address: '2201 N Field St, Dallas, TX 75201',
    neighborhood: 'Downtown / Arts District',
    category: CATEGORIES.MUST_SEES,
    mapsQuery: 'Perot Museum of Nature and Science, 2201 N Field St, Dallas, TX 75201'
  },
  {
    keywords: ['klyde warren', 'deck park'],
    name: 'Klyde Warren Park',
    address: '2012 Woodall Rodgers Fwy, Dallas, TX 75201',
    neighborhood: 'Arts District / Downtown',
    category: CATEGORIES.MUST_SEES,
    mapsQuery: 'Klyde Warren Park, 2012 Woodall Rodgers Fwy, Dallas, TX 75201'
  },
  {
    keywords: ['discovery district', 'att discovery', 'media wall'],
    name: 'AT&T Discovery District',
    address: '208 S Akard St, Dallas, TX 75202',
    neighborhood: 'Downtown Dallas',
    category: CATEGORIES.MUST_SEES,
    mapsQuery: 'AT&T Discovery District, 208 S Akard St, Dallas, TX 75202'
  },
  {
    keywords: ['water gardens', 'fort worth water'],
    name: 'Fort Worth Water Gardens',
    address: '1502 Commerce St, Fort Worth, TX 76102',
    neighborhood: 'Downtown Fort Worth',
    category: CATEGORIES.MUST_SEES,
    mapsQuery: 'Fort Worth Water Gardens, 1502 Commerce St, Fort Worth, TX 76102'
  },
  {
    keywords: ['stockyards', 'cattle drive', 'longhorn'],
    name: 'Fort Worth Stockyards National Historic District',
    address: '2501 Rodeo Plaza, Fort Worth, TX 76164',
    neighborhood: 'Fort Worth Stockyards',
    category: CATEGORIES.MUST_SEES,
    mapsQuery: 'Fort Worth Stockyards, 2501 Rodeo Plaza, Fort Worth, TX 76164'
  },
  {
    keywords: ['sundance square'],
    name: 'Sundance Square Plaza',
    address: '420 Main St, Fort Worth, TX 76102',
    neighborhood: 'Downtown Fort Worth',
    category: CATEGORIES.MUST_SEES,
    mapsQuery: 'Sundance Square, 420 Main St, Fort Worth, TX 76102'
  },
  {
    keywords: ['bush library', 'bush presidential', 'george w bush'],
    name: 'George W. Bush Presidential Center',
    address: '2943 SMU Boulevard, Dallas, TX 75205',
    neighborhood: 'University Park / SMU',
    category: CATEGORIES.MUST_SEES,
    mapsQuery: 'George W. Bush Presidential Center, 2943 SMU Blvd, Dallas, TX 75205'
  },

  // Food & BBQ
  {
    keywords: ["terry black's", 'terry black', 'pecan lodge', 'brisket', 'deep ellum bbq'],
    name: "Terry Black's Barbecue (Deep Ellum)",
    address: '3025 Main St, Dallas, TX 75226',
    neighborhood: 'Deep Ellum',
    category: CATEGORIES.FOOD_BBQ,
    mapsQuery: "Terry Black's Barbecue, 3025 Main St, Dallas, TX 75226"
  },
  {
    keywords: ['emporium pies', 'pies', 'lord of the pies'],
    name: 'Emporium Pies (Bishop Arts)',
    address: '314 N Bishop Ave, Dallas, TX 75208',
    neighborhood: 'Bishop Arts District',
    category: CATEGORIES.FOOD_BBQ,
    mapsQuery: 'Emporium Pies, 314 N Bishop Ave, Dallas, TX 75208'
  },
  {
    keywords: ['lockhart smokehouse', 'lockhart'],
    name: 'Lockhart Smokehouse (Bishop Arts)',
    address: '400 W Davis St, Dallas, TX 75208',
    neighborhood: 'Bishop Arts District',
    category: CATEGORIES.FOOD_BBQ,
    mapsQuery: 'Lockhart Smokehouse, 400 W Davis St, Dallas, TX 75208'
  },
  {
    keywords: ['velvet taco'],
    name: 'Velvet Taco',
    address: '2817 N Henderson Ave, Dallas, TX 75206',
    neighborhood: 'Knox-Henderson',
    category: CATEGORIES.FOOD_BBQ,
    mapsQuery: 'Velvet Taco, 2817 N Henderson Ave, Dallas, TX 75206'
  },
  {
    keywords: ['mi cocina', 'mambo taxi'],
    name: 'Mi Cocina (Highland Park Village)',
    address: '77 Highland Park Village, Dallas, TX 75205',
    neighborhood: 'Highland Park Village',
    category: CATEGORIES.FOOD_BBQ,
    mapsQuery: 'Mi Cocina, 77 Highland Park Village, Dallas, TX 75205'
  },
  {
    keywords: ['deep ellum', 'murals', 'deep ellum dinner'],
    name: 'Deep Ellum Historic Entertainment District',
    address: 'Main St & Elm St, Dallas, TX 75226',
    neighborhood: 'Deep Ellum',
    category: CATEGORIES.FOOD_BBQ,
    mapsQuery: 'Deep Ellum, Main St, Dallas, TX 75226'
  },
  {
    keywords: ['bishop arts', 'bishop arts dinner', 'tacos'],
    name: 'Bishop Arts District',
    address: '419 N Bishop Ave, Dallas, TX 75208',
    neighborhood: 'Bishop Arts District / Oak Cliff',
    category: CATEGORIES.FOOD_BBQ,
    mapsQuery: 'Bishop Arts District, 419 N Bishop Ave, Dallas, TX 75208'
  },
  {
    keywords: ['hg sply', 'hg sply co', 'lower greenville rooftop'],
    name: 'HG Sply Co. Rooftop & Restaurant',
    address: '2008 Greenville Ave, Dallas, TX 75206',
    neighborhood: 'Lower Greenville',
    category: CATEGORIES.FOOD_BBQ,
    mapsQuery: 'HG Sply Co., 2008 Greenville Ave, Dallas, TX 75206'
  },

  // Bars & Nightlife
  {
    keywords: ['escapade 2001', 'escapade', 'latin club'],
    name: 'Escapade 2001 Dallas (Mega Latin Dance Club)',
    address: '10701 Finnell St, Dallas, TX 75220',
    neighborhood: 'Northwest Dallas',
    category: CATEGORIES.BARS_NIGHTLIFE,
    mapsQuery: 'Escapade 2001 Dallas, 10701 Finnell St, Dallas, TX 75220'
  },
  {
    keywords: ['cowboys red river', 'red river', 'line dancing'],
    name: 'Cowboys Red River Dancehall',
    address: '10310 Technology Blvd W, Dallas, TX 75220',
    neighborhood: 'Northwest Dallas',
    category: CATEGORIES.BARS_NIGHTLIFE,
    mapsQuery: 'Cowboys Red River, 10310 Technology Blvd W, Dallas, TX 75220'
  },
  {
    keywords: ["billy bob's", 'billy bobs', 'honky-tonk', 'honky tonk'],
    name: "Billy Bob's Texas (World's Largest Honky Tonk)",
    address: '2520 Rodeo Plaza, Fort Worth, TX 76164',
    neighborhood: 'Fort Worth Stockyards',
    category: CATEGORIES.BARS_NIGHTLIFE,
    mapsQuery: "Billy Bob's Texas, 2520 Rodeo Plaza, Fort Worth, TX 76164"
  },
  {
    keywords: ['katy trail ice house', 'katy trail', 'beer garden'],
    name: 'Katy Trail Ice House',
    address: '3127 Routh St, Dallas, TX 75201',
    neighborhood: 'Uptown Dallas',
    category: CATEGORIES.BARS_NIGHTLIFE,
    mapsQuery: 'Katy Trail Ice House, 3127 Routh St, Dallas, TX 75201'
  },
  {
    keywords: ['midnight rambler'],
    name: 'Midnight Rambler Speakeasy (The Joule)',
    address: '1530 Main St, Dallas, TX 75201',
    neighborhood: 'Downtown Dallas',
    category: CATEGORIES.BARS_NIGHTLIFE,
    mapsQuery: 'Midnight Rambler, 1530 Main St, Dallas, TX 75201'
  },
  {
    keywords: ['the rustic', 'rustic'],
    name: 'The Rustic Live Music Backyard',
    address: '3656 Howell St, Dallas, TX 75204',
    neighborhood: 'Uptown Dallas',
    category: CATEGORIES.BARS_NIGHTLIFE,
    mapsQuery: 'The Rustic, 3656 Howell St, Dallas, TX 75204'
  },

  // Entertainment & Sports
  {
    keywords: ['dos equis', 'dos equis pavilion', 'empire of the sun', 'concert'],
    name: 'Dos Equis Pavilion (Fair Park)',
    address: '1818 1st Ave, Dallas, TX 75210',
    neighborhood: 'Fair Park / Dallas',
    category: CATEGORIES.ENTERTAINMENT,
    mapsQuery: 'Dos Equis Pavilion, 1818 1st Ave, Dallas, TX 75210'
  },
  {
    keywords: ['medieval times', 'dinner tournament', 'jousting'],
    name: 'Medieval Times Dinner & Tournament Dallas',
    address: '2021 N Stemmons Fwy, Dallas, TX 75207',
    neighborhood: 'Design District / Stemmons Corridor',
    category: CATEGORIES.ENTERTAINMENT,
    mapsQuery: 'Medieval Times Dinner & Tournament, 2021 N Stemmons Fwy, Dallas, TX 75207'
  },
  {
    keywords: ['six flags', 'six flags over texas', 'fright fest', 'roller coaster'],
    name: 'Six Flags Over Texas & Fright Fest',
    address: '2201 E Road to Six Flags St, Arlington, TX 76011',
    neighborhood: 'Arlington Entertainment District',
    category: CATEGORIES.ENTERTAINMENT,
    mapsQuery: 'Six Flags Over Texas, 2201 E Road to Six Flags St, Arlington, TX 76011'
  },
  {
    keywords: ['cowtown rodeo', 'cowtown coliseum', 'rodeo'],
    name: 'Cowtown Coliseum (Stockyards Championship Rodeo)',
    address: '121 E Exchange Ave, Fort Worth, TX 76164',
    neighborhood: 'Fort Worth Stockyards',
    category: CATEGORIES.ENTERTAINMENT,
    mapsQuery: 'Cowtown Coliseum, 121 E Exchange Ave, Fort Worth, TX 76164'
  },
  {
    keywords: ['at&t stadium', 'att stadium', 'cowboys stadium', 'commanders'],
    name: 'AT&T Stadium (Dallas Cowboys)',
    address: '1 AT&T Way, Arlington, TX 76011',
    neighborhood: 'Arlington Entertainment District',
    category: CATEGORIES.ENTERTAINMENT,
    mapsQuery: 'AT&T Stadium, 1 AT&T Way, Arlington, TX 76011'
  },

  // Shopping & Culture
  {
    keywords: ['northpark', 'northpark center'],
    name: 'NorthPark Center Luxury Mall',
    address: '8687 N Central Expy, Dallas, TX 75225',
    neighborhood: 'North Dallas / Park Cities',
    category: CATEGORIES.SHOPPING_CULTURE,
    mapsQuery: 'NorthPark Center, 8687 N Central Expy, Dallas, TX 75225'
  },
  {
    keywords: ['highland park village', 'highland park'],
    name: 'Highland Park Village Historic Shopping Plaza',
    address: '47 Highland Park Village, Dallas, TX 75205',
    neighborhood: 'Highland Park',
    category: CATEGORIES.SHOPPING_CULTURE,
    mapsQuery: 'Highland Park Village, 47 Highland Park Village, Dallas, TX 75205'
  }
];

/**
 * Smart lookup helper to match venue and verified address from plan text or query
 */
export function lookupDallasPlace(text = '') {
  if (!text || typeof text !== 'string') return null;
  const clean = text.toLowerCase();

  for (const venue of DALLAS_VENUES) {
    const matched = venue.keywords.some(kw => clean.includes(kw));
    if (matched) {
      return {
        ...venue,
        googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.mapsQuery)}`,
        appleMapsUrl: `https://maps.apple.com/?q=${encodeURIComponent(venue.name + ' ' + venue.address)}`
      };
    }
  }

  // Generic fallback if no specific venue matched
  return {
    name: text.length > 40 ? text.slice(0, 38) + '...' : text,
    address: 'Dallas-Fort Worth Metropolitan Area, TX',
    neighborhood: 'Dallas, TX',
    category: CATEGORIES.MUST_SEES,
    googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(text + ' Dallas TX')}`,
    appleMapsUrl: `https://maps.apple.com/?q=${encodeURIComponent(text + ' Dallas TX')}`
  };
}

/**
 * Expanded initial bucket with rich categories and verified street addresses
 */
export const ENRICHED_INITIAL_BUCKET = [
  // 🌟 Must-Sees Dallas
  {
    id: 'bucket-meow-wolf',
    title: 'Meow Wolf Grapevine ("The Real Unreal")',
    category: CATEGORIES.MUST_SEES,
    description: 'Mind-bending interactive art multiverse with hidden secret passages inside Grapevine Mills.',
    location: '3000 Grapevine Mills Pkwy Suite 253, Grapevine, TX 76051',
    neighborhood: 'Grapevine',
    best_time: 'Weekday afternoon or weekend daytime',
    estimated_duration: '2-3 hours',
    status: 'bucket',
    sister_reaction: 'love',
    created_by: 'sister',
    tags: ['Interactive Art', 'Multiverse', 'Must-See']
  },
  {
    id: 'bucket-dallas-arboretum',
    title: 'Dallas Arboretum & Pumpkin Village',
    category: CATEGORIES.MUST_SEES,
    description: '66-acre botanical wonderland on White Rock Lake with spectacular autumn floral displays and pumpkin houses.',
    location: '8525 Garland Rd, Dallas, TX 75218',
    neighborhood: 'White Rock Lake / East Dallas',
    best_time: 'Morning or golden hour',
    estimated_duration: '2.5 hours',
    status: 'bucket',
    sister_reaction: 'love',
    created_by: 'sister',
    tags: ['Botanical', 'Pumpkin Village', 'Lake Views']
  },
  {
    id: 'bucket-reunion-tower',
    title: 'Reunion Tower GeO-Deck',
    category: CATEGORIES.MUST_SEES,
    description: 'Panoramic 360-degree observation deck 470 feet above Dallas with high-definition zoom cameras and sunset views.',
    location: '300 Reunion Blvd E, Dallas, TX 75207',
    neighborhood: 'Downtown Dallas',
    best_time: 'Sunset (around 7:15 PM)',
    estimated_duration: '1.5 hours',
    status: 'bucket',
    sister_reaction: null,
    created_by: 'sister',
    tags: ['Skyline', 'Observation Deck', 'Photography']
  },
  {
    id: 'bucket-perot-museum',
    title: 'Perot Museum of Nature and Science',
    category: CATEGORIES.MUST_SEES,
    description: 'Striking 14-story cube building with glass escalator, giant dinosaur halls, earthquake simulator, and gems.',
    location: '2201 N Field St, Dallas, TX 75201',
    neighborhood: 'Downtown / Arts District',
    best_time: 'Morning 10 AM - 1 PM',
    estimated_duration: '2-3 hours',
    status: 'bucket',
    sister_reaction: 'must-do',
    created_by: 'sister',
    tags: ['Architecture', 'Science', 'Iconic']
  },
  {
    id: 'bucket-klyde-warren',
    title: 'Klyde Warren Deck Park & Food Trucks',
    category: CATEGORIES.MUST_SEES,
    description: 'Famous urban park built suspended over Woodall Rodgers Freeway with daily gourmet food trucks and lawn games.',
    location: '2012 Woodall Rodgers Fwy, Dallas, TX 75201',
    neighborhood: 'Downtown / Arts District',
    best_time: 'Lunchtime 11:30 AM - 2 PM',
    estimated_duration: '1.5 hours',
    status: 'bucket',
    sister_reaction: null,
    created_by: 'eduardo',
    tags: ['Park', 'Food Trucks', 'Walkable']
  },
  {
    id: 'bucket-att-discovery',
    title: 'AT&T Discovery District & 6K Media Wall',
    category: CATEGORIES.MUST_SEES,
    description: 'Futuristic outdoor digital entertainment plaza with a 104-foot tall 6K LED media wall, beer garden, and food hall.',
    location: '208 S Akard St, Dallas, TX 75202',
    neighborhood: 'Downtown Dallas',
    best_time: 'Night after 7 PM',
    estimated_duration: '1.5 hours',
    status: 'bucket',
    sister_reaction: null,
    created_by: 'eduardo',
    tags: ['Digital Art', 'Plaza', 'Nightlife']
  },
  {
    id: 'bucket-water-gardens',
    title: 'Fort Worth Water Gardens',
    category: CATEGORIES.MUST_SEES,
    description: 'Architectural wonder with cascading water terraces, active vortex pools, and peaceful meditation fountains.',
    location: '1502 Commerce St, Fort Worth, TX 76102',
    neighborhood: 'Downtown Fort Worth',
    best_time: 'Afternoon during Fort Worth visit',
    estimated_duration: '45 mins',
    status: 'bucket',
    sister_reaction: null,
    created_by: 'sister',
    tags: ['Architecture', 'Water Terraces', 'Fort Worth']
  },

  // 🍖 Food & BBQ
  {
    id: 'bucket-terry-blacks',
    title: "Terry Black's BBQ Smoked Brisket",
    category: CATEGORIES.FOOD_BBQ,
    description: 'Central Texas pit-smoked prime beef brisket, giant beef ribs, jalapeño cheese sausage, mac & cheese, banana pudding.',
    location: '3025 Main St, Dallas, TX 75226',
    neighborhood: 'Deep Ellum',
    best_time: 'Lunch or early dinner (before sellout)',
    estimated_duration: '1.5 hours',
    status: 'bucket',
    sister_reaction: 'must-do',
    created_by: 'eduardo',
    tags: ['Smoked Brisket', 'Texas BBQ', 'Legendary']
  },
  {
    id: 'bucket-pecan-lodge',
    title: 'Pecan Lodge Pitmaster BBQ',
    category: CATEGORIES.FOOD_BBQ,
    description: 'Renowned Deep Ellum BBQ icon made famous on Diners, Drive-Ins and Dives. Try "The Trough" and burnt ends.',
    location: '2720 Elm St, Dallas, TX 75226',
    neighborhood: 'Deep Ellum',
    best_time: 'Lunch 11 AM - 2 PM',
    estimated_duration: '1.5 hours',
    status: 'bucket',
    sister_reaction: null,
    created_by: 'eduardo',
    tags: ['BBQ', 'Deep Ellum', 'Foodie']
  },
  {
    id: 'bucket-emporium-pies',
    title: 'Emporium Pies Handcrafted Slices',
    category: CATEGORIES.FOOD_BBQ,
    description: 'Charming vintage cottage serving famous handcrafted specialty pies like Lord of the Pies and Smooth Operator.',
    location: '314 N Bishop Ave, Dallas, TX 75208',
    neighborhood: 'Bishop Arts District',
    best_time: 'Evening after dinner',
    estimated_duration: '45 mins',
    status: 'bucket',
    sister_reaction: 'love',
    created_by: 'sister',
    tags: ['Pies', 'Dessert', 'Bishop Arts']
  },
  {
    id: 'bucket-lockhart-smokehouse',
    title: 'Lockhart Smokehouse (Butcher Paper BBQ)',
    category: CATEGORIES.FOOD_BBQ,
    description: 'Traditional Kreuz Market style barbecue served directly on butcher paper with no forks or barbecue sauce needed.',
    location: '400 W Davis St, Dallas, TX 75208',
    neighborhood: 'Bishop Arts District',
    best_time: 'Lunch or early dinner',
    estimated_duration: '1 hour',
    status: 'bucket',
    sister_reaction: null,
    created_by: 'eduardo',
    tags: ['No Sauce', 'Butcher Paper', 'Bishop Arts']
  },
  {
    id: 'bucket-velvet-taco',
    title: 'Velvet Taco Late Night',
    category: CATEGORIES.FOOD_BBQ,
    description: 'Inventive chef-driven tacos: spicy tikka chicken, brisket mac & cheese, rotisserie corn, and red velvet cake.',
    location: '2817 N Henderson Ave, Dallas, TX 75206',
    neighborhood: 'Knox-Henderson',
    best_time: 'Late night after drinks',
    estimated_duration: '45 mins',
    status: 'bucket',
    sister_reaction: 'love',
    created_by: 'sister',
    tags: ['Tacos', 'Late Night', 'Quick Bite']
  },

  // 🍸 Bars & Nightlife
  {
    id: 'bucket-cowboys-line-dancing',
    title: 'Cowboys Red River Line Dancing',
    category: CATEGORIES.BARS_NIGHTLIFE,
    description: 'Legendary massive Texas country dance hall with free two-step & line dance lessons and live country bands.',
    location: '10310 Technology Blvd W, Dallas, TX 75220',
    neighborhood: 'Northwest Dallas',
    best_time: 'Thursday - Saturday night (doors 7 PM)',
    estimated_duration: '3 hours',
    status: 'bucket',
    sister_reaction: 'love',
    created_by: 'sister',
    tags: ['Two-Step', 'Line Dancing', 'Country Music']
  },
  {
    id: 'bucket-escapade-2001',
    title: 'Escapade 2001 Mega Latin Dance Club',
    category: CATEGORIES.BARS_NIGHTLIFE,
    description: 'Huge multi-level, multi-room Latin dance club: cumbia, norteño, salsa, bachata, reggaeton, and electric atmosphere.',
    location: '10701 Finnell St, Dallas, TX 75220',
    neighborhood: 'Northwest Dallas',
    best_time: 'Friday or Saturday night (10 PM - 2 AM)',
    estimated_duration: '4 hours',
    status: 'bucket',
    sister_reaction: 'love',
    created_by: 'sister',
    tags: ['Latin Music', 'Dancing', 'Cumbia', 'Salsa']
  },
  {
    id: 'bucket-billy-bobs',
    title: "Billy Bob's Texas (World's Largest Honky Tonk)",
    category: CATEGORIES.BARS_NIGHTLIFE,
    description: 'Historic Fort Worth country club with live indoor bull riding arena, 30+ bar stations, and legendary concerts.',
    location: '2520 Rodeo Plaza, Fort Worth, TX 76164',
    neighborhood: 'Fort Worth Stockyards',
    best_time: 'Friday or Saturday night',
    estimated_duration: '3 hours',
    status: 'bucket',
    sister_reaction: null,
    created_by: 'eduardo',
    tags: ['Honky Tonk', 'Bull Riding', 'Stockyards']
  },
  {
    id: 'bucket-katy-trail',
    title: 'Katy Trail Ice House Giant Schooners',
    category: CATEGORIES.BARS_NIGHTLIFE,
    description: 'Vibrant 50-tap beer garden patio shaded by century-old oak trees along the Katy Trail with 32°F frozen schooners.',
    location: '3127 Routh St, Dallas, TX 75201',
    neighborhood: 'Uptown Dallas',
    best_time: 'Sunny afternoon or Tuesday evening',
    estimated_duration: '2 hours',
    status: 'bucket',
    sister_reaction: null,
    created_by: 'eduardo',
    tags: ['Beer Garden', 'Patio', 'Katy Trail']
  },
  {
    id: 'bucket-hg-sply-rooftop',
    title: 'HG Sply Co. Sunset Rooftop Cocktails',
    category: CATEGORIES.BARS_NIGHTLIFE,
    description: 'One of Dallas’s best sunset rooftop patios with skyline views, craft cocktails, fire pits, and Lower Greenville vibes.',
    location: '2008 Greenville Ave, Dallas, TX 75206',
    neighborhood: 'Lower Greenville',
    best_time: 'Friday Sep 25 (PTO) sunset',
    estimated_duration: '2.5 hours',
    status: 'bucket',
    sister_reaction: 'love',
    created_by: 'sister',
    tags: ['Rooftop', 'Sunset Views', 'Cocktails']
  },

  // 🎢 Entertainment & Sports
  {
    id: 'bucket-six-flags-fright-fest',
    title: 'Six Flags Over Texas & Fright Fest',
    category: CATEGORIES.ENTERTAINMENT,
    description: 'Premier 212-acre theme park with the world-famous Texas Giant rollercoaster, Batman thrill rides, and haunted mazes.',
    location: '2201 E Road to Six Flags St, Arlington, TX 76011',
    neighborhood: 'Arlington Entertainment District',
    best_time: 'Sunday Sep 27 full day & evening',
    estimated_duration: '6-8 hours',
    status: 'bucket',
    sister_reaction: 'must-do',
    created_by: 'eduardo',
    tags: ['Rollercoasters', 'Fright Fest', 'Thrill Park']
  },
  {
    id: 'bucket-medieval-times',
    title: 'Medieval Times Dinner & Jousting Tournament',
    category: CATEGORIES.ENTERTAINMENT,
    description: '11th-century castle arena with Andalusian stallions, knights jousting tournament, and four-course feast.',
    location: '2021 N Stemmons Fwy, Dallas, TX 75207',
    neighborhood: 'Design District / Stemmons Corridor',
    best_time: 'Thursday Sep 24 evening show',
    estimated_duration: '2.5 hours',
    status: 'bucket',
    sister_reaction: null,
    created_by: 'sister',
    tags: ['Jousting', 'Dinner Show', 'Knights']
  },
  {
    id: 'bucket-cowtown-rodeo',
    title: 'Stockyards Championship Rodeo (Cowtown Coliseum)',
    category: CATEGORIES.ENTERTAINMENT,
    description: 'The only year-round rodeo in the world: bull riding, tie-down roping, team roping, barrel racing in historic arena.',
    location: '121 E Exchange Ave, Fort Worth, TX 76164',
    neighborhood: 'Fort Worth Stockyards',
    best_time: 'Saturday Sep 19 (doors 6 PM, show 7:30 PM)',
    estimated_duration: '2.5 hours',
    status: 'bucket',
    sister_reaction: 'must-do',
    created_by: 'eduardo',
    tags: ['Rodeo', 'Bull Riding', 'Stockyards']
  },
  {
    id: 'bucket-empire-concert',
    title: 'Empire of the Sun Concert (Dos Equis Pavilion)',
    category: CATEGORIES.ENTERTAINMENT,
    description: 'Electrifying electronic synth-pop concert under the Dallas stars at Fair Park’s outdoor amphitheater.',
    location: '1818 1st Ave, Dallas, TX 75210',
    neighborhood: 'Fair Park / Dallas',
    best_time: 'Sunday Sep 20 (show listed 7:30 PM)',
    estimated_duration: '3.5 hours',
    status: 'bucket',
    sister_reaction: 'love',
    created_by: 'sister',
    tags: ['Concert', 'Live Music', 'High Priority']
  },

  // 🛍️ Shopping & Culture
  {
    id: 'bucket-northpark-center',
    title: 'NorthPark Center & Museum-Quality Art',
    category: CATEGORIES.SHOPPING_CULTURE,
    description: 'Dallas premier luxury shopping landmark with world-class sculptures by Andy Warhol & Mark di Suvero.',
    location: '8687 N Central Expy, Dallas, TX 75225',
    neighborhood: 'North Dallas',
    best_time: 'Saturday Sep 26 afternoon',
    estimated_duration: '2.5 hours',
    status: 'bucket',
    sister_reaction: null,
    created_by: 'sister',
    tags: ['Luxury Shopping', 'Sculpture Garden', 'Art']
  },
  {
    id: 'bucket-bishop-arts-stroll',
    title: 'Bishop Arts District Boutiques & Coffee',
    category: CATEGORIES.SHOPPING_CULTURE,
    description: 'Over 60 independent boutiques, craft coffee houses, art galleries, and colorful murals in historic Oak Cliff.',
    location: '419 N Bishop Ave, Dallas, TX 75208',
    neighborhood: 'Bishop Arts District',
    best_time: 'Wednesday Sep 23 evening or Friday daytime',
    estimated_duration: '2 hours',
    status: 'bucket',
    sister_reaction: 'love',
    created_by: 'sister',
    tags: ['Indie Boutiques', 'Coffee', 'Murals']
  }
];
