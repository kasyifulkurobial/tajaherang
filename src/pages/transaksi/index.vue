<template>
  <v-container>
    <div>
            <AppHeader title="Data Transaksi" />
    </div>

    <div>
      <!-- Filter Search -->
      <v-row class="mt-8" align="center">
            <!-- Kolom Pencarian -->
            <v-col cols="12" md="5">
                  <SearchComponent
                  v-model="searchQuery"
                  label="Search Warung"
                  />
            </v-col>

            <!-- Kolom Tombol -->
            <v-col cols="12" md="3" class="ml-auto">
                  <AddButton
                  label="Tambah Transaksi"
                  :routePath="addTransactionRoute()"
                  />
            </v-col>

            <!-- Tombol Excel -->
            <v-col cols="12" md="3">
                  <ButtonExcel
                  label="Download Excel"
                  :items="filteredItems"
                  file-name="Laporan Transaksi.xlsx"
                  />
            </v-col>
      </v-row>
    </div>

    <div class="pt-8">
            <!-- Tabel -->
            <TableComponent
                  :headers="headers"
                  :items="filteredItems"
                  item-key="id"
                  items-per-page="5"
            />
    </div>
  </v-container>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import ButtonExcel from '@/components/ButtonExcel.vue';
import SearchComponent from '@/components/SearchComponent.vue';
import AddButton from '@/components/AddComponent.vue';
import TableComponent from '@/components/TableComponent.vue';

export default {
  components: {
    AppHeader,
    ButtonExcel,
    SearchComponent,
    AddButton,
    TableComponent,
  },
  data() {
    return {
      searchQuery: '',
      headers: [
        { title: "ID Transaksi", align: "center", value: "id" },
        { title: "Tanggal", align: "center", value: "tanggal" },
        { title: "Kategori Transaksi", align: "center", value: "kategori" },
        { title: "Deskripsi", align: "center", value: "deskripsi" },
        { title: "Action", align: "center", value: "aksi" },
      ],
      items: [
        { id: "1", tanggal: "20 November 2021", kategori: "Pengeluaran", deskripsi: "Ini Pengeluaran"},
        { id: "2", tanggal: "21 November 2021", kategori: "Pengeluaran", deskripsi: "Ini Pengeluaran 2"},
        { id: "3", tanggal: "22 November 2021", kategori: "Pemasukan", deskripsi: "Ini Pemasukan"},
        { id: "4", tanggal: "23 November 2021", kategori: "Pemasukan", deskripsi: "Ini Pemasukan 2"},
      ],
    };
  },
  computed: {
    filteredItems() {
      const query = this.searchQuery.toLowerCase();
      return this.items.filter(item =>
        item.kategori.toLowerCase().includes(query) ||
        item.deskripsi.toLowerCase().includes(query)
      );
    }
  },
  methods: {
    addTransactionRoute() {
      return '/transaksi/AddTransaksi'; // Rute untuk Tambah Transaksi
    },
    navigateTo(action, id) {
      // Navigasi berdasarkan aksi dan id
      console.log(`Navigasi ke ${action} dengan ID: ${id}`);
    },
    deleteTransaction(id) {
      // Logika untuk menghapus transaksi
      console.log(`Menghapus transaksi dengan ID: ${id}`);
    },
  },
};
</script>
