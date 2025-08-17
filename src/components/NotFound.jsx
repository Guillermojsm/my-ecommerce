import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Página no encontrada</h2>
      <p>Revisa la URL o vuelve al inicio.</p>
      <Link to="/" style={{ textDecoration: 'underline' }}>
        Ir al inicio
      </Link>
    </div>
  );
}

export default NotFound;