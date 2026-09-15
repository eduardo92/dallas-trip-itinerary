import React, { useState } from 'react';
import { PlusCircle, MapPin, X, Calendar, Clock, Sparkles, Check } from 'lucide-react';
import { CATEGORIES, DALLAS_VENUES } from '../data/dallasPlaces';

export default function AddPlaceModal({
  isOpen,
  onClose,
  onAddBucketItem,
  onScheduleDirectly,
  days,
  userMode
}) {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES.FOOD_BBQ);
  const [address, setAddress] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('2 hours');
  const [bestTime, setBestTime] = useState('Flexible');
  const [destinationType, setDestinationType] = useState('bucket'); // 'bucket' or 'schedule'
  const [targetDayId, setTargetDayId] = useState(days[0]?.id || 'day-1');
  const [targetSlot, setTargetSlot] = useState('evening');

  // Quick preset helper when typing venue name
  const handleTitleChange = (val) => {
    setTitle(val);
    const match = DALLAS_VENUES.find(v => v.name.toLowerCase().includes(val.toLowerCase()) || val.toLowerCase().includes(v.name.toLowerCase()));
    if (match && !address) {
      setAddress(match.address);
      setNeighborhood(match.neighborhood);
      setCategory(match.category);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const fullLocation = address.trim() 
      ? (neighborhood.trim() ? `${address.trim()} (${neighborhood.trim()})` : address.trim())
      : (neighborhood.trim() || 'Dallas Area, TX');

    const newItem = {
      id: `manual-place-${Date.now()}`,
      title: title.trim(),
      category: category,
      description: description.trim() || `Place to visit: ${title.trim()}`,
      location: fullLocation,
      address: address.trim(),
      neighborhood: neighborhood.trim(),
      estimated_duration: duration.trim(),
      best_time: bestTime,
      status: 'bucket',
      sister_reaction: userMode === 'sister' ? 'love' : null,
      created_by: userMode
    };

    if (destinationType === 'schedule' && onScheduleDirectly) {
      onScheduleDirectly(newItem, targetDayId, targetSlot);
    } else {
      onAddBucketItem(newItem);
    }

    // Reset & Close
    setTitle('');
    setAddress('');
    setNeighborhood('');
    setDescription('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '580px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.4rem' }}>📍</span>
            <div>
              <h3 className="modal-title">Add Manual Place or Idea</h3>
              <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                Add custom Dallas restaurants, bars, attractions, or shops with verified addresses
              </div>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Title / Place Name */}
          <div className="form-group">
            <label className="form-label">Place or Activity Name *</label>
            <input
              type="text"
              className="form-input"
              value={title}
              onChange={e => handleTitleChange(e.target.value)}
              placeholder="e.g. Joe T. Garcia's, The Rustic, Pecan Lodge, Reunion Tower"
              required
            />
          </div>

          {/* Category Dropdown */}
          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value={CATEGORIES.MUST_SEES}>🌟 Must-Sees Dallas</option>
              <option value={CATEGORIES.FOOD_BBQ}>🍖 Food & BBQ</option>
              <option value={CATEGORIES.BARS_NIGHTLIFE}>🍸 Bars & Nightlife</option>
              <option value={CATEGORIES.ENTERTAINMENT}>🎢 Entertainment & Sports</option>
              <option value={CATEGORIES.SHOPPING_CULTURE}>🛍️ Shopping & Culture</option>
            </select>
          </div>

          {/* Street Address & Neighborhood Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label">Street Address</label>
              <input
                type="text"
                className="form-input"
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="e.g. 2201 N Field St, Dallas, TX 75201"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Neighborhood</label>
              <input
                type="text"
                className="form-input"
                value={neighborhood}
                onChange={e => setNeighborhood(e.target.value)}
                placeholder="e.g. Deep Ellum, Uptown"
              />
            </div>
          </div>

          {/* Description / Sister Notes */}
          <div className="form-group">
            <label className="form-label">Description / What to Order or Do</label>
            <textarea
              className="form-textarea"
              style={{ minHeight: '75px' }}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="e.g. Order the smoked brisket and banana pudding; great outdoor patio."
            />
          </div>

          {/* Duration & Best Time */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label">Estimated Duration</label>
              <input
                type="text"
                className="form-input"
                value={duration}
                onChange={e => setDuration(e.target.value)}
                placeholder="e.g. 2 hours"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Best Time to Go</label>
              <select
                className="form-select"
                value={bestTime}
                onChange={e => setBestTime(e.target.value)}
              >
                <option value="Flexible">Flexible Anytime</option>
                <option value="Daytime">☀️ Daytime (Morning / Afternoon)</option>
                <option value="After-Work">🌇 After-Work (5 PM - 8 PM)</option>
                <option value="Night">🌙 Night (Nightlife / Dinner)</option>
              </select>
            </div>
          </div>

          {/* Destination Selector: Bucket vs Direct Schedule */}
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '0.85rem', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.775rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              Where should this place be added?
            </div>
            <div style={{ display: 'flex', gap: '0.65rem', marginBottom: destinationType === 'schedule' ? '0.75rem' : '0' }}>
              <button
                type="button"
                onClick={() => setDestinationType('bucket')}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  borderRadius: '6px',
                  border: destinationType === 'bucket' ? '1px solid var(--accent-amber)' : '1px solid var(--border-medium)',
                  background: destinationType === 'bucket' ? 'var(--status-yellow-bg)' : 'var(--bg-card)',
                  color: destinationType === 'bucket' ? 'var(--status-yellow-text)' : 'var(--text-secondary)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                💡 Save to Ideas Bucket
              </button>
              <button
                type="button"
                onClick={() => setDestinationType('schedule')}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  borderRadius: '6px',
                  border: destinationType === 'schedule' ? '1px solid var(--accent-amber)' : '1px solid var(--border-medium)',
                  background: destinationType === 'schedule' ? 'var(--status-yellow-bg)' : 'var(--bg-card)',
                  color: destinationType === 'schedule' ? 'var(--status-yellow-text)' : 'var(--text-secondary)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                📅 Directly Schedule to a Day
              </button>
            </div>

            {destinationType === 'schedule' && (
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.5rem', paddingTop: '0.5rem', borderTop: '1px dashed var(--border-subtle)' }}>
                <select
                  className="form-select"
                  value={targetDayId}
                  onChange={e => setTargetDayId(e.target.value)}
                >
                  {days.map(d => (
                    <option key={d.id} value={d.id}>
                      Day {d.day_number} ({d.date_str}) — {d.status === 'YELLOW' ? 'Workday' : 'PTO / Weekend'}
                    </option>
                  ))}
                </select>
                <select
                  className="form-select"
                  value={targetSlot}
                  onChange={e => setTargetSlot(e.target.value)}
                >
                  <option value="morning">☀️ Daytime</option>
                  <option value="evening">🌇 After-Work</option>
                  <option value="night">🌙 Night</option>
                </select>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <PlusCircle size={15} />
              <span>{destinationType === 'schedule' ? 'Schedule to Day' : 'Add to Ideas Bucket'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
