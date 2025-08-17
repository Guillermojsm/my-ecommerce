import React from 'react';
import { Link } from 'react-router-dom';

function formatCurrency(value) {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    const n = Number(value) || 0;
    return `$${n.toFixed(2)}`;
  }
}

export default function ItemCard({ product }) {
  if (!product) return null;

  const { id, title, price, image } = product;
  const [imgSrc, setImgSrc] = React.useState(image ?? '');

  return (
    <article
      style={{
        background: '#fff',
        border: '1px solid #eee',
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      <Link
        to={`/item/${id}`}
        style={{ display: 'block', color: 'inherit', textDecoration: 'none' }}
        aria-label={`Ver detalle de ${title}`}
      >
        <img
          src={imgSrc}
          alt={title}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setImgSrc('https://placehold.co/800x600?text=Sin+imagen')}
          style={{
            width: '100%',
            aspectRatio: '4 / 3',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </Link>

      <div style={{ padding: '0.75rem 1rem', color: '#111' }}>
        <h3
          style={{
            margin: 0,
            fontSize: 16,
            fontWeight: 600,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          title={title}
        >
          {title}
        </h3>

        {price !== undefined && (
          <p style={{ margin: '0.25rem 0 0.75rem', opacity: 0.8 }}>
            {formatCurrency(price)}
          </p>
        )}

        <Link
          to={`/item/${id}`}
          style={{
            display: 'block',
            width: 'fit-content',
            margin: '0 auto',
            padding: '0.5rem 0.9rem',
            background: '#222',
            color: '#fff',
            borderRadius: 6,
            textAlign: 'center',
            textDecoration: 'none',
          }}
        >
          Ver detalle
        </Link>
      </div>
    </article>
  );
}