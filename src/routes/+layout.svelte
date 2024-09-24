<script lang="ts">
  import { page } from '$app/stores'; // Mengambil informasi page dari SvelteKit
  import Navbar from '../component/navbar.svelte'; // Navbar umum (untuk murid)
  import Navbarguru from '../component/navbarguru.svelte'; // Navbar khusus untuk guru
  import "../app.css"; // Pastikan path ini sesuai
  export let showNavbar = true; // Default untuk menampilkan navbar
</script>

<!-- Menampilkan navbar sesuai dengan kondisi URL -->
{#if showNavbar}
  {#if $page.url.pathname === '/home guru' || $page.url.pathname === '/dashboard guru'}
    <!-- Navbar khusus untuk guru di halaman home-guru dan dashboard-guru -->
    <Navbar />
  {:else}
    <!-- Navbar umum untuk halaman lain -->
    <Navbar />
  {/if}
{/if}


<div class="container mx-auto p-6">
  <slot />
</div>

<style>
  /* Tambahan styling jika diperlukan */
</style>
