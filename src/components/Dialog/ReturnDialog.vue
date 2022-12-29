<script lang="ts" setup>
// readerId auth store
// documentId 传进来
// libId  需要写

import { MessagePlugin } from 'tdesign-vue-next'
import { ref } from 'vue'
import { getAllLibraries } from '@/api/library'
import type { LibraryModel } from '@/api/model/LibraryModel'

// number 默认
const props = defineProps({
  documentId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
})
const emits = defineEmits(['onError', 'success'])

const libraries = ref<Array<LibraryModel>>([])
const libId = ref<number>()
const fetchLibs = (async () => {
  const libs = await getAllLibraries()
  if (!libs.length) {
    MessagePlugin.error('获取图书馆信息失败')
    emits('onError')
  }
  else {
    libraries.value = libs
    libId.value = libraries.value[0].id
  }
})()
</script>

<template>
  <t-dialog attach="body" :confirm-on-enter="true" :close-on-overlay-click="false">
    <template #header>
      归还:
    </template>
    <template #default>
      <p class="returning">
        正在归还： {{ props.title }}
      </p>
      <div class="lib-radios">
        <p>图书馆：</p>
        <t-radio-group v-model="libId">
          <t-radio v-for="lib in libraries" :key="lib.id" :value="lib.id">
            {{ lib.name }}
          </t-radio>
        </t-radio-group>
      </div>
    </template>
  </t-dialog>
</template>

<style lang="scss" scoped>
.lib-radios>p {
  margin-bottom: 4px;
  font-size: 15px;
  color: var(--td-text-color-primary);
}

.lib-radios {
  margin-top: 20px;

  :deep(.t-radio-group *) {
    color: var(--td-gray-color-9)
  }
}
</style>
