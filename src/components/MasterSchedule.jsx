import React, { useState } from 'react';
import { 
  Sun, Moon, Sunset, ArrowLeftRight, Edit3, Trash2, BookmarkPlus, 
  Sparkles, Heart, AlertCircle, Info, Calendar as CalIcon, Check, Copy
} from 'lucide-react';

export default function MasterSchedule({
  days,
  onSwapSlots,
  onUpdateSlot,
  onMoveToBucket,
  onOpenSwapModal,
  onOpenEditModal,
  dragItem,
  setDragItem,
  filterMode,
  searchQuery
}) {
  const [dragOverSlot, setDragOverSlot] = useState(null);

  const filteredDays = days.filter(d => {
    if (filterMode === 'yellow' && d.status !== 'YELLOW') return false;
    if (filterMode === 'green' && d.status !== 'GREEN') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const text = `${d.date_str} ${d.morning_plan} ${d.evening_plan} ${d.night_plan} ${d.notes || ''}`.toLowerCase();
      return text.includes(q);
    }
    return true;
  });

  const handleDragStart = (e, dayId, slotType, text) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'slot', dayId, slotType, text }));
    setDragItem({ type: 'slot', dayId, slotType, text });
  };

  const handleDragOver = (e, slotKey) => {
    e.preventDefault();
    if (dragOverSlot !== slotKey) {
      setDragOverSlot(slotKey);
    }
  };

  const handleDragLeave = (e, slotKey) => {
    if (dragOverSlot === slotKey) {
      setDragOverSlot(null);
    }
  };

  const handleDrop = (e, targetDayId, targetSlot) => {
    e.preventDefault();
    setDragOverSlot(null);
    try {
      const data = JSON.parse(e.dataTransfer.getData('text/plain') || '{}');
      if (data.type === 'slot') {
        if (data.dayId === targetDayId && data.slotType === targetSlot) return;
        onSwapSlots(data.dayId, data.slotType, targetDayId, targetSlot);
      } else if (data.type === 'bucket') {
        // Schedule from bucket into this slot
        onUpdateSlot(targetDayId, targetSlot, data.title + (data.description ? ` (${data.description})` : ''));
      }
    } catch (err) {
      console.error('Drop handling error:', err);
    }
    setDragItem(null);
  };

  return (
    <div className="days-grid">
      {filteredDays.map(day => {
        const isYellow = day.status === 'YELLOW';
        const isSep20Conflict = day.id === 'day-7';
        const isSixFlagsBrazil = day.id === 'day-14';

        return (
          <article
            key={day.id}
            className={`day-card ${isSep20Conflict ? 'highlight-conflict' : ''}`}
          >
            {/* Header of Day */}
            <div className="day-card-header">
              <div className="day-meta">
                <span className="day-number-badge">Day {day.day_number}</span>
                <span className="day-date">{day.date_str}</span>
              </div>
              <span className={`status-badge ${isYellow ? 'yellow' : 'green'}`}>
                {isYellow ? '💼 Work-Fit' : '🎉 PTO / Weekend'}
              </span>
            </div>

            {/* Special event alerts */}
            {isSep20Conflict && (
              <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.35)', borderRadius: '8px', padding: '0.45rem 0.65rem', fontSize: '0.75rem', color: '#fca5a5', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <AlertCircle size={14} />
                <span>Cowboys game conflicts with concert. Empire of the Sun priority!</span>
              </div>
            )}

            {isSixFlagsBrazil && (
              <div style={{ background: 'rgba(59, 130, 246, 0.12)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '8px', padding: '0.45rem 0.65rem', fontSize: '0.75rem', color: '#93c5fd', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Info size={14} />
                <span>Six Flags Fright Fest day. Cowboys vs Ravens is in Brazil!</span>
              </div>
            )}

            {/* Slot 1: Morning */}
            <div className="slots-container">
              {/* Morning Slot */}
              <div
                className={`time-slot ${dragOverSlot === `${day.id}-morning` ? 'drop-hover' : ''}`}
                draggable
                onDragStart={e => handleDragStart(e, day.id, 'morning', day.morning_plan)}
                onDragOver={e => handleDragOver(e, `${day.id}-morning`)}
                onDragLeave={e => handleDragLeave(e, `${day.id}-morning`)}
                onDrop={e => handleDrop(e, day.id, 'morning')}
              >
                <div className="slot-header">
                  <div className="slot-label morning">
                    <Sun size={12} />
                    <span>Morning</span>
                  </div>
                  <div className="slot-actions">
                    <button
                      className="slot-btn"
                      title="Quick swap this slot"
                      onClick={() => onOpenSwapModal(day.id, 'morning', day.morning_plan)}
                    >
                      <ArrowLeftRight size={12} />
                    </button>
                    <button
                      className="slot-btn"
                      title="Edit slot text"
                      onClick={() => onOpenEditModal(day.id, 'morning', day.morning_plan)}
                    >
                      <Edit3 size={12} />
                    </button>
                    <button
                      className="slot-btn"
                      title="Move idea to unscheduled bucket"
                      onClick={() => onMoveToBucket(day.morning_plan, 'morning', day.id)}
                    >
                      <BookmarkPlus size={12} />
                    </button>
                  </div>
                </div>
                <div className="slot-content-text">{day.morning_plan}</div>
              </div>

              {/* Evening Slot */}
              <div
                className={`time-slot ${dragOverSlot === `${day.id}-evening` ? 'drop-hover' : ''}`}
                draggable
                onDragStart={e => handleDragStart(e, day.id, 'evening', day.evening_plan)}
                onDragOver={e => handleDragOver(e, `${day.id}-evening`)}
                onDragLeave={e => handleDragLeave(e, `${day.id}-evening`)}
                onDrop={e => handleDrop(e, day.id, 'evening')}
              >
                <div className="slot-header">
                  <div className="slot-label evening">
                    <Sunset size={12} />
                    <span>Evening</span>
                  </div>
                  <div className="slot-actions">
                    <button
                      className="slot-btn"
                      title="Quick swap this slot"
                      onClick={() => onOpenSwapModal(day.id, 'evening', day.evening_plan)}
                    >
                      <ArrowLeftRight size={12} />
                    </button>
                    <button
                      className="slot-btn"
                      title="Edit slot text"
                      onClick={() => onOpenEditModal(day.id, 'evening', day.evening_plan)}
                    >
                      <Edit3 size={12} />
                    </button>
                    <button
                      className="slot-btn"
                      title="Move idea to unscheduled bucket"
                      onClick={() => onMoveToBucket(day.evening_plan, 'evening', day.id)}
                    >
                      <BookmarkPlus size={12} />
                    </button>
                  </div>
                </div>
                <div className="slot-content-text">{day.evening_plan}</div>
              </div>

              {/* Night Slot */}
              <div
                className={`time-slot ${dragOverSlot === `${day.id}-night` ? 'drop-hover' : ''}`}
                draggable
                onDragStart={e => handleDragStart(e, day.id, 'night', day.night_plan)}
                onDragOver={e => handleDragOver(e, `${day.id}-night`)}
                onDragLeave={e => handleDragLeave(e, `${day.id}-night`)}
                onDrop={e => handleDrop(e, day.id, 'night')}
              >
                <div className="slot-header">
                  <div className="slot-label night">
                    <Moon size={12} />
                    <span>Night</span>
                  </div>
                  <div className="slot-actions">
                    <button
                      className="slot-btn"
                      title="Quick swap this slot"
                      onClick={() => onOpenSwapModal(day.id, 'night', day.night_plan)}
                    >
                      <ArrowLeftRight size={12} />
                    </button>
                    <button
                      className="slot-btn"
                      title="Edit slot text"
                      onClick={() => onOpenEditModal(day.id, 'night', day.night_plan)}
                    >
                      <Edit3 size={12} />
                    </button>
                    <button
                      className="slot-btn"
                      title="Move idea to unscheduled bucket"
                      onClick={() => onMoveToBucket(day.night_plan, 'night', day.id)}
                    >
                      <BookmarkPlus size={12} />
                    </button>
                  </div>
                </div>
                <div className="slot-content-text">{day.night_plan}</div>
              </div>
            </div>

            {/* Notes box */}
            {day.notes && (
              <div className="day-notes-box">
                <Sparkles size={12} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{day.notes}</span>
              </div>
            )}

            {/* Card Footer with Quick Swap Trigger */}
            <div className="day-card-footer">
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                {day.status_label}
              </span>
              <button
                className="swap-trigger-btn"
                onClick={() => onOpenSwapModal(day.id, 'evening', day.evening_plan)}
              >
                <ArrowLeftRight size={13} />
                <span>Swap Slot</span>
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
