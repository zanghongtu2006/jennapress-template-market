<script setup lang="ts">
import { computed } from 'vue'
import type { PageContent } from '~/types'
import { resolveTemplateComponent } from '~/lib/template-registry'

const props = defineProps<{
  template: string
  page: PageContent
}>()

const activeTemplate = computed(() => resolveTemplateComponent(props.template || 'corporate-basic'))
</script>

<template>
  <component :is="activeTemplate" :page="page" />
</template>
