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

import { defineComponent } from 'vue'
import type { LibraryModel } from '@/api/model/LibraryModel'
import type { Top10ReaderAndDocumentNumsInBranchesModel } from '@/api/model/Top10ReaderAndDocumentNumsInBranchesModel'
import type { Top10DocumentsInBranchesModel } from '@/api/model/Top10DocumentsInBranchesModel'
import type { Top10DocumentsInYearModel } from '@/api/model/Top10DocumentsInYearModel'
import type { DocumentApiModel } from '@/api/model/DocumentApiModel'
import type { ReaderResult } from '@/api/model/ReaderModel'

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

      rank1List: [
        {
          library: {
            id: 16,
            location: 'OSSU工学校区',
            name: 'OSSU工学分馆',
          },
          topReaderList: [
            {
              borrowedDocumentCounts: 10,
              reader: {
                id: 890,
                cost: 123,
                address: '工九',
                name: '杨枫',
                phoneNumber: '15549536131',
                password: 'null',
                type: 'student',
                cardNumber: '20220019',
              },
            },
            {
              borrowedDocumentCounts: 10,
              reader: {
                id: 890,
                cost: 123,
                address: '工九',
                name: '杨枫',
                phoneNumber: '15549536131',
                password: 'null',
                type: 'student',
                cardNumber: '20220019',
              },
            },
            {
              borrowedDocumentCounts: 10,
              reader: {
                id: 890,
                cost: 123,
                address: '工九',
                name: '杨枫',
                phoneNumber: '15549536131',
                password: 'null',
                type: 'student',
                cardNumber: '20220019',
              },
            },
            {
              borrowedDocumentCounts: 10,
              reader: {
                id: 890,
                cost: 123,
                address: '工九',
                name: '杨枫',
                phoneNumber: '15549536131',
                password: 'null',
                type: 'student',
                cardNumber: '20220019',
              },
            },
            {
              borrowedDocumentCounts: 10,
              reader: {
                id: 890,
                cost: 123,
                address: '工九',
                name: '杨枫',
                phoneNumber: '15549536131',
                password: 'null',
                type: 'student',
                cardNumber: '20220019',
              },
            },
            {
              borrowedDocumentCounts: 10,
              reader: {
                id: 890,
                cost: 123,
                address: '工九',
                name: '杨枫',
                phoneNumber: '15549536131',
                password: 'null',
                type: 'student',
                cardNumber: '20220019',
              },
            },
            {
              borrowedDocumentCounts: 10,
              reader: {
                id: 890,
                cost: 123,
                address: '工九',
                name: '杨枫',
                phoneNumber: '15549536131',
                password: 'null',
                type: 'student',
                cardNumber: '20220019',
              },
            },
            {
              borrowedDocumentCounts: 10,
              reader: {
                id: 890,
                cost: 123,
                address: '工九',
                name: '杨枫',
                phoneNumber: '15549536131',
                password: 'null',
                type: 'student',
                cardNumber: '20220019',
              },
            },
            {
              borrowedDocumentCounts: 10,
              reader: {
                id: 890,
                cost: 123,
                address: '工九',
                name: '杨枫',
                phoneNumber: '15549536131',
                password: 'null',
                type: 'student',
                cardNumber: '20220019',
              },
            },
            {
              borrowedDocumentCounts: 10,
              reader: {
                id: 890,
                cost: 123,
                address: '工九',
                name: '杨枫',
                phoneNumber: '15549536131',
                password: 'null',
                type: 'student',
                cardNumber: '20220019',
              },
            },
          ],
        },
        {
          library: {
            id: 17,
            location: 'OSSU文理校区',
            name: 'OSSU图书馆总馆',
          },
          topReaderList: [],
        },
        {
          library: {
            id: 18,
            location: 'OSSU医学校区',
            name: 'OSSU图书馆医学分馆',
          },
          topReaderList: [],
        },
        {
          library: {
            id: 19,
            location: 'OSSU信息校区',
            name: 'OSSU图书馆信息学分馆',
          },
          topReaderList: [],
        },
      ] as Array<Top10ReaderAndDocumentNumsInBranchesModel>,

      rank2List: [
        {
          library: {
            id: 16,
            location: 'OSSU工学校区',
            name: 'OSSU工学分馆',
          },
          topDocuments: [
            {
              id: 623,
              title: 'Essentials of Software Engineering',
              publisherId: 622,
              publicationDate: '2022-12-14T10:12:16',
              type: 'Book',
            },
            {
              id: 623,
              title: 'Essentials of Software Engineering',
              publisherId: 622,
              publicationDate: '2022-12-14T10:12:16',
              type: 'Book',
            },
            {
              id: 623,
              title: 'Essentials of Software Engineering',
              publisherId: 622,
              publicationDate: '2022-12-14T10:12:16',
              type: 'Book',
            },
            {
              id: 623,
              title: 'Essentials of Software Engineering',
              publisherId: 622,
              publicationDate: '2022-12-14T10:12:16',
              type: 'Book',
            },
            {
              id: 623,
              title: 'Essentials of Software Engineering',
              publisherId: 622,
              publicationDate: '2022-12-14T10:12:16',
              type: 'Book',
            },
            {
              id: 623,
              title: 'Essentials of Software Engineering',
              publisherId: 622,
              publicationDate: '2022-12-14T10:12:16',
              type: 'Book',
            },
            {
              id: 623,
              title: 'Essentials of Software Engineering',
              publisherId: 622,
              publicationDate: '2022-12-14T10:12:16',
              type: 'Book',
            },
            {
              id: 623,
              title: 'Essentials of Software Engineering',
              publisherId: 622,
              publicationDate: '2022-12-14T10:12:16',
              type: 'Book',
            },
            {
              id: 623,
              title: 'Essentials of Software Engineering',
              publisherId: 622,
              publicationDate: '2022-12-14T10:12:16',
              type: 'Book',
            },
            {
              id: 623,
              title: 'Essentials of Software Engineering',
              publisherId: 622,
              publicationDate: '2022-12-14T10:12:16',
              type: 'Book',
            },
          ],
          borrowedCounts: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
        },
        {
          library: {
            id: 17,
            location: 'OSSU文理校区',
            name: 'OSSU图书馆总馆',
          },
          topDocuments: [],
          borrowedCounts: [],
        },
        {
          library: {
            id: 18,
            location: 'OSSU医学校区',
            name: 'OSSU图书馆医学分馆',
          },
          topDocuments: [],
          borrowedCounts: [],
        },
        {
          library: {
            id: 19,
            location: 'OSSU信息校区',
            name: 'OSSU图书馆信息学分馆',
          },
          topDocuments: [],
          borrowedCounts: [],
        },
      ] as Array<Top10DocumentsInBranchesModel>,

      rank3List: [
        {
          borrowedNums: 10,
          document: {
            id: 623,
            title: 'Essentials of Software Engineering',
            publisherId: 622,
            publicationDate: '2022-12-14T10:12:16',
            type: 'Book',
          },
        },
        {
          borrowedNums: 10,
          document: {
            id: 623,
            title: 'Essentials of Software Engineering',
            publisherId: 622,
            publicationDate: '2022-12-14T10:12:16',
            type: 'Book',
          },
        },
        {
          borrowedNums: 10,
          document: {
            id: 623,
            title: 'Essentials of Software Engineering',
            publisherId: 622,
            publicationDate: '2022-12-14T10:12:16',
            type: 'Book',
          },
        },
        {
          borrowedNums: 10,
          document: {
            id: 623,
            title: 'Essentials of Software Engineering',
            publisherId: 622,
            publicationDate: '2022-12-14T10:12:16',
            type: 'Book',
          },
        },
        {
          borrowedNums: 10,
          document: {
            id: 623,
            title: 'Essentials of Software Engineering',
            publisherId: 622,
            publicationDate: '2022-12-14T10:12:16',
            type: 'Book',
          },
        },
        {
          borrowedNums: 10,
          document: {
            id: 623,
            title: 'Essentials of Software Engineering',
            publisherId: 622,
            publicationDate: '2022-12-14T10:12:16',
            type: 'Book',
          },
        },
        {
          borrowedNums: 10,
          document: {
            id: 623,
            title: 'Essentials of Software Engineering',
            publisherId: 622,
            publicationDate: '2022-12-14T10:12:16',
            type: 'Book',
          },
        },
        {
          borrowedNums: 10,
          document: {
            id: 623,
            title: 'Essentials of Software Engineering',
            publisherId: 622,
            publicationDate: '2022-12-14T10:12:16',
            type: 'Book',
          },
        },
        {
          borrowedNums: 10,
          document: {
            id: 623,
            title: 'Essentials of Software Engineering',
            publisherId: 622,
            publicationDate: '2022-12-14T10:12:16',
            type: 'Book',
          },
        },
        {
          borrowedNums: 10,
          document: {
            id: 623,
            title: 'Essentials of Software Engineering',
            publisherId: 622,
            publicationDate: '2022-12-14T10:12:16',
            type: 'Book',
          },
        },
      ] as Array<Top10DocumentsInYearModel>,

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

    }
  },
  mounted() {
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
  methods: {

  },
})
</script>

<template>
  <div class="branch-admin-container">
    <t-tabs :default-value="1">
      <t-tab-panel :value="1" label="图书馆总览">
        <div class="t-tab-panel-container">
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
        <div class="t-tab-panel-container">
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

  .t-tab-panel-container {
    height: 1000px;
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
