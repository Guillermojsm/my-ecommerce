// src/components/ItemListContainer.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProducts } from '../data/products';
import ItemList from './ItemList';

function ItemListContainer({ greeting = 'Catálogo de productos' }) {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getProducts(categoryId).then((data) => {
      if (!cancelled) {
        setItems(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [categoryId]);

  if (loading) {
    return <p style={{ padding: '1rem' }}>Cargando...</p>;
  }

  return (
    <section style={{ padding: '1rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>{greeting}</h2>
      {categoryId && <p style={{ opacity: 0.7, marginBottom: '1rem' }}>Categoría: {categoryId}</p>}
      <ItemList products={items} />
    </section>
  );
}

export default ItemListContainer;