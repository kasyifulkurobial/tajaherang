<template>
  <div v-if="isMobile">
    <v-card>
      <v-layout>
        <v-app-bar color="cyan-darken-4" prominent>
          <v-app-bar-nav-icon
            variant="text"
            @click.stop="drawerMobile = !drawerMobile"
          ></v-app-bar-nav-icon>

          <v-toolbar-title>Tajaherang Web App</v-toolbar-title>

          <v-spacer></v-spacer>

          <template v-if="$vuetify.display.mdAndUp">
            <v-btn icon="mdi-magnify" variant="text"></v-btn>

            <v-btn icon="mdi-filter" variant="text"></v-btn>
          </template>

          <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
        </v-app-bar>

        <v-navigation-drawer
          v-model="drawerMobile"
          :location="$vuetify.display.mobile ? 'bottom' : undefined"
          temporary
        >
          <v-list>
            <v-list-item
              v-for="item in items"
              :key="item.value"
              :title="item.title"
              :prepend-icon="item.icon"
              :class="getClassMobile(item.value)"
              @click="navigate(item.value)"
            ></v-list-item>
          </v-list>

          <template v-slot:append>
            <div class="pa-2">
              <v-btn
                block
                color="grey"
                prepend-icon="mdi-logout"
                @click="logout"
              >
                Logout
              </v-btn>
            </div>
          </template>
        </v-navigation-drawer>

        <v-main style="min-height: 100vh" class="bg-grey-lighten-4">
          <div class="pa-7"><router-view /></div>
        </v-main>
      </v-layout>
    </v-card>
  </div>

  <div v-else>
    <v-card>
      <v-layout>
        <v-navigation-drawer
          v-model="drawer"
          :rail="rail"
          permanent
          @click="rail = false"
        >
          <v-list-item
            prepend-avatar="https://disbudpar.batam.go.id/wp-content/uploads/sites/22/2020/01/Wonderful-1024x724@2x.png"
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

          <v-list density="compact" nav>
            <v-list-item
              :class="getClass('')"
              prepend-icon="mdi-view-dashboard"
              title="Dashboard"
              @click="navigateTo('/')"
            ></v-list-item>
            <v-list-item
              :class="getClass('akun-coa')"
              prepend-icon="mdi-table-multiple"
              title="Akun (COA)"
              @click="navigateTo('/akun-coa')"
            ></v-list-item>
            <v-list-item
              :class="getClass('daftar')"
              prepend-icon="mdi-account-multiple-plus"
              title="Daftar"
              @click="navigateTo('/daftar')"
            ></v-list-item>
            <v-list-item
              :class="getClass('inventaris')"
              prepend-icon="mdi-gold"
              title="Inventaris"
              @click="navigateTo('/inventaris')"
            ></v-list-item>
            <v-list-item
              :class="getClass('karyawan')"
              prepend-icon="mdi-account-group"
              title="Karyawan"
              @click="navigateTo('/karyawan')"
            ></v-list-item>
            <v-list-item
              :class="getClass('kategori')"
              prepend-icon="mdi-domain"
              title="Kategori Gaji dan Peminjaman"
              @click="navigateTo('/kategori')"
            ></v-list-item>
            <v-list-item
              :class="getClass('kelola-akun')"
              prepend-icon="mdi-chart-tree"
              title="Kelola Akun"
              @click="navigateTo('/kelola-akun')"
            ></v-list-item>
            <v-list-group
              title="Laporan"
              v-model="isLaporanOpen"
              :class="getClass('laporan')"
              prepend-icon="mdi-chart-bar"
            >
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" title="Laporan"></v-list-item>
              </template>

              <!-- Isi grup laporan -->
              <v-list-item
                :class="getClass('laporan/keuangan')"
                title="Catatan Laporan Keuangan"
                @click="navigateTo('/laporan/keuangan')"
              ></v-list-item>
              <v-list-item
                :class="getClass('laporan/arus-kas')"
                title="Laporan Arus Kas"
                @click="navigateTo('/laporan/arus-kas')"
              ></v-list-item>
              <v-list-item
                :class="getClass('laporan/laba-rugi')"
                title="Laporan Laba Rugi"
                @click="navigateTo('/laporan/laba-rugi')"
              ></v-list-item>
              <v-list-item
                :class="getClass('laporan/neraca')"
                title="Laporan Neraca"
                @click="navigateTo('/laporan/neraca')"
              ></v-list-item>
              <v-list-item
                :class="getClass('laporan/perubahan-modal')"
                title="Laporan Perubahan Modal"
                @click="navigateTo('/laporan/perubahan-modal')"
              ></v-list-item>
            </v-list-group>

            <v-list-item
              :class="getClass('ticket')"
              prepend-icon="mdi-ticket-confirmation"
              title="Ticket"
              @click="navigateTo('/ticket')"
            ></v-list-item>
            <v-list-item
              :class="getClass('top-up')"
              prepend-icon="mdi-cash"
              title="Top Up"
              @click="navigateTo('/top-up')"
            ></v-list-item>
            <v-list-item
              :class="getClass('transaksi')"
              prepend-icon="mdi-cash-register"
              title="Transaksi"
              @click="navigateTo('/transaksi')"
            ></v-list-item>
            <v-list-item
              :class="getClass('warung')"
              prepend-icon="mdi-home-analytics"
              title="Warung"
              @click="navigateTo('/warung')"
            ></v-list-item>
          </v-list>

          <template v-slot:append>
            <div class="pa-2">
              <v-btn
                block
                color="grey"
                prepend-icon="mdi-logout"
                @click="logout"
              >
                Logout
              </v-btn>
            </div>
          </template>
        </v-navigation-drawer>

        <v-main style="min-height: 100vh" class="bg-grey-lighten-4">
          <div class="pa-7"><router-view /></div>
        </v-main>
      </v-layout>
    </v-card>
  </div>
