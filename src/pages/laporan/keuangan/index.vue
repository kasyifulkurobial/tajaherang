<template>
  <v-container>
    <div>
      <AppHeader title="Catatan Laporan Keuangan" />
    </div>
    <v-card class="mt-4">
      <v-card-title class="d-flex justify-space-between align-center pt-7">
        <!-- Dropdown Kategori -->
        <v-select
          v-model="selectedCategory"
          :items="categories"
          label="Semua Laporan"
          class="pr-8"
          outlined
          dense
        ></v-select>

        <!-- Input Tanggal Mulai -->
        <v-menu ref="menuStart" v-model="menuStart" :close-on-content-click="false">
          <template v-slot:activator="{ props }">
            <v-text-field
              v-model="startDate"
              label="Tanggal Mulai"
              readonly
              outlined
              dense
              append-inner-icon="mdi-calendar"
              v-bind="props"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="startDate"
            @change="menuStart = false"
          ></v-date-picker>
        </v-menu>

        <!-- Ikon Panah -->
        <v-icon>mdi-arrow-right</v-icon>

        <!-- Input Tanggal Akhir -->
        <v-menu ref="menuEnd" v-model="menuEnd" :close-on-content-click="false">
          <template v-slot:activator="{ props }">
            <v-text-field
              v-model="endDate"
              label="Tanggal Akhir"
              readonly
              outlined
              dense
              append-inner-icon="mdi-calendar"
              v-bind="props"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="endDate"
            @change="menuEnd = false"
          ></v-date-picker>
        </v-menu>
      </v-card-title>

      <!-- Tabel Laporan -->
      <v-card class="pa-5">
        <v-data-table
          :headers="headers"
          :items="reports"
          class="elevation-1"
          item-value="name"
          hide-default-footer
        ></v-data-table></v-card>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'FinancialReport',
  data() {
    return {
      // Dropdown Kategori
      selectedCategory: 'Semua Laporan',
      categories: ['Semua Laporan', 'Harian', 'Bulanan', 'Tahunan'],

      // Tanggal Filter
      startDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
      menuStart: false,
      menuEnd: false,

      // Header Tabel
      headers: [
        { title: 'WAKTU DIBUAT', value: 'createdAt' },
        { title: 'LAPORAN', value: 'report' },
        { title: 'STATUS', value: 'status' }
      ],

      // Data Tabel
      reports: [
        {
          createdAt: '29 Aug 2024 11:32:41.591',
          report: 'Laporan Keuangan dari Jul 2024 sampai Aug 2024',
          status: 'Sukses'
        },
        {
          createdAt: '28 Aug 2024 10:15:22.001',
          report: 'Laporan Keuangan dari Jun 2024 sampai Jul 2024',
          status: 'Sukses'
        },
        {
          createdAt: '27 Aug 2024 09:45:12.321',
          report: 'Laporan Keuangan dari Mei 2024 sampai Jun 2024',
          status: 'Pending'
        }
      ]
    };
  }
};
</script>

