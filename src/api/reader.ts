import type { RegisterReaderModel } from './model/RegisterModel'
import type { RequestOptions } from '@/types/axios'
import { request } from '@/utils/request'

const Api = {
  cancelRegister: '/reader/cancel-register',
  register: '/reader/register',
}

export function cancelRegister(id: String, options: RequestOptions = {}) {
  return request.get({
    url: Api.cancelRegister,
    params: { id },
  }, options)
}

export function register(readerInfo: RegisterReaderModel, options: RequestOptions = {}) {
  return request.post({
    url: Api.register,
    params: { ...readerInfo },
  }, options)
}
