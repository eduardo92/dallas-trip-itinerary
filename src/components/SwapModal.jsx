import React, { useState } from 'react';
import { ArrowLeftRight, X, Calendar, Clock } from 'lucide-react';

export default function SwapModal({
  isOpen,
  onClose,
  sourceInfo,
  days,
  onConfirmSwap
}) {
  if (!isOpen || !sourceInfo) return null;

  const [targetDayId, setTargetDayId] = useState(
    days.find(d => d.id !== sourceInfo.dayId)?.id || days[0].id
  );
  const [targetSlot, setTargetSlot] = useState(sourceInfo.slotType || 'evening');

  const sourceDay = days.find(d => d.id === sourceInfo.dayId);
  const targetDay = days.find(d => d.id === targetDayId);

  const getSlotText = (day, slot) => {
    if (!day) return '';
    return slot === 'morning' ? day.morning_plan : slot === 'evening' ? day.evening_plan : day.night_plan;
  };

  const sourceText = getSlotText(sourceDay, sourceInfo.slotType);
  const targetText = getSlotText(targetDay, targetSlot);

  const handleSwap = () => {
    onConfirmSwap(sourceInfo.dayId, sourceInfo.slotType, targetDayId, targetSlot);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowLeftRight size={18} color="#f59e0b" />
            <h3 className="modal-title">Swap Itinerary Slots</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}><X size={18} /></button>
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          {/* Source Slot Box */}
          <div style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '10px', padding: '0.85rem', marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
              Source: Day {sourceDay?.day_number} ({sourceDay?.date_str}) • {sourceInfo.slotType}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#f8fafc' }}>
              {sourceText}
            </div>
          </div>

          <div style={{ textAlign: 'center', margin: '0.5rem 0', color: '#f59e0b' }}>
            <ArrowLeftRight size={20} />
          </div>

          {/* Target Slot Selection */}
          <div className="form-group">
            <label className="form-label">Swap with which Day?</label>
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
          </div>

          <div className="form-group">
            <label className="form-label">Target Time Slot</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
              {['morning', 'evening', 'night'].map(slot => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setTargetSlot(slot)}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '8px',
                    border: targetSlot === slot ? '1px solid #f59e0b' : '1px solid rgba(255,255,255,0.1)',
                    background: targetSlot === slot ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255,255,255,0.03)',
                    color: targetSlot === slot ? '#fbbf24' : '#94a3b8',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    textTransform: 'capitalize'
                  }}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Target Slot Preview */}
          <div style={{ background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '10px', padding: '0.85rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
              Will Swap with: Day {targetDay?.day_number} ({targetDay?.date_str}) • {targetSlot}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#cbd5e1' }}>
              {targetText}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="btn-primary" onClick={handleSwap}>
            <ArrowLeftRight size={15} />
            <span>Confirm Swap</span>
          </button>
        </div>
      </div>
    </div>
  );
}
