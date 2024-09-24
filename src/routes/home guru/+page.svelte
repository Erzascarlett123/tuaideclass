<script lang="ts">
    import { fade } from "svelte/transition";
    import Swal from "sweetalert2";

    let showForm: { X: boolean; XI: boolean; XII: boolean } = {
        X: false,
        XI: false,
        XII: false,
    };

    // Fungsi untuk menampilkan atau menyembunyikan form
    function toggleForm(kelas: keyof typeof showForm) {
        showForm[kelas] = !showForm[kelas];
    }

    // Fungsi untuk menutup form (digunakan tombol Batal)
    function cancelForm(kelas: keyof typeof showForm) {
        showForm[kelas] = false;
    }

    // Fungsi submit tugas
    async function submitTask(event: Event, kelas: keyof typeof showForm) {
        event.preventDefault();
        try {
            // Simulasi pengiriman tugas, bisa diubah menjadi logika submit sebenarnya
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulasi delay
            
            Swal.fire({
                icon: 'success',
                title: 'Pengiriman Berhasil!',
                text: 'Tugas untuk kelas ' + kelas + ' berhasil dikirim!',
                confirmButtonText: 'OK',
            });
            showForm[kelas] = false; // Sembunyikan form setelah submit
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Aduh ada kesalahan!',
                text: 'Gagal mengirim tugas. Silakan coba lagi!',
                confirmButtonText: 'OK',
            });
        }
    }
</script>

<!-- Pastikan Navbarguru ditempatkan di luar <script> -->

<div class="p-4">
    <h2 class="text-2xl font-bold mb-4">Pengiriman Tugas</h2>

    <!-- Kelas X -->
    <div class="bg-blue-100 rounded-lg p-4 mb-6 shadow-md">
        <h3 class="text-xl font-semibold">Kelas X</h3>
        <button
            class="bg-blue-500 text-white py-2 px-4 rounded mt-4"
            on:click={() => toggleForm('X')}>
            Submit
        </button>
        {#if showForm.X}
        <div class="mt-4" transition:fade>
            <!-- Form Pengiriman Tugas -->
            <form class="bg-white p-4 rounded shadow-md border" on:submit|preventDefault={(event) => submitTask(event, 'X')}>
                <label class="block mb-2">
                    Nama Tugas:
                    <input type="text" class="block w-full p-2 border border-gray-300 rounded" required />
                </label>
                <label class="block mb-2">
                    Tanggal Pengumpulan:
                    <input type="date" class="block w-full p-2 border border-gray-300 rounded" required />
                </label>
                <label class="block mb-2">
                    Deskripsi Tugas:
                    <textarea class="block w-full p-2 border border-gray-300 rounded" rows="3" placeholder="Tuliskan deskripsi tugas..." required></textarea>
                </label>
                <label class="block mb-4">
                    Pilih File (Optional):
                    <input type="file" class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                </label>
                <div class="flex justify-between">
                    <button type="submit" class="bg-green-500 text-white py-2 px-4 rounded">
                        Kirim Tugas
                    </button>
                    <button type="button" class="bg-red-500 text-white py-2 px-4 rounded" on:click={() => cancelForm('X')}>
                        Batal
                    </button>
                </div>
            </form>
        </div>
        {/if}
    </div>

    <!-- Kelas XI -->
    <div class="bg-yellow-100 rounded-lg p-4 mb-6 shadow-md">
        <h3 class="text-xl font-semibold">Kelas XI</h3>
        <button
            class="bg-yellow-500 text-white py-2 px-4 rounded mt-4"
            on:click={() => toggleForm('XI')}>
            Submit
        </button>
        {#if showForm.XI}
        <div class="mt-4" transition:fade>
            <!-- Form Pengiriman Tugas -->
            <form class="bg-white p-4 rounded shadow-md border" on:submit|preventDefault={(event) => submitTask(event, 'XI')}>
                <label class="block mb-2">
                    Nama Tugas:
                    <input type="text" class="block w-full p-2 border border-gray-300 rounded" required />
                </label>
                <label class="block mb-2">
                    Tanggal Pengumpulan:
                    <input type="date" class="block w-full p-2 border border-gray-300 rounded" required />
                </label>
                <label class="block mb-2">
                    Deskripsi Tugas:
                    <textarea class="block w-full p-2 border border-gray-300 rounded" rows="3" placeholder="Tuliskan deskripsi tugas..." required></textarea>
                </label>
                <label class="block mb-4">
                    Pilih File (Optional):
                    <input type="file" class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100" />
                </label>
                <div class="flex justify-between">
                    <button type="submit" class="bg-green-500 text-white py-2 px-4 rounded">
                        Kirim Tugas
                    </button>
                    <button type="button" class="bg-red-500 text-white py-2 px-4 rounded" on:click={() => cancelForm('XI')}>
                        Batal
                    </button>
                </div>
            </form>
        </div>
        {/if}
    </div>

    <!-- Kelas XII -->
    <div class="bg-green-100 rounded-lg p-4 mb-6 shadow-md">
        <h3 class="text-xl font-semibold">Kelas XII</h3>
        <button
            class="bg-green-500 text-white py-2 px-4 rounded mt-4"
            on:click={() => toggleForm('XII')}>
            Submit
        </button>
        {#if showForm.XII}
        <div class="mt-4" transition:fade>
            <!-- Form Pengiriman Tugas -->
            <form class="bg-white p-4 rounded shadow-md border" on:submit|preventDefault={(event) => submitTask(event, 'XII')}>
                <label class="block mb-2">
                    Nama Tugas:
                    <input type="text" class="block w-full p-2 border border-gray-300 rounded" required />
                </label>
                <label class="block mb-2">
                    Tanggal Pengumpulan:
                    <input type="date" class="block w-full p-2 border border-gray-300 rounded" required />
                </label>
                <label class="block mb-2">
                    Deskripsi Tugas:
                    <textarea class="block w-full p-2 border border-gray-300 rounded" rows="3" placeholder="Tuliskan deskripsi tugas..." required></textarea>
                </label>
                <label class="block mb-4">
                    Pilih File (Optional):
                    <input type="file" class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" />
                </label>
                <div class="flex justify-between">
                    <button type="submit" class="bg-green-500 text-white py-2 px-4 rounded">
                        Kirim Tugas
                    </button>
                    <button type="button" class="bg-red-500 text-white py-2 px-4 rounded" on:click={() => cancelForm('XII')}>
                        Batal
                    </button>
                </div>
            </form>
        </div>
        {/if}
    </div>
</div>
