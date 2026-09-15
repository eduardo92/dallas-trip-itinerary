import React, { useState } from 'react';
import { COWBOYS_GAMES } from '../data/cowboysData';
import { AlertTriangle, ChevronRight, X, ShieldAlert, Calendar, Radio, MapPin, Trophy } from 'lucide-react';

export default function CowboysWidget() {
  const [showModal, setShowModal] = useState(false);

  const conflictGame = COWBOYS_GAMES.find(g => g.status === 'conflict');

  return (
    <>
      <div className="cowboys-banner">
        <div className="cowboys-banner-content">
          <div className="cowboys-star">★</div>
          <div>
            <div className="cowboys-info-title">
              Dallas Cowboys Schedule & Conflict Alert
            </div>
            <div className="cowboys-info-subtitle">
              <span>Sep 20 vs Commanders (3:25 PM) overlaps Empire of the Sun concert. Sep 27 vs Ravens is in Brazil!</span>
            </div>
          </div>
        </div>

        <button className="cowboys-view-btn" onClick={() => setShowModal(true)}>
          <span>View All 5 Games</span>
          <ChevronRight size={15} />
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '640px' }}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ fontSize: '1.4rem' }}>🏈</span>
                <h3 className="modal-title">Dallas Cowboys Around Your Trip</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setShowModal(false)}>
                <X size={18} />
              </button>
            </div>

            <div style={{ marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Here are the 5 Cowboys games scheduled before, during, and after your Sept 14–28 trip:
            </div>

            <div className="cowboys-list">
              {COWBOYS_GAMES.map(game => {
                const isConflict = game.status === 'conflict';
                const isBrazil = game.status === 'international';
                return (
                  <div
                    key={game.id}
                    className={`cowboys-game-card ${isConflict ? 'conflict' : isBrazil ? 'international' : ''}`}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                          {game.matchup}
                        </span>
                        {isConflict && (
                          <span className="conflict-pill">
                            <AlertTriangle size={12} /> CONFLICT
                          </span>
                        )}
                        {isBrazil && (
                          <span style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#2563eb', border: '1px solid rgba(59, 130, 246, 0.35)', padding: '0.2rem 0.5rem', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 700 }}>
                            🇧🇷 BRAZIL GAME
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: isConflict ? '#dc2626' : 'var(--accent-amber)' }}>
                        {game.timingLabel}
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Calendar size={13} /> {game.date}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Radio size={13} /> {game.time} ({game.broadcast})
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <MapPin size={13} /> {game.venue}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.8rem', color: isConflict ? '#dc2626' : 'var(--text-secondary)', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', padding: '0.5rem 0.75rem', borderRadius: '6px' }}>
                      {game.tripNote}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
