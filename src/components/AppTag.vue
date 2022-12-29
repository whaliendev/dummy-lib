<script lang="ts" setup>
import { shallowReactive } from 'vue'

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: false,
  },
  theme: {
    type: String,
    required: false,
    default: () => {
      return 'primary'
    },
    validator(value: string) {
      return ['primary', 'warn', 'error', 'success'].includes(value)
    },
  },
  onClick: {
    type: Function,
    required: false,
    default: () => {
      return () => { }
    },
  },
})

let color = '#ffa500'
let bgColor = '#ffa500aa'

const shallowProps = shallowReactive(props);
(() => {
  if (!props.color) {
    if (props.theme === 'primary')
      color = '#ffa500'
    else if (props.theme === 'warn')
      color = '#f2995f'
    else if (props.theme === 'error')
      color = '#e34d59'
    else
      color = '#00a870'
  }
  else {
    color = props.color
  }
  bgColor = `${color}44`
})()
</script>

<template>
  <span class="tag-span" @click.stop="props.onClick">{{ props.content }}</span>
</template>

<style lang="scss" scoped>
.tag-span {
  color: v-bind(color);
  background-color: v-bind(bgColor);
  padding: 4px 8px;
  font-size: var(--td-font-size-mark-small);
  border-radius: var(--td-radius-default);
}
</style>
