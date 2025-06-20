<template>
        <v-container>
          <v-card
            class="w-50 mx-auto my-10"
            rounded="lg"
            elevation="8"
          >
            <v-card-title class="text-center text-cyan-darken-4">
              New Ticket
            </v-card-title>

            <v-divider></v-divider>

            <!-- Form dengan Validasi -->
            <v-form ref="form" class="mx-10 mt-10">
              <!-- Input Tanggal -->
              <v-text-field
                variant="outlined"
                v-model="tanggal"
                type="date"
                label="Tanggal"
                rounded="lg"
                :rules="[rules.required]"
              ></v-text-field>

              <!-- Input Nama -->
              <v-text-field
                variant="outlined"
                v-model="nama"
                label="Nama"
                rounded="lg"
                :rules="[rules.required]"
                placeholder="Masukkan Nama Wisatawan"
              ></v-text-field>

              <!-- Input Top Up -->
              <v-text-field
                variant="outlined"
                v-model="topUp"
                label="Jumlah Top Up"
                rounded="lg"
                :rules="[rules.required, rules.isNumber]"
                placeholder="Masukkan Jumlah Top Up"
              ></v-text-field>

              <!-- Pilih Kategori Gelang -->
              <p class="mt-4 font-weight-bold">Pilih Kategori Gelang</p>
              <p
                class="mb-4 font-weight-bold"
                :class="{
                  'text-red-darken-4': gelang === 'merah',
                  'text-green-darken-4': gelang === 'hijau'
                }"
              >
                Gelang yang Dipilih: {{ gelang || 'Belum Dipilih' }}
              </p>

              <v-radio-group
                :rules="[rules.required]"
                v-model="gelang"
                class="w-100"
              >
                <div class="d-flex justify-space-around align-center flex-wrap">
                  <!-- Gelang Merah -->
                  <v-card
                    class="gelang-card mx-2"
                    :elevation="gelang === 'merah' ? 12 : 2"
                    :class="{ 'bg-blue-lighten-5': gelang === 'merah' }"
                    rounded="lg"
                    hover
                    @click="gelang = 'merah'"
                  >
                    <v-img
                      src="../../assets/image 2.png"
                      alt="Gelang Merah"
                      height="150"
                      cover
                    ></v-img>
                    <v-card-text class="text-center font-weight-bold">
                      Gelang Merah
                    </v-card-text>
                  </v-card>

                  <!-- Gelang Hijau -->
                  <v-card
                    class="gelang-card mx-2"
                    :elevation="gelang === 'hijau' ? 12 : 2"
                    :class="{ 'bg-green-lighten-5': gelang === 'hijau' }"
                    rounded="lg"
                    hover
                    @click="gelang = 'hijau'"
                  >
                    <v-img
                      src="../../assets/image 1.png"
                      alt="Gelang Hijau"
                      height="150"
                      cover
                    ></v-img>
                    <v-card-text class="text-center font-weight-bold">
                      Gelang Hijau
                    </v-card-text>
                  </v-card>
                </div>
              </v-radio-group>

              <!-- Submit Button -->
              <div class="d-flex justify-center mb-8">
                <v-btn
                  block
                  size="large"
                  rounded="lg"
                  class="mt-4 bg-cyan-darken-4 font-weight-bold text-white"
                  @click="validateAndOpenDialog"
                >
                  Submit
                </v-btn>
              </div>
            </v-form>
          </v-card>

          <!-- Dialog Konfirmasi -->
          <v-dialog v-model="dialog" max-width="400">
            <v-card>
              <v-card-title class="text-center font-weight-bold">
                Cetak Ticket
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <div class="text-h6">
                  <strong>TOTAL :</strong> {{ formatRupiah(totalBayar) }}
                </div>
                <div class="mt-4">
                  <strong>TOTAL BAYAR</strong>
                  <v-text-field
                    v-model="jumlahBayar"
                    placeholder="Masukkan Jumlah Bayar"
                    variant="outlined"
                  ></v-text-field>
                </div>
                <div class="mt-4">
                  <strong>KEMBALI</strong>
                  <v-text-field
                    readonly
                    :value="formatRupiah(kembalian)"
                    variant="outlined"
                  ></v-text-field>
                </div>
              </v-card-text>
              <v-card-actions class="justify-center mx-4 mb-8">
                <v-btn
                  class="text-white bg-cyan-darken-4"
                  block
                  size="large"
                  @click="printTicket">
                    PRINT
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-container>
</template>


<script>
export default {
  data() {
    return {
      tanggal: "",
      nama: "",
      topUp: "",
      gelang: null,
      dialog: false,
      isFormValid: false,
      jumlahBayar: "",
      totalBayar: 150000, // Total pembayaran
      rules: {
        required: (value) => !!value || "Field ini wajib diisi.",
        isNumber: (value) => !isNaN(value) || "Harus berupa angka.",
      },
    };
  },
  computed: {
    kembalian() {
      const bayar = parseInt(this.jumlahBayar) || 0;
      return bayar - this.totalBayar > 0 ? bayar - this.totalBayar : 0;
    },
  },
  methods: {
    validateAndOpenDialog() {
      // Validasi seluruh form
      const isValid = this.$refs.form.validate();

      // Validasi kategori gelang secara manual
      if (!this.gelang) {
        this.$toast.error("Kategori Gelang harus dipilih!");
        return;
      }

      if (isValid) {
        this.dialog = true; // Semua validasi lolos, tampilkan dialog
      }
    },
    printTicket() {
      alert("Ticket berhasil dicetak!");
      this.dialog = false;
    },
    formatRupiah(value) {
      return `Rp ${value.toLocaleString("id-ID")}`;
    },
  },
};
</script>



<style scoped>
/* Sembunyikan Input Radio secara spesifik */
::v-deep(.v-selection-control__wrapper) {
  display: none !important;
}
::v-deep(.v-radio .v-input__control) {
  display: none !important;
}
::v-deep(.mdi-radiobox-blank) {
  display: none !important;
}

/* Tambahkan Efek Hover untuk Pilihan */
.radio-label {
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.3s;
}

.radio-label.selected {
  border-color: #64b5f6;
}
.radio-label:hover {
  border-color: #90caf9;
}

.gelang-card {
  width: 45%;
  max-width: 250px;
  cursor: pointer;
  transition: transform 0.3s;
}

.gelang-card:hover {
  transform: scale(1.05);
}
</style>

