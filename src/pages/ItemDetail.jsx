/**
 * ItemDetail — Detailed view of a single food item from React state.
 * Actions: Edit navigates to /add?edit=id, Delete shows confirmation modal.
 * Preserves all existing layout, cards, badges, and glass effects.
 */
import { useState,useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getSingleFoodItem,deleteFoodItem } from '../services/AllAPI';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Tag,
  Pencil,
  Trash2,
  Clock,
  StickyNote,
  Package,
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import StatusBadge from '../components/ui/StatusBadge';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import EmptyState from '../components/ui/EmptyState';
import {
  computeStatus,
  daysUntilExpiry,
  formatDateDisplay,
  categoryEmoji,
} from '../utils/itemUtils';

/** Status → banner gradient colours */
const bannerGradients = {
  fresh: 'linear-gradient(90deg, var(--color-sage-400), var(--color-sage-300))',
  expiring: 'linear-gradient(90deg, var(--color-citrus-400), var(--color-citrus-300))',
  expired: 'linear-gradient(90deg, var(--color-coral-400), var(--color-coral-300))',
};

/** Countdown colours by status */
const countdownColors = {
  fresh: {
    bg: 'rgba(228, 240, 223, 0.6)',
    border: 'rgba(168, 213, 162, 0.25)',
    shadow: 'rgba(168, 213, 162, 0.1)',
    icon: 'text-sage-600',
    text: 'text-sage-600',
  },
  expiring: {
    bg: 'rgba(255, 247, 214, 0.6)',
    border: 'rgba(255, 224, 122, 0.25)',
    shadow: 'rgba(255, 210, 74, 0.1)',
    icon: 'text-citrus-600',
    text: 'text-citrus-600',
  },
  expired: {
    bg: 'rgba(255, 232, 224, 0.6)',
    border: 'rgba(255, 176, 153, 0.25)',
    shadow: 'rgba(255, 138, 107, 0.1)',
    icon: 'text-coral-600',
    text: 'text-coral-600',
  },
};

