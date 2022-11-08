import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/bar",
    },
    {
      path: "/bar",
      component: () => import("@/components/barPlot.vue"),
    },
    {
      path: "/scatter",
      component: () => import("@/components/scatterPlot.vue"),
    },
  ],
});
