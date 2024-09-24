<script lang="ts">
    let studentName = '';
    let selectedClass = 'X'; // Default kelas
    let submissionDate = '';
    let taskFile: File | null = null;
  
    const handleFileChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        taskFile = target.files[0];
      }
    };
  
    const submitTask = async () => {
      if (!studentName || !selectedClass || !submissionDate || !taskFile) {
        alert('Semua field harus diisi!');
        return;
      }
  
      // Logika untuk mengirimkan tugas ke guru
      console.log('Tugas yang dikirim:', { studentName, selectedClass, submissionDate, taskFile });
      
      // Reset form setelah pengiriman
      studentName = '';
      selectedClass = 'X';
      submissionDate = '';
      taskFile = null;
      alert('Tugas berhasil dikirim!');
    };
  </script>
  
  <div class="container mx-auto p-6 bg-white rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold mb-4">Pengiriman Tugas</h2>
    
    <form on:submit|preventDefault={submitTask}>
      <div class="mb-4">
        <label for="studentName" class="block text-gray-700">Nama Siswa</label>
        <input 
          id="studentName"
          type="text" 
          bind:value={studentName} 
          class="mt-2 block w-full border border-gray-300 rounded p-2" 
          placeholder="Masukkan nama siswa" 
          required
        />
      </div>
  
      <div class="mb-4">
        <label for="classSelect" class="block text-gray-700">Kelas</label>
        <select 
          id="classSelect"
          bind:value={selectedClass} 
          class="mt-2 block w-full border border-gray-300 rounded p-2" 
          required
        >
          <option value="X">Kelas X</option>
          <option value="XI">Kelas XI</option>
          <option value="XII">Kelas XII</option>
        </select>
      </div>
  
      <div class="mb-4">
        <label for="submissionDate" class="block text-gray-700">Tanggal Pengiriman</label>
        <input 
          id="submissionDate"
          type="date" 
          bind:value={submissionDate} 
          class="mt-2 block w-full border border-gray-300 rounded p-2" 
          required
        />
      </div>
  
      <div class="mb-4">
        <label for="taskFile" class="block text-gray-700">Upload File Tugas</label>
        <input 
          id="taskFile"
          type="file" 
          on:change={handleFileChange} 
          class="mt-2 block w-full border border-gray-300 rounded p-2" 
          required
        />
      </div>
  
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Kirim Tugas
      </button>
    </form>
  </div>
  
  <style>
    /* Tambahan CSS jika diperlukan */
  </style>
  