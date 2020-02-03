import Vue from 'vue'
//import Home from './views/Home.vue'
import Login from './views/login.vue'
import GridView from './views/GridView.vue'
import VueRouter from 'vue-router'
import Activities from './views/Activities.vue'

Vue.use(VueRouter)
export default new VueRouter({
  mode: "history",
  routes: [
    {
      path:'/',
      name:'login',
      component: Login
    },

    {
      path: '/gridView',
      name: 'gridView',
      component: GridView
    },

    {
      path: '/Activities',
      name: 'Activities',
      component: Activities
    }
    
  ]
  
});
