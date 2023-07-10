import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import "./assets/css/index.css";
import router from "./router";

const app = createApp(App);
app.config.productionTip = false;
app.config.globalProperties.$http = axios;

app.use(router).mount("#app");
