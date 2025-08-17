import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../data/products';
import ItemDetail from './ItemDetail';

function ItemDetailContainer() {
  const { itemId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getProductById(itemId).then((data) => {
      if (!cancelled) {
        setProduct(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [itemId]);

  if (loading) return <p style={{ padding: '1rem' }}>Cargando...</p>;
  if (!product) return <p style={{ padding: '1rem' }}>Producto no encontrado.</p>;

  return (
    <section style={{ padding: '1rem' }}>
      <ItemDetail product={product} />
    </section>
  );
}

export default ItemDetailContainer;