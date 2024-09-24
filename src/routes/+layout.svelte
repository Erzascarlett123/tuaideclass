<script lang="ts">
  import { page } from '$app/stores'; // Mengambil informasi page dari SvelteKit
  import Navbar from '../component/navbar.svelte'; // Navbar umum (untuk murid)
  import Navbarguru from '../component/navbarguru.svelte'; // Navbar khusus untuk guru
  import "../app.css"; // Pastikan path ini sesuai
  
  // Default untuk menampilkan navbar
  export let showNavbar = true;

  // Menentukan kapan menampilkan navbar atau tidak
  $: if ($page.url.pathname === '/login' || $page.url.pathname === '/signup') {
    // Tidak menampilkan navbar di halaman login dan signup
    showNavbar = false;
  } else {
    showNavbar = true;
  }
</script>

{#if showNavbar}
  {#if $page.url.pathname === '/home%20guru' || $page.url.pathname === '/dashboard%20guru'}
    <!-- Navbar khusus untuk guru di halaman home-guru dan dashboard-guru -->
    <Navbarguru />
  {:else}
    <!-- Navbar umum untuk halaman lain -->
    <Navbar />
  {/if}
{/if}
<!-- Menampilkan navbar sesuai dengan kondisi URL -->

<div class="container mx-auto p-6">
  <slot />
</div>

<style>
  /* Tambahan styling jika diperlukan */
</style>
