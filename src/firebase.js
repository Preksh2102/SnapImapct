// src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  updateDoc,
  doc,
  where,
  increment
} from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCy84Ch2F9kS5naSkJlhk9kDKWW923cMUM",
  authDomain: "snapimpact-pshe.firebaseapp.com",
  projectId: "snapimpact-pshe",
  storageBucket: "snapimpact-pshe.firebasestorage.app",
  messagingSenderId: "575888872143",
  appId: "1:575888872143:web:fe37daf26ceeb28da49dba",
  measurementId: "G-EJ7B6EKJL4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Export everything you need
export {
  db,
  auth,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  updateDoc,
  doc,
  where,
  increment,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
};
