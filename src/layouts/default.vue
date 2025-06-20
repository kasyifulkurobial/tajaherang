<template>
  <v-app>
    <v-main v-if="!isAuth || isAuthPage">
      <!-- Halaman Autentikasi -->
      <router-view />
    </v-main>

    <v-main v-else>
      <!-- Komponen Navigasi Berdasarkan Role -->
      <component
        :is="navigationComponent"
        class="navigation"
      />
      <router-view />
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

// Import navigasi berdasarkan role
import AppBar from "@/components/AppBar.vue"; // Untuk manager
import NavbarUser from "@/components/NavbarUser.vue"; // Untuk user
import NavbarSales from "@/components/NavbarSales.vue"; // Untuk sales
import SidebarAkuntan from "@/components/SidebarAkuntan.vue"; // Untuk akuntan

const route = useRoute();
const router = useRouter();

const token = ref(localStorage.getItem("tjx_token")); // Token dari localStorage
const userRole = ref(localStorage.getItem("tjx_user_role")); // Role dari localStorage

// Tentukan apakah halaman saat ini adalah halaman autentikasi
const isAuthPage = computed(() => route.path.startsWith("/auth"));

// Tentukan apakah pengguna terautentikasi
const isAuth = computed(() => token.value && !isAuthPage.value);

// Tentukan komponen navigasi berdasarkan role
const navigationComponent = computed(() => {
  switch (userRole.value) {
    case "manager":
      return AppBar; // Navigasi untuk manager
    case "user":
      return NavbarUser; // Navigasi untuk user
    case "sales":
      return NavbarSales; // Navigasi untuk sales
    case "akuntan":
      return SidebarAkuntan; // Navigasi untuk akuntan
    default:
      return null; // Jika role tidak dikenali, tidak ada navigasi
  }
});

// Perbarui token dan role saat komponen di-mount
onMounted(() => {
  token.value = localStorage.getItem("tjx_token");
  userRole.value = localStorage.getItem("tjx_user_role");

  // Jika token tidak valid, redirect ke halaman login
  if (!token.value) {
    router.replace("/auth/login");
  }
});
</script>
