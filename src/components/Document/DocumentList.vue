<script lang="ts" setup>
import DocumentItem from './DocumentItem.vue'
import type { DocumentMetaModel } from '@/api/model/DocumentModel'
const props = defineProps({
  documentList: {
    type: Array<DocumentMetaModel>,
    required: false,
    default: [],
  },
})
</script>

<template>
  <div class="document-list document-list-container">
    <DocumentItem
      v-for="document in documentList" :key="document.id" :document="document" :op="true" :borrow="true"
      :reserve="true"
    />
  </div>
</template>

<style lang="scss" scoped>
.document-list-container {
  width: 64%;
  background-color: #f1f1f1;
  padding: 1px 28px;
  border-radius: var(--td-radius-medium);
}

.document-item {
  margin: 20px 0;
}
</style>
