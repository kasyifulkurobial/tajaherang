import { createRouter, createWebHistory } from "vue-router/auto";
import { setupLayouts } from "virtual:generated-layouts";
import { routes } from "vue-router/auto-routes";

// Konfigurasi router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
});

// Workaround untuk mengatasi masalah dynamic import
router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (!localStorage.getItem("vuetify:dynamic-reload")) {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    } else {
      console.error("Dynamic import error, reloading page did not fix it", err);
    }
  } else {
    console.error(err);
  }
});

// Hapus cache reload setelah router siap
router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

// Middleware untuk otentikasi dan otorisasi
router.beforeEach((to, from, next) => {
  const userRole = localStorage.getItem("tjx_user_role"); // Ambil role user dari localStorage
  const token = localStorage.getItem("tjx_token"); // Periksa token autentikasi

  // Redirect ke login jika role/token tidak ada dan bukan menuju login
  if (!token || !userRole) {
    if (to.path !== "/auth/login") {
      return next("/auth/login");
    }
  }

  // Definisikan hak akses berbasis role
  const rolePermissions = {
    user: ["/beranda", "/top-up", "/kelola-akun"], // Hak akses untuk role 'user'
    sales: ["/kelola-produk", "/transaksi", "/penarikan"], // Hak akses untuk role 'sales'
    akuntan: [
      "/",
      "/ticket",
      "/warung",
      "/gaji-karyawan",
      "/inventaris",
      "/akun-coa",
      "/transaksi",
      "/laporan/neraca",
      "/laporan/laba-rugi",
      "/laporan/arus-kas",
      "/laporan/perubahan-modal",
      "/laporan/keuangan",
    ], // Hak akses lengkap untuk akuntan
    manager: routes.map((route) => route.path), // Manager memiliki akses ke semua rute
  };

  const allowedRoutes = rolePermissions[userRole] || [];

  // Periksa apakah rute diizinkan (gunakan prefix match untuk akses turunan)
  const isAllowed = allowedRoutes.some((route) => to.path.startsWith(route));

  if (userRole && !isAllowed) {
    // Redirect default jika user mencoba mengakses rute yang tidak diizinkan
    const redirectPath =
      userRole === "user"
        ? "/beranda"
        : userRole === "sales"
        ? "/transaksi"
        : "/";
    return next(redirectPath);
  }

  // Jika pengguna sudah login, cegah akses ke halaman autentikasi
  if (token && userRole && to.path.startsWith("/auth")) {
    return next("/");
  }

  next(); // Lanjutkan jika akses diizinkan
});

// Export router untuk digunakan di aplikasi
export default router;
