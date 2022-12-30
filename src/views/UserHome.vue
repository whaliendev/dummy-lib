<script lang="ts" setup>
import UserNavMenu from '@/components/NavMenu/UserNavMenu.vue'
</script>

<template>
  <div class="user-home-container">
    <UserNavMenu />
    <div class="user-view-wrapper">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-home-container {
  display: flex;
  flex-direction: row;
  height: 100%;
}

.user-view-wrapper {
  background-color: var(--td-bg-color-container);
  width: 100%;
  height: 100%;
  margin: 20px;
}
</style>
