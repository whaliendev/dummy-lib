interface AuthorInfo {
  name: string
  url?: string
}

export interface BookModel {
  id: number
  title: string
  publisher: string
  pubDate: number
  authors: Array<AuthorInfo>
  pageNum?: number
  cover: string
}

export interface JournalModel {
  id: number
  title: string
  publisher: string
  pubDate: number
  editors?: string
}

export interface ConferenceModel {
  id: number
  title: string
  publisher?: string
  pubDate?: string
  location?: string
  editors?: string
}

export type DocumentTypeEnum = 'Book' | 'Journal' | 'ConferenceProceeding'

export interface DocumentModel {
  id: number
  title: string
  publisher?: string
  pubDate?: string
  type: DocumentTypeEnum
}
