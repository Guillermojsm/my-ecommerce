import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config.js";
import ItemDetail from "./ItemDetail.jsx";

export default function ItemDetailContainer() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      setErrorMsg("");
      try {
        const ref = doc(db, "products", itemId);
        const snap = await getDoc(ref);
        if (!active) return;
        setItem(snap.exists() ? { id: snap.id, ...snap.data() } : null);
      } catch (e) {
        if (!active) return;
        setErrorMsg(e?.message || "Error al cargar el producto");
        setItem(null);
      } finally {
        if (!active) return;
        setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [itemId]);

  if (loading) return <p className="app-container">Cargando...</p>;
  if (errorMsg) return <p className="app-container" style={{ color: "crimson" }}>{errorMsg}</p>;
  if (!item) return <p className="app-container">Producto no encontrado.</p>;

  return (
    <div className="detail-page">
      <div className="app-container">
        <ItemDetail item={item} />
      </div>
    </div>
  );
}