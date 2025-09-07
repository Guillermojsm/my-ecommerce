import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart() {
  const { items, totalPrice, clearCart } = useCart();
  if (!items.length) {
    return (
      <div className="container">
        <h3>Carrito vacío</h3>
        <Link className="btn btn-primary mt-2" to="/">Ir al catálogo</Link>
      </div>
    );
  }
  return (
    <div className="container">
      <h3 className="mb-3">Tu carrito</h3>
      <div className="list-group mb-3">
        {items.map((p) => <CartItem key={p.id} item={p} />)}
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <h4>Total: ${totalPrice.toFixed(2)}</h4>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-danger" onClick={clearCart}>Vaciar</button>
          <Link className="btn btn-success" to="/checkout">Finalizar compra</Link>
        </div>
      </div>
    </div>
  );
}