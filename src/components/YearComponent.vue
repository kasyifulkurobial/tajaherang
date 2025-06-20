<template>
  <v-select
    :items="years"
    label="Pilih Tahun"
    v-model="selectedYear"
    hide-details
    outlined
  />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      years: this.generateLastFiveYears(),
    };
  },
  methods: {
    generateLastFiveYears() {
      const currentYear = new Date().getFullYear();
      return Array.from({ length: 5 }, (_, i) => (currentYear - i).toString());
    },
  },
  computed: {
    selectedYear: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
};
</script>
