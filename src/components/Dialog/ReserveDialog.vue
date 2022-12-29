<script lang="ts" setup>
import { ref } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import type { LibraryModel } from '@/api/model/LibraryModel'
import { getAllLibraries } from '@/api/library'

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
const rtimestamp = ref<number>(Date.now())
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

// 借阅时间： // 当天下午五点前
// documentId: // 传进来
// libId: // 要写
// number: // 默认为1
// 归还时间： // 选择要写
// readerId: // 从store获得
// 预约时间： // 自动生成
</script>

<template>
  <t-dialog attach="body" :confirm-on-enter="true" :close-on-overlay-click="false">
    <template #header>
      预约
    </template>
    <template #default>
      <t-alert theme="warning">
        <template #message>
          提醒： 预约后需要在当天下午五点前取书，超时后预约会自动失效。
        </template>
      </t-alert>
      <p class="reserving">
        正在预约： {{ props.title }}
      </p>
      <div class="lib-radios">
        <p>图书馆：</p>
        <t-radio-group v-model="libId">
          <t-radio v-for="lib in libraries" :key="lib.id" :value="lib.id">
            {{ lib.name }}
          </t-radio>
        </t-radio-group>
      </div>
      <div class="return-date">
        <p>归还时间：</p>
        <t-date-picker v-model="rtimestamp" enable-time-picker allow-input clearable value-type="time-stamp" />
      </div>
    </template>
  </t-dialog>
</template>

<style lang="scss" scoped>
.reserving {
  margin-top: 20px;
}

.lib-radios>p,
.return-date p {
  margin-bottom: 4px;
  font-size: 15px;
  color: var(--td-text-color-primary);
}

.lib-radios {
  margin-bottom: 20px;
  margin-top: 20px;

  :deep(.t-radio-group *) {
    color: var(--td-gray-color-9)
  }
}
</style>
