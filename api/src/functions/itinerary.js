const { app } = require('@azure/functions');
const { createClient } = require('@libsql/client');

let db;

function getDb() {
  if (!db) {
    const url = process.env.TURSO_DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;
    if (!url || !authToken) {
      throw new Error('TURSO_DATABASE_URL or TURSO_AUTH_TOKEN environment variables missing');
    }
    db = createClient({ url, authToken });
  }
  return db;
}

const DEFAULT_DAYS = [
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
    notes: 'Confirm hotel keys, pick up rental/rideshare, stock essentials.'
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
    notes: 'Check out Elm St murals and Pecan Lodge / Terry Blacks area.'
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
    notes: 'Low key night to keep energy high for the weekend.'
  },
  {
    id: 'day-4',
    day_number: 4,
    date_str: 'Thu, Sep 17',
    day_of_week: 'Thursday',
    status: 'YELLOW',
    status_label: 'Flexible evening',
    morning_plan: 'Work until about 6 PM.',
    evening_plan: 'Free evening; choose a relaxed dinner or nearby activity (Perot Museum late or line dancing at Cowboys Red River).',
    night_plan: 'Rest or a flexible nearby plan.',
    notes: 'Sister mentioned Perot Museum or country line dancing!'
  },
  {
    id: 'day-5',
    day_number: 5,
    date_str: 'Fri, Sep 18',
    day_of_week: 'Friday',
    status: 'GREEN',
    status_label: 'Friday night / PTO',
    morning_plan: 'Suggested PTO Day. Daytime relaxation or sightseeing (Meow Wolf Grapevine / "Meow place").',
    evening_plan: 'Dinner, get ready, then Escapade 2001.',
    night_plan: 'Club only if you still feel up for it.',
    notes: 'Escapade 2001 Latin mega-club night. Dress to impress!'
  },
  {
    id: 'day-6',
    day_number: 6,
    date_str: 'Sat, Sep 19',
    day_of_week: 'Saturday',
    status: 'GREEN',
    status_label: 'Full Fort Worth Day',
    morning_plan: 'Leave Dallas by 9:30 AM; Stockyards, watch 11:30 cattle drive, Sundance Square.',
    evening_plan: 'Lunch, boot shops, then Cowtown Rodeo (doors 6 PM, show 7:30 PM).',
    night_plan: 'Return to Dallas after rodeo; arrange rideshare/driver.',
    notes: 'Authentic Fort Worth longhorn cattle drive & Cowtown Rodeo tickets.'
  },
  {
    id: 'day-7',
    day_number: 7,
    date_str: 'Sun, Sep 20',
    day_of_week: 'Sunday',
    status: 'GREEN',
    status_label: 'Concert Night',
    morning_plan: 'AT&T Stadium note: Cowboys game overlaps tonight concert - not scheduled. Brunch and concert prep only.',
    evening_plan: 'Early dinner near Dos Equis; aim to arrive around 6:30 PM.',
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
    notes: 'Recovery from weekend concert.'
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
    notes: 'Option to visit Katy Trail Ice House or Uptown.'
  },
  {
    id: 'day-10',
    day_number: 10,
    date_str: 'Wed, Sep 23',
    day_of_week: 'Wednesday',
    status: 'YELLOW',
    status_label: 'Limited after 6 PM',
    morning_plan: 'Work until about 6 PM.',
    evening_plan: 'Bishop Arts dinner and a short walk; shops may close early.',
    night_plan: 'Home early.',
    notes: 'Try tacos, boutique shops, and pie at Emporium Pies in Bishop Arts.'
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
    notes: 'Medieval Times castle & jousting tournament in Dallas.'
  },
  {
    id: 'day-12',
    day_number: 12,
    date_str: 'Fri, Sep 25',
    day_of_week: 'Friday',
    status: 'GREEN',
    status_label: 'Friday / PTO',
    morning_plan: 'Suggested PTO Day. Daytime activities (Dallas Arboretum or Museum District).',
    evening_plan: 'Dinner and evening plans (Lower Greenville rooftop drinks).',
    night_plan: 'Rest and recharge for weekend.',
    notes: 'Relaxed Friday preparing for Six Flags weekend.'
  },
  {
    id: 'day-13',
    day_number: 13,
    date_str: 'Sat, Sep 26',
    day_of_week: 'Saturday',
    status: 'GREEN',
    status_label: 'Busy weekend',
    morning_plan: 'Perot Museum at 10 AM; allow 2-3 hours for exhibits.',
    evening_plan: 'NorthPark + Park Lane shopping, then Highland Park Village dinner.',
    night_plan: 'Free evening; no extra big activity.',
    notes: 'Perot Museum dinosaur hall + premier luxury shopping.'
  },
  {
    id: 'day-14',
    day_number: 14,
    date_str: 'Sun, Sep 27',
    day_of_week: 'Sunday',
    status: 'GREEN',
    status_label: 'Full-day park',
    morning_plan: 'Six Flags opening; full-day park visit (Cowboys vs Ravens at Maracanã in Brazil today on TV).',
    evening_plan: 'Rides, shows, and dinner in the park.',
    night_plan: 'Fright Fest after dark; return when ready.',
    notes: 'Six Flags Over Texas rollercoasters + Fright Fest haunted houses.'
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
    notes: 'Safe travels home! Ensure all souvenirs packed.'
  }
];

