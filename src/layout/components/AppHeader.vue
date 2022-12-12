<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const handleLogin = () => {
  router.push({ name: 'login' })
}
</script>

<template>
  <header class="app-header">
    <router-link :to="{ path: '/' }">
      <div class="logo">
        <div class="logo-text">
          OSSU Library
        </div>
      </div>
    </router-link>
    <div class="login-container">
      <t-avatar image="https://tdesign.gtimg.com/site/avatar.jpg" />
      <t-button theme="primary" @click="handleLogin">
        登录
      </t-button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.app-header {
  transition: all 1s;
  padding: 0 24px;
  height: var(--w-header-height);
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  background-color: var(--td-bg-color-container);

  >a {
    text-decoration: none;
    color: var(--td-text-color-secondary);
    cursor: pointer;

    &:hover {
      color: var(--td-success-color-7);
    }

    &:active {
      color: var(--td-text-color-link);
    }
  }
}

.logo {
  display: flex;
  align-items: center;
}

.logo-text {
  display: inline-block;
  font-size: 1.25em;
  font-weight: 900;
  font-style: italic;
  position: relative;
}

.login-container {
  :deep(.t-avatar) {
    border: 2px solid var(--td-gray-color-4);
  }

  :deep(.t-button) {
    margin-left: 12px;
  }
}
</style>
