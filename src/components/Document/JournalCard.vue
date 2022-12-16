<script lang="ts" setup>
import type { PropType } from 'vue'
import { reactive } from 'vue'
import type { DocumentModel, JournalModel } from '@/api/model/DocumentModel'

const props = defineProps({
  document: {
    type: Object as PropType<DocumentModel>,
    required: true,
  },
})

const journal: JournalModel = reactive({
  id: props.document.id,
  title: props.document.title,
  publisher: null,
  pubDate: 'FIX this',
  editors: null,
})
</script>

<template>
  <div />
</template>

<style lang="scss" scoped>

</style>
