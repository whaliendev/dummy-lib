<script lang="ts" setup>
import UserNavMenu from '@/components/NavMenu/UserNavMenu.vue'
</script>

<template>
  <UserNavMenu />
  <div class="user-view-wrapper">
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
.user-view-wrapper {
  background-color: var(--td-bg-color-container);
}
</style>
