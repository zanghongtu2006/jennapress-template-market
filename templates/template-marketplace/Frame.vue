<script setup lang="ts">
import type { SiteConfig } from '~/types'
import { stripLocalePrefixFromPath } from '~/lib/i18n'
import LanguageSelect from '~/templates/template-marketplace/components/LanguageSelect.vue'
import '~/templates/template-marketplace/template.css'

const props = defineProps<{ site: SiteConfig }>()

useTheme({
  themes: props.site.themes,
  defaultTheme: props.site.defaultTheme
})

const route = useRoute()
const isZh = computed(() => stripLocalePrefixFromPath(route.path).locale === 'zh')
const homePath = computed(() => props.site.nav.find(item => item.to === '/' || item.to.endsWith('/products'))?.to || '/products')
const loginLabel = computed(() => isZh.value ? '登录' : 'Log in')
const getStartedLabel = computed(() => isZh.value ? '开始使用' : 'Get Started')
</script>

<template>
  <div class="template-marketplace-frame">
    <header class="tm-header">
      <div class="tm-container tm-header-inner">
        <NuxtLink :to="homePath" class="tm-brand" aria-label="TemplateMarket home">
          <span class="tm-brand-mark" aria-hidden="true"></span>
          <span>{{ site.name }}</span>
        </NuxtLink>

        <nav class="tm-nav" aria-label="Primary navigation">
          <NuxtLink v-for="item in site.nav" :key="item.to" :to="item.to">
            {{ item.label }}
          </NuxtLink>
        </nav>

        <div class="tm-search" role="search">
          <span aria-hidden="true">⌕</span>
          <input type="search" :placeholder="site.tagline || 'Search templates...'">
          <kbd>⌘ K</kbd>
        </div>

        <div class="tm-header-actions">
          <LanguageSelect />
          <a class="tm-login" href="https://example.com/login" target="_blank" rel="noopener noreferrer">{{ loginLabel }}</a>
          <NuxtLink class="tm-button tm-button-primary tm-header-cta" :to="homePath">{{ getStartedLabel }}</NuxtLink>
        </div>
      </div>
    </header>

    <main class="tm-main">
      <slot />
    </main>

    <footer class="tm-footer">
      <div class="tm-container tm-footer-inner">
        <div>
          <strong>{{ site.name }}</strong>
          <p>{{ site.footerText }}</p>
        </div>
        <div class="tm-footer-links">
          <a v-if="site.contactEmail" :href="`mailto:${site.contactEmail}`">{{ site.contactEmail }}</a>
          <a
            v-for="link in site.socialLinks || []"
            :key="link.to"
            :href="link.to"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ link.label }}
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>
