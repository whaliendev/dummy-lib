import type { ReaderResult } from './model/ReaderModel'
import type { AverageFinePaidModel } from './model/AverageFinePaidModel'
import type { Top10ReaderAndDocumentNumsInBranchesModel } from './model/Top10ReaderAndDocumentNumsInBranchesModel'
import type { Top10DocumentsInBranchesModel } from './model/Top10DocumentsInBranchesModel'
import type { Top10DocumentsInYearModel } from './model/Top10DocumentsInYearModel'
import { request } from '@/utils/request'
import type { RequestOptions } from '@/types/axios'

const Api = {
  getAllReaders: '/admin/get/all/readers',
  getAllAverageFinePaid: '/admin/reader/average-fine-paid',
  getTop10ReaderAndDocumentNumsInBranches: '/admin/library/top10/readerAndDocumentNums',
  getTop10DocumentsInBranches: '/admin/library/top10/documents',
  getTop10DocumentsInYear: '/admin/year/top10/documents',
}

export function getAllReaders(options: RequestOptions = {}) {
  return request.get<Array<ReaderResult>>({
    url: Api.getAllReaders,
  }, options)
}

export function getAllAverageFinePaid(options: RequestOptions = {}) {
  return request.get<Array<AverageFinePaidModel>>({
    url: Api.getAllAverageFinePaid,
  }, options)
}

export function getTop10ReaderAndDocumentNumsInBranches(options: RequestOptions = {}) {
  return request.get<Array<Top10ReaderAndDocumentNumsInBranchesModel>>({
    url: Api.getTop10ReaderAndDocumentNumsInBranches,
  }, options)
}

export function getTop10DocumentsInBranches(options: RequestOptions = {}) {
  return request.get<Array<Top10DocumentsInBranchesModel>>({
    url: Api.getTop10DocumentsInBranches,
  }, options)
}

export function getTop10DocumentsInYear(options: RequestOptions = {}) {
  return request.get<Array<Top10DocumentsInYearModel>>({
    url: Api.getTop10DocumentsInYear,
  }, options)
}
