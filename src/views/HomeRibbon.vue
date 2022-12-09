<script lang="ts" setup>
import SearchBox from '@/components/SearchBox.vue'
import FeatureList from '@/components/FeatureList/FeatureList.vue'
</script>

<template>
  <div class="ribbon-container">
    <SearchBox />
    <FeatureList />
  </div>
</template>

<style lang="scss" scoped>
.ribbon-container {
  position: relative;
  height: calc(100vh - var(--w-header-height));
  background-image: url('@/assets/whu-bg.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  :deep(.searchbox) {
    width: 60%;
    // width: 600px;
    position: absolute;
    left: 50%;
    top: 20%;
    // margin-left: auto;
    // margin-right: auto;
    transform: translateX(-50%);
  }

  :deep(.featurelist) {
    width: 60%;
    // width: 600px;
    // margin-left: auto;
    // margin-right: auto;
    position: absolute;
    left: 50%;
    top: 36%;
    transform: translateX(-50%);
  }
}
</style>
