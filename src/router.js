import Vue from 'vue'
//import Home from './views/Home.vue'
import GridView from './views/GridView.vue'
import Login from './views/login.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: GridView
    },
    {
      path:'/login',
      name:'login',
      component: Login
    }
    
  ]
  
});
