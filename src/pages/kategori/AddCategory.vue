<template>
  <v-container>
    <div>
      <AppHeader title="Tambah Kategori" />
    </div>

    <div>
      <v-row justify="center" class="ma-6">
        <v-col cols="12" md="6" class="pa-6">
          <CategoryForm
            :form="form"
            :kategoriOptions="kategoriOptions"
            :gajiOptions="gajiOptions"
            :pinjamanOptions="pinjamanOptions"
            @cancel="goBack"
            @save="simpan"
          />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import CategoryForm from "@/components/CategoryForm.vue";

export default {
  components: { CategoryForm },
  data() {
    return {
      form: {
        namaKategori: null,
        gaji: null,
        pinjaman: null,
      },
      kategoriOptions: [
        { title: "Kategori A", value: "A" },
        { title: "Kategori B", value: "B" },
        { title: "Kategori C", value: "C" },
        { title: "Kategori D", value: "D" },
        { title: "Kategori E", value: "E" },
      ],
      gajiOptions: [
        { title: "4.000.000", value: "4000000" },
        { title: "3.500.000", value: "3500000" },
        { title: "3.000.000", value: "3000000" },
        { title: "2.500.000", value: "2500000" },
        { title: "2.000.000", value: "2000000" },
      ],
      pinjamanOptions: [
        { title: "20%", value: "20" },
        { title: "15%", value: "15" },
        { title: "10%", value: "10" },
        { title: "7%", value: "7" },
        { title: "5%", value: "5" },
      ],
    };
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    simpan(data) {
      console.log("Data tersimpan:", data);
    },
  },
};
</script>
