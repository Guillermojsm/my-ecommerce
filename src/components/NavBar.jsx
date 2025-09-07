import { Link, NavLink } from "react-router-dom";
import CartWidget from "./CartWidget.jsx";

export default function NavBar() {
  const linkCls = ({ isActive }) =>
    "nav-link" + (isActive ? " is-active" : "");

  return (
    <nav className="topbar">
      <div className="app-container" style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <Link to="/" className="navbar-brand">TECHNO-LAND</Link>

        <div style={{ display: "flex", gap: 14 }}>
          <NavLink to="/category/laptops" className={linkCls}>Laptops</NavLink>
          <NavLink to="/category/celulares" className={linkCls}>Celulares</NavLink>
          <NavLink to="/category/audio" className={linkCls}>Audio</NavLink>
          <NavLink to="/category/perifericos" className={linkCls}>Periféricos</NavLink>
        </div>

        <CartWidget />
      </div>
    </nav>
  );
}