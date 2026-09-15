# 🤠 Dallas Trip Itinerary & Collaboration Web App (Sept 14–28, 2026)

A modern, collaborative trip planning and scheduling application built for Eduardo and his sister to manage their Dallas itinerary.

**Production Live URL:** [https://happy-ground-09970440f.5.azurestaticapps.net](https://happy-ground-09970440f.5.azurestaticapps.net)

---

## 🌟 Key Features

1. **Master Work-Friendly Calendar (15 Days)**:
   - **Work-Fit Status Badges**:
     - `YELLOW` (Workday: Work until ~6 PM, relaxed evenings, low-friction dinners).
     - `GREEN` (Full Day / PTO / Weekend: Meow Wolf, Escapade 2001, Fort Worth Stockyards cattle drive, Cowtown Rodeo, Empire of the Sun concert, Six Flags Fright Fest).
   - **3 Daily Slots**: Morning, Evening, Night.

2. **Drag-and-Drop & 1-Click Slot Swapping**:
   - Drag any slot (e.g. Day 4 Evening) onto another day or slot to instantly swap.
   - Built-in touch-friendly **Swap Slot** modal for mobile devices.
   - Edit any slot description or day notes in real-time.

3. **Bucket of Unscheduled Dallas Ideas**:
   - A backlog of curated Dallas & Fort Worth activities (Meow Wolf Grapevine, Cowboys Red River line dancing, Terry Black's BBQ, Katy Trail Ice House, Dallas Arboretum, Reunion Tower GeO-Deck, Klyde Warren Park, Emporium Pies, etc.).
   - Add new custom ideas anytime with location, category, and estimated duration.
   - Schedule any bucket idea into a specific day slot with 1 click.
   - Sibling reactions (💖 Love, ⭐ Must-Do).

4. **Dallas Cowboys Schedule & Conflict Alerts**:
   - Complete tracking of all 5 Cowboys games around the trip:
     - **Before**: Sep 13, 7:20 PM CDT @ Giants
     - **DURING (Conflict)**: Sep 20, 3:25 PM CDT vs Commanders at AT&T Stadium (Flagged: conflicts with Empire of the Sun concert at Dos Equis Pavilion — concert prioritized!)
     - **DURING**: Sep 27, 3:25 PM CDT vs Ravens at Maracanã Stadium in Brazil (not Dallas — full day Six Flags & Fright Fest!)
     - **After**: Oct 4, 12:00 PM CDT @ Texans
     - **After**: Oct 8, 7:15 PM CDT vs Buccaneers at AT&T Stadium

5. **Cloud Synchronization (Turso SQLite)**:
   - Powered by **Turso Cloud SQLite** (`@libsql/client`) with zero-friction shared links so both siblings can open the URL on mobile or desktop without authentication barriers.
   - Optimistic local UI updates with `localStorage` fallback.

---

## 🚀 Development & Deployment

### Local Development
```bash
# Run local frontend
npm run dev

# Run build verification
npm run build
```

### Deploy to Azure Static Web Apps
```bash
npm run deploy
```
*(Stages Linux-targeted API dependencies and deploys directly to Azure Static Web Apps Free tier)*.