export default function ItemDetail() {
  const { id } = useParams();
const navigate = useNavigate();

const [item, setItem] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(false);
const [showDeleteModal, setShowDeleteModal] = useState(false);

  


useEffect(() => {
  const fetchItem = async () => {
    try {
      setLoading(true);
      setError(false);

      console.log('Fetching item ID:', id);

      const response = await getSingleFoodItem(id);

      console.log('Fetched item:', response.data);

      setItem(response.data);
    } catch (err) {
      console.error('Failed to fetch item details:', err);
      setError(true);
      setItem(null);
    } finally {
      setLoading(false);
    }
  };

  fetchItem();
}, [id]);

// Loading state
if (loading) {
  return (
    <div className="page-enter max-w-2xl mx-auto p-8 text-center">
      Loading item details...
    </div>
  );
}

// Error or missing item
if (error || !item) {
  return (
    <div className="page-enter max-w-2xl mx-auto space-y-6 pb-8">
      <Link
        to="/inventory"
        className="inline-flex items-center gap-1.5 text-sm text-bark-400 hover:text-sage-600"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Inventory
      </Link>

      <GlassCard className="p-8">
        <EmptyState
          icon="🔍"
          title="Item not found"
          message="This item may have been deleted, or the API request failed."
          action={<Button to="/inventory">Go to Inventory</Button>}
        />
      </GlassCard>
    </div>
  );
}
  const status = computeStatus(item.expiryDate);
  const days = daysUntilExpiry(item.expiryDate);
  const cdColors = countdownColors[status] || countdownColors.fresh;
  const emoji = categoryEmoji(item.category);

  function countdownLabel() {
    if (days === null) return 'No expiry date';
    if (days < 0) return `Expired ${Math.abs(days)} day${Math.abs(days) !== 1 ? 's' : ''} ago`;
    if (days === 0) return 'Expires today';
    return `Expires in ${days} day${days !== 1 ? 's' : ''}`;
  }

  async function handleDeleteConfirm() {
  try {
    await deleteFoodItem(id);
    navigate('/inventory');
  } catch (error) {
    console.error('Failed to delete food item:', error);
  }
}

  return (
    <div className="page-enter max-w-2xl mx-auto space-y-6 pb-8">
      {/* Back link */}
      <Link
        to="/inventory"
        className="inline-flex items-center gap-1.5 text-sm text-bark-400 hover:text-sage-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Inventory
      </Link>

      {/* Main detail card */}
      <GlassCard strong accent glow className="overflow-hidden">
        {/* Top status banner */}
        <div className="h-2 relative overflow-hidden" style={{ background: bannerGradients[status] }}>
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 3s linear infinite',
          }} />
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header row */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-cream-100 flex items-center justify-center text-3xl shrink-0 shadow-soft">
              {emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h1 className="text-xl sm:text-2xl font-display font-bold text-bark-800">
                    {item.itemname}
                  </h1>
                  <p className="text-sm text-bark-400 mt-0.5">{item.category}</p>
                </div>
                <StatusBadge status={status} size="lg" />
              </div>
            </div>
          </div>

          {/* Expiry countdown */}
          <div
            className="glass-panel glass-accent rounded-xl p-4 flex items-center gap-3"
            style={{ background: cdColors.bg }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center relative overflow-hidden shrink-0"
              style={{
                background: cdColors.bg,
                backdropFilter: 'blur(6px)',
                border: `1px solid ${cdColors.border}`,
                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.5), 0 2px 8px ${cdColors.shadow}`,
              }}
            >
              <Clock className={`w-6 h-6 ${cdColors.icon} relative z-10`} />
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)',
              }} />
            </div>
            <div>
              <p className="text-sm font-medium text-bark-600">
                <span className={`font-display font-bold text-lg ${cdColors.text}`}>
                  {countdownLabel()}
                </span>
              </p>
              <p className="text-xs text-bark-400">
                Best before {formatDateDisplay(item.expiryDate)}
              </p>
            </div>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-4">
            <DetailInfoItem
              icon={<Package className="w-4 h-4 text-sage-500" />}
              label="Quantity"
              value={`${item.quantity} ${item.unit}`}
            />
            <DetailInfoItem
              icon={<MapPin className="w-4 h-4 text-lavender-500" />}
              label="Location"
              value={item.location || '—'}
            />
            <DetailInfoItem
              icon={<Calendar className="w-4 h-4 text-bark-400" />}
              label="Purchased"
              value={formatDateDisplay(item.purchaseDate)}
            />
            <DetailInfoItem
              icon={<Calendar className="w-4 h-4 text-coral-400" />}
              label="Expires"
              value={formatDateDisplay(item.expiryDate)}
            />
            <DetailInfoItem
              icon={<Tag className="w-4 h-4 text-citrus-500" />}
              label="Category"
              value={item.category}
            />
          </div>

          {/* Notes */}
          {item.notes && (
            <div className="glass-panel glass-accent rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <StickyNote className="w-4 h-4 text-bark-400" />
                <span className="text-xs font-medium text-bark-500 uppercase tracking-wider">Notes</span>
              </div>
              <p className="text-sm text-bark-600 leading-relaxed">{item.notes}</p>
            </div>
          )}

          {/* Divider */}
          <div className="glass-divider" />

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <Button to={`/add?edit=${id}`} variant="secondary">
              <Pencil className="w-4 h-4" />
              Edit Item
            </Button>
            <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </div>
      </GlassCard>

      {/* Delete confirmation modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Item"
        size="sm"
      >
        <div className="space-y-5">
          <div className="text-center">
            <div className="text-4xl mb-3">🗑️</div>
            <p className="text-sm text-bark-600 leading-relaxed">
              Are you sure you want to delete{' '}
              <span className="font-semibold text-bark-800">{item.itemname}</span>?
              This action cannot be undone.
            </p>
          </div>
          <div className="flex gap-3 justify-end">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleDeleteConfirm}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

/** Small detail info block — identical to original design */
function DetailInfoItem({ icon, label, value }) {
  return (
    <div
      className="flex items-start gap-2.5 p-3 rounded-xl"
      style={{
        background: 'rgba(255, 253, 247, 0.45)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        border: '1px solid rgba(255, 255, 255, 0.35)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4), 0 1px 3px rgba(0,0,0,0.03)',
      }}
    >
      <div className="mt-0.5">{icon}</div>
      <div>
        <p className="text-[10px] font-medium text-bark-400 uppercase tracking-wider">{label}</p>
        <p className="text-sm font-medium text-bark-700">{value}</p>
      </div>
    </div>
  );
}
