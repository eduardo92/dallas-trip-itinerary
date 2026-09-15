import React, { useState } from 'react';
import { 
  Calendar as CalIcon, Sun, Sunset, Moon, Sparkles, AlertCircle, 
  ArrowLeftRight, Edit3, GripVertical, CheckCircle2, MapPin
} from 'lucide-react';
import { lookupDallasPlace } from '../data/dallasPlaces';

export default function CalendarGridView({
  days,
  onOpenSwapModal,
  onOpenEditModal,
  onOpenSlotDetail,
  onSwapSlots,
  onUpdateSlot,
  dragItem,
  setDragItem,
  pickedSlot,
  onPickSlot
}) {
  const [dragOverKey, setDragOverKey] = useState(null);
  const [activeDragKey, setActiveDragKey] = useState(null);

  const week1 = days.slice(0, 7);
  const week2 = days.slice(7, 14);
  const week3 = days.slice(14, 15);

  const weeks = [
    { title: 'Week 1: Sept 14 – Sept 20, 2026', days: week1, ptoNote: 'Fri Sep 18 is OFF (PTO) • Sun Sep 20 is Empire of the Sun Concert' },
    { title: 'Week 2: Sept 21 – Sept 27, 2026', days: week2, ptoNote: 'Fri Sep 25 is OFF (PTO) • Sun Sep 27 is Six Flags Fright Fest' },
    { title: 'Departure Week: Sept 28, 2026', days: week3, ptoNote: 'Checkout & Flight Home to Leon' }
  ];

  const handleDragStart = (e, dayId, dayNumber, slotType, slotLabel, text) => {
    e.stopPropagation();
    e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'slot', dayId, dayNumber, slotType, slotLabel, text }));
    e.dataTransfer.effectAllowed = 'move';
    setActiveDragKey(`${dayId}-${slotType}`);
    if (setDragItem) setDragItem({ type: 'slot', dayId, dayNumber, slotType, text });
  };

  const handleDragEnd = () => {
    setActiveDragKey(null);
    setDragOverKey(null);
    if (setDragItem) setDragItem(null);
  };

  const handleDrop = (e, targetDayId, targetSlot) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverKey(null);
    setActiveDragKey(null);
    try {
      const data = JSON.parse(e.dataTransfer.getData('text/plain') || '{}');
      if (data.type === 'slot') {
        if (data.dayId === targetDayId && data.slotType === targetSlot) return;
        onSwapSlots(data.dayId, data.slotType, targetDayId, targetSlot);
      } else if (data.type === 'bucket') {
        onUpdateSlot(targetDayId, targetSlot, data.title + (data.description ? ` (${data.description})` : ''));
      }
    } catch (err) {
      console.error('Drop error:', err);
    }
  };

  const renderSlot = (day, slotType, icon, label, color, planText) => {
    const slotKey = `${day.id}-${slotType}`;
    const isDragging = activeDragKey === slotKey;
    const isDropOver = dragOverKey === slotKey;
    const isPicked = pickedSlot && pickedSlot.dayId === day.id && pickedSlot.slotType === slotType;
    const isAwaitingTarget = pickedSlot && !isPicked;
    const lookedUp = lookupDallasPlace(planText);

    const handleSlotClick = () => {
      if (pickedSlot) {
        onPickSlot(day.id, day.day_number, slotType, label, planText);
      } else if (onOpenSlotDetail) {
        onOpenSlotDetail(day, slotType, planText);
      }
    };

    return (
      <div 
        key={slotType}
        className={`cell-slot ${slotType} ${isDragging ? 'dragging' : ''} ${isDropOver ? 'drop-target-active' : ''} ${isPicked ? 'picked-up-origin' : ''} ${isAwaitingTarget ? 'awaiting-drop' : ''}`}
        draggable
        onDragStart={e => handleDragStart(e, day.id, day.day_number, slotType, label, planText)}
        onDragEnd={handleDragEnd}
        onDragOver={e => {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
          if (dragOverKey !== slotKey) setDragOverKey(slotKey);
        }}
        onDragLeave={() => {
          if (dragOverKey === slotKey) setDragOverKey(null);
        }}
        onDrop={e => handleDrop(e, day.id, slotType)}
        onClick={handleSlotClick}
        title={isAwaitingTarget ? `Tap/click to swap here with Day ${pickedSlot.dayNumber} (${pickedSlot.slotLabel})` : isPicked ? 'Currently picked up — click to cancel' : 'Click to view address & map, or drag to swap'}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '2px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span className="drag-handle-grip" title="Drag to swap or move">
              <GripVertical size={11} />
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.675rem', fontWeight: 700, color, textTransform: 'uppercase' }}>
              {icon}
              <span>{label}</span>
            </div>
          </div>

          <div className="cell-slot-actions">
            <button
              type="button"
              className={`cell-slot-btn ${isPicked ? 'active-picked' : ''}`}
              title={isPicked ? "Cancel swap" : isAwaitingTarget ? "Swap with this slot" : "Pick up to swap"}
              onClick={(e) => {
                e.stopPropagation();
                onPickSlot(day.id, day.day_number, slotType, label, planText);
              }}
            >
              <ArrowLeftRight size={11} />
            </button>
            <button
              type="button"
              className="cell-slot-btn"
              title="Edit Activity"
              onClick={(e) => {
                e.stopPropagation();
                onOpenEditModal(day.id, slotType, planText);
              }}
            >
              <Edit3 size={11} />
            </button>
          </div>
        </div>

        {isAwaitingTarget && (
          <div className="drop-hint-pill">
            <span>⇄ Tap to swap</span>
          </div>
        )}

        {isPicked && (
          <div className="picked-hint-pill">
            <span>📍 Moving... tap target</span>
          </div>
        )}

        <div className="slot-mini-text">{planText}</div>

        {/* Address & Venue Pill */}
        {lookedUp?.neighborhood && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.675rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            <MapPin size={10} color="var(--accent-amber)" />
            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {lookedUp.neighborhood}
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="calendar-grid-view">
      {weeks.map((w, wIdx) => (
        <div key={wIdx} className="calendar-week-block">
          <div className="calendar-week-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <CalIcon size={18} color="var(--accent-amber)" />
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {w.title}
              </h3>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--status-green-text)', background: 'var(--status-green-bg)', border: '1px solid var(--status-green-border)', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontWeight: 600 }}>
              ✨ {w.ptoNote}
            </span>
          </div>

          <div className="calendar-7col-grid">
            {w.days.map(day => {
              const isPtoFriday = day.day_number === 5 || day.day_number === 12;
              const isGreen = day.status === 'GREEN';
              const isSep20 = day.day_number === 7;

              return (
                <div
                  key={day.id}
                  className={`calendar-day-cell ${isGreen ? 'green-cell' : 'yellow-cell'} ${isSep20 ? 'conflict-cell' : ''}`}
                >
                  {/* Top Bar of Cell */}
                  <div className="cell-top-bar">
                    <div>
                      <span className="cell-day-name">{day.day_of_week.slice(0, 3)}</span>
                      <div className="cell-day-number">{day.date_str.split(', ')[1]}</div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span className={`cell-status-pill ${isGreen ? 'green' : 'yellow'}`}>
                        {isPtoFriday ? '🌟 OFF (PTO)' : isGreen ? '🎉 FULL DAY' : '💼 WORK ~6PM'}
                      </span>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>Day {day.day_number}</div>
                    </div>
                  </div>

                  {/* Sep 20 conflict alert */}
                  {isSep20 && (
                    <div className="cell-alert-badge">
                      <AlertCircle size={11} />
                      <span>Concert &gt; Cowboys</span>
                    </div>
                  )}

                  {/* 3 Dedicated Slots */}
                  <div className="cell-slots-container">
                    {renderSlot(day, 'morning', <Sun size={11} />, 'Daytime', '#0284c7', day.morning_plan)}
                    {renderSlot(day, 'evening', <Sunset size={11} />, 'After-Work', '#ea580c', day.evening_plan)}
                    {renderSlot(day, 'night', <Moon size={11} />, 'Night Plan', '#7c3aed', day.night_plan)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
