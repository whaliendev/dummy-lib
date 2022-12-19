import type { PublisherModel } from './Publisher'

export interface BookModel {
  authorId: number
  isbn: string
  publicationDate: string
  publisherId: number
  title: string
}

export interface ConferenceModel {
  date: string
  editor: string
  location: string
  publicationDate: string
  publisherId: number
  title: string
}

export interface JournalModel {
  editor: string
  id: number
  name: string
  publicationDate: string
  publisherId: number
  scope: string
  title: string
  volumes?: Array<{
    editor: string
    id: number
    journalId: number
    number: string
  }>
}

export interface LibDocumentModel {
  documentId: number
  id: number
  libId: number
  libraryLocation: string
  libraryName: string
  number: number
  totalNumber: number
}

export type DocumentTypeEnum = 'book' | 'journal' | 'conference'

export interface DocumentDetailModel {
  documentContent: {
    bookVo?: BookModel
    conferenceProceedingVo?: ConferenceModel
    journalVo?: JournalModel
  }
  id: number
  libDocumentsVo: Array<LibDocumentModel>
  publicationDate: string
  publisher: PublisherModel
  title: string
  type: DocumentTypeEnum
}
