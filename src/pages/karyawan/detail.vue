<template>
  <v-container>
    <div>
      <AppHeader title="Informasi Karyawan" />
    </div>

    <div class="pt-10 font-weight-bold text-cyan-darken-4">
      <v-row>
        <v-col cols="12" md="3">
          <v-img
            src="../../assets/squidword.jpg"
            alt="Foto Profil"
            aspect-ratio="1"
            class="rounded-lg"
            contain
          />

        </v-col>
        <v-col cols="12" md="8">
          <v-row>
            <v-col cols="12" md="2">
              Nama
            </v-col>
            <v-col cols="12" md="1">
              :
            </v-col>
            <v-col cols="12" md="7">
              {{  item.email[0] }}
            </v-col>
          </v-row>

          <!-- Email -->
          <v-row>
            <v-col cols="12" md="2">
              Email
            </v-col>
            <v-col cols="12" md="1">
              :
            </v-col>
            <v-col cols="12" md="7">
              {{  item.email[1] }}
            </v-col>
          </v-row>

          <!-- Jabatan -->
          <v-row>
            <v-col cols="12" md="2">
              Jabatan
            </v-col>
            <v-col cols="12" md="1">
              :
            </v-col>
            <v-col cols="12" md="7">
              {{  item.staf.join(", ") }}
            </v-col>
          </v-row>

        </v-col>
      </v-row>
    </div>

    <div class="pt-10">
      <v-card>
        <div class="px-6">
          <v-row class="my-5" align="center">
                <!-- Kolom Pencarian -->
                <v-col cols="12" md="5" class="text-cyan-darken-4">
                      <h2>Riwayat Gaji Karyawan</h2>
                </v-col>

                <!-- Tombol Excel -->
                <v-col class="ml-auto" cols="12" md="3">
                      <ButtonExcel
                      label="Download Excel"
                      :items="calculatedItemsGaji"
                      file-name="Laporan Transaksi.xlsx"
                      />
                </v-col>
          </v-row>

          <TableComponent
          :headers="headersGaji"
          :items="calculatedItemsGaji"
          items-per-page="5"
          />
        </div>
      </v-card>
    </div>

    <!-- Presensi -->
    <div class="pt-6">
      <v-card class="pt-6">
        <div>
          <h2 class="text-cyan-darken-4 pl-6">Presensi</h2>
        </div>

        <div class="px-6 py-6 ">
          <v-row>
              <InfoCard
                title="Total Masuk"
                value="10.000.000"
                md="3"
                icon="mdi-account"
                cardClass="text-cyan-darken-4"
              />

              <InfoCard
                title="Terlambat"
                value="10.000.000"
                md="3"
                icon="mdi-clock-outline"
                cardClass="text-cyan-darken-4"
              />

              <InfoCard
                title="Total Cuti"
                value="10.000.000"
                md="3"
                icon="mdi-information"
                cardClass="text-cyan-darken-4"
              />

              <InfoCard
                title="Tidak Masuk"
                value="10.000.000"
                md="3"
                icon="mdi-alert"
                cardClass="text-cyan-darken-4"
              />
          </v-row>

          <v-row>
            <!-- Filter Section -->
            <v-col cols="12" md="8">
              <v-row>
                <v-col cols="12" md="3">
                  <StartDate
                  :startDate="startDate"
                  @update:startDate="startDate = $event"/>
                </v-col>
                <v-col cols="12" md="3">
                  <EndDate
                  :endDate="endDate"
                  @update:endDate="endDate = $event"
                  />
                </v-col>
                <v-col cols="12" md="1" class="d-flex align-center">
                  <ResetButton  @clear="clearFilters" />
                </v-col>
              </v-row>
            </v-col>

            <v-col
            cols="12"
            md="4"
            class="d-flex align-center justify-center">
              <v-row>
                <v-btn
                  v-for="(status, index) in statuses"
                  :key="index"
                  :class="{'bg-cyan-darken-4 text-white': selectedStatus === status, 'bg-white text-blue-grey-lighten-3': selectedStatus !== status}"
                  @click="setStatus(status)"
                >
                  {{ status }}
                </v-btn>
              </v-row>
            </v-col>
          </v-row>

          <v-row>
            <v-data-table
              :headers="headersPresensi"
              :items="filteredItemsPresensi"
              items-per-page="10"
            >
              <template v-slot:item.status="{ item }">
                <!-- Kondisi Warna berdasarkan Status -->
                <v-chip
                  variant="outlined"
                  :color="getStatusColor(item.status)"
                  dark
                >
                  {{ item.status }}
                </v-chip>
              </template>
            </v-data-table>
          </v-row>
        </div>
      </v-card>
    </div>

    <v-btn @click="$router.back()" class="mt-4">Kembali</v-btn>
  </v-container>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import ButtonExcel from '@/components/ButtonExcel.vue';
