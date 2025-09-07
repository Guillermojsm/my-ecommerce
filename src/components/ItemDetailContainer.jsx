import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/config.js";
import { doc, getDoc } from "firebase/firestore";
import ItemDetail from "./ItemDetail.jsx";

export default function ItemDetailContainer() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getDoc(doc(db, "products", id))
      .then((snap) => snap.exists() ? setItem({ id: snap.id, ...snap.data() }) : setItem(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="container">Cargando detalle...</p>;
  if (!item) return <p className="container">Producto no encontrado.</p>;
  return (
    <div className="container">
      <ItemDetail item={item} />
    </div>
  );
}