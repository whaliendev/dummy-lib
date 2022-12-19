<script lang="ts">
/**
 * Rank1: top 10 most frequent borrowers in a branch and the number of books each has borrowed
 * -> Top10ReaderAndDocumentNumsInBranchesModel
 *
 * Rank2: top 10 most borrowed books in a branch
 * -> Top10DocumentsInBranchesModel
 *
 * Rank3: top 10 most popular books of the year
 * -> Top10DocumentsInYearModel
 */

import { defineComponent, h, ref } from 'vue'
import type { AxiosResponse } from 'axios'
import { LocationIcon } from 'tdesign-icons-vue-next'
import type { LibraryModel } from '@/api/model/LibraryModel'
import type { Top10ReaderAndDocumentNumsInBranchesModel } from '@/api/model/Top10ReaderAndDocumentNumsInBranchesModel'
import type { Top10DocumentsInBranchesModel } from '@/api/model/Top10DocumentsInBranchesModel'
import type { Top10DocumentsInYearModel } from '@/api/model/Top10DocumentsInYearModel'
import type { DocumentApiModel } from '@/api/model/DocumentApiModel'
import type { ReaderResult } from '@/api/model/ReaderModel'
import { rank1List, rank2List, rank3List } from '@/mock/admin-view/BranchAdmin'
import { getTop10DocumentsInBranches, getTop10DocumentsInYear, getTop10ReaderAndDocumentNumsInBranches } from '@/api/admin'
import type { RequestOptions } from '@/types/axios'

type rank1 = { borrowedDocumentCounts: number } & ReaderResult

type rank2 = { borrowedCount: number } & DocumentApiModel

type rank3 = { borrowedNums: number } & DocumentApiModel

export default defineComponent({
  data() {
    return {
      libraries: [
        {
          id: 16,
          location: 'OSSU工学校区',
          name: 'OSSU工学分馆',
        },
        {
          id: 17,
          location: 'OSSU文理校区',
          name: 'OSSU图书馆总馆',
        },
        {
          id: 18,
          location: 'OSSU医学校区',
          name: 'OSSU图书馆医学分馆',
        },
        {
          id: 19,
          location: 'OSSU信息校区',
          name: 'OSSU图书馆信息学分馆',
        },
      ] as Array<LibraryModel>,

      rank1List: [] as Array<Top10ReaderAndDocumentNumsInBranchesModel>,

      rank2List: [] as Array<Top10DocumentsInBranchesModel>,

      rank3List: [] as Array<Top10DocumentsInYearModel>,

      rank1Map: new Map() as Map<number, Array<rank1>>,

      rank2Map: new Map() as Map<number, Array<rank2>>,

      rank3Data: [] as Array<rank3>,

      rank1Column: [
        { colKey: 'name', title: '姓名' },
        { colKey: 'cardNumber', title: '校园卡账号' },
        { colKey: 'borrowedDocumentCounts', title: '借阅书籍（本）' },
      ],

      rank2Column: [
        { colKey: 'title', title: '书籍' },
        { colKey: 'type', title: '类型' },
        { colKey: 'publicationDate', title: '出版日期' },
        { colKey: 'borrowedCount', title: '借阅次数' },
      ],

      rank3Column: [
        { colKey: 'title', title: '书籍' },
        { colKey: 'type', title: '类型' },
        { colKey: 'publicationDate', title: '出版日期' },
        { colKey: 'borrowedNums', title: '借阅次数' },
      ],

      requestOptions: {
        retry: {
          count: 2,
          delay: 50,
        },
        errorWarning: true,
      },
    }
  },
  mounted() {
    // this.getMockData()
    // this.processData()
    Promise.all([
      this.getRank1Data(this.requestOptions),
      this.getRank2Data(this.requestOptions),
      this.getRank3Data(this.requestOptions),
    ]).then(() => {
      this.processData()
    })
  },
  methods: {
    getData() {
      this.getRank1Data(this.requestOptions)
      this.getRank2Data(this.requestOptions)
      this.getRank3Data(this.requestOptions)
    },
    async getRank1Data(options: RequestOptions): Promise<boolean> {
      return new Promise((resolve, _reject) => {
        getTop10ReaderAndDocumentNumsInBranches({ ...options, isReturnNativeResponse: true })
          .then((res) => {
            const response = res as unknown as AxiosResponse<Array<Top10ReaderAndDocumentNumsInBranchesModel>>
            if (response.status === 200) {
              this.rank1List = response.data
              resolve(true)
            }
            else {
              resolve(false)
            }
          })
          .catch(() => {
            resolve(false)
          })
      })
    },
    async getRank2Data(options: RequestOptions): Promise<boolean> {
      return new Promise((resolve, _reject) => {
        getTop10DocumentsInBranches({ ...options, isReturnNativeResponse: true })
          .then((res) => {
            const response = res as unknown as AxiosResponse<Array<Top10DocumentsInBranchesModel>>
            if (response.status === 200) {
              this.rank2List = response.data
              resolve(true)
            }
            else {
              resolve(false)
            }
          })
          .catch(() => {
            resolve(false)
          })
      })
    },
    async getRank3Data(options: RequestOptions): Promise<boolean> {
      return new Promise((resolve, _reject) => {
        getTop10DocumentsInYear({ ...options, isReturnNativeResponse: true })
          .then((res) => {
            const response = res as unknown as AxiosResponse<Array<Top10DocumentsInYearModel>>
            if (response.status === 200) {
              this.rank3List = response.data
              resolve(true)
            }
            else {
              resolve(false)
            }
          })
          .catch(() => {
            resolve(false)
          })
      })
    },
    getMockData() {
      this.rank1List = rank1List as Array<Top10ReaderAndDocumentNumsInBranchesModel>
      this.rank2List = rank2List as Array<Top10DocumentsInBranchesModel>
      this.rank3List = rank3List as Array<Top10DocumentsInYearModel>
    },
    processData() {
      this.rank1List.forEach((item) => {
        const id = item.library.id
        const readerAndCountList = item.topReaderList.map((topReader) => {
          const reader = topReader.reader
          return {
            borrowedDocumentCounts: topReader.borrowedDocumentCounts,
            ...reader,
          }
        })
        this.rank1Map.set(id, readerAndCountList)
      })

      this.rank2List.forEach((item) => {
        const id = item.library.id
        const documentList = item.topDocuments.map((topDocument, index) => {
          const borrowedCount = item.borrowedCounts[index]
          return {
            borrowedCount,
            ...topDocument,
          }
        })
        this.rank2Map.set(id, documentList)
      })

      this.rank3Data = this.rank3List.map((item) => {
        const document = item.document
        return {
          borrowedNums: item.borrowedNums,
          ...document,
        }
      })
    },
  },
})
</script>

