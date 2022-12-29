<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, ref } from 'vue'
import { parseISO } from 'date-fns'
import { MessagePlugin } from 'tdesign-vue-next'
import journalCoverUrl from '@/assets/journal-cover.jpeg'
import type { DocumentMetaModel } from '@/api/model/DocumentModel'
import type { PublisherModel } from '@/api/model/Publisher'
import { formatDate, getTimestamp } from '@/utils/time'
import { getDocumentDetail } from '@/api/document'

interface JournalVOModel {
  id: number
  title: string
  publicationDate: string
  publishers?: Array<PublisherModel>
  scope?: string
  editors?: string
}

const props = defineProps({
  document: {
    type: Object as PropType<DocumentMetaModel>,
    required: true,
  },
  docStatus: {
    type: String,
    required: true,
    validator(value: string) {
      return ['借空', '部分外借', '在架上'].includes(value)
    },
  },
})

const journal = ref<JournalVOModel>({
  id: props.document.id,
  title: props.document.title,
  publicationDate: formatDate(getTimestamp(parseISO(props.document.publicationDate)), 'yyyy-MM-dd'),
})

const fetchDate = (async () => {
  const docDetail = await getDocumentDetail(props.document.id)
  if (docDetail) {
    journal.value = {
      ...journal.value,
      ...{
        publishers: Array.isArray(docDetail.publisher) ? docDetail.publisher : [docDetail.publisher],
        scope: docDetail.documentContent.journalVo?.scope,
        editors: docDetail.documentContent.journalVo?.editor,
      },
    }
  }
  else {
    MessagePlugin.error('获取Journal详细信息失败')
  }
})()

const bookStatusTheme = computed(() => {
  if (props.docStatus === '借空')
    return 'error'
  else if (props.docStatus === '部分外借')
    return 'warn'
  else
    return 'success'
})
</script>

<template>
  <t-row class="journal-card journal-card-container">
    <t-col class="journal-cover-container" :xs="12" :sm="4">
      <t-image :src="journalCoverUrl" alt="default journal cover" fit="cover" position="top" />
    </t-col>
    <t-col class="journal-desc-container" :xs="12" :sm="8">
      <p class="title" :title="journal.title">
        {{ journal!.title }}
      </p>
      <div class="status-block">
        <AppTag content="期刊" color="#1853a1" />
        <AppTag :content="props.docStatus" :theme="bookStatusTheme" />
      </div>
      <div class="info-block">
        <p class="scope">
          领域： {{ journal.scope }}
        </p>
        <p class="editors">
          编辑： {{ journal.editors }}
        </p>
        <ul class="publishers">
          出版社：
          <span v-for="publisher in journal.publishers" :key="publisher.name" theme="default" :title="publisher.info">
            {{ publisher.name }}
          </span>
        </ul>
        <p class="publication-date">
          出版日期： {{ journal.publicationDate }}
        </p>
      </div>
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

    &>div {
      margin-bottom: 10px;
    }

    .status-block {
      margin-top: 10px;

      >span {
        margin-right: 6px;
      }
    }

    .info-block {
      color: var(--td-gray-color-8);

      .editors {
        color: inherit;

        >a {
          color: inherit;
        }
      }

      .publishers {
        color: inherit;

        >span {
          color: inherit;
        }
      }

      .scope {
        color: inherit;
      }

      &>* {
        margin-bottom: 6px;
      }
    }
  }

  .journal-cover-container {
    >* {
      height: 100%;
    }
  }
}
</style>
