<script lang="ts">
import { defineComponent } from 'vue'
import type { AxiosResponse } from 'axios'
import ReaderTable from '@/components/ReaderAdmin/ReaderTable.vue'
import type { RequestOptions } from '@/types/axios'
import { register } from '@/api/reader'
import type { RegisterReaderModel } from '@/api/model/RegisterModel'

export default defineComponent({
  data() {
    return {
      showRegisterDialog: false,
      registerInfo: {} as RegisterReaderModel,
      showRegisterSuccess: false,
      showRegisterFail: false,
      refresh: false,
    }
  },
  methods: {
    addNewReader() {
      this.showRegisterDialog = true
    },
    onSubmitForm() {
      this.register({
        retry: {
          count: 2,
          delay: 50,
        },
        errorWarning: true,
      }).then((res) => {
        res ? this.showRegisterSuccess = true : this.showRegisterFail = true

        this.showRegisterDialog = false

        this.refresh = !this.refresh
      })
    },
    cancel() {
      this.showRegisterDialog = false
    },
    async register(options: RequestOptions): Promise<boolean> {
      return new Promise((resolve, _reject) => {
        register(this.registerInfo, { ...options, isReturnNativeResponse: true })
          .then((res) => {
            const response = res as AxiosResponse
            if (response.status === 200)
              resolve(true)
            else
              resolve(false)
          })
          .catch(() => {
            resolve(false)
          })
      })
    },
  },
})
</script>

<template>
  <div class="reader-admin-container">
    <t-notification
      v-if="showRegisterSuccess"
      class="result-info"
      theme="success"
      title="读者注册成功"
      :duration="2000"
      @duration-end="showRegisterSuccess = false"
    />
    <t-notification
      v-if="showRegisterFail"
      class="result-info"
      theme="error"
      title="读者注册失败"
      :duration="2000"
      @duration-end="showRegisterFail = false"
    />
    <t-dialog
      placement="center"
      header="注册读者"
      mode="modal"
      :visible="showRegisterDialog"
      :on-confirm="onSubmitForm"
      :on-close="cancel"
    >
      <template #body>
        <t-form :data="registerInfo">
          <t-form-item label="地址" name="address">
            <t-input v-model="registerInfo.address" placeholder="请输入地址" />
          </t-form-item>
          <t-form-item label="校园卡账号" name="cardNumber">
            <t-input v-model="registerInfo.cardNumber" placeholder="请输入校园卡账号" />
          </t-form-item>
          <t-form-item label="姓名" name="name">
            <t-input v-model="registerInfo.name" placeholder="请输入姓名" />
          </t-form-item>
          <t-form-item label="电话号码" name="phoneNumber">
            <t-input v-model="registerInfo.phoneNumber" placeholder="请输入电话号码" />
          </t-form-item>
          <t-form-item label="类型" name="type">
            <t-radio-group v-model="registerInfo.type" default-value="faculty">
              <t-radio value="faculty">
                faculty
              </t-radio>
              <t-radio value="student">
                student
              </t-radio>
              <t-radio value="staff">
                staff
              </t-radio>
            </t-radio-group>
          </t-form-item>
        </t-form>
      </template>
    </t-dialog>
    <div class="reader-operation-btn-group">
      <t-button class="reader-operation-btn" theme="success" @click="addNewReader">
        新增用户
      </t-button>
    </div>
    <ReaderTable :key="refresh" />
  </div>
</template>

<style lang="scss" scoped>
.reader-admin-container {
  width: 100%;
  height: 100%;

  .result-info {
    position: absolute;
    top: 50px;
    left: 50%;
  }

  .reader-operation-btn-group {
    margin-bottom: 20px;

    .reader-operation-btn {
      margin-right: 20px;
    }
  }
}
</style>
