<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-row>
      <v-col cols="12">
        <!-- Nama Kategori (Dropdown) -->
        <v-select
          label="Nama Kategori"
          v-model="form.namaKategori"
          :items="kategoriOptions"
          item-text="title"
          item-value="value"
          outlined
          dense
          class="mb-4"
          required
        ></v-select>

        <!-- Gaji (Dropdown) -->
        <v-select
          label="Gaji"
          v-model="form.gaji"
          :items="gajiOptions"
          item-text="title"
          item-value="value"
          outlined
          dense
          class="mb-4"
          required
        ></v-select>

        <!-- Pinjaman (Dropdown) -->
        <v-select
          label="Pinjaman"
          v-model="form.pinjaman"
          :items="pinjamanOptions"
          item-text="title"
          item-value="value"
          outlined
          dense
          class="mb-4"
          required
        ></v-select>
      </v-col>
    </v-row>

    <!-- Action Buttons -->
    <v-row align="center" dense>
      <v-col cols="12" md="6">
        <v-btn class="mr-2 text-black" variant="outlined" block @click="goBack">Batal</v-btn>
      </v-col>
      <v-col cols="12" md="6">
        <v-btn variant="tonal" block class="bg-cyan-darken-4" @click="handleSave" :disabled="!valid">
          Simpan
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      required: true,
    },
    kategoriOptions: {
      type: Array,
      required: true,
    },
    gajiOptions: {
      type: Array,
      required: true,
    },
    pinjamanOptions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      valid: false, // Status validasi form
    };
  },
  methods: {
    goBack() {
      this.$emit("cancel"); // Emit event untuk membatalkan
    },
    handleSave() {
      if (this.$refs.form.validate()) {
        this.$emit("save", this.form); // Emit event untuk menyimpan data
      }
    },
  },
};
</script>
