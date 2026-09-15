import React, { useState } from 'react';
import { ArrowLeftRight, X, Calendar, Sun, Sunset, Moon } from 'lucide-react';

const SLOT_LABELS = {
  morning: '☀️ Daytime (Work / Sightseeing)',
  evening: '🌇 After-Work Activity',
  night: '🌙 Night Plan'
};

const SLOT_SHORT = {
  morning: '☀️ Daytime',
  evening: '🌇 After-Work',
  night: '🌙 Night'
};

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
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '540px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowLeftRight size={18} color="#f59e0b" />
            <h3 className="modal-title">Swap Activity Slot</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}><X size={18} /></button>
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          {/* Source Slot Box */}
          <div style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '10px', padding: '0.85rem', marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase', marginBottom: '0.25rem', display: 'flex', justifyContent: 'space-between' }}>
              <span>Source: Day {sourceDay?.day_number} ({sourceDay?.date_str})</span>
              <span style={{ color: '#fbbf24' }}>{SLOT_LABELS[sourceInfo.slotType] || sourceInfo.slotType}</span>
            </div>
            <div style={{ fontSize: '0.875rem', color: '#f8fafc', lineHeight: 1.4 }}>
              {sourceText}
            </div>
          </div>

          <div style={{ textAlign: 'center', margin: '0.5rem 0', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <div style={{ height: '1px', flex: 1, background: 'rgba(245, 158, 11, 0.2)' }}></div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#f59e0b', padding: '0.2rem 0.6rem', borderRadius: '9999px', background: 'rgba(245, 158, 11, 0.1)' }}>
              ⇄ Swap With Target
            </span>
            <div style={{ height: '1px', flex: 1, background: 'rgba(245, 158, 11, 0.2)' }}></div>
          </div>

          {/* Target Day Selection */}
          <div className="form-group">
            <label className="form-label">1. Choose Target Day:</label>
            <select
              className="form-select"
              value={targetDayId}
              onChange={e => setTargetDayId(e.target.value)}
            >
              {days.map(d => (
                <option key={d.id} value={d.id}>
                  Day {d.day_number} ({d.date_str}) — {d.status === 'YELLOW' ? 'Workday (~6 PM)' : 'OFF / Weekend'}
                </option>
              ))}
            </select>
          </div>

          {/* Target Slot Selection */}
          <div className="form-group">
            <label className="form-label">2. Choose Target Slot (Daytime, After-Work, or Night):</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
              {[
                { key: 'morning', label: '☀️ Daytime' },
                { key: 'evening', label: '🌇 After-Work' },
                { key: 'night', label: '🌙 Night Plan' }
              ].map(slot => (
                <button
                  key={slot.key}
                  type="button"
                  onClick={() => setTargetSlot(slot.key)}
                  style={{
                    padding: '0.6rem 0.4rem',
                    borderRadius: '8px',
                    border: targetSlot === slot.key ? '1px solid #f59e0b' : '1px solid rgba(255,255,255,0.1)',
                    background: targetSlot === slot.key ? 'rgba(245, 158, 11, 0.18)' : 'rgba(255,255,255,0.03)',
                    color: targetSlot === slot.key ? '#fbbf24' : '#94a3b8',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                >
                  {slot.label}
                </button>
              ))}
            </div>
          </div>

          {/* Target Slot Current Content Preview */}
          <div style={{ background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '10px', padding: '0.85rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.25rem', display: 'flex', justifyContent: 'space-between' }}>
              <span>Target: Day {targetDay?.day_number} ({targetDay?.date_str})</span>
              <span style={{ color: '#38bdf8' }}>{SLOT_SHORT[targetSlot]}</span>
            </div>
            <div style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.4 }}>
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
            <span>Confirm Slot Swap</span>
          </button>
        </div>
      </div>
    </div>
  );
}
