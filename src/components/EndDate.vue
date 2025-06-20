<template>
  <v-text-field
    v-model="internalValue"
    label="End Date"
    type="date"
    color="cyan-darken-4"
    hide-details
    rounded="xs"
    @input="updateValue"
  />
</template>

<script>
export default {
  props: {
    endDate: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      internalValue: this.endDate, // Menyimpan nilai lokal untuk input
    };
  },
  watch: {
    // Jika prop `endDate` berubah, sinkronkan dengan `internalValue`
    endDate(newVal) {
      this.internalValue = newVal;
    },
  },
  methods: {
    // Emit event ketika nilai berubah
    updateValue() {
      console.log("End Date Updated:", this.internalValue);
      this.$emit("update:endDate", this.internalValue);
    },
  },
};
</script>
