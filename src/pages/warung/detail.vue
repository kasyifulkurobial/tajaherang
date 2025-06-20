<template>
  <v-container v-if="warungDetail">
    <!-- Header -->
    <div>
      <v-row align="center">
        <v-icon @click="goBack" class="cursor-pointer">
          mdi-arrow-left
        </v-icon>
        <h1 class="pl-5">Informasi {{ warungDetail.name }}</h1>
      </v-row>
    </div>

    <!-- Detail Warung -->
    <div class="py-8">
      <v-row>
        <v-col cols="12" md="12">
          <v-img :src="warungDetail.image" alt="Warung Image" class="rounded-s-lg mx-auto"></v-img>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="12" md="3" offset="4">
          <h4>Penjaga Warung: {{ warungDetail.guardName }}</h4>
        </v-col>
        <v-col cols="12" md="5">
          <h4>Status: {{ warungDetail.status }}</h4>
        </v-col>
      </v-row>
    </div>

    <!-- Tabel -->
    <div>
      <!-- Tabel Transaksi -->
      <div class="py-8">
        <div class="py-4">
          <h3>Transaksi</h3>
        </div>

        <!-- FIlter -->
        <div class="py-4">
            <v-row>
              <!-- Filter Search -->
              <v-col cols="12" md="4">
                <v-row>
                  <!-- Filter Search Id -->
                  <v-col cols="12" md="6">
                    <SearchComponent v-model="searchId" label="Search Id" />
                  </v-col>

                  <!-- Filter Search Name -->
                  <v-col cols="12" md="6">
                    <SearchComponent v-model="searchName" label="Search Nama" />
                  </v-col>
                </v-row>
              </v-col>

              <!-- Filter Date -->
              <v-col cols="12" md="5">
                <v-row>

                  <!-- Filter Start Date -->
                  <v-col cols="12" md="5">
                    <StartDate
                      :startDate="startDateTransactions"
                      @update:startDate="startDateTransactions = $event"
                    />
                  </v-col>

                  <!-- Filter End Date -->
                  <v-col cols="12" md="5">
                    <EndDate
                      :endDate="endDateTransactions"
                      @update:endDate="endDateTransactions = $event"
                    />
                  </v-col>
                  <v-col cols="12" md="1" class="d-flex align-center">
                    <v-btn
                      class="bg-cyan-darken-4 text-white"
                      rounded="xs"
                      block
                      size="x-large"
                      @click="clearTransactionFilters"
                    >
                      <v-icon icon="mdi-cached" />
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>

              <!-- Download Excel -->
              <v-col cols="12" md="3">
                <ButtonExcel
                  label="Download Excel"
                  :items="filteredTransactions"
                  file-name="Laporan Riwayat Transaksi.xlsx"
                />
              </v-col>
            </v-row>
        </div>

        <!-- Table Transaction -->
        <div>
          <TableComponent
          :headers="transactionHeaders"
          :items="filteredTransactions"
          item-key="id"
          items-per-page="5"
        /></div>
      </div>

      <!-- Tabel Pendapatan -->
      <div class="py-8">
        <div class="py-4">
          <h3>Pendapatan</h3>
        </div>

        <!-- Filter -->
        <div class="py-4">
          <v-row>
           <!-- Filter Bulan dan Tahun -->
           <v-col cols="12" md="4">
              <v-row>
                <!--  -->
                <v-col cols="12" md="6">
                  <MonthComponent v-model="selectedMonthRevenue" />
                </v-col>

                <v-col cols="12" md="6">
                  <YearComponent v-model="selectedYearRevenue" />
                </v-col>
              </v-row>
            </v-col>
            <!-- Filter Section -->
            <v-col cols="12" md="5">
              <v-row>
                <!-- Filter Start Date -->
                <v-col cols="12" md="5">
                    <StartDate
                      :startDate="startDateRevenues"
                      @update:startDate="startDateRevenues = $event"
                    />
                </v-col>

                <!-- Filter End Date -->
                <v-col cols="12" md="5">
                    <EndDate
                      :endDate="endDateRevenues"
                      @update:endDate="endDateRevenues = $event"
                    />
                </v-col>

                <!-- Reset Filter -->
                <v-col cols="12" md="1" class="d-flex align-center">
                  <ResetButton  @clear="clearRevenueFilters" />
                </v-col>
              </v-row>
            </v-col>

            <!-- Download Excel Button -->
            <v-col cols="12" md="3" class="d-flex align-center">
              <ButtonExcel
                label="Download Excel"
                :items="filteredRevenues"
                file-name="Laporan Riwayat Pendapatan.xlsx"
              />
            </v-col>
          </v-row>
        </div>

        <!-- Table Revenues -->
        <div class="py-4">
          <TableComponent
            :headers="revenueHeaders"
            :items="filteredRevenues"
            item-key="id"
            items-per-page="5"
          />
        </div>
      </div>

      <!-- Tabel Penarikan -->
      <div class="py-8">
        <div class="py-4">
          <h3>Penarikan</h3>
        </div>

        <!-- Filter -->
        <div class="py-4">
          <v-row>
            <!-- Filter Bulan dan Tahun -->
            <v-col cols="12" md="4">
              <v-row>
                <!--  -->
                <v-col cols="12" md="6">
                  <MonthComponent v-model="selectedMonthWithdrawal" />
                </v-col>

                <v-col cols="12" md="6">
                  <YearComponent v-model="selectedYearWithdrawal" />
                </v-col>
              </v-row>
            </v-col>
            <!-- Filter Section -->
            <v-col cols="12" md="5">
              <v-row>
                <!-- Filter Start Date -->
                <v-col cols="12" md="5">
                    <StartDate
                      :startDate="startDateWithdrawals"
                      @update:startDate="startDateWithdrawals = $event"
                    />
                </v-col>

                <!-- Filter End Date -->
                <v-col cols="12" md="5">
                    <EndDate
                      :endDate="endDateWithdrawals"
                      @update:endDate="endDateWithdrawals = $event"
                    />
                </v-col>

                <!-- Reset Filter -->
                <v-col cols="12" md="1" class="d-flex align-center">
                  <ResetButton  @clear="clearWithdrawalFilters" />
                </v-col>
              </v-row>
            </v-col>

            <!-- Download Excel Button -->
            <v-col cols="12" md="3" class="d-flex align-center">
              <ButtonExcel
                label="Download Excel"
                :items="filteredWithdrawals"
                file-name="Laporan Riwayat Penarikan.xlsx"
              />
            </v-col>
          </v-row>
        </div>

        <!-- Table Withdrawl -->
        <div class="py-4">
          <TableComponent
            :headers="withdrawalHeaders"
            :items="filteredWithdrawals"
            item-key="id"
            items-per-page="5"
          />
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
// Import Components
import TableComponent from "@/components/TableComponent.vue";
import MonthComponent from "@/components/MonthComponent.vue";
import YearComponent from "@/components/YearComponent.vue";
import StartDate from "@/components/StartDate.vue";
import EndDate from "@/components/EndDate.vue";
import ResetButton from "@/components/ResetButton.vue";
import ButtonExcel from "@/components/ButtonExcel.vue";
import SearchComponent from "@/components/SearchComponent.vue";
import image from "@/assets/image.png";

