import type { RouteRecordRaw } from 'vue-router'
import LoginLayout from '@/layout/LoginLayout.vue'
import HeaderLayout from '@/layout/HeaderLayout.vue'
import HomeRibbon from '@/views/HomeRibbon.vue'
import AdminHome from '@/views/AdminHome.vue'
import UserHome from '@/views/UserHome.vue'
import DocumentAdmin from '@/views/admin-view/DocumentAdmin.vue'
import ReaderAdmin from '@/views/admin-view/ReaderAdmin.vue'
import BranchAdmin from '@/views/admin-view/BranchAdmin.vue'
import DocumentBorrowed from '@/views/user-view/DocumentBorrowed.vue'
import DocumentReserved from '@/views/user-view/DocumentReserved.vue'

export type NamedRouteRecordRaw = WithRequired<RouteRecordRaw, 'name'>

const routeRecords: Array<NamedRouteRecordRaw> = [
  {
    name: 'root',
    path: '/',
    component: HeaderLayout,
    children: [
      {
        name: 'home',
        path: '',
        component: HomeRibbon,
      },
      {
        name: 'user',
        path: 'user',
        component: UserHome,
        meta: {
          requireLoggedIn: true,
        },
        children: [
          {
            name: 'user-borrowed',
            path: 'borrowed',
            component: DocumentBorrowed,
          },
          {
            name: 'user-reserved',
            path: 'reserved',
            component: DocumentReserved,
          },
        ],
      },
      {
        name: 'admin',
        path: 'admin',
        component: AdminHome,
        meta: {
          requireAdmin: true,
        },
        children: [
          {
            name: 'admin-doc',
            path: 'doc',
            component: DocumentAdmin,
          },
          {
            name: 'admin-reader',
            path: 'reader',
            component: ReaderAdmin,
          },
          {
            name: 'admin-branch',
            path: 'branch',
            component: BranchAdmin,
          },
        ],
      },
    ],
  },
  {
    name: 'login',
    path: '/login',
    component: LoginLayout,
  },
  {
    name: 'login-to',
    path: '/login/to/:dest',
    component: LoginLayout,
  },
]

export default routeRecords
