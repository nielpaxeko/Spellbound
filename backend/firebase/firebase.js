// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBuF8Kh9hm8V5yOZ0CqCFI3ddoroGpcHzs",
    authDomain: "rover-6375e.firebaseapp.com",
    projectId: "rover-6375e",
    storageBucket: "rover-6375e.appspot.com",
    messagingSenderId: "310936887133",
    appId: "1:310936887133:web:5dccf675850b66fce712b4",
    measurementId: "G-30YELPRQ5E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Export both auth and db
export { app, auth, db };
