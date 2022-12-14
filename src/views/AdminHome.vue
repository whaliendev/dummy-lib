<script lang="ts" setup>
import AdminNavMenu from '@/components/NavMenu/AdminNavMenu.vue'
</script>

<template>
  <AdminNavMenu />
  <div class="admin-view-wrapper">
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
.admin-view-wrapper {
  background-color: var(--td-bg-color-container);
}
</style>
