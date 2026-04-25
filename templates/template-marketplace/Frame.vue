<script setup lang="ts">
import type { BlogCategory, BlogCategoryAccent, SiteConfig } from '~/types'
import { DEFAULT_LOCALE, stripLocalePrefixFromPath } from '~/lib/i18n'
import { fetchProductCategories } from '~/composables/useContentData'
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

const { data: categoriesData } = await useAsyncData<BlogCategory[]>(
  () => `frame-products:${currentLocale.value}:categories`,
  () => fetchProductCategories(currentLocale.value),
  { watch: [currentLocale] },
)

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
const toCategoryMeta = (item: MarketplaceCategory, fallback?: BlogCategory): BlogCategory => ({
  key: fallback?.key || item.id,
  slug: item.id,
  label: item.name,
  description: item.description,
  accent: (fallback?.accent || 'default') as BlogCategoryAccent,
  listTitle: fallback?.listTitle || item.name,
})
const sortByRegistry = (items: BlogCategory[]) => [...items].sort((a, b) => {
  const aIndex = categoryOrder.indexOf(a.slug)
  const bIndex = categoryOrder.indexOf(b.slug)
  return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex)
})
const categories = computed(() => {
  const fetched = categoriesData.value ?? []
  if (categoryRegistry.value.length) {
    return categoryRegistry.value.map((item) => toCategoryMeta(item, fetched.find(category => category.slug === item.id)))
  }
  return sortByRegistry(fetched)
})

const browseItem = computed(() => props.site.nav?.[0] ?? { label: isZh.value ? '浏览' : 'Browse', to: p('/') })
const freeTemplatesItem = computed(() => props.site.nav?.[1] ?? { label: isZh.value ? '免费模板' : 'Free Templates', to: p('/#templates') })
const categoriesLabel = computed(() => isZh.value ? '分类' : 'Categories')
const searchPlaceholder = computed(() => props.site.tagline || (isZh.value ? '搜索模板...' : 'Search templates...'))

watch(
  () => route.query.q,
  (value) => {
    headerSearch.value = typeof value === 'string' ? value : ''
  },
  { immediate: true },
)

const categoryLink = (category: BlogCategory) => ({
  path: p('/'),
  query: { category: category.slug },
  hash: '#templates',
})

const applyHeaderSearch = async () => {
  const query = { ...route.query }
  const term = headerSearch.value.trim()
  if (term) {
    query.q = term
  } else {
    delete query.q
  }

  await navigateTo({
    path: p('/'),
    query,
    hash: '#templates',
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
          <NuxtLink :to="browseItem.to">
            {{ browseItem.label }}
          </NuxtLink>

          <div class="tm-category-menu">
            <button type="button" class="tm-category-menu-trigger">
              {{ categoriesLabel }} <span aria-hidden="true"></span>
            </button>
            <div class="tm-category-menu-panel">
              <NuxtLink
                v-for="category in categories"
                :key="category.slug"
                :to="categoryLink(category)"
              >
                <strong>{{ category.label }}</strong>
                <small>{{ category.description }}</small>
              </NuxtLink>
            </div>
          </div>

          <NuxtLink :to="freeTemplatesItem.to">
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
