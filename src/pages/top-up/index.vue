<template>
  <v-container>
    <!-- Start Title Component -->
    <div>
      <AppHeader title="Top Up" />
    </div>
    <!-- End Title Component -->

    <div class="d-flex justify-center py-4 px-5 mt-10">
      <!-- Tombol untuk menampilkan overlay -->
      <v-btn class="text-cyan-darken-4 font-weight-bold" max-width="500" @click="overlay = !overlay">
        Top Up
        <v-icon end>mdi-cash</v-icon>
      </v-btn>

      <!-- Start Overlay -->
      <v-overlay v-model="overlay" class="align-center justify-center" contained>
        <v-card class="mx-auto px-6 py-4" max-width="450">
          <v-form ref="form" v-model="isValid" lazy-validation>
            <v-row>
              <v-col class="text-center my-2">
                <h4 class="text-h5 text-cyan-darken-4 font-weight-bold">Top Up</h4>
              </v-col>

              <!-- Input Nominal Top Up -->
              <v-col cols="12">
                <v-text-field
                  rounded="xl"
                  v-model="topUp"
                  color="cyan-darken-4"
                  label="Top Up"
                  placeholder="Masukkan Nominal Top Up"
                  type="number"
                  :rules="[rules.required, rules.isPositive]"
                ></v-text-field>
              </v-col>

              <!-- Input Nominal Bayar -->
              <v-col cols="12">
                <v-text-field
                  rounded="xl"
                  v-model="bayar"
                  color="cyan-darken-4"
                  label="Bayar"
                  placeholder="Masukkan Nominal Bayar"
                  type="number"
                  :rules="[rules.required, rules.isPositive]"
                  @input="calculateChange"
                ></v-text-field>
              </v-col>

              <!-- Output Kembalian -->
              <v-col cols="12">
                <v-text-field
                  rounded="xl"
                  v-model="kembali"
                  color="cyan-darken-4"
                  label="Kembali"
                  placeholder="Nominal Kembalian"
                  readonly
                ></v-text-field>
              </v-col>

              <!-- Tombol Submit -->
              <v-col cols="8" offset="2">
                <v-btn
                  rounded="xl"
                  class="bg-cyan-darken-4 font-weight-bold text-white"
                  size="large"
                  block
                  type="submit"
                  @click="submitForm"
                  :disabled="!isValid"
                >
                  Submit
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-overlay>
      <!-- End Overlay -->
    </div>

    <!-- Start Content -->
    <div>
      <v-card class="py-4 px-5 mt-12">
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

          <!-- Download Excel Button -->
          <v-col cols="12" md="3" offset="1" class="d-flex align-center">
            <ButtonExcel
              label="Download Excel"
              :items="filteredItems"
              file-name="Laporan Top Up.xlsx"
            />
          </v-col>
        </v-row>

        <!-- Component Table -->
        <TableComponent
          :headers="headers"
          :items="filteredItems"
          item-key="id"
          items-per-page="5"
        />
      </v-card>
    </div>
    <!-- End Content -->
  </v-container>
</template>

<script>
import TableComponent from "@/components/TableComponent.vue";
import StartDate from "@/components/StartDate.vue";
import EndDate from "@/components/EndDate.vue";
import ResetButton from "@/components/ResetButton.vue";
import AppHeader from "@/components/AppHeader.vue";
import ButtonExcel from "@/components/ButtonExcel.vue";

export default {
  components: {
    StartDate,
    EndDate,
    ResetButton,
    AppHeader,
    TableComponent,
    ButtonExcel,
  },
  data: () => ({
    overlay: false,
    topUp: 0,
    bayar: 0,
    kembali: 0,
    isValid: false,

    startDate: "", // Start Date Filter
    endDate: "", // End Date Filter

    rules: {
      required: (value) => !!value || "Field ini wajib diisi.",
      isPositive: (value) => parseFloat(value) > 0 || "Harus lebih besar dari 0.",
    },
    // Header Tabel History Top Up
    headers: [
      { title: "ID Ticket", align: "center", value: "id" },
      { title: "Nama", align: "center", value: "name" },
      { title: "Tanggal", value: "date" },
      { title: "Nominal", align: "center", value: "ammount" },
      { title: "Status", align: "center", value: "status" },
    ],
    // Value Tabel History Top Up
    items: [
      { id: 1, name: "Great Pyramid of Giza", date: "2023-11-21", ammount: "5000", status: "Sukses" },
      { id: 2, name: "Pyramid of Khafre", date: "2023-11-15", ammount: "5000", status: "Sukses" },
      { id: 3, name: "Red Pyramid", date: "2023-11-01", ammount: "104", status: "pending" },
      { id: 4, name: "Bent Pyramid", date: "2022-10-15", ammount: "101.1", status: "Sukses" },
      { id: 5, name: "Pyramid of the Sun", date: "2021-05-05", ammount: "65", status: "pending" },
    ],
  }),
  computed: {
    // Filter Start and End Date
    filteredItems() {
      const start = this.startDate ? new Date(this.startDate) : null;
      const end = this.endDate ? new Date(this.endDate) : null;

      return this.items.filter((item) => {
        const itemDate = new Date(item.date);
        if (start && itemDate < start) return false;
        if (end && itemDate > end) return false;
        return true;
      });
    },
  },

  methods: {
    // Penghapusan Filter
    clearFilters() {
      this.startDate = "";
      this.endDate = "";
    },

    // Form Top Up
    submitForm() {
      if (this.$refs.form.validate()) {
        alert(`Top Up sebesar Rp ${this.topUp} berhasil!`);
        this.overlay = false;
        this.resetForm();
      } else {
        alert("Harap periksa input Anda!");
      }
    },
    resetForm() {
      this.topUp = 0;
      this.bayar = 0;
      this.kembali = 0;
    },

    // Operasi Perhitungan Form Top Up
    calculateChange() {
      const topUp = parseFloat(this.topUp) || 0;
      const bayar = parseFloat(this.bayar) || 0;
      this.kembali = bayar - topUp;
    }
  },
};
</script>
