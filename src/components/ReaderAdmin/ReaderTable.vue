<script lang="ts">
import { defineComponent, h } from 'vue'

export default defineComponent({
  data() {
    return {
      readers: [
        {
          id: 1,
          cost: null,
          address: 'Ave. Shenyang',
          name: 'jiuthree',
          phoneNumber: '18888888888',
          password: null,
          type: 'faculty',
          cardNumber: 2022001,
        },
        {
          id: 2,
          cost: null,
          address: 'Ave. 5th',
          name: 'admin',
          phoneNumber: '12345678900',
          password: null,
          type: 'faculty',
          cardNumber: 2022002,
        },
        {
          id: 3,
          cost: null,
          address: 'WuHan University',
          name: 'admin',
          phoneNumber: null,
          password: '123456',
          type: null,
          cardNumber: null,
        },
      ],
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
                    onClick: () => { this.onUpdateUser(row.id) },
                  }, '新增用户'),
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
  methods: {
    onChange: (params: any, context: any) => {
    },
    onPageChange: (pageInfo: any, newData: any) => {

    },
    onSelectChange: (selectedRowKeys: any, context: any) => {

    },
    onUpdateUser: (readerId: any) => {
      // console.log(readerId)
    },
    onDeleteUser: (readerId: any) => {
      // console.log(readerId)
    },
  },
})
</script>

<template>
  <div class="reader-table-container">
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
</style>
