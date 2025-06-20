<template>
      <v-container>
            <div>
                  <AppHeader title="Kategori Gaji dan Peminjaman" />
            </div>

            <div class="py-10">
                  <div>
                        <v-row>
                              <v-col cols="12" md="5">
                                    <SearchComponent
                                    v-model="searchQuery"
                                    label="Search Kategori"
                                    />
                              </v-col>

                              <v-col cols="12" md="3" offset="4">
                                    <AddComponent
                                    label="Tambah Kategori"
                                    :routePath="addCategoryRoute()"
                                    />
                              </v-col>
                        </v-row>
                  </div>

                  <div class="pt-6">
                        <TableComponent
                        :headers="headers"
                        :items="filteredItems"
                        item-key="id"
                        items-per-page="5"
                        />
                  </div>
            </div>
      </v-container>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import SearchComponent from '@/components/SearchComponent.vue';
// import ButtonExcel from '@/components/ButtonExcel.vue';
import TableComponent from '@/components/TableComponent.vue';
import AddComponent from '@/components/AddComponent.vue';

export default {
  components: {
      AppHeader,
      SearchComponent,
      TableComponent,
      AddComponent,
      //ButtonExcel,
  },
  data() {
      return {
            searchQuery: '', // Properti untuk mencari kategori
            headers: [
                  { title: "ID Kategori", align: "center", value: "id" },
                  { title: "Kategori", align: "center", value: "kategori" },
                  { title: "Gaji", value: "gaji" },
                  { title: "Pinjaman", align: "center", value: "pinjaman" },
                  { title: "Aksi", align: "center", value: "aksi" },
            ],
            items: [
                  { id: 1, kategori: "Kategori A", gaji: "4.000.000", pinjaman: "20%", aksi: "Sukses" },
                  { id: 2, kategori: "Kategori B", gaji: "3.500.000", pinjaman: "15%", aksi: "Sukses" },
                  { id: 3, kategori: "Kategori C", gaji: "3.000.000", pinjaman: "10%", aksi: "pending" },
                  { id: 4, kategori: "Kategori D", gaji: "2.500.000", pinjaman: "7%", aksi: "Sukses" },
                  { id: 5, kategori: "Kategori E", gaji: "2.000.000", pinjaman: "5%", aksi: "pending" },
            ],
      };
  },
  computed: {
      filteredItems() {
            const query = this.searchQuery ? this.searchQuery.toLowerCase() : ''; // Periksa apakah searchQuery ada
            return this.items.filter(item =>
            item.kategori.toLowerCase().includes(query)
            );
      },
  },
  methods:{
      addCategoryRoute() {
            return '/kategori/AddCategory';
      },
  }
};
</script>
