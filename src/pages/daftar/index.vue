<template>
  <v-container>
    <!-- Title -->
    <AppHeader title="Pendaftaran Karyawan" />

    <!-- Content -->
    <v-card variant="outlined" class="py-4 px-5 mt-10">
      <v-card-text>
        <v-form ref="form" v-model="isFormValid">
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="formData.fullName"
                :rules="formRules.fullName"
                label="Nama Lengkap"
                rounded="xs"
                placeholder="Masukkan Nama Lengkap"
                clearable
                variant="outlined"
                outlined
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                v-model="formData.gender"
                :rules="formRules.gender"
                :items="formOptions.gender"
                label="Jenis Kelamin"
                rounded="xs"
                outlined
                clearable
                variant="outlined"
                required
              ></v-select>
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                v-model="formData.jobPosition"
                :rules="formRules.jobPosition"
                :items="formOptions.positions"
                label="Jabatan"
                rounded="xs"
                outlined
                clearable
                variant="outlined"
              ></v-select>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="formData.email"
                :rules="formRules.email"
                label="Email"
                rounded="xs"
                placeholder="Masukkan Email"
                outlined
                clearable
                variant="outlined"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                rounded="xs"
                v-model="formData.salaryCategory"
                :rules="formRules.salaryCategory"
                :items="formOptions.salaryCategories"
                label="Kategori Gaji"
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
            <v-col cols="12" md="4">
              <v-text-field
                v-model="formData.password"
                :rules="formRules.password"
                label="Password"
                rounded="xs"
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                placeholder="Masukan password"
                prepend-inner-icon="mdi-lock-outline"
                @click:append-inner="visible = !visible"
                outlined
                clearable
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="formData.accountNumber"
                :rules="formRules.accountNumber"
                label="No. Rekening"
                rounded="xs"
                placeholder="Masukkan Nomer Rekening"
                outlined
                clearable
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                rounded="xs"
                v-model="formData.nip"
                :rules="formRules.nip"
                label="NIP"
                placeholder="Masukkan NIP"
                outlined
                clearable
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-btn
                class="bg-cyan-darken-4"
                rounded="xs"
                size="large"
                variant="tonal"
                block
                type="submit"
                @click="handleSubmit"
              >
                Daftar
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
import AppHeader from "@/components/AppHeader.vue";

// Form Input Data
const formData = ref({
  fullName: '',
  email: '',
  gender: '',
  salaryCategory: '',
  jobPosition: '',
  status: '',
  password: '',
  accountNumber: '',
  nip: '',
});

// Form Options
const formOptions = {
  gender: ['Laki-laki', 'Perempuan'],
  positions: ['Manager', 'Akuntan', 'Warung', 'Sales'],
  salaryCategories: ['A1', 'A2', 'B1', 'B2'],
  statusOptions: ['Kontrak', 'Tetap', 'Magang']
};

// Form Rules
const formRules = {
  fullName: [(v) => !!v || "Nama Lengkap harus diisi"],
  gender: [(v) => !!v || "Jenis Kelamin harus diisi"],
  jobPosition: [(v) => !!v || "Jabatan harus diisi"],
  email: [(v) => !!v || "Email harus diisi"],
  salaryCategory: [(v) => !!v || "Kategori Gaji harus diisi"],
  status: [(v) => !!v || "Status harus diisi"],
  password: [(v) => !!v || "Password harus diisi"],
  accountNumber: [(v) => !!v || "No. Rekening harus diisi"],
  nip: [(v) => !!v || "NIP harus diisi"]
};

// Form Validity
const isFormValid = ref(false);
const form = ref(null);

// Show/Hide Password
const visible = ref(false);

// Handle Form Submit
const handleSubmit = () => {
  if (form.value.validate()) {
    alert("Pendaftaran Berhasil!");
    resetForm();
  } else {
    alert("Mohon lengkapi semua field yang diperlukan.");
  }
};

// Reset Form
const resetForm = () => {
  formData.value = {
    fullName: '',
    email: '',
    gender: '',
    salaryCategory: '',
    jobPosition: '',
    status: '',
    password: '',
    accountNumber: '',
    nip: '',
  };
};
</script>
