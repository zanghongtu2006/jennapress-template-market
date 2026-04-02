<script setup lang="ts">
import type { SiteConfig } from '~/types'

defineProps<{ site: SiteConfig }>()

const localeHome = computed(() => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('site-language')
    if (saved) return '/' + saved
  }
  return '/'
})
</script>

<template>
  <header class="market-header">
    <div class="market-container market-header-inner">
      <a :href="localeHome" class="market-brand">
        <span class="market-brand-mark">{{ site.logoText }}</span>
        <span>{{ site.name }}</span>
      </a>

      <div class="market-header-actions">
        <nav class="market-nav" aria-label="Primary">
          <NuxtLink v-for="item in site.nav" :key="item.to" :to="item.to" class="market-nav-link">
            {{ item.label }}
          </NuxtLink>
        </nav>

        <LanguageSelect />
        <ThemeSelect :themes="site.themes" :default-theme="site.defaultTheme" />
      </div>
    </div>
  </header>
</template>
