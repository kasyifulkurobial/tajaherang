<template>
  <v-container>
    <!-- Header -->
    <div>
      <AppHeader title="Laporan Arus Kas" />
    </div>

    <!-- Filter dan Tombol Excel -->
    <div>
      <v-row class="mt-8 justify-space-between">
        <v-col cols="12" md="5">
          <SearchComponent v-model="searchQuery" label="Search Akun" />
        </v-col>
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


    <v-card class="mt-8">
      <div>
        <!-- Header Kolom -->
        <div class="text-cyan-darken-4 d-flex justify-space-between  font-weight-bold pa-3">
          <div class="pl-15"> Kategori </div>
          <div> Total </div>
        </div>
      </div>
      <!-- Aktivitas Operasional -->
      <div>
        <v-list class="py-0" v-model:opened="openOperasional">
          <v-list-group value="Operasional">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                prepend-icon="mdi-source-commit-end-local"
                title="Aktivitas Operasional"
                class="bg-cyan-lighten-4 text-cyan-darken-4 font-weight-black"
              ></v-list-item>
            </template>
            <v-list-item
              v-for="item in aktivitasOperasional"
              :key="item.nama"
            >
              <v-row>
                <v-col>{{ item.nama }}</v-col>
                <v-col class="text-end">Rp {{ item.jumlah }}</v-col>
              </v-row>
            </v-list-item>
            <v-list-item class="bg-cyan-lighten-4 font-weight-bold">
              <v-row>
                <v-col>Total Aktivitas Operasional</v-col>
                <v-col class="text-end">Rp {{ totalAktivitasOperasional }}</v-col>
              </v-row>
            </v-list-item>
          </v-list-group>
        </v-list>
      </div>

      <!-- Aktivitas Investasi -->
      <div class="pt-4">
        <v-list class="py-0" v-model:opened="openInvestasi">
          <v-list-group value="Investasi">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                prepend-icon="mdi-source-commit-end-local"
                title="Aktivitas Investasi"
                class="bg-cyan-lighten-4 text-cyan-darken-4 font-weight-bold"
              ></v-list-item>
            </template>
            <v-list-item
              v-for="([title, icon, price], i) in aktiva"
              :key="i"
            >
              <v-row class="justify-space-between">
                <v-col class="text-start">{{ title }}</v-col>
                <v-col class="text-end">Rp {{ price }}</v-col>
              </v-row>
            </v-list-item>
            <v-list-item class="bg-cyan-lighten-4 font-weight-bold">
              <v-row>
                <v-col>Total Aktivitas Investasi</v-col>
                <v-col class="text-end">Rp {{ totalAktivitasInvestasi }}</v-col>
              </v-row>
            </v-list-item>
          </v-list-group>
        </v-list>
      </div>

      <!-- Aktivitas Keuangan -->
      <div class="pt-4">
        <v-list class="py-0" v-model:opened="openKeuangan">
          <v-list-group value="Keuangan">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                prepend-icon="mdi-source-commit-end-local"
                title="Aktivitas Keuangan"
                class="bg-cyan-lighten-4 text-cyan-darken-4 font-weight-bold"
              ></v-list-item>
            </template>
            <v-list-item
              v-for="item in aktivitasKeuangan"
              :key="item.nama"
            >
              <v-row>
                <v-col>{{ item.nama }}</v-col>
                <v-col class="text-end">Rp {{ item.jumlah }}</v-col>
              </v-row>
            </v-list-item>
            <v-list-item class="bg-cyan-lighten-4 font-weight-bold">
              <v-row>
                <v-col>Total Aktivitas Keuangan</v-col>
                <v-col class="text-end">Rp {{ totalAktivitasKeuangan }}</v-col>
              </v-row>
            </v-list-item>
          </v-list-group>
        </v-list>
      </div>

       <!-- Perubahan Kas dan Posisi Kas -->
       <div class="pt-4">
        <v-list>
          <v-list-item>
            <v-row>
              <v-col>Perubahan Kas</v-col>
              <v-col class="text-end font-weight-bold">Rp {{ perubahanKas }}</v-col>
            </v-row>
          </v-list-item>
          <v-list-item>
            <v-row>
              <v-col>Posisi Kas Awal</v-col>
              <v-col class="text-end">Rp {{ posisiKasAwal }}</v-col>
            </v-row>
          </v-list-item>
          <v-list-item>
            <v-row>
              <v-col>Posisi Kas Akhir</v-col>
              <v-col class="text-end font-weight-bold">Rp {{ posisiKasAkhir }}</v-col>
            </v-row>
          </v-list-item>
        </v-list>
      </div>
    </v-card>
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
      fileName: "Laporan Arus Kas.xlsx",
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
      openOperasional: ["Operasional"],
      openInvestasi: ["Investasi"],
      openKeuangan: ["Keuangan"],
      aktivitasOperasional: [
        { nama: "Penerimaan dari pelanggan", jumlah: 500000000 },
        { nama: "Aset lancar lainnya", jumlah: 500000000 },
      ],
      aktivitasKeuangan: [
        { nama: "Pembayaran pinjaman", jumlah: 500000000 },
        { nama: "Modal saham", jumlah: 500000000 },
      ],
      aktiva: [
        ["Perolehan/penjualan barang aset", "mdi-menu-right", "500.000"],
        ["Aktivitas investasi lainnya", "mdi-menu-right", "500.000"],
      ],
      cruds: [
        ["Create", "mdi-plus-outline"],
        ["Read", "mdi-file-outline"],
        ["Update", "mdi-update"],
        ["Delete", "mdi-delete"],
      ],
      posisiKasAwal: 1500000000,
      posisiKasAkhir: 2500000000,
      perubahanKas: 1000000000,

    };
  },
  computed: {
    filteredOperasional() {
      const query = this.searchQuery.toLowerCase();
      return this.aktivitasOperasional.filter(
        (item) => item.nama.toLowerCase().includes(query)
      );
    },
    filteredInvestasi() {
      const query = this.searchQuery.toLowerCase();
      return this.aktiva.filter(
        (item) => item[0].toLowerCase().includes(query)
      );
    },
    filteredKeuangan() {
      const query = this.searchQuery.toLowerCase();
      return this.aktivitasKeuangan.filter(
        (item) => item.nama.toLowerCase().includes(query)
      );
    },
    filteredItems() {
      const query = this.searchQuery.toLowerCase();
      return this.items.filter(
        (item) =>
          item.kategori.toLowerCase().includes(query) ||
          item.deskripsi.toLowerCase().includes(query)
      );
    },

    totalAktivitasOperasional() {
      return this.aktivitasOperasional.reduce((sum, item) => sum + item.jumlah, 0);
    },
    totalAktivitasInvestasi() {
      return this.aktiva.reduce((sum, item) => sum + Number(item[2].replace(/\./g, "")), 0);
    },
    totalAktivitasKeuangan() {
      return this.aktivitasKeuangan.reduce((sum, item) => sum + item.jumlah, 0);
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
      if (
        !this.aktivitasOperasional.length &&
        !this.aktiva.length &&
        !this.aktivitasKeuangan.length
      ) {
        alert("No data available to download!");
        return;
      }

      // Gabungkan semua data menjadi satu array
      const combinedData = [];

      // Tambahkan header dan data untuk Aktivitas Operasional
      combinedData.push({ Kategori: "Aktivitas Operasional", Nama: "", Jumlah: "" });
      this.aktivitasOperasional.forEach((item) => {
        combinedData.push({ Kategori: "", Nama: item.nama, Jumlah: item.jumlah });
      });
      combinedData.push({ Kategori: "", Nama: "Total Aktivitas Operasional", Jumlah: this.totalAktivitasOperasional });

      // Tambahkan header dan data untuk Aktivitas Investasi
      combinedData.push({ Kategori: "Aktivitas Investasi", Nama: "", Jumlah: "" });
      this.aktiva.forEach((item) => {
        combinedData.push({ Kategori: "", Nama: item[0], Jumlah: item[2] });
      });
      combinedData.push({ Kategori: "", Nama: "Total Aktivitas Investasi", Jumlah: this.totalAktivitasInvestasi });

      // Tambahkan header dan data untuk Aktivitas Keuangan
      combinedData.push({ Kategori: "Aktivitas Keuangan", Nama: "", Jumlah: "" });
      this.aktivitasKeuangan.forEach((item) => {
        combinedData.push({ Kategori: "", Nama: item.nama, Jumlah: item.jumlah });
      });
      combinedData.push({ Kategori: "", Nama: "Total Aktivitas Keuangan", Jumlah: this.totalAktivitasKeuangan });

      // Tambahkan perubahan kas, posisi kas awal, dan posisi kas akhir
      combinedData.push({ Kategori: "Ringkasan", Nama: "Perubahan Kas", Jumlah: this.perubahanKas });
      combinedData.push({ Kategori: "Ringkasan", Nama: "Posisi Kas Awal", Jumlah: this.posisiKasAwal });
      combinedData.push({ Kategori: "Ringkasan", Nama: "Posisi Kas Akhir", Jumlah: this.posisiKasAkhir });

      // Konversi data menjadi sheet Excel
      const worksheet = XLSX.utils.json_to_sheet(combinedData);

      // Buat workbook dan tambahkan sheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Arus Kas");

      // Simpan file Excel
      XLSX.writeFile(workbook, this.fileName);
    },
  },
};
</script>
