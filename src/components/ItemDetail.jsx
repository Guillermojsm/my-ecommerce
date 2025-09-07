import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import ItemCount from "./ItemCount.jsx";

export default function ItemDetail({ item }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const { title, image, price, category, description, stock = 0 } = item;

  const handleAdd = (qty) => {
    addItem(item, qty);
    setAdded(true);
  };

  return (
    <div className="detail-layout">
      <div className="detail-image">
        <img src={image} alt={title} />
      </div>

      <div>
        <h1 className="detail-title">{title}</h1>
        <div className="detail-meta">{category}</div>
        {description && <p className="detail-meta" style={{ marginBottom: 12 }}>{description}</p>}
        <div className="detail-price">${price}</div>

        {stock <= 0 ? (
          <p className="detail-meta" style={{ color: "#ffb4b4" }}>Producto sin stock</p>
        ) : added ? (
          <div style={{ display: "flex", gap: 8 }}>
            <Link className="btn-primary" to="/cart">Ir al carrito</Link>
            <Link className="btn" to="/">Seguir comprando</Link>
          </div>
        ) : (
          <ItemCount stock={stock} initial={1} onAdd={handleAdd} />
        )}
      </div>
    </div>
  );
}