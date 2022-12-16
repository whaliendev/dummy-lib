<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import SearchBox from '@/components/SearchBox.vue'
import FeatureList from '@/components/FeatureList/FeatureList.vue'
import DocumentList from '@/components/Document/DocumentList.vue'
import LoadMoreHint from '@/components/LoadMoreHint.vue'
import type { DocumentModel } from '@/api/model/DocumentModel'
import type { LoadWhatEnum } from '@/components/LoadMoreHint.vue'

const documentList: Array<DocumentModel> = reactive([
  {
    id: 190,
    title: 'International Conference on Software Engineering of 2022',
    publisher: '9',
    pubDate: '2022-12-14T11:17:08',
    type: 'ConferenceProceeding',
  },
  {
    id: 196,
    title: 'IEEE Transactions on Software Engineering',
    publisher: '195',
    pubDate: '2022-12-14T11:23:43',
    type: 'Journal',
  },
  {
    id: 304,
    title: 'Modern Software Engineering',
    publisher: '303',
    pubDate: '2022-12-14T10:12:16',
    type: 'Book',
  },
  {
    id: 309,
    title: 'Agile Software Development',
    publisher: '308',
    pubDate: '2022-12-14T10:12:16',
    type: 'Book',
  },
  {
    id: 313,
    title: 'Friendly Guide to Software Development',
    publisher: '312',
    pubDate: '2022-12-14T10:12:16',
    type: 'Book',
  },
  {
    id: 318,
    title: 'Fundamentals of Software Architecture',
    publisher: '317',
    pubDate: '2020-02-11T00:00:00',
    type: 'Book',
  },
  {
    id: 322,
    title: 'Beginning Software Engineering',
    publisher: '321',
    pubDate: '2022-12-14T10:12:16',
    type: 'Book',
  },
  {
    id: 326,
    title: 'Righting Software',
    publisher: '325',
    pubDate: '2022-12-14T10:12:16',
    type: 'Book',
  },
  {
    id: 332,
    title: 'Java Software Solutions',
    publisher: '331',
    pubDate: '2017-02-20T00:00:00',
    type: 'Book',
  },
  {
    id: 370,
    title: 'Software Engineering at Google',
    publisher: '369',
    pubDate: '2020-03-17T00:00:00',
    type: 'Book',
  },
])
const showSearchResults = computed(() => {
  return documentList.length > 0
})

const showWhat = ref<LoadWhatEnum>('no')
</script>

<template>
  <div class="ribbon-container">
    <SearchBox />
    <FeatureList />
  </div>
  <div v-show="showSearchResults" class="search-results">
    <DocumentList :document-list="documentList" />
    <LoadMoreHint :show-what="showWhat" />
  </div>
</template>

<style lang="scss" scoped>
.ribbon-container {
  position: relative;
  height: calc(100vh - var(--w-header-height));
  background-image: url('@/assets/whu-bg.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  :deep(.searchbox) {
    width: 60%;
    // width: 600px;
    position: absolute;
    left: 50%;
    top: 20%;
    // margin-left: auto;
    // margin-right: auto;
    transform: translateX(-50%);
  }

  :deep(.featurelist) {
    width: 60%;
    // width: 600px;
    // margin-left: auto;
    // margin-right: auto;
    position: absolute;
    left: 50%;
    top: 32%;
    transform: translateX(-50%);
  }
}

.search-results {
  margin: 30px 0;

  :deep(.document-list) {
    margin: 0 auto;
  }
}
</style>
