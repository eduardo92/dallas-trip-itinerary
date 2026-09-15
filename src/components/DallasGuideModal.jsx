import React from 'react';
import { DALLAS_NEIGHBORHOODS } from '../data/defaultData';
import { MapPin, Sparkles, X, PlusCircle } from 'lucide-react';

export default function DallasGuideModal({ isOpen, onClose, onAddQuickIdea }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '640px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.4rem' }}>📍</span>
            <h3 className="modal-title">Dallas Neighborhoods & Hotspots Guide</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}><X size={18} /></button>
        </div>

        <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
          Explore iconic Dallas & Fort Worth districts. Tap any highlight to add it directly to your unscheduled ideas bucket!
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {DALLAS_NEIGHBORHOODS.map(n => (
            <div
              key={n.name}
              style={{
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '1rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: '#f8fafc', fontWeight: 700 }}>
                  {n.name}
                </h4>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)', padding: '0.2rem 0.6rem', borderRadius: '9999px' }}>
                  {n.vibe}
                </span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
                {n.highlights.map(h => (
                  <button
                    key={h}
                    onClick={() => {
                      onAddQuickIdea({
                        id: `guide-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
                        title: h,
                        category: 'Culture & Immersion',
                        description: `Featured in ${n.name} (${n.vibe})`,
                        location: n.name,
                        best_time: 'Flexible',
                        estimated_duration: '2 hours',
                        status: 'bucket',
                        sister_reaction: null,
                        created_by: 'guide'
                      });
                    }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '6px',
                      padding: '0.35rem 0.6rem',
                      fontSize: '0.785rem',
                      color: '#cbd5e1',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                    title="Click to add to your bucket"
                  >
                    <PlusCircle size={12} color="#f59e0b" />
                    <span>{h}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
