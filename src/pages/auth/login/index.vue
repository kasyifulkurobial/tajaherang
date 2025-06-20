<template>
  <div>
    <v-col class="text-center my-8">
      <h4 class="text-h4">Login</h4>
      <span class="text-subtitle-1">Tajaherang Web App </span>
    </v-col>
    <VForm ref="myForm" @submit.prevent="onFormSubmit">
      <v-card
        class="mx-auto pa-12 pb-8"
        elevation="8"
        max-width="448"
        rounded="lg"
      >
        <div class="text-subtitle-1 text-medium-emphasis">Account</div>

        <v-text-field
          v-model="username"
          :rules="usernameRules"
          :autofocus="autofocus"
          density="compact"
          placeholder="Username atau Email"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
        ></v-text-field>

        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          Password

          <a
            class="text-caption text-decoration-none text-blue"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            Lupa password?
          </a>
        </div>

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Masukan password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-card class="mb-2" color="surface-variant" variant="tonal"></v-card>

        <LoadingSpinner v-if="isLoading" />
        <v-btn
          v-else
          class="mb-2 bg-cyan-darken-4"
          size="large"
          variant="tonal"
          block
          type="submit"
        >
          Log In
        </v-btn>
      </v-card>
    </VForm>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import AuthService from "@/services/AuthService";
import notification from "@/utils/toast";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const isLoading = ref(false);
const visible = ref(false);
const router = useRouter();

/** Form */
const myForm = ref(null);
const autofocus = ref(true);
const username = ref(null);
const password = ref(null);

const usernameRules = ref([(v) => !!v || "Username atau email harus diisi"]);
const passwordRules = ref([(v) => !!v || "Password harus diisi"]);

async function onFormSubmit() {
  const { valid } = await myForm.value.validate();

  if (!valid) return;

  fetchLogin();
}

const fetchLogin = () => {
  isLoading.value = true;
  // username: 'emilys',
  // password: 'emilyspass',
  AuthService.login(username.value, password.value)
    .then((res) => {
      notification("Berhasil Login.", "success");
      localStorage.setItem("tjx_token", JSON.stringify(res.data.accessToken));
      localStorage.setItem("tjx_user", JSON.stringify(res.data));
      localStorage.setItem("tjx_user_role", "manager");
      location.reload();
    })
    .catch((e) => {
      console.error(e);
      notification("Username atau Password salah.", "error");
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const checkToken = () => {
  const token = localStorage.getItem("tjx_token"); // Ambil ulang token dari localStorage saat aplikasi diload
  if (token) {
    router.push("/");
  }
};

onMounted(() => {
  checkToken();
});
</script>
