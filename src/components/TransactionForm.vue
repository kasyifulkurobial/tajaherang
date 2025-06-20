<template>
  <v-container>
    <v-form ref="form" v-model="isFormValid">
      <v-row>
        <!-- Input Tanggal -->
        <v-col cols="12" md="4">
          <v-text-field
            v-model="formData.date"
            :rules="formRules.date"
            label="Tanggal"
            type="date"
            rounded="xs"
            outlined
            required
            variant="outlined"
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
            variant="outlined"
          ></v-select>
        </v-col>

        <!-- Input Total -->
        <v-col cols="12" md="4">
          <v-text-field
            v-model="formData.total"
            :rules="formRules.total"
            label="Total"
            placeholder="Masukkan Total Transaksi"
            type="number"
            rounded="xs"
            outlined
            clearable
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
            placeholder="Masukkan Deskripsi"
            rounded="xs"
            outlined
            clearable
            required
            variant="outlined"
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- Action Buttons -->
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
  </v-container>
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
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$emit("submit", this.formData); // Emit event submit
      } else {
        alert("Mohon lengkapi semua field yang diperlukan.");
      }
    },
    cancel() {
      this.$emit("cancel"); // Emit event cancel
    },
  },
};
</script>
