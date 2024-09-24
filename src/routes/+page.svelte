<script lang="ts">
  // Data tugas statis
  let assignments = [
    { id: 1, name: 'Tugas Matematika', dueDate: '2024-09-25', status: 'Sudah Dikumpulkan' },
    { id: 2, name: 'Tugas Bahasa Indonesia', dueDate: '2024-09-26', status: 'Belum Dikumpulkan' },
    { id: 3, name: 'Tugas Sejarah', dueDate: '2024-09-27', status: 'Sudah Dikumpulkan' },
  ];
</script>


<div class="p-4">
  <h2 class="text-xl font-bold mb-4">Daftar Tugas</h2>

  <div class="overflow-x-auto">
    <table class="min-w-full bg-white shadow-md rounded border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
          <th class="py-2 px-4 text-left">Nama Tugas</th>
          <th class="py-2 px-4 text-left">Tanggal Pengumpulan</th>
          <th class="py-2 px-4 text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        {#each assignments as assignment}
          <tr class="border-t border-gray-200">
            <td class="py-2 px-4">{assignment.name}</td>
            <td class="py-2 px-4">{assignment.dueDate}</td>
            <td class="py-2 px-4">
              {#if assignment.status === 'Sudah Dikumpulkan'}
                <span class="text-green-500">✔ {assignment.status}</span>
              {:else}
                <span class="text-red-500">✘ {assignment.status}</span>
              {/if}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
