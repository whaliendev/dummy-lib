<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { LocationIcon, RootListIcon, UserIcon, ViewModuleIcon } from 'tdesign-icons-vue-next'
import AppCard from '../AppCard.vue'
import FeatureItem from './FeatureItem.vue'
const featuresList = [
  { to: { name: 'user-borrowed' }, featureIcon: RootListIcon, desc: '文档归还', requireLogin: true },
  { to: { name: 'user-borrowed' }, featureIcon: RootListIcon, desc: '借阅查询', requireLogin: true },
  { to: { name: 'user-reserved' }, featureIcon: RootListIcon, desc: '预约查询', requireLogin: true },
  { to: { name: 'admin-doc' }, featureIcon: ViewModuleIcon, desc: '文档管理', requireAdmin: true },
  { to: { name: 'admin-reader' }, featureIcon: UserIcon, desc: '读者管理', requireAdmin: true },
  { to: { name: 'admin-branch' }, featureIcon: LocationIcon, desc: '分馆管理', requireAdmin: true },
]
</script>

<template>
  <AppCard class="featurelist featurelist-grid" radius="medium">
    <t-row>
      <t-col
        v-for="({ to, featureIcon, desc, requireAdmin, requireLogin }, index) in featuresList" :key="index" :md="4"
        :sm="6"
      >
        <FeatureItem :to="to" :feature-icon="featureIcon" :require-admin="requireAdmin" :require-login="requireLogin">
          <template #desc>
            {{ desc }}
          </template>
        </FeatureItem>
      </t-col>
    </t-row>
  </AppCard>
</template>

<style lang="scss" scoped>
.featurelist {
  :deep(.t-col) {
    padding: 25px 0;
    flex-shrink: 1;
    border: 1px solid var(--td-gray-color-2);
  }
}
</style>
