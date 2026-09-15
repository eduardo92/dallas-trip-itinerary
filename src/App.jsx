import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CowboysWidget from './components/CowboysWidget';
import MasterSchedule from './components/MasterSchedule';
import CalendarGridView from './components/CalendarGridView';
import UltimatePlannerBanner from './components/UltimatePlannerBanner';
import IdeaBucket from './components/IdeaBucket';
import SwapModal from './components/SwapModal';
import EditModal from './components/EditModal';
import DallasGuideModal from './components/DallasGuideModal';
import AiScoutModal from './components/AiScoutModal';
import SlotDetailModal from './components/SlotDetailModal';
import AddPlaceModal from './components/AddPlaceModal';
import { 
  fetchItineraryFromCloud, 
  updateCloudSlot, 
  swapCloudSlots, 
  saveCloudBucketItem, 
  resetCloudItinerary,
  saveStoredDays,
  saveStoredBucket,
  getLocalUserMode,
  setLocalUserMode,
  getLocalTheme,
  setLocalTheme
} from './services/api';
import { INITIAL_DAYS, INITIAL_BUCKET } from './data/defaultData';
import { 
  Calendar, Search, Filter, Sparkles, Lightbulb, Trophy, 
  CheckCircle, ArrowLeftRight, Heart, X, PlusCircle
} from 'lucide-react';

