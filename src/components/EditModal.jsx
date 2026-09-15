import React, { useState, useEffect } from 'react';
import { Edit3, X, Check } from 'lucide-react';

export default function EditModal({
  isOpen,
  onClose,
  editInfo,
  days,
  onSave
}) {
  if (!isOpen || !editInfo) return null;

  const day = days.find(d => d.id === editInfo.dayId);
  const [content, setContent] = useState(editInfo.currentText || '');
  const [notes, setNotes] = useState(day?.notes || '');

  useEffect(() => {
    setContent(editInfo.currentText || '');
    setNotes(day?.notes || '');
  }, [editInfo, day]);

  const handleSave = (e) => {
    e.preventDefault();
    onSave(editInfo.dayId, editInfo.slotType, content.trim(), notes.trim());
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Edit3 size={18} color="#f59e0b" />
            <h3 className="modal-title">
              Edit Day {day?.day_number} ({day?.date_str}) • {editInfo.slotType}
            </h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}><X size={18} /></button>
        </div>

        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label">{editInfo.slotType.toUpperCase()} Activity Plan</label>
            <textarea
              className="form-textarea"
              style={{ minHeight: '110px' }}
              value={content}
              onChange={e => setContent(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Day Notes / Reminders</label>
            <input
              type="text"
              className="form-input"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="e.g. Check tickets, rideshare, reservations..."
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Check size={16} />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
