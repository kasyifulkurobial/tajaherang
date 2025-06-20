<template>
<v-container>
     <AppHeader title="Inventaris" />

     <v-card class="py-4 mt-10">
          <v-row>
               <v-col cols="12" md="4">
                    <v-text-field
                      class="px-4 mt-5jnuh"
                      v-model="search"
                      label="Search"
                      prepend-inner-icon="mdi-magnify"
                      variant="outlined"
                      hide-details
                      >
                    </v-text-field>
               </v-col>

               <v-col cols="12" md="3" offset="2">
                    <v-btn
                      class="bg-cyan-darken-4 text-white"
                      rounded="xs"
                      size="x-large"
                      @click="navigateToPage">
                         <v-icon icon="mdi-plus" class="mr-2" />
                          Tambah Asset
                    </v-btn>
               </v-col>

               <v-col cols="12" md="3">
                    <v-btn
                      class="bg-cyan-darken-4 text-white"
                      rounded="xs"
                      size="x-large"
                      @click="downloadExcel"
                    >
                         <v-icon
                          icon="mdi-download" class="mr-2" />
                            Download Excel
                    </v-btn>
               </v-col>
          </v-row>

          <v-data-table
            :headers="headers"
            :items="items"
            :loading="loading"
            :items-per-page="totalItems"
            :search="search"
            class="mt-10">
                <template v-slot:item.status="{ item }">
                        <v-chip
                              label
                              variant="outlined"
                              :color="getColorStatus(item.status)"
                              class="mb-1"
                              dark>
                                {{ item.status }}
                        </v-chip>
                </template>

               <template v-slot:item.aksi="{ item }">
                    <v-btn
                      variant="plain"
                      class="custom-btn-size text-indigo-accent-4 font-weight-bold"
                      @click="$emit('edit', item)">
                         <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn
                      variant="plain"
                      class="custom-btn-size text-black font-weight-bold"
                      @click="$emit('view', item.id)">
                         <v-icon>mdi-eye</v-icon>
                    </v-btn>
                    <v-btn
                      variant="plain"
                      class="custom-btn-size text-red-accent-4 font-weight-bold"
                      @click="$emit('delete', item.id)">
                         <v-icon>mdi-delete</v-icon>
                    </v-btn>
               </template>
          </v-data-table>
     </v-card>
</v-container>
</template>

<script>
import * as XLSX from "xlsx";

export default {
     data() {
          return {
               headers: [
                {title: 'No',align: 'center',value: 'id'},
                {title: 'Nama',align: 'center',value: 'nama'},
                {title: 'Kategori',align: 'center',value: 'kategori'},
                {title: 'Tanggal Pembelian',align: 'center',value: 'tanggal'},
                {title: 'Harga',align: 'center',value: 'harga'},
                {title: 'Jumlah',align: 'center',value: 'jumlah'},
                {title: 'Depresiasis',align: 'center',value: 'depresiasi'},
                {title: 'Nilai Terkini',align: 'center',value: 'nilai'},
                {title: 'Akumulasi',align: 'center',value: 'jumlah'},
                {title: 'Status',align: 'center',value: 'status'},
                {title: 'Action',align: 'center',value: 'aksi'},
               ],
               items: [
                {
                      id: "1",
                      nama: "Laptop",
                      kategori: "Elektronik",
                      tanggal: "2021-11-20",
                      harga: "100.000",
                      jumlah: "10",
                      depresiasi: "10.000",
                      nilai: "100.000",
                      jumlah: "100.000",
                      status: "Aktif"
                    },
                    {
                      id: "2",
                      nama: "Laptop",
                      kategori: "Elektronik",
                      tanggal: "2021-11-20",
                      harga: "100.000",
                      jumlah: "10",
                      depresiasi: "10.000",
                      nilai: "100.000",
                      jumlah: "100.000",
                      status: "Aktif"
                    },
                    {
                      id: "3",
                      nama: "Laptop",
                      kategori: "Elektronik",
                      tanggal: "2021-11-20",
                      harga: "100.000",
                      jumlah: "10",
                      depresiasi: "10.000",
                      nilai: "100.000",
                      jumlah: "100.000",
                      status: "Aktif"
                    },
                    {
                      id: "4",
                      nama: "Laptop",
                      kategori: "Elektronik",
                      tanggal: "2021-11-20",
                      harga: "100.000",
                      jumlah: "10",
                      depresiasi: "10.000",
                      nilai: "100.000",
                      jumlah: "100.000",
                      status: "Aktif"
                    },
                    {
                      id: "5",
                      nama: "Laptop",
                      kategori: "Elektronik",
                      tanggal: "2021-11-20",
                      harga: "100.000",
                      jumlah: "10",
                      depresiasi: "10.000",
                      nilai: "100.000",
                      jumlah: "100.000",
                      status: "Aktif"
                    },
                    {
                      id: "6",
                      nama: "Laptop",
                      kategori: "Elektronik",
                      tanggal: "2021-11-20",
                      harga: "100.000",
                      jumlah: "10",
                      depresiasi: "10.000",
                      nilai: "100.000",
                      jumlah: "100.000",
                      status: "Aktif"
                    },
                    {
                      id: "7",
                      nama: "Laptop",
                      kategori: "Elektronik",
                      tanggal: "2021-11-20",
                      harga: "100.000",
                      jumlah: "10",
                      depresiasi: "10.000",
                      nilai: "100.000",
                      jumlah: "100.000",
                      status: "Aktif"
                    },
                    {
                      id: "8",
                      nama: "Laptop",
                      kategori: "Elektronik",
                      tanggal: "2021-11-20",
                      harga: "100.000",
                      jumlah: "10",
                      depresiasi: "10.000",
                      nilai: "100.000",
                      jumlah: "100.000",
                      status: "Aktif"
                    },
                    {
                      id: "9",
                      nama: "Laptop",
                      kategori: "Elektronik",
                      tanggal: "2021-11-20",
                      harga: "100.000",
                      jumlah: "10",
                      depresiasi: "10.000",
                      nilai: "100.000",
                      jumlah: "100.000",
                      status: "Aktif"
                    },
                    {
                      id: "10",
                      nama: "Laptop",
                      kategori: "Elektronik",
                      tanggal: "2021-11-20",
                      harga: "100.000",
                      jumlah: "10",
                      depresiasi: "10.000",
                      nilai: "100.000",
                      jumlah: "100.000",
                      status: "Non Aktif"
                    },
               ],
               loading: false,
               totalItems: 5,
               search: '',
               fileName: 'Inventaris.xlsx', // Tambahkan nama file di sini
          }
    },
    methods: {
      navigateToPage() {
        this.$router.push('/inventaris/add'); // Navigasi ke halaman add
      },
      getColorStatus(status) {
        const normalizedStatus = status.trim().toLowerCase(); // Hilangkan spasi dan ubah ke huruf kecil
        switch (normalizedStatus) {
          case "aktif":
            return "green"; // Hijau untuk status aktif
          case "non aktif":
            return "red"; // Merah untuk tidak aktif
          default:
            return ""; // Default warna
        }
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
    }
}
</script>

<style scoped>
.custom-btn-size {
  min-width: 30px !important;
  height: 30px !important;
  padding: 4px !important;
  margin-right: 4px; /* Jarak antar tombol */
}

</style>
