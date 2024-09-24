<script lang="ts">
    // Contoh data untuk murid
    let students = [
      { id: 1, name: "Reza Satria", assignmentsSubmitted: true },
      { id: 2, name: "Ayu Lestari", assignmentsSubmitted: false },
      { id: 3, name: "Budi Prasetyo", assignmentsSubmitted: true },
    ];
  </script>
  
  <div>
    <h1 class="text-3xl font-bold text-center mb-6">Dashboard Kelas</h1>
  
    <div class="bg-white shadow-md rounded-lg p-4">
      <h2 class="text-2xl font-semibold mb-4">Daftar Murid</h2>
  
      <table class="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Murid</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status Pengumpulan Tugas</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each students as student}
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">{student.name}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                {#if student.assignmentsSubmitted}
                  <span class="text-green-600">Tugas Dikirim</span>
                {:else}
                  <span class="text-red-600">Tugas Belum Dikirim</span>
                {/if}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
  