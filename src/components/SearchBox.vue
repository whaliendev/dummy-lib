<script lang="ts" setup>
import { h, ref } from 'vue'
import type { SelectValue } from 'tdesign-vue-next'
import { MessagePlugin, Select } from 'tdesign-vue-next'
import { SearchIcon } from 'tdesign-icons-vue-next'
import { useDocumentStore } from '@/store/modules/document'

const documentStore = useDocumentStore()

const searchIcon = ref(() => h(SearchIcon))
const selectValue = ref<'文档ID' | '标题' | '出版商'>('标题')
const categorySelect = ref(() => h(Select, {
  autoWidth: true,
  options: ['文档ID', '标题', '出版商'].map(value => ({
    label: value,
    value,
  })),
  value: selectValue,
  defaultValue: '标题',
  onChange: (value: SelectValue) => {
    selectValue.value = value as ('文档ID' | '标题' | '出版商')
  },
}))

const searching = documentStore.homeListLoading
const searchText = ref<string>('')
const handleSearchClicked = () => {
  if (!searchText.value)
    return
  if (selectValue.value === '标题') {
    documentStore.searchDocByTitleLike(searchText.value)
  }
  else if (selectValue.value === '出版商') {
    documentStore.searchDocByPublisher(searchText.value)
  }
  else {
    if (!parseInt(searchText.value) && parseInt(searchText.value) !== 0)
      return
    documentStore.searchByDocId(parseInt(searchText.value))
  }
  if (!documentStore.home.error && documentStore.home.docList.length > 0)
    MessagePlugin.success('搜索成功')
  else if (!documentStore.home.error && !documentStore.home.docList)
    MessagePlugin.warning('搜索成功，但未找到匹配文档')
}
</script>

<template>
  <div class="searchbox searchbox-container">
    <t-input-adornment :prepend="categorySelect">
      <t-input v-model:value="searchText" placeholder="输入内容以开始搜索" autocomplete="on" size="large" type="search" />
    </t-input-adornment>
    <t-button :icon="searchIcon" size="large" :loading="searching" @click="handleSearchClicked">
      搜索
    </t-button>
  </div>
</template>

<style lang="scss" scoped>
.searchbox-container {
  display: flex;
  justify-content: space-between;

  :deep(.t-input-adornment) {
    max-width: 100%;
    flex: 1;

    .t-input {
      padding-left: 24px;
      border: none;
    }
  }

  :deep(.t-button) {
    display: inline-block;
    margin-left: 24px;
  }
}
</style>
