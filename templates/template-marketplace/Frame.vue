<script setup lang="ts">
import type { SiteConfig } from '~/types'
import { DEFAULT_LOCALE, stripLocalePrefixFromPath } from '~/lib/i18n'
import LanguageSelect from '~/templates/template-marketplace/components/LanguageSelect.vue'
import '~/templates/template-marketplace/template.css'

const props = defineProps<{ site: SiteConfig }>()

useTheme({
  themes: props.site.themes,
  defaultTheme: props.site.defaultTheme
})

const route = useRoute()
const parsedPath = computed(() => stripLocalePrefixFromPath(route.path))
const currentLocale = computed(() => parsedPath.value.locale || DEFAULT_LOCALE)
const isZh = computed(() => currentLocale.value === 'zh')
const headerSearch = ref('')

const p = (path: string) =>
  currentLocale.value && currentLocale.value !== DEFAULT_LOCALE ? `/${currentLocale.value}${path}` : path

const localizeTo = (to: string) => to.startsWith('/') ? p(to) : to

type MarketplaceCategory = { id: string; name: string; description: string; featured?: boolean }
const categoryOrder = [
  'blog-editorial',
  'portfolio-agency',
  'landing-page',
  'documentation',
  'saas-startup',
  'ecommerce-catalog',
  'business-services',
  'community-education',
]

const categoryRegistry = computed(() => ((props.site as SiteConfig & { marketplaceCategories?: MarketplaceCategory[] }).marketplaceCategories ?? []))
const categories = computed(() => [...categoryRegistry.value].sort((a, b) => {
  const aIndex = categoryOrder.indexOf(a.id)
  const bIndex = categoryOrder.indexOf(b.id)
  return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex)
}))

const browseItem = computed(() => props.site.nav?.[0] ?? { label: isZh.value ? '浏览' : 'Browse', to: '/' })
const freeTemplatesItem = computed(() => props.site.nav?.[1] ?? { label: isZh.value ? '免费模板' : 'Free Templates', to: '/#templates' })
const browseLink = computed(() => localizeTo(browseItem.value.to || '/'))
const freeTemplatesLink = computed(() => localizeTo(freeTemplatesItem.value.to || '/#templates'))
const categoriesLabel = computed(() => isZh.value ? '分类' : 'Categories')
const searchPlaceholder = computed(() => props.site.tagline || (isZh.value ? '搜索模板...' : 'Search templates...'))

const templateHashParams = (hash: string) => {
  if (!hash.startsWith('#templates')) return new URLSearchParams()
  const queryStart = hash.indexOf('?')
  return queryStart >= 0 ? new URLSearchParams(hash.slice(queryStart + 1)) : new URLSearchParams()
}

const buildTemplateHash = (updates: Record<string, string | undefined>) => {
  const params = templateHashParams(route.hash)
  for (const [key, value] of Object.entries(updates)) {
    if (value) params.set(key, value)
    else params.delete(key)
  }
  params.delete('tag')
  const query = params.toString()
  return query ? `#templates?${query}` : '#templates'
}

watch(
  () => route.hash,
  (hash) => {
    headerSearch.value = templateHashParams(hash).get('q') || ''
  },
  { immediate: true },
)

const categoryLink = (category: MarketplaceCategory) => ({
  path: p('/'),
  hash: `#templates?category=${encodeURIComponent(category.id)}`,
})

const applyHeaderSearch = async () => {
  await navigateTo({
    path: p('/'),
    hash: buildTemplateHash({ q: headerSearch.value.trim() || undefined }),
  })
}
</script>

<template>
  <div class="template-marketplace-frame">
    <header class="tm-header">
      <div class="tm-container tm-header-inner">
        <NuxtLink :to="p('/')" class="tm-brand" aria-label="TemplateMarket home">
          <span class="tm-brand-mark" aria-hidden="true"></span>
          <span>{{ site.name }}</span>
        </NuxtLink>

        <nav class="tm-nav" aria-label="Primary navigation">
          <NuxtLink :to="browseLink">
            {{ browseItem.label }}
          </NuxtLink>

          <div class="tm-category-menu">
            <button type="button" class="tm-category-menu-trigger">
              {{ categoriesLabel }} <span aria-hidden="true"></span>
            </button>
            <div class="tm-category-menu-panel">
              <NuxtLink
                v-for="category in categories"
                :key="category.id"
                :to="categoryLink(category)"
              >
                <strong>{{ category.name }}</strong>
                <small>{{ category.description }}</small>
              </NuxtLink>
            </div>
          </div>

          <NuxtLink :to="freeTemplatesLink">
            {{ freeTemplatesItem.label }}
          </NuxtLink>
        </nav>

        <form class="tm-search" role="search" @submit.prevent="applyHeaderSearch">
          <span aria-hidden="true">⌕</span>
          <input v-model="headerSearch" type="search" :placeholder="searchPlaceholder">
          <kbd>↵</kbd>
        </form>

        <div class="tm-header-actions">
          <LanguageSelect />
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
