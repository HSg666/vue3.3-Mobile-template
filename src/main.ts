import { createApp } from "vue";
import "./style.css";
import "./common.scss"; // 公共样式
import "virtual:windi.css"; // 引入便捷css库
import App from "./App.vue";
import { createPinia } from "pinia";
const pinia = createPinia();

createApp(App).use(pinia).mount("#app");
