// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Import getAnalytics hanya jika Anda akan menggunakannya di browser
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-DuEu26i1uLS3SfSl54-20K8swEqiSCk",
  authDomain: "classtuaide.firebaseapp.com",
  projectId: "classtuaide",
  storageBucket: "classtuaide.appspot.com",
  messagingSenderId: "474066682925",
  appId: "1:474066682925:web:3d7ce97347b3006717a4a4",
  measurementId: "G-PKW8LX8JB3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Inisialisasi Firebase Analytics hanya di browser
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { analytics };