export default {
  components: {
    MonthComponent,
    YearComponent,
    StartDate,
    EndDate,
    ResetButton,
    TableComponent,
    SearchComponent,
    ButtonExcel,
  },
  data() {
    return {
      // Data utama
      id: null,
      warungDetail: null,
      transactions: [], // Data transaksi
      revenues: [],     // Data pendapatan
      withdrawals: [],  // Data penarikan

      searchId: "",
      searchName: "",

      // Filter untuk pendapatan (Revenue)
      selectedMonthRevenue: "",  // Filter bulan untuk pendapatan
      selectedYearRevenue: new Date().getFullYear(),  // Filter tahun untuk pendapatan

      // Filter untuk penarikan (Withdrawal)
      selectedMonthWithdrawal: "",  // Filter bulan untuk penarikan
      selectedYearWithdrawal: new Date().getFullYear(),  // Filter tahun untuk penarikan

      // Filter untuk transaksi
      startDateTransactions: null,
      endDateTransactions: null,

      // Filter untuk pendapatan
      startDateRevenues: null,
      endDateRevenues: null,

      // Filter untuk penarikan
      startDateWithdrawals: null,
      endDateWithdrawals: null,

      // Header untuk setiap tabel
      transactionHeaders: [
        { title: "ID Produk", align: "center", value: "id" },
        { title: "Produk", align: "center", value: "produk" },
        { title: "Tanggal", align: "center", value: "date" },
        { title: "Stock Awal", align: "center", value: "start" },
        { title: "Stok Akhir", align: "center", value: "end" },
        { title: "Jumlah Barang", align: "center", value: "amount" },
        { title: "Modal", align: "center", value: "modal" },
        { title: "Harga Jual", align: "center", value: "sell" },
        { title: "Profit", align: "center", value: "profit" },
      ],
      revenueHeaders: [
        { title: "Tanggal", align: "center", value: "date" },
        { title: "Harga Modal", align: "center", value: "modal" },
        { title: "Harga Jual", align: "center", value: "sell" },
        { title: "Laba", align: "center", value: "laba" },
      ],
      withdrawalHeaders: [
        { title: "ID Penarikan", align: "center", value: "id" },
        { title: "Informasi", align: "center", value: "information" },
        { title: "Tanggal Pengajuan", align: "center", value: "dateStart" },
        { title: "Nominal", align: "center", value: "nominal" },
        { title: "Tanggal Terkirim", align: "center", value: "dateFinish" },
        { title: "Status", align: "center", value: "status" },
        { title: "Action", align: "center", value: "aksi" },
      ],
    };
  },
  created() {
    this.fetchWarungDetail();
  },
  methods: {
    fetchWarungDetail() {
      // Ambil ID dari sessionStorage
      this.id = sessionStorage.getItem("tjx_WarungId");

      // Data mock untuk warung
      const mockData = [
        {
          id: "1",
          name: "Warung 1",
          guardName: "Joko Tingkir",
          status: "Kontrak",
          image: image,
          transactions: [
            { id: "t1", produk: "Produk A", date: "2024-01-01", start: 50, end: 30, amount: 20, modal: 100000, sell: 150000, profit: 50000 },
            { id: "t2", produk: "Produk B", date: "2024-01-02", start: 40, end: 20, amount: 20, modal: 80000, sell: 120000, profit: 40000 },
            { id: "t3", produk: "Produk C", date: "2024-01-03", start: 60, end: 45, amount: 15, modal: 75000, sell: 110000, profit: 35000 },
            { id: "t4", produk: "Produk D", date: "2024-01-04", start: 70, end: 50, amount: 20, modal: 90000, sell: 140000, profit: 50000 },
            { id: "t5", produk: "Produk E", date: "2024-01-05", start: 30, end: 10, amount: 20, modal: 60000, sell: 90000, profit: 30000 },
            { id: "t6", produk: "Produk F", date: "2024-01-06", start: 40, end: 25, amount: 15, modal: 70000, sell: 100000, profit: 30000 },
          ],
          revenues: [
            { date: "2024-01-01", modal: 100000, sell: 150000, laba: 50000 },
            { date: "2024-01-02", modal: 80000, sell: 120000, laba: 40000 },
            { date: "2024-01-03", modal: 75000, sell: 110000, laba: 35000 },
            { date: "2024-01-04", modal: 90000, sell: 140000, laba: 50000 },
            { date: "2024-01-05", modal: 60000, sell: 90000, laba: 30000 },
            { date: "2024-01-06", modal: 70000, sell: 100000, laba: 30000 },
          ],
          withdrawals: [
            { id: "w1", information: "Penarikan ke Bank A", dateStart: "2024-01-15", nominal: 20000, dateFinish: "2024-01-16", status: "Sukses" },
            { id: "w2", information: "Penarikan ke Bank B", dateStart: "2024-02-01", nominal: 15000, dateFinish: "2024-02-02", status: "Pending" },
            { id: "w3", information: "Penarikan ke Bank C", dateStart: "2024-02-15", nominal: 25000, dateFinish: "2024-02-16", status: "Sukses" },
            { id: "w4", information: "Penarikan ke Bank D", dateStart: "2024-03-01", nominal: 18000, dateFinish: "2024-03-02", status: "Pending" },
            { id: "w5", information: "Penarikan ke Bank E", dateStart: "2024-03-15", nominal: 30000, dateFinish: "2024-03-16", status: "Sukses" },
            { id: "w6", information: "Penarikan ke Bank F", dateStart: "2024-04-01", nominal: 22000, dateFinish: "2024-04-02", status: "Pending" },
          ],
        },
        {
          id: "2",
          name: "Warung 2",
          guardName: "Siti Nurbaya",
          status: "Tetap",
          image: image,
          transactions: [
            { id: "t7", produk: "Produk G", date: "2024-02-01", start: 60, end: 40, amount: 20, modal: 120000, sell: 180000, profit: 60000 },
            { id: "t8", produk: "Produk H", date: "2024-02-02", start: 50, end: 35, amount: 15, modal: 90000, sell: 135000, profit: 45000 },
            { id: "t9", produk: "Produk I", date: "2024-02-03", start: 40, end: 20, amount: 20, modal: 80000, sell: 120000, profit: 40000 },
            { id: "t10", produk: "Produk J", date: "2024-02-04", start: 70, end: 60, amount: 10, modal: 70000, sell: 105000, profit: 35000 },
            { id: "t11", produk: "Produk K", date: "2024-02-05", start: 100, end: 90, amount: 10, modal: 150000, sell: 170000, profit: 20000 },
            { id: "t12", produk: "Produk L", date: "2024-02-06", start: 80, end: 70, amount: 10, modal: 120000, sell: 140000, profit: 20000 },
          ],
          revenues: [
            { date: "2024-02-01", modal: 120000, sell: 180000, laba: 60000 },
            { date: "2024-02-02", modal: 90000, sell: 135000, laba: 45000 },
            { date: "2024-02-03", modal: 80000, sell: 120000, laba: 40000 },
            { date: "2024-02-04", modal: 70000, sell: 105000, laba: 35000 },
            { date: "2024-02-05", modal: 150000, sell: 170000, laba: 20000 },
            { date: "2024-02-06", modal: 120000, sell: 140000, laba: 20000 },
          ],
          withdrawals: [
            { id: "w7", information: "Penarikan ke Bank G", dateStart: "2024-02-15", nominal: 25000, dateFinish: "2024-02-16", status: "Sukses" },
            { id: "w8", information: "Penarikan ke Bank H", dateStart: "2024-02-20", nominal: 18000, dateFinish: "2024-02-21", status: "Pending" },
            { id: "w9", information: "Penarikan ke Bank I", dateStart: "2024-02-25", nominal: 20000, dateFinish: "2024-02-26", status: "Sukses" },
            { id: "w10", information: "Penarikan ke Bank J", dateStart: "2024-03-01", nominal: 15000, dateFinish: "2024-03-02", status: "Pending" },
            { id: "w11", information: "Penarikan ke Bank K", dateStart: "2024-03-05", nominal: 30000, dateFinish: "2024-03-06", status: "Sukses" },
            { id: "w12", information: "Penarikan ke Bank L", dateStart: "2024-03-10", nominal: 22000, dateFinish: "2024-03-11", status: "Pending" },
          ],
        },
        {
          id: "3",
          name: "Warung 3",
          guardName: "Ahmad Dahlan",
          status: "Kontrak",
          image: image,
          transactions: [
            { id: "t13", produk: "Produk M", date: "2024-03-01", start: 45, end: 30, amount: 15, modal: 85000, sell: 120000, profit: 35000 },
            { id: "t14", produk: "Produk N", date: "2024-03-02", start: 55, end: 35, amount: 20, modal: 100000, sell: 150000, profit: 50000 },
            { id: "t15", produk: "Produk O", date: "2024-03-03", start: 35, end: 25, amount: 10, modal: 60000, sell: 90000, profit: 30000 },
            { id: "t16", produk: "Produk P", date: "2024-03-04", start: 60, end: 50, amount: 10, modal: 70000, sell: 100000, profit: 30000 },
            { id: "t17", produk: "Produk Q", date: "2024-03-05", start: 80, end: 70, amount: 10, modal: 120000, sell: 140000, profit: 20000 },
            { id: "t18", produk: "Produk R", date: "2024-03-06", start: 90, end: 85, amount: 5, modal: 90000, sell: 95000, profit: 5000 },
          ],
          revenues: [
            { date: "2024-03-01", modal: 85000, sell: 120000, laba: 35000 },
            { date: "2024-03-02", modal: 100000, sell: 150000, laba: 50000 },
            { date: "2024-03-03", modal: 60000, sell: 90000, laba: 30000 },
            { date: "2024-03-04", modal: 70000, sell: 100000, laba: 30000 },
            { date: "2024-03-05", modal: 120000, sell: 140000, laba: 20000 },
            { date: "2024-03-06", modal: 90000, sell: 95000, laba: 5000 },
          ],
          withdrawals: [
            { id: "w13", information: "Penarikan ke Bank M", dateStart: "2024-03-15", nominal: 22000, dateFinish: "2024-03-16", status: "Sukses" },
            { id: "w14", information: "Penarikan ke Bank N", dateStart: "2024-03-20", nominal: 25000, dateFinish: "2024-03-21", status: "Pending" },
            { id: "w15", information: "Penarikan ke Bank O", dateStart: "2024-03-25", nominal: 20000, dateFinish: "2024-03-26", status: "Sukses" },
            { id: "w16", information: "Penarikan ke Bank P", dateStart: "2024-04-01", nominal: 30000, dateFinish: "2024-04-02", status: "Pending" },
            { id: "w17", information: "Penarikan ke Bank Q", dateStart: "2024-04-05", nominal: 18000, dateFinish: "2024-04-06", status: "Sukses" },
            { id: "w18", information: "Penarikan ke Bank R", dateStart: "2024-04-10", nominal: 25000, dateFinish: "2024-04-11", status: "Pending" },
          ],
        },
      ];

      // Cari data berdasarkan ID
      this.warungDetail = mockData.find((warung) => warung.id === this.id);

      if (this.warungDetail) {
        this.transactions = this.warungDetail.transactions || [];
        this.revenues = this.warungDetail.revenues || [];
        this.withdrawals = this.warungDetail.withdrawals || [];
      } else {
        console.error("Warung not found!");
      }
    },
    // Route Kembali
    goBack() {
      // Kembali ke halaman sebelumnya
      this.$router.back();
    },

    // Clear Filter untuk masing-masing tabel
    clearTransactionFilters() {
      this.startDateTransactions = null;
      this.endDateTransactions = null;
    },
    clearRevenueFilters() {
      this.startDateRevenues = null;
      this.endDateRevenues = null;
      this.selectedMonthRevenue = "";
      this.selectedRevenueYear = "";
    },
    clearWithdrawalFilters() {
      this.startDateWithdrawals = null;
      this.endDateWithdrawals = null;
      this.selectedMonthWithdrawal = "";
      this.selectedWithdrawalYear = "";
    },
  },
  watch: {
    selectedMonthWithdrawal(newMonth) {
      console.log("Selected Month Withdrawal:", newMonth); // Pastikan nilai bulan penarikan diperbarui
    },
    selectedYearWithdrawal(newYear) {
      console.log("Selected Year Withdrawal:", newYear); // Pastikan nilai tahun penarikan diperbarui
    },
    selectedMonthRevenue(newMonth) {
      console.log("Selected Month Revenue:", newMonth); // Pastikan nilai bulan pendapatan diperbarui
    },
    selectedYearRevenue(newYear) {
      console.log("Selected Year Revenue:", newYear); // Pastikan nilai tahun pendapatan diperbarui
    }
  },
  computed: {
    filteredTransactions() {
      return this.transactions.filter((item) => {
        const itemDate = new Date(item.date); // Mengubah item.date menjadi objek Date

        // Pemfilteran berdasarkan startDateTransactions
        const matchesStartDate = this.startDateTransactions
          ? itemDate >= new Date(this.startDateTransactions)
          : true;

        // Pemfilteran berdasarkan endDateTransactions
        const matchesEndDate = this.endDateTransactions
          ? itemDate <= new Date(this.endDateTransactions)
          : true;

        // Pemfilteran berdasarkan searchId (mencocokkan id transaksi dengan searchId)
        const matchesSearchId = this.searchId
          ? item.id.toString().includes(this.searchId) // Asumsi id transaksi berupa string atau angka
          : true;

        // Pemfilteran berdasarkan searchName (mencocokkan nama transaksi dengan searchName)
        const matchesSearchName = this.searchName
          ? item.produk.toLowerCase().includes(this.searchName.toLowerCase()) // Pencocokan nama dengan mengabaikan kapitalisasi
          : true;

        // Mengembalikan transaksi yang memenuhi semua kriteria filter
        return matchesStartDate && matchesEndDate && matchesSearchId && matchesSearchName;
      });
    },

    // Filter pendapatan berdasarkan tanggal, bulan, dan tahun
    filteredRevenues() {
      return this.revenues.filter((item) => {
        const itemDate = new Date(item.date);
        const itemMonth = itemDate.getMonth() + 1; // 0-indexed month
        const itemYear = itemDate.getFullYear();

        const matchesMonth = this.selectedMonthRevenue
          ? itemMonth === parseInt(this.selectedMonthRevenue)
          : true;
        const matchesYear = this.selectedYearRevenue
          ? itemYear === parseInt(this.selectedYearRevenue)
          : true;

        const matchesStartDate = this.startDateRevenues
          ? itemDate >= new Date(this.startDateRevenues)
          : true;
        const matchesEndDate = this.endDateRevenues
          ? itemDate <= new Date(this.endDateRevenues)
          : true;

        return matchesMonth && matchesYear && matchesStartDate && matchesEndDate;
      });
    },

    // Filter penarikan berdasarkan tanggal, bulan, dan tahun
    filteredWithdrawals() {
      return this.withdrawals.filter((item) => {
        const itemDate = new Date(item.dateStart);
        const itemMonth = itemDate.getMonth() + 1; // 0-indexed month
        const itemYear = itemDate.getFullYear();

        const matchesMonth = this.selectedMonthWithdrawal ? itemMonth === parseInt(this.selectedMonthWithdrawal) : true;
        const matchesYear = this.selectedYearWithdrawal ? itemYear === parseInt(this.selectedYearWithdrawal) : true;

        const matchesStartDate = this.startDateWithdrawals
          ? itemDate >= new Date(this.startDateWithdrawals)
          : true;
        const matchesEndDate = this.endDateWithdrawals
          ? itemDate <= new Date(this.endDateWithdrawals)
          : true;

        return matchesMonth && matchesYear && matchesStartDate && matchesEndDate;
      });
    },
  }
};
</script>

