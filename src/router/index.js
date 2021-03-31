import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/green',
    name: 'green',
    component: () => import('./../components/Circle/Green.vue'),
    
  },
  {
    path: '/red',
    name: 'red',
    component: () => import('./../components/Circle/Red.vue'),
  },
  {
    path: '/yellow',
    name: 'yellow',
    component: () => import('./../components/Circle/Yellow.vue'),
  },
]

const router = new VueRouter({
  el: '#app',
  routes
})

export default router
