<template>
  <div>
    <!-- 📌 Desktop Navigation -->
    <v-app-bar
      prominent
      v-if="!isMobile"
    >
      <!-- Logo di Kiri -->
      <v-toolbar-title class="w-0 font-weight-bold">Logo</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Navigasi Tengah -->
      <v-btn
        text
        :class="getClass('beranda')"
        @click="navigate('beranda')"
      >
        Beranda
      </v-btn>
      <v-btn
        text
        :class="getClass('top-up')"
        @click="navigate('top-up')"
      >
        Tambah Saldo
      </v-btn>
      <v-btn
        text
        :class="getClass('kelola-akun')"
        @click="navigate('kelola-akun')"
      >
        Kelola Akun
      </v-btn>

      <v-spacer></v-spacer>

      <!-- Profil di Kanan dengan Dropdown -->
      <v-menu class="p-4">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon>
            <v-avatar size="40">
              <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Profile" />
            </v-avatar>
          </v-btn>
          <div class="pr-8">
            <p class="text-cyan-darken-4">Kelvin Yeboah</p>
            <p class="text-cyan-darken-4 text-end">warung</p>
          </div>
        </template>
        <v-list>
          <v-list-item @click="logout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- 📌 Mobile Navigation -->
    <div v-else>
      <v-card>
        <v-layout>
          <!-- App Bar Mobile -->
          <v-app-bar color="cyan-darken-4" prominent>
            <!-- Tombol Hamburger Menu -->
            <v-app-bar-nav-icon
              variant="text"
              @click.stop="drawerMobile = !drawerMobile"
            ></v-app-bar-nav-icon>

            <!-- Judul Aplikasi -->
            <v-toolbar-title class="text-white">Tajaherang Web App</v-toolbar-title>

            <v-spacer></v-spacer>

            <!-- Profil dengan Dropdown di Mobile -->
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" icon>
                  <v-avatar size="40">
                    <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Profile" />
                  </v-avatar>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <v-list-item-title class="font-weight-bold">Kelvin Yeboah</v-list-item-title>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item @click="logout">
                  <v-list-item-title>Logout</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-app-bar>

          <!-- Drawer Menu Mobile -->
          <v-navigation-drawer
            v-model="drawerMobile"
            temporary
            location="left"
          >
            <v-list>
              <v-list-item
                v-for="item in items"
                :key="item.value"
                :title="item.title"
                :prepend-icon="item.icon"
                :class="getClass(item.value)"
                @click="navigate(item.value)"
              ></v-list-item>
            </v-list>
          </v-navigation-drawer>

          <!-- Konten Utama -->
          <v-main style="min-height: 100vh" class="bg-grey-lighten-4">
            <div class="pa-7"><router-view /></div>
          </v-main>
        </v-layout>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

// State untuk mode mobile dan drawer
const isMobile = ref(false);
const drawerMobile = ref(false);

// Item navigasi untuk drawer (Mobile)
const items = ref([
  { title: "Beranda", value: "beranda", icon: "mdi-home" },
  { title: "Tambah Saldo", value: "top-up", icon: "mdi-cash-plus" },
  { title: "Kelola Akun", value: "kelola-akun", icon: "mdi-account-cog" },
]);

// Fungsi untuk menangani responsif
function handleResize() {
  isMobile.value = window.innerWidth < 768; // Mode mobile di bawah 768px
}

// Event listener untuk resize
onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

// Fungsi untuk navigasi antar halaman
const navigate = (path) => {
  router.push(`/${path}`);
  drawerMobile.value = false; // Tutup drawer setelah navigasi
};

// Class aktif untuk menu
function getClass(value) {
  return route.path === `/${value}` ? "bg-cyan-darken-4 text-white rounded-lg" : "text-cyan-darken-4";
}

// Fungsi untuk logout
const logout = () => {
  localStorage.clear();
  router.replace("/auth/login");
};
</script>
