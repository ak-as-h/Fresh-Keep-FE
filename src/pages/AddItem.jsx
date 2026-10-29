import { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { Link,useSearchParams,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import GlassCard from '../components/ui/GlassCard';
import FormField from '../components/ui/FormField';
import Button from '../components/ui/Button';
import { addFoodItem,getSingleFoodItem,updateFoodItem } from '../services/AllAPI';
import { useEffect } from 'react';

const categories = [
  'Fruits', 'Vegetables', 'Dairy', 'Meat', 'Seafood',
  'Grains', 'Beverages', 'Snacks', 'Frozen', 'Condiments',
  'Bakery', 'Other',
];

const locations = ['Pantry', 'Fridge', 'Freezer'];

const units = [
  'pcs', 'lbs', 'oz', 'kg', 'g',
  'gallon', 'liters', 'cups', 'dozen', 'bags',
];

const initialFoodData = {
  itemname: '',
  category: '',
  quantity: '',
  unit: '',
  purchaseDate: '',
  expiryDate: '',
  location: '',
  notes: '',
};

const AddItem = () => {
  const [searchParams] = useSearchParams();
const navigate = useNavigate();

const editId = searchParams.get('edit');
const isEditMode = Boolean(editId);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [foodData, setFoodData] = useState(initialFoodData);
  const [loading, setLoading] = useState(false);

  const selectStyle = {
    background: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    boxShadow:
      'inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.02), 0 1px 3px rgba(0,0,0,0.04)',
  };

  const textareaStyle = {
    background: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    boxShadow:
      'inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.02), 0 1px 3px rgba(0,0,0,0.04)',
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFoodData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
useEffect(() => {
  if (!editId) return;

  const fetchItem = async () => {
    try {
      setLoading(true);

      const response = await getSingleFoodItem(editId);
      const item = response.data;

      setFoodData({
        itemname: item.itemname || item.name || '',
        category: item.category || '',
        quantity: item.quantity ?? '',
        unit: item.unit || '',
        purchaseDate: item.purchaseDate || '',
        expiryDate: item.expiryDate || '',
        location: item.location || '',
        notes: item.notes || '',
      });

      setSelectedLocation(item.location || '');
    } catch (error) {
      console.log(error);
      toast.error('Failed to load food item');
    } finally {
      setLoading(false);
    }
  };

  fetchItem();
}, [editId]);
 const handleSubmit = async (e) => {
  e.preventDefault();

  const {
    itemname,
    category,
    quantity,
    purchaseDate,
    expiryDate,
  } = foodData;

  if (
    !itemname.trim() ||
    !category ||
    !quantity ||
    !expiryDate ||
    !selectedLocation
  ) {
    toast.error('Please fill in all required fields');
    return;
  }

  if (!Number.isFinite(Number(quantity)) || Number(quantity) <= 0) {
    toast.error('Quantity must be greater than zero');
    return;
  }

  if (purchaseDate && expiryDate < purchaseDate) {
    toast.error('Expiry date cannot be before purchase date');
    return;
  }

  const payload = {
    ...foodData,
    itemname: itemname.trim(),
    quantity: Number(quantity),
    location: selectedLocation,
  };

  try {
    setLoading(true);

    const response = isEditMode
      ? await updateFoodItem(editId, payload)
      : await addFoodItem(payload);

    if (response.status === 200 || response.status === 201) {
      toast.success(
        isEditMode
          ? 'Food item updated successfully!'
          : 'Food item added successfully!'
      );

      navigate('/inventory');
    }
  } catch (error) {
    console.error('Failed to save food item:', error);
    toast.error(
      isEditMode
        ? 'Failed to update food item'
        : 'Failed to add food item'
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="page-enter max-w-2xl mx-auto space-y-6 pb-8">
      {/* Back link and heading */}
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-bark-400 hover:text-sage-600 transition-colors mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <h1 className="text-2xl sm:text-3xl font-display font-bold text-bark-800">
  {isEditMode ? 'Edit Food Item' : 'Add New Item'}
</h1>

<p className="text-bark-400 text-sm mt-1">
  {isEditMode
    ? 'Update the details of your food item'
    : 'Fill in the details of the food item you want to track'}
</p>
      </div>

      {/* Form card */}
      <GlassCard strong className="p-6 sm:p-8 space-y-6" accent>
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-6"
        >
          {/* Item name */}
          <FormField
            id="itemname"
            name="itemname"
            label="Item Name"
            placeholder="e.g. Organic Whole Milk"
            value={foodData.itemname}
            onChange={handleChange}
            required
          />

          {/* Category */}
          <FormField label="Category" required>
            <select
              name="category"
              className="w-full px-4 py-2.5 rounded-xl text-sm font-body text-bark-700 transition-all duration-200 outline-none appearance-none cursor-pointer"
              style={selectStyle}
              value={foodData.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select a category
              </option>

              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </FormField>

          {/* Quantity and unit */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              id="quantity"
              name="quantity"
              label="Quantity"
              type="number"
              placeholder="1"
              value={foodData.quantity}
              onChange={handleChange}
              required
              min="1"
              step="any"
            />

            <FormField label="Unit">
              <select
                name="unit"
                className="w-full px-4 py-2.5 rounded-xl text-sm font-body text-bark-700 transition-all duration-200 outline-none appearance-none cursor-pointer"
                style={selectStyle}
                value={foodData.unit}
                onChange={handleChange}
              ><option value="" disabled>
                Select unit
              </option>
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </FormField>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              id="purchaseDate"
              name="purchaseDate"
              label="Purchase Date"
              type="date"
              hint="When you bought it"
              value={foodData.purchaseDate}
              onChange={handleChange}
            />

            <FormField
              id="expiryDate"
              name="expiryDate"
              label="Expiry Date"
              type="date"
              hint="Best before or use by date"
              value={foodData.expiryDate}
              onChange={handleChange}
              required
            />
          </div>

          {/* Storage location */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-bark-600">
              Storage Location{' '}
              <span className="text-coral-400">*</span>
            </label>

            <div className="flex flex-wrap gap-2">
              {locations.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  aria-pressed={selectedLocation === loc}
                  onClick={() => {
                    setSelectedLocation(loc);
                    setFoodData((prev) => ({
                      ...prev,
                      location: loc,
                    }));
                  }}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-250 press-effect"
                  style={
                    selectedLocation === loc
                      ? {
                          background:
                            'linear-gradient(135deg, rgba(92,163,80,0.9), rgba(70,125,60,0.9))',
                          color: '#fff',
                          border: '1px solid rgba(255,255,255,0.25)',
                          boxShadow:
                            '0 2px 8px rgba(92,163,80,0.2), inset 0 1px 0 rgba(255,255,255,0.25)',
                        }
                      : {
                          background: 'rgba(255, 255, 255, 0.45)',
                          backdropFilter: 'blur(8px)',
                          color: 'var(--color-bark-500)',
                          border: '1px solid rgba(255, 255, 255, 0.45)',
                          boxShadow:
                            'inset 0 1px 0 rgba(255,255,255,0.4), 0 1px 3px rgba(0,0,0,0.03)',
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
                type="button"
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-bark-400 transition-all press-effect"
                style={{
                  background: 'rgba(255, 255, 255, 0.25)',
                  border: '1px dashed rgba(221, 213, 200, 0.5)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)',
                }}
                onClick={() =>
                  toast.info('Custom storage locations are not implemented yet')
                }
              >
                + Custom
              </button>
            </div>
          </div>

          {/* Notes */}
          <FormField label="Notes (optional)">
            <textarea
              name="notes"
              rows={3}
              value={foodData.notes}
              onChange={handleChange}
              placeholder="Any additional notes about this item..."
              className="w-full px-4 py-2.5 rounded-xl text-sm font-body text-bark-700 placeholder:text-bark-300 transition-all duration-200 outline-none resize-none"
              style={textareaStyle}
            />
          </FormField>

          {/* Divider */}
          <div className="glass-divider" />

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3">
            <Button variant="secondary" to="/">
              Cancel
            </Button>

            <Button type="submit" disabled={loading}>
  <Save className="w-4 h-4" />
  {loading
    ? 'Saving...'
    : isEditMode
      ? 'Save Changes'
      : 'Save Item'}
</Button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};

export default AddItem;
