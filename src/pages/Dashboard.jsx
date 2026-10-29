/**
 * Dashboard — Main landing page showing live summary from JSON Server.
 * Shows real item counts, urgent items, and category breakdown.
 */

import { useEffect, useState } from "react";
import {
  Package,
  AlertTriangle,
  XCircle,
  PlusCircle,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getFoodItem } from "../services/AllAPI";
import SummaryCard from "../components/ui/SummaryCard";
import GlassCard from "../components/ui/GlassCard";
import CategoryBreakdown from "../components/ui/CategoryBreakdown";
import EmptyState from "../components/ui/EmptyState";
import Button from "../components/ui/Button";
import StatusBadge from "../components/ui/StatusBadge";

import {
  computeStatus,
  daysUntilExpiry,
  formatDateShort,
} from "../utils/itemUtils";
import { toast } from "react-toastify";

const categoryIcons = {
  Fruits: "🍎",
  Vegetables: "🥦",
  Dairy: "🧀",
  Meat: "🥩",
  Seafood: "🐟",
  Grains: "🌾",
  Beverages: "🥤",
  Snacks: "🍿",
  Frozen: "🧊",
  Condiments: "🫙",
  Bakery: "🍞",
  Other: "📦",
};

function getGreeting() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return { message: 'Good morning!', emoji: '☀️' };
  }

  if (hour >= 12 && hour < 17) {
    return { message: 'Good afternoon!', emoji: '🌤️' };
  }

  else {
    return { message: 'Good evening!', emoji: '🌇' };
  }

}

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const greeting = getGreeting();
  const [error] = useState(false);
  

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const apiResponse = await getFoodItem();
        if (apiResponse.status == 200) {
          setItems(apiResponse.data);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch Food items");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Compute live stats
  const totalItems = items.length;

  const expiringSoon = items.filter(
    (item) => computeStatus(item.expiryDate) === "expiring",
  ).length;

  const expired = items.filter(
    (item) => computeStatus(item.expiryDate) === "expired",
  ).length;

  // Items needing attention, sorted by urgency
  const urgentItems = items
    .map((item) => ({
      ...item,
      days: daysUntilExpiry(item.expiryDate),
      status: computeStatus(item.expiryDate),
    }))
    .filter((item) => item.status === "expiring" || item.status === "expired")
    .sort((a, b) => a.days - b.days)
    .slice(0, 6);

  const isEmpty = !loading && totalItems === 0;

  return (
    <div className="page-enter space-y-8 pb-8">
      {/* Welcome section */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-bark-800 mb-1">
  {greeting.message}{' '}
  <span className="inline-block animate-bounce-gentle">
    {greeting.emoji}
  </span>
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
      <section className="stagger-children grid grid-cols-2 lg:grid-cols-3 gap-4">
        <SummaryCard
          icon={<Package className="w-5 h-5 text-sage-500" />}
          label="Total Items"
          value={loading ? "..." : String(totalItems)}
          color="sage"
          accentEmoji="🥬"
        />

        <SummaryCard
          icon={<AlertTriangle className="w-5 h-5 text-citrus-500" />}
          label="Expiring Soon"
          value={loading ? "..." : String(expiringSoon)}
          color="citrus"
          accentEmoji="⏰"
        />

        <SummaryCard
          icon={<XCircle className="w-5 h-5 text-coral-500" />}
          label="Expired"
          value={loading ? "..." : String(expired)}
          color="coral"
          accentEmoji="🚫"
        />
      </section>

      {/* Use These First */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-citrus-500" />

          <h2 className="text-lg font-display font-semibold text-bark-700">
            Use These First
          </h2>
        </div>

        <GlassCard className="p-6" accent glow>
          {loading ? (
            <p className="text-sm text-bark-400">Loading your food items...</p>
          ) : error ? (
            <p className="text-sm text-coral-500">
              Failed to load food items. Please check whether JSON Server is
              running.
            </p>
          ) : urgentItems.length === 0 ? (
            // Keep your existing EmptyState here
            <EmptyState
              icon="🍽️"
              title="No urgent items"
              message="When you add food with upcoming expiry dates, items that need attention will appear here."
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {urgentItems.map((item) => (
                <Link
                  key={item.id}
                  to={`/item/${item.id}`}
                  className="flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-[1.01]"
                  style={{
                    background:
                      item.status === "expired"
                        ? "rgba(255, 232, 224, 0.5)"
                        : "rgba(255, 247, 214, 0.5)",
                    border: `1px solid ${
                      item.status === "expired"
                        ? "rgba(255,176,153,0.25)"
                        : "rgba(255,210,74,0.2)"
                    }`,
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35)",
                    textDecoration: "none",
                  }}
                >
                  <span className="text-2xl shrink-0">
                    {categoryIcons[item.category] || "📦"}
                  </span>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-bark-700 truncate">
                      {item.itemname}
                    </p>

                    <p className="text-[11px] text-bark-400">
                      {formatDateShort(item.expiryDate)}
                    </p>
                  </div>

                  <StatusBadge status={item.status} />
                </Link>
              ))}
            </div>
          )}
        </GlassCard>
      </section>

      {/* Category breakdown */}
      <section>
        <h2 className="text-lg font-display font-semibold text-bark-700 mb-4">
          Browse by Category
        </h2>

        {loading ? (
          <p className="text-sm text-bark-400">Loading categories...</p>
        ) : (
          <CategoryBreakdown items={items} />
        )}
      </section>

      {/* Welcome banner */}
      {isEmpty && (
        <section>
          <GlassCard
            strong
            glow
            reflection
            className="p-8 text-center relative overflow-hidden"
          >
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
                Start by adding the food in your kitchen. FreshKeep will help
                you track expiry dates, reduce waste, and save money on
                groceries.
              </p>

              <Button to="/add" size="md">
                <PlusCircle className="w-4 h-4" />
                Add Your First Item
              </Button>
            </div>
          </GlassCard>
        </section>
      )}
    </div>
  );
}
