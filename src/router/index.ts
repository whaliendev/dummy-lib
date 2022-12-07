import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const constantRoutes: RouteRecordRaw[] = []

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
})

export default router
