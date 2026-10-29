
/**
 * Inventory — Grid/list of tracked food items with search,
 * filters, sorting, and JSON Server CRUD integration.
 */
import { useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  LayoutGrid,
  List,
  ArrowUpDown,
  PlusCircle,
  CloudCog,
} from 'lucide-react';
import { toast } from 'react-toastify';

import SearchBar from '../components/ui/SearchBar';
import FilterChip from '../components/ui/FilterChip';
import InventoryItemCard from '../components/ui/InventoryItemCard';
import EmptyState from '../components/ui/EmptyState';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';

import {
  getFoodItem,
  deleteFoodItem,
} from '../services/AllAPI'

import {
  computeStatus,
  daysUntilExpiry,
} from '../utils/itemUtils';

const statusFilters = [
  { key: 'all', label: 'All', icon: '📋' },
  { key: 'fresh', label: 'Fresh', icon: '✅' },
  { key: 'expiring', label: 'Expiring', icon: '⚠️' },
  { key: 'expired', label: 'Expired', icon: '🚫' },
];

const categoryFilters = [
  { key: 'all', label: 'All Categories' },
  { key: 'Fruits', label: '🍎 Fruits' },
  { key: 'Vegetables', label: '🥦 Vegetables' },
  { key: 'Dairy', label: '🧀 Dairy' },
  { key: 'Meat', label: '🥩 Meat' },
  { key: 'Grains', label: '🌾 Grains' },
  { key: 'Beverages', label: '🥤 Beverages' },
];

const sortOptions = [
  { key: 'expiry', label: 'Expiry Date' },
  { key: 'name', label: 'Name' },
  { key: 'category', label: 'Category' },
  { key: 'added', label: 'Date Added (newest)' },
];

