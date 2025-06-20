<template>
  <v-col :cols="cols" :md="md">
    <v-card :class="cardClass" rounded="lg">
      <v-row class="pa-4">
        <!-- Slot untuk Ikon -->
        <v-col
          class="d-flex justify-center align-center"
          cols="12"
          md="3"
        >
          <!-- Jika slot ikon ada, gunakan slot -->
          <slot name="icon">
            <!-- Jika slot tidak ada, gunakan ikon default dari prop -->
            <v-icon :size="iconSize">{{ icon }}</v-icon>
          </slot>
        </v-col>

        <!-- Konten -->
        <v-col cols="12" md="7">
          <v-row>
            <v-col cols="12">
              <h3 class="font-weight-bold">{{ title }}</h3>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <h2>{{ value }}</h2>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: 'InfoCard',
  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: 'mdi-information-outline',
    },
    iconSize: {
      type: String,
      default: '4rem',
    },
    cols: {
      type: [Number, String],
      default: 12,
    },
    md: {
      type: [Number, String],
      default: 4,
    },
    cardClass: {
      type: String,
      default: 'text-cyan-darken-4',
    },
  },
};
</script>
