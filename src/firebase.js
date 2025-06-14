// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBz3sgXQP199sL5LC0Qvwg7iATvlK5ZwpY",
  authDomain: "aiweddingplanner-bcd85.firebaseapp.com",
  projectId: "aiweddingplanner-bcd85",
  storageBucket: "aiweddingplanner-bcd85.firebasestorage.app",
  messagingSenderId: "752213156618",
  appId: "1:752213156618:web:cff655a10a62cc6115d0f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export the services you want to use
export { auth, db, storage };
export default app;