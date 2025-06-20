<template>
  <div >
    <!-- Start Title  -->
    <v-card variant="tonal" class="py-4 px-5 bg-teal-darken-3">
      <h6 class="text-h6">Dashboard</h6>
    </v-card>
    <!-- End Title  -->

    <!-- Start Content  -->
    <h6 class="text-h6 mt-7 ml-2 text-teal-darken-4">
      Pemasukan dan Pengeluaran
    </h6>
    <v-row>
      <!-- Start Pemasukan  -->
      <v-col cols="12" md="6" lg="4">
        <v-card
          variant="outlined"
          class="py-4 px-5 mt-5 bg-white text-indigo"
          style="height: 200px"
        >
          <v-col>
            <v-row class="row justify-space-between">
              <v-col>
                <h5 class="text-h5 font-weight-bold">Rp 14.000.000</h5>

                <p class="text-subtitle-1 font-weight-medium">
                  Pemasukan Bulan Ini
                </p>
              </v-col>
              <img src="../assets/icons/ic_pemasukan.png" width="70px" />
            </v-row>
            <v-row>
              <v-btn variant="flat" color="indigo" class="mt-10 mb-0 w-100">
                Lihat
              </v-btn>
            </v-row>
          </v-col>
        </v-card>
      </v-col>
      <!-- End Pemasukan  -->

      <!-- Start Statistik  -->
      <v-col cols="12" md="6" lg="4">
        <v-card
          variant="flat"
          class="py-4 px-5 mt-5 bg-white"
          style="height: 200px"
        >
          <p class="text-center mb-2">Statistik</p>
          <div>
            <ChartComponent />
          </div>
        </v-card>
      </v-col>
      <!-- End Statistik  -->

      <!-- Start Pengeluaran  -->
      <v-col cols="12" md="6" lg="4">
        <v-card
          variant="outlined"
          class="py-4 px-5 mt-5 bg-white text-purple-accent-4"
          style="height: 200px"
        >
          <v-col>
            <v-row class="row justify-space-between">
              <v-col>
                <h5 class="text-h5 font-weight-bold">Rp 7.500.000</h5>

                <p class="text-subtitle-1 font-weight-medium">
                  Pengeluaran Bulan Ini
                </p>
              </v-col>
              <img src="../assets/icons/ic_pengeluaran.png" width="70px" />
            </v-row>
            <v-row>
              <v-btn
                variant="flat"
                color="purple-accent-4"
                class="mt-10 mb-0 w-100"
              >
                Lihat
              </v-btn>
            </v-row>
          </v-col>
        </v-card>
      </v-col>
      <!-- Start Pengeluaran  -->
    </v-row>
    <!-- End Content  -->
  </div>
</template>

<script setup>
import ChartComponent from "@/pages/dashboard/ChartComponent.vue";
import { ref } from "vue";

</script>
