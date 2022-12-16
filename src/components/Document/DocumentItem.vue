<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import AppCard from '../AppCard.vue'
import JournalCard from './JournalCard.vue'
import ConferenceCard from './ConferenceCard.vue'
import BookCard from './BookCard.vue'
import type { DocumentModel } from '@/api/model/DocumentModel'

export interface ArrearageObj {
  require: boolean
  amount: number
}

export default defineComponent({
  props: {
    document: {
      type: Object as PropType<DocumentModel>,
      required: true,
    },
    borrow: {
      type: Boolean,
      required: false,
      default: true,
    },
    returnBook: {
      type: Boolean,
      required: false,
      default: true,
    },
    reserve: {
      type: Boolean,
      required: false,
      default: true,
    },
    addCopy: {
      type: Boolean,
      required: false,
      default: false,
    },
    arrearage: {
      type: Object as PropType<ArrearageObj>,
      required: false,
      default: () => {
        return {
          require: false,
          amount: 0.0,
        }
      },
    },
  },
  setup(props) {
  },
})
</script>

<template>
  <AppCard radius="medium" class="document-item-container document-item">
    <t-row>
      <t-col class="document-slot" :xs="12" :sm="10">
        <BookCard v-if="document.type === 'Book'" :document="document" />
        <JournalCard v-else-if="document.type === 'Journal'" :document="document" />
        <ConferenceCard v-else :document="document" />
      </t-col>
      <t-col :xs="12" :sm="2" class="operation-col">
        <div class="operation-container">
          <button v-if="borrow">
            借阅
          </button>
          <button v-if="returnBook">
            归还
          </button>
          <button v-if="reserve">
            预约
          </button>
          <button v-if="addCopy">
            增加
          </button>
        </div>
        <p v-if="arrearage.require" class="arrearage">
          欠费：&nbsp;&#x00A5;&nbsp;{{ arrearage.amount }}
        </p>
      </t-col>
    </t-row>
  </AppCard>
</template>

<style lang="scss" scoped>
.document-item-container {
  overflow: hidden;
  // box-shadow: 0 1px 20px -6px rgba(0, 0, 0, .5);
  height: 224px;
  border: 1px solid var(--td-component-border);

  >.t-row {
    height: 100%;

    .document-slot .t-row {
      height: 100%;
    }

    >.t-col {
      height: 100%;
    }
  }

  :deep(.operation-col) {
    background-color: #f9f9f9;
    padding: 8px 16px !important;
    border-left: 1px solid var(--td-gray-color-3);
  }

  :deep(.operation-container) {
    >* {
      margin: 4px 0;
    }

    button {
      width: 100%;
      margin: 10px auto;
      display: block;
      padding: 8px 12px;
      border-radius: var(--td-radius-default);
      color: var(--td-text-color-placeholder);
      background-color: var(--td-gray-color-2);
      font-size: var(--td-font-size-link-small);
      text-align: center;

      &:hover {
        background-color: var(--td-gray-color-3);
        color: var(--td-text-color-secondary);
      }
    }
  }

  .arrearage {
    font-size: var(--td-font-size-mark-small);
    color: var(--td-error-color-7);
    margin-top: 20px;
    padding-left: 4px;
  }
}
</style>
