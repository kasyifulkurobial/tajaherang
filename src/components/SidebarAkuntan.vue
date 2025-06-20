<template>
  <v-navigation-drawer app permanent>
    <v-list-item
      prepend-avatar="https://example.com/logo.png"
      title="Tajaherang Web App"
      nav
    >
      <template v-slot:append>
        <v-btn
          icon="mdi-chevron-left"
          variant="text"
          @click.stop="rail = !rail"
        ></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item
        v-for="item in items"
        :key="item.value"
        :title="item.title"
        :prepend-icon="item.icon"
        :class="getClass(item.value)"
        @click="navigate(item.value)"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-btn block color="grey" prepend-icon="mdi-logout" @click="logout">
      Logout
    </v-btn>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const rail = ref(false);

const items = ref([
  { title: "Dashboard", value: "", icon: "mdi-view-dashboard" },
  { title: "Ticket", value: "ticket", icon: "mdi-ticket" },
  { title: "Warung", value: "warung", icon: "mdi-store" },
  { title: "Gaji Karyawan", value: "gaji-karyawan", icon: "mdi-cash-multiple" },
  { title: "Inventaris", value: "inventaris", icon: "mdi-gold" },
  { title: "Akun (COA)", value: "akun-coa", icon: "mdi-chart-account" },
  { title: "Transaksi", value: "transaksi", icon: "mdi-swap-horizontal" },
  { title: "Laporan Neraca", value: "laporan/neraca", icon: "mdi-chart-bar" },
  { title: "Laporan Laba Rugi", value: "laporan/laba-rugi", icon: "mdi-chart-line" },
  { title: "Laporan Arus Kas", value: "laporan/arus-kas", icon: "mdi-cash" },
  { title: "Laporan Perubahan Modal", value: "laporan/perubahan-modal", icon: "mdi-currency-usd" },
  { title: "Catatan Keuangan", value: "laporan/keuangan", icon: "mdi-notebook" },
]);

const navigate = (path) => router.push(`/${path}`);

function getClass(value) {
  return route.path === `/${value}` ? "bg-cyan-darken-4" : "";
}

const logout = () => {
  localStorage.clear();
  router.replace("/auth/login");
};
</script>
