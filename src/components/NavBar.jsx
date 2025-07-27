import CartWidget from './CartWidget';

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <a className="navbar-brand" href="#">Mi Tienda</a>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <a className="nav-link" href="#">Inicio</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Productos</a>
          </li>
        </ul>
        <CartWidget />
      </div>
    </nav>
  );
}