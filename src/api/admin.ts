import type { ReaderResult } from './model/ReaderModel'
import type { RequestOptions } from '@/types/axios'
import { request } from '@/utils/request'

const Api = {
  getAllReaders: '/admin/get/all/readers',
}

export function getAllReaders(options: RequestOptions = {}) {
  return request.get<Array<ReaderResult>>({
    url: Api.getAllReaders,
  }, options)
}
