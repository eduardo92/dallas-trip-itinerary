import React, { useState } from 'react';
import { 
  Calendar as CalIcon, Sun, Sunset, Moon, Sparkles, AlertCircle, 
  ArrowLeftRight, Edit3, MapPin, CheckCircle2, BookmarkPlus
} from 'lucide-react';

export default function CalendarGridView({
  days,
  onOpenSwapModal,
  onOpenEditModal,
  onSelectDay,
  onSwapSlots,
  onUpdateSlot,
  dragItem,
  setDragItem
}) {
  const [dragOverKey, setDragOverKey] = useState(null);

  const week1 = days.slice(0, 7);
  const week2 = days.slice(7, 14);
  const week3 = days.slice(14, 15);

  const weeks = [
    { title: 'Week 1: Sept 14 – Sept 20, 2026', days: week1, ptoNote: 'Fri Sep 18 is OFF (PTO) • Sun Sep 20 is Empire of the Sun Concert' },
    { title: 'Week 2: Sept 21 – Sept 27, 2026', days: week2, ptoNote: 'Fri Sep 25 is OFF (PTO) • Sun Sep 27 is Six Flags Fright Fest' },
    { title: 'Departure Week: Sept 28, 2026', days: week3, ptoNote: 'Checkout & Flight Home to Leon' }
  ];

  const handleDragStart = (e, dayId, slotType, text) => {
    e.stopPropagation();
    e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'slot', dayId, slotType, text }));
    if (setDragItem) setDragItem({ type: 'slot', dayId, slotType, text });
  };

  const handleDrop = (e, targetDayId, targetSlot) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverKey(null);
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

  return (
    <div className="calendar-grid-view">
      {weeks.map((w, wIdx) => (
        <div key={wIdx} className="calendar-week-block">
          <div className="calendar-week-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <CalIcon size={18} color="#f59e0b" />
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc' }}>
                {w.title}
              </h3>
            </div>
            <span style={{ fontSize: '0.8rem', color: '#34d399', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontWeight: 600 }}>
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
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '2px' }}>Day {day.day_number}</div>
                    </div>
                  </div>

                  {/* Sep 20 conflict alert */}
                  {isSep20 && (
                    <div className="cell-alert-badge">
                      <AlertCircle size={11} />
                      <span>Concert &gt; Cowboys</span>
                    </div>
                  )}

                  {/* 3 Dedicated Slots (Daytime, After-Work, Night) with Slot-Level Swapping */}
                  <div className="cell-slots-container">
                    
                    {/* Slot 1: Daytime Activity / Work */}
                    <div 
                      className={`cell-slot morning ${dragOverKey === `${day.id}-morning` ? 'drop-target-active' : ''}`}
                      draggable
                      onDragStart={e => handleDragStart(e, day.id, 'morning', day.morning_plan)}
                      onDragOver={e => { e.preventDefault(); setDragOverKey(`${day.id}-morning`); }}
                      onDragLeave={() => setDragOverKey(null)}
                      onDrop={e => handleDrop(e, day.id, 'morning')}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '2px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.675rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase' }}>
                          <Sun size={11} />
                          <span>Daytime</span>
                        </div>
                        <div className="cell-slot-actions">
                          <button
                            type="button"
                            className="cell-slot-btn"
                            title="Swap Daytime Slot"
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenSwapModal(day.id, 'morning', day.morning_plan);
                            }}
                          >
                            <ArrowLeftRight size={11} />
                          </button>
                          <button
                            type="button"
                            className="cell-slot-btn"
                            title="Edit Daytime Slot"
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenEditModal(day.id, 'morning', day.morning_plan);
                            }}
                          >
                            <Edit3 size={11} />
                          </button>
                        </div>
                      </div>
                      <div className="slot-mini-text">{day.morning_plan}</div>
                    </div>

                    {/* Slot 2: After-Work Activity */}
                    <div 
                      className={`cell-slot evening ${dragOverKey === `${day.id}-evening` ? 'drop-target-active' : ''}`}
                      draggable
                      onDragStart={e => handleDragStart(e, day.id, 'evening', day.evening_plan)}
                      onDragOver={e => { e.preventDefault(); setDragOverKey(`${day.id}-evening`); }}
                      onDragLeave={() => setDragOverKey(null)}
                      onDrop={e => handleDrop(e, day.id, 'evening')}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '2px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.675rem', fontWeight: 700, color: '#fb923c', textTransform: 'uppercase' }}>
                          <Sunset size={11} />
                          <span>After-Work</span>
                        </div>
                        <div className="cell-slot-actions">
                          <button
                            type="button"
                            className="cell-slot-btn"
                            title="Swap After-Work Slot"
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenSwapModal(day.id, 'evening', day.evening_plan);
                            }}
                          >
                            <ArrowLeftRight size={11} />
                          </button>
                          <button
                            type="button"
                            className="cell-slot-btn"
                            title="Edit After-Work Slot"
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenEditModal(day.id, 'evening', day.evening_plan);
                            }}
                          >
                            <Edit3 size={11} />
                          </button>
                        </div>
                      </div>
                      <div className="slot-mini-text">{day.evening_plan}</div>
                    </div>

                    {/* Slot 3: Night / Nightlife Plan */}
                    <div 
                      className={`cell-slot night ${dragOverKey === `${day.id}-night` ? 'drop-target-active' : ''}`}
                      draggable
                      onDragStart={e => handleDragStart(e, day.id, 'night', day.night_plan)}
                      onDragOver={e => { e.preventDefault(); setDragOverKey(`${day.id}-night`); }}
                      onDragLeave={() => setDragOverKey(null)}
                      onDrop={e => handleDrop(e, day.id, 'night')}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '2px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.675rem', fontWeight: 700, color: '#c084fc', textTransform: 'uppercase' }}>
                          <Moon size={11} />
                          <span>Night Plan</span>
                        </div>
                        <div className="cell-slot-actions">
                          <button
                            type="button"
                            className="cell-slot-btn"
                            title="Swap Night Slot"
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenSwapModal(day.id, 'night', day.night_plan);
                            }}
                          >
                            <ArrowLeftRight size={11} />
                          </button>
                          <button
                            type="button"
                            className="cell-slot-btn"
                            title="Edit Night Slot"
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenEditModal(day.id, 'night', day.night_plan);
                            }}
                          >
                            <Edit3 size={11} />
                          </button>
                        </div>
                      </div>
                      <div className="slot-mini-text">{day.night_plan}</div>
                    </div>

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
