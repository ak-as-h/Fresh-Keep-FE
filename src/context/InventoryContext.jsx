/**
 * InventoryContext — global React state for all food items.
 * Provides CRUD operations and the items array to the whole app.
 * No persistence — resets on page reload by design.
 */
import { createContext, useContext, useState, useCallback } from 'react';

const InventoryContext = createContext(null);

let nextId = 1;
function generateId() {
  return String(nextId++);
}

export function InventoryProvider({ children }) {
  const [items, setItems] = useState([]);

  /** Add a new item. Returns the new item's id. */
  const addItem = useCallback((data) => {
    const id = generateId();
    const newItem = { ...data, id };
    setItems((prev) => [newItem, ...prev]);
    return id;
  }, []);

  /** Replace an existing item's data by id. */
  const updateItem = useCallback((id, data) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...data, id } : item))
    );
  }, []);

  /** Remove an item by id. */
  const deleteItem = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  /** Look up a single item by id. Returns undefined if not found. */
  const getItem = useCallback(
    (id) => items.find((item) => item.id === id),
    [items]
  );

  return (
    <InventoryContext.Provider value={{ items, addItem, updateItem, deleteItem, getItem }}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const ctx = useContext(InventoryContext);
  if (!ctx) throw new Error('useInventory must be used inside InventoryProvider');
  return ctx;
}
