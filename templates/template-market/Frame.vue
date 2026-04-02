<script setup lang="ts">
import type { SiteConfig } from '~/types'
import '~/templates/template-market/template.css'
import HeaderBar from '~/templates/template-market/components/HeaderBar.vue'
import FooterBar from '~/templates/template-market/components/FooterBar.vue'
import SectionRail from '~/templates/template-market/components/SectionRail.vue'

const props = defineProps<{ site: SiteConfig }>()

const { theme } = useTheme({
  themes: props.site.themes,
  defaultTheme: props.site.defaultTheme
})

const frameTheme = computed(() => theme.value)
</script>

<template>
  <div class="template-market-frame">
    <HeaderBar :site="site" />
    <SectionRail>
      <slot />
    </SectionRail>
    <FooterBar :site="site" />
  </div>
</template>
