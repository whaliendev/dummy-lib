import VueRouter from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const constantRoutes: RouteRecordRaw[] = []

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: constantRoutes,
})

export default router
