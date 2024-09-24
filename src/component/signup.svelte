<script lang="ts">
    import { createEventDispatcher } from 'svelte';
  
    const dispatch = createEventDispatcher();
  
    let username = '';
    let password = '';
    let confirmPassword = '';
  
    const handleSignup = async () => {
      if (!username || !password || !confirmPassword) {
        alert('Semua field harus diisi!');
        return;
      }
      if (password !== confirmPassword) {
        alert('Password tidak cocok!');
        return;
      }
      // Logika pendaftaran pengguna
      console.log('Signup:', { username, password });
      // Reset form setelah signup
      username = '';
      password = '';
      confirmPassword = '';
      alert('Pendaftaran berhasil!');
    };
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-100">
  <div class="bg-white p-8 rounded-lg shadow-lg w-96">
    <h2 class="text-2xl font-bold mb-6 text-center">Daftar</h2>
    <form on:submit|preventDefault={handleSignup}>
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
      <div class="mb-4">
        <label for="confirmPassword" class="block text-gray-700">Konfirmasi Password</label>
        <input 
          id="confirmPassword"
          type="password" 
          bind:value={confirmPassword} 
          class="mt-2 block w-full border border-gray-300 rounded p-2" 
          placeholder="Konfirmasi password" 
          required
        />
      </div>
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700">
        Daftar
      </button>
    </form>
    <p class="mt-4 text-center text-gray-600">
      Sudah punya akun? <a href="/login" on:click|preventDefault={() => dispatch('toggle')} class="text-blue-600 hover:underline">Masuk di sini</a>
    </p>
  </div>
</div>
