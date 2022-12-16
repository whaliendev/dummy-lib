<script lang="ts" setup>
import type { PropType } from 'vue'
import { ref } from 'vue'
import type { BookModel, DocumentModel } from '@/api/model/DocumentModel'
import { getBookData } from '@/api/open-library'

const props = defineProps({
  document: {
    type: Object as PropType<DocumentModel>,
    required: true,
  },
})

const book = ref<BookModel | null>(null)
const fetchData = async () => {
  const res = await getBookData(String(props.document.id))
}

fetchData()
</script>

<template>
  <t-row class="book-card book-card-container">
    <t-col />
    <t-col />
  </t-row>
</template>

<style lang="scss" scoped>

</style>
