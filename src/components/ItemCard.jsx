import { Link } from "react-router-dom";

export default function ItemCard({ item }) {
  return (
    <div className="card h-100">
      <img src={item.image} className="card-img-top" alt={item.title} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{item.title}</h5>
        <p className="card-text text-muted">{item.category}</p>
        <p className="mt-auto fw-bold">${item.price}</p>
        <Link className="btn btn-primary w-100" to={`/item/${item.id}`}>Ver detalle</Link>
      </div>
    </div>
  );
}