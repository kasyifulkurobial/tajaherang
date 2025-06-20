<template>
  <v-container>
    <!-- Header -->
    <div>
      <AppHeader title="Laporan Perubahan Modal" />
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

    <!-- Card Table -->
    <v-card class="mt-8">
      <!-- Pendapatan dari Penjualan -->
      <div>
        <v-list class="py-0">
          <!-- Header Row -->
          <v-list-item class="text-cyan-darken-4">
            <v-row>
              <v-col cols="12" md="3"><h4>AKUN</h4></v-col>
              <v-col cols="12" md="3"><h4>MODAL</h4></v-col>
              <v-col cols="12" md="3"><h4>LABA DITAHAN</h4></v-col>
              <v-col cols="12" md="3"><h4>TOTAL</h4></v-col>
            </v-row>
          </v-list-item>

          <!-- Data Rows -->
          <v-list-item v-for="(item, index) in perubahanModal" :key="index">
            <v-row>
              <v-col cols="12" md="3">{{ item.akun }}</v-col>
              <v-col cols="12" md="3">{{ formatRupiah(item.modal) }}</v-col>
              <v-col cols="12" md="3">{{ formatRupiah(item.laba) }}</v-col>
              <v-col cols="12" md="3">{{ formatRupiah(item.modal + item.laba) }}</v-col>
            </v-row>
          </v-list-item>

          <!-- Saldo Akhir -->
          <v-list-item class="text-cyan-darken-4 bg-light-blue-lighten-4 font-weight-bold">
            <v-row>
              <v-col cols="12" md="3">Saldo Akhir</v-col>
              <v-col cols="12" md="3">{{ formatRupiah(totalModal) }}</v-col>
              <v-col cols="12" md="3">{{ formatRupiah(totalLaba) }}</v-col>
              <v-col cols="12" md="3">{{ formatRupiah(totalKeseluruhan) }}</v-col>
            </v-row>
          </v-list-item>
        </v-list>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import SearchComponent from "@/components/SearchComponent.vue";
import * as XLSX from "xlsx";

export default {
  components: {
    AppHeader,
    SearchComponent
  },
  data() {
    return {
      searchQuery: "",
      perubahanModal: [
        { akun: "Saldo Awal", modal: 300000000, laba: 0 },
        { akun: "Tambahan Modal", modal: 100000000, laba: 0 },
        { akun: "Laba Bersih Tahun Ini", modal: 0, laba: 100000000 },
        { akun: "Dividen Dibayar", modal: 0, laba: -50000000 },
      ],
    };
  },

  computed: {
    // Hitung total modal
    totalModal() {
      return this.perubahanModal.reduce((sum, item) => sum + item.modal, 0);
    },

    // Hitung total laba
    totalLaba() {
      return this.perubahanModal.reduce((sum, item) => sum + item.laba, 0);
    },

    // Hitung total keseluruhan (modal + laba)
    totalKeseluruhan() {
      return this.perubahanModal.reduce((sum, item) => sum + (item.modal + item.laba), 0);
    },

    // Saldo akhir
    saldoAkhir() {
      return this.totalKeseluruhan; // Saldo akhir = total keseluruhan
    },
  },

  methods: {
    formatRupiah(value) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(value);
    },
    downloadExcel() {
      // Struktur data untuk Excel
      const data = this.perubahanModal.map((item) => ({
        AKUN: item.akun,
        MODAL: item.modal,
        "LABA DITAHAN": item.laba,
        TOTAL: item.modal + item.laba,
      }));

      // Tambahkan baris total di akhir data
      data.push({
        AKUN: "Saldo Akhir",
        MODAL: this.totalModal,
        "LABA DITAHAN": this.totalLaba,
        TOTAL: this.totalKeseluruhan,
      });

      // Buat worksheet dan workbook
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Perubahan Modal");

      // Simpan file Excel
      XLSX.writeFile(workbook, "Laporan Perubahan Modal.xlsx");
    },
  },
};
</script>
