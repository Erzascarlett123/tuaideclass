<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { auth } from '../firebaseConfig';
  import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
  import { doc, getDoc } from 'firebase/firestore';
  import { db } from '../firebaseConfig'; // Pastikan Anda mengimpor db dari Firebase

  const dispatch = createEventDispatcher();

  let username = '';
  let password = '';

  const handleLogin = async () => {
    if (!username || !password) {
      alert('Username dan password harus diisi!');
      return;
    }
    // Logika autentikasi pengguna
    console.log('Login:', { username, password });
    // Reset form setelah login
    username = '';
    password = '';
    alert('Login berhasil!');
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Ambil role dari database Firebase
      const userDoc = await getDoc(doc(db, "users", user.uid)); // Ganti "users" dengan koleksi Anda
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData.role; // Ambil role

        // Simpan role ke dalam local storage
        localStorage.setItem("userRole", role);
        
        // Arahkan ke halaman yang sesuai berdasarkan role
        if (role === "murid") {
          window.location.href = "/home-murid"; // Halaman untuk murid
        } else if (role === "guru") {
          window.location.href = "/home-guru"; // Halaman untuk guru
        }
      }
      
      alert('Login dengan Google berhasil!');
    } catch (error) {
      console.error('Error saat login dengan Google:', error);
    }
  };
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-100">
  <div class="bg-white p-8 rounded-lg shadow-lg w-96">
    <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
    <form on:submit|preventDefault={handleLogin}>
      <div class="mb-4">
        <label for="username" class="block text-gray-700">Username</label>
        <input 
          id="username"
          type="text" 
          bind:value={username} 
          class="mt-2 block w-full border border-gray-300 rounded p-2" 
          placeholder="Masukkan username" 
          required
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-gray-700">Password</label>
        <input 
          id="password"
          type="password" 
          bind:value={password} 
          class="mt-2 block w-full border border-gray-300 rounded p-2" 
          placeholder="Masukkan password" 
          required
        />
      </div>
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700">
        Masuk
      </button>
    </form>
    <div class="flex items-center justify-center mt-4">
      <button 
        on:click={handleGoogleLogin} 
        class="flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded w-full hover:bg-red-700 space-x-2"
      >
        <img 
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
          alt="Google logo" 
          class="w-5 h-5" 
        />
        <span class="text-center">Login dengan Google</span>
      </button>
    </div>
    <p class="mt-4 text-center text-gray-600">
      Belum punya akun? 
      <a href="/login" on:click|preventDefault={() => dispatch('toggle')} class="text-blue-600 hover:underline">Daftar sekarang</a>
    </p>
  </div>
</div>
