/**
 * GlassCard — A reusable card with enhanced liquid glass effect.
 *
 * @param {string}  className  - Additional classes
 * @param {boolean} hover      - Enable hover lift effect
 * @param {boolean} strong     - Use stronger glass variant
 * @param {string}  accent     - Show refraction accent with caustic animation
 * @param {boolean} glow       - Enable luminous animated border
 * @param {boolean} reflection - Enable subtle reflection sweep
 * @param {React.ReactNode} children
 */
export default function GlassCard({
  className = '',
  hover = false,
  strong = false,
  accent = false,
  glow = false,
  reflection = false,
  children,
  ...props
}) {
  const baseClass = strong ? 'glass-panel-strong' : 'glass-panel';
  const hoverClass = hover ? 'hover-lift cursor-pointer' : '';
  const accentClass = accent ? 'glass-accent' : '';
  const glowClass = glow ? 'glass-border-glow' : '';
  const reflectionClass = reflection ? 'glass-reflection' : '';

  return (
    <div
      className={`${baseClass} ${hoverClass} ${accentClass} ${glowClass} ${reflectionClass} rounded-2xl ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
