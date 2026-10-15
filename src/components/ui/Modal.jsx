/**
 * Modal — Centered overlay modal with enhanced liquid glass effect.
 */
import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose?.();
      }}
    >
      {/* Backdrop with frosted glass */}
      <div
        className="absolute inset-0"
        style={{
          background: 'rgba(31, 26, 18, 0.18)',
          backdropFilter: 'blur(8px) saturate(1.2)',
          WebkitBackdropFilter: 'blur(8px) saturate(1.2)',
        }}
      />

      {/* Modal content */}
      <div
        className={`
          relative w-full ${sizeClasses[size]}
          glass-panel-strong glass-accent glass-border-glow
          rounded-2xl shadow-xl
          animate-scale-in overflow-hidden
        `}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
            <h2 className="text-lg font-display font-semibold text-bark-800">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.3)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255,255,255,0.3)',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.5)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
              }}
              aria-label="Close modal"
            >
              <X className="w-4 h-4 text-bark-400" />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
