<script setup lang="ts">
import type { PageContent } from '~/types'
import '~/templates/template-market/template.css'
import PageSurface from '~/templates/template-market/components/PageSurface.vue'

defineProps<{ page: PageContent }>()
</script>

<template>
  <PageSurface>
    <BlockRenderer :blocks="page.blocks" />
  </PageSurface>
</template>
