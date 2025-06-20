<template>
<v-container>
      <AppHeader title="Tiket" />
      <v-card class="py-4 mt-10">
            <h2 class="pl-4 text-cyan-darken-4">Akun Pegunjung</h2>
            <v-row>
                  <v-col cols="12" md="6">
                        <v-text-field class="px-4 mt-5" v-model="search" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined" hide-details></v-text-field>
                  </v-col>
                  <v-col cols="12" offset="3" md="3">
                        <v-btn class="bg-cyan-darken-4 text-white" rounded="xs" size="x-large" @click="downloadExcel">
                              <v-icon icon="mdi-download" class="mr-2" />
                              Download Excel
                        </v-btn>
                  </v-col>
            </v-row>

            <v-data-table
                :headers="headersPengunjung"
                :items="itemsPengunjung"
                :loading="loading"
                :items-per-page="totalItems"
                :search="search"
                class="px-4 mt-10">

                  <template v-slot:item.statusMasuk="{ item }">
                        <v-chip
                              label
                              variant="outlined"
                              :color="getColorStatusMasuk(item.statusMasuk)"
                              class="mb-1"
                              dark>
                                {{ item.statusMasuk }}
                        </v-chip>
                  </template>

                  <template v-slot:item.statusKeluar="{ item }">
                        <!-- Menampilkan setiap statusMasuk sebagai chip dengan warna -->
                        <v-chip label
                              variant="outlined"
                              :color="getColorStatusKeluar(item.statusKeluar)"
                              class="mb-1"
                              dark>
                                    {{ item.statusKeluar }}
                        </v-chip>
                  </template>

                  <template v-slot:item.aksi="{ item }">
                        <v-btn variant="plain" class="text-indigo-accent-4 font-weight-bold" icon @click="$emit('edit', item)">
                              <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn variant="plain" class="text-red-accent-4 font-weight-bold" icon @click="$emit('delete', item.id)">
                              <v-icon>mdi-delete</v-icon>
                        </v-btn>
                  </template>
            </v-data-table>
      </v-card>

      <v-card class="py-4 mt-10">
            <h2 class="pl-4 text-cyan-darken-4">Akun Karyawan</h2>
            <v-row class="mt-5">
                  <v-col cols="12" md="6">
                        <v-text-field class="px-4 mt-5jnuh" v-model="search" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined" hide-details></v-text-field>
                  </v-col>

                  <v-col cols="12" offset="3" md="3">
                        <v-btn class="bg-cyan-darken-4 text-white" rounded="xs" size="x-large" @click="downloadExcel">
                              <v-icon icon="mdi-download" class="mr-2" />
                              Download Excel
                        </v-btn>
                  </v-col>
            </v-row>

            <v-data-table
                :headers="headersKaryawan"
                :items="itemsKaryawan"
                :loading="loading"
                :items-per-page="totalItems"
                :search="search"
                class="px-4 mt-10">
                  <template v-slot:item.aksi="{ item }">
                        <v-btn variant="plain" class="text-indigo-accent-4 font-weight-bold" icon @click="$emit('edit', item)">
                          <v-icon >mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn variant="plain" class="text-black font-weight-bold" icon @click="$emit('view', item.id)">
                          <v-icon>mdi-eye</v-icon>
                        </v-btn>
                        <v-btn variant="plain" class="text-red-accent-4 font-weight-bold" icon @click="$emit('delete', item.id)">
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
                  // Akun Pengunjung
                  headersPengunjung: [
                        {title: "ID",align: "center",value: "id"},
                        {title: "Barcode",align: "center",value: "barcode"},
                        {title: "Nama",align: "center",value: "nama"},
                        {title: "Status Masuk",align: "center",value: "statusMasuk"},
                        {title: "Tanggal",align: "center",value: "tanggal"},
                        {title: "Entry In",align: "center",value: "entryin"},
                        {title: "Status Keluar",align: "center",value: "statusKeluar"},
                        {title: "Entry Out",align: "center",value: "entryout"},
                        {title: "Status",align: "center",value: "status"},
                        {title: "Aksi",align: "center",value: "aksi"},
                  ],
                  itemsPengunjung: [
                        {id: "1",barcode: "xyfuaf",nama: "Andi",tanggal: "2023-01-01",entryin: "10.00",statusMasuk: "Active",statusKeluar: "In Active",entryout: "13.00",status: "Active",},
                        {id: "2",barcode: "fnjsabl",nama: "Budi",tanggal: "2023-01-01",entryin: "10.00",statusMasuk: "Process",statusKeluar: "In Active",entryout: "13.00",status: "Active",},
                        {id: "3",barcode: "fnaklnf",nama: "Caca",tanggal: "2023-01-01",entryin: "10.00",statusMasuk: "In Active",statusKeluar: "In Active",entryout: "13.00",status: "Active",},
                  ],

                  // AKun Karyawan
                  headersKaryawan: [
                        {title: "Nomor",align: "center",value: "id"},
                        {title: "NIP",align: "center",value: "nip"},
                        {title: "Nama",align: "center",value: "nama"},
                        {title: "EMail",align: "center",value: "email"},
                        {title: "Jenis Kelamin",align: "center",value: "gender"},
                        {title: "Jabatan",align: "center",value: "jabatan"},
                        {title: "Aksi",align: "center",value: "aksi"},
                  ],
                  itemsKaryawan: [
                        {id: "1",nip: "123456789",nama: "Andi",email: "andi@example.com",gender: "Laki-laki",jabatan: "Akuntan"},
                        {id: "2",nip: "123456789",nama: "Budi",email: "budi@example.com",gender: "Laki-laki",jabatan: "Akuntan"},
                        {id: "3",nip: "123456789",nama: "Caca",email: "caca@example.com",gender: "Perempuan",jabatan: "Akuntan"},
                        {id: "4",nip: "123456789",nama: "Dedi",email: "dedi@example.com",gender: "Laki-laki",jabatan: "Sales"},
                        {id: "5",nip: "123456789",nama: "Eka",email: "z2D0j@example.com",gender: "Laki-laki",jabatan: "Sales"},
                        {id: "6",nip: "123456789",nama: "Feri",email: "z2D0j@example.com",gender: "Laki-laki",jabatan: "Sales"},
                        {id: "7",nip: "123456789",nama: "Gigi",email: "z2D0j@example.com",gender: "Laki-laki",jabatan: "Sales"},
                        {id: "8",nip: "123456789",nama: "Hari",email: "z2D0j@example.com",gender: "Laki-laki",jabatan: "Warung"},
                        {id: "9",nip: "123456789",nama: "Ika",email: "z2D0j@example.com",gender: "Perempuan",jabatan: "Warung"},
                        {id: "10",nip: "123456789",nama: "Jono",email: "z2D0j@example.com",gender: "Laki-laki",jabatan: "Manager"},
                  ],
                  loading: false,
                  totalItems: 5,
                  search: "",
            };
      },
      methods: {
            getColorStatusMasuk(statusMasuk) {
                  // Warna status berdasarkan nilai
                  switch (statusMasuk) {
                        case "Active":
                              return "green"; // Hijau untuk status aktif
                        case "In Active":
                              return "red"; // Merah untuk tidak aktif
                        case "Process":
                              return "yellow"; // Kuning untuk status proses
                        default:
                              return ""; // Default warna abu-abu
                  }
            },

            getColorStatusKeluar(statusKeluar) {
                  // Warna status berdasarkan nilai
                  switch (statusKeluar) {
                        case "Active":
                              return "green"; // Hijau untuk status aktif
                        case "In Active":
                              return "red"; // Merah untuk tidak aktif
                        case "Process":
                              return "yellow"; // Kuning untuk status proses
                        default:
                              return "grey"; // Default warna abu-abu
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
                  XLSX.writeFile(workbook, "TiketData.xlsx");
            },
      },
};
</script>
