<script lang="ts">
import type { PropType } from 'vue'
import { computed, defineComponent, ref } from 'vue'
import AppCard from '../AppCard.vue'
import ReserveDialog from '../Dialog/ReserveDialog.vue'
import JournalCard from './JournalCard.vue'
import ConferenceCard from './ConferenceCard.vue'
import BookCard from './BookCard.vue'
import type { DocumentMetaModel } from '@/api/model/DocumentModel'

export interface ArrearageObj {
  require: boolean
  amount: string
}

export default defineComponent({
  props: {
    document: {
      type: Object as PropType<DocumentMetaModel>,
      required: true,
    },
    op: {
      type: Boolean,
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
      default: false,
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
          amount: '0.00',
        }
      },
    },
  },
  setup(props) {
    const xs = computed(() => {
      if (props.op) {
        return {
          doc: 12,
          op: 12,
        }
      }
      else {
        return {
          doc: 12,
          op: 0,
        }
      }
    })
    const sm = computed(() => {
      if (props.op) {
        return {
          doc: 10,
          op: 2,
        }
      }
      else {
        return {
          doc: 12,
          op: 0,
        }
      }
    })
    const getBookStatus = () => {
      const dice = (Math.random() * 6 + 1) / 1 // [1, 7) / 1
      if (dice === 1)
        return '借空'
      else if (dice >= 2 && dice <= 3)
        return '部分外借'
      else
        return '在架上'
    }

    const reserveDialogVisible = ref<boolean>(false)
    const handleReserveClicked = () => {
      reserveDialogVisible.value = true
    }
    const handleReserveDialogClose = () => {
      reserveDialogVisible.value = false
    }

    const borrowDialogVisible = ref<boolean>(false)
    const handleBorrowDialogClose = () => {
      borrowDialogVisible.value = false
    }
    const handleBorrowClicked = () => {
      borrowDialogVisible.value = true
    }

    const returnDialogVisible = ref<boolean>(false)
    const handleReturnDialogClose = () => {
      returnDialogVisible.value = false
    }
    const handleReturnClicked = () => {
      returnDialogVisible.value = true
    }

    const addDialogVisible = ref<boolean>(false)
    const handleAddCopyDialogClose = () => {
      addDialogVisible.value = false
    }
    const handleAddCopyClicked = () => {
      addDialogVisible.value = true
    }
    return {
      xs,
      sm,
      getBookStatus,
      reserveDialogVisible,
      handleReserveClicked,
      documentId: props.document.id,
      documentTitle: props.document.title,
      handleReserveDialogClose,
      borrowDialogVisible,
      handleBorrowDialogClose,
      handleBorrowClicked,
      returnDialogVisible,
      handleReturnDialogClose,
      handleReturnClicked,
      addDialogVisible,
      handleAddCopyDialogClose,
      handleAddCopyClicked,
    }
  },
})
</script>

<template>
  <AppCard radius="medium" class="document-item-container document-item doc-list-show">
    <ReserveDialog
      :visible="reserveDialogVisible" :title="documentTitle" :document-id="documentId"
      @close="handleReserveDialogClose"
    />
    <BorrowDialog
      :visible="borrowDialogVisible" :title="documentTitle" :document-id="documentId"
      @close="handleBorrowDialogClose"
    />
    <ReturnDialog
      :visible="returnDialogVisible" :title="documentTitle" :document-id="documentId"
      @close="handleReturnDialogClose"
    />
    <AddCopyDialog
      :visible="addDialogVisible" :title="documentTitle" :document-id="documentId"
      @close="handleAddCopyDialogClose"
    />
    <t-row>
      <t-col class="document-slot" :xs="xs.doc" :sm="sm.doc">
        <BookCard v-if="document.type === 'Book'" :document="document" :doc-status="getBookStatus()" />
        <JournalCard v-else-if="document.type === 'Journal'" :document="document" :doc-status="getBookStatus()" />
        <ConferenceCard v-else :document="document" :doc-status="getBookStatus()" />
      </t-col>
      <t-col v-show="op" :xs="xs.op" :sm="sm.op" class="operation-col">
        <div class="operation-container">
          <button v-if="borrow" @click="handleBorrowClicked">
            借阅
          </button>
          <button v-if="returnBook" @click="handleReturnClicked">
            归还
          </button>
          <button v-if="reserve" @click="handleReserveClicked">
            预约
          </button>
          <button v-if="addCopy" @click="handleAddCopyClicked">
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
  height: 200px;
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
    margin-top: 10px;
    padding-left: 4px;
  }
}

.doc-list-show {
  animation: doc-list-show .5s;
  opacity: 1;
}
</style>
