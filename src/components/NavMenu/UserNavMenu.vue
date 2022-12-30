<script lang="ts" setup>
import { CartIcon, RootListIcon } from 'tdesign-icons-vue-next'
import type { MenuValue } from 'tdesign-vue-next'
import { onMounted, ref } from 'vue'
const activatedItem = ref('')
onMounted(() => {
  const pathSegs = window.location.hash.split('/')
  activatedItem.value = pathSegs[pathSegs.length - 1]
})
const handleActivatedChange = (val: MenuValue) => {
  activatedItem.value = val as string
}
</script>

<template>
  <div class="user-nav-menu user-nav-menu-container">
    <t-menu :value="activatedItem" width="200px" @change="handleActivatedChange">
      <!-- !!! Note that the name of route should have the form of 'user-[xxx]',
      and the value should be the value in square-bracket, or it will fail to activate
      corresponding menu items -->
      <t-menu-item :to="{ name: 'user-borrowed' }" value="borrowed">
        <template #icon>
          <RootListIcon />
        </template>
        已借文档
      </t-menu-item>
      <t-menu-item :to="{ name: 'user-reserved' }" value="reserved">
        <template #icon>
          <CartIcon />
        </template>
        已预约文档
      </t-menu-item>
    </t-menu>
  </div>
</template>

<style lang="scss" scoped>
.user-nav-menu-container {
  min-height: 100%;
  max-width: 204px;
  border-right: 1px solid var(--td-component-border);
}

:deep(.t-menu) {
  .t-menu__item {
    margin: 10px;
  }
}
</style>
