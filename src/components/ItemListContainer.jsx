import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/config.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import ItemList from "./ItemList.jsx";

export default function ItemListContainer() {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let q;
    const ref = collection(db, "products");
    q = categoryId ? query(ref, where("category", "==", categoryId)) : ref;
    setLoading(true);
    getDocs(q)
      .then((snap) => {
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setItems(data);
      })
      .finally(() => setLoading(false));
  }, [categoryId]);

  if (loading) return <p className="container">Cargando productos...</p>;
  if (!items.length) return <p className="container">No hay productos para mostrar.</p>;
  return (
    <div className="container">
      <ItemList items={items} />
    </div>
  );
}