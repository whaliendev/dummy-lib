/**
 * The DocumentModel.ts doesn't match the response result of API,
 * so I made a new model of the document.
 */

export interface DocumentApiModel {
  id: string
  publicationDate: string
  publisherId: string
  title: string
  type: 'Book' | 'ConferenceProceeding' | 'Journal'
}
