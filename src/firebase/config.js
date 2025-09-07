// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FB_APP_ID,
};

const missing = Object.entries(firebaseConfig)
  .filter(([, v]) => !v)
  .map(([k]) => k);

if (missing.length) {
  console.warn("Faltan variables de entorno en .env.local:", missing);
}

let app = null;
try {
  if (!missing.length) {
    app = initializeApp(firebaseConfig);
    console.log("[DEBUG] projectId =", firebaseConfig.projectId);
  }
} catch (e) {
  console.error("Error inicializando Firebase:", e);
}

export const db = app ? getFirestore(app) : null;