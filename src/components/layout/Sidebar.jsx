import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  BarChart2,
  Leaf,
} from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/inventory', icon: Package, label: 'Inventory' },
  { to: '/add', icon: PlusCircle, label: 'Add Item' },
  { to: '/statistics', icon: BarChart2, label: 'Statistics' },
];

export default function Sidebar() {
  return (
    /*
     * The sidebar MUST NOT have:
     *   - transform/animation on the fixed element itself (breaks fixed positioning)
     *   - overflow: hidden on the root element (clips fixed children)
     *
     * Glass effect is applied via inline styles + pseudo-element workaround via
     * a decorative inner div instead of CSS ::before/::after on the fixed element.
     */
    <aside
      className="hidden md:flex flex-col w-64 fixed inset-y-0 left-0 z-40"
      style={{
        /* Liquid glass background */
        background: `linear-gradient(
          145deg,
          rgba(255, 255, 255, 0.80) 0%,
          rgba(255, 255, 255, 0.62) 30%,
          rgba(255, 249, 232, 0.56) 60%,
          rgba(255, 255, 255, 0.72) 100%
        )`,
        backdropFilter: 'blur(28px) saturate(1.7) brightness(1.06)',
        WebkitBackdropFilter: 'blur(28px) saturate(1.7) brightness(1.06)',
        borderRight: '1px solid rgba(255, 255, 255, 0.45)',
        boxShadow: `
          4px 0 24px rgba(0, 0, 0, 0.06),
          inset -1px 0 0 rgba(255, 255, 255, 0.5),
          inset 1px 0 0 rgba(255, 255, 255, 0.6),
          inset 0 1px 0 rgba(255, 255, 255, 0.8)
        `,
      }}
    >
      {/* Top luminous edge — caustic shimmer line */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px pointer-events-none z-10"
        style={{
          background: `linear-gradient(
            90deg,
            transparent 0%,
            rgba(168, 213, 162, 0.4) 20%,
            rgba(255, 255, 255, 0.9) 50%,
            rgba(194, 173, 255, 0.3) 75%,
            transparent 100%
          )`,
        }}
      />

      {/* Right-edge inner reflection */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 bottom-0 w-px pointer-events-none z-10"
        style={{
          background: `linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.6) 0%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0.4) 100%
          )`,
        }}
      />

      {/* Top-right caustic glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-2/3 h-1/3 pointer-events-none"
        style={{
          background: `radial-gradient(
            ellipse at 80% 10%,
            rgba(255, 255, 255, 0.18) 0%,
            rgba(168, 213, 162, 0.05) 40%,
            transparent 70%
          )`,
        }}
      />

      {/* Logo */}
      <div className="flex items-center gap-3 px-6 pt-7 pb-5 relative z-10">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md relative overflow-hidden shrink-0"
          style={{
            background: 'linear-gradient(135deg, var(--color-sage-400), var(--color-sage-600))',
            boxShadow: '0 2px 12px rgba(92, 163, 80, 0.3), inset 0 1px 0 rgba(255,255,255,0.25)',
          }}
        >
          <Leaf className="w-5 h-5 text-white relative z-10" />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%)',
            }}
          />
        </div>
        <div>
          <h1 className="text-xl font-display font-bold text-bark-800 leading-tight">
            FreshKeep
          </h1>
          <p className="text-[11px] text-bark-400 font-medium tracking-wide uppercase">
            Food Tracker
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 relative z-10 glass-divider" />

      {/* Navigation */}
      <nav className="flex-1 px-4 pt-5 space-y-1 relative z-10">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'text-sage-700'
                  : 'text-bark-500 hover:text-bark-700'
              }`
            }
            style={({ isActive }) =>
              isActive
                ? {
                    background: 'rgba(228, 240, 223, 0.65)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    border: '1px solid rgba(168, 213, 162, 0.3)',
                    boxShadow:
                      'inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(0,0,0,0.02), 0 2px 8px rgba(92,163,80,0.08)',
                  }
                : {
                    background: 'transparent',
                    border: '1px solid transparent',
                  }
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={`w-[18px] h-[18px] transition-colors shrink-0 ${
                    isActive ? 'text-sage-500' : 'text-bark-400 group-hover:text-bark-500'
                  }`}
                />
                <span>{label}</span>
                {isActive && (
                  <span
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-sage-400 shrink-0"
                    style={{ boxShadow: '0 0 6px 1px rgba(126, 190, 115, 0.5)' }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer accent */}
      <div className="px-5 pb-6 relative z-10">
        <div
          className="rounded-xl p-4 text-center"
          style={{
            background: `linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.55) 0%,
              rgba(255, 249, 232, 0.4) 100%
            )`,
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.45)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5), 0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <p className="text-xs text-bark-400 leading-relaxed">
            🌿 Keep it fresh,<br />reduce food waste
          </p>
        </div>
      </div>
    </aside>
  );
}
