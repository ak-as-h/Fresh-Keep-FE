/**
 * StatusBadge — Visual badge for expiry status with glass depth.
 *
 * @param {'fresh' | 'expiring' | 'expired' | 'used'} status
 */

const statusConfig = {
  fresh: {
    label: 'Fresh',
    bg: 'rgba(228, 240, 223, 0.65)',
    text: 'var(--color-sage-700)',
    dot: 'var(--color-sage-400)',
    border: 'rgba(168, 213, 162, 0.3)',
    icon: '✓',
  },
  expiring: {
    label: 'Expiring Soon',
    bg: 'rgba(255, 247, 214, 0.65)',
    text: 'var(--color-citrus-600)',
    dot: 'var(--color-citrus-500)',
    border: 'rgba(255, 224, 122, 0.3)',
    icon: '⚠',
    urgent: true,
  },
  expired: {
    label: 'Expired',
    bg: 'rgba(255, 232, 224, 0.65)',
    text: 'var(--color-coral-700)',
    dot: 'var(--color-coral-500)',
    border: 'rgba(255, 176, 153, 0.3)',
    icon: '✕',
    urgent: true,
  },
  used: {
    label: 'Used',
    bg: 'rgba(240, 235, 228, 0.65)',
    text: 'var(--color-bark-500)',
    dot: 'var(--color-bark-400)',
    border: 'rgba(221, 213, 200, 0.3)',
    icon: '✓',
  },
};

export default function StatusBadge({ status = 'fresh', size = 'sm' }) {
  const config = statusConfig[status] || statusConfig.fresh;
  const sizeClasses = size === 'lg' ? 'px-3 py-1.5 text-sm' : 'px-2 py-0.5 text-xs';

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full font-medium
        ${sizeClasses}
        ${config.urgent ? 'badge-urgent' : ''}
      `}
      style={{
        background: config.bg,
        color: config.text,
        border: `1px solid ${config.border}`,
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)',
      }}
      role="status"
      aria-label={`Status: ${config.label}`}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: config.dot }}
        aria-hidden="true"
      />
      <span>{config.label}</span>
    </span>
  );
}
