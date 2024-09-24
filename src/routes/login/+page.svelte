<!-- index.svelte -->
<script lang="ts">
    import Login from '../../component/login.svelte';
    import Signup from '../../component/signup.svelte';

    
  
    let isLoginPage = true; // Default ke halaman login
  
    const togglePage = () => {
      isLoginPage = !isLoginPage; // Mengganti antara login dan signup
    };
  </script>
  
  <div>
    {#if isLoginPage}
      <Login on:toggle={togglePage} />
    {:else}
      <Signup on:toggle={togglePage} />
    {/if}
  </div>
  