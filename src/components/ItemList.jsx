import ItemCard from "./ItemCard.jsx";

export default function ItemList({ items }) {
  return (
    <div className="row g-3">
      {items.map((p) => (
        <div key={p.id} className="col-12 col-sm-6 col-lg-4">
          <ItemCard item={p} />
        </div>
      ))}
    </div>
  );
}