import { useEffect, useState } from "react";

export default function ItemCount({ stock = 0, initial = 1, onAdd }) {
  const MIN = 1;

  // Normaliza el valor inicial entre MIN y stock
  const normalize = (v) => {
    if (stock <= 0) return 0;
    return Math.min(Math.max(v, MIN), stock);
  };

  const [qty, setQty] = useState(normalize(initial));
  useEffect(() => setQty(normalize(initial)), [stock, initial]);

  const dec = () => setQty((q) => Math.max(q - 1, MIN));
  const inc = () => setQty((q) => Math.min(q + 1, stock));

  const canDec = qty <= MIN;
  const canInc = qty >= stock;
  const canAdd = stock > 0 && qty >= MIN && qty <= stock;

  if (stock <= 0) {
    return <p className="detail-meta" style={{ color: "#ffb4b4" }}>Producto sin stock</p>;
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "auto auto auto", gap: 8, alignItems: "center" }}>
      <button className="btn" onClick={dec} disabled={canDec} aria-label="Quitar uno">-</button>
      <div style={{ textAlign: "center", minWidth: 40 }}>{qty}</div>
      <button className="btn" onClick={inc} disabled={canInc} aria-label="Agregar uno">+</button>

      <button
        className="btn-primary"
        onClick={() => onAdd(qty)}
        disabled={!canAdd}
        style={{ gridColumn: "1 / -1" }}
      >
        Agregar al carrito
      </button>

      <div className="detail-meta" style={{ gridColumn: "1 / -1" }}>
        Stock disponible: {stock}
      </div>
    </div>
  );
}