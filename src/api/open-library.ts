import type { RequestOptions } from '@/types/axios'
import { request } from '@/utils/request'

interface AuthorInfo {
  name: string
  url: string
}

interface PublisherInfo {
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
  [key: string]: BookModel
}

const Api = {
  books: '/books',
}

export function getBookData(isbn: string, options: RequestOptions = {}) {
  return request.get<BookResult>({
    url: Api.books,
    params: {
      bibkeys: `ISBN:${isbn}`,
      jscmd: 'data',
      format: 'json',
    },
    withCredentials: false,
  },
  {
    ...{
      apiUrl: 'https://openlibrary.org',
      urlPrefix: '/api',
    },
    ...options,
  })
}
