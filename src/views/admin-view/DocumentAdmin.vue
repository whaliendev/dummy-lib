<script lang="ts" setup>
import { ref } from 'vue'
import type { DocumentMetaModel } from '@/api/model/DocumentModel'
import DocumentItem from '@/components/Document/DocumentItem.vue'
import { documentAdmin } from '@/mock/admin-view/DocumentAdmin'
const pageSize = ref(10)
const borrowedNum = ref(93)
const documentList = ref<Array<DocumentMetaModel>>(documentAdmin)

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
  <div classs="document-admin document-admin-container">
    <div class="admin-list admin-list-container">
      <DocumentItem
        v-for="document in documentList" :key="document.id" :document="document" op :return-book="true"
        :reserve="false" :borrow="false" :arrearage="{
          require: true,
          amount: arrearageAmount,
        }"
      />
    </div>
    <t-pagination
      v-model:pageSize="pageSize" :total="borrowedNum" size="small" @page-size-change="onPageSizeChange"
      @current-change="onCurrentChange"
    />
  </div>
</template>

<style lang="scss" scoped>
.admin-list-container {
  width: 90%;
  margin: auto;
  display: block;
}

.document-item {
  margin: 20px 0;
  box-shadow: var(--td-shadow-2);
}
</style>
