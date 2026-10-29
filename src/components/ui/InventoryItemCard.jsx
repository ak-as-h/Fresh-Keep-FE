/**
 * InventoryItemCard — Card showing a food item in the inventory grid.
 * Buttons now perform real actions: navigate to edit, open delete confirmation.
 * Enhanced with liquid glass depth effects.
 */
import { Link, useNavigate } from 'react-router-dom';
import { Pencil, Trash2, CheckCircle2 } from 'lucide-react';
import GlassCard from './GlassCard';
import StatusBadge from './StatusBadge';
import { computeStatus, formatDateShort } from '../../utils/itemUtils';

const categoryIcons = {
  'Fruits': '🍎',
  'Vegetables': '🥦',
  'Dairy': '🧀',
  'Meat': '🥩',
  'Seafood': '🐟',
  'Grains': '🌾',
  'Beverages': '🥤',
  'Snacks': '🍿',
  'Frozen': '🧊',
  'Condiments': '🫙',
  'Bakery': '🍞',
  'Other': '📦',
};

export default function InventoryItemCard({ item, onDelete }) {
  const navigate = useNavigate();
  const {
    id,
    name,
    category,
    quantity,
    unit,
    location,
    expiryDate,
  } = item;

  const status = computeStatus(expiryDate);
  const displayDate = formatDateShort(expiryDate);
  const emoji = categoryIcons[category] || '📦';

  const locationColors = {
    Pantry: {
      bg: 'rgba(255, 247, 214, 0.6)',
      text: 'var(--color-citrus-600)',
      border: 'rgba(255, 224, 122, 0.3)',
    },
    Fridge: {
      bg: 'rgba(237, 230, 255, 0.6)',
      text: 'var(--color-lavender-600)',
      border: 'rgba(194, 173, 255, 0.3)',
    },
    Freezer: {
      bg: 'rgba(228, 240, 223, 0.6)',
      text: 'var(--color-sage-600)',
      border: 'rgba(168, 213, 162, 0.3)',
    },
  };

  const locStyle = locationColors[location] || {
    bg: 'rgba(240, 235, 228, 0.6)',
    text: 'var(--color-bark-500)',
    border: 'rgba(221, 213, 200, 0.3)',
  };

  return (
    <GlassCard hover accent className="p-4 flex flex-col gap-3 group">
      {/* Top row: icon + info */}
      <div className="flex items-start gap-3">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 relative overflow-hidden"
          style={{
            background: 'rgba(255, 249, 232, 0.6)',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5), 0 1px 4px rgba(0,0,0,0.04)',
          }}
        >
          {emoji}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)',
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <Link
            to={`/item/${id}`}
            className="text-sm font-semibold text-bark-800 hover:text-sage-600 transition-colors truncate block"
          >
            {name}
          </Link>
          <p className="text-xs text-bark-400 mt-0.5">{category}</p>
        </div>
        <StatusBadge status={status} />
      </div>

      {/* Details row */}
      <div className="flex items-center gap-3 text-xs text-bark-500">
        <span className="flex items-center gap-1">
          <span className="font-medium">{quantity}</span> {unit}
        </span>
        <span className="w-px h-3 bg-bark-200/50" />
        <span
          className="px-2 py-0.5 rounded-full text-[10px] font-medium"
          style={{
            background: locStyle.bg,
            color: locStyle.text,
            border: `1px solid ${locStyle.border}`,
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)',
          }}
        >
          {location}
        </span>
        <span className="w-px h-3 bg-bark-200/50" />
        <span>{displayDate}</span>
      </div>

      {/* Action buttons — now functional */}
      <div className="flex items-center gap-1.5 pt-1 border-t border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs text-sage-600 hover:bg-sage-50/60 transition-colors"
          aria-label={`Edit ${name}`}
          title="Edit"
          onClick={() => navigate(`/add?edit=${id}`)}
        >
          <Pencil className="w-3.5 h-3.5" />
          <span>Edit</span>
        </button>
        <button
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs text-coral-500 hover:bg-coral-50/60 transition-colors ml-auto"
          aria-label={`Delete ${name}`}
          title="Delete"
          onClick={() => onDelete && onDelete(id, name)}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </GlassCard>
  );
}
