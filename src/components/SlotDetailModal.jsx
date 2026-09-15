import React, { useState } from 'react';
import { 
  MapPin, ExternalLink, Copy, Check, ArrowLeftRight, Edit3, 
  BookmarkPlus, X, Sun, Sunset, Moon, Sparkles, Navigation
} from 'lucide-react';
import { lookupDallasPlace } from '../data/dallasPlaces';

const SLOT_CONFIG = {
  morning: { label: '☀️ Daytime (Work / Sightseeing)', icon: <Sun size={15} />, color: '#0284c7' },
  evening: { label: '🌇 After-Work Activity', icon: <Sunset size={15} />, color: '#ea580c' },
  night: { label: '🌙 Night Plan', icon: <Moon size={15} />, color: '#7c3aed' }
};

export default function SlotDetailModal({
  isOpen,
  onClose,
  slotDetail,
  onOpenSwapModal,
  onOpenEditModal,
  onMoveToBucket,
  onUpdateSlotAddress,
  onUpdateSlot
}) {
  if (!isOpen || !slotDetail) return null;

  const { day, slotType, planText, customAddress } = slotDetail;
  const config = SLOT_CONFIG[slotType] || SLOT_CONFIG.morning;
  const isPto = day?.day_number === 5 || day?.day_number === 12;
  const isGreen = day?.status === 'GREEN';

  const [isEditingPlan, setIsEditingPlan] = useState(false);
  const [currentPlanText, setCurrentPlanText] = useState(planText || '');
  const [planTextInput, setPlanTextInput] = useState(planText || '');

  // Smart address lookup from the activity text or custom override
  const lookedUp = lookupDallasPlace(currentPlanText);
  const displayAddress = customAddress || lookedUp?.address || 'Dallas-Fort Worth Area, TX';
  const venueTitle = lookedUp?.name || currentPlanText;
  const googleMapsUrl = customAddress 
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(customAddress)}`
    : lookedUp?.googleMapsUrl;
  const appleMapsUrl = customAddress
    ? `https://maps.apple.com/?q=${encodeURIComponent(customAddress)}`
    : lookedUp?.appleMapsUrl;

  const [copied, setCopied] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [manualAddressInput, setManualAddressInput] = useState(displayAddress);

  const handleCopy = () => {
    navigator.clipboard.writeText(displayAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSavePlan = (e) => {
    e.preventDefault();
    if (planTextInput.trim()) {
      if (onUpdateSlot) {
        onUpdateSlot(day.id, slotType, planTextInput.trim());
      }
      setCurrentPlanText(planTextInput.trim());
    }
    setIsEditingPlan(false);
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (onUpdateSlotAddress) {
      onUpdateSlotAddress(day.id, slotType, manualAddressInput.trim());
    }
    setIsEditingAddress(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '560px' }}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.35rem' }}>📍</span>
            <div>
              <h3 className="modal-title" style={{ fontSize: '1.2rem' }}>
                Day {day?.day_number} Details ({day?.date_str})
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginTop: '2px' }}>
                <span className={`cell-status-pill ${isGreen ? 'green' : 'yellow'}`} style={{ fontSize: '0.685rem' }}>
                  {isPto ? '🌟 OFF (PTO CONFIRMED)' : isGreen ? '🎉 FULL DAY / WEEKEND' : '💼 WORK-FRIENDLY (~6 PM)'}
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: config.color }}>
                  {config.label}
                </span>
              </div>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}><X size={18} /></button>
        </div>

        {/* Plan Text Card */}
        <div style={{ 
          background: 'var(--bg-surface)', 
          border: '1px solid var(--border-subtle)', 
          borderRadius: '12px', 
          padding: '1.1rem', 
          marginBottom: '1rem' 
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
            <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Scheduled Plan
            </div>
            <button
              type="button"
              className="cell-slot-btn"
              style={{ fontSize: '0.725rem', padding: '0.2rem 0.55rem', gap: '0.3rem' }}
              onClick={() => {
                if (!isEditingPlan) setPlanTextInput(currentPlanText);
                setIsEditingPlan(!isEditingPlan);
              }}
            >
              <Edit3 size={11} />
              <span>{isEditingPlan ? 'Cancel' : 'Quick Edit'}</span>
            </button>
          </div>

          {isEditingPlan ? (
            <form onSubmit={handleSavePlan} style={{ marginTop: '0.4rem' }}>
              <textarea
                value={planTextInput}
                onChange={e => setPlanTextInput(e.target.value)}
                className="inline-edit-textarea"
                style={{ minHeight: '80px', fontSize: '0.925rem' }}
                autoFocus
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.4rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  className="btn-inline-cancel"
                  onClick={() => {
                    setPlanTextInput(currentPlanText);
                    setIsEditingPlan(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-inline-save"
                >
                  <Check size={13} /> Save Plan
                </button>
              </div>
            </form>
          ) : (
            <div 
              style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 600, lineHeight: 1.5, cursor: 'pointer' }}
              onClick={() => {
                setPlanTextInput(currentPlanText);
                setIsEditingPlan(true);
              }}
              title="Click to edit plan"
            >
              {currentPlanText}
            </div>
          )}

          {day?.notes && (
            <div style={{ marginTop: '0.65rem', paddingTop: '0.65rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.775rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Sparkles size={12} color="var(--accent-amber)" />
              <span>Day note: {day.notes}</span>
            </div>
          )}
        </div>

        {/* Address & Navigation Card */}
        <div style={{ 
          background: 'var(--status-yellow-bg)', 
          border: '1px solid var(--status-yellow-border)', 
          borderRadius: '12px', 
          padding: '1.1rem', 
          marginBottom: '1.25rem' 
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <MapPin size={15} color="var(--accent-amber)" />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--status-yellow-text)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Looked-Up Location & Address
              </span>
            </div>
            {lookedUp?.neighborhood && (
              <span style={{ fontSize: '0.7rem', fontWeight: 700, background: 'rgba(217, 119, 6, 0.15)', color: 'var(--status-yellow-text)', padding: '0.15rem 0.5rem', borderRadius: '9999px' }}>
                {lookedUp.neighborhood}
              </span>
            )}
          </div>

          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
            {venueTitle}
          </div>

          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.85rem', lineHeight: 1.4, fontFamily: 'var(--font-mono)' }}>
            {displayAddress}
          </div>

          {/* Quick Action Buttons for Address */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {/* Copy Address Button */}
            <button
              type="button"
              onClick={handleCopy}
              style={{
                background: copied ? 'var(--status-green-bg)' : 'var(--bg-card)',
                border: copied ? '1px solid var(--status-green-border)' : '1px solid var(--border-medium)',
                color: copied ? 'var(--status-green-text)' : 'var(--text-primary)',
                padding: '0.4rem 0.75rem',
                borderRadius: '8px',
                fontSize: '0.775rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              <span>{copied ? 'Copied Address!' : 'Copy Address'}</span>
            </button>

            {/* Open in Google Maps */}
            {googleMapsUrl && (
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-medium)',
                  color: 'var(--text-primary)',
                  padding: '0.4rem 0.75rem',
                  borderRadius: '8px',
                  fontSize: '0.775rem',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  textDecoration: 'none',
                  transition: 'all 0.15s'
                }}
              >
                <Navigation size={13} color="#0284c7" />
                <span>Google Maps</span>
                <ExternalLink size={11} color="var(--text-muted)" />
              </a>
            )}

            {/* Open in Apple Maps */}
            {appleMapsUrl && (
              <a
                href={appleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-medium)',
                  color: 'var(--text-primary)',
                  padding: '0.4rem 0.75rem',
                  borderRadius: '8px',
                  fontSize: '0.775rem',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  textDecoration: 'none',
                  transition: 'all 0.15s'
                }}
              >
                <span>🍎 Apple Maps</span>
                <ExternalLink size={11} color="var(--text-muted)" />
              </a>
            )}

            {/* Toggle edit address */}
            <button
              type="button"
              onClick={() => setIsEditingAddress(!isEditingAddress)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--accent-amber)',
                fontSize: '0.75rem',
                fontWeight: 600,
                textDecoration: 'underline',
                padding: '0.4rem 0.25rem',
                cursor: 'pointer'
              }}
            >
              {isEditingAddress ? 'Cancel' : 'Edit address'}
            </button>
          </div>

          {/* Edit Address Inline Form */}
          {isEditingAddress && (
            <form onSubmit={handleSaveAddress} style={{ marginTop: '0.85rem', paddingTop: '0.85rem', borderTop: '1px dashed var(--status-yellow-border)' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--status-yellow-text)', marginBottom: '0.3rem' }}>
                Custom Street Address or Hotel Location:
              </label>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <input
                  type="text"
                  value={manualAddressInput}
                  onChange={e => setManualAddressInput(e.target.value)}
                  placeholder="e.g. 123 Main St, Dallas, TX 75201"
                  style={{
                    flex: 1,
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: '6px',
                    padding: '0.4rem 0.65rem',
                    fontSize: '0.8rem',
                    color: 'var(--text-primary)',
                    outline: 'none'
                  }}
                  required
                />
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ fontSize: '0.75rem', padding: '0.4rem 0.85rem' }}
                >
                  Save Address
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Modal Action Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button
              type="button"
              className="btn-secondary"
              style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              onClick={() => {
                onClose();
                onOpenSwapModal(day.id, slotType, planText);
              }}
            >
              <ArrowLeftRight size={13} />
              <span>Swap Slot</span>
            </button>

            <button
              type="button"
              className="btn-secondary"
              style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              onClick={() => {
                onClose();
                onOpenEditModal(day.id, slotType, planText);
              }}
            >
              <Edit3 size={13} />
              <span>Edit Plan</span>
            </button>

            <button
              type="button"
              className="btn-secondary"
              title="Move this idea to the backlog bucket"
              style={{ fontSize: '0.8rem', padding: '0.45rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              onClick={() => {
                onClose();
                onMoveToBucket(planText, slotType, day.id);
              }}
            >
              <BookmarkPlus size={13} />
              <span>To Bucket</span>
            </button>
          </div>

          <button type="button" className="btn-secondary" onClick={onClose} style={{ fontSize: '0.8rem', padding: '0.45rem 0.95rem' }}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
