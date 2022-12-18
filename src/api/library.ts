import type { LibraryModel } from './model/LibraryModel'
import type { RequestOptions } from '@/types/axios'
import { request } from '@/utils/request'

const Api = {
  getAllLibraries: '/library/get/all',
}

export function getAllLibraries(options: RequestOptions = {}) {
  return request.get<Array<LibraryModel>>({
    url: Api.getAllLibraries,
  }, options)
}