import TableComponent from '@/components/TableComponent.vue';
import StartDate from '@/components/StartDate.vue';
import EndDate from '@/components/EndDate.vue';
import ResetButton from '@/components/ResetButton.vue';

export default {
  component:{
    AppHeader,
    ButtonExcel,
    TableComponent,
    StartDate,
    EndDate,
    ResetButton
  },
  data() {
    return {
      startDate: "",
      endDate: "",

      selectedStatus: "Semua",
      statuses: ["Semua", "Masuk", "Cuti", "Tidak Masuk" ],

      // Data Gaji
      headersGaji:[
        {title: "Tanggal", value: "tanggal"},
        {title: "Gaji", value: "gaji"},
        {title: "Bonus", value: "bonus"},
        {title: "PPH", value: "pph"},
        {title: "BPJS", value: "bpjs"},
        {title: "Total gaji", value: "total"},
      ],
      filteredItemsGaji:[
        {tanggal: "2 Februari 2024", gaji: 6000000, bonus: 250000, pph: 100000, bpjs: 50000},
        {tanggal: "2 Februari 2024", gaji: 4000000, bonus: 250000, pph: 100000, bpjs: 50000},
        {tanggal: "2 Februari 2024", gaji: 3000000, bonus: 250000, pph: 100000, bpjs: 50000},
        {tanggal: "2 Februari 2024", gaji: 5000000, bonus: 250000, pph: 100000, bpjs: 50000},
        {tanggal: "2 Februari 2024", gaji: 5500000, bonus: 250000, pph: 100000, bpjs: 50000},
        {tanggal: "2 Februari 2024", gaji: 4500000, bonus: 250000, pph: 100000, bpjs: 50000},
        {tanggal: "2 Februari 2024", gaji: 3500000, bonus: 250000, pph: 100000, bpjs: 50000},
      ],

      headersPresensi: [
        { title: "Id", align: "center", value: "id" },
        { title: "Nama", align: "center", value: "nama" },
        { title: "Tanggal", align: "center", value: "tanggal" },
        { title: "Jam Masuk", align: "center", value: "jamMasuk" },
        { title: "Jam Keluar", align: "center", value: "jamKeluar" },
        { title: "Status", align: "center", value: "status" },
      ],
      filteredItemsPresensi: [
        { id: "123", nama: "Asep", tanggal: "2/1/2022", jamMasuk: "08:00", jamKeluar: "16:00", status: "Masuk" },
        { id: "123", nama: "Asep", tanggal: "2/1/2022", jamMasuk: "08:30", jamKeluar: "16:00", status: "Terlambat" },
        { id: "123", nama: "Asep", tanggal: "2/1/2022", jamMasuk: "-", jamKeluar: "-", status: "Tidak masuk" },
        // Data lainnya
      ],
    };
  },
  computed:{
    calculatedItemsGaji() {
      return this.filteredItemsGaji.map(item => ({
        ...item,
        total: item.gaji + item.bonus - item.pph - item.bpjs,
      }));
    },
  },
  methods:{
    getStatusColor(status) {
      switch (status) {
        case "Masuk":
          return "green darken-1";
        case "Terlambat":
          return "orange darken-1";
        case "Tidak masuk":
          return "red darken-1";
        default:
          return "grey darken-1";
      }
    },
    setStatus(status){
      this.selectedStatus=status;
      console.log(this.selectedStatus);
    },
    clearFilters(){
      this.startDate="";
      this.endDate="";
    }
  },
  created() {
    // Ambil data dari Session Storage
    const storedItem = sessionStorage.getItem("selectedItem");
    if (storedItem) {
      this.item = JSON.parse(storedItem);
    } else {
      // Jika tidak ada data, arahkan kembali
      this.$router.push("/");
    }
  },
};
</script>
