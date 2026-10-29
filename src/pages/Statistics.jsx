/**
 * Statistics — Food tracking insights.
 * Shows session-derived stats when items exist.
 * Shows empty/unavailable state for metrics that cannot be derived from
 * a single in-memory session (historical charts, eco estimates).
 * Preserves all existing layout and glass effects.
 */
import { useEffect, useState } from 'react';
import { getFoodItem } from '../services/AllAPI';
import GlassCard from '../components/ui/GlassCard';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';
import StatusBadge from '../components/ui/StatusBadge';
import { computeStatus, daysUntilExpiry, formatDateShort } from '../utils/itemUtils';
import {
  Award,
  BarChart2,
  Clock,
  PlusCircle,
  TrendingUp,
} from 'lucide-react';

const categoryIcons = {
  Fruits: '🍎', Vegetables: '🥦', Dairy: '🧀', Meat: '🥩', Seafood: '🐟',
  Grains: '🌾', Beverages: '🥤', Snacks: '🍿', Frozen: '🧊',
  Condiments: '🫙', Bakery: '🍞', Other: '📦',
};

export default function Statistics() {
  const [items, setItems] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchItems = async () => {
    try {
      const apiResponse = await getFoodItem();

      if (apiResponse.status === 200) {
        setItems(apiResponse.data);
      }
    } catch (error) {
      console.error('Failed to fetch statistics data:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchItems();
}, []);

  const total = items.length;
  const fresh = items.filter((i) => computeStatus(i.expiryDate) === 'fresh').length;
  const expiring = items.filter((i) => computeStatus(i.expiryDate) === 'expiring').length;
  const expired = items.filter((i) => computeStatus(i.expiryDate) === 'expired').length;

  // Items expiring in the next 7 days (including already-expired)
  const urgentItems = items
    .map((i) => ({
      ...i,
      days: daysUntilExpiry(i.expiryDate),
      status: computeStatus(i.expiryDate),
    }))
    .filter((i) => i.days !== null && i.days <= 7)
    .sort((a, b) => a.days - b.days)
    .slice(0, 8);

  // Category counts for breakdown
  const categoryCounts = {};
  items.forEach((i) => {
    categoryCounts[i.category] = (categoryCounts[i.category] || 0) + 1;
  });
  const categoryRows = Object.entries(categoryCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6);

  const hasItems = total > 0;

  return (
    <div className="page-enter space-y-7 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-bark-800">
            Statistics
          </h1>
          <p className="text-bark-400 text-sm mt-0.5">
            {hasItems
              ? `Insights from your current inventory (${total} items)`
              : 'Add items to your inventory to see insights'}
          </p>
        </div>
      </div>

      {/* No items state */}
      {!hasItems && (
        <GlassCard accent glow className="p-8">
          <EmptyState
            icon="📊"
            title="No data yet"
            message="Statistics will appear here once you add food items to your inventory."
            action={
              <Button to="/add">
                <PlusCircle className="w-4 h-4" />
                Add Your First Item
              </Button>
            }
          />
        </GlassCard>
      )}

      {/* Headline metrics — only shown when items exist */}
      {hasItems && (
        <>
          {/* Status summary */}
          <section className="stagger-children grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              icon={<Award className="w-5 h-5 text-sage-500" />}
              label="Total Items"
              value={String(total)}
              sub="in inventory"
              color="sage"
            />
            <MetricCard
              icon={<TrendingUp className="w-5 h-5 text-sage-500" />}
              label="Fresh"
              value={String(fresh)}
              sub="good to use"
              color="sage"
            />
            <MetricCard
              icon={<Clock className="w-5 h-5 text-citrus-500" />}
              label="Expiring Soon"
              value={String(expiring)}
              sub="use within 3 days"
              color="citrus"
            />
            <MetricCard
              icon={<BarChart2 className="w-5 h-5 text-coral-500" />}
              label="Expired"
              value={String(expired)}
              sub="past best-before"
              color="coral"
            />
          </section>

          {/* Expiry Timeline */}
          {urgentItems.length > 0 && (
            <section>
              <GlassCard accent className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-bark-400" />
                  <h2 className="text-sm font-display font-semibold text-bark-700">
                    Expiring in the Next 7 Days
                  </h2>
                </div>
                <div className="space-y-2.5">
                  {urgentItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-2.5 rounded-xl transition-all"
                      style={{
                        background: item.status === 'expired'
                          ? 'rgba(255, 232, 224, 0.5)'
                          : item.days <= 2
                          ? 'rgba(255, 247, 214, 0.5)'
                          : 'rgba(255, 255, 255, 0.3)',
                        border: `1px solid ${
                          item.status === 'expired'
                            ? 'rgba(255,176,153,0.2)'
                            : item.days <= 2
                            ? 'rgba(255,210,74,0.2)'
                            : 'rgba(255,255,255,0.3)'
                        }`,
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)',
                      }}
                    >
                      <span className="text-lg">{categoryIcons[item.category] || '📦'}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-bark-700 truncate">{item.name}</p>
                        <p className="text-[10px] text-bark-400">{item.category}</p>
                      </div>
                      <StatusBadge status={item.status} />
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
                        style={{
                          background: item.status === 'expired'
                            ? 'rgba(255, 176, 153, 0.4)'
                            : 'rgba(255, 224, 122, 0.4)',
                          color: item.status === 'expired'
                            ? 'var(--color-coral-600)'
                            : 'var(--color-citrus-600)',
                          border: `1px solid ${
                            item.status === 'expired'
                              ? 'rgba(255,176,153,0.25)'
                              : 'rgba(255,210,74,0.25)'
                          }`,
                        }}
                      >
                        {item.days < 0
                          ? `${Math.abs(item.days)}d ago`
                          : item.days === 0
                          ? 'Today'
                          : `${item.days}d`}
                      </span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </section>
          )}

          {/* Category breakdown */}
          {categoryRows.length > 0 && (
            <section>
              <h2 className="text-lg font-display font-semibold text-bark-700 mb-4">
                Category Breakdown
              </h2>
              <GlassCard accent glow className="p-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  {categoryRows.map(([name, count]) => (
                    <div key={name} className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0"
                        style={{
                          background: 'rgba(255, 255, 255, 0.4)',
                          border: '1px solid rgba(255,255,255,0.4)',
                          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)',
                        }}
                      >
                        {categoryIcons[name] || '📦'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-bark-600">{name}</span>
                          <span className="text-[10px] text-bark-400">{count} item{count !== 1 ? 's' : ''}</span>
                        </div>
                        <div
                          className="h-1.5 rounded-full overflow-hidden"
                          style={{ background: 'rgba(221, 213, 200, 0.4)' }}
                        >
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${Math.round((count / total) * 100)}%`,
                              background: 'linear-gradient(90deg, var(--color-sage-400), var(--color-sage-500))',
                              boxShadow: '0 0 6px rgba(126,190,115,0.4)',
                            }}
                          />
                        </div>
                      </div>
                      <span
                        className="text-[10px] font-semibold w-8 text-right shrink-0 text-sage-600"
                      >
                        {Math.round((count / total) * 100)}%
                      </span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </section>
          )}

         
        </>
      )}
    </div>
  );
}

/** Metric summary card */
function MetricCard({ icon, label, value, sub, color }) {
  const colorMap = {
    sage: {
      iconBg: 'from-sage-100 to-sage-200/50',
      value: 'from-sage-600 to-sage-800',
      glow: 'rgba(168,213,162,0.12)',
    },
    citrus: {
      iconBg: 'from-citrus-100 to-citrus-200/50',
      value: 'from-citrus-600 to-citrus-700',
      glow: 'rgba(255,224,122,0.12)',
    },
    coral: {
      iconBg: 'from-coral-100 to-coral-200/50',
      value: 'from-coral-600 to-coral-800',
      glow: 'rgba(255,138,107,0.1)',
    },
    lavender: {
      iconBg: 'from-lavender-100 to-lavender-200/50',
      value: 'from-lavender-600 to-lavender-700',
      glow: 'rgba(194,173,255,0.12)',
    },
  };
  const c = colorMap[color] || colorMap.sage;

  return (
    <GlassCard hover accent glow className="p-5 relative overflow-hidden">
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 30% 20%, ${c.glow}, transparent 70%)` }}
      />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div
            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.iconBg} flex items-center justify-center relative overflow-hidden`}
            style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5), 0 2px 6px rgba(0,0,0,0.06)' }}
          >
            {icon}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)' }} />
          </div>
        </div>
        <p className="text-xs font-medium text-bark-400 uppercase tracking-wider mb-1">{label}</p>
        <p className={`text-2xl font-display font-bold bg-gradient-to-r ${c.value} bg-clip-text text-transparent`}>
          {value}
        </p>
        <p className="text-[10px] text-bark-300 mt-0.5">{sub}</p>
      </div>
    </GlassCard>
  );
}
