import { Link } from 'react-router-dom';

/**
 * Button — Primary button component with liquid glass-enhanced variants.
 *
 * @param {'primary' | 'secondary' | 'ghost' | 'danger'} variant
 * @param {'sm' | 'md' | 'lg'} size
 * @param {string} to - If provided, renders as a Link
 * @param {boolean} disabled
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  to,
  disabled = false,
  children,
  className = '',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-250 press-effect focus-visible:outline-2 focus-visible:outline-sage-400 focus-visible:outline-offset-2 relative overflow-hidden';

  const variants = {
    primary:
      'bg-gradient-to-r from-sage-500 to-sage-600 text-white shadow-md hover:shadow-lg hover:from-sage-400 hover:to-sage-500 active:from-sage-600 active:to-sage-700',
    secondary:
      'text-bark-700',
    ghost:
      'bg-transparent text-bark-500 hover:text-bark-700',
    danger:
      'text-coral-700',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3 text-base',
  };

  const disabledClass = disabled
    ? 'opacity-50 cursor-not-allowed pointer-events-none'
    : '';

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${disabledClass} ${className}`;

  /* Glass-specific inline styles for non-primary variants */
  const glassStyles = {
    secondary: {
      background: 'rgba(255, 255, 255, 0.55)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.5)',
      boxShadow:
        'inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(0,0,0,0.02), 0 2px 8px rgba(0,0,0,0.05)',
    },
    ghost: {
      background: 'transparent',
      border: '1px solid transparent',
    },
    danger: {
      background: 'rgba(255, 232, 224, 0.55)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 176, 153, 0.3)',
      boxShadow:
        'inset 0 1px 0 rgba(255,255,255,0.5), 0 2px 8px rgba(255,138,107,0.08)',
    },
    primary: {
      boxShadow:
        '0 4px 16px rgba(92,163,80,0.25), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.05)',
    },
  };

  const style = glassStyles[variant] || {};

  const content = (
    <>
      {/* Glass shine overlay for primary button */}
      {variant === 'primary' && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 40%, rgba(255,255,255,0.05) 100%)',
          }}
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );

  if (to && !disabled) {
    return (
      <Link to={to} className={classes} style={style} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} style={style} disabled={disabled} {...props}>
      {content}
    </button>
  );
}
