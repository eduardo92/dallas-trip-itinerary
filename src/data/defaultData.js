export const INITIAL_DAYS = [
  {
    id: 'day-1',
    day_number: 1,
    date_str: 'Mon, Sep 14',
    day_of_week: 'Monday',
    status: 'YELLOW',
    status_label: 'Arrival Day',
    morning_plan: 'Fly Leon to Dallas; airport transfer; hotel check-in.',
    evening_plan: 'Pick up water, snacks, and basics; relaxed dinner near hotel.',
    night_plan: 'Unpack, confirm weekend bookings, sleep early.',
    notes: 'Airport arrival, rideshare/rental, grocery essentials run.'
  },
  {
    id: 'day-2',
    day_number: 2,
    date_str: 'Tue, Sep 15',
    day_of_week: 'Tuesday',
    status: 'YELLOW',
    status_label: 'Good after 6 PM',
    morning_plan: 'Work until about 6 PM.',
    evening_plan: 'Deep Ellum dinner; murals and food before the music starts.',
    night_plan: 'Live music if energy allows; rideshare home.',
    notes: 'Deep Ellum vibrant arts & culinary strip. Great murals for photos.'
  },
  {
    id: 'day-3',
    day_number: 3,
    date_str: 'Wed, Sep 16',
    day_of_week: 'Wednesday',
    status: 'YELLOW',
    status_label: 'Buffer night',
    morning_plan: 'Work until about 6 PM.',
    evening_plan: 'Groceries, laundry, or an easy nearby meal.',
    night_plan: 'Rest and recharge; keep the night flexible.',
    notes: 'Keep it light to stay energized for the weekend ahead.'
  },
  {
    id: 'day-4',
    day_number: 4,
    date_str: 'Thu, Sep 17',
    day_of_week: 'Thursday',
    status: 'YELLOW',
    status_label: 'Flexible evening',
    morning_plan: 'Work until about 6 PM.',
    evening_plan: 'Free evening: relaxed dinner or bring her to line dancing at Cowboys Red River (or Perot Museum).',
    night_plan: 'Rest or a flexible nearby plan.',
    notes: 'Sister mentioned Perot Museum or country line dancing!'
  },
  {
    id: 'day-5',
    day_number: 5,
    date_str: 'Fri, Sep 18',
    day_of_week: 'Friday',
    status: 'GREEN',
    status_label: 'OFF / PTO (Confirmed)',
    morning_plan: '🎉 OFF TODAY (PTO): Sleep in, relaxed brunch, then Meow Wolf Grapevine ("The Real Unreal") immersive multiverse.',
    evening_plan: 'Dinner & drinks near hotel, get ready, then head to Escapade 2001.',
    night_plan: 'Escapade 2001 (Multi-room Latin mega-club: cumbia, salsa, bachata, norteño).',
    notes: 'Confirmed full day off! No work rush. Meow Wolf + mega party night.'
  },

  {
    id: 'day-6',
    day_number: 6,
    date_str: 'Sat, Sep 19',
    day_of_week: 'Saturday',
    status: 'GREEN',
    status_label: 'Full Fort Worth Day',
    morning_plan: 'Leave Dallas by 9:30 AM; Fort Worth Stockyards, watch 11:30 AM cattle drive, Sundance Square.',
    evening_plan: 'Lunch, boot shops, then Cowtown Rodeo (doors 6 PM, show 7:30 PM).',
    night_plan: 'Return to Dallas after rodeo; arrange rideshare/driver.',
    notes: 'Historic Stockyards longhorn cattle drive + Cowtown Rodeo.'
  },
  {
    id: 'day-7',
    day_number: 7,
    date_str: 'Sun, Sep 20',
    day_of_week: 'Sunday',
    status: 'GREEN',
    status_label: 'Concert Night',
    morning_plan: 'AT&T Stadium note: Cowboys game overlaps tonight concert - not scheduled. Brunch and concert prep only.',
    evening_plan: 'Early dinner near Dos Equis Pavilion; aim to arrive around 6:30 PM.',
    night_plan: 'Empire of the Sun at Dos Equis Pavilion; show listed 7:30 PM.',
    notes: 'Cowboys vs Commanders at 3:25 PM conflicts with concert - concert prioritized!'
  },
  {
    id: 'day-8',
    day_number: 8,
    date_str: 'Mon, Sep 21',
    day_of_week: 'Monday',
    status: 'YELLOW',
    status_label: 'Short evening only',
    morning_plan: 'Work until about 6 PM; no daytime outing.',
    evening_plan: 'Nearby dinner or coffee; keep the commute short.',
    night_plan: 'Home early and recharge.',
    notes: 'Post-concert recovery day.'
  },
  {
    id: 'day-9',
    day_number: 9,
    date_str: 'Tue, Sep 22',
    day_of_week: 'Tuesday',
    status: 'YELLOW',
    status_label: 'Flexible',
    morning_plan: 'Work until about 6 PM.',
    evening_plan: 'Flexible nearby dinner or fully free evening.',
    night_plan: 'Rest; no commitments.',
    notes: 'Option to stroll Katy Trail or grab drinks at Katy Trail Ice House.'
  },
  {
    id: 'day-10',
    day_number: 10,
    date_str: 'Wed, Sep 23',
    day_of_week: 'Wednesday',
    status: 'YELLOW',
    status_label: 'Limited after 6 PM',
    morning_plan: 'Work until about 6 PM.',
    evening_plan: 'Bishop Arts dinner and a short walk; boutique shops and tacos.',
    night_plan: 'Home early.',
    notes: 'Bishop Arts District: artisan boutiques, cozy patios, Emporium Pies.'
  },
  {
    id: 'day-11',
    day_number: 11,
    date_str: 'Thu, Sep 24',
    day_of_week: 'Thursday',
    status: 'YELLOW',
    status_label: 'Evening ticket',
    morning_plan: 'Work until about 6 PM.',
    evening_plan: 'Medieval Times dinner tournament; arrive before check-in.',
    night_plan: 'Rideshare home after the show.',
    notes: 'Jousting, horses, knights, and four-course medieval feast.'
  },
  {
    id: 'day-12',
    day_number: 12,
    date_str: 'Fri, Sep 25',
    day_of_week: 'Friday',
    status: 'GREEN',
    status_label: 'OFF / PTO (Confirmed)',
    morning_plan: '🎉 OFF TODAY (PTO): Dallas Arboretum & Autumn Pumpkin Village on White Rock Lake (or Bishop Arts stroll & tacos).',
    evening_plan: 'Lower Greenville rooftop sunset dinner & cocktails at HG Sply Co.',
    night_plan: 'Relaxed drinks or live music patio recharge for Six Flags weekend.',
    notes: 'Confirmed full day off! Lakeside gardens, rooftop sunset, no work stress.'
  },

  {
    id: 'day-13',
    day_number: 13,
    date_str: 'Sat, Sep 26',
    day_of_week: 'Saturday',
    status: 'GREEN',
    status_label: 'Busy weekend',
    morning_plan: 'Perot Museum of Nature and Science at 10 AM; allow 2-3 hours for exhibits.',
    evening_plan: 'NorthPark Center + Park Lane shopping, then Highland Park Village dinner.',
    night_plan: 'Free evening; no extra big activity.',
    notes: 'Perot Museum architectural marvel + upscale Dallas shopping.'
  },
  {
    id: 'day-14',
    day_number: 14,
    date_str: 'Sun, Sep 27',
    day_of_week: 'Sunday',
    status: 'GREEN',
    status_label: 'Full-day park',
    morning_plan: 'Six Flags opening; full-day park visit (Cowboys vs Ravens at Maracanã in Brazil today on TV).',
    evening_plan: 'Rides, thrill coasters, and dinner in the park.',
    night_plan: 'Fright Fest after dark; return when ready.',
    notes: 'Six Flags Over Texas rollercoasters + Fright Fest haunted mazes.'
  },
  {
    id: 'day-15',
    day_number: 15,
    date_str: 'Mon, Sep 28',
    day_of_week: 'Monday',
    status: 'YELLOW',
    status_label: 'Airport day',
    morning_plan: 'Check out; leave bags at hotel. Choose Arboretum OR NorthPark.',
    evening_plan: 'Return bags; leave for DFW around 7 PM; airport dinner.',
    night_plan: '10 PM flight - passport, charger, boarding pass ready.',
    notes: 'Safe travels! Return to Leon.'
  }
];

