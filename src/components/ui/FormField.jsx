/**
 * FormField — Styled form input with liquid glass effect, label and optional validation message.
 * Design only — no real validation behavior.
 */
export default function FormField({
  label,
  type = 'text',
  placeholder,
  required = false,
  error,
  hint,
  children,
  className = '',
  ...props
}) {
  const glassInputBase = {
    background: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: error
      ? '1px solid rgba(255, 138, 107, 0.45)'
      : '1px solid rgba(255, 255, 255, 0.5)',
    boxShadow: error
      ? 'inset 0 1px 0 rgba(255,255,255,0.3), 0 0 0 2px rgba(255,138,107,0.1)'
      : 'inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.02), 0 1px 3px rgba(0,0,0,0.04)',
  };

  // If children are provided, render them as the input (for select, textarea, etc.)
  const inputElement = children || (
    <input
      type={type}
      placeholder={placeholder}
      className="
        w-full px-4 py-2.5 rounded-xl text-sm font-body
        transition-all duration-200 outline-none
        placeholder:text-bark-300 text-bark-700
      "
      style={glassInputBase}
      onFocus={(e) => {
        e.target.style.background = 'rgba(255, 255, 255, 0.65)';
        if (!error) {
          e.target.style.borderColor = 'rgba(168, 213, 162, 0.45)';
          e.target.style.boxShadow =
            'inset 0 1px 0 rgba(255,255,255,0.6), 0 0 0 3px rgba(168,213,162,0.1), 0 0 16px rgba(168,213,162,0.06)';
        }
      }}
      onBlur={(e) => {
        e.target.style.background = 'rgba(255, 255, 255, 0.5)';
        if (!error) {
          e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
          e.target.style.boxShadow =
            'inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.02), 0 1px 3px rgba(0,0,0,0.04)';
        }
      }}
      aria-invalid={!!error}
      aria-describedby={error ? `${label}-error` : undefined}
      {...props}
    />
  );

  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="flex items-center gap-1 text-sm font-medium text-bark-600">
        {label}
        {required && <span className="text-coral-400">*</span>}
      </label>
      {inputElement}
      {hint && !error && (
        <p className="text-xs text-bark-400">{hint}</p>
      )}
      {error && (
        <p id={`${label}-error`} className="text-xs text-coral-500 flex items-center gap-1" role="alert">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}
