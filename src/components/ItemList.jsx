import ItemCard from './ItemCard';

function ItemList({ products }) {
  if (!products.length) {
    return <p>No hay productos para mostrar.</p>;
  }
  return (
    <div
      style={{
        display: 'grid',
        gap: '1rem',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
      }}
    >
      {products.map((p) => (
        <ItemCard key={p.id} product={p} />
      ))}
    </div>
  );
}

export default ItemList;