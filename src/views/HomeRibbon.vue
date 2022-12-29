<script lang="ts" setup>
import { computed, nextTick, reactive, ref, watch } from 'vue'
import SearchBox from '@/components/SearchBox.vue'
import FeatureList from '@/components/FeatureList/FeatureList.vue'
import DocumentList from '@/components/Document/DocumentList.vue'
import LoadMoreHint from '@/components/LoadMoreHint.vue'
import type { DocumentMetaModel } from '@/api/model/DocumentModel'
import type { LoadWhatEnum } from '@/components/LoadMoreHint.vue'
import { useDocumentStore } from '@/store/modules/document'

const documentStore = useDocumentStore()

const documentList = ref<Array<DocumentMetaModel>>()
watch(() => documentStore.home.docList, (newVal, oldVal) => {
  documentList.value = newVal.slice(0, 10)
})
const showSearchResults = computed(() => {
  return (documentList.value?.length || 0) > 0
})

watch(() => showSearchResults.value, (newVal, oldVal) => {
  if (newVal) {
    nextTick(() => {
      const searchResults = document.getElementById('search-results')
      searchResults?.scrollIntoView({
        behavior: 'smooth',
      })
    })
  }
})

const showWhat = ref<LoadWhatEnum>('no')
watch(() => documentList.value, (newVal, oldVal) => {
  if ((documentList.value?.length || 0) < documentStore.home.docList.length)
    showWhat.value = 'btn'
  else
    showWhat.value = 'nomore'
})

const handleLoadMore = () => {
  showWhat.value = 'gif'
  documentList.value = [...documentList.value as Array<DocumentMetaModel>, ...documentStore.home.docList.slice((documentList.value?.length || 0), (documentList.value?.length || 0) + 10)]
}
</script>

<template>
  <div class="ribbon-container">
    <SearchBox />
    <FeatureList />
  </div>
  <div v-show="showSearchResults" id="search-results" class="search-results">
    <DocumentList :document-list="documentList" />
    <LoadMoreHint :show-what="showWhat" :on-click="handleLoadMore" />
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
    margin: -8px auto;
  }

  :deep(.hint-container) {
    margin-top: 20px;
  }
}
</style>
