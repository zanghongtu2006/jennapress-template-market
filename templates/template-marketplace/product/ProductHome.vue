<script setup lang="ts">
import type { BlogCategory, BlogCategoryAccent, Product, SiteConfig } from '~/types'
import '~/templates/template-marketplace/template.css'

type MarketplaceCategory = { id: string; name: string; description: string; featured?: boolean }

type MarketplaceProduct = Product & {
  previewUrl?: string
  rating?: number
  reviews?: number
  authorAvatar?: string
  featured?: boolean
}

const props = defineProps<{
  site: SiteConfig
  locale?: string
  defaultLocale?: string
  categories: BlogCategory[]
  products: Product[]
  sections: Array<{ category: BlogCategory; products: Product[] }>
}>()

const route = useRoute()
const p = (path: string) =>
  props.locale && props.locale !== props.defaultLocale ? `/${props.locale}${path}` : path

const isZh = computed(() => props.locale === 'zh')
const copy = computed(() => isZh.value ? {
  heroTitle: '发现高质量网站模板',
  heroDescription: '适用于博客、落地页、作品集、文档、电商和内容站的精美响应式模板。所有模板都是 0元 免费下载。',
  browse: '浏览模板',
  freeTemplates: '查看免费模板',
  trusted: '已被 20,000+ 开发者和创作者信任',
  categories: '热门分类',
  allCategories: '全部分类',
  filters: '筛选模板',
  search: '搜索',
  searchPlaceholder: '搜索标题、描述或标签...',
  tags: '标签',
  clear: '清除筛选',
  all: '全部',
  results: '模板结果',
  noResults: '没有找到匹配模板，请清除筛选或换一个关键词。',
  preview: '预览',
  details: '详情',
  downloads: '下载',
  download: '下载 ZIP',
  ctaTitle: '预览，下载，快速建站。',
  ctaDescription: '每个模板都是一个 product，价格固定展示为 0元，并提供外部预览链接与 ZIP 下载地址。',
  learnMore: '浏览全部',
  creatorCta: '清除筛选',
  resultSuffix: '个模板'
} : {
  heroTitle: 'Discover high-quality website templates',
  heroDescription: 'Beautiful, responsive templates for blogs, landing pages, portfolios, docs, ecommerce, and content sites. Every template is free and clearly marked as 0元.',
  browse: 'Browse Templates',
  freeTemplates: 'Free Templates',
  trusted: 'Trusted by 20,000+ developers and creators worldwide',
  categories: 'Popular Categories',
  allCategories: 'All Categories',
  filters: 'Filter templates',
  search: 'Search',
  searchPlaceholder: 'Search title, description, or tags...',
  tags: 'Tags',
  clear: 'Clear filters',
  all: 'All',
  results: 'Template Results',
  noResults: 'No matching templates. Clear filters or try another keyword.',
  preview: 'Preview',
  details: 'Details',
  downloads: 'downloads',
  download: 'Download ZIP',
  ctaTitle: 'Preview. Download. Build faster.',
  ctaDescription: 'Each template is modeled as a product, displays the 0元 price, and provides external preview and ZIP download links.',
  learnMore: 'Browse all',
  creatorCta: 'Clear filters',
  resultSuffix: 'templates'
})

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
const featuredCategorySlugs = categoryOrder.slice(0, 6)

const marketProducts = computed(() => props.products as MarketplaceProduct[])
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
const sortedCategories = computed(() => {
  if (categoryRegistry.value.length) {
    return categoryRegistry.value.map((item) => toCategoryMeta(item, props.categories.find(category => category.slug === item.id)))
  }
  return sortByRegistry(props.categories)
})
const featuredCategories = computed(() => {
  if (categoryRegistry.value.length) {
    const featured = categoryRegistry.value.filter(category => category.featured !== false).map(category => category.id)
    return sortedCategories.value.filter(category => featured.includes(category.slug))
  }
  return sortedCategories.value.filter(category => featuredCategorySlugs.includes(category.slug))
})
const heroProducts = computed(() => marketProducts.value.filter(product => product.featured).slice(0, 3))

const queryValue = (value: unknown) => Array.isArray(value) ? value[0] : value
const activeCategory = computed(() => String(queryValue(route.query.category) || ''))
const activeTags = computed(() => {
  const raw = queryValue(route.query.tags ?? route.query.tag)
  if (typeof raw !== 'string' || !raw.trim()) return []
  return raw.split(',').map(tag => tag.trim()).filter(Boolean)
})
const searchInput = ref('')
const activeSearch = computed(() => String(queryValue(route.query.q) || '').trim())

watch(
  () => route.query.q,
  () => {
    searchInput.value = activeSearch.value
  },
  { immediate: true },
)

const productPath = (product: Product) => p(`/products/${product.categoryMeta?.slug || 'general'}/${product.slug}`)
const priceLabel = () => '0元'
const normalize = (value: string) => value.toLowerCase().trim()

