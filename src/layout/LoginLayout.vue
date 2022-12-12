<script lang="ts" setup>
import { RollbackIcon } from 'tdesign-icons-vue-next'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import AccountForm from '@/components/AccountForm.vue'
import { useAuthStore } from '@/store/modules/auth'
const props = defineProps<{
  dest?: string
}>()

const authStore = useAuthStore()

const router = useRouter()
const handleRollback = () => {
  router.go(-1)
}

const loginTab = computed<TabEnum>(() => {
  if (!props.dest)
    return 'user'
  if (props.dest.includes('user'))
    return 'user'
  else return 'admin'
})

const loginStatus = ref<boolean>(false)
const handleLogin = (status: boolean) => {
  loginStatus.value = status
}
watch(loginStatus, (success) => {
  if (success) {
    if (props.dest?.includes('user') && authStore.adminLoginStatus) {
      router.push({ name: 'home' })
      return
    }
    if (props.dest?.includes('admin') && authStore.userLoginStatus) {
      router.push({ name: 'home' })
      return
    }
    if (props.dest)
      router.push({ name: props.dest, replace: true })
    else
      router.push({ name: 'home', replace: true })
  }
})
</script>

<template>
  <div class="wrap-out">
    <div class="page">
      <RollbackIcon size="36px" @click="handleRollback" />
      <AccountForm :login-tab="loginTab" @update:login-status="handleLogin" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/bg-login.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;

  svg {
    position: absolute;
    right: 48px;
    top: 36px;
    padding: 8px;
    color: var(--td-font-white-2);
    background-color: var(--td-font-gray-4);
    border-radius: var(--td-radius-medium);
    transition: all 0.3s;

    &:hover {
      color: var(--td-font-white-1);
      background-color: var(--td-font-gray-3);
      transform: scale(1.2);
      animation: tilt-shaking 0.3s infinite;
    }

    &:active {
      color: var(--td-brand-color-active)
    }
  }

  :deep(.account-form) {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, 0);
  }
}
</style>
