import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import vPopover from "./components/public/lp-popover";

const app = createApp(App);

// 注册自定义指令 v-popver
vPopover(app);

app.use(store).mount("#app");
