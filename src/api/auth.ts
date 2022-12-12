import type { ReaderResult } from './model/ReaderModel'
import type { RequestOptions } from '@/types/axios'
import { request } from '@/utils/request'

export interface AdminData {
  id: string
  password: string
}

const Api = {
  adminLogin: '/reader/admin/login',
  userLogin: '/reader/reader/login',
}

export function adminLogin(data: AdminData, options: RequestOptions = {}) {
  return request.post<ReaderResult>({
    url: Api.adminLogin,
    data,
  }, options)
}

export function userLogin(cardNumber: string, options: RequestOptions = {}) {
  return request.get<ReaderResult>({
    url: Api.userLogin,
    params: { cardNumber },
  }, options)
}
