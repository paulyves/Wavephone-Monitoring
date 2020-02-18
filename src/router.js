import Vue from 'vue'
//import Home from './views/Home.vue'
import Login from './views/login.vue'
import GridView from './views/GridView.vue'
import VueRouter from 'vue-router'
import Activities from './views/Activities.vue'
import Main from './views/Main.vue'

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
      path: '/Main',
      name: 'main',
      component: Main
    },

    {
      path: '/Registration',
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
