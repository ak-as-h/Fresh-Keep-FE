/**
 * CategoryBreakdown — Visual category overview for the dashboard.
 * Shows category icons with liquid glass tile effects.
 * Accepts an optional `items` array to show live item counts per category.
 */
import { Link } from 'react-router-dom';
import GlassCard from './GlassCard';

const categories = [
  { name: 'Fruits', icon: '🍎', glowColor: 'rgba(255, 138, 107, 0.12)' },
  { name: 'Vegetables', icon: '🥦', glowColor: 'rgba(168, 213, 162, 0.12)' },
  { name: 'Dairy', icon: '🧀', glowColor: 'rgba(255, 224, 122, 0.12)' },
  { name: 'Meat', icon: '🥩', glowColor: 'rgba(255, 138, 107, 0.12)' },
  { name: 'Grains', icon: '🌾', glowColor: 'rgba(255, 234, 179, 0.12)' },
  { name: 'Beverages', icon: '🥤', glowColor: 'rgba(194, 173, 255, 0.12)' },
  { name: 'Snacks', icon: '🍿', glowColor: 'rgba(255, 224, 122, 0.12)' },
  { name: 'Bakery', icon: '🍞', glowColor: 'rgba(255, 234, 179, 0.15)' },
  { name: 'Frozen', icon: '🧊', glowColor: 'rgba(194, 173, 255, 0.12)' },
  { name: 'Condiments', icon: '🫙', glowColor: 'rgba(168, 213, 162, 0.12)' },
  { name: 'Seafood', icon: '🐟', glowColor: 'rgba(194, 173, 255, 0.12)' },
  { name: 'Other', icon: '📦', glowColor: 'rgba(221, 213, 200, 0.12)' },
];

export default function CategoryBreakdown({ items = [] }) {
  // Build a count map from actual items
  const counts = {};
  items.forEach((item) => {
    counts[item.category] = (counts[item.category] || 0) + 1;
  });

  return (
    <GlassCard className="p-5" accent glow>
      <h3 className="text-sm font-display font-semibold text-bark-700 mb-4">
        Categories
      </h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {categories.map(({ name, icon, glowColor }) => {
          const count = counts[name] || 0;
          return (
            <Link
              key={name}
              to={`/inventory?category=${encodeURIComponent(name)}`}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all duration-200 press-effect group"
              style={{
                background: 'rgba(255, 255, 255, 0.25)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)',
                textDecoration: 'none',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.45)';
                e.currentTarget.style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.5), 0 4px 16px ${glowColor}`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.3)';
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform relative overflow-hidden"
                style={{
                  background: `radial-gradient(circle, ${glowColor.replace('0.12', '0.35')}, rgba(255,249,232,0.2))`,
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)',
                }}
              >
                {icon}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%)',
                  }}
                />
              </div>
              <span className="text-[10px] font-medium text-bark-500 leading-tight text-center">
                {name}
              </span>
              <span className="text-[10px] text-bark-300">
                {count > 0 ? `${count} item${count !== 1 ? 's' : ''}` : '—'}
              </span>
            </Link>
          );
        })}
      </div>
    </GlassCard>
  );
}
