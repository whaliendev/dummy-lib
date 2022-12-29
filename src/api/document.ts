import type { DocumentDetailModel, DocumentMetaModel } from './model/DocumentModel'
import type { RequestOptions } from '@/types/axios'
import { request } from '@/utils/request'

const Api = {
  findByPublisherName: '/document/findByPublisherName',
  findByTitleLike: '/document/findByTitleLike',
  documentDetail: '/document/detail',
  findByDocumentId: '/document',
}

export const findByTitleLike = (title: string, options: RequestOptions = {}) => {
  return request.get<Array<DocumentMetaModel>>({
    url: Api.findByTitleLike,
    params: { title },
  }, options)
}

export const findByPublisherName = (publisher: string, options: RequestOptions = {}) => {
  return request.get<Array<DocumentMetaModel>>({
    url: Api.findByPublisherName,
    params: {
      publisherName: publisher,
    },
  }, options)
}

export const findByDocumentId = (id: number, options: RequestOptions = {}) => {
  return request.get<DocumentMetaModel>({
    url: Api.findByDocumentId,
    params: {
      id,
    },
  }, options)
}

export const getDocumentDetail = (id: number, options: RequestOptions = {}) => {
  return request.get<DocumentDetailModel>({
    url: Api.documentDetail,
    params: { id },
  }, options)
}
