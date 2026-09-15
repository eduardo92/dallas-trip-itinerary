import React, { useState } from 'react';
import { 
  Sun, Moon, Sunset, ArrowLeftRight, Edit3, Trash2, BookmarkPlus, 
  Sparkles, Heart, AlertCircle, Info, Calendar as CalIcon, Check, Copy, GripVertical
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
  searchQuery,
  pickedSlot,
  onPickSlot
}) {
  const [dragOverSlot, setDragOverSlot] = useState(null);
  const [activeDragSlot, setActiveDragSlot] = useState(null);

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

  const handleDragStart = (e, dayId, dayNumber, slotType, slotLabel, text) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'slot', dayId, dayNumber, slotType, slotLabel, text }));
    e.dataTransfer.effectAllowed = 'move';
    setActiveDragSlot(`${dayId}-${slotType}`);
    if (setDragItem) setDragItem({ type: 'slot', dayId, dayNumber, slotType, text });
  };

  const handleDragEnd = () => {
    setActiveDragSlot(null);
    setDragOverSlot(null);
    if (setDragItem) setDragItem(null);
  };

  const handleDragOver = (e, slotKey) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
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
    setActiveDragSlot(null);
    try {
      const data = JSON.parse(e.dataTransfer.getData('text/plain') || '{}');
      if (data.type === 'slot') {
        if (data.dayId === targetDayId && data.slotType === targetSlot) return;
        onSwapSlots(data.dayId, data.slotType, targetDayId, targetSlot);
      } else if (data.type === 'bucket') {
        onUpdateSlot(targetDayId, targetSlot, data.title + (data.description ? ` (${data.description})` : ''));
      }
    } catch (err) {
      console.error('Drop handling error:', err);
    }
    if (setDragItem) setDragItem(null);
  };

  const renderSlotBlock = (day, slotType, icon, label, color, planText) => {
    const slotKey = `${day.id}-${slotType}`;
    const isDragging = activeDragSlot === slotKey;
    const isDropOver = dragOverSlot === slotKey;
    const isPicked = pickedSlot && pickedSlot.dayId === day.id && pickedSlot.slotType === slotType;
    const isAwaitingTarget = pickedSlot && !isPicked;

    const handleSlotClick = () => {
      if (pickedSlot) {
        onPickSlot(day.id, day.day_number, slotType, label, planText);
      }
    };

    return (
      <div
        key={slotType}
        className={`time-slot ${isDragging ? 'dragging' : ''} ${isDropOver ? 'drop-hover' : ''} ${isPicked ? 'picked-up-origin' : ''} ${isAwaitingTarget ? 'awaiting-drop' : ''}`}
        draggable
        onDragStart={e => handleDragStart(e, day.id, day.day_number, slotType, label, planText)}
        onDragEnd={handleDragEnd}
        onDragOver={e => handleDragOver(e, slotKey)}
        onDragLeave={e => handleDragLeave(e, slotKey)}
        onDrop={e => handleDrop(e, day.id, slotType)}
        onClick={handleSlotClick}
        title={isAwaitingTarget ? `Click to swap here with Day ${pickedSlot.dayNumber} (${pickedSlot.slotLabel})` : isPicked ? 'Currently moving — click to cancel' : 'Drag to swap, or click ⇄ to pick up'}
      >
        <div className="slot-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span className="drag-handle-grip" title="Drag to swap or move">
              <GripVertical size={13} />
            </span>
            <div className={`slot-label ${slotType}`} style={{ color }}>
              {icon}
              <span>{label}</span>
            </div>
          </div>

          <div className="slot-actions">
            <button
              className={`slot-btn ${isPicked ? 'active-picked' : ''}`}
              title={isPicked ? "Cancel swap" : isAwaitingTarget ? "Swap with this slot" : "Pick up to swap"}
              onClick={(e) => {
                e.stopPropagation();
                onPickSlot(day.id, day.day_number, slotType, label, planText);
              }}
            >
              <ArrowLeftRight size={12} />
            </button>
            <button
              className="slot-btn"
              title="Edit slot plan"
              onClick={(e) => {
                e.stopPropagation();
                onOpenEditModal(day.id, slotType, planText);
              }}
            >
              <Edit3 size={12} />
            </button>
            <button
              className="slot-btn"
              title="Move idea to unscheduled bucket"
              onClick={(e) => {
                e.stopPropagation();
                onMoveToBucket(planText, slotType, day.id);
              }}
            >
              <BookmarkPlus size={12} />
            </button>
          </div>
        </div>

        {isAwaitingTarget && (
          <div className="drop-hint-pill" style={{ marginBottom: '0.35rem' }}>
            <span>⇄ Click or tap to swap here</span>
          </div>
        )}

        {isPicked && (
          <div className="picked-hint-pill" style={{ marginBottom: '0.35rem' }}>
            <span>📍 Moving... click target slot</span>
          </div>
        )}

        <div className="slot-content-text">{planText}</div>
      </div>
    );
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
              <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '8px', padding: '0.45rem 0.65rem', fontSize: '0.75rem', color: '#dc2626', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                <AlertCircle size={14} />
                <span>Cowboys game conflicts with concert. Empire of the Sun priority!</span>
              </div>
            )}

            {isSixFlagsBrazil && (
              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '0.45rem 0.65rem', fontSize: '0.75rem', color: '#2563eb', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                <Info size={14} />
                <span>Six Flags Fright Fest day. Cowboys vs Ravens is in Brazil!</span>
              </div>
            )}

            {/* 3 Dedicated Slots */}
            <div className="slots-container">
              {renderSlotBlock(day, 'morning', <Sun size={12} />, '☀️ Daytime', '#0284c7', day.morning_plan)}
              {renderSlotBlock(day, 'evening', <Sunset size={12} />, '🌇 After-Work', '#ea580c', day.evening_plan)}
              {renderSlotBlock(day, 'night', <Moon size={12} />, '🌙 Night Plan', '#7c3aed', day.night_plan)}
            </div>

            {/* Notes box */}
            {day.notes && (
              <div className="day-notes-box">
                <Sparkles size={12} color="var(--accent-amber)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{day.notes}</span>
              </div>
            )}

            {/* Card Footer with Quick Swap Trigger */}
            <div className="day-card-footer">
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {day.status_label}
              </span>
              <button
                className="swap-trigger-btn"
                onClick={() => onOpenSwapModal(day.id, 'evening', day.evening_plan)}
              >
                <ArrowLeftRight size={13} />
                <span>Quick Swap Dialog</span>
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
