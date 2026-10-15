/**
 * Inventory — Grid/list of tracked food items with search, filters, and sorting.
 * Shows empty state by default. Includes design for populated view with sample placeholders.
 */
import { useState } from 'react';
import { LayoutGrid, List, ArrowUpDown, PlusCircle, SlidersHorizontal } from 'lucide-react';
import SearchBar from '../components/ui/SearchBar';
import FilterChip from '../components/ui/FilterChip';
import InventoryItemCard from '../components/ui/InventoryItemCard';
import EmptyState from '../components/ui/EmptyState';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import SkeletonCard from '../components/ui/SkeletonCard';

const statusFilters = [
  { key: 'all', label: 'All', icon: '📋' },
  { key: 'fresh', label: 'Fresh', icon: '✅' },
  { key: 'expiring', label: 'Expiring', icon: '⚠️' },
  { key: 'expired', label: 'Expired', icon: '🚫' },
];

const categoryFilters = [
  { key: 'all', label: 'All Categories' },
  { key: 'fruits', label: '🍎 Fruits' },
  { key: 'vegetables', label: '🥦 Vegetables' },
  { key: 'dairy', label: '🧀 Dairy' },
  { key: 'meat', label: '🥩 Meat' },
  { key: 'grains', label: '🌾 Grains' },
  { key: 'beverages', label: '🥤 Beverages' },
];

const sortOptions = [
  { key: 'expiry', label: 'Expiry Date' },
  { key: 'name', label: 'Name' },
  { key: 'category', label: 'Category' },
  { key: 'added', label: 'Date Added' },
];

/* Design-only sample items to demonstrate populated inventory view */
const sampleItems = [
  { id: '1', name: 'Organic Whole Milk', category: 'Dairy', quantity: 1, unit: 'gallon', location: 'Fridge', expiryDate: 'Oct 18', status: 'expiring' },
  { id: '2', name: 'Baby Spinach', category: 'Vegetables', quantity: 5, unit: 'oz', location: 'Fridge', expiryDate: 'Oct 16', status: 'expired' },
  { id: '3', name: 'Brown Rice', category: 'Grains', quantity: 2, unit: 'lbs', location: 'Pantry', expiryDate: 'Mar 2027', status: 'fresh' },
  { id: '4', name: 'Chicken Breast', category: 'Meat', quantity: 4, unit: 'pcs', location: 'Freezer', expiryDate: 'Dec 2026', status: 'fresh' },
  { id: '5', name: 'Greek Yogurt', category: 'Dairy', quantity: 3, unit: 'cups', location: 'Fridge', expiryDate: 'Oct 20', status: 'expiring' },
  { id: '6', name: 'Avocados', category: 'Fruits', quantity: 4, unit: 'pcs', location: 'Pantry', expiryDate: 'Oct 15', status: 'expired' },
];

export default function Inventory() {
  const [viewMode, setViewMode] = useState('grid');
  const [activeStatus, setActiveStatus] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showSort, setShowSort] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  return (
    <div className="page-enter space-y-6 pb-8">
      {/* Header */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-bark-800">
            Inventory
          </h1>
          <p className="text-bark-400 text-sm mt-0.5">
            Track and manage your food items
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button to="/add" size="md">
            <PlusCircle className="w-4 h-4" />
            Add Item
          </Button>
        </div>
      </section>

      {/* Search + Controls */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <SearchBar placeholder="Search by name, category, location..." />
          </div>
          <div className="flex items-center gap-2">
            {/* Sort dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSort(!showSort)}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-medium text-bark-500 transition-all"
                style={{
                  background: 'rgba(255, 255, 255, 0.45)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.45)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4), 0 1px 3px rgba(0,0,0,0.03)',
                }}
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
                Sort
              </button>
              {showSort && (
                <div className="absolute top-full mt-1 right-0 z-30 glass-panel-strong rounded-xl shadow-lg p-1.5 min-w-[160px] animate-slide-down">
                  {sortOptions.map(({ key, label }) => (
                    <button
                      key={key}
                      className="w-full text-left px-3 py-2 text-xs text-bark-600 hover:bg-sage-50 rounded-lg transition-colors"
                      onClick={() => setShowSort(false)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* View toggle */}
            <div
              className="flex items-center rounded-xl overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.45)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)',
              }}
            >
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 transition-all duration-200 ${
                  viewMode === 'grid' ? 'text-sage-600' : 'text-bark-400 hover:text-bark-600'
                }`}
                style={viewMode === 'grid' ? {
                  background: 'rgba(228, 240, 223, 0.6)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)',
                } : {}}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 transition-all duration-200 ${
                  viewMode === 'list' ? 'text-sage-600' : 'text-bark-400 hover:text-bark-600'
                }`}
                style={viewMode === 'list' ? {
                  background: 'rgba(228, 240, 223, 0.6)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)',
                } : {}}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Status filters */}
        <div className="flex flex-wrap gap-2">
          {statusFilters.map(({ key, label, icon }) => (
            <FilterChip
              key={key}
              label={label}
              icon={icon}
              active={activeStatus === key}
              onClick={() => setActiveStatus(key)}
            />
          ))}
          <span className="w-px h-6 bg-bark-200/50 self-center mx-1" />
          {categoryFilters.slice(0, 5).map(({ key, label }) => (
            <FilterChip
              key={key}
              label={label}
              active={activeCategory === key}
              onClick={() => setActiveCategory(key)}
            />
          ))}
        </div>

        {/* Demo view toggles */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-bark-300" />
          <span className="text-[10px] uppercase tracking-wider text-bark-300 font-medium">View demo:</span>
          <button
            onClick={() => { setShowEmpty(false); setShowLoading(false); }}
            className={`text-[10px] px-2 py-0.5 rounded-full ${!showEmpty && !showLoading ? 'bg-sage-100 text-sage-600' : 'text-bark-400 hover:bg-bark-50'}`}
          >
            Populated
          </button>
          <button
            onClick={() => { setShowEmpty(true); setShowLoading(false); }}
            className={`text-[10px] px-2 py-0.5 rounded-full ${showEmpty ? 'bg-sage-100 text-sage-600' : 'text-bark-400 hover:bg-bark-50'}`}
          >
            Empty
          </button>
          <button
            onClick={() => { setShowLoading(true); setShowEmpty(false); }}
            className={`text-[10px] px-2 py-0.5 rounded-full ${showLoading ? 'bg-sage-100 text-sage-600' : 'text-bark-400 hover:bg-bark-50'}`}
          >
            Loading
          </button>
        </div>
      </section>

      {/* Content area */}
      <section>
        {showLoading ? (
          /* Loading skeleton state */
          <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} lines={2} />
            ))}
          </div>
        ) : showEmpty ? (
          /* Empty state */
          <GlassCard className="p-8">
            <EmptyState
              icon="📦"
              title="Your inventory is empty"
              message="Add your first food item to start tracking expiry dates and reduce waste."
              action={
                <Button to="/add">
                  <PlusCircle className="w-4 h-4" />
                  Add Your First Item
                </Button>
              }
            />
          </GlassCard>
        ) : (
          /* Populated grid */
          <div className={`stagger-children grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {sampleItems.map((item) => (
              <InventoryItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>

      {/* Item count */}
      {!showEmpty && !showLoading && (
        <p className="text-xs text-bark-400 text-center">
          Showing {sampleItems.length} items · Design preview
        </p>
      )}
    </div>
  );
}
