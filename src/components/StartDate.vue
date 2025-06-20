<template>
  <v-text-field
    v-model="internalValue"
    label="Start Date"
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
    startDate: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      internalValue: this.startDate,
    };
  },
  watch: {
    startDate(newVal) {
      this.internalValue = newVal;
    },
  },
  methods: {
    updateValue() {
      console.log("Start Date Updated:", this.internalValue);
      this.$emit("update:startDate", this.internalValue);
    },
  },
};
</script>
