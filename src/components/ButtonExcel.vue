<template>
  <v-btn
      class="bg-cyan-darken-4 text-white"
      :block="block"
      :rounded="rounded"
      size="x-large"
      @click="downloadExcel"
  >
  <v-icon :icon="icon" class="mr-2" />
    {{ label }}
  </v-btn>
</template>

<script>
import * as XLSX from "xlsx";

export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    fileName: {
      type: String,
      default: "ExportedData.xlsx",
    },
    buttonClass: {
      type: String,
      default: "bg-cyan-darken-4 text-white",
    },
    icon: {
      type: String,
      default: "mdi-download",
    },
    block: {
      type: Boolean,
      default: true,
    },
    rounded: {
      type: String,
      default: "xs",
    },
  },
  methods: {
    downloadExcel() {
      if (!this.items.length) {
        alert("No data available to download!");
        return;
      }

      const worksheet = XLSX.utils.json_to_sheet(this.items);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, this.fileName);
    },
  },
};
</script>
