<template>
          <v-container>
                  <AppHeader title="Tiket" />

                  <v-card class="py-4 mt-10">
                      <v-row>
                          <v-col cols="12" md="6">
                              <v-text-field
                                      class="px-4 mt-5jnuh"
                                      v-model="search"
                                      label="Search"
                                      prepend-inner-icon="mdi-magnify"
                                      variant="outlined"
                                      hide-details
                              ></v-text-field>
                          </v-col>

                          <v-col cols="12" offset="3" md="3">
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

                      <v-row class="justify-space-between px-8">
                          <div class="text-cyan-darken-4">
                              <p>Total Tiket: 20000</p>
                          </div>
                          <div class="text-cyan-darken-4">
                              <p>Total Keuntungan: 20.00000</p>
                          </div>
                      </v-row>

                      <v-data-table
                            :headers="headers"
                            :items="items"
                            :loading="loading"
                            :items-per-page="totalItems"
                            :search="search"
                            class="px-4 mt-10"
                      ></v-data-table>
                  </v-card>
          </v-container>
</template>

<script>
import * as XLSX from "xlsx";

export default {
  data() {
    return {
      headers: [
        {title: 'ID', align: 'center', value: 'id'},
        {title: 'Tanggal', align: 'center', value: 'tanggal'},
        {title: 'Jumlah', align: 'center', value: 'jumlah'},
        {title: 'Harga Tiket', align: 'center', value: 'harga'},
        {title: 'Total Penghasilan', align: 'center', value: 'total'},
      ],
      items: [
        {id: '1', tanggal: '20 November 2021', jumlah: '10', harga: '10.000', total: '100.000'},
        {id: '2', tanggal: '21 November 2021', jumlah: '10', harga: '10.000', total: '100.000'},
        {id: '3', tanggal: '22 November 2021', jumlah: '10', harga: '10.000', total: '100.000'},
        {id: '4', tanggal: '23 November 2021', jumlah: '10', harga: '10.000', total: '100.000'},
      ],
      loading: false,
      totalItems: 5,
      search: '',
    }
  },
  methods: {
    downloadExcel() {
      const worksheet = XLSX.utils.json_to_sheet(this.items);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Tiket");
      XLSX.writeFile(workbook, "tiket.xlsx");
    }
  }
}
</script>
