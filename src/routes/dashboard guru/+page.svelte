<script lang="ts">
    import Swal from 'sweetalert2';
  
    // Data siswa yang sudah atau belum mengumpulkan tugas
    const kelasX = [
        { nama: "Reza", status: "Sudah Mengumpulkan" },
        { nama: "Satria", status: "Belum Mengumpulkan" },
        { nama: "Septian", status: "Sudah Mengumpulkan" },
    ];
  
    const kelasXI = [
        { nama: "Agus", status: "Sudah Mengumpulkan" },
        { nama: "Budi", status: "Belum Mengumpulkan" },
        { nama: "Dedi", status: "Sudah Mengumpulkan" },
    ];
  
    const kelasXII = [
        { nama: "Wawan", status: "Belum Mengumpulkan" },
        { nama: "Yudi", status: "Sudah Mengumpulkan" },
        { nama: "Zaki", status: "Belum Mengumpulkan" },
    ];
  
    let selectedKelas: string = "X"; // Kelas yang dipilih pertama kali (default: X)
  
    // Fungsi untuk mengubah kelas yang ditampilkan
    function selectKelas(kelas: string) {
        selectedKelas = kelas;
    }
  
    // Fungsi untuk SweetAlert saat status di-klik
    function showStatus(nama: string, status: string) {
        Swal.fire({
            title: `Status ${nama}`,
            text: `${nama} ${status.toLowerCase()} tugas.`,
            icon: status === "Sudah Mengumpulkan" ? 'success' : 'error',
            confirmButtonText: 'OK',
        });
    }
  </script>
  
  <style>
  
    .slide-up {
        transform: translateY(0);
        transition: transform 0.3s ease-in;
    }
  
    table {
        width: 100%;
        border-collapse: collapse;
    }
  
    table, th, td {
        border: 1px solid black;
    }
  
    th, td {
        padding: 12px;
        text-align: left;
    }
  
    th {
        background-color: #f2f2f2;
    }
  
    td.status {
        cursor: pointer;
    }
  
    td.status.sudah {
        color: green;
        font-weight: bold;
    }
  
    td.status.belum {
        color: red;
        font-weight: bold;
    }
  </style>
  
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">Dashboard Guru</h2>
  
    <!-- Tombol untuk memilih kelas -->
    <div class="flex space-x-4 mb-4">
        <button class="bg-blue-500 text-white py-2 px-4 rounded" on:click={() => selectKelas("X")}>
            Kelas X
        </button>
        <button class="bg-yellow-500 text-white py-2 px-4 rounded" on:click={() => selectKelas("XI")}>
            Kelas XI
        </button>
        <button class="bg-green-500 text-white py-2 px-4 rounded" on:click={() => selectKelas("XII")}>
            Kelas XII
        </button>
    </div>
  
    <!-- Tabel murid berdasarkan kelas yang dipilih -->
    {#if selectedKelas === "X"}
        <div class="slide-up">
            <h3 class="text-xl font-semibold mb-4">Daftar Murid Kelas X</h3>
            <table>
                <thead>
                    <tr>
                        <th>Nama Murid</th>
                        <th>Status Pengumpulan</th>
                    </tr>
                </thead>
                <tbody>
                    {#each kelasX as murid}
                    <tr>
                        <td>{murid.nama}</td>
                        <td class="status {murid.status === 'Sudah Mengumpulkan' ? 'sudah' : 'belum'}" on:click={() => showStatus(murid.nama, murid.status)}>
                            {murid.status}
                        </td>
                    </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    {/if}
  
    {#if selectedKelas === "XI"}
        <div class="slide-up">
            <h3 class="text-xl font-semibold mb-4">Daftar Murid Kelas XI</h3>
            <table>
                <thead>
                    <tr>
                        <th>Nama Murid</th>
                        <th>Status Pengumpulan</th>
                    </tr>
                </thead>
                <tbody>
                    {#each kelasXI as murid}
                    <tr>
                        <td>{murid.nama}</td>
                        <td class="status {murid.status === 'Sudah Mengumpulkan' ? 'sudah' : 'belum'}" on:click={() => showStatus(murid.nama, murid.status)}>
                            {murid.status}
                        </td>
                    </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    {/if}
  
    {#if selectedKelas === "XII"}
        <div class="slide-up">
            <h3 class="text-xl font-semibold mb-4">Daftar Murid Kelas XII</h3>
            <table>
                <thead>
                    <tr>
                        <th>Nama Murid</th>
                        <th>Status Pengumpulan</th>
                    </tr>
                </thead>
                <tbody>
                    {#each kelasXII as murid}
                    <tr>
                        <td>{murid.nama}</td>
                        <td class="status {murid.status === 'Sudah Mengumpulkan' ? 'sudah' : 'belum'}" on:click={() => showStatus(murid.nama, murid.status)}>
                            {murid.status}
                        </td>
                    </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    {/if}
  </div>
  