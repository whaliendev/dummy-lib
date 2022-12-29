<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, ref } from 'vue'
import { parseISO } from 'date-fns'
import { MessagePlugin } from 'tdesign-vue-next'
import type { DocumentMetaModel } from '@/api/model/DocumentModel'
import type { AuthorInfo, PublisherInfo } from '@/api/open-library'
import { getBookData } from '@/api/open-library'
import bookCoverUrl from '@/assets/default-book-cover.jpg'
import { getDocumentDetail } from '@/api/document'
import { formatDate, getTimestamp } from '@/utils/time'

interface BookVOModel {
  id: number
  title: string
  publicationDate: string
  authors?: Array<AuthorInfo>
  pages?: number
  publishers?: Array<PublisherInfo>
  cover?: string
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
const book = ref<BookVOModel>({
  id: props.document.id,
  title: props.document.title,
  publicationDate: formatDate(getTimestamp(parseISO(props.document.publicationDate)), 'yyyy-MM-dd'),
})

const fetchData = async () => {
  const docDetail = await getDocumentDetail(props.document.id)
  if (docDetail) {
    const isbn = docDetail.documentContent.bookVo!.isbn
    const bookResult = await getBookData(isbn)
    if (bookResult.status !== '00000') {
      // failed to load bookResult
    }
    else {
      book.value = {
        ...book.value,
        ...{
          publishers: Array.isArray(bookResult.data.publishers) ? bookResult.data.publishers : [bookResult.data.publishers],
          authors: Array.isArray(bookResult.data.authors) ? bookResult.data.authors : [bookResult.data.authors],
          pages: bookResult.data.number_of_pages,
          cover: bookResult.data.cover?.medium?.replace('https://covers.openlibrary.org/b/id/', 'http://43.156.250.168:3000/api/book/cover/'),
        },
      }
    }
  }
  else {
    MessagePlugin.error('获取图书信息失败')
  }
}
fetchData()

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
  <t-row class="book-card book-card-container">
    <t-col class="book-cover-container" :xs="12" :sm="4">
      <t-image :src="book.cover" :alt="`book cover of ${document.title}`" fit="cover" lazy position="top">
        <template #error>
          <t-image :src="bookCoverUrl" fit="cover" lazy position="top" alt="default book cover" />
        </template>
      </t-image>
    </t-col>
    <t-col class="book-desc-container" :xs="12" :sm="8">
      <p class="title">
        {{ book!.title }}
      </p>
      <div class="status-block">
        <AppTag content="书籍" color="#709837" />
        <AppTag :content="props.docStatus" :theme="bookStatusTheme" />
      </div>
      <div class="info-block">
        <ul class="authors">
          作者：
          <t-link v-for="author in book.authors" :key="author.name" theme="default" :href="author.url" underline>
            {{ `${author.name},` }}&nbsp;&nbsp;
          </t-link>
        </ul>
        <ul class="publishers">
          出版社：
          <span v-for="publisher in book.publishers" :key="publisher.name" theme="default">
            {{ publisher.name }}
          </span>
        </ul>
        <p class="publication-date">
          出版日期： {{ book.publicationDate }}
        </p>
        <p v-if="book.pages" class="page-num">
          页数： {{ book.pages }}
        </p>
      </div>
    </t-col>
  </t-row>
</template>

<style lang="scss" scoped>
.book-card-container {
  background-color: #f9f9f9;

  >.t-col {
    height: 100%;
  }

  .book-desc-container {
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

      .authors {
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

  :deep(.book-cover-container > *) {
    height: 100%;
  }

  .book-cover-container {
    :deep(.t-image__wrapper) {
      height: 100%;
    }
  }
}
</style>
