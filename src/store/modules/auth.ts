import { defineStore } from 'pinia'
import type { AxiosResponse } from 'axios'
import type { AdminData } from '@/api/auth'
import { adminLogin, userLogin } from '@/api/auth'
import type { RequestOptions } from '@/types/axios'
import type { ReaderResult } from '@/api/model/ReaderModel'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      user: {
        loginStatus: false,
        info: {} as ReaderResult | null,
      },
      admin: {
        loginStatus: false,
        info: {} as ReaderResult | null,
      },
    }
  },
  getters: {
    userLoginStatus(state): boolean {
      this.$hydrate({ runHooks: false })
      return state.user.loginStatus
    },
    adminLoginStatus(state): boolean {
      this.$hydrate({ runHooks: false })
      return state.admin.loginStatus
    },
    userId(state): number {
      return state.user.info?.id || -1
    },
  },
  actions: {
    handleUserLogin(data: string, options: RequestOptions): Promise<boolean> {
      return new Promise((resolve, _reject) => {
        userLogin(data, { ...options, isReturnNativeResponse: true })
          .then((res) => {
            const response = res as unknown as AxiosResponse<ReaderResult>
            if (response.status === 200) {
              this.user = {
                loginStatus: true,
                info: response.data,
              }
              this.admin = {
                loginStatus: false,
                info: null,
              }
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
            const response = res as unknown as AxiosResponse<ReaderResult>
            if (response.status === 200) {
              this.admin = {
                loginStatus: true,
                info: response.data,
              }
              this.user = {
                loginStatus: false,
                info: null,
              }
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
      this.user.info = null
      this.admin.loginStatus = false
      this.admin.info = null
    },
  },
  persist: true,
})
