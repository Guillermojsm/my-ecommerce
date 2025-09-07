import { Link } from "react-router-dom";

export default function ItemCard({ item }) {
  const { id, title, price, category, image } = item || {};
  return (
    <article className="product-card">
      <div className="image-wrap">
        <img src={image} alt={title} />
      </div>

      <div className="product-title">{title}</div>
      <div className="product-category">{category}</div>
      <div className="product-price">${price}</div>

      <div className="actions">
        <Link to={`/item/${id}`} className="btn-primary">Ver detalle</Link>
      </div>
    </article>
  );
}