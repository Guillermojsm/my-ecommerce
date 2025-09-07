import ItemCard from "./ItemCard.jsx";

export default function ItemList({ items }) {
  if (!items?.length) {
    return <p className="app-container">No hay productos para mostrar.</p>;
  }
  return (
    <div className="app-container">
      <div className="product-grid">
        {items.map((p) => <ItemCard key={p.id} item={p} />)}
      </div>
    </div>
  );
}