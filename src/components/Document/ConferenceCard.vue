<script lang="ts" setup>
import type { PropType } from 'vue'
import { reactive } from 'vue'
import type { ConferenceModel, DocumentModel } from '@/api/model/DocumentModel'
import conferenceCoverUrl from '@/assets/conference-cover.jpg'
const props = defineProps({
  document: {
    type: Object as PropType<DocumentModel>,
    required: true,
  },
})

const conference: ConferenceModel = reactive({
  id: props.document.id,
  title: props.document.title,
  publisher: null,
  pubDate: 'FIX this',
  location: null,
  editors: null,
})
</script>

<template>
  <t-row class="conference-card conference-card-container">
    <t-col class="conference-cover-container" :xs="12" :sm="4">
      <t-image :src="conferenceCoverUrl" alt="default conference cover" fit="cover" position="top" />
    </t-col>
    <t-col class="conference-desc-container" :xs="12" :sm="8">
      <p class="title" :title="conference.title">
        {{ conference.title }}
      </p>
    </t-col>
  </t-row>
</template>

<style lang="scss" scoped>
.conference-card-container {
  background-color: #f9f9f9;

  >.t-col {
    height: 100%;
  }

  .conference-desc-container {
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

  .conference-cover-container {
    >* {
      height: 100%;
    }
  }
}
</style>
