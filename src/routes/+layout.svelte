<script lang="ts">
  import { onMount } from 'svelte'; 
  import Navbar from './../component/navbar.svelte';
  import Navbarguru from '../component/navbarguru.svelte';
  import { page } from '$app/stores'; 
  import { onAuthStateChanged } from 'firebase/auth';
  import { auth } from '../firebaseConfig';
  import { goto } from '$app/navigation';
  import { doc, getDoc, getDocs, collection, query } from 'firebase/firestore'; 
  import { db } from '../firebaseConfig'; 
  import "../app.css"; 

  let showNavbar = true;

  // Cek autentikasi saat komponen dipasang
  onMount(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
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
                goto('/murid/dashboard kelas'); 
              } else {
                goto('/guru/dashboard guru'); 
              }
            } else if (role === 'murid') {
              goto('/murid/dashboard kelas'); 
            }
          } else {
            console.error("User document does not exist."); // Log jika dokumen tidak ditemukan
            goto('/login'); // Arahkan kembali ke login jika dokumen tidak ditemukan
          }
        } catch (error) {
          console.error("Error fetching user data:", error); // Tangkap dan log kesalahan
          goto('/login'); // Arahkan kembali ke login jika ada kesalahan
        }
      } else {
        // Arahkan ke login jika pengguna belum login
        goto('/login');
      }
    });
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
