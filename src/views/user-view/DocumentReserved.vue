<script lang="ts" setup>
import { ref } from 'vue'
import type { DocumentMetaModel } from '@/api/model/DocumentModel'
import DocumentItem from '@/components/Document/DocumentItem.vue'
import { documentReserved } from '@/mock/user-view/document'
const pageSize = ref(10)
const borrowedNum = ref(23)
const documentList = ref<Array<DocumentMetaModel>>(documentReserved)

const onPageSizeChange = () => {

}

const onCurrentChange = () => {

}

const arrearageAmount = (() => {
  const dice = (Math.random() * 6 + 1) / 1
  if (dice === 1)
    return (Math.random() * 6 + 1).toFixed(2)
  else
    return Number(0).toFixed(2)
})()
</script>

<template>
  <div classs="document-reserved document-reserved-container">
    <div class="reserve-list reserve-list-container">
      <DocumentItem
        v-for="document in documentList" :key="document.id" :document="document" op
        :borrow="false" :return-book="false" :reserve="false" :add-copy="true"
      />
    </div>
    <t-pagination
      v-model:pageSize="pageSize" :total="borrowedNum" size="small" @page-size-change="onPageSizeChange"
      @current-change="onCurrentChange"
    />
  </div>
</template>

<style lang="scss" scoped>
.reserve-list-container {
  width: 90%;
  margin: auto;
  display: block;
}

.document-item {
  margin: 20px 0;
  box-shadow: var(--td-shadow-2);
}
</style>
