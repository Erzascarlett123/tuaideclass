<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { auth } from '../firebaseConfig';
  import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
  import { doc, setDoc } from 'firebase/firestore';
  import { db } from '../firebaseConfig';

  const dispatch = createEventDispatcher();

  let username = '';
  let password = '';
  let confirmPassword = '';
  let role = 'murid'; // Default role

  const handleSignup = async () => {
      if (!username || !password || !confirmPassword) {
          alert('Semua field harus diisi!');
          return;
      }
      if (password !== confirmPassword) {
          alert('Password tidak cocok!');
          return;
      }

      try {
          // Create a unique email using the username
          const email = `${username}@example.com`;
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;

          // Save user data to Firestore
          await setDoc(doc(db, "users", user.uid), {
              username,
              role,
          });

          // Reset form after signup
          username = '';
          password = '';
          confirmPassword = '';
          alert('Pendaftaran berhasil!');
      } catch (error) {
          console.error('Error saat pendaftaran:', error);
          const errorMessage = (error as { message?: string }).message || 'Pendaftaran gagal!';
          alert('Pendaftaran gagal: ' + errorMessage);
      }
  };

  const handleGoogleSignup = async () => {
      const provider = new GoogleAuthProvider();
      try {
          const result = await signInWithPopup(auth, provider);
          const user = result.user;

          // Save user data to Firestore
          await setDoc(doc(db, "users", user.uid), {
              username: user.displayName || username, // Use Google display name or fallback to username
              role: 'murid', // Default role
          });

          alert('Pendaftaran dengan Google berhasil!');
      } catch (error) {
          console.error('Error saat pendaftaran dengan Google:', error);
          alert('Pendaftaran gagal: ' + (error as { message?: string }).message);
      }
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
          <div class="mb-4">
              <label for="role" class="block text-gray-700">Role</label>
              <select 
                  id="role" 
                  bind:value={role} 
                  class="mt-2 block w-full border border-gray-300 rounded p-2"
              >
                  <option value="murid">Murid</option>
                  <option value="guru">Guru</option>
              </select>
          </div>
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700">
              Daftar
          </button>
      </form>
      <button 
          on:click={handleGoogleSignup} 
          class="flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded w-full hover:bg-red-700 space-x-2 mt-4"
      >
          <img 
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
              alt="Google logo" 
              class="w-5 h-5" 
          />
          <span class="text-center">Daftar dengan Google</span>
      </button>
      <p class="mt-4 text-center text-gray-600">
          Sudah punya akun? <a href="/login" on:click|preventDefault={() => dispatch('toggle')} class="text-blue-600 hover:underline">Masuk di sini</a>
      </p>
  </div>
</div>
