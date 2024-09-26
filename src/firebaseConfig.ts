// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Impor fungsi untuk autentikasi
import { getFirestore } from "firebase/firestore"; // Impor fungsi untuk Firestore
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
export const auth = getAuth(app); // Mendapatkan instansi auth
export const db = getFirestore(app); // Mendapatkan instansi Firestore

// Inisialisasi Firebase Analytics hanya di browser
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app); // Hanya menginisialisasi di sisi klien
}

// Ekspor analytics jika diperlukan
export { analytics };
