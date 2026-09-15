import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CowboysWidget from './components/CowboysWidget';
import MasterSchedule from './components/MasterSchedule';
import IdeaBucket from './components/IdeaBucket';
import SwapModal from './components/SwapModal';
import EditModal from './components/EditModal';
import DallasGuideModal from './components/DallasGuideModal';
import { 
  fetchItineraryFromCloud, 
  updateCloudSlot, 
  swapCloudSlots, 
  saveCloudBucketItem, 
  resetCloudItinerary,
  saveStoredDays,
  saveStoredBucket,
  getLocalUserMode,
  setLocalUserMode
} from './services/api';
import { INITIAL_DAYS, INITIAL_BUCKET } from './data/defaultData';
import { 
  Calendar, Search, Filter, Sparkles, Lightbulb, Trophy, 
  CheckCircle, ArrowLeftRight, Heart
} from 'lucide-react';

export default function App() {
  const [days, setDays] = useState(INITIAL_DAYS);
  const [bucketItems, setBucketItems] = useState(INITIAL_BUCKET);
  const [userMode, setUserMode] = useState(getLocalUserMode());
  const [syncStatus, setSyncStatus] = useState('syncing');
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'schedule', 'bucket'
  const [filterMode, setFilterMode] = useState('all'); // 'all', 'yellow', 'green'
  const [searchQuery, setSearchQuery] = useState('');
  
  const [dragItem, setDragItem] = useState(null);
  const [swapModalInfo, setSwapModalInfo] = useState(null);
  const [editModalInfo, setEditModalInfo] = useState(null);
  const [isDallasGuideOpen, setIsDallasGuideOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Load cloud data on mount
  useEffect(() => {
    async function loadData() {
      setSyncStatus('syncing');
      const data = await fetchItineraryFromCloud();
      if (data.days && data.days.length > 0) {
        setDays(data.days);
      }
      if (data.bucket && data.bucket.length > 0) {
        setBucketItems(data.bucket);
      }
      setSyncStatus('synced');
    }
    loadData();
  }, []);

  const handleUserModeChange = (mode) => {
    setUserMode(mode);
    setLocalUserMode(mode);
    showNotification(`Switched mode to ${mode === 'sister' ? '🌟 Sister' : '🤠 Eduardo'}`);
  };

  // Slot swap handler (optimistic UI)
  const handleSwapSlots = async (sourceDayId, sourceSlot, targetDayId, targetSlot) => {
    const sourceCol = sourceSlot === 'morning' ? 'morning_plan' : sourceSlot === 'evening' ? 'evening_plan' : 'night_plan';
    const targetCol = targetSlot === 'morning' ? 'morning_plan' : targetSlot === 'evening' ? 'evening_plan' : 'night_plan';

    const sourceDay = days.find(d => d.id === sourceDayId);
    const targetDay = days.find(d => d.id === targetDayId);
    if (!sourceDay || !targetDay) return;

    const sourceText = sourceDay[sourceCol];
    const targetText = targetDay[targetCol];

    const updatedDays = days.map(d => {
      if (d.id === sourceDayId && d.id === targetDayId) {
        return {
          ...d,
          [sourceCol]: targetText,
          [targetCol]: sourceText
        };
      }
      if (d.id === sourceDayId) {
        return { ...d, [sourceCol]: targetText };
      }
      if (d.id === targetDayId) {
        return { ...d, [targetCol]: sourceText };
      }
      return d;
    });

    setDays(updatedDays);
    saveStoredDays(updatedDays);
    showNotification(`Swapped Day ${sourceDay.day_number} (${sourceSlot}) with Day ${targetDay.day_number} (${targetSlot})`);

    setSyncStatus('syncing');
    await swapCloudSlots(sourceDayId, sourceSlot, targetDayId, targetSlot);
    setSyncStatus('synced');
  };

  // Slot update handler
  const handleUpdateSlot = async (dayId, slotType, content, notes) => {
    const col = slotType === 'morning' ? 'morning_plan' : slotType === 'evening' ? 'evening_plan' : 'night_plan';
    const updatedDays = days.map(d => {
      if (d.id === dayId) {
        return {
          ...d,
          [col]: content,
          notes: notes !== undefined ? notes : d.notes
        };
      }
      return d;
    });

    setDays(updatedDays);
    saveStoredDays(updatedDays);
    showNotification(`Updated Day ${days.find(d => d.id === dayId)?.day_number} plan`);

    setSyncStatus('syncing');
    await updateCloudSlot(dayId, slotType, content, notes);
    setSyncStatus('synced');
  };

  // Move plan from day slot into the Unscheduled Bucket
  const handleMoveToBucket = async (planText, slotType, dayId) => {
    if (!planText || planText === 'Rest or flexible nearby plan.') return;

    const newItem = {
      id: `bucket-${Date.now()}`,
      title: planText.length > 50 ? planText.slice(0, 47) + '...' : planText,
      category: 'Culture & Immersion',
      description: planText,
      location: 'Dallas Area',
      estimated_duration: '2-3 hours',
      best_time: slotType,
      status: 'bucket',
      sister_reaction: null,
      created_by: userMode
    };

    const updatedBucket = [newItem, ...bucketItems];
    setBucketItems(updatedBucket);
    saveStoredBucket(updatedBucket);

    // Replace slot text with flexible buffer
    await handleUpdateSlot(dayId, slotType, 'Free flexible slot / choose from bucket');
    await saveCloudBucketItem(newItem);
    showNotification('Moved plan into Unscheduled Bucket!');
  };

  // Schedule an item from bucket to a specific day slot
  const handleScheduleItem = async (item, dayId, slot) => {
    const day = days.find(d => d.id === dayId);
    if (!day) return;

    const planText = `${item.title}${item.location ? ` @ ${item.location}` : ''}`;
    await handleUpdateSlot(dayId, slot, planText);
    showNotification(`Scheduled "${item.title}" to Day ${day.day_number} (${slot})`);
  };

  // Add custom idea to bucket
  const handleAddBucketItem = async (newItem) => {
    const updated = [newItem, ...bucketItems];
    setBucketItems(updated);
    saveStoredBucket(updated);
    showNotification(`Added "${newItem.title}" to ideas bucket`);

    setSyncStatus('syncing');
    await saveCloudBucketItem(newItem);
    setSyncStatus('synced');
  };

  // Delete idea from bucket
  const handleDeleteBucketItem = (itemId) => {
    const updated = bucketItems.filter(b => b.id !== itemId);
    setBucketItems(updated);
    saveStoredBucket(updated);
    showNotification('Removed idea from bucket');
  };

  // Toggle reaction
  const handleToggleReaction = async (itemId, reaction) => {
    const updated = bucketItems.map(b => {
      if (b.id === itemId) {
        return { ...b, sister_reaction: reaction };
      }
      return b;
    });
    setBucketItems(updated);
    saveStoredBucket(updated);

    const item = updated.find(b => b.id === itemId);
    if (item) {
      await saveCloudBucketItem(item);
    }
  };

  // Reset itinerary to master default
  const handleResetItinerary = async () => {
    if (!window.confirm('Reset itinerary and ideas back to original master schedule? Any custom swaps will be reloaded to default.')) {
      return;
    }
    setDays(INITIAL_DAYS);
    setBucketItems(INITIAL_BUCKET);
    saveStoredDays(INITIAL_DAYS);
    saveStoredBucket(INITIAL_BUCKET);

    setSyncStatus('syncing');
    await resetCloudItinerary();
    setSyncStatus('synced');
    showNotification('Reset to master default schedule!');
  };

  const yellowCount = days.filter(d => d.status === 'YELLOW').length;
  const greenCount = days.filter(d => d.status === 'GREEN').length;

  return (
    <div className="app-container">
      {/* Toast Notification */}
      {notification && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: 'rgba(17, 24, 39, 0.95)',
          border: '1px solid rgba(245, 158, 11, 0.5)',
          color: '#f8fafc',
          padding: '0.75rem 1.25rem',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.6)',
          zIndex: 9999,
          fontSize: '0.875rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          animation: 'slideUp 0.2s ease-out'
        }}>
          <Sparkles size={16} color="#f59e0b" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header */}
      <Header
        userMode={userMode}
        setUserMode={handleUserModeChange}
        syncStatus={syncStatus}
        onOpenDallasGuide={() => setIsDallasGuideOpen(true)}
        onResetItinerary={handleResetItinerary}
        daysCount={days.length}
        yellowCount={yellowCount}
        greenCount={greenCount}
      />

      {/* Cowboys Schedule & Conflict Widget */}
      <CowboysWidget />

      {/* Navigation and Filters Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        {/* Main Tabs */}
        <div className="nav-tabs" style={{ margin: 0, border: 'none', padding: 0 }}>
          <button
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            <Calendar size={16} />
            <span>Master Itinerary</span>
            <span className="badge-count">15 Days</span>
          </button>
          <button
            className={`tab-btn ${activeTab === 'bucket' ? 'active' : ''}`}
            onClick={() => setActiveTab('bucket')}
          >
            <Lightbulb size={16} />
            <span>Ideas Bucket</span>
            <span className="badge-count">{bucketItems.length}</span>
          </button>
        </div>

        {/* Search and Status Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
          {/* Status filter chips */}
          <div style={{ display: 'flex', background: 'rgba(15, 23, 42, 0.5)', padding: '0.2rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            <button
              onClick={() => setFilterMode('all')}
              style={{
                padding: '0.35rem 0.65rem',
                borderRadius: '6px',
                fontSize: '0.775rem',
                fontWeight: 600,
                background: filterMode === 'all' ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: filterMode === 'all' ? '#f8fafc' : '#94a3b8'
              }}
            >
              All
            </button>
            <button
              onClick={() => setFilterMode('yellow')}
              style={{
                padding: '0.35rem 0.65rem',
                borderRadius: '6px',
                fontSize: '0.775rem',
                fontWeight: 600,
                background: filterMode === 'yellow' ? 'rgba(245, 158, 11, 0.2)' : 'transparent',
                color: filterMode === 'yellow' ? '#fbbf24' : '#94a3b8'
              }}
            >
              💼 Work-Fit
            </button>
            <button
              onClick={() => setFilterMode('green')}
              style={{
                padding: '0.35rem 0.65rem',
                borderRadius: '6px',
                fontSize: '0.775rem',
                fontWeight: 600,
                background: filterMode === 'green' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                color: filterMode === 'green' ? '#34d399' : '#94a3b8'
              }}
            >
              🎉 PTO / Weekend
            </button>
          </div>

          {/* Search box */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', color: '#64748b' }} />
            <input
              type="text"
              placeholder="Search plans or dates..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '0.4rem 0.75rem 0.4rem 2rem',
                fontSize: '0.8rem',
                color: '#f8fafc',
                outline: 'none',
                width: '180px'
              }}
            />
          </div>
        </div>
      </div>

      {/* Render Main Content */}
      {activeTab === 'all' && (
        <>
          <MasterSchedule
            days={days}
            onSwapSlots={handleSwapSlots}
            onUpdateSlot={handleUpdateSlot}
            onMoveToBucket={handleMoveToBucket}
            onOpenSwapModal={(dayId, slotType, text) => setSwapModalInfo({ dayId, slotType, currentText: text })}
            onOpenEditModal={(dayId, slotType, text) => setEditModalInfo({ dayId, slotType, currentText: text })}
            dragItem={dragItem}
            setDragItem={setDragItem}
            filterMode={filterMode}
            searchQuery={searchQuery}
          />

          <div style={{ marginTop: '3rem' }}>
            <IdeaBucket
              bucketItems={bucketItems}
              days={days}
              onScheduleItem={handleScheduleItem}
              onToggleReaction={handleToggleReaction}
              onAddBucketItem={handleAddBucketItem}
              onDeleteBucketItem={handleDeleteBucketItem}
              userMode={userMode}
              setDragItem={setDragItem}
            />
          </div>
        </>
      )}

      {activeTab === 'bucket' && (
        <IdeaBucket
          bucketItems={bucketItems}
          days={days}
          onScheduleItem={handleScheduleItem}
          onToggleReaction={handleToggleReaction}
          onAddBucketItem={handleAddBucketItem}
          onDeleteBucketItem={handleDeleteBucketItem}
          userMode={userMode}
          setDragItem={setDragItem}
        />
      )}

      {/* Swap Modal */}
      <SwapModal
        isOpen={!!swapModalInfo}
        onClose={() => setSwapModalInfo(null)}
        sourceInfo={swapModalInfo}
        days={days}
        onConfirmSwap={handleSwapSlots}
      />

      {/* Edit Modal */}
      <EditModal
        isOpen={!!editModalInfo}
        onClose={() => setEditModalInfo(null)}
        editInfo={editModalInfo}
        days={days}
        onSave={handleUpdateSlot}
      />

      {/* Dallas Guide Modal */}
      <DallasGuideModal
        isOpen={isDallasGuideOpen}
        onClose={() => setIsDallasGuideOpen(false)}
        onAddQuickIdea={handleAddBucketItem}
      />
    </div>
  );
}
