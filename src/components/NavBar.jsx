import { Link, NavLink } from "react-router-dom";
import CartWidget from "./CartWidget.jsx";

export default function NavBar() {
  const categories = [
    { id: "laptops", label: "Laptops" },
    { id: "phones", label: "Celulares" },
    { id: "audio", label: "Audio" },
    { id: "peripherals", label: "Periféricos" },
  ];

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">My E‑commerce</Link>
        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav" type="button">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div id="nav" className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {categories.map((c) => (
              <li className="nav-item" key={c.id}>
                <NavLink className="nav-link" to={`/category/${c.id}`}>
                  {c.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <CartWidget />
        </div>
      </div>
    </nav>
  );
}