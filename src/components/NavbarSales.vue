<template>
  <div>
    <!-- Desktop Navigation -->
    <v-app-bar
      color="cyan-darken-4"
      prominent
      v-if="!isMobile"
    >
      <v-toolbar-title>Tajaherang - Sales</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        text
        :class="getClass('kelola-produk')"
        @click="navigate('/kelola-produk')"
      >
        Kelola Produk
      </v-btn>
      <v-btn
        text
        :class="getClass('transaksi')"
        @click="navigate('/transaksi')"
      >
        Transaksi
      </v-btn>
      <v-btn
        text
        :class="getClass('penarikan')"
        @click="navigate('/penarikan')"
      >
        Penarikan
      </v-btn>
      <v-btn icon="mdi-logout" variant="text" @click="logout"></v-btn>
    </v-app-bar>

    <!-- Mobile Navigation -->
    <v-app-bar
      color="cyan-darken-4"
      prominent
      v-else
    >
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawerMobile = !drawerMobile"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>Tajaherang - Sales</v-toolbar-title>

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
            :class="getClass(item.value)"
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
    </v-app-bar>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const isMobile = ref(false);
const drawerMobile = ref(false);

const items = ref([
  { title: "Kelola Produk", value: "kelola-produk", icon: "mdi-cube-outline" },
  { title: "Transaksi", value: "transaksi", icon: "mdi-cash-register" },
  { title: "Penarikan", value: "penarikan", icon: "mdi-bank-transfer-out" },
]);

function handleResize() {
  isMobile.value = window.innerWidth < 768; // True jika layar di bawah 768px
}

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

const navigate = (path) => {
  router.push(`/${path}`);
  drawerMobile.value = false; // Tutup drawer setelah navigasi
};

function getClass(value) {
  return route.path === `/${value}` ? "bg-cyan-darken-4" : "";
}

const logout = () => {
  localStorage.clear();
  router.replace("/auth/login");
};
</script>
