import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config.js";
import ItemList from "./ItemList.jsx";

const categoryMap = { celulares: "phones", perifericos: "peripherals", laptops: "laptops", audio: "audio" };

export default function ItemListContainer() {
  const { categoryId } = useParams();
  const normalized = categoryId ? (categoryMap[categoryId] ?? categoryId) : null;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let active = true;

    if (!db) {
      setLoading(false);
      setErrorMsg("Firebase no está inicializado. Revisa tu .env.local y reinicia el servidor.");
      return () => {};
    }

    (async () => {
      setLoading(true);
      setErrorMsg("");
      try {
        const baseRef = collection(db, "products");
        const q = normalized ? query(baseRef, where("category", "==", normalized)) : baseRef;
        const snap = await getDocs(q);
        if (!active) return;
        setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (e) {
        if (!active) return;
        setErrorMsg(e?.message || "Error al cargar productos");
        setItems([]);
      } finally {
        if (!active) return;
        setLoading(false);
      }
    })();

    return () => { active = false; };
  }, [normalized]);

  if (loading) return <p style={{ padding: 16 }}>Cargando...</p>;
  if (errorMsg) return <p style={{ padding: 16, color: "crimson" }}>{errorMsg}</p>;
  return <ItemList items={items} />;
}