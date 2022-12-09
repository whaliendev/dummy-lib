import { createRouter, createWebHistory } from 'vue-router'
import routeRecords from './route-records'

const router = createRouter({
  history: createWebHistory(),
  routes: routeRecords,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    else if (savedPosition) {
      return savedPosition
    }
    else {
      return {
        top: 0,
      }
    }
  },
})

export default router
