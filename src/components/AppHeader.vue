<template>
  <v-card variant="tonal" class="bg-cyan-darken-4 py-4 px-5">
    <h6 class="text-h6 font-weight-bold">{{ title }}</h6>
  </v-card>
</template>

<script>
export default {
  name: "AppHeader",
  props: {
    // Prop untuk judul header
    title: {
      type: String,
      required: true, // Harus diisi agar tidak ada header tanpa judul
    },
  },
};
</script>
