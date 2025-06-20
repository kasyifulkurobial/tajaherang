<template>
  <v-container>
    <!-- Title -->
    <AppHeader title="Tambah Transaksi" />

    <!-- Content -->
    <v-card variant="outlined" class="py-4 px-5 mt-10">
      <v-card-text>
        <TransactionForm
          :formData="formData"
          :categories="formOptions.categories"
          :formRules="formRules"
          @submit="handleSubmit"
          @cancel="goBack"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import AppHeader from "@/components/AppHeader.vue";
import TransactionForm from "@/components/TransactionForm.vue";

// Router instance
const router = useRouter();

// Form Input Data
const formData = ref({
  date: "",
  category: "",
  description: "",
  total: null,
});

// Form Options
const formOptions = {
  categories: ["Pemasukan", "Pengeluaran", "Tanam Modal"],
};

// Form Rules
const formRules = {
  date: [(v) => !!v || "Tanggal harus diisi"],
  category: [(v) => !!v || "Kategori harus diisi"],
  description: [(v) => !!v || "Deskripsi harus diisi"],
  total: [(v) => !!v || "Total harus diisi", (v) => v > 0 || "Total harus lebih besar dari 0"],
};

// Handle Form Submit
const handleSubmit = (data) => {
  alert("Transaksi berhasil disimpan dengan data: " + JSON.stringify(data));
  resetForm();
};

// Reset Form
const resetForm = () => {
  formData.value = {
    date: "",
    category: "",
    description: "",
    total: null,
  };
};

// Handle Go Back
const goBack = () => {
  router.back(); // Pastikan router digunakan di sini
};
</script>
