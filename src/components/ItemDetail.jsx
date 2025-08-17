import { useState } from 'react';

function ItemDetail({ product }) {
  const { title, description, price, image, stock } = product;

  const handleAdd = (qty) => {
    console.log(`Agregado al carrito: ${qty} unidad(es) de ${title}`);
    alert(`Agregado al carrito: ${qty} unidad(es) de ${title}`);
  };

  return (
    <div
      style={{
        display: 'grid',
        gap: '1rem',
        gridTemplateColumns: 'minmax(260px, 520px) 1fr',
        alignItems: 'start',
      }}
    >
      <img
        src={image}
        alt={title}
        style={{ width: '100%', borderRadius: 12, objectFit: 'cover' }}
      />

      <div>
        <h2 style={{ marginTop: 0 }}>{title}</h2>
        <p style={{ opacity: 0.8 }}>{description}</p>
        <p style={{ fontWeight: 700, fontSize: 20, margin: '0.5rem 0 1rem' }}>${price}</p>
        <ItemCount stock={stock} initial={1} onAdd={handleAdd} />
      </div>
    </div>
  );
}

function ItemCount({ stock, initial = 1, onAdd }) {
  const [qty, setQty] = useState(initial);

  const dec = () => setQty((q) => Math.max(1, q - 1));
  const inc = () => setQty((q) => Math.min(stock, q + 1));

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <button onClick={dec} disabled={qty <= 1}>
        -
      </button>
      <span style={{ minWidth: 28, textAlign: 'center' }}>{qty}</span>
      <button onClick={inc} disabled={qty >= stock}>
        +
      </button>
      <button
        onClick={() => onAdd(qty)}
        disabled={stock === 0}
        style={{
          marginLeft: 8,
          padding: '0.5rem 0.75rem',
          background: '#222',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          cursor: 'pointer',
        }}
      >
        Agregar al carrito
      </button>
      {stock === 0 && <span style={{ marginLeft: 8, color: 'crimson' }}>Sin stock</span>}
    </div>
  );
}

export default ItemDetail;