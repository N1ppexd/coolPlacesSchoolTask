import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, serverTimestamp, collection,
  getDocs, query, orderBy, onSnapshot
 } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.PUBLIC_EXPO_API_KEY,
  authDomain: process.env.PUBLIC_EXPO_AUTH_DOMAIN,
  projectId: process.env.PUBLIC_EXPO_PROJECT_ID,
  storageBucket: process.env.PUBLIC_EXPO_STORAGE_BUCKET,
  messagingSenderId: process.env.PUBLIC_EXPO_MESSAGING_SENDER_ID,
  appId: process.env.PUBLIC_EXPO_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const COOLPLACES = 'coolPlaces';

export { 
  db, 
  addDoc, 
  serverTimestamp, 
  collection, 
  COOLPLACES,

  getDocs,
  query,
  orderBy,
  onSnapshot
};