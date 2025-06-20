<template>
  <v-container>
    <!-- Title -->
    <AppHeader title="Add Inventaris" />

    <!-- Content -->
    <v-card variant="outlined" class="py-4 px-5 mt-10">
      <v-card-text>
        <v-form ref="form" v-model="isFormValid">
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="formData.nameAsset"
                :rules="formRules.nameAsset"
                label="Nama Asset"
                rounded="xs"
                placeholder="Masukkan Nama Asset"
                clearable
                variant="outlined"
                outlined
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                v-model="formData.kategori"
                :rules="formRules.kategori"
                :items="formOptions.kategori"
                label="Kategori"
                rounded="xs"
                outlined
                clearable
                variant="outlined"
                required
              ></v-select>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="formData.harga"
                label="Harga"
                rounded="xs"
                outlined
                clearable
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="formData.jumlah"
                :rules="formRules.jumlah"
                label="Jumlah"
                rounded="xs"
                placeholder="Masukkan jumlah"
                outlined
                clearable
                variant="outlined"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                rounded="xs"
                v-model="formData.depresiasi"
                :rules="formRules.depresiasi"
                :items="formOptions.salaryCategories"
                label="Depresiasi/Tahun"
                outlined
                clearable
                variant="outlined"
              ></v-select>
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                rounded="xs"
                v-model="formData.status"
                :rules="formRules.status"
                :items="formOptions.statusOptions"
                label="Status"
                outlined
                clearable
                variant="outlined"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="formData.description"
                :rules="formRules.description"
                label="Deskripsi"
                placeholder="Tambahkan deskripsi di sini"
                rounded="xs"
                outlined
                clearable
                required
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-btn
                rounded="xs"
                size="large"
                variant="outlined"
                block
                @click="cancel()">
                Batal
              </v-btn>
            </v-col>
            <v-col cols="12" md="4">
              <v-btn
                class="bg-cyan-darken-4"
                rounded="xs"
                size="large"
                variant="tonal"
                block
                type="submit"
                @click="handleSubmit()"
              >
                Simpan
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import AppHeader from "@/components/AppHeader.vue";

const router = useRouter();

// Form Input Data
const formData = ref({
  nameAsset: '',
  jumlah: '',
  kategori: '',
  depresiasi: '',
  harga: '',
  status: '',
  description: ''
});

// Form Options
const formOptions = {
  kategori: ['E001', 'E002', 'E003', 'E004', 'E005'],
  positions: ['Manager', 'Akuntan', 'Warung', 'Sales'],
  salaryCategories: ['A1', 'A2', 'B1', 'B2'],
  statusOptions: ['Aktif', 'Non Aktif', 'Perbaikan']
};

// Form Rules
const formRules = {
  nameAsset: [(v) => !!v || "Nama Asset harus diisi"],
  kategori: [(v) => !!v || "Kategori harus diisi"],
  harga: [(v) => !!v || "Harga harus diisi"],
  jumlah: [(v) => !!v || "jumlah harus diisi"],
  depresiasi: [(v) => !!v || "Depresiasi Gaji harus diisi"],
  status: [(v) => !!v || "Status harus diisi"],
  description: [(v) => !!v || "Deskripsi harus diisi"]
};

// Form Validity
const isFormValid = ref(false);
const form = ref(null);

// Handle Form Submit
const handleSubmit = () => {
  if (form.value.validate()) {
    alert("Penambahan Berhasil!");
    resetForm();
  } else {
    alert("Mohon lengkapi semua data yang diperlukan.");
  }
};

// Reset Form
const resetForm = () => {
  formData.value = {
    nameAsset: '',
    jumlah: '',
    gender: '',
    depresiasi: '',
    harga: '',
    status: '',
    description: ''
  };
};

const cancel = () => {
  router.back(); // Kembali ke halaman sebelumnya
};
</script>
