<script lang="ts">
    import { createEventDispatcher } from 'svelte';
  
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
    <p class="mt-4 text-center text-gray-600">
      Belum punya akun? <a href="/login" on:click|preventDefault={() => dispatch('toggle')} class="text-blue-600 hover:underline">Daftar sekarang</a>
    </p>
  </div>
</div>
