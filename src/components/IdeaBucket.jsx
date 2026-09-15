import React, { useState } from 'react';
import { 
  Sparkles, Plus, MapPin, Clock, Heart, Star, Trash2, Calendar, 
  ArrowRight, Filter, Bookmark, Check, Navigation, ExternalLink, PlusCircle
} from 'lucide-react';
import { CATEGORIES } from '../data/dallasPlaces';

export default function IdeaBucket({
  bucketItems,
  days,
  onScheduleItem,
  onToggleReaction,
  onAddBucketItem,
  onDeleteBucketItem,
  onOpenAiScout,
  onOpenAddPlace,
  userMode,
  setDragItem
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categoryList = [
    { key: 'all', label: '✨ All Ideas' },
    { key: CATEGORIES.MUST_SEES, label: '🌟 Must-Sees Dallas' },
    { key: CATEGORIES.FOOD_BBQ, label: '🍖 Food & BBQ' },
    { key: CATEGORIES.BARS_NIGHTLIFE, label: '🍸 Bars & Nightlife' },
    { key: CATEGORIES.ENTERTAINMENT, label: '🎢 Entertainment & Sports' },
    { key: CATEGORIES.SHOPPING_CULTURE, label: '🛍️ Shopping & Culture' }
  ];

  const filteredItems = bucketItems.filter(item => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'bucket', id: item.id, title: item.title, description: item.description, location: item.location }));
    if (setDragItem) setDragItem({ type: 'bucket', id: item.id, title: item.title, description: item.description });
  };

  return (
    <section className="bucket-section">
      {/* Header */}
      <div className="bucket-header">
        <div className="bucket-title-area">
          <div className="bucket-icon">💡</div>
          <div>
            <h2 className="bucket-heading">Categorized Dallas Gems & Ideas Bucket</h2>
            <p className="bucket-subheading">
              Browse top spots by category, view verified addresses, or add your own manual places! Drag any idea into the calendar or use the dropdown.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          {/* Add Manual Place Button */}
          <button
            className="btn-primary"
            onClick={onOpenAddPlace}
            style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              boxShadow: '0 2px 10px rgba(16, 185, 129, 0.3)'
            }}
          >
            <PlusCircle size={16} />
            <span>+ Add Manual Place</span>
          </button>

          {/* Ask AI Scout */}
          {onOpenAiScout && (
            <button
              className="btn-primary"
              onClick={onOpenAiScout}
              style={{
                background: 'linear-gradient(135deg, #f59e0b, #ec4899)',
                color: '#ffffff',
                boxShadow: '0 2px 10px rgba(236, 72, 153, 0.35)'
              }}
            >
              <Sparkles size={16} />
              <span>Ask AI Scout ✨</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="bucket-categories">
        {categoryList.map(cat => {
          const count = cat.key === 'all' 
            ? bucketItems.length 
            : bucketItems.filter(b => b.category === cat.key).length;

          return (
            <button
              key={cat.key}
              className={`category-chip ${selectedCategory === cat.key ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.key)}
            >
              <span>{cat.label}</span>
              <span style={{ fontSize: '0.7rem', opacity: 0.8, marginLeft: '0.25rem' }}>({count})</span>
            </button>
          );
        })}
      </div>

      {/* Items Grid */}
      <div className="bucket-grid">
        {filteredItems.map(item => {
          const isLoved = item.sister_reaction === 'love';
          const isMustDo = item.sister_reaction === 'must-do';
          const mapsUrl = item.location 
            ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.location + (item.location.includes('TX') ? '' : ' Dallas TX'))}`
            : null;

          return (
            <div
              key={item.id}
              className="bucket-card"
              draggable
              onDragStart={e => handleDragStart(e, item)}
            >
              <div className="bucket-card-top">
                <span className="bucket-card-cat">{item.category || 'Dallas Gem'}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <button
                    className="reaction-btn"
                    title={userMode === 'sister' ? "Sister's reaction" : "Reaction"}
                    onClick={() => onToggleReaction(item.id, isLoved ? null : 'love')}
                  >
                    {isLoved ? '💖' : isMustDo ? '⭐' : '🤍'}
                  </button>
                  <button
                    className="slot-btn"
                    title="Remove idea"
                    onClick={() => onDeleteBucketItem(item.id)}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              <h4 className="bucket-card-title">{item.title}</h4>
              <p className="bucket-card-desc">{item.description}</p>

              {/* Address / Location with Google Maps link */}
              {item.location && (
                <div style={{ margin: '0.45rem 0', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '0.4rem 0.6rem', fontSize: '0.75rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.4rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-secondary)' }}>
                    <MapPin size={13} color="var(--accent-amber)" style={{ flexShrink: 0 }} />
                    <span style={{ lineHeight: 1.3 }}>{item.location}</span>
                  </div>
                  {mapsUrl && (
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open in Google Maps"
                      style={{ color: '#0284c7', display: 'flex', alignItems: 'center', gap: '0.15rem', flexShrink: 0 }}
                    >
                      <ExternalLink size={11} />
                    </a>
                  )}
                </div>
              )}

              <div className="bucket-card-meta">
                {item.best_time && (
                  <span>🕒 {item.best_time}</span>
                )}
                {item.estimated_duration && (
                  <span>⏱️ {item.estimated_duration}</span>
                )}
              </div>

              <div className="bucket-card-footer">
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  {item.created_by === 'sister' ? '🌟 Sister' : item.created_by === 'guide' ? '📍 Guide' : '🤠 Eduardo'}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <select
                    className="schedule-to-day-select"
                    defaultValue=""
                    onChange={e => {
                      if (!e.target.value) return;
                      const [dayId, slot] = e.target.value.split(':');
                      onScheduleItem(item, dayId, slot);
                      e.target.value = '';
                    }}
                  >
                    <option value="" disabled>📅 Schedule to...</option>
                    {days.map(d => (
                      <React.Fragment key={d.id}>
                        <option value={`${d.id}:morning`}>Day {d.day_number} ({d.date_str}) - Daytime</option>
                        <option value={`${d.id}:evening`}>Day {d.day_number} ({d.date_str}) - After-Work</option>
                        <option value={`${d.id}:night`}>Day {d.day_number} ({d.date_str}) - Night</option>
                      </React.Fragment>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
