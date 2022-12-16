<script lang="ts" setup>
import ReaderTable from '@/components/ReaderAdmin/ReaderTable.vue'

function addNewUser() {
  // console.log('Add new User')
}
</script>

<template>
  <div class="reader-admin-container">
    <div class="reader-operation-btn-group">
      <t-button class="reader-operation-btn" theme="success" @click="addNewUser">
        新增用户
      </t-button>
    </div>
    <ReaderTable />
  </div>
</template>

<style lang="scss" scoped>
.reader-admin-container {
  width: 100%;
  height: 100%;

  .reader-operation-btn-group {
    margin-bottom: 20px;

    .reader-operation-btn {
      margin-right: 20px;
    }
  }
}
</style>
