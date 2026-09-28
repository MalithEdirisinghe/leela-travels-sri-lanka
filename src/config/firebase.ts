import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDF6Qj79fPOe-4n9StDDcbHR2P8JEvnLIY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "leelatravels-8a96d.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "leelatravels-8a96d",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "leelatravels-8a96d.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "843670184206",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:843670184206:web:66047c07ffde1e1558b75f"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
