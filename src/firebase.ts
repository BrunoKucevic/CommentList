// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwYAlmQ7uZpi4k_lpCkMUNYLUG6jXPHsA",
  authDomain: "commentlist-5f76b.firebaseapp.com",
  projectId: "commentlist-5f76b",
  storageBucket: "commentlist-5f76b.appspot.com",
  messagingSenderId: "1066698724613",
  appId: "1:1066698724613:web:b43c6db3210f9dd8c2136c",
  measurementId: "G-VYFSQL10Q2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
