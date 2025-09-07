import { useState } from "react";
import { addDoc, collection, serverTimestamp, writeBatch, doc, increment } from "firebase/firestore";
import { db } from "../firebase/config.js";
import { useCart } from "../context/CartContext.jsx";
import { Link } from "react-router-dom";

export default function CheckoutForm() {
  const { items, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!items.length) return;
    setSubmitting(true);

    try {
      // 1) Disminuir stock en batch
      const batch = writeBatch(db);
      items.forEach((it) => {
        batch.update(doc(db, "products", it.id), { stock: increment(-it.quantity) });
      });
      await batch.commit();

      // 2) Crear orden
      const order = {
        buyer: form,
        items: items.map((i) => ({ id: i.id, title: i.title, price: i.price, quantity: i.quantity })),
        total: totalPrice,
        createdAt: serverTimestamp(),
      };
      const ref = await addDoc(collection(db, "orders"), order);
      setOrderId(ref.id);
      clearCart();
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al generar la orden");
    } finally {
      setSubmitting(false);
    }
  };

  if (!items.length && orderId) {
    return (
      <div className="container">
        <h3>¡Gracias por tu compra!</h3>
        <p>Tu id de orden es: <strong>{orderId}</strong></p>
        <Link to="/" className="btn btn-primary">Volver al inicio</Link>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="container">
        <p>El carrito está vacío.</p>
        <Link to="/" className="btn btn-primary">Ir al catálogo</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h3>Checkout</h3>
      <p className="text-muted">Total a pagar: ${totalPrice.toFixed(2)}</p>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Nombre</label>
          <input className="form-control" required name="name" value={form.name} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Teléfono</label>
          <input className="form-control" required name="phone" value={form.phone} onChange={handleChange} />
        </div>
        <div className="col-12">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" required name="email" value={form.email} onChange={handleChange} />
        </div>
        <div className="col-12 d-flex gap-2">
          <button disabled={submitting} className="btn btn-success" type="submit">
            {submitting ? "Generando orden..." : "Confirmar compra"}
          </button>
          <Link to="/cart" className="btn btn-outline-secondary">Volver al carrito</Link>
        </div>
      </form>
    </div>
  );
}