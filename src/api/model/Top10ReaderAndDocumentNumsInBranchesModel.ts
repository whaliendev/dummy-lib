import type { LibraryModel } from './LibraryModel'
import type { ReaderResult } from './ReaderModel'

interface TopReader {
  borrowedDocumentCounts: number
  reader: ReaderResult
}

export interface Top10ReaderAndDocumentNumsInBranchesModel {
  library: LibraryModel
  topReaderList: Array<TopReader>
}
