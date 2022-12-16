<script lang="ts" setup>
import DocumentItem from './DocumentItem.vue'
import type { DocumentModel } from '@/api/model/DocumentModel'
const props = defineProps({
  documentList: {
    type: Array<DocumentModel>,
    required: false,
    default: [],
  },
})
</script>

<template>
  <div class="document-list document-list-container">
    <DocumentItem v-for="document in documentList" :key="document.id" :document="document" />
  </div>
</template>

<style lang="scss" scoped>
.document-list-container {
  width: 72%;
  background-color: #f1f1f1;
  padding: 1px 36px;
  border-radius: var(--td-radius-medium);
}

.document-item {
  margin: 30px 0;
}
</style>
