<script setup lang="ts">
import type { SiteConfig } from '~/types'

const props = defineProps<{ site: SiteConfig }>()
</script>

<template>
  <footer class="market-footer">
    <div class="market-footer-inner">
      <div class="market-footer-brand">
        <strong>{{ site.name }}</strong>
        <p>{{ site.footerText }}</p>
      </div>
      <div class="market-footer-links">
        <a
          v-if="site.socialLinks?.[0]?.to"
          :href="site.socialLinks[0].to"
          target="_blank"
        >View on GitHub</a>
      </div>
    </div>
  </footer>
</template>
