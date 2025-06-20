<template>
  <v-select
    :items="months"
    v-model="internalValue"
    item-text="title"
    item-value="value"
    label="Pilih Bulan"
    hide-details
  ></v-select>

</template>

<script>
export default {
  props: {
    modelValue: String,
  },
  data() {
    return {
      internalValue: this.modelValue, // Bind nilai internal
      months: [
        { title: "Januari", value: 1 },
        { title: "Februari", value: 2 },
        { title: "Maret", value: 3 },
        { title: "April", value: 4 },
        { title: "Mei", value: 5 },
        { title: "Juni", value: 6 },
        { title: "Juli", value: 7 },
        { title: "Agustus", value: 8 },
        { title: "September", value: 9 },
        { title: "Oktober", value: 10 },
        { title: "November", value: 11 },
        { title: "Desember", value: 12 },
      ],
    };
  },
  watch: {
    internalValue(newVal) {
      this.$emit("update:modelValue", newVal); // Emit perubahan ke parent
    },
    modelValue(newVal) {
      this.internalValue = newVal; // Sinkronisasi jika modelValue berubah di parent
    },
  },
};
</script>
