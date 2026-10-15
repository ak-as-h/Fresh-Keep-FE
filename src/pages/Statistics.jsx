/**
 * Statistics — Food tracking insights, waste metrics, and usage trends.
 * Design-only page with sample data visualizations.
 */
import GlassCard from '../components/ui/GlassCard';
import {
  TrendingDown,
  TrendingUp,
  Leaf,
  ShoppingCart,
  Flame,
  Award,
  BarChart2,
  Calendar,
  Clock,
} from 'lucide-react';

/* ── Sample data ─────────────────────────────────────── */

const monthlyData = [
  { month: 'May', used: 18, expired: 6 },
  { month: 'Jun', used: 22, expired: 4 },
  { month: 'Jul', used: 19, expired: 7 },
  { month: 'Aug', used: 25, expired: 3 },
  { month: 'Sep', used: 28, expired: 2 },
  { month: 'Oct', used: 24, expired: 2 },
];

const categoryStats = [
  { name: 'Vegetables', icon: '🥦', used: 12, total: 15, color: 'var(--color-sage-400)', pct: 80 },
  { name: 'Dairy',      icon: '🧀', used: 8,  total: 10, color: 'var(--color-citrus-400)', pct: 80 },
  { name: 'Fruits',     icon: '🍎', used: 9,  total: 12, color: 'var(--color-coral-400)', pct: 75 },
  { name: 'Grains',     icon: '🌾', used: 6,  total: 7,  color: 'var(--color-lavender-400)', pct: 86 },
  { name: 'Meat',       icon: '🥩', used: 5,  total: 5,  color: 'var(--color-sage-500)', pct: 100 },
  { name: 'Beverages',  icon: '🥤', used: 4,  total: 6,  color: 'var(--color-bark-400)', pct: 67 },
];

const upcomingExpiryItems = [
  { name: 'Greek Yogurt',    days: 1, category: 'Dairy',    icon: '🧀', urgent: true },
  { name: 'Baby Spinach',    days: 2, category: 'Vegetables', icon: '🥦', urgent: true },
  { name: 'Chicken Breast',  days: 3, category: 'Meat',     icon: '🥩', urgent: true },
  { name: 'Almond Milk',     days: 5, category: 'Beverages', icon: '🥤', urgent: false },
  { name: 'Strawberries',    days: 6, category: 'Fruits',   icon: '🍓', urgent: false },
];

const achievements = [
  { icon: '🌍', label: 'Eco Saver',    desc: 'Used 90%+ of food this month',    unlocked: true },
  { icon: '🔥', label: 'On a Streak',  desc: '3-month waste reduction streak',  unlocked: true },
  { icon: '💰', label: 'Money Saver',  desc: 'Saved $50+ from spoilage',        unlocked: true },
  { icon: '🏆', label: 'Zero Waste',   desc: 'Zero expired items in one month', unlocked: false },
];

/* ── Helper: bar chart column ─────────────────────────── */
function BarColumn({ month, used, expired }) {
  const max = 32;
  const usedH = Math.round((used / max) * 100);
  const expiredH = Math.round((expired / max) * 100);

  return (
    <div className="flex flex-col items-center gap-1.5 flex-1">
      {/* Bars */}
      <div className="w-full flex items-end justify-center gap-0.5 h-20">
        <div
          className="w-3 rounded-t-md transition-all"
          style={{
            height: `${usedH}%`,
            background: 'linear-gradient(180deg, var(--color-sage-400), var(--color-sage-500))',
            boxShadow: '0 -2px 6px rgba(92,163,80,0.2)',
          }}
          title={`Used: ${used}`}
        />
        <div
          className="w-3 rounded-t-md transition-all"
          style={{
            height: `${expiredH}%`,
            background: 'linear-gradient(180deg, var(--color-coral-400), var(--color-coral-500))',
            boxShadow: '0 -2px 6px rgba(240,106,72,0.2)',
          }}
          title={`Expired: ${expired}`}
        />
      </div>
      {/* Label */}
      <span className="text-[10px] text-bark-400 font-medium">{month}</span>
    </div>
  );
}

