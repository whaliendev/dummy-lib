<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'BaseCard',
  props: {
    shadow: {
      type: Boolean,
      required: false,
      default: false,
    },
    radius: {
      type: String,
      required: false,
      default: 'noradius',
      validator: val => (['base', 'small', 'round', 'noradius'] as any[]).includes(val),
    },
  },
})
</script>

<template>
  <div class="base-card" :class="[radius, shadow ? 'shadow' : '']">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.base-card {
  background-color: var(--td-bg-color-container);
}

.base-card.shadow {
  box-shadow: var(--td-shadow-2);
}

.base-card.base {
  border-radius: var(--td-radius-default);
}

.base-card.small {
  border-radius: var(--td-radius-small);
}

.base-card.round {
  border-radius: var(--td-radius-round);
}
</style>
