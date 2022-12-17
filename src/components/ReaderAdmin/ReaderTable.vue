<script lang="ts">
import { defineComponent, h } from 'vue'
import type { AxiosResponse } from 'axios'
import type { RequestOptions } from '@/types/axios'
import type { ReaderResult } from '@/api/model/ReaderModel'
import { getAllReaders } from '@/api/admin'
import { cancelRegister, updateReader } from '@/api/reader'
import type { RegisterReaderModel } from '@/api/model/RegisterModel'

export default defineComponent({
  data() {
    return {
      readers: [] as Array<ReaderResult>,
      columns: [
        { colKey: 'id', title: '身份编号' },
        { colKey: 'address', title: '地址' },
        { colKey: 'cost', title: '消费' },
        { colKey: 'name', title: '姓名' },
        { colKey: 'phoneNumber', title: '电话号码' },
        { colKey: 'password', title: '密码' },
        { colKey: 'type', title: '类型' },
        { colKey: 'cardNumber', title: '校园卡账号' },
        {
          colKey: 'operations',
          title: '操作',
          width: '200',
          cell: (h: any, { row }: { row: any }) => {
            const id = row.id
            return h('div',
              [
                h('span',
                  {
                    class: 'reader-operation-btn',
                    style: {
                      'color': 'rgb(0, 82, 217)',
                      'margin-right': '10px',
                      'cursor': 'pointer',
                    },
                    onClick: () => { this.updateUser(row) },
                  }, '修改信息'),
                h('span',
                  {
                    class: 'reader-operation-btn',
                    style: {
                      color: 'rgb(0, 82, 217)',
                      cursor: 'pointer',
                    },
                    onClick: () => { this.onDeleteUser(row.id) },
                  }, '删除用户'),
              ])
          },
        },
      ],
      readerInfo: {} as RegisterReaderModel,

      showCancleSuccess: false,
      showCancleFail: false,

      showUpdateInfoDialog: false,
      showUpdateSuccess: false,
      showUpdateFail: false,
    }
  },
  computed: {
    total_number() {
      return this.readers.length
    },
    pagination() {
      return {
        defaultCurrent: 1,
        defaultPageSize: 10,
        total: this.total_number,
        showJumper: true,
      }
    },
  },
  mounted() {
    this.getAllUsers({
      retry: {
        count: 2,
        delay: 50,
      },
      errorWarning: true,
    })
  },
  methods: {
    onChange: (params: any, context: any) => {
    },
    onPageChange: (pageInfo: any, newData: any) => {

    },
    onSelectChange: (selectedRowKeys: any, context: any) => {

    },
    onUpdateUser() {
      this.updateReader({
        retry: {
          count: 2,
          delay: 50,
        },
        errorWarning: true,
      })
        .then((res: any) => {
          res ? this.showUpdateSuccess = true : this.showUpdateFail = true
          this.showUpdateInfoDialog = false
        })
        .then(() => {
          this.getAllUsers({
            retry: {
              count: 2,
              delay: 50,
            },
            errorWarning: true,
          })
        })
    },
    onDeleteUser(readerId: any) {
      this.cancelRegister(readerId, {
        retry: {
          count: 2,
          delay: 50,
        },
        errorWarning: true,
      }).then((res: any) => {
        res ? this.showCancleSuccess = true : this.showCancleFail = true

        this.getAllUsers({
          retry: {
            count: 2,
            delay: 50,
          },
          errorWarning: true,
        })
      })
    },
    onCancelUpdate() {
      this.showUpdateInfoDialog = false
    },
    updateUser(row: any) {
      this.readerInfo = Object.assign({}, row)
      this.showUpdateInfoDialog = true
    },
    async getAllUsers(options: RequestOptions): Promise<boolean> {
      return new Promise((resolve, _reject) => {
        getAllReaders({ ...options, isReturnNativeResponse: true })
          .then((res) => {
            const response = res as unknown as AxiosResponse<Array<ReaderResult>>
            if (response.status === 200) {
              this.readers = response.data.reverse()
              resolve(true)
            }
            else {
              resolve(false)
            }
          })
          .catch(() => {
            resolve(false)
          })
      })
    },
    async cancelRegister(id: String, options: RequestOptions): Promise<boolean> {
      return new Promise((resolve, _reject) => {
        cancelRegister(id, { ...options, isReturnNativeResponse: true })
          .then((res: unknown): void => {
            const response = res as unknown as AxiosResponse<any>
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
    async updateReader(options: RequestOptions): Promise<boolean> {
      return new Promise((resolve, _reject) => {
        updateReader(this.readerInfo, { ...options, isReturnNativeResponse: true })
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
  <div class="reader-table-container">
    <t-notification
      v-if="showCancleSuccess"
      class="delete-result-info"
      theme="success"
      title="读者删除成功"
      :duration="2000"
      @duration-end="showCancleSuccess = false"
    />
    <t-notification
      v-if="showCancleFail"
      class="delete-result-info"
      theme="error"
      title="读者删除失败"
      :duration="2000"
      @duration-end="showCancleFail = false"
    />
    <t-notification
      v-if="showCancleSuccess"
      class="update-result-info"
      theme="success"
      title="读者信息更新成功"
      :duration="2000"
      @duration-end="showUpdateSuccess = false"
    />
    <t-notification
      v-if="showCancleFail"
      class="update-result-info"
      theme="error"
      title="读者信息更新失败"
      :duration="2000"
      @duration-end="showUpdateFail = false"
    />
    <t-dialog
      placement="center"
      header="更新读者信息"
      mode="modal"
      :visible="showUpdateInfoDialog"
      :on-confirm="onUpdateUser"
      :on-close="onCancelUpdate"
    >
      <template #body>
        <t-form :data="readerInfo">
          <t-form-item label="地址" name="address">
            <t-input v-model="readerInfo.address" placeholder="请输入地址" />
          </t-form-item>
          <t-form-item label="校园卡账号" name="cardNumber">
            <t-input v-model="readerInfo.cardNumber" placeholder="请输入校园卡账号" />
          </t-form-item>
          <t-form-item label="姓名" name="name">
            <t-input v-model="readerInfo.name" placeholder="请输入姓名" />
          </t-form-item>
          <t-form-item label="电话号码" name="phoneNumber">
            <t-input v-model="readerInfo.phoneNumber" placeholder="请输入电话号码" />
          </t-form-item>
          <t-form-item label="类型" name="type">
            <t-radio-group v-model="readerInfo.type" default-value="faculty">
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
    <t-table
      row-key="id"
      :data="readers"
      :columns="columns"
      :stripe="true"
      :bordered="true"
      :hover="true"
      :show-header="true"
      :pagination="pagination"
      @change="onChange"
      @page-change="onPageChange"
      @select-change="onSelectChange"
    />
  </div>
</template>

<style lang="scss" scoped>
.delete-result-info .update-result-info {
  position: absolute;
  top: 50px;
  left: 50%;
}
</style>
