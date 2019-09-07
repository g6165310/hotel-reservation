import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
Vue.component("Loading", Loading);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
