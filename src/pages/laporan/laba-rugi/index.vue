<template>
  <v-container>
    <!-- Header -->
    <div>
      <AppHeader title="Laporan Laba Rugi" />
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
    <div>
        <!-- Header Kolom -->
        <div class="text-cyan-darken-4 d-flex justify-space-between  font-weight-bold pa-3">
              <v-row>
                <v-col cols="5">Kode COA</v-col>
                <v-col cols="5">Nama Akun</v-col>
                <v-col class="text-end">Total</v-col>
              </v-row>
        </div>
      </div>
      <!-- Pendapatan dari Penjualan -->
      <div>
        <v-list class="py-0 ">
          <v-list-group value="Pendapatan dari Penjualan">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                prepend-icon="mdi-source-commit-end-local"
                title="Pendapatan dari Penjualan"
                class="bg-cyan-lighten-4 text-cyan-darken-4 font-weight-bold"
              ></v-list-item>
            </template>
            <v-list-item
              v-for="(item, index) in pendapatanPenjualan"
              :key="index"
            >
              <v-row>
                <v-col cols="5">{{ item.kodeCOA }}</v-col>
                <v-col cols="5">{{ item.namaAkun }}</v-col>
                <v-col class="text-end">{{ formatRupiah(item.total) }}</v-col>
              </v-row>
            </v-list-item>
            <v-list-item class="font-weight-bold bg-cyan-lighten-4">
              <v-row>
                <v-col>Total Pendapatan dari Penjualan</v-col>
                <v-col class="text-end">{{ formatRupiah(totalPendapatanPenjualan) }}</v-col>
              </v-row>
            </v-list-item>
          </v-list-group>
        </v-list>
      </div>

      <!-- Harga Pokok Penjualan -->
      <div>
        <v-list class="py-0 mt-4">
          <v-list-group value="Harga Pokok Penjualan">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                prepend-icon="mdi-source-commit-end-local"
                title="Harga Pokok Penjualan"
                class="bg-cyan-lighten-4 text-cyan-darken-4 font-weight-black"
              ></v-list-item>
            </template>
            <v-list-item
              v-for="(item, index) in hargaPokokPenjualan"
              :key="index"
            >
              <v-row>
                <v-col cols="5">{{ item.kodeCOA }}</v-col>
                <v-col cols="5">{{ item.namaAkun }}</v-col>
                <v-col class="text-end">{{ formatRupiah(item.total) }}</v-col>
              </v-row>
            </v-list-item>
            <v-list-item class="font-weight-bold bg-cyan-lighten-4">
              <v-row>
                <v-col>Total Harga Pokok Penjualan</v-col>
                <v-col class="text-end">{{ formatRupiah(totalHargaPokokPenjualan) }}</v-col>
              </v-row>
            </v-list-item>
          </v-list-group>
        </v-list>
      </div>

      <!-- Beban Operasional -->
      <div>
        <v-list class="py-0 mt-4">
          <v-list-group value="Beban Operasional">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                prepend-icon="mdi-source-commit-end-local"
                title="Beban Operasional"
                class="bg-cyan-lighten-4 text-cyan-darken-4 font-weight-black"
              ></v-list-item>
            </template>
            <v-list-item
              v-for="(item, index) in bebanOperasional"
              :key="index"
            >
              <v-row>
                <v-col cols="5">{{ item.kodeCOA }}</v-col>
                <v-col cols="5">{{ item.namaAkun }}</v-col>
                <v-col class="text-end">{{ formatRupiah(item.total) }}</v-col>
              </v-row>
            </v-list-item>
            <v-list-item class="font-weight-bold bg-cyan-lighten-4">
              <v-row>
                <v-col>Total Beban Operasional</v-col>
                <v-col class="text-end">{{ formatRupiah(totalBebanOperasional) }}</v-col>
              </v-row>
            </v-list-item>
          </v-list-group>
        </v-list>
      </div>

      <!-- Laba Kotor -->
      <div>
        <v-list class="py-0 mt-4">
          <v-list-item class="bg-cyan-lighten-4 font-weight-bold">
            <v-row>
              <v-col>Laba Kotor</v-col>
              <v-col class="text-end">{{ formatRupiah(labaKotor) }}</v-col>
            </v-row>
          </v-list-item>
        </v-list>
      </div>

      <!-- Laba Bersih -->
      <div>
        <v-list class="py-0 mt-4">
          <v-list-item class="bg-cyan-lighten-4 font-weight-bold">
            <v-row>
              <v-col>Laba Bersih</v-col>
              <v-col class="text-end">{{ formatRupiah(labaBersih) }}</v-col>
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
  components: { AppHeader, SearchComponent },
  data() {
    return {
      searchQuery: "",
      pendapatanPenjualan: [
        { kodeCOA: "1-00012", namaAkun: "Kas", total: 500000000 },
        { kodeCOA: "1-00012", namaAkun: "Kas", total: 500000000 },
        { kodeCOA: "1-00012", namaAkun: "Kas", total: 500000000 },
      ],
      hargaPokokPenjualan: [
        { kodeCOA: "1-00012", namaAkun: "Kas", total: 500000000 },
        { kodeCOA: "1-00012", namaAkun: "Kas", total: 500000000 },
        { kodeCOA: "1-00012", namaAkun: "Kas", total: 500000000 },
        { kodeCOA: "1-00012", namaAkun: "Kas", total: 500000000 },
      ],
      bebanOperasional: [
        { kodeCOA: "1-00012", namaAkun: "Kas", total: 500000000 },
        { kodeCOA: "1-00012", namaAkun: "Kas", total: 500000000 },
      ],
    };
  },
  computed: {
    totalPendapatanPenjualan() {
      return this.pendapatanPenjualan.reduce((sum, item) => sum + item.total, 0);
    },
    totalHargaPokokPenjualan() {
      return this.hargaPokokPenjualan.reduce((sum, item) => sum + item.total, 0);
    },
    totalBebanOperasional() {
      return this.bebanOperasional.reduce((sum, item) => sum + item.total, 0);
    },
    labaKotor() {
      return this.totalPendapatanPenjualan - this.totalHargaPokokPenjualan;
    },
    labaBersih() {
      return this.labaKotor - this.totalBebanOperasional;
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
      if (
        !this.pendapatanPenjualan.length &&
        !this.hargaPokokPenjualan.length &&
        !this.bebanOperasional.length
      ) {
        alert("No data available to download!");
        return;
      }

      // Gabungkan semua data menjadi satu array
      const combinedData = [];

      // Pendapatan dari Penjualan
      combinedData.push({ Kategori: "Pendapatan dari Penjualan", KodeCOA: "", NamaAkun: "", Total: "" });
      this.pendapatanPenjualan.forEach((item) => {
        combinedData.push({
          Kategori: "",
          KodeCOA: item.kodeCOA,
          NamaAkun: item.namaAkun,
          Total: item.total,
        });
      });
      combinedData.push({
        Kategori: "",
        KodeCOA: "",
        NamaAkun: "Total Pendapatan dari Penjualan",
        Total: this.totalPendapatanPenjualan,
      });

      // Harga Pokok Penjualan
      combinedData.push({ Kategori: "Harga Pokok Penjualan", KodeCOA: "", NamaAkun: "", Total: "" });
      this.hargaPokokPenjualan.forEach((item) => {
        combinedData.push({
          Kategori: "",
          KodeCOA: item.kodeCOA,
          NamaAkun: item.namaAkun,
          Total: item.total,
        });
      });
      combinedData.push({
        Kategori: "",
        KodeCOA: "",
        NamaAkun: "Total Harga Pokok Penjualan",
        Total: this.totalHargaPokokPenjualan,
      });

      // Beban Operasional
      combinedData.push({ Kategori: "Beban Operasional", KodeCOA: "", NamaAkun: "", Total: "" });
      this.bebanOperasional.forEach((item) => {
        combinedData.push({
          Kategori: "",
          KodeCOA: item.kodeCOA,
          NamaAkun: item.namaAkun,
          Total: item.total,
        });
      });
      combinedData.push({
        Kategori: "",
        KodeCOA: "",
        NamaAkun: "Total Beban Operasional",
        Total: this.totalBebanOperasional,
      });

      // Laba Kotor
      combinedData.push({
        Kategori: "",
        KodeCOA: "",
        NamaAkun: "Laba Kotor",
        Total: this.labaKotor,
      });

      // Laba Bersih
      combinedData.push({
        Kategori: "",
        KodeCOA: "",
        NamaAkun: "Laba Bersih",
        Total: this.labaBersih,
      });

      // Konversi data menjadi sheet Excel
      const worksheet = XLSX.utils.json_to_sheet(combinedData);

      // Buat workbook dan tambahkan sheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Laba Rugi");

      // Simpan file Excel
      XLSX.writeFile(workbook, "Laporan Laba Rugi.xlsx");
    },
  },
};
</script>
