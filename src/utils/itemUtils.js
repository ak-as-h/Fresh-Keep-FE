/**
 * itemUtils.js — shared helpers for food item data.
 * All date comparisons use date-only strings to avoid timezone off-by-one errors.
 */

/**
 * Parse a date-only string "YYYY-MM-DD" into a local midnight Date object,
 * avoiding UTC-offset issues that arise with `new Date("YYYY-MM-DD")`.
 */
export function parseDateLocal(dateStr) {
  if (!dateStr) return null;
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Return today as a local midnight Date (no time component).
 */
export function todayLocal() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

/**
 * Compute the number of calendar days between today (midnight) and a given
 * expiry date string "YYYY-MM-DD". Negative = already past.
 */
export function daysUntilExpiry(expiryDateStr) {
  if (!expiryDateStr) return null;
  const expiry = parseDateLocal(expiryDateStr);
  const today = todayLocal();
  const diffMs = expiry - today;
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Derive a non-stale expiry status from the item's expiryDate field.
 *
 * @param {string} expiryDateStr  "YYYY-MM-DD"
 * @returns {'fresh' | 'expiring' | 'expired'}
 */
export function computeStatus(expiryDateStr) {
  const days = daysUntilExpiry(expiryDateStr);
  if (days === null) return 'fresh';
  if (days < 0) return 'expired';
  if (days <= 3) return 'expiring';
  return 'fresh';
}

/**
 * Format a "YYYY-MM-DD" string into a human-readable "Mon DD, YYYY" string.
 * Returns "—" if the value is falsy.
 */
export function formatDateDisplay(dateStr) {
  if (!dateStr) return '—';
  const d = parseDateLocal(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/**
 * Format a "YYYY-MM-DD" string into a short "Mon DD" string (for inventory cards).
 */
export function formatDateShort(dateStr) {
  if (!dateStr) return '—';
  const d = parseDateLocal(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/** Return today's date as "YYYY-MM-DD" (for date input default values). */
export function todayIso() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

const CATEGORY_ICONS = {
  Fruits: '🍎',
  Vegetables: '🥦',
  Dairy: '🧀',
  Meat: '🥩',
  Seafood: '🐟',
  Grains: '🌾',
  Beverages: '🥤',
  Snacks: '🍿',
  Frozen: '🧊',
  Condiments: '🫙',
  Bakery: '🍞',
  Other: '📦',
};

export function categoryEmoji(category) {
  return CATEGORY_ICONS[category] || '📦';
}