<template>
  <div class="branch-admin-container">
    <t-tabs :default-value="1">
      <t-tab-panel :value="1" label="图书馆总览">
        <div class="card-container">
          <t-card title="本年度最受欢迎的书籍（Top 10）" header-bordered :style="{ width: '1200px' }">
            <t-table
              row-key="id"
              :data="rank3Data"
              :columns="rank3Column"
              :hover="true"
              :show-header="true"
            />
          </t-card>
        </div>
      </t-tab-panel>
      <t-tab-panel v-for="library in libraries" :key="library.id" :value="library.id" :label="library.name">
        <div class="library-location">
          <t-tag size="large">
            地址：{{ library.location }}
          </t-tag>
        </div>
        <div class="card-container">
          <t-card class="rank-list-card" title="读者借阅排行榜（Top 10）" header-bordered :style="{ width: '800px' }">
            <t-table
              row-key="id"
              :data="rank1Map.get(library.id)"
              :columns="rank1Column"
              :hover="true"
              :show-header="true"
            />
          </t-card>
          <t-card class="rank-list-card" title="书籍借阅排行榜（Top 10）" header-bordered :style="{ width: '800px' }">
            <t-table
              row-key="id"
              :data="rank2Map.get(library.id)"
              :columns="rank2Column"
              :hover="true"
              :show-header="true"
            />
          </t-card>
        </div>
      </t-tab-panel>
    </t-tabs>
  </div>
</template>

<style lang="scss" scoped>
.branch-admin-container {
  width: 100%;
  height: 100%;

  .library-location {
    margin: 20px 0 0 20px;
  }

  .card-container {
    // height: 1000px;
    // background-color: black;
    margin-top: 20px;
    display: flex;
    flex: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: flex-start;

    .rank-list-card {
      margin-bottom: 20px;
    }
  }
}
</style>
