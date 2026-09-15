import React from 'react';
import { Calendar, User, RefreshCw, Sparkles, MapPin, CheckCircle2, Cloud, RotateCcw, Sun, Moon } from 'lucide-react';

export default function Header({
  userMode,
  setUserMode,
  theme = 'light',
  onToggleTheme,
  syncStatus,
  onOpenAiScout,
  onOpenDallasGuide,
  onResetItinerary,
  daysCount = 15,
  yellowCount = 9,
  greenCount = 6
}) {


  return (
    <header className="header-card">
      <div className="header-top">
        <div className="title-group">
          <div className="trip-badge-icon">🤠</div>
          <div>
            <h1 className="trip-title">Dallas Trip Itinerary</h1>
            <div className="trip-subtitle">
              <span>Sept 14 – Sept 28, 2026</span>
              <span>•</span>
              <span>15 Days Master Schedule</span>
              <span>•</span>
              <span style={{ color: '#f59e0b', fontWeight: 600 }}>Eduardo & Sister</span>
            </div>
          </div>
        </div>

        <div className="header-actions">
          {/* Identity switcher */}
          <div className="user-toggle" title="Switch viewpoint for notes and reactions">
            <button
              className={`user-btn ${userMode === 'eduardo' ? 'active' : ''}`}
              onClick={() => setUserMode('eduardo')}
            >
              🤠 Eduardo
            </button>
            <button
              className={`user-btn sister ${userMode === 'sister' ? 'active' : ''}`}
              onClick={() => setUserMode('sister')}
            >
              🌟 Sister
            </button>
          </div>

          {/* Sync badge */}
          <div className="sync-badge" title="Live sync with Turso cloud SQLite database">
            <span className="sync-dot"></span>
            <Cloud size={13} />
            <span>{syncStatus === 'syncing' ? 'Syncing...' : 'Turso Cloud Synced'}</span>
          </div>

          {/* AI Dallas Scout button */}
          <button 
            className="btn-primary" 
            onClick={onOpenAiScout} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.4rem', 
              fontSize: '0.825rem', 
              padding: '0.45rem 0.95rem',
              background: 'linear-gradient(135deg, #f59e0b, #ec4899)',
              color: '#ffffff',
              boxShadow: '0 2px 10px rgba(236, 72, 153, 0.35)'
            }}
          >
            <Sparkles size={14} color="#ffffff" />
            <span>AI Dallas Scout</span>
          </button>

          {/* Dallas Guide button */}
          <button className="btn-secondary" onClick={onOpenDallasGuide} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}>
            <MapPin size={14} color="#f59e0b" />
            <span>Hotspots</span>
          </button>


          {/* Theme Switcher */}
          <button
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
            <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
          </button>

          {/* Reset button */}

          <button 
            className="btn-secondary" 
            onClick={onResetItinerary} 
            title="Reset itinerary back to master default schedule"
            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.775rem', padding: '0.45rem 0.75rem', color: '#94a3b8' }}
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div className="trip-stats-bar">
        <div className="stat-chip">
          <Calendar size={15} color="#60a5fa" />
          <span>Total: <strong>{daysCount} Days</strong></span>
        </div>
        <div className="stat-chip yellow-pill">
          <span>💼 Work-fit Evenings: <strong>{yellowCount} Days</strong> (Free after 6 PM)</span>
        </div>
        <div className="stat-chip green-pill">
          <span>🎉 Full-Day / PTO / Weekends: <strong>{greenCount} Days</strong></span>
        </div>
        <div className="stat-chip" style={{ color: '#c084fc' }}>
          <span>✨ <strong>Empire of the Sun Concert</strong>: Sun, Sep 20</span>
        </div>
        <div className="stat-chip" style={{ color: '#38bdf8' }}>
          <span>🏈 <strong>Cowboys vs Commanders</strong>: Sep 20 (Conflict Note)</span>
        </div>
      </div>
    </header>
  );
}
