import React from 'react';
import { 
  Sparkles, Calendar, CheckCircle2, Clock, MapPin, 
  ArrowRight, Compass, ShieldAlert, Heart, PlusCircle
} from 'lucide-react';

export default function UltimatePlannerBanner({
  onOpenAiScout,
  onOpenDallasGuide,
  days,
  onAddQuickIdea
}) {
  const topSuggestions = [
    { title: 'Meow Wolf Grapevine ("The Real Unreal")', cat: 'Culture', dayHint: 'Great for Fri Sep 18 (PTO)', loc: 'Grapevine' },
    { title: "Terry Black's BBQ Smoked Brisket", cat: 'Food', dayHint: 'Best for Tue/Wed Deep Ellum', loc: 'Deep Ellum' },
    { title: 'Cowboys Red River Line Dancing', cat: 'Nightlife', dayHint: 'Ideal for Thu Sep 17 night', loc: 'NW Dallas' },
    { title: 'Dallas Arboretum & Pumpkin Village', cat: 'Outdoors', dayHint: 'Perfect for Fri Sep 25 (PTO)', loc: 'White Rock Lake' },
    { title: 'Katy Trail Ice House Giant Schooners', cat: 'Social', dayHint: 'Relaxed Tuesday evening', loc: 'Uptown' },
    { title: 'Emporium Pies Handcrafted Slices', cat: 'Dessert', dayHint: 'Wed Sep 23 in Bishop Arts', loc: 'Bishop Arts' }
  ];

  return (
    <div className="ultimate-planner-banner">
      {/* Top Banner Overview */}
      <div className="planner-overview-grid">
        <div className="planner-card highlight-pto">
          <div className="planner-card-header">
            <span className="planner-card-badge pto">🌟 OFF / PTO Days</span>
            <span className="planner-card-count">2 Days</span>
          </div>
          <div className="planner-card-title">Fri Sep 18 & Fri Sep 25</div>
          <div className="planner-card-desc">
            You are 100% OFF both Fridays! Ideal for Meow Wolf Grapevine, White Rock Lake Arboretum, and nightlife.
          </div>
        </div>

        <div className="planner-card highlight-weekend">
          <div className="planner-card-header">
            <span className="planner-card-badge weekend">🎉 Full Adventure Weekends</span>
            <span className="planner-card-count">4 Days</span>
          </div>
          <div className="planner-card-title">Stockyards, Concert & Six Flags</div>
          <div className="planner-card-desc">
            Sep 19 (Cowtown Rodeo), Sep 20 (Empire of the Sun), Sep 26 (Perot & Shopping), Sep 27 (Six Flags).
          </div>
        </div>

        <div className="planner-card highlight-work">
          <div className="planner-card-header">
            <span className="planner-card-badge work">💼 Work-Friendly Evenings</span>
            <span className="planner-card-count">9 Days</span>
          </div>
          <div className="planner-card-title">Work Until ~6 PM</div>
          <div className="planner-card-desc">
            Low-stress dinners & short commutes (Deep Ellum, Bishop Arts, Medieval Times, quiet recharge nights).
          </div>
        </div>
      </div>

      {/* Quick Curated Suggestions Strip */}
      <div className="quick-suggestions-strip">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Sparkles size={16} color="#f59e0b" />
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Smart Dallas Suggestions for Your Trip:
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn-scout-inline" onClick={onOpenAiScout}>
              <Sparkles size={13} />
              <span>Ask AI Scout ✨</span>
            </button>
            <button className="btn-guide-inline" onClick={onOpenDallasGuide}>
              <MapPin size={13} />
              <span>Neighborhoods</span>
            </button>
          </div>
        </div>

        <div className="suggestions-scroll-row">
          {topSuggestions.map((s, idx) => (
            <div key={idx} className="suggestion-pill-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                <span className="suggestion-cat-tag">{s.cat}</span>
                <span className="suggestion-loc-tag">{s.loc}</span>
              </div>
              <div className="suggestion-pill-title">{s.title}</div>
              <div className="suggestion-pill-hint">💡 {s.dayHint}</div>
              <button
                type="button"
                className="suggestion-add-btn"
                onClick={() => {
                  onAddQuickIdea({
                    id: `sug-${Date.now()}-${idx}`,
                    title: s.title,
                    category: s.cat === 'Food' ? 'Food & Texas BBQ' : s.cat === 'Nightlife' ? 'Nightlife & Dancing' : 'Culture & Immersion',
                    description: s.dayHint,
                    location: s.loc,
                    best_time: 'Flexible',
                    estimated_duration: '2 hours',
                    status: 'bucket',
                    sister_reaction: 'love',
                    created_by: 'planner'
                  });
                }}
              >
                <PlusCircle size={12} />
                <span>Add to Bucket</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
