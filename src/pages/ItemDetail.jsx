/**
 * ItemDetail — Detailed view of a single food item.
 * Design-only layout showing how item information, expiry status, and actions will appear.
 */
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Tag,
  DollarSign,
  Pencil,
  Trash2,
  CheckCircle2,
  Clock,
  StickyNote,
  Package,
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import StatusBadge from '../components/ui/StatusBadge';
import Button from '../components/ui/Button';

export default function ItemDetail() {
  /* Static design data — not real item data */
  const item = {
    name: 'Organic Whole Milk',
    category: 'Dairy',
    emoji: '🧀',
    quantity: 1,
    unit: 'gallon',
    location: 'Fridge',
    purchaseDate: 'Oct 10, 2026',
    expiryDate: 'Oct 18, 2026',
    status: 'expiring',
    price: '$5.99',
    notes: 'From the local farmers market. Keep refrigerated.',
    daysUntilExpiry: 4,
  };

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
        {/* Top banner with status color */}
        <div className="h-2 relative overflow-hidden" style={{
          background: 'linear-gradient(90deg, var(--color-citrus-400), var(--color-citrus-300))',
        }}>
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
              {item.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h1 className="text-xl sm:text-2xl font-display font-bold text-bark-800">
                    {item.name}
                  </h1>
                  <p className="text-sm text-bark-400 mt-0.5">{item.category}</p>
                </div>
                <StatusBadge status={item.status} size="lg" />
              </div>
            </div>
          </div>

          {/* Expiry countdown */}
          <div className="glass-panel glass-accent rounded-xl p-4 flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center relative overflow-hidden"
              style={{
                background: 'rgba(255, 247, 214, 0.6)',
                backdropFilter: 'blur(6px)',
                border: '1px solid rgba(255, 224, 122, 0.25)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5), 0 2px 8px rgba(255,210,74,0.1)',
              }}
            >
              <Clock className="w-6 h-6 text-citrus-600 relative z-10" />
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)',
              }} />
            </div>
            <div>
              <p className="text-sm font-medium text-bark-600">
                Expires in <span className="text-citrus-600 font-display font-bold text-lg">{item.daysUntilExpiry} days</span>
              </p>
              <p className="text-xs text-bark-400">Use before {item.expiryDate}</p>
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
              value={item.location}
            />
            <DetailInfoItem
              icon={<Calendar className="w-4 h-4 text-bark-400" />}
              label="Purchased"
              value={item.purchaseDate}
            />
            <DetailInfoItem
              icon={<Calendar className="w-4 h-4 text-coral-400" />}
              label="Expires"
              value={item.expiryDate}
            />
            <DetailInfoItem
              icon={<Tag className="w-4 h-4 text-citrus-500" />}
              label="Category"
              value={item.category}
            />
            <DetailInfoItem
              icon={<DollarSign className="w-4 h-4 text-sage-500" />}
              label="Price"
              value={item.price}
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
            <Button>
              <CheckCircle2 className="w-4 h-4" />
              Mark as Used
            </Button>
            <Button variant="secondary" to="/add">
              <Pencil className="w-4 h-4" />
              Edit Item
            </Button>
            <Button variant="danger">
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>

          {/* Design note */}
          <p className="text-[10px] text-bark-300 text-center">
            Design preview · Actions will be connected to real functionality
          </p>
        </div>
      </GlassCard>
    </div>
  );
}

/** Small detail info block */
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
