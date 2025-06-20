<template>
  <v-btn
  class="bg-cyan-darken-4
  text-white"
  rounded="xs"
  block
  size="x-large"
  @click="clearFilters">
    <v-icon icon="mdi-cached" />
  </v-btn>
</template>

<script>
export default {
  methods: {
    clearFilters() {
      this.$emit("clear");
    },
  },
};
</script>