</template>

<script setup>
import { ref, watchEffect, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// Start Tab -> Desktop
const drawer = ref(true);
const rail = ref(false);
const isLaporanOpen = ref(false);

function navigateTo(path) {
  router.push(path);
}

function getClass(value) {
  if (route.path === `/${value}`) {
    return "bg-cyan-darken-4";
  } else {
    return "";
  }
}
// End Tab -> Desktop

// Start Mobile
const drawerMobile = ref(false);
const group = ref(null);
const items = ref([
  { title: "Dashboard", value: "/", icon: "mdi-view-dashboard" },
  { title: "Akun (COA)", value: "/akun-coa", icon: "mdi-table-multiple" },
  { title: "Daftar", value: "/daftar", icon: "mdi-account-multiple-plus" },
  { title: "Inventaris", value: "/inventaris", icon: "mdi-gold" },
  { title: "Karyawan", value: "/karyawan", icon: "mdi-account-group" },
  { title: "Kategroi Gaji dan Peminjaman", value: "/kategori", icon: "mdi-domain" },
  { title: "Kelola Akun", value: "/kelola-akun", icon: "mdi-chart-tree" },
  { title: "Laporan", value: "/laporan", icon: "mdi-chart-bar" },
  { title: "Laporan Neraca", value: "/laporan/neraca", icon: "mdi-chart-bar" },
  { title: "Laporan Laba Rugi", value: "/laporan/laba-rugi", icon: "mdi-chart-bar" },
  { title: "Laporan Arus Kas", value: "/laporan/arus-kas", icon: "mdi-chart-bar" },
  { title: "Laporan Perubahan Modal", value: "/laporan/perubahan-modal", icon: "mdi-chart-bar" },
  { title: "Laporan Keuangan", value: "/laporan/keuangan", icon: "mdi-chart-bar" },
  { title: "Ticket", value: "/ticket", icon: "mdi-ticket-confirmation" },
  { title: "Top Up", value: "/top-up", icon: "mdi-cash" },
  { title: "Transaksi", value: "/transaksi", icon: "mdi-cash-register" },
  { title: "Warung", value: "/warung", icon: "mdi-home-analytics" },
]);

function navigate(path) {
  router.push(path);
  drawerMobile.value = false; // Tutup drawer setelah navigasi
}
function getClassMobile(value) {
  if (route.path === `${value}`) {
    return "bg-cyan-darken-4";
  } else {
    return "";
  }
}

watch(group, () => {
  drawerMobile.value = false;
});
// End Mobile

const logout = () => {
  localStorage.removeItem("tjx_token");
  localStorage.removeItem("tjx_user");
  localStorage.removeItem("tjx_user_role");
  setTimeout(() => {
    router.replace("/auth/login");
  }, 500);
};

const isMobile = ref(false);

function handleResize() {
  isMobile.value = window.innerWidth < 768; // True jika lebar layar di bawah 768px
}

// Setel nilai awal saat komponen dipasang
onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize); // Pantau perubahan ukuran layar
});

// Bersihkan event listener saat komponen dihancurkan
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>
