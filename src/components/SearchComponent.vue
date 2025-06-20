<template>
  <v-text-field
    v-model="internalValue"
    :class="sizeClass"
    prepend-inner-icon="mdi-magnify"
    placeholder="Search..."
    rounded="xs"
    hide-details
    variant="outlined"
    :label="label"
    clearable
  />
</template>

<script>
export default {
  name: "SearchInput",
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "Search",
    },
    size: {
      type: String,
      default: "md", // Default size adalah 'md'
      validator: (value) => ["sm", "md", "lg"].includes(value),
    },
  },
  data() {
    return {
      internalValue: this.modelValue, // Salin nilai awal ke binding internal
    };
  },
  computed: {
    sizeClass() {
      // Tambahkan class berdasarkan size
      return {
        "text-field-sm": this.size === "sm",
        "text-field-md": this.size === "md",
        "text-field-lg": this.size === "lg",
      };
    },
  },
  watch: {
    // Update internalValue ketika modelValue berubah dari luar
    modelValue(newVal) {
      this.internalValue = newVal;
    },
    // Emit update:modelValue ketika internalValue berubah
    internalValue(newVal) {
      this.$emit("update:modelValue", newVal);
    },
  },
};
</script>