export const INITIAL_BUCKET = [
  {
    id: 'bucket-meow-wolf',
    title: 'Meow Wolf Grapevine ("The Real Unreal")',
    category: 'Culture & Immersion',
    description: 'Mind-bending interactive art multiverse with hidden secret passages inside Grapevine Mills.',
    location: 'Grapevine Mills Mall',
    best_time: 'Weekday afternoon or weekend daytime',
    estimated_duration: '2-3 hours',
    status: 'bucket',
    sister_reaction: 'love',
    created_by: 'sister',
    tags: ['Interactive', 'Art', 'Must-See']
  },
  {
    id: 'bucket-cowboys-line-dancing',
    title: 'Cowboys Red River Line Dancing',
    category: 'Nightlife & Dancing',
    description: 'Legendary Dallas country dance hall with free two-step & line dance lessons and live country music.',
    location: 'Northwest Dallas',
    best_time: 'Thursday - Saturday night',
    estimated_duration: '3 hours',
    status: 'bucket',
    sister_reaction: 'love',
    created_by: 'sister',
    tags: ['Dancing', 'Country', 'Texas Vibe']
  },
  {
    id: 'bucket-billy-bobs',
    title: "Billy Bob's Texas (Fort Worth)",
    category: 'Nightlife & Dancing',
    description: "The world's largest honky-tonk: bull riding arena, 30+ bar stations, and historic country stages.",
    location: 'Fort Worth Stockyards',
    best_time: 'Friday or Saturday night',
    estimated_duration: '3 hours',
    status: 'bucket',
    sister_reaction: null,
    created_by: 'eduardo',
    tags: ['Honky Tonk', 'Stockyards', 'Iconic']
  },
  {
    id: 'bucket-terry-blacks',
    title: "Terry Black's BBQ or Pecan Lodge",
    category: 'Food & Texas BBQ',
    description: 'World-famous Texas brisket, beef ribs, jalapeño cheddar sausages, and banana pudding.',
    location: 'Deep Ellum',
    best_time: 'Lunch or early dinner (before sellout)',
    estimated_duration: '1.5 hours',
    status: 'bucket',
    sister_reaction: 'must-do',
    created_by: 'eduardo',
    tags: ['BBQ', 'Smoked Brisket', 'Foodie']
  },
  {
    id: 'bucket-katy-trail',
    title: 'Katy Trail & Ice House',
    category: 'Outdoors & Social',
    description: 'Iconic shaded 3.5-mile urban trail ending at Dallas’s favorite beer garden patio under oak trees.',
    location: 'Uptown Dallas',
    best_time: 'Sunny afternoon / early evening',
    estimated_duration: '2 hours',
    status: 'bucket',
    sister_reaction: null,
    created_by: 'eduardo',
    tags: ['Walking', 'Beer Garden', 'Casual']
  },
  {
    id: 'bucket-dallas-arboretum',
    title: 'Dallas Arboretum & Pumpkin Village',
    category: 'Outdoors & Scenery',
    description: '66-acre botanical wonderland on White Rock Lake with autumn floral displays and pumpkin village.',
    location: 'East Dallas (White Rock Lake)',
    best_time: 'Morning or golden hour',
    estimated_duration: '2.5 hours',
    status: 'bucket',
    sister_reaction: 'love',
    created_by: 'sister',
    tags: ['Gardens', 'Lake View', 'Scenic']
  },
  {
    id: 'bucket-reunion-tower',
    title: 'Reunion Tower GeO-Deck',
    category: 'Views & Sightseeing',
    description: 'Panoramic 360-degree observation deck with high-definition zoom cameras and sunset views.',
    location: 'Downtown Dallas',
    best_time: 'Sunset (around 7:15 PM)',
    estimated_duration: '1.5 hours',
    status: 'bucket',
    sister_reaction: null,
    created_by: 'sister',
    tags: ['Skyline', 'Observation Deck', 'Photos']
  },
  {
    id: 'bucket-klyde-warren',
    title: 'Klyde Warren Deck Park & Food Trucks',
    category: 'Food & Outdoors',
    description: 'Urban park built over a freeway with gourmet food trucks, lawn games, and Dallas Arts District vibes.',
    location: 'Downtown / Arts District',
    best_time: 'Lunchtime or Sunday afternoon',
    estimated_duration: '1.5 hours',
    status: 'bucket',
    sister_reaction: null,
    created_by: 'eduardo',
    tags: ['Park', 'Food Trucks', 'Walkable']
  },
  {
    id: 'bucket-emporium-pies',
    title: 'Emporium Pies in Bishop Arts',
    category: 'Food & Sweets',
    description: 'Charming vintage cottage serving famous handcrafted pies like Lord of the Pies and Smooth Operator.',
    location: 'Bishop Arts District',
    best_time: 'After dinner dessert',
    estimated_duration: '45 mins',
    status: 'bucket',
    sister_reaction: 'love',
    created_by: 'sister',
    tags: ['Dessert', 'Bishop Arts', 'Sweet']
  },
  {
    id: 'bucket-att-discovery',
    title: 'AT&T Discovery District & Media Wall',
    category: 'Culture & Immersion',
    description: 'Futuristic outdoor digital plaza with a 104-foot tall 6K LED media wall, beer garden, and food hall.',
    location: 'Downtown Dallas',
    best_time: 'Night after 7 PM',
    estimated_duration: '1.5 hours',
    status: 'bucket',
    sister_reaction: null,
    created_by: 'eduardo',
    tags: ['Downtown', 'Media Wall', 'Night']
  },
  {
    id: 'bucket-george-bush-library',
    title: 'George W. Bush Presidential Center',
    category: 'Culture & Immersion',
    description: 'Full-scale replica of the Oval Office, 9/11 steel beam memorial, and interactive Decision Points theater.',
    location: 'SMU Campus (University Park)',
    best_time: 'Midday 11 AM - 3 PM',
    estimated_duration: '2 hours',
    status: 'bucket',
    sister_reaction: null,
    created_by: 'eduardo',
    tags: ['History', 'Museum', 'SMU']
  },
  {
    id: 'bucket-water-gardens',
    title: 'Fort Worth Water Gardens',
    category: 'Outdoors & Scenery',
    description: 'Architectural marvel with cascading water terraces and meditation pools in downtown Fort Worth.',
    location: 'Downtown Fort Worth',
    best_time: 'Afternoon during Fort Worth trip',
    estimated_duration: '45 mins',
    status: 'bucket',
    sister_reaction: null,
    created_by: 'sister',
    tags: ['Fort Worth', 'Architecture', 'Water']
  }
];

