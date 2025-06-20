/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */
import "@/styles/style.css";

// Plugins
import { registerPlugins } from "@/plugins";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

//Toastify
import Vue3Toastify from "vue3-toastify";

//Spinner
import { VueSpinnersPlugin } from 'vue3-spinners';

const app = createApp(App);

registerPlugins(app);
app.use(Vue3Toastify, {
  autoClose: 3000,
});
app.use(VueSpinnersPlugin);
app.mount("#app");
