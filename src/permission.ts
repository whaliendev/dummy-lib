import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from './router'
import { useAuthStore } from './store/modules/auth'

NProgress.configure({
  showSpinner: false,
})

router.beforeEach((to, _from) => {
  NProgress.start()

  const authStore = useAuthStore()

  // skip login if possible
  if (to.path.includes('login') && (to.name as string).includes('admin') && authStore.adminLoginStatus)
    return true

  if (to.path.includes('login') && (to.name as string).includes('user') && authStore.userLoginStatus)
    return true

  if (to.meta.requireAdmin) {
    if (authStore.adminLoginStatus)
      return true
    else
      return { path: `/login/to/${to.name as string}` }
  }

  if (to.meta.requireLoggedIn) {
    if (authStore.userLoginStatus)
      return true
    else
      return { path: `/login/to/${to.name as string}` }
  }
})

router.afterEach((to) => {
  const authStore = useAuthStore()
  if (to.path.includes('login'))
    authStore.logout()
  NProgress.done()
})

