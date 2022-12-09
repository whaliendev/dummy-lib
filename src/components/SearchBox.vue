<script lang="ts" setup>
import { h, ref } from 'vue'
import { Select } from 'tdesign-vue-next'
import { SearchIcon } from 'tdesign-icons-vue-next'

const categorySelect = ref(() => h(Select, {
  autoWidth: true,
  options: ['文档ID', '标题', '出版商'].map(value => ({
    label: value,
    value,
  })),
  defaultValue: '标题',
}))

const searchIcon = ref(() => h(SearchIcon))
</script>

<template>
  <div class="searchbox searchbox-container">
    <t-input-adornment :prepend="categorySelect">
      <t-input placeholder="输入内容以开始搜索" autocomplete="on" autofocus size="large" type="search" />
    </t-input-adornment>
    <t-button :icon="searchIcon" size="large">
      搜索
    </t-button>
  </div>
</template>

<style lang="scss" scoped>
.searchbox-container {
  display: flex;
  justify-content: space-between;
  width: 60%;

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
