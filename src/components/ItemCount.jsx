import { useState } from "react";

export default function ItemCount({ stock, initial = 1, onAdd }) {
  const [qty, setQty] = useState(initial);
  const dec = () => setQty((q) => Math.max(1, q - 1));
  const inc = () => setQty((q) => Math.min(stock, q + 1));

  return (
    <div className="d-flex align-items-center gap-2">
      <button className="btn btn-outline-secondary" onClick={dec} disabled={qty <= 1}>-</button>
      <span className="px-3">{qty}</span>
      <button className="btn btn-outline-secondary" onClick={inc} disabled={qty >= stock}>+</button>
      <button className="btn btn-primary" onClick={() => onAdd(qty)} disabled={stock === 0}>
        Agregar al carrito
      </button>
    </div>
  );
}