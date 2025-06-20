<template>
  <v-container>
    <!-- Header -->
    <div>
      <AppHeader title="Laporan Neraca" />
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
      <!-- Header Kolom -->
      <div class="text-cyan-darken-4 d-flex justify-space-between font-weight-bold pa-3">
          <v-row>
            <v-col cols="12" md="2">Kode COA</v-col>
            <v-col cols="12" md="2">Nama Akun</v-col>
            <v-col cols="12" md="2">Total</v-col>
            <v-col cols="12" md="2">Kode COA</v-col>
            <v-col cols="12" md="2">Nama Akun</v-col>
            <v-col cols="12" md="2">Total</v-col>
          </v-row>
      </div>

      <!-- Sub Header Kolom -->
      <div class="text-cyan-darken-4 font-weight-bold pa-3">
        <v-row>
          <v-col cols="6" class="text-start">Aset</v-col>
          <v-col cols="6" class="text-start">Kewajiban dan Ekuitas</v-col>
        </v-row>
      </div>

      <!-- Main Content -->
      <v-row>
        <!-- Kolom Aset -->
        <v-col cols="6">
          <v-row>
            <!-- Aset Lancar -->
            <v-col cols="12">
              <v-list>
                <v-list-group v-model="asetExpanded1" title="Aset Lancar">
                  <template v-slot:activator="{ props }">
                    <v-list-item
                      v-bind="props"
                      class="bg-cyan-lighten-4 text-cyan-darken-4 font-weight-bold"
                    ></v-list-item>
                  </template>

                  <v-list-item v-for="(item, index) in asetLancar" :key="index">
                    <v-row>
                      <v-col cols="4">{{ item.kodeCOA }}</v-col>
                      <v-col cols="4">{{ item.namaAkun }}</v-col>
                      <v-col cols="4" class="text-right">{{ formatRupiah(item.total) }}</v-col>
                    </v-row>
                  </v-list-item>

                  <!-- Total Aset Lancar -->
                  <v-list-item>
                    <v-row class="font-weight-bold">
                      <v-col cols="8">Total Aset Lancar</v-col>
                      <v-col cols="4" class="text-right">{{ formatRupiah(totalAsetLancar) }}</v-col>
                    </v-row>
                  </v-list-item>
                </v-list-group>
              </v-list>
            </v-col>

            <!-- Aset Tetap -->
            <v-col cols="12">
              <v-list>
                <v-list-group v-model="asetExpanded2" title="Aset Tetap">
                  <template v-slot:activator="{ props }">
                    <v-list-item
                      v-bind="props"
                      class="bg-cyan-lighten-4 text-cyan-darken-4 font-weight-bold"
                    ></v-list-item>
                  </template>

                  <v-list-item v-for="(item, index) in asetTetap" :key="index">
                    <v-row>
                      <v-col cols="4">{{ item.kodeCOA }}</v-col>
                      <v-col cols="4">{{ item.namaAkun }}</v-col>
                      <v-col cols="4" class="text-right">{{ formatRupiah(item.total) }}</v-col>
                    </v-row>
                  </v-list-item>

                  <!-- Total Aset Tetap -->
                  <v-list-item>
                    <v-row class="font-weight-bold">
                      <v-col cols="8">Total Aset Tetap</v-col>
                      <v-col cols="4" class="text-right">{{ formatRupiah(totalAsetTetap) }}</v-col>
                    </v-row>
                  </v-list-item>
                </v-list-group>
              </v-list>
            </v-col>
          </v-row>

          <!-- Total Aset -->
          <v-row class="font-weight-bold my-4 px-4">
            <v-col cols="6">Total Aset</v-col>
            <v-col cols="6" class="text-right">{{ formatRupiah(totalAset) }}</v-col>
          </v-row>
        </v-col>

        <!-- Kolom Kewajiban dan Ekuitas -->
        <v-col cols="6">
          <v-row>
            <!-- Kewajiban Jangka Pendek -->
            <v-col cols="12">
              <v-list>
                <v-list-group v-model="kewajibanExpanded1" title="Kewajiban Jangka Pendek">
                  <template v-slot:activator="{ props }">
                    <v-list-item
                      v-bind="props"
                      class="bg-cyan-lighten-4 text-cyan-darken-4 font-weight-bold"
                    ></v-list-item>
                  </template>

                  <v-list-item v-for="(item, index) in kewajibanJangkaPendek" :key="index">
                    <v-row>
                      <v-col cols="4">{{ item.kodeCOA }}</v-col>
                      <v-col cols="4">{{ item.namaAkun }}</v-col>
                      <v-col cols="4" class="text-right">{{ formatRupiah(item.total) }}</v-col>
                    </v-row>
                  </v-list-item>

                  <!-- Total Kewajiban Jangka Pendek -->
                  <v-list-item>
                    <v-row class="font-weight-bold px-4">
                      <v-col cols="6">Total Kewajiban Jangka Pendek</v-col>
                      <v-col cols="6" class="text-end">{{ formatRupiah(totalKewajibanPendek) }}</v-col>
                    </v-row>
                  </v-list-item>
                </v-list-group>
              </v-list>
            </v-col>

            <!-- Kewajiban Jangka Panjang -->
            <v-col cols="12">
              <v-list>
                <v-list-group v-model="kewajibanExpanded2" title="Kewajiban Jangka Panjang">
                  <template v-slot:activator="{ props }">
                    <v-list-item
                      v-bind="props"
                      class="bg-cyan-lighten-4 text-cyan-darken-4 font-weight-bold"
                    ></v-list-item>
                  </template>

                  <v-list-item v-for="(item, index) in kewajibanJangkaPanjang" :key="index">
                    <v-row>
                      <v-col cols="4">{{ item.kodeCOA }}</v-col>
                      <v-col cols="4">{{ item.namaAkun }}</v-col>
                      <v-col cols="4" class="text-right">{{ formatRupiah(item.total) }}</v-col>
                    </v-row>
                  </v-list-item>

                  <!-- Total Kewajiban Jangka Panjang -->
                  <v-list-item>
                    <v-row class="font-weight-bold">
                      <v-col cols="8">Total Kewajiban Jangka Panjang</v-col>
                      <v-col cols="4" class="text-right">{{ formatRupiah(totalKewajibanPanjang) }}</v-col>
                    </v-row>
                  </v-list-item>
                </v-list-group>
              </v-list>
            </v-col>

            <!-- Total Kewajiban -->
            <v-row class="font-weight-bold my-4 px-4">
              <v-col cols="6">Total Kewajiban</v-col>
              <v-col cols="6" class="text-end">{{ formatRupiah(totalKewajiban) }}</v-col>
            </v-row>

            <!-- Ekuitas -->
            <v-col cols="12">
              <v-list>
                <v-list-group v-model="ekuitasExpanded" title="Ekuitas">
                  <template v-slot:activator="{ props }">
                    <v-list-item
                      v-bind="props"
                      class="bg-cyan-lighten-4 text-cyan-darken-4 font-weight-bold"
                    ></v-list-item>
                  </template>

                  <v-list-item v-for="(item, index) in ekuitas" :key="index">
                    <v-row>
                      <v-col cols="4">{{ item.kodeCOA }}</v-col>
                      <v-col cols="4">{{ item.namaAkun }}</v-col>
                      <v-col cols="4" class="text-right">{{ formatRupiah(item.total) }}</v-col>
                    </v-row>
                  </v-list-item>

                  <!-- Total Ekuitas -->
                  <v-list-item>
                    <v-row class="font-weight-bold">
                      <v-col cols="8">Total Ekuitas</v-col>
                      <v-col cols="4" class="text-right">{{ formatRupiah(totalEkuitas) }}</v-col>
                    </v-row>
                  </v-list-item>
                </v-list-group>
              </v-list>
            </v-col>
          </v-row>

          <!-- Total Kewajiban dan Ekuitas -->
          <v-row class="font-weight-bold my-4 px-4">
            <v-col cols="6">Total Kewajiban dan Ekuitas</v-col>
            <v-col cols="6" class="text-end">{{ formatRupiah(totalKewajibanDanEkuitas) }}</v-col>
          </v-row>
        </v-col>
      </v-row>
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
      asetExpanded1: false,
      kewajibanExpanded1: false,
      kewajibanExpanded2: false,
      asetExpanded2: false,
      ekuitasExpanded: false,
      asetLancar: [
        { kodeCOA: "1-00012", namaAkun: "Kas", total: 500000000 },
        { kodeCOA: "1-00013", namaAkun: "Bank", total: 200000000 },
        { kodeCOA: "1-00014", namaAkun: "Piutang Dagang", total: 100000000 },
      ],
      kewajibanJangkaPendek: [
        { kodeCOA: "2-00012", namaAkun: "Hutang Usaha", total: 300000000 },
        { kodeCOA: "2-00013", namaAkun: "Hutang Bank", total: 200000000 },
        { kodeCOA: "2-00014", namaAkun: "Hutang Pajak", total: 150000000 },
      ],
      kewajibanJangkaPanjang: [
        { kodeCOA: "2-20012", namaAkun: "Hutang Obligasi", total: 500000000 },
        { kodeCOA: "2-20013", namaAkun: "Hutang Hipotek", total: 300000000 },
      ],
      asetTetap: [
        { kodeCOA: "1-10012", namaAkun: "Tanah", total: 800000000 },
        { kodeCOA: "1-10013", namaAkun: "Bangunan", total: 1200000000 },
        { kodeCOA: "1-10014", namaAkun: "Kendaraan", total: 300000000 },
      ],
      ekuitas: [
        { kodeCOA: "3-00012", namaAkun: "Modal Pemilik", total: 500000000 },
        { kodeCOA: "3-00013", namaAkun: "Laba Ditahan", total: 200000000 },
      ],
    };
  },

  computed: {
    totalAsetLancar() {
      return this.asetLancar.reduce((sum, item) => sum + item.total, 0);
    },
    totalAsetTetap() {
      return this.asetTetap.reduce((sum, item) => sum + item.total, 0);
    },
    totalAset() {
      return this.totalAsetLancar + this.totalAsetTetap;
    },
    totalKewajibanPendek() {
      return this.kewajibanJangkaPendek.reduce((sum, item) => sum + item.total, 0);
    },
    totalKewajibanPanjang() {
      return this.kewajibanJangkaPanjang.reduce((sum, item) => sum + item.total, 0);
    },
    totalKewajiban() {
      return this.totalKewajibanPendek + this.totalKewajibanPanjang;
    },
    totalEkuitas() {
      return this.ekuitas.reduce((sum, item) => sum + item.total, 0);
    },
    totalKewajibanDanEkuitas() {
      return this.totalKewajiban + this.totalEkuitas;
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
        !this.asetLancar.length &&
        !this.asetTetap.length &&
        !this.kewajibanJangkaPendek.length &&
        !this.kewajibanJangkaPanjang.length &&
        !this.ekuitas.length
      ) {
        alert("No data available to download!");
        return;
      }

      // Gabungkan semua data menjadi satu array
      const combinedData = [];

      // Aset (Lancar dan Tetap)
      combinedData.push({
        KategoriAset: "Aset Lancar",
        KodeCOAAset: "",
        NamaAkunAset: "",
        TotalAset: "",
        KategoriKewajiban: "",
        KodeCOAKewajiban: "",
        NamaAkunKewajiban: "",
        TotalKewajiban: "",
      });

      this.asetLancar.forEach((item) => {
        combinedData.push({
          KategoriAset: "",
          KodeCOAAset: item.kodeCOA,
          NamaAkunAset: item.namaAkun,
          TotalAset: item.total,
          KategoriKewajiban: "",
          KodeCOAKewajiban: "",
          NamaAkunKewajiban: "",
          TotalKewajiban: "",
        });
      });

      combinedData.push({
        KategoriAset: "",
        KodeCOAAset: "",
        NamaAkunAset: "Total Aset Lancar",
        TotalAset: this.totalAsetLancar,
        KategoriKewajiban: "",
        KodeCOAKewajiban: "",
        NamaAkunKewajiban: "",
        TotalKewajiban: "",
      });

      combinedData.push({
        KategoriAset: "Aset Tetap",
        KodeCOAAset: "",
        NamaAkunAset: "",
        TotalAset: "",
        KategoriKewajiban: "",
        KodeCOAKewajiban: "",
        NamaAkunKewajiban: "",
        TotalKewajiban: "",
      });

      this.asetTetap.forEach((item) => {
        combinedData.push({
          KategoriAset: "",
          KodeCOAAset: item.kodeCOA,
          NamaAkunAset: item.namaAkun,
          TotalAset: item.total,
          KategoriKewajiban: "",
          KodeCOAKewajiban: "",
          NamaAkunKewajiban: "",
          TotalKewajiban: "",
        });
      });

      combinedData.push({
        KategoriAset: "",
        KodeCOAAset: "",
        NamaAkunAset: "Total Aset Tetap",
        TotalAset: this.totalAsetTetap,
        KategoriKewajiban: "",
        KodeCOAKewajiban: "",
        NamaAkunKewajiban: "",
        TotalKewajiban: "",
      });

      combinedData.push({
        KategoriAset: "",
        KodeCOAAset: "",
        NamaAkunAset: "Total Aset",
        TotalAset: this.totalAset,
        KategoriKewajiban: "",
        KodeCOAKewajiban: "",
        NamaAkunKewajiban: "",
        TotalKewajiban: "",
      });

      // Kewajiban (Jangka Pendek dan Panjang) dan Ekuitas
      combinedData.push({
        KategoriAset: "",
        KodeCOAAset: "",
        NamaAkunAset: "",
        TotalAset: "",
        KategoriKewajiban: "Kewajiban Jangka Pendek",
        KodeCOAKewajiban: "",
        NamaAkunKewajiban: "",
        TotalKewajiban: "",
      });

      this.kewajibanJangkaPendek.forEach((item) => {
        combinedData.push({
          KategoriAset: "",
          KodeCOAAset: "",
          NamaAkunAset: "",
          TotalAset: "",
          KategoriKewajiban: "",
          KodeCOAKewajiban: item.kodeCOA,
          NamaAkunKewajiban: item.namaAkun,
          TotalKewajiban: item.total,
        });
      });

      combinedData.push({
        KategoriAset: "",
        KodeCOAAset: "",
        NamaAkunAset: "",
        TotalAset: "",
        KategoriKewajiban: "",
        KodeCOAKewajiban: "",
        NamaAkunKewajiban: "Total Kewajiban Jangka Pendek",
        TotalKewajiban: this.totalKewajibanPendek,
      });

      combinedData.push({
        KategoriAset: "",
        KodeCOAAset: "",
        NamaAkunAset: "",
        TotalAset: "",
        KategoriKewajiban: "Kewajiban Jangka Panjang",
        KodeCOAKewajiban: "",
        NamaAkunKewajiban: "",
        TotalKewajiban: "",
      });

      this.kewajibanJangkaPanjang.forEach((item) => {
        combinedData.push({
          KategoriAset: "",
          KodeCOAAset: "",
          NamaAkunAset: "",
          TotalAset: "",
          KategoriKewajiban: "",
          KodeCOAKewajiban: item.kodeCOA,
          NamaAkunKewajiban: item.namaAkun,
          TotalKewajiban: item.total,
        });
      });

      combinedData.push({
        KategoriAset: "",
        KodeCOAAset: "",
        NamaAkunAset: "",
        TotalAset: "",
        KategoriKewajiban: "",
        KodeCOAKewajiban: "",
        NamaAkunKewajiban: "Total Kewajiban",
        TotalKewajiban: this.totalKewajiban,
      });

      combinedData.push({
        KategoriAset: "",
        KodeCOAAset: "",
        NamaAkunAset: "",
        TotalAset: "",
        KategoriKewajiban: "Ekuitas",
        KodeCOAKewajiban: "",
        NamaAkunKewajiban: "",
        TotalKewajiban: "",
      });

      this.ekuitas.forEach((item) => {
        combinedData.push({
          KategoriAset: "",
          KodeCOAAset: "",
          NamaAkunAset: "",
          TotalAset: "",
          KategoriKewajiban: "",
          KodeCOAKewajiban: item.kodeCOA,
          NamaAkunKewajiban: item.namaAkun,
          TotalKewajiban: item.total,
        });
      });

      combinedData.push({
        KategoriAset: "",
        KodeCOAAset: "",
        NamaAkunAset: "",
        TotalAset: "",
        KategoriKewajiban: "",
        KodeCOAKewajiban: "",
        NamaAkunKewajiban: "Total Ekuitas",
        TotalKewajiban: this.totalEkuitas,
      });

      combinedData.push({
        KategoriAset: "",
        KodeCOAAset: "",
        NamaAkunAset: "",
        TotalAset: "",
        KategoriKewajiban: "",
        KodeCOAKewajiban: "",
        NamaAkunKewajiban: "Total Kewajiban dan Ekuitas",
        TotalKewajiban: this.totalKewajibanDanEkuitas,
      });

      // Konversi data menjadi sheet Excel
      const worksheet = XLSX.utils.json_to_sheet(combinedData);

      // Buat workbook dan tambahkan sheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Neraca");

      // Simpan file Excel
      XLSX.writeFile(workbook, "Laporan Neraca.xlsx");
    },
  },
};
</script>
