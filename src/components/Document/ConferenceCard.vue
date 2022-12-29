<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, reactive, ref } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { parseISO } from 'date-fns'
import type { DocumentMetaModel } from '@/api/model/DocumentModel'
import conferenceCoverUrl from '@/assets/conference-cover.jpg'
import type { PublisherModel } from '@/api/model/Publisher'
import { getDocumentDetail } from '@/api/document'
import { formatDate, getTimestamp } from '@/utils/time'

interface ConferenceVOModel {
  id: number
  title: string
  publicationDate: string
  publishers?: Array<PublisherModel>
  date?: string
  editors?: string
  location?: string
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

const conference = ref<ConferenceVOModel>({
  id: props.document.id,
  title: props.document.title,
  publicationDate: formatDate(getTimestamp(parseISO(props.document.publicationDate)), 'yyyy-MM-dd'),
})

const fetchData = (async () => {
  const docDetails = await getDocumentDetail(props.document.id)
  if (docDetails) {
    conference.value = {
      ...conference.value,
      ...{
        publishers: Array.isArray(docDetails.publisher) ? docDetails.publisher : [docDetails.publisher],
        date: formatDate(getTimestamp(parseISO(docDetails.documentContent.conferenceProceedingVo?.date || '2000-01-01')), 'yyyy-MM-dd'),
        editors: docDetails.documentContent.conferenceProceedingVo?.editor,
        location: docDetails.documentContent.conferenceProceedingVo?.location,
      },
    }
  }
  else {
    MessagePlugin.error('请求会议论文集详情失败')
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
  <t-row class="conference-card conference-card-container">
    <t-col class="conference-cover-container" :xs="12" :sm="4">
      <t-image :src="conferenceCoverUrl" alt="default conference cover" fit="cover" position="top" />
    </t-col>
    <t-col class="conference-desc-container" :xs="12" :sm="8">
      <p class="title" :title="conference.title">
        {{ conference!.title }}
      </p>
      <div class="status-block">
        <AppTag content="会议论文集" color="#672773" />
        <AppTag :content="props.docStatus" :theme="bookStatusTheme" />
      </div>
      <div class="info-block">
        <p class="editors">
          编辑： {{ conference.editors }}
        </p>
        <p class="date">
          会议时间： {{ conference.date }}
        </p>
        <p class="location">
          会议地点： {{ conference.location }}
        </p>
        <ul class="publishers">
          出版社：
          <span
            v-for="publisher in conference.publishers" :key="publisher.name" theme="default"
            :title="publisher.info"
          >
            {{ publisher.name }}
          </span>
        </ul>
        <p class="publication-date">
          出版日期： {{ conference.publicationDate }}
        </p>
      </div>
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

      &>* {
        margin-bottom: 6px;
      }
    }
  }

  .conference-cover-container {
    >* {
      height: 100%;
    }
  }
}
</style>
