/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";
import router from "./router/index";
import Store from "./store/index";

const app = createApp(App);
app.use(router);
app.use(Store);

registerPlugins(app);

app.mount("#app");
