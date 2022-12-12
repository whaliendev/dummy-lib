<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ControlPlatformIcon, UserIcon } from 'tdesign-icons-vue-next'
import type { SubmitContext } from 'tdesign-vue-next'
import { MessagePlugin } from 'tdesign-vue-next'
import { useAuthStore } from '@/store/modules/auth'
import { debounce } from '@/utils'
const props = defineProps<{
  loginTab: TabEnum
}>()
const emit = defineEmits<{
  (e: 'update:login-status', status: boolean): void
}>()

const authStore = useAuthStore()

const tab = ref<TabEnum>(props.loginTab)
const userFormRef = ref<HTMLFormElement | null>(null)
const adminFormRef = ref<HTMLFormElement | null>(null)
const handleChange = (newVal: TabEnum) => {
  tab.value = newVal
}

const userFormData = reactive({
  cardNum: '',
  checkStatus: true,
})
const userFormRules: FormRules<typeof userFormData> = {
  cardNum: [
    { required: true, message: '校园卡号不能为空', trigger: 'blur' },
    { pattern: /[0-9]{1,18}/, message: '卡号必须为1-18位数字', trigger: 'change' },
  ],
  checkStatus: [
    { boolean: true },
  ],
}
const handleUserLogin = debounce(async ({ validateResult, firstError }: SubmitContext<typeof userFormData>) => {
  if (validateResult !== true) {
    MessagePlugin.warning(firstError as string, 2000)
    return
  }

  const res = await authStore.handleUserLogin(userFormData.cardNum, {
    retry: {
      count: 2,
      delay: 50,
    },
    errorWarning: true,
  })
  if (res)
    MessagePlugin.success('用户登录成功', 600)
  setTimeout(() => {
    emit('update:login-status', res)
  }, 1000)
}, 800)

const adminFormData = reactive({
  idNum: '',
  password: '',
})
const adminFormRules: FormRules<typeof adminFormData> = {
  idNum: [
    { required: true, message: '* ID号不能为空', trigger: 'blur' },
    { pattern: /[0-9]{1,18}/, message: '* ID号必须为1-18位数字', trigger: 'change' },
  ],
  password: [
    { required: true, message: '* 密码不能为空', trigger: 'blur' },
    {
      min: 6,
      max: 30,
      message: '* 密码长度为6-30位',
      trigger: 'change',
    },
  ],
}
const handleAdminLogin = debounce(async ({ validateResult, firstError }: SubmitContext<typeof adminFormData>) => {
  if (validateResult !== true) {
    MessagePlugin.warning(firstError as string, 2000)
    return
  }
  const res = await authStore.handleAdminLogin({
    id: adminFormData.idNum,
    password: adminFormData.password,
  }, {
    retry: {
      count: 2,
      delay: 30,
    },
    errorWarning: true,
  })
  if (res)
    MessagePlugin.success('管理员登录成功', 600)
  setTimeout(() => {
    emit('update:login-status', res)
  }, 1000)
}, 800)
</script>

<template>
  <div class="account-form account-form-container">
    <t-tabs :value="tab" theme="card" default-value="user" @change="handleChange">
      <t-tab-panel value="user" :destroy-on-hide="false">
        <template #label>
          <UserIcon />&nbsp;&nbsp;&nbsp;读者登录
        </template>
        <t-form
          :ref="userFormRef" class="user-form" :data="userFormData" label-width="0" :rules="userFormRules"
          :status-icon="true" :required-mark="true" :show-error-message="true" @submit="handleUserLogin"
        >
          <t-form-item name="cardNum">
            <t-input v-model="userFormData.cardNum" clearable max-character="12" placeholder="请输入你的校园卡号" />
          </t-form-item>
          <t-form-item name="login-button">
            <t-button block type="submit">
              登录
            </t-button>
          </t-form-item>
          <t-form-item name="auto-login">
            <t-checkbox v-model="userFormData.checkStatus" :default-checked="true">
              下次自动登录
            </t-checkbox>
          </t-form-item>
        </t-form>
      </t-tab-panel>
      <t-tab-panel value="admin" :destroy-on-hide="false">
        <template #label>
          <ControlPlatformIcon />&nbsp;&nbsp;&nbsp;管理员登录
        </template>
        <t-form
          :ref="adminFormRef" :data="adminFormData" label-width="0" :rules="adminFormRules" :status-icon="true"
          @submit="handleAdminLogin"
        >
          <t-form-item name="idNum">
            <t-input v-model="adminFormData.idNum" clearable max-character="12" name="idNum" placeholder="请输入你的ID号码" />
          </t-form-item>
          <t-form-item name="password">
            <t-input v-model="adminFormData.password" type="password" placeholder="请输入密码" />
          </t-form-item>
          <t-form-item name="login-button">
            <t-button block type="submit">
              登录
            </t-button>
          </t-form-item>
        </t-form>
      </t-tab-panel>
    </t-tabs>
  </div>
</template>

<style lang="scss" scoped>
.account-form {

  // frosted glass effect
  &::after {
    content: ' ';
    position: absolute;
    width: 96%;
    height: 96%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: -5;
    background-image: url('@/assets/bg-login.jpg');
    background-position: left 75% top 16%;
    background-size: cover;
    background-repeat: no-repeat;
    filter: blur(6px);
  }
}

:deep(.t-tabs) {
  display: inline-block;
  border: 1px solid var(--td-gray-color-1);
  border-radius: var(--td-radius-medium);
  background-color: rgba(255, 255, 255, 0.2);

  .t-tabs__header * {
    background-color: rgba(255, 255, 255, 0.08);
  }

  .t-tabs__nav-item.t-is-active {
    border-bottom: none;
  }

  .t-tabs__nav-item:nth-child(1) {
    border-right: 1px solid var(--td-gray-color-1);
  }

  .t-tabs__content {
    height: 184px;
  }

  .t-tabs__nav-item {
    width: 150px;
    justify-content: center;
    align-items: center;
  }
}

:deep(.t-form.user-form) {
  .t-form__item.t-form-item__login-button {
    margin-top: 25px;
  }
}

:deep(.t-form) {
  padding: 0 20px;

  >.t-form__item {
    margin: 20px 0;
  }

  .t-input {
    height: var(--td-size-11);
  }

  .t-input__extra {
    position: absolute;
    bottom: -20px;
  }

  >.t-form__item.t-form-item__auto-login {
    margin-top: -12px;
    margin-left: 4px;

    .t-checkbox__input {
      border-radius: var(--td-radius-circle);
    }

    .t-checkbox__label {
      color: var(--td-text-color-secondary);
      font-size: 0.9em;
    }
  }
}
</style>
