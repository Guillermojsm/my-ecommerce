// scripts/seed.mjs
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { products } from "../src/data/products.js"; // ajustá la ruta si tu archivo está en otro lugar

// Lee credenciales desde .env.local (usando --env-file con Node 20.6+)
const firebaseConfig = {
  apiKey: process.env.VITE_FB_API_KEY,
  authDomain: process.env.VITE_FB_AUTH_DOMAIN,
  projectId: process.env.VITE_FB_PROJECT_ID,
  storageBucket: process.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FB_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FB_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

for (const p of products) {
  // si tu objeto no trae id, podés usar addDoc en vez de setDoc
  const ref = doc(collection(db, "products"), p.id);
  await setDoc(ref, p);
  console.log("Subido:", p.id || p.title);
}

console.log("Productos importados");