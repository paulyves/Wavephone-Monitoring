import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BootstrapVue from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "material-icons/css/material-icons.css";
import "material-icons/iconfont/material-icons.css";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    /**
     * condition where it will find routes that has a meta.requiresAuth
     */
    if (!store.getters.isLoggedIn) {
      /**
       * @param isLoggedIn = it's a getter where we store the token, if the token is null
       * the user will be directed in the login page and if not null the user will be directed to the Home page.
       */
      next({
        name: "login"
      });
    }
    next();
  } else {
    next();
  }
});
new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
