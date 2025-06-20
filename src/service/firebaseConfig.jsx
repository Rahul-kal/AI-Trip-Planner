// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUJVg717q6GknwEIWBQhhEoW61BGgTiMA",
  authDomain: "ai-trip-planner-a91c4.firebaseapp.com",
  projectId: "ai-trip-planner-a91c4",
  storageBucket: "ai-trip-planner-a91c4.firebasestorage.app",
  messagingSenderId: "1011539233573",
  appId: "1:1011539233573:web:e7a5190db7a778cb3ee8cc",
  measurementId: "G-G2NDM243TN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);