import React, { useState } from 'react';
import { 
  Sparkles, Search, PlusCircle, Calendar, MapPin, Clock, 
  Check, X, Compass, Flame, Coffee, Wine, Music, Heart
} from 'lucide-react';
import { fetchAiScoutRecommendations } from '../services/api';

const QUICK_PROMPTS = [
  { label: '🌮 Tex-Mex & Texas BBQ', query: 'Best authentic smoked brisket and Tex-Mex tacos in Dallas with great vibes' },
  { label: '🍸 Rooftops & Speakeasies', query: 'Cool speakeasy cocktail lounges and rooftop sunset views in Dallas' },
  { label: '🤠 Country Line Dancing', query: 'Authentic Texas two-stepping, live country music, and honky tonk bars' },
  { label: '🎨 Art Pop-Ups & Photos', query: 'Fun immersive interactive art exhibits and aesthetic photo spots in Dallas' },
  { label: '☕ Bishop Arts & Cafes', query: 'Charming cafes, boutique shopping, and desserts in Bishop Arts or Oak Cliff' },
  { label: '💼 Easy Workday Dinners', query: 'Relaxed low-stress dinners and walks for a Thursday or Tuesday after 6 PM work' },
  { label: '🌙 Late Night After 10 PM', query: 'Fun late night food, music, and dessert spots open after 10 PM in Dallas' }
];

