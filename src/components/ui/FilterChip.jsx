/**
 * FilterChip — Selectable filter pill with liquid glass effect.
 */
export default function FilterChip({ label, active = false, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium
        transition-all duration-250 press-effect whitespace-nowrap
      `}
      style={
        active
          ? {
              background: 'linear-gradient(135deg, rgba(92,163,80,0.9), rgba(70,125,60,0.9))',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.25)',
              boxShadow:
                '0 2px 8px rgba(92,163,80,0.2), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.05)',
            }
          : {
              background: 'rgba(255, 255, 255, 0.45)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              color: 'var(--color-bark-500)',
              border: '1px solid rgba(255, 255, 255, 0.45)',
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.4), 0 1px 3px rgba(0,0,0,0.03)',
            }
      }
    >
      {icon && <span className="text-sm">{icon}</span>}
      {label}
    </button>
  );
}