const categoryIcon = (slug: string) => ({
  'blog-editorial': '▤',
  'portfolio-agency': '♙',
  'landing-page': '✦',
  documentation: '▣',
  'saas-startup': '◈',
  'ecommerce-catalog': '🛒',
  'business-services': '◧',
  'community-education': '◎'
}[slug] || '◇')

const categoryCounts = computed(() => {
  const counts: Record<string, number> = {}
  for (const product of marketProducts.value) {
    const slug = product.categoryMeta?.slug || ''
    counts[slug] = (counts[slug] || 0) + 1
  }
  return counts
})

const tagCounts = computed(() => {
  const counts = new Map<string, { label: string; count: number }>()
  for (const product of marketProducts.value) {
    for (const tag of product.tags || []) {
      const key = normalize(tag)
      const entry = counts.get(key)
      if (entry) {
        entry.count += 1
      } else {
        counts.set(key, { label: tag, count: 1 })
      }
    }
  }
  return [...counts.values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
})

const filteredProducts = computed(() => {
  const category = activeCategory.value
  const tags = activeTags.value.map(normalize)
  const keyword = normalize(activeSearch.value)

  return marketProducts.value.filter((product) => {
    const categoryMatch = !category || product.categoryMeta?.slug === category
    const productTags = (product.tags || []).map(normalize)
    const tagsMatch = tags.length === 0 || tags.every(tag => productTags.includes(tag))
    const searchable = [
      product.title,
      product.description,
      product.categoryMeta?.label,
      ...(product.tags || []),
    ].filter(Boolean).join(' ').toLowerCase()
    const searchMatch = !keyword || searchable.includes(keyword)
    return categoryMatch && tagsMatch && searchMatch
  })
})

const queryWith = (updates: Record<string, string | undefined>) => {
  const query: Record<string, string> = {}
  for (const [key, value] of Object.entries(route.query)) {
    const item = Array.isArray(value) ? value[0] : value
    if (typeof item === 'string' && item) query[key] = item
  }
  for (const [key, value] of Object.entries(updates)) {
    if (value) query[key] = value
    else delete query[key]
  }
  delete query.tag
  return query
}

const allTemplatesLink = computed(() => ({ path: p('/'), hash: '#templates' }))
const categoryLink = (slug: string) => ({ path: p('/'), query: queryWith({ category: slug || undefined }), hash: '#templates' })
const tagLink = (tag: string) => {
  const key = normalize(tag)
  const selected = activeTags.value.map(normalize)
  const next = selected.includes(key)
    ? activeTags.value.filter(item => normalize(item) !== key)
    : [...activeTags.value, tag]
  return { path: p('/'), query: queryWith({ tags: next.join(',') || undefined }), hash: '#templates' }
}

const applySearch = async () => {
  await navigateTo({
    path: p('/'),
    query: queryWith({ q: searchInput.value.trim() || undefined }),
    hash: '#templates',
  })
}
</script>

<template>
  <div class="tm-product-home">
    <section class="tm-container tm-hero">
      <div class="tm-hero-copy">
        <h1>{{ copy.heroTitle }}</h1>
        <p>{{ copy.heroDescription }}</p>
        <div class="tm-hero-actions">
          <NuxtLink :to="{ path: p('/'), hash: '#templates' }" class="tm-button tm-button-primary">▦ {{ copy.browse }}</NuxtLink>
          <NuxtLink :to="allTemplatesLink" class="tm-button tm-button-secondary">{{ copy.freeTemplates }}</NuxtLink>
        </div>
        <div class="tm-trust-row">
          <div class="tm-avatar-stack" aria-hidden="true">
            <img src="/template-assets/template-marketplace/avatar-1.svg" alt="">
            <img src="/template-assets/template-marketplace/avatar-2.svg" alt="">
            <img src="/template-assets/template-marketplace/avatar-3.svg" alt="">
            <span>+2k</span>
          </div>
          <p>{{ copy.trusted }}</p>
        </div>
      </div>

      <div class="tm-hero-visual" aria-label="Template preview collage">
        <div class="tm-hero-orb tm-hero-orb-a"></div>
        <div class="tm-hero-orb tm-hero-orb-b"></div>
        <article
          v-for="(product, index) in heroProducts"
          :key="product.slug"
          class="tm-floating-preview"
          :class="`is-card-${index + 1}`"
        >
          <img :src="product.coverImage" :alt="product.title">
        </article>
      </div>
    </section>

    <section v-if="featuredCategories.length" class="tm-container tm-category-row" :aria-label="copy.categories">
      <NuxtLink
        v-for="category in featuredCategories"
        :key="category.slug"
        :to="categoryLink(category.slug)"
        class="tm-category-card"
        :class="{ 'is-active': activeCategory === category.slug }"
      >
        <span class="tm-category-icon">{{ categoryIcon(category.slug) }}</span>
        <span>
          <strong>{{ category.label }}</strong>
          <small>{{ category.description }}</small>
        </span>
      </NuxtLink>
    </section>

    <section id="templates" class="tm-container tm-section tm-marketplace-section">
      <div class="tm-section-head">
        <div>
          <h2>{{ copy.results }}</h2>
          <p class="tm-section-subtitle">{{ filteredProducts.length }} {{ copy.resultSuffix }}</p>
        </div>
        <NuxtLink :to="allTemplatesLink" class="tm-text-link">{{ copy.clear }}</NuxtLink>
      </div>

      <div class="tm-marketplace-layout">
        <aside class="tm-filter-panel">
          <form class="tm-filter-search" @submit.prevent="applySearch">
            <label>{{ copy.search }}</label>
            <div>
              <input v-model="searchInput" type="search" :placeholder="copy.searchPlaceholder">
              <button type="submit">⌕</button>
            </div>
          </form>

          <div class="tm-filter-group">
            <h3>{{ copy.allCategories }}</h3>
            <NuxtLink
              :to="categoryLink('')"
              class="tm-filter-option"
              :class="{ 'is-active': !activeCategory }"
            >
              <span>{{ copy.all }}</span>
              <small>{{ marketProducts.length }}</small>
            </NuxtLink>
            <NuxtLink
              v-for="category in sortedCategories"
              :key="category.slug"
              :to="categoryLink(category.slug)"
              class="tm-filter-option"
              :class="{ 'is-active': activeCategory === category.slug }"
            >
              <span>{{ category.label }}</span>
              <small>{{ categoryCounts[category.slug] || 0 }}</small>
            </NuxtLink>
          </div>

          <div class="tm-filter-group">
            <h3>{{ copy.tags }}</h3>
            <div class="tm-filter-tags">
              <NuxtLink
                v-for="tag in tagCounts"
                :key="tag.label"
                :to="tagLink(tag.label)"
                class="tm-filter-tag"
                :class="{ 'is-active': activeTags.map(normalize).includes(normalize(tag.label)) }"
              >
                {{ tag.label }} <small>{{ tag.count }}</small>
              </NuxtLink>
            </div>
          </div>
        </aside>

        <div class="tm-results-panel">
          <div v-if="filteredProducts.length" class="tm-card-grid">
            <article v-for="product in filteredProducts" :key="product.slug" class="tm-template-card">
              <NuxtLink :to="productPath(product)" class="tm-card-media">
                <span class="tm-price-badge">{{ priceLabel() }}</span>
                <img :src="product.coverImage" :alt="product.title">
              </NuxtLink>
              <div class="tm-card-body">
                <h3><NuxtLink :to="productPath(product)">{{ product.title }}</NuxtLink></h3>
                <p>{{ product.description }}</p>
                <div class="tm-tags">
                  <span v-for="tag in product.tags.slice(0, 4)" :key="tag">{{ tag }}</span>
                </div>
              </div>
              <footer class="tm-card-footer">
                <span class="tm-author">
                  <img :src="product.authorAvatar || '/template-assets/template-marketplace/avatar-1.svg'" :alt="product.author">
                  by {{ product.author }}
                </span>
                <span>★ {{ product.rating || 4.8 }} ({{ product.reviews || 96 }})</span>
                <span>⇩ {{ product.downloadCount.toLocaleString('en-US') }}</span>
              </footer>
              <div class="tm-card-actions">
                <a
                  :href="product.previewUrl || 'https://example.com/preview'"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ copy.preview }}
                </a>
                <a :href="product.downloadUrl" target="_blank" rel="noopener noreferrer">{{ copy.download }}</a>
                <NuxtLink :to="productPath(product)">{{ copy.details }}</NuxtLink>
              </div>
            </article>
          </div>
          <div v-else class="tm-empty-state">
            <h3>{{ copy.noResults }}</h3>
            <NuxtLink :to="allTemplatesLink" class="tm-button tm-button-primary">{{ copy.clear }}</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section class="tm-container tm-creator-banner">
      <div class="tm-rocket" aria-hidden="true">✦</div>
      <div>
        <h2>{{ copy.ctaTitle }}</h2>
        <p>{{ copy.ctaDescription }}</p>
      </div>
      <div class="tm-creator-actions">
        <NuxtLink :to="allTemplatesLink" class="tm-button tm-button-secondary">{{ copy.learnMore }}</NuxtLink>
        <NuxtLink :to="allTemplatesLink" class="tm-button tm-button-primary">{{ copy.creatorCta }}</NuxtLink>
      </div>
      <div class="tm-creator-proof">
        <div class="tm-avatar-stack" aria-hidden="true">
          <img src="/template-assets/template-marketplace/avatar-1.svg" alt="">
          <img src="/template-assets/template-marketplace/avatar-2.svg" alt="">
          <img src="/template-assets/template-marketplace/avatar-3.svg" alt="">
        </div>
        <p>0元</p>
      </div>
    </section>
  </div>
</template>
