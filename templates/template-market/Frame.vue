<script setup lang="ts">
import type { SiteConfig } from '~/types'
import '~/templates/template-market/template.css'

defineProps<{ site: SiteConfig }>()
</script>

<template>
  <div class="market-frame">
    <HeaderBar :site="site" />
    <slot />
    <FooterBar :site="site" />
  </div>
</template>
