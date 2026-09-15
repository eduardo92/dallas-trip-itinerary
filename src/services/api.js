import { INITIAL_DAYS, INITIAL_BUCKET } from '../data/defaultData';

const STORAGE_DAYS_KEY = 'dallas_trip_days_v1';
const STORAGE_BUCKET_KEY = 'dallas_trip_bucket_v1';
const STORAGE_SISTER_MODE = 'dallas_trip_user_mode';

export function getLocalUserMode() {
  return localStorage.getItem(STORAGE_SISTER_MODE) || 'eduardo';
}

export function setLocalUserMode(mode) {
  localStorage.setItem(STORAGE_SISTER_MODE, mode);
}

export function getStoredDays() {
  try {
    const raw = localStorage.getItem(STORAGE_DAYS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading local days:', e);
  }
  return INITIAL_DAYS;
}

export function saveStoredDays(days) {
  try {
    localStorage.setItem(STORAGE_DAYS_KEY, JSON.stringify(days));
  } catch (e) {
    console.error('Error saving local days:', e);
  }
}

export function getStoredBucket() {
  try {
    const raw = localStorage.getItem(STORAGE_BUCKET_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading local bucket:', e);
  }
  return INITIAL_BUCKET;
}

export function saveStoredBucket(bucket) {
  try {
    localStorage.setItem(STORAGE_BUCKET_KEY, JSON.stringify(bucket));
  } catch (e) {
    console.error('Error saving local bucket:', e);
  }
}

export async function fetchItineraryFromCloud() {
  try {
    const res = await fetch('/api/itinerary', { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.success && data.days && data.days.length > 0) {
      saveStoredDays(data.days);
      if (data.bucket) saveStoredBucket(data.bucket);
      return { days: data.days, bucket: data.bucket || [], isCloud: true };
    }
  } catch (err) {
    console.warn('Using local cached itinerary (Cloud not reachable or local dev):', err.message);
  }
  return { days: getStoredDays(), bucket: getStoredBucket(), isCloud: false };
}

export async function updateCloudSlot(dayId, slotType, content, notes) {
  try {
    const res = await fetch('/api/itinerary/update-slot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dayId, slotType, content, notes })
    });
    return res.ok;
  } catch (err) {
    console.warn('Cloud updateSlot failed, kept locally:', err.message);
    return false;
  }
}

export async function swapCloudSlots(sourceDayId, sourceSlot, targetDayId, targetSlot) {
  try {
    const res = await fetch('/api/itinerary/swap-slots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sourceDayId, sourceSlot, targetDayId, targetSlot })
    });
    return res.ok;
  } catch (err) {
    console.warn('Cloud swapSlots failed, kept locally:', err.message);
    return false;
  }
}

export async function saveCloudBucketItem(item) {
  try {
    const res = await fetch('/api/itinerary/bucket-item', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
    return res.ok;
  } catch (err) {
    console.warn('Cloud saveBucketItem failed, kept locally:', err.message);
    return false;
  }
}

export async function resetCloudItinerary() {
  try {
    const res = await fetch('/api/itinerary/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    return res.ok;
  } catch (err) {
    console.warn('Cloud reset failed:', err.message);
    return false;
  }
}
