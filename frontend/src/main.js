import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { VueCsvImport } from "vue-csv-import";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  components: { VueCsvImport },
}).$mount("#app");
