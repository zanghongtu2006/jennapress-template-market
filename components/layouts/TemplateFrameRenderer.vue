<script setup lang="ts">
import { computed } from 'vue'
import type { SiteConfig } from '~/types'
import { resolveFrameComponent } from '~/lib/template-registry'

const props = defineProps<{
  template: string
  site: SiteConfig
}>()

const activeFrame = computed(() => resolveFrameComponent(props.template || 'corporate-basic'))
</script>

<template>
  <component :is="activeFrame" :site="site">
    <slot />
  </component>
</template>
