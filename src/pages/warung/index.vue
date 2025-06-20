<template>
  <v-container>
    <!-- Header -->
    <div>
      <AppHeader title="Data Warung Tajaherang" />
    </div>

    <!-- Filter Search -->
    <div>
      <v-row class="mt-8">
        <v-col cols="5">
          <SearchInput v-model="searchQuery" label="Search Warung" />
        </v-col>
      </v-row>
    </div>

    <!-- Daftar Warung -->
    <div>
      <v-row
        v-for="(warung, index) in filteredWarungs"
        :key="index"
        class="mb-5"
      >
        <v-col cols="12">
          <v-card @click="goToDetail(warung.id)">
            <v-row>
              <v-col cols="12" md="5">
                <v-img
                  :src="warung.image"
                  alt="Warung Image"
                  class="rounded-s-lg mx-auto"
                ></v-img>
              </v-col>
              <v-col cols="12" md="7">
                <h4 class="text-h6 font-weight-bold">{{ warung.name }}</h4>
                <p class="mb-1">
                  <strong>Nama Penjaga:</strong> {{ warung.guardName }}
                </p>
                <p><strong>Status:</strong> {{ warung.status }}</p>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import SearchInput from "@/components/SearchComponent.vue";
import AppHeader from "@/components/AppHeader.vue";
import image from "@/assets/image.png"; // Pastikan jalur file benar

export default {
  components: {
    SearchInput,
    AppHeader,
  },
  data: () => ({
    searchQuery: "", // Inisialisasi sebagai string
    warungs: [
      {
        id: "1",
        name: "Warung 1",
        guardName: "Joko Tingkir",
        status: "Kontrak",
        image: image,
      },
      {
        id: "2",
        name: "Warung 2",
        guardName: "Siti Nurbaya",
        status: "Tetap",
        image: image,
      },
      {
        id: "3",
        name: "Warung 3",
        guardName: "Ahmad Dahlan",
        status: "Kontrak",
        image: image,
      },
    ],
  }),
  computed: {
    filteredWarungs() {
      // Validasi agar searchQuery adalah string
      const query =
        typeof this.searchQuery === "string"
          ? this.searchQuery.toLowerCase()
          : "";

      return this.warungs.filter((warung) =>
        warung.name.toLowerCase().includes(query)
      );
    },
  },
  methods: {
    goToDetail(id) {
      // Contoh logika untuk navigasi atau tindakan lainnya
      sessionStorage.setItem("tjx_WarungId", id);
      // Jika menggunakan Vue Router untuk navigasi:
      this.$router.push("/warung/detail");
    },
  },
  watch: {
    searchQuery(newVal) {
      console.log("Search Query:", newVal, typeof newVal); // Debugging
    },
  },
  mounted() {
    sessionStorage.removeItem("tjx_WarungId");
  },
};
</script>