export default function Inventory() {
  const [searchParams] = useSearchParams();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [search, setSearch] = useState('');
  const [activeStatus, setActiveStatus] = useState('all');

  const [activeCategory, setActiveCategory] = useState(
    () => searchParams.get('category') || 'all'
  );

  const [activeSort, setActiveSort] = useState('expiry');
  const [showSort, setShowSort] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Fetch inventory from JSON Server
  const fetchItems = useCallback(async () => {
    try {
      const apiResponse = await getFoodItem();

      if (apiResponse.status === 200) {
        setItems(apiResponse.data);
      } else {
        toast.error('Failed to fetch inventory');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to load food items');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Open delete confirmation
  const handleDeleteRequest = (id, name) => {
    setDeleteTarget({ id, name });
  };

  // Delete item through JSON Server
  const handleDeleteConfirm = async () => {
    if (!deleteTarget || deleting) return;

    try {
      setDeleting(true);

      const apiResponse = await deleteFoodItem(deleteTarget.id);

      if (
        apiResponse.status === 200 ||
        apiResponse.status === 204
      ) {
        setItems((prev) =>
          prev.filter(
            (item) =>
              String(item.id) !== String(deleteTarget.id)
          )
        );

        toast.success('Food item deleted successfully');
        setDeleteTarget(null);
      } else {
        toast.error('Failed to delete food item');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete food item');
    } finally {
      setDeleting(false);
    }
  };

  // Filter and sort inventory
  const filteredItems = useMemo(() => {
    let result = items.map((item) => ({
      ...item,
      _status: computeStatus(item.expiryDate),
      _days: daysUntilExpiry(item.expiryDate),
    }));

    // Search by item name, category, or storage location
    if (search.trim()) {
      const query = search.trim().toLowerCase();

      result = result.filter((item) =>
        [
          item.itemname,
          item.category,
          item.location,
        ].some((value) =>
          String(value ?? '').toLowerCase().includes(query)
        )
      );
    }

    // Status filter
    if (activeStatus !== 'all') {
      result = result.filter(
        (item) => item._status === activeStatus
      );
    }

    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter(
        (item) => item.category === activeCategory
      );
    }

    // Sorting
    result = [...result].sort((a, b) => {
      switch (activeSort) {
        case 'expiry':
          return a._days - b._days;

        case 'name':
          return String(a.itemname ?? '').localeCompare(
            String(b.itemname ?? '')
          );

        case 'category':
          return String(a.category ?? '').localeCompare(
            String(b.category ?? '')
          );

        case 'added':
        default:
          return 0;
      }
    });

    return result;
  }, [
    items,
    search,
    activeStatus,
    activeCategory,
    activeSort,
  ]);

  const activeSortLabel =
    sortOptions.find((option) => option.key === activeSort)
      ?.label || 'Sort';

  return (
    <div className="page-enter space-y-6 pb-8">
      {/* Header */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-bark-800">
            Inventory
          </h1>

          <p className="text-bark-400 text-sm mt-0.5">
            {loading
              ? 'Loading inventory...'
              : items.length > 0
                ? `${items.length} item${items.length !== 1 ? 's' : ''} tracked`
                : 'Track and manage your food items'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button to="/add" size="md">
            <PlusCircle className="w-4 h-4" />
            Add Item
          </Button>
        </div>
      </section>

      {/* Search and controls */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <SearchBar
              placeholder="Search by name, category, location..."
              value={search}
              onChange={setSearch}
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Sort dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowSort((prev) => !prev)}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-medium text-bark-500 transition-all"
                style={{
                  background: 'rgba(255, 255, 255, 0.45)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.45)',
                  boxShadow:
                    'inset 0 1px 0 rgba(255,255,255,0.4), 0 1px 3px rgba(0,0,0,0.03)',
                }}
              >
                <ArrowUpDown className="w-3.5 h-3.5" />

                <span className="hidden sm:inline">
                  {activeSortLabel}
                </span>

                <span className="sm:hidden">Sort</span>
              </button>

              {showSort && (
                <div className="absolute top-full mt-1 right-0 z-30 glass-panel-strong rounded-xl shadow-lg p-1.5 min-w-[180px] animate-slide-down">
                  {sortOptions.map(({ key, label }) => (
                    <button
                      type="button"
                      key={key}
                      className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors ${
                        activeSort === key
                          ? 'bg-sage-50 text-sage-700 font-semibold'
                          : 'text-bark-600 hover:bg-sage-50'
                      }`}
                      onClick={() => {
                        setActiveSort(key);
                        setShowSort(false);
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Grid/list toggle */}
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
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-2.5 transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'text-sage-600'
                    : 'text-bark-400 hover:text-bark-600'
                }`}
                style={
                  viewMode === 'grid'
                    ? {
                        background: 'rgba(228, 240, 223, 0.6)',
                        boxShadow:
                          'inset 0 1px 0 rgba(255,255,255,0.4)',
                      }
                    : {}
                }
                aria-label="Grid view"
                aria-pressed={viewMode === 'grid'}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-2.5 transition-all duration-200 ${
                  viewMode === 'list'
                    ? 'text-sage-600'
                    : 'text-bark-400 hover:text-bark-600'
                }`}
                style={
                  viewMode === 'list'
                    ? {
                        background: 'rgba(228, 240, 223, 0.6)',
                        boxShadow:
                          'inset 0 1px 0 rgba(255,255,255,0.4)',
                      }
                    : {}
                }
                aria-label="List view"
                aria-pressed={viewMode === 'list'}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Status and category filters */}
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

          {categoryFilters.map(({ key, label }) => (
            <FilterChip
              key={key}
              label={label}
              active={activeCategory === key}
              onClick={() => setActiveCategory(key)}
            />
          ))}
        </div>
      </section>

      {/* Inventory content */}
      <section>
        {loading ? (
          <GlassCard className="p-8">
            <p className="text-sm text-bark-400 text-center">
              Loading your food items...
            </p>
          </GlassCard>
        ) : items.length === 0 ? (
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
        ) : filteredItems.length === 0 ? (
          <GlassCard className="p-8">
            <EmptyState
              icon="🔍"
              title="No items match"
              message="Try adjusting your search terms or clearing some filters."
              action={
                <button
                  type="button"
                  onClick={() => {
                    setSearch('');
                    setActiveStatus('all');
                    setActiveCategory('all');
                  }}
                  className="text-sm text-sage-600 underline underline-offset-2"
                >
                  Clear all filters
                </button>
              }
            />
          </GlassCard>
        ) : (
          <div
            className={`stagger-children grid gap-4 ${
              viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1'
            }`}
          >
            {filteredItems.map((item) => (
              <InventoryItemCard
                key={item.id}
                item={{
                  ...item,
                  // Keep the card compatible with the existing
                  // component if it previously expected item.name.
                  name: item.itemname,
                  status: item._status,
                }}
                onDelete={handleDeleteRequest}
              />
            ))}
          </div>
        )}
      </section>

      {/* Item count */}
      {!loading &&
        items.length > 0 &&
        filteredItems.length > 0 && (
          <p className="text-xs text-bark-400 text-center">
            Showing {filteredItems.length} of {items.length} item
            {items.length !== 1 ? 's' : ''}
          </p>
        )}

      {/* Delete confirmation modal */}
      <Modal
        isOpen={Boolean(deleteTarget)}
        onClose={() => {
          if (!deleting) setDeleteTarget(null);
        }}
        title="Delete Item"
        size="sm"
      >
        <div className="space-y-5">
          <div className="text-center">
            <div className="text-4xl mb-3">🗑️</div>

            <p className="text-sm text-bark-600 leading-relaxed">
              Are you sure you want to delete{' '}
              <span className="font-semibold text-bark-800">
                {deleteTarget?.name}
              </span>
              ? This action cannot be undone.
            </p>
          </div>

          <div className="flex gap-3 justify-end">
            <Button
              variant="secondary"
              size="sm"
              disabled={deleting}
              onClick={() => setDeleteTarget(null)}
            >
              Cancel
            </Button>

            <Button
              variant="danger"
              size="sm"
              disabled={deleting}
              onClick={handleDeleteConfirm}
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
