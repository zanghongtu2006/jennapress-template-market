<script setup lang="ts">
import type { SiteConfig } from '~/types'

const props = defineProps<{ site: SiteConfig }>()
</script>

<template>
  <header class="market-header">
    <div class="market-header-inner">
      <div class="market-brand">
        <NuxtLink to="/" class="market-brand-link">
          <span class="market-brand-mark">{{ site.logoText }}</span>
          <span>{{ site.name }}</span>
        </NuxtLink>
      </div>

      <nav class="market-nav">
        <NuxtLink to="/" class="market-nav-link">Home</NuxtLink>
        <a
          v-if="site.socialLinks?.[0]?.to"
          :href="site.socialLinks[0].to"
          target="_blank"
          class="market-nav-link"
        >GitHub</a>
      </nav>

      <div class="market-header-actions">
        <ThemeSelect />
        <LangSelect />
      </div>
    </div>
  </header>
</template>
