import { useState } from "react";
import ItemCount from "./ItemCount.jsx";
import { useCart } from "../context/CartContext.jsx";
import { Link } from "react-router-dom";

export default function ItemDetail({ item }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (qty) => {
    addItem(item, qty);
    setAdded(true);
  };

  return (
    <div className="row g-4 align-items-start">
      <div className="col-12 col-md-6">
        <img src={item.image} alt={item.title} className="img-fluid rounded" />
      </div>
      <div className="col">
        <h2>{item.title}</h2>
        <p className="text-muted">{item.category}</p>
        <p>{item.description}</p>
        <h3 className="fw-bold mb-3">${item.price}</h3>
        {item.stock === 0 && <p className="text-danger">Producto sin stock</p>}
        {!added && item.stock > 0 && (
          <ItemCount stock={item.stock} initial={1} onAdd={handleAdd} />
        )}
        {added && (
          <div className="d-flex gap-2">
            <Link to="/cart" className="btn btn-success">Ir al carrito</Link>
            <Link to="/" className="btn btn-outline-secondary">Seguir comprando</Link>
          </div>
        )}
      </div>
    </div>
  );
}