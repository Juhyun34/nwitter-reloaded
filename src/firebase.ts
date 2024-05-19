import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAc8ceWP82ce2fjFwFx1EWjnu-T7l8rBhU",
  authDomain: "nwitter-reloaded-6b09c.firebaseapp.com",
  projectId: "nwitter-reloaded-6b09c",
  storageBucket: "nwitter-reloaded-6b09c.appspot.com",
  messagingSenderId: "61249863195",
  appId: "1:61249863195:web:23b7eae246ab54d4d102be",
  measurementId: "G-LHGDHQ80W3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);