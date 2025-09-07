// scripts/seed.mjs
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc /*, addDoc */ } from "firebase/firestore";

// lee .env.local usando el flag --env-file de Node 22
const firebaseConfig = {
  apiKey: process.env.VITE_FB_API_KEY,
  authDomain: process.env.VITE_FB_AUTH_DOMAIN,
  projectId: process.env.VITE_FB_PROJECT_ID,
  storageBucket: process.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FB_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FB_APP_ID,
};

// Importar el módulo de productos de forma robusta
const mod = await import(new URL("../src/data/products.js", import.meta.url));
const products = mod.products ?? mod.default; // usa named o default

if (!Array.isArray(products)) {
  throw new Error("src/data/products.js no exporta un array de productos.");
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Si tus objetos tienen 'id', usamos setDoc con ese id.
// Si no, puedes usar addDoc (descomenta arriba e intercambia aquí).
for (const p of products) {
  if (!p.id) throw new Error("Falta 'id' en un producto. Agrega id o usa addDoc.");
  await setDoc(doc(collection(db, "products"), p.id), p);
  console.log("Subido:", p.id);
}
console.log("Productos importados");