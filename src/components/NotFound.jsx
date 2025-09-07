import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="app-container">
      <h2>Página no encontrada</h2>
      <p>Revisa la URL o vuelve al inicio.</p>
      <Link to="/" style={{ textDecoration: "underline" }}>Ir al inicio</Link>
    </div>
  );
}