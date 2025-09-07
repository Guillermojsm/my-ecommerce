import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
};

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // {id, title, price, image, stock, quantity}

  const addItem = (product, quantity) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);
      if (idx !== -1) {
        const copy = [...prev];
        const newQty = Math.min(copy[idx].quantity + quantity, product.stock);
        copy[idx] = { ...copy[idx], quantity: newQty };
        return copy;
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeItem = (id) => setItems((prev) => prev.filter((p) => p.id !== id));
  const clearCart = () => setItems([]);

  const totalQuantity = useMemo(
    () => items.reduce((sum, p) => sum + p.quantity, 0),
    [items]
  );
  const totalPrice = useMemo(
    () => items.reduce((sum, p) => sum + p.quantity * p.price, 0),
    [items]
  );

  const value = { items, addItem, removeItem, clearCart, totalQuantity, totalPrice };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}