const DEFAULT_BUCKET = [
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
    created_by: 'sister'
  },
  {
    id: 'bucket-cowboys-line-dancing',
    title: 'Cowboys Red River Line Dancing',
    category: 'Nightlife & Dancing',
    description: 'Legendary Dallas country dance hall with free two-step & line dance lessons and live music.',
    location: 'Northwest Dallas',
    best_time: 'Thursday - Saturday night',
    estimated_duration: '3 hours',
    status: 'bucket',
    sister_reaction: 'love',
    created_by: 'sister'
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
    created_by: 'eduardo'
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
    created_by: 'eduardo'
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
    created_by: 'eduardo'
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
    created_by: 'sister'
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
    created_by: 'sister'
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
    created_by: 'eduardo'
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
    created_by: 'sister'
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
    created_by: 'eduardo'
  }
];

async function ensureData(db) {
  const check = await db.execute('SELECT COUNT(*) as count FROM itinerary_days');
  const count = check.rows[0]?.count || 0;
  if (count === 0) {
    for (const d of DEFAULT_DAYS) {
      await db.execute({
        sql: `INSERT INTO itinerary_days (id, day_number, date_str, day_of_week, status, status_label, morning_plan, evening_plan, night_plan, notes)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [d.id, d.day_number, d.date_str, d.day_of_week, d.status, d.status_label, d.morning_plan, d.evening_plan, d.night_plan, d.notes]
      });
    }

    for (const b of DEFAULT_BUCKET) {
      await db.execute({
        sql: `INSERT INTO bucket_items (id, title, category, description, location, best_time, estimated_duration, status, sister_reaction, created_by)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [b.id, b.title, b.category, b.description, b.location, b.best_time, b.estimated_duration, b.status, b.sister_reaction, b.created_by]
      });
    }
  }
}

function json(status, body) {
  return {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    },
    body: JSON.stringify(body)
  };
}

