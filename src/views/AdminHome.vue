<script lang="ts" setup>
import AdminNavMenu from '@/components/NavMenu/AdminNavMenu.vue'
</script>

<template>
  <div class="admin-home-container">
    <AdminNavMenu />
    <div class="admin-view-wrapper">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.admin-home-container {
  display: flex;
  flex-direction: row;
}
.admin-view-wrapper {
  background-color: var(--td-bg-color-container);
  width: 100%;
  height: 100%;
  margin: 20px;
}
</style>
