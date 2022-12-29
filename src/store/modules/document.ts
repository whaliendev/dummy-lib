import { defineStore } from 'pinia'
import type { DocumentMetaModel } from '@/api/model/DocumentModel'
import { findByDocumentId, findByPublisherName, findByTitleLike } from '@/api/document'

export const useDocumentStore = defineStore('document', {
  state: () => {
    return {
      home: {
        loading: false,
        docList: [] as Array<DocumentMetaModel>,
        error: false,
      },
    }
  },
  getters: {
    homeListLoading(state) {
      return state.home.loading
    },
  },
  actions: {
    async searchDocByTitleLike(search: string) {
      this.home.error = false
      this.home.loading = true
      try {
        const docList = await findByTitleLike(search, {
          errorWarning: true,
        })
        this.home.docList = docList
      }
      catch (_err) {
        this.home.error = true
      }
      this.home.loading = false
    },
    async searchDocByPublisher(publisher: string) {
      this.home.error = false
      this.home.loading = true
      try {
        const docList = await findByPublisherName(publisher, {
          errorWarning: true,
        })
        this.home.docList = docList
      }
      catch (_err) {
        this.home.error = true
      }
      this.home.loading = false
    },
    async searchByDocId(id: number) {
      this.home.error = false
      this.home.loading = true
      try {
        const doc = await findByDocumentId(id, {
          errorWarning: true,
        })
        this.home.docList = [doc]
      }
      catch (_err) {
        this.home.error = true
      }
      this.home.loading = false
    },
  },
})
