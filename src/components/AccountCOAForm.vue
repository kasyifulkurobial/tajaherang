<template>
  <v-form ref="form" v-model="isFormValid">
    <v-row>
      <!-- Input Nama -->
      <v-col cols="12" md="4">
        <v-text-field
          v-model="formData.name"
          :rules="formRules.name"
          label="Nama"
          rounded="xs"
          outlined
          required
        ></v-text-field>
      </v-col>

      <!-- Input Kategori -->
      <v-col cols="12" md="4">
        <v-select
          v-model="formData.category"
          :rules="formRules.category"
          :items="categories"
          label="Kategori"
          rounded="xs"
          outlined
          clearable
          required
          @change="updateUniqueCode"
        ></v-select>
      </v-col>

      <!-- Input Kode -->
      <v-col cols="12" md="4">
        <v-text-field
          v-model="formData.suffixKode"
          :rules="formRules.kode"
          label="Kode"
          placeholder="Masukkan ID unik, contoh: 001"
          prepend-inner="formData.prefixKode"
          rounded="xs"
          outlined
          required
          variant="outlined"
        ></v-text-field>
      </v-col>

      <!-- Input Deskripsi -->
      <v-col cols="12" md="12">
        <v-text-field
          v-model="formData.description"
          :rules="formRules.description"
          label="Deskripsi"
          placeholder="Tambahkan deskripsi di sini"
          rounded="xs"
          outlined
          clearable
          required
        ></v-text-field>
      </v-col>
    </v-row>

    <!-- Buttons -->
    <v-row>
      <v-col cols="12" md="4">
        <v-btn rounded="xs" size="large" variant="outlined" block @click="cancel">
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
          @click="submit"
        >
          Simpan
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  props: {
    formData: {
      type: Object,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
    formRules: {
      type: Object,
      required: true,
    },
  },
  emits: ["submit", "cancel"],
  data() {
    return {
      isFormValid: false,
      uniqueCodes: {
        "Kas & Bank": "1-",
        "Akun Piutang": "2-",
        "Persediaan": "3-",
        "Harta Lancar Lainnya": "4-",
        "Harta Tetap": "5-",
        "Depresiasi & Armotisasi": "6-",
        "Harta Lainnya": "7-",
        "Akun Hutang": "8-",
        "Modal": "9-",
      },
    };
  },
  watch: {
    "formData.category": {
      immediate: true,
      handler(newValue) {
        this.updateUniqueCode(newValue);
      },
    },
  },
  methods: {
    updateUniqueCode(category) {
      if (category && this.uniqueCodes[category]) {
        this.formData.prefixKode = this.uniqueCodes[category]; // Update prefix
        this.formData.suffixKode = ""; // Reset suffix
      } else {
        this.formData.prefixKode = "";
      }
    },
    submit() {
      if (this.$refs.form.validate()) {
        // Gabungkan prefix dan suffix sebelum emit
        this.formData.kode = `${this.formData.prefixKode}${this.formData.suffixKode}`;
        this.$emit("submit", this.formData);
      } else {
        alert("Mohon lengkapi semua field yang diperlukan.");
      }
    },
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>
