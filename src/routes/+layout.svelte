<script lang="ts">
  import Navbar from './../component/navbar.svelte';
  import Navbarguru from '../component/navbarguru.svelte';
  import { page } from '$app/stores'; // Untuk mengakses informasi URL saat ini
  import { onAuthStateChanged } from 'firebase/auth'; // Untuk memantau status autentikasi
  import { auth } from '../firebaseConfig'; // Impor konfigurasi Firebase
  import { goto } from '$app/navigation'; // Untuk navigasi
  import { doc, getDoc, getDocs, collection, query } from 'firebase/firestore'; // Untuk mengakses Firestore
  import { db } from '../firebaseConfig'; // Pastikan Anda mengimpor db dari Firebase
  import "../app.css"; // Impor CSS Anda untuk styling

  let showNavbar = true;

  // Cek apakah pengguna sudah login dan arahkan berdasarkan peran
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Pengguna sudah login, ambil peran pengguna dari Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData.role;

        // Jika role adalah 'guru', pastikan hanya ada 3 pengguna guru
        if (role === 'guru') {
          const q = query(collection(db, "users"));
          const querySnapshot = await getDocs(q);
          const guruCount = querySnapshot.docs.filter(doc => doc.data().role === 'guru').length;

          // Jika sudah ada 3 guru, arahkan ke dashboard murid
          if (guruCount >= 3) {
            goto('/murid/dashboard kelas'); // Ganti dengan path dashboard murid Anda
          } else {
            goto('/guru/dashboard guru'); // Ganti dengan path dashboard guru Anda
          }
        } else if (role === 'murid') {
          goto('/murid/dashboard kelas'); // Ganti dengan path dashboard murid Anda
        }
      }
    } else {
      // Arahkan ke login jika pengguna belum login
      goto('/login');
    }
  });

  // Kondisi untuk menyembunyikan navbar pada path tertentu
  $: {
    const hideNavbarOnPaths = ['/login', '/signup'];
    showNavbar = !hideNavbarOnPaths.includes($page.url.pathname);
  }
</script>

{#if showNavbar}
  {#if $page.url.pathname.includes('guru')}
    <Navbarguru />
  {:else}
    <Navbar />
  {/if}
{/if}

<div class="container mx-auto p-6">
  <slot /> <!-- Slot untuk merender komponen anak -->
</div>

<style>
  /* Styling tambahan jika diperlukan */
</style>
