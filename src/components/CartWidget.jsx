import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function CartWidget() {
  const { totalQuantity } = useCart();
  return (
    <Link to="/cart" className="btn btn-outline-light position-relative">
      <span role="img" aria-label="cart">🛒</span>
      {totalQuantity > 0 && (
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {totalQuantity}
        </span>
      )}
    </Link>
  );
}