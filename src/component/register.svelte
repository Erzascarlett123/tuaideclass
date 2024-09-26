import { writable } from 'svelte/store';
import { auth } from '../firebaseConfig'; // Impor konfigurasi Firebase
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Impor untuk pendaftaran pengguna
import { setDoc, doc, getDocs, query, collection, where } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Pastikan Anda mengimpor db dari Firebase

// Definisikan tipe untuk User
interface User {
    uid: string;
    email: string;
    role: string;
}

// Membuat writable store untuk menyimpan auth state
const authStore = writable<{ user: User | null }>({ user: null }); // Tipe untuk writable store

// Fungsi untuk mendaftar pengguna
async function registerUser(email: string, password: string, isGuru: boolean) {
    try {
        // Mendaftar pengguna menggunakan email dan password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Membuat query untuk mengambil jumlah guru yang sudah terdaftar
        const guruQuery = query(collection(db, "users"), where("role", "==", "guru"));
        const guruSnapshot = await getDocs(guruQuery);

        // Tentukan role berdasarkan jumlah guru yang ada
        const role = guruSnapshot.size < 3 ? (isGuru ? 'guru' : 'murid') : 'murid';

        // Simpan informasi pengguna ke Firestore
        await setDoc(doc(db, "users", user.uid), {
            email: email,
            role: role,
            // Tambahkan data lain yang diperlukan sesuai kebutuhan
        });

        console.log("Pengguna berhasil terdaftar dengan role:", role);
        authStore.set({ user: { uid: user.uid, email: user.email, role } }); // Set pengguna di store
    } catch (error) {
        console.error("Error mendaftar pengguna:", error);
        throw new Error(error instanceof Error ? error.message : 'Terjadi kesalahan saat mendaftar'); // Pastikan error yang dilempar adalah instance Error
    }
}

// Ekspor fungsi
export { authStore, registerUser };
