<template>
  <v-container>
    <div>
      <AppHeader title="Gaji Karyawan"/>
    </div>

    <!-- Card -->
    <div class="pt-8">
      <v-row>
        <!-- Menggunakan Properti Icon -->
        <InfoCard
          title="Total Gaji"
          value="10.000.000"
          cardClass="text-cyan-darken-4"
        />


        <InfoCard
          title="Total PPH"
          value="2.000.000"
          cardClass="text-green-darken-4"
        />

        <InfoCard
          title="Total BPJS"
          value="1.000.000"
          cardClass="text-green-darken-4"
        />

      </v-row>
    </div>

    <div>
      <!-- Filter Search -->
      <v-row class="mt-8" align="center">
            <!-- Kolom Pencarian -->
            <v-col cols="12" md="5">
                  <SearchComponent
                  v-model="searchQuery"
                  label="Search Nama atau NIP"
                  />
            </v-col>

            <!-- Kolom Tombol -->
            <v-col cols="12" md="3" class="ml-auto">
                  <AddComponent
                    label="Tambah Transaksi"
                    :routePath="addKaryawan()"
                  />

            </v-col>

            <!-- Tombol Excel -->
            <v-col cols="12" md="3">
                  <ButtonExcel
                  label="Download Excel"
                  :items="filteredItems"
                  file-name="Laporan Gaji Karyawan.xlsx"
                  />
            </v-col>
      </v-row>

      <v-row >
        <!-- Tabel -->
        <TableComponent
                  :headers="headers"
                  :items="filteredItems"
                  item-key="id"
                  items-per-page="5"
                  @viewDetail="handleViewDetail"
            />
      </v-row>
    </div>

  </v-container>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import InfoCard from '@/components/InfoCard.vue';
import SearchComponent from '@/components/SearchComponent.vue';
import AddComponent from '@/components/AddComponent.vue';
import ButtonExcel from '@/components/ButtonExcel.vue';
import TableComponent from '@/components/TableComponent.vue';


export default {
  components:{
    AppHeader,
    InfoCard,
    SearchComponent,
    AddComponent,
    ButtonExcel,
    TableComponent
  },
  data(){
    return{
      searchQuery:"",
      headers:[
        {title: "id", value: "id", hidden: true},
        {title: "NIP", value: "nip"},
        {title: "nama", value: "email"},
        {title: "Status Staff", value: "staf"},
        {title:"Gaji" , value: "gaji"},
        {title: "PPH", value: "pph"},
        {title: "BPJS", value: "bpjs"},
        {title: "Status Pembayaran", value: "pembayaran"},
        {title: "Status Peminjaman", value: "peminjaman"},
        {title: "Detail", value: "detail"}
      ],
      items: [
        {id: "1", nip: "123456", email: ["Justin", "justin@gmail.com"], staf: ["Tetap", "Akuntan"], gaji: "4000000", pph: "100000", bpjs: "50000", pembayaran: ["Done", "20 November 2023"], peminjaman: "Dapat Meminjam", detail: "View More"},
        {id: "2", nip: "123456", email: ["Babilonia", "babilonia@gmail.com"], staf: ["Tetap", "Warung"], gaji: "4000000", pph: "100000", bpjs: "50000", pembayaran: ["Failed", "20 November 2023"], peminjaman: "Dapat Meminjam", detail: "View More"},
        {id: "3", nip: "0123456", email: ["Yunani", "yunani@otlook.gmail.com"], staf:["Kontrak", "Loket"], gaji: "4000000", pph: "100000", bpjs: "50000", pembayaran: ["Proccess", "20 November 2023"], peminjaman: "Dapat Meminjam", detail: "View More"},
        {id: "4", nip: "123456", email: ["Dalton", "dalton@yahoo.com"], staf:["Tetap", "Warung"], gaji: "4000000", pph: "100000", bpjs: "50000", pembayaran: ["Done", "20 November 2023"], peminjaman: "Dapat Meminjam", detail: "View More"},
        {id: "5", nip: "123456", email: ["Bambang", "bambang@gmail.com"], staf:["Magang", "Akuntan"], gaji: "4000000", pph: "100000", bpjs: "50000", pembayaran: ["Failed", "20 November 2023"], peminjaman: "Dapat Meminjam", detail: "View More"},
        {id: "6", nip: "123456", email: ["Atom", "atom@gmail.com"], staf:["Tetap", "Warung"], gaji: "4000000", pph: "100000", bpjs: "50000", pembayaran: ["Done", "20 November 2023"], peminjaman: "Dapat Meminjam", detail: "View More"},
      ]
    }
  },
  computed: {
    filteredItems(){
      const query = this.searchQuery.toLowerCase();
      return this.items.filter(item =>
        item.email[0].toLowerCase().includes(query) || // Nama
        item.email[1].toLowerCase().includes(query) || // Email
        item.nip.toLowerCase().includes(query)
      );
    }
  },
  methods: {
    addKaryawan() {
      return "/karyawan/add";
    },
    handleViewDetail(item) {
      // Simpan data ke Session Storage
      sessionStorage.setItem("selectedItem", JSON.stringify(item));

      // Arahkan ke halaman detail
      this.$router.push("/karyawan/detail");
    },
},
}
</script>
