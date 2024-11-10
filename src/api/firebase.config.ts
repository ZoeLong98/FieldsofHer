import { initializeApp, getApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import dotenv from "dotenv";
dotenv.config();

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: "fieldsodher.firebaseapp.com",
//   projectId: "fieldsodher",
//   storageBucket: "fieldsodher.firebasestorage.app",
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MEASUREMENT_ID,
//   databaseURL: "https://fieldsodher-default-rtdb.firebaseio.com",
// };
const firebaseConfig = {
  apiKey: "AIzaSyCSoDmNSirUeZsDLnJ-H-rUzOWM4wLh5lA",
  authDomain: "fieldsodher.firebaseapp.com",
  databaseURL: "https://fieldsodher-default-rtdb.firebaseio.com",
  projectId: "fieldsodher",
  storageBucket: "fieldsodher.firebasestorage.app",
  messagingSenderId: "1064243754593",
  appId: "1:1064243754593:web:f0ee547b2b8871963c9c20",
  measurementId: "G-GCM06HLCYQ",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getDatabase(app);
const auth = getAuth(app);

export { app, db, auth };
