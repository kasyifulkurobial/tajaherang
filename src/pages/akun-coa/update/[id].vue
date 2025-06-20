<template>
  <v-container>
    <div>
      <AppHeader title="Edit Akun (COA)"/>
    </div>

    <div>
      <v-card variant="outlined" class="py-4 px-5 mt-10">
        <v-card-text>

          <AccountCOAForm
            :formData="formData"
            :categories="categories"
            :formRules="formRules"
            @submit="handleSubmit"
            @cancel="handleCancel"/>

        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import AccountCOAForm from '@/components/AccountCOAForm.vue';

export default {
  components: {
    AppHeader,
    AccountCOAForm,
  },
  data() {
    return {
      formData: {
        id: '',
        nama: '',
        kategori: '',
        tipe: '',
        prefixKode: '',
        suffixKode: '',
        kode: '',
        deskripsi: '',
      },
      categories: [
        "Kas & Bank",
        "Akun Piutang",
        "Persediaan",
        "Harta Lancar Lainnya",
        "Harta Tetap",
        "Depresiasi & Armotisasi",
        "Harta Lainnya",
        "Akun Hutang",
        "Modal"
      ],
      formRules: {
        name: [(v) => !!v || 'Nama Wajib Diisi'],
        category: [(v) => !!v || 'Kategori Wajib Diisi'],
        kode: [(v) => !!v || 'Kode Wajib Diisi'],
        description: [(v) => !!v || 'Deskripsi Wajib Diisi']
      },
    };
  },
  created() {
    const idParam = this.$route.params.id;
    console.log('Parameter ID dari URL:', idParam);

    if (!idParam) {
      console.warn('ID tidak ditemukan di URL.');
      return;
    }

    const item = sessionStorage.getItem('editItem');
    if (item) {
      const parsedItem = JSON.parse(item);
      console.log('Data dari sessionStorage:', parsedItem);

      if (parsedItem.id === idParam) {
        const [prefix, suffix] = parsedItem.kode.split('-');
        this.formData = {
          name: parsedItem.nama || '',
          category: parsedItem.kategori || '',
          prefixKode: prefix || '',
          suffixKode: suffix || '',
          kode: parsedItem.kode || '',
          description: parsedItem.deskripsi || '',
        };
        console.log('Data berhasil dimuat ke formData:', this.formData);
      } else {
        console.warn('Kode di URL tidak cocok dengan sessionStorage.');
      }
    } else {
      console.warn('Tidak ada data di sessionStorage.');
    }
  },


  methods: {
    handleSubmit(updatedData) {
      console.log('Data yang diperbarui:', updatedData);
      sessionStorage.removeItem('editItem');
      this.$router.push('/akun-coa');
    },
    handleCancel() {
      sessionStorage.removeItem('editItem');
      this.$router.push('/akun-coa');
    },
  },
};
</script>
