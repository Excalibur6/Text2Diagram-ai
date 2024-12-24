import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAw92_k_dpDUEMTFIzYREDxxUmkeK8HJ84",
  authDomain: "genait2d.firebaseapp.com",
  projectId: "genait2d",
  storageBucket: "genait2d.firebasestorage.app",
  messagingSenderId: "6421467121",
  appId: "1:6421467121:web:5d8649480429560ea07e50",
  measurementId: "G-2YNZVTCH77",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
