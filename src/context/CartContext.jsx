import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = (product, qty = 1) => {
    setItems((prev) => {
      const i = prev.findIndex((p) => p.id === product.id);
      if (i === -1) return [...prev, { ...product, qty }];
      const next = [...prev];
      next[i] = { ...next[i], qty: next[i].qty + qty };
      return next;
    });
  };

  const removeItem = (id) => setItems((prev) => prev.filter((p) => p.id !== id));
  const clear = () => setItems([]);
  const totalQty = items.reduce((a, p) => a + p.qty, 0);
  const totalPrice = items.reduce((a, p) => a + p.qty * (p.price || 0), 0);

  const value = useMemo(
    () => ({ items, addItem, removeItem, clear, totalQty, totalPrice }),
    [items, totalQty, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext) || { items: [], addItem: () => {}, removeItem: () => {}, clear: () => {}, totalQty: 0, totalPrice: 0 };
}