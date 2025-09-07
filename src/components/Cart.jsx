import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart() {
  const { items, clear, totalPrice } = useCart();

  if (!items.length) {
    return <p className="app-container">El carrito está vacío.</p>;
  }

  return (
    <div className="app-container">
      <div className="cartlist">
        {items.map((it) => <CartItem key={it.id} item={it} />)}
      </div>

      <div className="toolbar">
        <strong>Total: ${totalPrice}</strong>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn" onClick={clear}>Vaciar</button>
          <Link className="btn-primary" to="/checkout">Ir al checkout</Link>
        </div>
      </div>
    </div>
  );
}