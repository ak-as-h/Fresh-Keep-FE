/**
 * SearchBar — Glass-styled search input.
 * Accepts controlled value/onChange props so parent pages can wire it to state.
 * Falls back to internal state when used standalone (uncontrolled mode).
 */
import { Search, X } from 'lucide-react';
import { useState } from 'react';

export default function SearchBar({
  placeholder = 'Search items...',
  value: controlledValue,
  onChange: controlledOnChange,
}) {
  // Uncontrolled fallback (used when no value/onChange are passed)
  const [internalValue, setInternalValue] = useState('');
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  const handleChange = isControlled
    ? (e) => controlledOnChange(e.target.value)
    : (e) => setInternalValue(e.target.value);
  const handleClear = isControlled
    ? () => controlledOnChange('')
    : () => setInternalValue('');

  return (
    <div className="relative group">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-bark-300 group-focus-within:text-sage-500 transition-colors" />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="
          w-full pl-10 pr-10 py-2.5 rounded-xl text-sm
          placeholder:text-bark-300
          transition-all duration-250 outline-none
          font-body text-bark-700
        "
        style={{
          background: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(12px) saturate(1.3)',
          WebkitBackdropFilter: 'blur(12px) saturate(1.3)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.02), 0 1px 4px rgba(0,0,0,0.04)',
        }}
        onFocus={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.65)';
          e.target.style.borderColor = 'rgba(168, 213, 162, 0.45)';
          e.target.style.boxShadow =
            'inset 0 1px 0 rgba(255,255,255,0.6), 0 0 0 3px rgba(168, 213, 162, 0.1), 0 0 16px rgba(168, 213, 162, 0.06)';
        }}
        onBlur={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.5)';
          e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
          e.target.style.boxShadow =
            'inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.02), 0 1px 4px rgba(0,0,0,0.04)';
        }}
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-md hover:bg-bark-100 transition-colors"
          aria-label="Clear search"
        >
          <X className="w-3.5 h-3.5 text-bark-400" />
        </button>
      )}
    </div>
  );
}
