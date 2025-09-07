import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function CartWidget() {
  const { totalQty } = useCart();
  return (
    <Link to="/cart" aria-label="Carrito" style={{ textDecoration: "none" }}>
      <span role="img" aria-label="cart">🛒</span>
      {totalQty > 0 && <span style={{ marginLeft: 6 }}>({totalQty})</span>}
    </Link>
  );
}