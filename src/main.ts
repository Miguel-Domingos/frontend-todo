import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import CustomTheme from "@/theme/PrimevueCustomTheme";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
app.use(ToastService);

app.use(PrimeVue, {
  theme: {
    preset: CustomTheme,
    options: {
      darkModeSelector: ".dark",
    },
  },
});

app.mount("#app");
