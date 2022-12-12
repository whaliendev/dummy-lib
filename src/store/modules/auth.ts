import { defineStore } from 'pinia'
import type { AxiosResponse } from 'axios'
import type { AdminData } from '@/api/auth'
import { adminLogin, userLogin } from '@/api/auth'
import type { RequestOptions } from '@/types/axios'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      user: {
        loginStatus: false,
      },
      admin: {
        loginStatus: false,
      },
    }
  },
  getters: {
    userLoginStatus: state => state.user.loginStatus,
    adminLoginStatus: state => state.admin.loginStatus,
  },
  actions: {
    handleUserLogin(data: string, options: RequestOptions): Promise<boolean> {
      return new Promise((resolve, _reject) => {
        userLogin(data, { ...options, isReturnNativeResponse: true })
          .then((res) => {
            const response = res as unknown as AxiosResponse
            if (response.status === 200) {
              this.user.loginStatus = true
              this.admin.loginStatus = false
              resolve(true)
            }
            else {
              resolve(false)
            }
          })
          .catch(() => {
            resolve(false)
          })
      })
    },
    handleAdminLogin(data: AdminData, options: RequestOptions): Promise<boolean> {
      return new Promise((resolve, _reject) => {
        adminLogin(data, { ...options, isReturnNativeResponse: true })
          .then((res) => {
            const response = res as unknown as AxiosResponse
            if (response.status === 200) {
              this.admin.loginStatus = true
              this.user.loginStatus = false
              resolve(true)
            }
            else {
              resolve(false)
            }
          })
          .catch(() => {
            resolve(false)
          })
      })
    },
    logout() {
      this.user.loginStatus = false
      this.admin.loginStatus = false
    },
  },
  persist: true,
})
