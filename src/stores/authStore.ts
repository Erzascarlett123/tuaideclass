import { writable } from 'svelte/store';
import { auth } from '../firebaseConfig'; // Impor konfigurasi Firebase
import { setDoc, doc, getDocs, query, collection, where } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Pastikan Anda mengimpor db dari Firebase

const authStore = writable({ user: null });

// Fungsi untuk mendaftar pengguna
async function registerUser(email: string, password: string, isGuru: boolean) {
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const guruQuery = query(collection(db, "users"), where("role", "==", "guru"));
        const guruSnapshot = await getDocs(guruQuery);

        // Tentukan role berdasarkan jumlah guru yang ada
        const role = guruSnapshot.size < 3 ? (isGuru ? 'guru' : 'murid') : 'murid';

        // Simpan informasi pengguna ke Firestore
        await setDoc(doc(db, "users", user.uid), {
            email: email,
            role: role,
            // Tambahkan data lain yang diperlukan
        });

        console.log("Pengguna berhasil terdaftar dengan role:", role);
        authStore.set({ user }); // Set pengguna di store
    } catch (error) {
        console.error("Error mendaftar pengguna:", error);
    }
}

// Ekspor fungsi
export { authStore, registerUser };
