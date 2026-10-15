/**
 * AddItem — Form UI for creating or editing a food item.
 * Design only — does not save data or perform validation.
 * Shows how fields, validation messages, and button states will look.
 */
import { useState } from 'react';
import { ArrowLeft, Save, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';
import FormField from '../components/ui/FormField';
import Button from '../components/ui/Button';

const categories = [
  'Fruits', 'Vegetables', 'Dairy', 'Meat', 'Seafood',
  'Grains', 'Beverages', 'Snacks', 'Frozen', 'Condiments',
  'Bakery', 'Other',
];

const locations = ['Pantry', 'Fridge', 'Freezer'];
const units = ['pcs', 'lbs', 'oz', 'kg', 'g', 'gallon', 'liters', 'cups', 'dozen', 'bags'];

export default function AddItem() {
  const [showValidation, setShowValidation] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');

  return (
    <div className="page-enter max-w-2xl mx-auto space-y-6 pb-8">
      {/* Back link + heading */}
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-bark-400 hover:text-sage-600 transition-colors mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-bark-800">
          Add New Item
        </h1>
        <p className="text-bark-400 text-sm mt-1">
          Fill in the details of the food item you want to track
        </p>
      </div>

      {/* Form card */}
      <GlassCard strong className="p-6 sm:p-8 space-y-6" accent>
        {/* Item name */}
        <FormField
          label="Item Name"
          placeholder="e.g. Organic Whole Milk"
          required
          error={showValidation ? 'Item name is required' : undefined}
        />

        {/* Category */}
        <FormField label="Category" required>
          <select
            className="w-full px-4 py-2.5 rounded-xl text-sm font-body text-bark-700 transition-all duration-200 outline-none appearance-none cursor-pointer"
            style={{
              background: 'rgba(255, 255, 255, 0.5)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.02), 0 1px 3px rgba(0,0,0,0.04)',
            }}
            defaultValue=""
          >
            <option value="" disabled>Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </FormField>

        {/* Quantity + Unit row */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Quantity"
            type="number"
            placeholder="1"
            required
            error={showValidation ? 'Enter a quantity' : undefined}
          />
          <FormField label="Unit">
            <select
              className="w-full px-4 py-2.5 rounded-xl text-sm font-body text-bark-700 transition-all duration-200 outline-none appearance-none cursor-pointer"
              style={{
                background: 'rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.02), 0 1px 3px rgba(0,0,0,0.04)',
              }}
              defaultValue="pcs"
            >
              {units.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </FormField>
        </div>

        {/* Dates row */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Purchase Date"
            type="date"
            hint="When you bought it"
          />
          <FormField
            label="Expiry Date"
            type="date"
            required
            error={showValidation ? 'Expiry date is required' : undefined}
            hint="Best before or use by date"
          />
        </div>

        {/* Storage location */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-bark-600">
            Storage Location <span className="text-coral-400">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {locations.map((loc) => (
              <button
                key={loc}
                onClick={() => setSelectedLocation(loc)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-250 press-effect"
                style={
                  selectedLocation === loc
                    ? {
                        background: 'linear-gradient(135deg, rgba(92,163,80,0.9), rgba(70,125,60,0.9))',
                        color: '#fff',
                        border: '1px solid rgba(255,255,255,0.25)',
                        boxShadow: '0 2px 8px rgba(92,163,80,0.2), inset 0 1px 0 rgba(255,255,255,0.25)',
                      }
                    : {
                        background: 'rgba(255, 255, 255, 0.45)',
                        backdropFilter: 'blur(8px)',
                        color: 'var(--color-bark-500)',
                        border: '1px solid rgba(255, 255, 255, 0.45)',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4), 0 1px 3px rgba(0,0,0,0.03)',
                      }
                }
              >
                {loc === 'Pantry' && '🏠 '}
                {loc === 'Fridge' && '❄️ '}
                {loc === 'Freezer' && '🧊 '}
                {loc}
              </button>
            ))}
            <button
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-bark-400 transition-all press-effect"
              style={{
                background: 'rgba(255, 255, 255, 0.25)',
                border: '1px dashed rgba(221, 213, 200, 0.5)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)',
              }}
            >
              + Custom
            </button>
          </div>
        </div>

        {/* Price */}
        <FormField
          label="Price (optional)"
          type="number"
          placeholder="0.00"
          hint="Helps estimate food value"
        />

        {/* Notes */}
        <FormField label="Notes (optional)">
          <textarea
            rows={3}
            placeholder="Any additional notes about this item..."
            className="w-full px-4 py-2.5 rounded-xl text-sm font-body text-bark-700 placeholder:text-bark-300 transition-all duration-200 outline-none resize-none"
            style={{
              background: 'rgba(255, 255, 255, 0.5)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.02), 0 1px 3px rgba(0,0,0,0.04)',
            }}
          />
        </FormField>

        {/* Divider */}
        <div className="glass-divider" />

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Validation toggle for demo */}
          <button
            onClick={() => setShowValidation(!showValidation)}
            className="text-xs text-bark-400 hover:text-bark-500 underline underline-offset-2"
          >
            {showValidation ? 'Hide' : 'Show'} validation preview
          </button>

          <div className="flex items-center gap-3">
            <Button variant="secondary" to="/">
              Cancel
            </Button>
            <Button disabled={showValidation}>
              <Save className="w-4 h-4" />
              Save Item
            </Button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
