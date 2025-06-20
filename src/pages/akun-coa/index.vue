<template>
  <v-container>
    <div>
      <AppHeader title="Data Akun(COA)" />
    </div>

    <div>
      <!-- Filter Search -->
      <v-row class="mt-8" align="center">
        <!-- Kolom Pencarian -->
        <v-col cols="12" md="5">
          <SearchComponent v-model="searchQuery" label="Search Akun" />
        </v-col>

        <!-- Kolom Tombol -->
        <v-col cols="12" md="3" class="ml-auto">
          <AddButton label="Tambah Akun(COA)" :routePath="addAccountCOA()" />
        </v-col>

        <!-- Tombol Excel -->
        <v-col cols="12" md="3">
          <v-btn
            class="bg-cyan-darken-4 text-white"
            rounded="xs"
            size="x-large"
            @click="downloadExcel"
          >
            <v-icon icon="mdi-download" class="mr-2" />
            Download Excel
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <div class="pt-8">
      <div class="mx-auto" >
        <v-list v-model:opened="open">
              <v-list-item
                prepend-icon="mdi-page-layout-header"
                title="10111 - Kas Kecil"
              ></v-list-item>
          <v-list-group value="Users">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                prepend-icon="mdi-page-layout-header"
                title="20133 - Aktiva Lancar"
                class=" bg-cyan-darken-3"
              ></v-list-item>
            </template>

            <v-list-item
                v-for="([title, icon], i) in aktiva"
                :key="i"
                :prepend-icon="icon"
                :title="title"
                :value="title"
              ></v-list-item>

          </v-list-group>
        </v-list>
      </div>
    </div>
  </v-container>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import ButtonExcel from "@/components/ButtonExcel.vue";
import SearchComponent from "@/components/SearchComponent.vue";
import AddButton from "@/components/AddComponent.vue";
import TableComponent from "@/components/TableComponent.vue";
import * as XLSX from "xlsx";

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
      fileName: "Laporan Akun COA.xlsx",
      searchQuery: "",
      headers: [
        { title: "ID", align: "center", value: "id" },
        { title: "Kode", align: "center", value: "kode" },
        { title: "Nama", align: "center", value: "nama" },
        { title: "Kategori", align: "center", value: "kategori" },
        { title: "Tipe Akun", align: "center", value: "tipe" },
        { title: "Deskripsi", align: "center", value: "deskripsi" },
        { title: "Action", align: "center", value: "aksiAccount" },
      ],
      items: [
        {
          id: "1",
          kode: "1-00012",
          nama: "Kas",
          kategori: "Kas & Bank",
          tipe: "Debit",
          deskripsi: "-",
        },
        {
          id: "2",
          kode: "1-00013",
          nama: "Kas",
          kategori: "Kas & Bank",
          tipe: "Debit",
          deskripsi: "-",
        },
        {
          id: "3",
          kode: "1-00014",
          nama: "Kas",
          kategori: "Kas & Bank",
          tipe: "Debit",
          deskripsi: "-",
        },
        {
          id: "4",
          kode: "1-00015",
          nama: "Kas",
          kategori: "Kas & Bank",
          tipe: "Debit",
          deskripsi: "-",
        },
      ],
      open: ['Users'],
      aktiva: [
        ['20133 1 - Aktiva Tetap', 'mdi-subdirectory-arrow-right'],
        ['20133 2 - Aktiva X', 'mdi-subdirectory-arrow-right'],
      ],
      cruds: [
        ['Create', 'mdi-plus-outline'],
        ['Read', 'mdi-file-outline'],
        ['Update', 'mdi-update'],
        ['Delete', 'mdi-delete'],
      ],
    };
  },
  computed: {
    filteredItems() {
      const query = this.searchQuery.toLowerCase();
      return this.items.filter(
        (item) =>
          item.kategori.toLowerCase().includes(query) ||
          item.deskripsi.toLowerCase().includes(query)
      );
    },
  },
  methods: {
    addAccountCOA() {
      return "/akun-coa/AddAccount"; // Rute untuk Tambah Transaksi
    },
    handleEdit(item) {
      if (!item.id) {
        console.error("ID tidak ditemukan pada item:", item);
        return;
      }

      console.log("Navigasi ke halaman edit dengan id:", item.id);

      // Simpan data ke sessionStorage
      sessionStorage.setItem("editItem", JSON.stringify(item));

      // Navigasi ke halaman EditAccount dengan id
      this.$router
        .push({
          path: `/akun-coa/update/${item.id}`,
        })
        .catch((err) => console.error("Navigasi gagal:", err));
    },

    handleDelete(id) {
      // Logika untuk menghapus transaksi
      this.items = this.items.filter((item) => item.id !== id);
      console.log(`Akun (COA) berhasil dihapus dengan id: ${id}`);
    },

    downloadExcel() {
      if (!this.items.length) {
        alert("No data available to download!");
        return;
      }

      const worksheet = XLSX.utils.json_to_sheet(this.items);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, this.fileName);
    },
  },
};
</script>
