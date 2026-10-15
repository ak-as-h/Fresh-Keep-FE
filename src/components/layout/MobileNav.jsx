import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  BarChart2,
} from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Home' },
  { to: '/inventory', icon: Package, label: 'Inventory' },
  { to: '/add', icon: PlusCircle, label: 'Add' },
  { to: '/statistics', icon: BarChart2, label: 'Stats' },
];

export default function MobileNav() {
  return (
    /*
     * fixed bottom-0: stays anchored to viewport bottom while content scrolls.
     * No transform/animation on this element — would break fixed positioning.
     * No overflow:hidden on root — use decorative inner divs for glass highlights.
     * z-50: above all page content.
     */
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50"
      style={{
        /* Liquid glass base */
        background: `linear-gradient(
          180deg,
          rgba(255, 255, 255, 0.82) 0%,
          rgba(255, 255, 255, 0.72) 100%
        )`,
        backdropFilter: 'blur(28px) saturate(1.6) brightness(1.05)',
        WebkitBackdropFilter: 'blur(28px) saturate(1.6) brightness(1.05)',
        borderTop: '1px solid rgba(255, 255, 255, 0.55)',
        boxShadow: `
          0 -4px 24px rgba(0, 0, 0, 0.06),
          0 -1px 0 rgba(255, 255, 255, 0.8),
          inset 0 1px 0 rgba(255, 255, 255, 0.9)
        `,
        /* Safe area for iOS home indicator */
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      {/* Top luminous edge — caustic shimmer */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: `linear-gradient(
            90deg,
            transparent 0%,
            rgba(168, 213, 162, 0.5) 15%,
            rgba(255, 255, 255, 0.95) 40%,
            rgba(194, 173, 255, 0.4) 65%,
            rgba(255, 224, 122, 0.4) 85%,
            transparent 100%
          )`,
        }}
      />

      {/* Soft ambient glow overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(
            ellipse at 50% 0%,
            rgba(255, 255, 255, 0.15) 0%,
            transparent 70%
          )`,
        }}
      />

      <div className="flex items-center justify-around px-2 py-1.5 relative">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 press-effect ${
                isActive
                  ? 'text-sage-600'
                  : 'text-bark-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className="p-1.5 rounded-lg transition-all duration-200"
                  style={isActive ? {
                    background: 'rgba(228, 240, 223, 0.7)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    border: '1px solid rgba(168, 213, 162, 0.25)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), 0 0 12px rgba(126, 190, 115, 0.15)',
                  } : {
                    border: '1px solid transparent',
                  }}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      isActive ? 'text-sage-500' : 'text-bark-400'
                    }`}
                  />
                </div>
                <span className="leading-none">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
