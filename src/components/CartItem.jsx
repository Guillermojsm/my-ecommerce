import { useCart } from "../context/CartContext.jsx";

export default function CartItem({ item }) {
  const { removeItem } = useCart();
  return (
    <div className="cartitem">
      <img src={item.image} alt={item.title} />
      <div style={{ flex: 1 }}>
        <div>{item.title}</div>
        <div className="meta">Cant: {item.qty}</div>
      </div>
      <div>${(item.price || 0) * item.qty}</div>
      <button className="btn-danger" onClick={() => removeItem(item.id)}>
        Eliminar
      </button>
    </div>
  );
}