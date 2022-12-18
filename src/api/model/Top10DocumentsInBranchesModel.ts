import type { DocumentApiModel } from './DocumentApiModel'
import type { LibraryModel } from './LibraryModel'

export interface Top10DocumentsInBranchesModel {
  borrowedCounts: Array<string>
  library: LibraryModel
  topDocuments: Array<DocumentApiModel>
}
