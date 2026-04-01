<script setup lang="ts">
import type { SiteConfig } from '~/types'
import LanguageSelect from '~/templates/saas-landing/components/LanguageSelect.vue'
import ThemeSelect from '~/templates/saas-landing/components/ThemeSelect.vue'

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
  <header class="template-saas-header">
    <div class="container template-saas-header-inner">
      <a :href="localeHome" class="template-saas-brand">
        <span class="template-saas-brand-mark">{{ site.logoText }}</span>
        <span>{{ site.name }}</span>
      </a>

      <div class="template-saas-header-actions">
        <nav class="template-saas-nav" aria-label="Primary">
          <NuxtLink v-for="item in site.nav" :key="item.to" :to="item.to">
            {{ item.label }}
          </NuxtLink>
        </nav>

        <LanguageSelect />
        <ThemeSelect :themes="site.themes" :default-theme="site.defaultTheme" />
      </div>
    </div>
  </header>
</template>
