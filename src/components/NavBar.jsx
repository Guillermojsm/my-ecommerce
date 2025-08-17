import { Link, NavLink } from 'react-router-dom';
import CartWidget from './CartWidget';
import { getCategories } from '../data/products';

const CATEGORY_LABELS = {
  celulares: ' Smartphones',
  notebooks: ' Laptops',
  accesorios: ' Accesorios',
};

const CATEGORY_ORDER = ['celulares', 'notebooks', 'accesorios'];

const labelFor = (slug) =>
  CATEGORY_LABELS[slug] ?? slug.charAt(0).toUpperCase() + slug.slice(1);

export default function NavBar() {
  const raw = getCategories();

  const categories = [...raw].sort((a, b) => {
    const ai = CATEGORY_ORDER.indexOf(a);
    const bi = CATEGORY_ORDER.indexOf(b);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="brand">TechnoLand</Link>

        <nav className="nav">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav__link active' : 'nav__link')} end>
            Inicio
          </NavLink>

          {categories.map((slug) => (
            <NavLink
              key={slug}
              to={`/category/${encodeURIComponent(slug)}`}
              className={({ isActive }) => (isActive ? 'nav__link active' : 'nav__link')}
            >
              {labelFor(slug)}
            </NavLink>
          ))}
        </nav>

        <CartWidget />
      </div>
    </header>
  );
}