export default function App() {
  const [days, setDays] = useState(INITIAL_DAYS);
  const [bucketItems, setBucketItems] = useState(INITIAL_BUCKET);
  const [userMode, setUserMode] = useState(getLocalUserMode());
  const [theme, setTheme] = useState(getLocalTheme());
  const [syncStatus, setSyncStatus] = useState('syncing');
  const [activeTab, setActiveTab] = useState('calendar'); // 'calendar', 'cards', 'bucket', 'all'
  const [filterMode, setFilterMode] = useState('all'); // 'all', 'yellow', 'green'
  const [searchQuery, setSearchQuery] = useState('');
  
  const [dragItem, setDragItem] = useState(null);
  const [pickedSlot, setPickedSlot] = useState(null); // For 1-tap/click pick-to-swap: { dayId, dayNumber, slotType, slotLabel, text }
  const [swapModalInfo, setSwapModalInfo] = useState(null);
  const [editModalInfo, setEditModalInfo] = useState(null);
  const [slotDetailModalInfo, setSlotDetailModalInfo] = useState(null);
  const [isAddPlaceModalOpen, setIsAddPlaceModalOpen] = useState(false);
  const [isDallasGuideOpen, setIsDallasGuideOpen] = useState(false);
  const [isAiScoutOpen, setIsAiScoutOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // Custom addresses mapped by `${dayId}-${slotType}`
  const [slotCustomAddresses, setSlotCustomAddresses] = useState(() => {
    try {
      const raw = localStorage.getItem('dallas_trip_custom_addresses_v1');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3200);
  };

  // Sync theme with document attribute & localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    setLocalTheme(theme);
  }, [theme]);

  const handleToggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    showNotification(`Switched to ${nextTheme === 'light' ? '☀️ Light' : '🌙 Dark'} Mode`);
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

  // Slot swap handler (optimistic UI + cloud sync)
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
    showNotification(`Swapped Day ${sourceDay.day_number} with Day ${targetDay.day_number}!`);

    setSyncStatus('syncing');
    await swapCloudSlots(sourceDayId, sourceSlot, targetDayId, targetSlot);
    setSyncStatus('synced');
  };

  // 1-Tap Pick-to-Swap logic
  const handlePickSlot = (dayId, dayNumber, slotType, slotLabel, text) => {
    if (!pickedSlot) {
      setPickedSlot({ dayId, dayNumber, slotType, slotLabel, text });
      showNotification(`📍 Picked up Day ${dayNumber} (${slotLabel}). Click or tap any slot to swap!`);
    } else if (pickedSlot.dayId === dayId && pickedSlot.slotType === slotType) {
      setPickedSlot(null);
      showNotification('Cancelled slot move');
    } else {
      handleSwapSlots(pickedSlot.dayId, pickedSlot.slotType, dayId, slotType);
      setPickedSlot(null);
    }
  };

  const handleCancelPickSlot = () => {
    setPickedSlot(null);
  };

  // Open rich slot details modal (shows looked-up address, map link, and actions)
  const handleOpenSlotDetail = (day, slotType, planText) => {
    const key = `${day.id}-${slotType}`;
    const customAddress = slotCustomAddresses[key];
    setSlotDetailModalInfo({ day, slotType, planText, customAddress });
  };

  // Update custom address for a slot
  const handleUpdateSlotAddress = (dayId, slotType, newAddress) => {
    const key = `${dayId}-${slotType}`;
    const updated = { ...slotCustomAddresses, [key]: newAddress };
    setSlotCustomAddresses(updated);
    try {
      localStorage.setItem('dallas_trip_custom_addresses_v1', JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving custom addresses:', e);
    }
    showNotification('Saved custom address for slot!');
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
      category: 'Must-Sees Dallas',
      description: planText,
      location: 'Dallas Area, TX',
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
    if (item.location) {
      handleUpdateSlotAddress(dayId, slot, item.location);
    }
    showNotification(`Scheduled "${item.title}" to Day ${day.day_number} (${slot})`);
  };

  // Directly schedule a newly created place
  const handleScheduleDirectly = async (item, dayId, slotType) => {
    await handleScheduleItem(item, dayId, slotType);
    await handleAddBucketItem(item);
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
    setSlotCustomAddresses({});
    try {
      localStorage.removeItem('dallas_trip_custom_addresses_v1');
    } catch (e) {
      console.error(e);
    }
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
          background: 'var(--bg-card)',
          border: '1px solid var(--accent-amber)',
          color: 'var(--text-primary)',
          padding: '0.75rem 1.25rem',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          zIndex: 9999,
          fontSize: '0.875rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          animation: 'slideUp 0.2s ease-out'
        }}>
          <Sparkles size={16} color="var(--accent-amber)" />
          <span>{notification}</span>
        </div>
      )}

      {/* Sticky Pick-to-Swap Floating Bar */}
      {pickedSlot && (
        <div className="pick-to-swap-banner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <ArrowLeftRight size={18} color="#f59e0b" />
            <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>
              Moving <strong>Day {pickedSlot.dayNumber} ({pickedSlot.slotLabel})</strong>: Tap/click any slot to swap!
            </span>
          </div>
          <button className="pick-to-swap-cancel-btn" onClick={handleCancelPickSlot}>
            ✕ Cancel
          </button>
        </div>
      )}

      {/* Header */}
      <Header
        userMode={userMode}
        setUserMode={handleUserModeChange}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        syncStatus={syncStatus}
        onOpenAiScout={() => setIsAiScoutOpen(true)}
        onOpenDallasGuide={() => setIsDallasGuideOpen(true)}
        onResetItinerary={handleResetItinerary}
        daysCount={days.length}
        yellowCount={yellowCount}
        greenCount={greenCount}
      />

      {/* Cowboys Schedule & Conflict Widget */}
      <CowboysWidget />

      {/* Ultimate Planner Overview Banner & Smart Suggestions */}
      <UltimatePlannerBanner
        onOpenAiScout={() => setIsAiScoutOpen(true)}
        onOpenDallasGuide={() => setIsDallasGuideOpen(true)}
        days={days}
        onAddQuickIdea={handleAddBucketItem}
      />

      {/* Navigation and Filters Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        {/* Main Tabs */}
        <div className="nav-tabs" style={{ margin: 0, border: 'none', padding: 0 }}>
          <button
            className={`tab-btn ${activeTab === 'calendar' ? 'active' : ''}`}
            onClick={() => setActiveTab('calendar')}
          >
            <Calendar size={16} />
            <span>🗓️ Calendar Grid</span>
            <span className="badge-count">7-Day Matrix</span>
          </button>
          <button
            className={`tab-btn ${activeTab === 'cards' ? 'active' : ''}`}
            onClick={() => setActiveTab('cards')}
          >
            <Calendar size={16} />
            <span>📋 Daily Cards</span>
            <span className="badge-count">15 Days</span>
          </button>
          <button
            className={`tab-btn ${activeTab === 'bucket' ? 'active' : ''}`}
            onClick={() => setActiveTab('bucket')}
          >
            <Lightbulb size={16} />
            <span>💡 Ideas Bucket</span>
            <span className="badge-count">{bucketItems.length}</span>
          </button>
          <button
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            <Sparkles size={16} />
            <span>🌟 All-in-One</span>
          </button>
        </div>

        {/* Search, Add Place Button, and Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
          {/* Quick Add Place button */}
          <button
            className="btn-primary"
            onClick={() => setIsAddPlaceModalOpen(true)}
            style={{
              padding: '0.4rem 0.85rem',
              fontSize: '0.8rem',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <PlusCircle size={14} />
            <span>Add Place</span>
          </button>

          {/* Status filter chips */}
          <div style={{ display: 'flex', background: 'var(--bg-card)', padding: '0.2rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-card)' }}>
            <button
              onClick={() => setFilterMode('all')}
              style={{
                padding: '0.35rem 0.65rem',
                borderRadius: '6px',
                fontSize: '0.775rem',
                fontWeight: 600,
                background: filterMode === 'all' ? 'var(--bg-card-hover)' : 'transparent',
                color: filterMode === 'all' ? 'var(--text-primary)' : 'var(--text-muted)'
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
                background: filterMode === 'yellow' ? 'var(--status-yellow-bg)' : 'transparent',
                color: filterMode === 'yellow' ? 'var(--status-yellow-text)' : 'var(--text-muted)'
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
                background: filterMode === 'green' ? 'var(--status-green-bg)' : 'transparent',
                color: filterMode === 'green' ? 'var(--status-green-text)' : 'var(--text-muted)'
              }}
            >
              🎉 PTO / Weekend
            </button>
          </div>

          {/* Search box */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search plans or places..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '0.4rem 0.75rem 0.4rem 2rem',
                fontSize: '0.8rem',
                color: 'var(--text-primary)',
                outline: 'none',
                width: '180px',
                boxShadow: 'var(--shadow-card)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Render Calendar Grid View */}
      {activeTab === 'calendar' && (
        <CalendarGridView
          days={days}
          onOpenSwapModal={(dayId, slotType, text) => setSwapModalInfo({ dayId, slotType, currentText: text })}
          onOpenEditModal={(dayId, slotType, text) => setEditModalInfo({ dayId, slotType, currentText: text })}
          onOpenSlotDetail={handleOpenSlotDetail}
          onSwapSlots={handleSwapSlots}
          onUpdateSlot={handleUpdateSlot}
          dragItem={dragItem}
          setDragItem={setDragItem}
          pickedSlot={pickedSlot}
          onPickSlot={handlePickSlot}
        />
      )}

      {/* Render Daily Cards View */}
      {activeTab === 'cards' && (
        <MasterSchedule
          days={days}
          onSwapSlots={handleSwapSlots}
          onUpdateSlot={handleUpdateSlot}
          onMoveToBucket={handleMoveToBucket}
          onOpenSwapModal={(dayId, slotType, text) => setSwapModalInfo({ dayId, slotType, currentText: text })}
          onOpenEditModal={(dayId, slotType, text) => setEditModalInfo({ dayId, slotType, currentText: text })}
          onOpenSlotDetail={handleOpenSlotDetail}
          dragItem={dragItem}
          setDragItem={setDragItem}
          filterMode={filterMode}
          searchQuery={searchQuery}
          pickedSlot={pickedSlot}
          onPickSlot={handlePickSlot}
        />
      )}

      {/* Render Ideas Bucket */}
      {activeTab === 'bucket' && (
        <IdeaBucket
          bucketItems={bucketItems}
          days={days}
          onScheduleItem={handleScheduleItem}
          onToggleReaction={handleToggleReaction}
          onAddBucketItem={handleAddBucketItem}
          onDeleteBucketItem={handleDeleteBucketItem}
          onOpenAiScout={() => setIsAiScoutOpen(true)}
          onOpenAddPlace={() => setIsAddPlaceModalOpen(true)}
          userMode={userMode}
          setDragItem={setDragItem}
        />
      )}

      {/* Render All-in-One View */}
      {activeTab === 'all' && (
        <>
          <CalendarGridView
            days={days}
            onOpenSwapModal={(dayId, slotType, text) => setSwapModalInfo({ dayId, slotType, currentText: text })}
            onOpenEditModal={(dayId, slotType, text) => setEditModalInfo({ dayId, slotType, currentText: text })}
            onOpenSlotDetail={handleOpenSlotDetail}
            onSwapSlots={handleSwapSlots}
            onUpdateSlot={handleUpdateSlot}
            dragItem={dragItem}
            setDragItem={setDragItem}
            pickedSlot={pickedSlot}
            onPickSlot={handlePickSlot}
          />

          <div style={{ marginTop: '2.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              📋 Detailed Day-by-Day Slot Breakdown
            </h3>
            <MasterSchedule
              days={days}
              onSwapSlots={handleSwapSlots}
              onUpdateSlot={handleUpdateSlot}
              onMoveToBucket={handleMoveToBucket}
              onOpenSwapModal={(dayId, slotType, text) => setSwapModalInfo({ dayId, slotType, currentText: text })}
              onOpenEditModal={(dayId, slotType, text) => setEditModalInfo({ dayId, slotType, currentText: text })}
              onOpenSlotDetail={handleOpenSlotDetail}
              dragItem={dragItem}
              setDragItem={setDragItem}
              filterMode={filterMode}
              searchQuery={searchQuery}
              pickedSlot={pickedSlot}
              onPickSlot={handlePickSlot}
            />
          </div>

          <div style={{ marginTop: '3rem' }}>
            <IdeaBucket
              bucketItems={bucketItems}
              days={days}
              onScheduleItem={handleScheduleItem}
              onToggleReaction={handleToggleReaction}
              onAddBucketItem={handleAddBucketItem}
              onDeleteBucketItem={handleDeleteBucketItem}
              onOpenAiScout={() => setIsAiScoutOpen(true)}
              onOpenAddPlace={() => setIsAddPlaceModalOpen(true)}
              userMode={userMode}
              setDragItem={setDragItem}
            />
          </div>
        </>
      )}

      {/* Slot Details & Address Navigation Modal */}
      <SlotDetailModal
        isOpen={!!slotDetailModalInfo}
        onClose={() => setSlotDetailModalInfo(null)}
        slotDetail={slotDetailModalInfo}
        onOpenSwapModal={(dayId, slotType, text) => setSwapModalInfo({ dayId, slotType, currentText: text })}
        onOpenEditModal={(dayId, slotType, text) => setEditModalInfo({ dayId, slotType, currentText: text })}
        onMoveToBucket={handleMoveToBucket}
        onUpdateSlotAddress={handleUpdateSlotAddress}
        onUpdateSlot={handleUpdateSlot}
      />

      {/* Add Manual Place Modal */}
      <AddPlaceModal
        isOpen={isAddPlaceModalOpen}
        onClose={() => setIsAddPlaceModalOpen(false)}
        onAddBucketItem={handleAddBucketItem}
        onScheduleDirectly={handleScheduleDirectly}
        days={days}
        userMode={userMode}
      />

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

      {/* AI Scout Modal */}
      <AiScoutModal
        isOpen={isAiScoutOpen}
        onClose={() => setIsAiScoutOpen(false)}
        days={days}
        onAddToBucket={handleAddBucketItem}
        onScheduleItem={handleScheduleItem}
        userMode={userMode}
      />
    </div>
  );
}
