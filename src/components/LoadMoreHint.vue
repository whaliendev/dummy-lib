<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, onMounted, ref, watch } from 'vue'

export type LoadWhatEnum = 'no' | 'gif' | 'btn' | 'nomore'
export default defineComponent({
  props: {
    showWhat: {
      type: String as PropType<LoadWhatEnum>,
      required: true,
    },
    onClick: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const showHintRef = ref(false)
    const loadMoreRef = ref(false)
    const loadingMoreRef = ref(false)

    const reactToShowWhat = (newVal: LoadWhatEnum) => {
      if (newVal === 'no') {
        showHintRef.value = false
      }
      else if (newVal === 'nomore') {
        showHintRef.value = true
        loadMoreRef.value = false
      }
      else if (newVal === 'btn') {
        showHintRef.value = true
        loadMoreRef.value = true
        loadingMoreRef.value = false
      }
      else {
        showHintRef.value = true
        loadMoreRef.value = true
        loadingMoreRef.value = true
      }
    }

    onMounted(() => {
      reactToShowWhat(props.showWhat)
    })

    watch(() => props.showWhat, reactToShowWhat)

    const handleLoadMore = props.onClick as (payment: MouseEvent) => void

    return {
      showHintRef,
      loadMoreRef,
      loadingMoreRef,
      handleLoadMore,
    }
  },
})
</script>

<template>
  <div v-show="showHintRef" class="hint-container">
    <div v-if="loadMoreRef" class="load-more-container">
      <img v-if="loadingMoreRef" class="loading-more-img" src="../assets/loading-lines.gif" alt="loading more gif">
      <button v-else class="load-more-btn" @click="handleLoadMore">
        加载更多内容...
      </button>
    </div>
    <p v-else class="content-hint">
      啊欧，没有更多内容了
    </p>
  </div>
</template>

<style lang="scss" scoped>
.hint-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px;
  color: var(--td-text-color-secondary);
  font-size: var(--td-font-size-mark-medium);

  .loading-more-img {
    width: 30px;
    height: 30px;
  }

  .load-more-btn {
    padding: 6px 8px;
    border-radius: var(--td-radius-default);
    color: inherit;
    font-size: inherit;
  }
}
</style>
