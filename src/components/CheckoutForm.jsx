import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config.js";
import { useCart } from "../context/CartContext.jsx";
import { Link, useNavigate } from "react-router-dom";

export default function CheckoutForm() {
  const { items, totalPrice, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  if (!items.length)
    return (
      <p className="app-container">
        Tu carrito está vacío. <Link to="/cart">Volver</Link>
      </p>
    );

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const form = new FormData(e.currentTarget);
      const buyer = {
        name: form.get("name"),
        email: form.get("email"),
        phone: form.get("phone"),
      };
      const ordersRef = collection(db, "orders");
      const docRef = await addDoc(ordersRef, {
        buyer,
        items,
        total: totalPrice,
        createdAt: serverTimestamp(),
      });
      clear();
      navigate(`/`);
      alert(`Orden creada: ${docRef.id}`);
    } catch (e2) {
      setErr(e2?.message || "Error al procesar la orden");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <form className="form" onSubmit={onSubmit}>
        <h2>Checkout</h2>
        <div>Total a pagar: ${totalPrice}</div>

        <input className="input" name="name" placeholder="Nombre" required />
        <input className="input" name="email" type="email" placeholder="Email" required />
        <input className="input" name="phone" placeholder="Teléfono" required />

        {err && <div style={{ color: "#ffb4b4" }}>{err}</div>}

        <button className="btn-primary" disabled={loading}>
          {loading ? "Generando orden..." : "Finalizar compra"}
        </button>
        <Link className="btn" to="/cart">Volver al carrito</Link>
      </form>
    </div>
  );
}