export const DALLAS_NEIGHBORHOODS = [
  {
    name: 'Deep Ellum',
    vibe: 'Live Music & Texas BBQ',
    highlights: ['Terry Black’s BBQ & Pecan Lodge', 'Iconic murals & street art', 'Trees, The Bomb Factory music venues']
  },
  {
    name: 'Bishop Arts District',
    vibe: 'Boutique & Indie Charm',
    highlights: ['Emporium Pies', 'Veracruz Cafe & artisan tacos', 'Independent bookshops & craft coffee']
  },
  {
    name: 'Fort Worth Stockyards',
    vibe: 'Wild West Heritage',
    highlights: ['Twice-daily cattle drive (11:30 AM & 4:00 PM)', 'Cowtown Coliseum Rodeo', 'Billy Bob’s Texas']
  },
  {
    name: 'Downtown & Arts District',
    vibe: 'Skyline & Culture',
    highlights: ['Perot Museum of Nature and Science', 'Klyde Warren Deck Park food trucks', 'AT&T Discovery District LED Plaza']
  },
  {
    name: 'Uptown & Oak Lawn',
    vibe: 'Lively & Cosmopolitan',
    highlights: ['Katy Trail Ice House beer garden', 'Vintage trolley on McKinney Ave', 'Escapade 2001 (NW Dallas)']
  },
  {
    name: 'Arlington Entertainment District',
    vibe: 'Sports & Mega Thrills',
    highlights: ['AT&T Stadium (Cowboys)', 'Six Flags Over Texas & Fright Fest', 'Globe Life Field (Texas Rangers)']
  }
];
