<template>
  <v-btn
    :class="buttonClass"
    block
    size="x-large"
    @click="navigateToPage"
  >
    <v-icon :icon="icon" class="mr-2" />
    {{ label }}
  </v-btn>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: "mdi-plus",
    },
    routePath: {
      type: String,
      required: true,// Auto routing akan menangkap ini
    },
    buttonClass: {
      type: String,
      default: "text-white bg-cyan-darken-4 font-weight-bold",
    },
  },
  setup(props) {
    const router = useRouter();

    const navigateToPage = () => {
      router.push(props.routePath); // Navigasi otomatis ke rute
    };

    return { navigateToPage };
  },
};
</script>
