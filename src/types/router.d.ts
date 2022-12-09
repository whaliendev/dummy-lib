import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    requireAdmin?: boolean  // 需要管理员login
    requireLoggedIn?: boolean // 需要用户Login
    title?: string
  }
}