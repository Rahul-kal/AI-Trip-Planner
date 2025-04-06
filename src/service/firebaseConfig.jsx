// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWTu5zTykWwSoDN-VwC3LT3iPQO4L7hSM",
  authDomain: "ai-trip-planner-77701.firebaseapp.com",
  projectId: "ai-trip-planner-77701",
  storageBucket: "ai-trip-planner-77701.appspot.com", // 🔧 fixed
  messagingSenderId: "374166524380",
  appId: "1:374166524380:web:544e0cc3f06b7e5a0bbf19",
  measurementId: "G-E7EN656C8N"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