export default function AiScoutModal({
  isOpen,
  onClose,
  days,
  onAddToBucket,
  onScheduleItem,
  userMode
}) {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [provider, setProvider] = useState(null);
  const [addedItems, setAddedItems] = useState({});

  const handleSearch = async (searchQuery) => {
    const q = searchQuery || query;
    if (!q.trim()) return;

    setLoading(true);
    setQuery(q);

    try {
      const data = await fetchAiScoutRecommendations(q, userMode);
      if (data.recommendations) {
        setResults(data.recommendations);
        setProvider(data.provider);
      }
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBucket = (rec, idx) => {
    const item = {
      id: `ai-${Date.now()}-${idx}`,
      title: rec.title,
      category: rec.category || 'Culture & Immersion',
      description: `${rec.description} (${rec.why_it_fits || ''})`,
      location: rec.location || 'Dallas Area',
      best_time: rec.best_time || 'Flexible',
      estimated_duration: rec.estimated_duration || '2 hours',
      status: 'bucket',
      sister_reaction: userMode === 'sister' ? 'love' : null,
      created_by: userMode
    };

    onAddToBucket(item);
    setAddedItems(prev => ({ ...prev, [idx]: 'bucket' }));
  };

  const handleDirectSchedule = (rec, dayId, slot, idx) => {
    const item = {
      id: `ai-${Date.now()}-${idx}`,
      title: rec.title,
      category: rec.category || 'Culture & Immersion',
      description: rec.description,
      location: rec.location || 'Dallas Area',
      best_time: rec.best_time || 'Flexible',
      estimated_duration: rec.estimated_duration || '2 hours'
    };

    onScheduleItem(item, dayId, slot);
    setAddedItems(prev => ({ ...prev, [idx]: `scheduled-${dayId}` }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '720px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ background: 'linear-gradient(135deg, #f59e0b, #ec4899)', padding: '0.4rem', borderRadius: '10px', display: 'flex' }}>
              <Sparkles size={20} color="#ffffff" />
            </div>
            <div>
              <h3 className="modal-title">✨ AI Dallas Scout</h3>
              <div style={{ fontSize: '0.775rem', color: '#94a3b8' }}>
                Ask anything for your Sept 14–28 trip — Claude & GPT-4o powered
              </div>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}><X size={18} /></button>
        </div>

        {/* Search Input Bar */}
        <form onSubmit={e => { e.preventDefault(); handleSearch(query); }} style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '13px', color: '#94a3b8' }} />
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: '2.4rem' }}
                placeholder="e.g. Hidden gems in Fort Worth, late night tacos, or relaxing coffee spots..."
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-primary" disabled={loading} style={{ whiteSpace: 'nowrap' }}>
              {loading ? 'Searching...' : 'Ask AI Scout'}
            </button>
          </div>
        </form>

        {/* Quick Suggestion Chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
          {QUICK_PROMPTS.map(p => (
            <button
              key={p.label}
              type="button"
              onClick={() => handleSearch(p.query)}
              disabled={loading}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '0.35rem 0.65rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                color: '#cbd5e1',
                cursor: 'pointer',
                transition: 'all 0.15s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              <span>{p.label}</span>
            </button>
          ))}
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: '#f59e0b' }}>
            <Sparkles size={28} className="animate-spin" style={{ margin: '0 auto 0.75rem', animation: 'spin 2s linear infinite' }} />
            <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Scouting top Dallas recommendations...</div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.25rem' }}>
              Evaluating vibe, work-fit schedules, and neighborhood logistics
            </div>
          </div>
        )}

        {/* Results List */}
        {!loading && results.length > 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
              <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Found {results.length} Curated Ideas:
              </span>
              {provider && (
                <span style={{ fontSize: '0.725rem', color: '#047857', background: 'var(--status-green-bg)', border: '1px solid var(--status-green-border)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>
                  ✓ {provider}
                </span>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {results.map((rec, idx) => {
                const isAddedToBucket = addedItems[idx] === 'bucket';
                const isScheduled = addedItems[idx]?.startsWith('scheduled');

                return (
                  <div
                    key={idx}
                    style={{
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '12px',
                      padding: '1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      transition: 'border-color 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <div>
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ec4899', textTransform: 'uppercase' }}>
                          {rec.category}
                        </span>
                        <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                          {rec.title}
                        </h4>
                      </div>

                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                        {/* Add to Bucket Button */}
                        <button
                          type="button"
                          onClick={() => handleAddBucket(rec, idx)}
                          style={{
                            background: isAddedToBucket ? 'var(--status-green-bg)' : 'var(--status-yellow-bg)',
                            border: isAddedToBucket ? '1px solid var(--status-green-border)' : '1px solid var(--status-yellow-border)',
                            color: isAddedToBucket ? 'var(--status-green-text)' : 'var(--status-yellow-text)',
                            padding: '0.35rem 0.65rem',
                            borderRadius: '6px',
                            fontSize: '0.775rem',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            cursor: 'pointer'
                          }}
                        >
                          {isAddedToBucket ? <Check size={13} /> : <PlusCircle size={13} />}
                          <span>{isAddedToBucket ? 'In Bucket' : 'Add to Bucket 💡'}</span>
                        </button>

                        {/* Direct Schedule Dropdown */}
                        <select
                          className="schedule-to-day-select"
                          defaultValue=""
                          onChange={e => {
                            if (!e.target.value) return;
                            const [dayId, slot] = e.target.value.split(':');
                            handleDirectSchedule(rec, dayId, slot, idx);
                            e.target.value = '';
                          }}
                        >
                          <option value="" disabled>
                            {isScheduled ? '✓ Scheduled!' : '📅 Schedule to Day...'}
                          </option>
                          {days.map(d => (
                            <React.Fragment key={d.id}>
                              <option value={`${d.id}:morning`}>Day {d.day_number} ({d.date_str}) - Morning</option>
                              <option value={`${d.id}:evening`}>Day {d.day_number} ({d.date_str}) - Evening</option>
                              <option value={`${d.id}:night`}>Day {d.day_number} ({d.date_str}) - Night</option>
                            </React.Fragment>
                          ))}
                        </select>
                      </div>
                    </div>

                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.45' }}>
                      {rec.description}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                      {rec.location && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <MapPin size={12} color="var(--accent-amber)" /> {rec.location}
                        </span>
                      )}
                      {rec.best_time && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Clock size={12} color="#0284c7" /> {rec.best_time}
                        </span>
                      )}
                      {rec.estimated_duration && (
                        <span>⏱️ {rec.estimated_duration}</span>
                      )}
                    </div>

                    {rec.why_it_fits && (
                      <div style={{ background: 'rgba(245, 158, 11, 0.06)', borderLeft: '2px solid #f59e0b', padding: '0.35rem 0.6rem', borderRadius: '4px', fontSize: '0.775rem', color: '#fbbf24' }}>
                        💡 <em>{rec.why_it_fits}</em>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Close Scout
          </button>
        </div>
      </div>
    </div>
  );
}
