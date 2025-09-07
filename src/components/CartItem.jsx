import { useCart } from "../context/CartContext.jsx";

export default function CartItem({ item }) {
  const { removeItem } = useCart();
  return (
    <div className="list-group-item d-flex align-items-center gap-3">
      <img src={item.image} alt={item.title} width="64" height="64" className="rounded object-fit-cover"/>
      <div className="flex-grow-1">
        <div className="fw-semibold">{item.title}</div>
        <div className="text-muted">x{item.quantity} • ${item.price} c/u</div>
      </div>
      <div className="fw-bold me-3">${(item.quantity * item.price).toFixed(2)}</div>
      <button className="btn btn-sm btn-outline-danger" onClick={() => removeItem(item.id)}>Eliminar</button>
    </div>
  );
}