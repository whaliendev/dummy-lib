<script lang="ts" setup>
import type { PropType } from 'vue'
import { reactive } from 'vue'
import journalCoverUrl from '@/assets/journal-cover.jpeg'
import type { DocumentModel, JournalModel } from '@/api/model/DocumentModel'

const props = defineProps({
  document: {
    type: Object as PropType<DocumentModel>,
    required: true,
  },
})

const journal: JournalModel = reactive({
  id: props.document.id,
  title: props.document.title,
  publisher: null,
  pubDate: 'FIX this',
  editors: null,
})
</script>

<template>
  <t-row class="journal-card journal-card-container">
    <t-col class="journal-cover-container" :xs="12" :sm="4">
      <t-image :src="journalCoverUrl" alt="default journal cover" fit="cover" position="top" />
    </t-col>
    <t-col class="journal-desc-container" :xs="12" :sm="8">
      <p class="title">
        {{ journal.title }}
      </p>
    </t-col>
  </t-row>
</template>

<style lang="scss" scoped>
.journal-card-container {
  background-color: #f9f9f9;

  >.t-col {
    height: 100%;
  }

  .journal-desc-container {
    background-color: inherit;
    flex-shrink: 1;
    padding: 12px 14px !important;

    .title {
      font-size: var(--td-font-size-title-medium);
      color: var(--td-text-color-primary);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .journal-cover-container {
    >* {
      height: 100%;
    }
  }
}
</style>
