<script lang="ts">
    import { goto } from "$app/navigation";
    import Swal, { type SweetAlertResult } from 'sweetalert2';
  
    let isLoading = false;
  
    // Fungsi untuk navigasi dengan loading spinner
    const navigate = async (path: string) => {
      isLoading = true; // Munculkan spinner
      await goto(path);
      isLoading = false; // Sembunyikan spinner setelah navigasi selesai
    };
  
    const logout = () => {
      Swal.fire({
        title: 'Logout?',
        text: "Anda akan keluar dari aplikasi!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Logout',
        cancelButtonText: 'Batal'
      }).then((result : SweetAlertResult) => {
        if (result.isConfirmed) {
          // Tampilkan pesan sukses logout
          Swal.fire(
            'Logged Out!',
            'Anda telah keluar.',
            'success'
          ).then(() => {
            // Setelah pesan ditampilkan, arahkan ke halaman login
            isLoading = true;
            goto('/login').finally(() => {
              isLoading = false; // Sembunyikan spinner setelah navigasi
            });
          });
        }
      });
    };
  </script>
  
  <!-- Navbar -->
  <nav class="flex justify-between items-center bg-gray-800 text-white p-4">
    <div>
      <a href="/home guru" on:click={() => navigate('/home guru')} class="mr-4">Home</a>
      <a href="/dashboard guru" on:click={() => navigate('/dashboard guru')} class="mr-4">Dashboard</a>
  
    </div>
    <div>
      <button on:click={logout} class="bg-red-500 px-4 py-2 rounded">Logout</button>
    </div>
  </nav>
  
  <!-- Loading Spinner -->
  {#if isLoading}
    <div class="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-75 flex items-center justify-center">
      <div class="loader"></div>
    </div>
  {/if}
  
  <style>
    .loader {
      border: 8px solid #f3f3f3;
      border-radius: 50%;
      border-top: 8px solid #3498db;
      width: 60px;
      height: 60px;
      animation: spin 2s linear infinite;
    }
  
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  
    a {
      cursor: pointer;
      text-decoration: none;
      color: white;
    }
  
    a:hover {
      text-decoration: underline;
    }
  </style>
  