import type { RequestOptions } from '@/types/axios'
import { request } from '@/utils/request'

export interface AuthorInfo {
  name: string
  url: string
}

export interface PublisherInfo {
  name: string
}

interface CoverObj {
  small?: string
  medium?: string
  large?: string
}

export interface BookModel {
  url: string
  key: string
  title: string
  authors: Array<AuthorInfo> | AuthorInfo
  number_of_pages: number
  identifiers: any
  classifications: any
  publishers: Array<PublisherInfo> | PublisherInfo
  publish_data: string
  subjects: any
  cover: CoverObj
}

export interface BookResult {
  status: string
  statusText: string
  data: BookModel
}

const Api = {
  book: '/book',
}

export function getBookData(isbn: string, options: RequestOptions = {}) {
  return request.get<BookResult>({
    url: Api.book,
    params: {
      isbn,
    },
    withCredentials: false,
  },
  {
    ...{
      apiUrl: 'http://43.156.250.168:3000',
      urlPrefix: '/api',
    },
    ...options,
  })
}
