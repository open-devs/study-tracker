import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue')
  },
  {
    path: '/history',
    name: 'History',
    component: () => import(/* webpackChunkName: "history" */ '../views/History.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  if (localStorage.getItem('bearer') || to.fullPath === '/') {
    next()
  } else {
    next('/')
  }
})

export default router
