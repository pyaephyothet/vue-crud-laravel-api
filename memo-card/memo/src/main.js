import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import "./assets/css/index.css";

const app = createApp(App);
app.config.productionTip = false;
app.config.globalProperties.$http = axios;

app.mount("#app");
