/**
 * Dashboard — Main landing page showing summary, urgent items, and categories.
 * All data is placeholder/empty-state design. No real data is loaded or simulated.
 */
import { Package, AlertTriangle, XCircle, DollarSign, PlusCircle, Sparkles } from 'lucide-react';
import SummaryCard from '../components/ui/SummaryCard';
import GlassCard from '../components/ui/GlassCard';
import CategoryBreakdown from '../components/ui/CategoryBreakdown';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';

export default function Dashboard() {
  return (
    <div className="page-enter space-y-8 pb-8">
      {/* Welcome section */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-bark-800 mb-1">
            Good morning! <span className="inline-block animate-bounce-gentle">☀️</span>
          </h1>
          <p className="text-bark-400 text-sm">
            Keep your kitchen fresh and waste-free
          </p>
        </div>
        <Button to="/add" size="lg">
          <PlusCircle className="w-5 h-5" />
          Add Food
        </Button>
      </section>

      {/* Summary cards */}
      <section className="stagger-children grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          icon={<Package className="w-5 h-5 text-sage-500" />}
          label="Total Items"
          value="—"
          color="sage"
          accentEmoji="🥬"
        />
        <SummaryCard
          icon={<AlertTriangle className="w-5 h-5 text-citrus-500" />}
          label="Expiring Soon"
          value="—"
          color="citrus"
          accentEmoji="⏰"
        />
        <SummaryCard
          icon={<XCircle className="w-5 h-5 text-coral-500" />}
          label="Expired"
          value="—"
          color="coral"
          accentEmoji="🚫"
        />
        <SummaryCard
          icon={<DollarSign className="w-5 h-5 text-lavender-500" />}
          label="Est. Value"
          value="—"
          color="lavender"
          accentEmoji="💰"
        />
      </section>

      {/* Use these first — urgent items area */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-citrus-500" />
          <h2 className="text-lg font-display font-semibold text-bark-700">
            Use These First
          </h2>
        </div>
        <GlassCard className="p-6" accent glow>
          <EmptyState
            icon="🍽️"
            title="No urgent items"
            message="When you add food with upcoming expiry dates, items that need attention will appear here."
          />
        </GlassCard>
      </section>

      {/* Category breakdown */}
      <section>
        <h2 className="text-lg font-display font-semibold text-bark-700 mb-4">
          Browse by Category
        </h2>
        <CategoryBreakdown />
      </section>

      {/* First-use welcome banner */}
      <section>
        <GlassCard strong glow reflection className="p-8 text-center relative overflow-hidden">
          {/* Decorative gradient accent — enhanced with richer glass caustics */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse at 20% 30%, rgba(168, 213, 162, 0.12), transparent 60%),
                radial-gradient(ellipse at 80% 70%, rgba(194, 173, 255, 0.1), transparent 50%),
                radial-gradient(ellipse at 50% 10%, rgba(255, 224, 122, 0.08), transparent 50%),
                linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)
              `,
            }}
          />
          <div className="relative z-10">
            <div className="text-5xl mb-4">🌱</div>
            <h3 className="text-xl font-display font-bold text-bark-800 mb-2">
              Welcome to FreshKeep
            </h3>
            <p className="text-bark-400 text-sm max-w-md mx-auto mb-5 leading-relaxed">
              Start by adding the food in your kitchen. FreshKeep will help you track
              expiry dates, reduce waste, and save money on groceries.
            </p>
            <Button to="/add" size="md">
              <PlusCircle className="w-4 h-4" />
              Add Your First Item
            </Button>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}