import React, { useState } from 'react';
import { 
  Sparkles, Plus, MapPin, Clock, Heart, Star, Trash2, Calendar, 
  ArrowRight, Filter, Bookmark, Check
} from 'lucide-react';

export default function IdeaBucket({
  bucketItems,
  days,
  onScheduleItem,
  onToggleReaction,
  onAddBucketItem,
  onDeleteBucketItem,
  onOpenAiScout,
  userMode,
  setDragItem
}) {

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Culture & Immersion');
  const [newDescription, setNewDescription] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newDuration, setNewDuration] = useState('2 hours');
  const [newBestTime, setNewBestTime] = useState('Flexible');

  const categories = [
    'all',
    'Culture & Immersion',
    'Nightlife & Dancing',
    'Food & Texas BBQ',
    'Outdoors & Social',
    'Views & Sightseeing'
  ];

  const filteredItems = bucketItems.filter(item => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'bucket', id: item.id, title: item.title, description: item.description }));
    setDragItem({ type: 'bucket', id: item.id, title: item.title, description: item.description });
  };

  const handleSubmitNewItem = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem = {
      id: `bucket-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      description: newDescription.trim(),
      location: newLocation.trim() || 'Dallas Area',
      estimated_duration: newDuration.trim() || '2 hours',
      best_time: newBestTime.trim() || 'Flexible',
      status: 'bucket',
      sister_reaction: userMode === 'sister' ? 'love' : null,
      created_by: userMode
    };

    onAddBucketItem(newItem);
    setNewTitle('');
    setNewDescription('');
    setNewLocation('');
    setShowAddModal(false);
  };

  return (
    <section className="bucket-section">
      <div className="bucket-header">
        <div className="bucket-title-area">
          <div className="bucket-icon">💡</div>
          <div>
            <h2 className="bucket-heading">Unscheduled Ideas & Dallas Gems</h2>
            <p className="bucket-subheading">
              Drag ideas into any day on the schedule or choose from the dropdown. Swap anytime!
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
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

          <button className="btn-secondary" onClick={() => setShowAddModal(true)}>
            <Plus size={16} />
            <span>Add Custom Idea</span>
          </button>
        </div>
      </div>


      {/* Category filters */}
      <div className="bucket-categories">
        {categories.map(cat => (
          <button
            key={cat}
            className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat === 'all' ? '✨ All Ideas' : cat}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="bucket-grid">
        {filteredItems.map(item => {
          const isLoved = item.sister_reaction === 'love';
          const isMustDo = item.sister_reaction === 'must-do';

          return (
            <div
              key={item.id}
              className="bucket-card"
              draggable
              onDragStart={e => handleDragStart(e, item)}
            >
              <div className="bucket-card-top">
                <span className="bucket-card-cat">{item.category}</span>
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

              <div className="bucket-card-meta">
                {item.location && (
                  <span><MapPin size={12} /> {item.location}</span>
                )}
                {item.estimated_duration && (
                  <span><Clock size={12} /> {item.estimated_duration}</span>
                )}
              </div>

              <div className="bucket-card-footer">
                <span style={{ fontSize: '0.7rem', color: '#64748b' }}>
                  Added by {item.created_by === 'sister' ? '🌟 Sister' : '🤠 Eduardo'}
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
                    <option value="" disabled>Schedule to...</option>
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
            </div>
          );
        })}
      </div>

      {/* Add Idea Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add Idea to Trip Bucket</h3>
              <button className="modal-close-btn" onClick={() => setShowAddModal(false)}>✕</button>
            </div>

            <form onSubmit={handleSubmitNewItem}>
              <div className="form-group">
                <label className="form-label">Activity Title *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Dallas Museum of Art, Tacos at Velvet Taco"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                >
                  <option value="Culture & Immersion">Culture & Immersion</option>
                  <option value="Nightlife & Dancing">Nightlife & Dancing</option>
                  <option value="Food & Texas BBQ">Food & Texas BBQ</option>
                  <option value="Outdoors & Social">Outdoors & Social</option>
                  <option value="Views & Sightseeing">Views & Sightseeing</option>
                  <option value="Shopping & Districts">Shopping & Districts</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Description & Highlights</label>
                <textarea
                  className="form-textarea"
                  placeholder="Why we should do this, ticket details, vibes..."
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Neighborhood / Location</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Uptown, Deep Ellum"
                    value={newLocation}
                    onChange={e => setNewLocation(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Estimated Duration</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. 2 hours"
                    value={newDuration}
                    onChange={e => setNewDuration(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save to Bucket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
