/**
 * SummaryCard — Dashboard summary metric card with icon, label, and value.
 * Features enhanced liquid-glass with luminous border glow and reflection.
 */
import GlassCard from './GlassCard';

export default function SummaryCard({
  icon,
  label,
  value,
  color = 'sage',
  accentEmoji,
}) {
  const colorMap = {
    sage: {
      iconBg: 'from-sage-100 to-sage-200/60',
      iconText: 'text-sage-600',
      valueBg: 'from-sage-600 to-sage-800',
      glowColor: 'rgba(168, 213, 162, 0.15)',
    },
    citrus: {
      iconBg: 'from-citrus-100 to-citrus-200/60',
      iconText: 'text-citrus-600',
      valueBg: 'from-citrus-600 to-citrus-700',
      glowColor: 'rgba(255, 224, 122, 0.15)',
    },
    coral: {
      iconBg: 'from-coral-100 to-coral-200/60',
      iconText: 'text-coral-600',
      valueBg: 'from-coral-600 to-coral-800',
      glowColor: 'rgba(255, 138, 107, 0.12)',
    },
    lavender: {
      iconBg: 'from-lavender-100 to-lavender-200/60',
      iconText: 'text-lavender-600',
      valueBg: 'from-lavender-600 to-lavender-700',
      glowColor: 'rgba(194, 173, 255, 0.15)',
    },
  };

  const colors = colorMap[color] || colorMap.sage;

  return (
    <GlassCard hover accent glow className="p-5 relative overflow-hidden">
      {/* Subtle per-card color glow overlay */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, ${colors.glowColor}, transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div
            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colors.iconBg} flex items-center justify-center relative overflow-hidden`}
            style={{
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5), 0 2px 6px rgba(0,0,0,0.06)',
            }}
          >
            {icon}
            {/* Tiny glass shine on icon container */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)',
              }}
            />
          </div>
          {accentEmoji && (
            <span className="text-2xl opacity-15">{accentEmoji}</span>
          )}
        </div>
        <p className="text-xs font-medium text-bark-400 uppercase tracking-wider mb-1">
          {label}
        </p>
        <p className={`text-2xl font-display font-bold bg-gradient-to-r ${colors.valueBg} bg-clip-text text-transparent`}>
          {value}
        </p>
      </div>
    </GlassCard>
  );
}
