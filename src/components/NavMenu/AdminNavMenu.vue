<script lang="ts" setup>
import { LocationIcon, UserIcon, ViewModuleIcon } from 'tdesign-icons-vue-next'
import type { MenuValue } from 'tdesign-vue-next'
import { onMounted, ref } from 'vue'
const activatedItem = ref('')
onMounted(() => {
  const pathSegs = window.location.pathname.split('/')
  activatedItem.value = pathSegs[pathSegs.length - 1]
})
const handleActivatedChange = (val: MenuValue) => {
  activatedItem.value = val as string
}
</script>

<template>
  <div class="admin-nav-menu admin-nav-menu-container">
    <t-menu :value="activatedItem" width="200px" @change="handleActivatedChange">
      <!-- !!! Note that the name of route should have the form of 'admin-[xxx]',
      and the value should be the value in square-bracket, or it will fail to activate
      corresponding menu items -->
      <t-menu-item :to="{ name: 'admin-doc' }" value="doc">
        <template #icon>
          <ViewModuleIcon />
        </template>
        文档管理
      </t-menu-item>
      <t-menu-item :to="{ name: 'admin-reader' }" value="reader">
        <template #icon>
          <UserIcon />
        </template>
        读者管理
      </t-menu-item>
      <t-menu-item :to="{ name: 'admin-branch' }" value="branch">
        <template #icon>
          <LocationIcon />
        </template>
        分馆管理
      </t-menu-item>
    </t-menu>
  </div>
</template>

<style lang="scss" scoped>
.admin-nav-menu-container {
  height: 100vh;
  max-width: 204px;
  border-right: 1px solid var(--td-component-border);
}

:deep(.t-menu) {
  .t-menu__item {
    margin: 10px;
  }
}
</style>
