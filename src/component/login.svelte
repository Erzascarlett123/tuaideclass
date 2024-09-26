<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { auth, db } from '../firebaseConfig';
  import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
  import { doc, getDoc, setDoc } from 'firebase/firestore';
  import Swal from 'sweetalert2';

  const dispatch = createEventDispatcher();

  let username = '';
  let password = '';

  const handleLogin = async () => {
    if (!username || !password) {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Username dan password harus diisi!',
      });
      return;
    }

    try {
      // Logika autentikasi pengguna (gunakan Firebase Authentication di sini)
      console.log('Login:', { username, password });
      
      // Menampilkan SweetAlert saat login berhasil
      await Swal.fire({
        icon: 'success',
        title: 'Login berhasil!',
        text: 'Selamat datang di aplikasi!',
        confirmButtonText: 'OK'
      });
      
      // Arahkan ke halaman utama setelah menutup SweetAlert
      window.location.href = '/'; // Ganti dengan URL tujuan yang diinginkan
    } catch (error) {
      console.error('Error during login:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Login Gagal',
        text: 'Username atau password salah. Silakan coba lagi.',
      });
    }

    // Reset form setelah login
    username = '';
    password = '';
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Cek apakah pengguna sudah ada di Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        // Jika pengguna sudah ada, munculkan SweetAlert dan arahkan ke halaman utama
        await Swal.fire({
          icon: 'success',
          title: 'Login berhasil!',
          text: 'Selamat datang kembali di web kami!',
          confirmButtonText: 'OK'
        });

        // Arahkan ke halaman utama setelah menutup SweetAlert
        window.location.href = '/';
      } else {
        // Jika pengguna baru, buat dokumen baru di Firestore
        await setDoc(userDocRef, {
          name: user.displayName,
          email: user.email,
          createdAt: new Date()
        });

        // Menampilkan SweetAlert saat akun baru berhasil dibuat dan login berhasil
        await Swal.fire({
          icon: 'success',
          title: 'Akun baru berhasil dibuat!',
          text: 'Selamat datang di web kami!',
          confirmButtonText: 'OK'
        });

        // Arahkan ke halaman utama setelah menutup SweetAlert
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error saat login dengan Google:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Login Gagal',
        text: 'Terjadi kesalahan saat login dengan Google. Silakan coba lagi.',
      });
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