async function handleGet(request, context) {
  try {
    const db = getDb();
    await ensureData(db);

    const daysRes = await db.execute('SELECT * FROM itinerary_days ORDER BY day_number ASC');
    const bucketRes = await db.execute('SELECT * FROM bucket_items ORDER BY created_by, title ASC');

    return json(200, {
      success: true,
      days: daysRes.rows,
      bucket: bucketRes.rows,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    context.error('Failed to get itinerary:', err);
    return json(500, { success: false, error: err.message, defaultFallback: { days: DEFAULT_DAYS, bucket: DEFAULT_BUCKET } });
  }
}

async function handleUpdateSlot(request, context) {
  try {
    const db = getDb();
    const body = await request.json();
    const { dayId, slotType, content, notes } = body;

    if (!dayId || !slotType) {
      return json(400, { success: false, error: 'dayId and slotType are required' });
    }

    const column = slotType === 'morning' ? 'morning_plan' : slotType === 'evening' ? 'evening_plan' : 'night_plan';

    let sql = `UPDATE itinerary_days SET ${column} = ?, updated_at = CURRENT_TIMESTAMP`;
    const args = [content];

    if (notes !== undefined) {
      sql += `, notes = ?`;
      args.push(notes);
    }

    sql += ` WHERE id = ?`;
    args.push(dayId);

    await db.execute({ sql, args });

    return json(200, { success: true });
  } catch (err) {
    context.error('Failed to update slot:', err);
    return json(500, { success: false, error: err.message });
  }
}

async function handleSwapSlots(request, context) {
  try {
    const db = getDb();
    const body = await request.json();
    const { sourceDayId, sourceSlot, targetDayId, targetSlot } = body;

    if (!sourceDayId || !sourceSlot || !targetDayId || !targetSlot) {
      return json(400, { success: false, error: 'sourceDayId, sourceSlot, targetDayId, and targetSlot are required' });
    }

    const sourceCol = sourceSlot === 'morning' ? 'morning_plan' : sourceSlot === 'evening' ? 'evening_plan' : 'night_plan';
    const targetCol = targetSlot === 'morning' ? 'morning_plan' : targetSlot === 'evening' ? 'evening_plan' : 'night_plan';

    const sourceRes = await db.execute({
      sql: `SELECT ${sourceCol} as text FROM itinerary_days WHERE id = ?`,
      args: [sourceDayId]
    });
    const targetRes = await db.execute({
      sql: `SELECT ${targetCol} as text FROM itinerary_days WHERE id = ?`,
      args: [targetDayId]
    });

    const sourceText = sourceRes.rows[0]?.text || '';
    const targetText = targetRes.rows[0]?.text || '';

    await db.batch([
      {
        sql: `UPDATE itinerary_days SET ${sourceCol} = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
        args: [targetText, sourceDayId]
      },
      {
        sql: `UPDATE itinerary_days SET ${targetCol} = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
        args: [sourceText, targetDayId]
      }
    ], 'write');

    return json(200, { success: true, swapped: { sourceText: targetText, targetText: sourceText } });
  } catch (err) {
    context.error('Failed to swap slots:', err);
    return json(500, { success: false, error: err.message });
  }
}

async function handleSaveBucketItem(request, context) {
  try {
    const db = getDb();
    const item = await request.json();

    if (!item.id || !item.title) {
      return json(400, { success: false, error: 'id and title are required' });
    }

    await db.execute({
      sql: `INSERT INTO bucket_items (id, title, category, description, location, best_time, estimated_duration, status, sister_reaction, created_by, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
            ON CONFLICT(id) DO UPDATE SET
              title = excluded.title,
              category = excluded.category,
              description = excluded.description,
              location = excluded.location,
              best_time = excluded.best_time,
              estimated_duration = excluded.estimated_duration,
              status = excluded.status,
              sister_reaction = excluded.sister_reaction,
              created_by = excluded.created_by,
              updated_at = CURRENT_TIMESTAMP`,
      args: [
        item.id,
        item.title,
        item.category || 'General Idea',
        item.description || '',
        item.location || 'Dallas Area',
        item.best_time || 'Flexible',
        item.estimated_duration || '2 hours',
        item.status || 'bucket',
        item.sister_reaction || null,
        item.created_by || 'sister'
      ]
    });

    return json(200, { success: true });
  } catch (err) {
    context.error('Failed to save bucket item:', err);
    return json(500, { success: false, error: err.message });
  }
}

async function handleReset(request, context) {
  try {
    const db = getDb();
    await db.execute('DELETE FROM itinerary_days');
    await db.execute('DELETE FROM bucket_items');
    await ensureData(db);
    return json(200, { success: true, message: 'Reset to master itinerary' });
  } catch (err) {
    context.error('Failed to reset:', err);
    return json(500, { success: false, error: err.message });
  }
}

app.http('getItinerary', {
  route: 'itinerary',
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: handleGet
});

app.http('updateSlot', {
  route: 'itinerary/update-slot',
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: handleUpdateSlot
});

app.http('swapSlots', {
  route: 'itinerary/swap-slots',
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: handleSwapSlots
});

app.http('saveBucketItem', {
  route: 'itinerary/bucket-item',
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: handleSaveBucketItem
});

app.http('resetItinerary', {
  route: 'itinerary/reset',
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: handleReset
});

module.exports = {
  handleGet,
  handleUpdateSlot,
  handleSwapSlots,
  handleSaveBucketItem,
  handleReset
};
