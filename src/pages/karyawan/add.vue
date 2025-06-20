<template>
  <v-container>
    <!-- Title -->
    <AppHeader title="Tambah Akun (COA)" />

    <!-- Content -->
    <v-card variant="outlined" class="py-4 px-5 mt-10">
      <v-card-text>
        <AccountCOAForm
          :formData="formData"
          :categories="formOptions.categories"
          :formRules="formRules"
          :isCodeReadOnly="true"
          @submit="handleSubmit"
          @cancel="goBack"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import AppHeader from "@/components/AppHeader.vue";
import AccountCOAForm from "@/components/AccountCOAForm.vue";

// Router instance
const router = useRouter();

// Form Input Data
const formData = reactive({
  name: "",
  category: "",
  description: "",
  prefixKode: "",
  suffixKode: "",
  kode: "",
});

// Form Options
const formOptions = {
  categories: [
    "Kas & Bank",
    "Akun Piutang",
    "Persediaan",
    "Harta Lancar Lainnya",
    "Harta Tetap",
    "Depresiasi & Armotisasi",
    "Harta Lainnya",
    "Akun Hutang",
    "Modal",
  ],
};

// Form Rules
const formRules = {
  name: [(v) => !!v || "Nama harus diisi"],
  category: [(v) => !!v || "Kategori harus diisi"],
  description: [(v) => !!v || "Deskripsi harus diisi"],
  kode: [(v) => !!v || "Kode harus diisi"],
};

// Submit Handler
const handleSubmit = (data) => {
  console.log("Data berhasil disubmit:", data);
  alert("Data berhasil disimpan!");
};

// Handle Go Back
const goBack = () => {
  router.back();
};
</script>