/* ── Main page ─────────────────────────────────────────── */
export default function Statistics() {
  const totalUsed    = monthlyData.reduce((s, d) => s + d.used, 0);
  const totalExpired = monthlyData.reduce((s, d) => s + d.expired, 0);
  const total        = totalUsed + totalExpired;
  const successRate  = Math.round((totalUsed / total) * 100);
  const savedEstimate = (totalUsed * 2.8).toFixed(0);       // ~$2.8 avg cost per item
  const co2Saved      = (totalUsed * 0.24).toFixed(1);      // ~0.24 kg CO₂ per item

  return (
    <div className="page-enter space-y-7 pb-8">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-bark-800">
            Statistics
          </h1>
          <p className="text-bark-400 text-sm mt-0.5">
            Your food tracking insights over the last 6 months
          </p>
        </div>
        <div
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium text-sage-700"
          style={{
            background: 'rgba(228, 240, 223, 0.6)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(168, 213, 162, 0.3)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5)',
          }}
        >
          <Calendar className="w-3.5 h-3.5 text-sage-500" />
          May – Oct 2026
        </div>
      </div>

      {/* ── Headline metrics ── */}
      <section className="stagger-children grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={<Award className="w-5 h-5 text-sage-500" />}
          label="Success Rate"
          value={`${successRate}%`}
          sub="items used before expiry"
          trend="up"
          color="sage"
        />
        <MetricCard
          icon={<ShoppingCart className="w-5 h-5 text-citrus-500" />}
          label="Money Saved"
          value={`$${savedEstimate}`}
          sub="prevented spoilage loss"
          trend="up"
          color="citrus"
        />
        <MetricCard
          icon={<Leaf className="w-5 h-5 text-sage-500" />}
          label="CO₂ Avoided"
          value={`${co2Saved} kg`}
          sub="food waste emissions"
          trend="up"
          color="sage"
        />
        <MetricCard
          icon={<Flame className="w-5 h-5 text-coral-500" />}
          label="Items Expired"
          value={totalExpired}
          sub="across all categories"
          trend="down"
          color="coral"
        />
      </section>

      {/* ── Chart + Expiry Timeline ── */}
      <section className="grid md:grid-cols-5 gap-4">
        {/* Bar chart — 3 cols */}
        <GlassCard accent glow className="md:col-span-3 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-bark-400" />
              <h2 className="text-sm font-display font-semibold text-bark-700">
                Monthly Usage vs Waste
              </h2>
            </div>
            {/* Legend */}
            <div className="flex items-center gap-3 text-[10px] text-bark-400">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: 'var(--color-sage-400)' }} />
                Used
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: 'var(--color-coral-400)' }} />
                Expired
              </span>
            </div>
          </div>

          {/* Chart */}
          <div className="flex items-end gap-2 px-2">
            {monthlyData.map((d) => (
              <BarColumn key={d.month} {...d} />
            ))}
          </div>

          {/* Summary row */}
          <div className="mt-4 pt-4 glass-divider" />
          <div className="mt-3 flex items-center justify-between text-xs text-bark-400">
            <span>{totalUsed} items used</span>
            <span className="text-sage-600 font-medium flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5" />
              Waste down 67% vs May
            </span>
          </div>
        </GlassCard>

        {/* Expiry countdown — 2 cols */}
        <GlassCard accent className="md:col-span-2 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-bark-400" />
            <h2 className="text-sm font-display font-semibold text-bark-700">
              Expiring Soon
            </h2>
          </div>
          <div className="space-y-2.5">
            {upcomingExpiryItems.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-3 p-2.5 rounded-xl transition-all"
                style={{
                  background: item.urgent
                    ? 'rgba(255, 247, 214, 0.5)'
                    : 'rgba(255, 255, 255, 0.3)',
                  border: `1px solid ${item.urgent ? 'rgba(255,210,74,0.2)' : 'rgba(255,255,255,0.3)'}`,
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)',
                }}
              >
                <span className="text-lg">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-bark-700 truncate">{item.name}</p>
                  <p className="text-[10px] text-bark-400">{item.category}</p>
                </div>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
                  style={{
                    background: item.urgent
                      ? 'rgba(255, 224, 122, 0.4)'
                      : 'rgba(228, 240, 223, 0.4)',
                    color: item.urgent ? 'var(--color-citrus-600)' : 'var(--color-sage-600)',
                    border: `1px solid ${item.urgent ? 'rgba(255,210,74,0.25)' : 'rgba(168,213,162,0.25)'}`,
                  }}
                >
                  {item.days}d
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>

      {/* ── Category Breakdown ── */}
      <section>
        <h2 className="text-lg font-display font-semibold text-bark-700 mb-4">
          Category Performance
        </h2>
        <GlassCard accent glow className="p-5">
          <div className="grid sm:grid-cols-2 gap-4">
            {categoryStats.map((cat) => (
              <div key={cat.name} className="flex items-center gap-3">
                {/* Icon */}
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0"
                  style={{
                    background: 'rgba(255, 255, 255, 0.4)',
                    border: '1px solid rgba(255,255,255,0.4)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)',
                  }}
                >
                  {cat.icon}
                </div>

                {/* Bar + labels */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-bark-600">{cat.name}</span>
                    <span className="text-[10px] text-bark-400">{cat.used}/{cat.total}</span>
                  </div>
                  {/* Track */}
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ background: 'rgba(221, 213, 200, 0.4)' }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${cat.pct}%`,
                        background: `linear-gradient(90deg, ${cat.color}cc, ${cat.color})`,
                        boxShadow: `0 0 6px ${cat.color}66`,
                      }}
                    />
                  </div>
                </div>

                {/* Pct */}
                <span
                  className="text-[10px] font-semibold w-8 text-right shrink-0"
                  style={{ color: cat.color }}
                >
                  {cat.pct}%
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>

      {/* ── Achievements ── */}
      <section>
        <h2 className="text-lg font-display font-semibold text-bark-700 mb-4">
          Achievements
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((a) => (
            <GlassCard
              key={a.label}
              hover
              accent={a.unlocked}
              className="p-4 text-center"
              style={!a.unlocked ? { opacity: 0.45, filter: 'grayscale(0.6)' } : {}}
            >
              <div
                className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center text-2xl relative overflow-hidden"
                style={{
                  background: a.unlocked
                    ? 'linear-gradient(135deg, rgba(255,249,232,0.8), rgba(228,240,223,0.6))'
                    : 'rgba(240,235,228,0.4)',
                  border: '1px solid rgba(255,255,255,0.4)',
                  boxShadow: a.unlocked
                    ? 'inset 0 1px 0 rgba(255,255,255,0.6), 0 4px 12px rgba(92,163,80,0.1)'
                    : 'inset 0 1px 0 rgba(255,255,255,0.3)',
                }}
              >
                {a.icon}
                {a.unlocked && (
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)' }}
                  />
                )}
              </div>
              <p className="text-xs font-display font-bold text-bark-700 mb-0.5">{a.label}</p>
              <p className="text-[10px] text-bark-400 leading-tight">{a.desc}</p>
              {!a.unlocked && (
                <p className="text-[9px] text-bark-300 mt-2 uppercase tracking-wider">Locked</p>
              )}
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ── Eco Impact Banner ── */}
      <section>
        <GlassCard strong glow reflection className="p-6 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse at 15% 50%, rgba(168,213,162,0.15), transparent 60%),
                radial-gradient(ellipse at 85% 50%, rgba(194,173,255,0.08), transparent 50%)
              `,
            }}
          />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="text-5xl">🌍</div>
            <div className="flex-1">
              <h3 className="text-lg font-display font-bold text-bark-800 mb-1">
                Your Environmental Impact
              </h3>
              <p className="text-sm text-bark-500 leading-relaxed">
                By using FreshKeep this month you prevented <strong className="text-sage-600">{co2Saved} kg of CO₂</strong> emissions
                and saved an estimated <strong className="text-sage-600">${savedEstimate}</strong> in food costs.
                That's equivalent to not driving <strong className="text-sage-600">{(parseFloat(co2Saved) * 4).toFixed(0)} km</strong>.
              </p>
            </div>
            <div className="flex gap-4 sm:flex-col sm:gap-2 sm:text-right shrink-0">
              <div>
                <p className="text-2xl font-display font-bold text-sage-600">{successRate}%</p>
                <p className="text-[10px] text-bark-400 uppercase tracking-wider">success rate</p>
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-sage-600 flex items-center gap-1">
                  <TrendingUp className="w-5 h-5" />↑
                </p>
                <p className="text-[10px] text-bark-400 uppercase tracking-wider">improving</p>
              </div>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}

/* ── Metric Card ── */
function MetricCard({ icon, label, value, sub, trend, color }) {
  const colorMap = {
    sage:    { iconBg: 'from-sage-100 to-sage-200/50',       value: 'from-sage-600 to-sage-800',    glow: 'rgba(168,213,162,0.12)' },
    citrus:  { iconBg: 'from-citrus-100 to-citrus-200/50',   value: 'from-citrus-600 to-citrus-700', glow: 'rgba(255,224,122,0.12)' },
    coral:   { iconBg: 'from-coral-100 to-coral-200/50',     value: 'from-coral-600 to-coral-800',   glow: 'rgba(255,138,107,0.1)' },
    lavender:{ iconBg: 'from-lavender-100 to-lavender-200/50', value: 'from-lavender-600 to-lavender-700', glow: 'rgba(194,173,255,0.12)' },
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
          {trend === 'up'
            ? <TrendingUp className="w-4 h-4 text-sage-400 opacity-60" />
            : <TrendingDown className="w-4 h-4 text-coral-400 opacity-60" />
          }
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
