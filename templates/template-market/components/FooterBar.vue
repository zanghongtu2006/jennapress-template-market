<script setup lang="ts">
import type { SiteConfig } from '~/types'
import OpenSourceFooterAttribution from '~/components/shared/OpenSourceFooterAttribution.vue'

defineProps<{ site: SiteConfig }>()
</script>

<template>
  <footer class="market-footer">
    <div class="market-container market-footer-inner">
      <div class="market-footer-private">
        <div>
          <strong>{{ site.name }}</strong>
          <div>{{ site.footerText }}</div>
        </div>

        <div v-if="site.contactEmail">
          Contact: <a :href="`mailto:${site.contactEmail}`">{{ site.contactEmail }}</a>
        </div>
      </div>

      <div class="market-footer-public">
        <OpenSourceFooterAttribution />
      </div>
    </div>
  </footer>
</template>
