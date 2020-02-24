import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import BootstrapVue from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'material-icons/css/material-icons.css'
import 'material-icons/iconfont/material-icons.css';



Vue.use(BootstrapVue)
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
router,
store
}).$mount('#app')
