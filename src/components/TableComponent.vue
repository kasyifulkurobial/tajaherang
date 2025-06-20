<template>
  <v-data-table
    :headers="visibleHeaders"
    :items="items"
    class="px-4 mt-10"
  >

  <template v-slot:item.email=" {item} ">
        <!-- Loop untuk setiap nilai email -->
        <div v-for="(email, index) in item.email" :key="index" class="mb-1">
          <v-row
            class="pt-2"
            :color="getColorStatus(email)"
            dark
          >
            {{ email }}
          </v-row >
        </div>
    </template>

    <template v-slot:item.staf="{ item }">
        <!-- Loop untuk setiap nilai staf -->
        <div v-for="(staf, index) in item.staf" :key="index" class="mb-1">
          <v-chip
            variant="outlined"
            :color="getColorStatus(staf)"
            dark
          >
            {{ staf }}
          </v-chip>
        </div>
    </template>

    <!-- Status Pembayaran -->
    <template v-slot:item.pembayaran="{ item }">
        <!-- Loop untuk setiap nilai pembayaran -->
        <div v-for="(pembayaran, index) in item.pembayaran" :key="index" class="mb-1">
          <v-chip
            variant="outlined"
            :color="getColorPayment(pembayaran)"
            dark
          >
            {{ pembayaran }}
          </v-chip>
        </div>
    </template>

    <!-- Slot untuk kolom status -->
    <template v-slot:item.status="{ item }">
      <v-chip variant="outlined" :color="item.status === 'Sukses' ? 'green' : 'red'" dark>
        {{ item.status }}
      </v-chip>
    </template>

    <!-- Slot untuk kolom aksi -->
    <template v-slot:item.aksi="{ item }">
        <v-btn variant="plain" class="text-indigo-accent-4 font-weight-bold" icon @click="$emit('edit', item)">
          <v-icon >mdi-pencil</v-icon>
        </v-btn>
        <v-btn variant="plain" class="text-black font-weight-bold" icon @click="$emit('view', item.id)">
          <v-icon>mdi-eye</v-icon>
        </v-btn>
        <v-btn variant="plain" class="text-red-accent-4 font-weight-bold" icon @click="$emit('delete', item.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
    </template>

    <!-- Slot untuk kolom aksiAccount -->
    <template v-slot:item.aksiAccount="{ item }">
        <v-btn variant="plain" class="text-indigo-accent-4 font-weight-bold" icon @click="$emit('edit', item)">
          <v-icon >mdi-pencil</v-icon>
        </v-btn>
        <v-btn variant="plain" class="text-red-accent-4 font-weight-bold" icon @click="$emit('delete', item.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
    </template>

    <!-- View More -->
    <template v-slot:item.detail="{ item }">
      <v-btn
        variant="plain"
        class="text-black font-weight-bold"
        icon
        @click="$emit('viewDetail', item)"
      >
        View More
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  computed:{
    visibleHeaders(){
      return this.headers.filter(header => !header.hidden)
    }
  },
  methods: {
    getColorStatus(staf) {
      switch (staf) {
        case "Tetap":
          return "green"; // Warna hijau untuk status Tetap
        case "Kontrak":
          return "orange"; // Warna orange untuk status Kontrak
        case "Magang":
          return "yellow"; // Warna kuning untuk status Magang
        default:
          return ""; // Warna default jika tidak sesuai
      }
    },
    getColorPayment(pembayaran) {
      switch (pembayaran) {
        case "Done":
          return "success"; // Warna hijau untuk status Tetap
        case "Failed":
          return "error"; // Warna orange untuk status Kontrak
        case "Proccess":
          return "warning"; // Warna kuning untuk status Magang
        default:
          return ""; // Warna default jika tidak sesuai
      }
    },
  }
};
</script>
