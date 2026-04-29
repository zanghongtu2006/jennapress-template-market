<script setup lang="ts">
import type { BlogCategoryAccent, SiteConfig, TemplateIndexCategory, TemplateIndexItem } from '~/types'
import '~/templates/template-marketplace/template.css'

type MarketplaceCategory = { id: string; name: string; description: string; featured?: boolean }
type CategoryView = {
  key: string
  slug: string
  label: string
  description: string
  accent: BlogCategoryAccent
  listTitle: string
  count: number
}

const props = withDefaults(defineProps<{
  site: SiteConfig
  locale?: string
  defaultLocale?: string
}>(), {
  locale: 'en',
  defaultLocale: 'en',
})

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
  loading: '正在加载模板索引...',
  loadError: '模板索引加载失败，请稍后重试。',
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
  loading: 'Loading template index...',
  loadError: 'Failed to load template index. Please try again later.',
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

const { data: indexData, pending: indexPending, error: indexError } = await useTemplateIndex(computed(() => props.locale || props.defaultLocale || 'en'))

const marketProducts = computed(() => indexData.value?.items ?? [])
const indexCategories = computed(() => indexData.value?.categories ?? [])
const categoryRegistry = computed(() => ((props.site as SiteConfig & { marketplaceCategories?: MarketplaceCategory[] }).marketplaceCategories ?? []))

const categoryIndex = computed(() => {
  const map = new Map<string, TemplateIndexCategory>()
  for (const category of indexCategories.value) {
    map.set(category.id, category)
  }
  return map
})

const toCategoryView = (item: MarketplaceCategory): CategoryView => {
  const indexed = categoryIndex.value.get(item.id)
  return {
    key: item.id,
    slug: item.id,
    label: item.name || indexed?.label || item.id,
    description: item.description || indexed?.description || '',
    accent: 'default',
    listTitle: item.name || indexed?.label || item.id,
    count: indexed?.count || 0,
  }
}

const sortByRegistry = (items: CategoryView[]) => [...items].sort((a, b) => {
  const aIndex = categoryOrder.indexOf(a.slug)
  const bIndex = categoryOrder.indexOf(b.slug)
  return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex)
})

const sortedCategories = computed(() => {
  if (categoryRegistry.value.length) {
    return sortByRegistry(categoryRegistry.value.map(toCategoryView))
  }
  return sortByRegistry(indexCategories.value.map(category => ({
    key: category.id,
    slug: category.id,
    label: category.label,
    description: category.description || '',
    accent: 'default' as BlogCategoryAccent,
    listTitle: category.label,
    count: category.count,
  })))
})

const featuredCategories = computed(() => {
  if (categoryRegistry.value.length) {
    const featured = categoryRegistry.value.filter(category => category.featured !== false).map(category => category.id)
    return sortedCategories.value.filter(category => featured.includes(category.slug))
  }
  return sortedCategories.value.filter(category => featuredCategorySlugs.includes(category.slug))
})
const heroProducts = computed(() => {
  const featured = marketProducts.value.filter(product => product.featured).slice(0, 3)
  return featured.length ? featured : marketProducts.value.slice(0, 3)
})

const selectedCategory = ref('')
const selectedTags = ref<string[]>([])
const searchInput = ref('')
const normalize = (value: string) => value.toLowerCase().trim()

const templateHashParams = (hash: string) => {
  if (!hash.startsWith('#templates')) return new URLSearchParams()
  const queryStart = hash.indexOf('?')
  return queryStart >= 0 ? new URLSearchParams(hash.slice(queryStart + 1)) : new URLSearchParams()
}

const syncFromHash = (hash: string) => {
  if (!hash.startsWith('#templates')) return
  const params = templateHashParams(hash)
  selectedCategory.value = params.get('category') || ''
  selectedTags.value = (params.get('tags') || '')
    .split(',')
    .map(tag => tag.trim())
    .filter(Boolean)
  searchInput.value = params.get('q') || ''
}

watch(() => route.hash, syncFromHash, { immediate: true })

const buildTemplateHash = () => {
  const params = new URLSearchParams()
  if (selectedCategory.value) params.set('category', selectedCategory.value)
  if (selectedTags.value.length) params.set('tags', selectedTags.value.join(','))
  if (searchInput.value.trim()) params.set('q', searchInput.value.trim())
  const query = params.toString()
  return query ? `#templates?${query}` : '#templates'
}

const updateHash = async () => {
  await navigateTo({ path: p('/'), hash: buildTemplateHash() })
}

const setCategory = async (slug: string) => {
  selectedCategory.value = slug
  await updateHash()
}

const toggleTag = async (tag: string) => {
  const key = normalize(tag)
  const selected = selectedTags.value.map(normalize)
  selectedTags.value = selected.includes(key)
    ? selectedTags.value.filter(item => normalize(item) !== key)
    : [...selectedTags.value, tag]
  await updateHash()
}

const applySearch = async () => {
  await updateHash()
}

const clearFilters = async () => {
  selectedCategory.value = ''
  selectedTags.value = []
  searchInput.value = ''
  await updateHash()
}

const productPath = (product: TemplateIndexItem) => product.url || p(`/products/${product.category || 'general'}/${product.slug}`)
const priceLabel = () => '0元'

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
  for (const category of sortedCategories.value) {
    counts[category.slug] = category.count
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
  const category = selectedCategory.value
  const tags = selectedTags.value.map(normalize)
  const keyword = normalize(searchInput.value)

  return marketProducts.value.filter((product) => {
    const categoryMatch = !category || product.category === category
    const productTags = (product.tags || []).map(normalize)
    const tagsMatch = tags.length === 0 || tags.every(tag => productTags.includes(tag))
    const searchable = [
      product.title,
      product.name,
      product.description,
      product.categoryLabel,
      product.categoryDescription,
      ...(product.tags || []),
    ].filter(Boolean).join(' ').toLowerCase()
    const searchMatch = !keyword || searchable.includes(keyword)
    return categoryMatch && tagsMatch && searchMatch
  })
})

const allTemplatesLink = computed(() => ({ path: p('/'), hash: '#templates' }))
const selectedTagKeys = computed(() => selectedTags.value.map(normalize))
</script>

<template>
  <div class="tm-product-home">
    <section class="tm-container tm-hero">
      <div class="tm-hero-copy">
        <h1>{{ copy.heroTitle }}</h1>
        <p>{{ copy.heroDescription }}</p>
        <div class="tm-hero-actions">
          <NuxtLink :to="allTemplatesLink" class="tm-button tm-button-primary">▦ {{ copy.browse }}</NuxtLink>
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
          <img :src="product.coverImage || product.previewImage" :alt="product.title">
        </article>
      </div>
    </section>

    <section v-if="featuredCategories.length" class="tm-container tm-category-row" :aria-label="copy.categories">
      <button
        v-for="category in featuredCategories"
        :key="category.slug"
        type="button"
        class="tm-category-card"
        :class="{ 'is-active': selectedCategory === category.slug }"
        @click="setCategory(category.slug)"
      >
        <span class="tm-category-icon">{{ categoryIcon(category.slug) }}</span>
        <span>
          <strong>{{ category.label }}</strong>
          <small>{{ category.description }}</small>
        </span>
      </button>
    </section>

    <section id="templates" class="tm-container tm-section tm-marketplace-section">
      <div class="tm-section-head">
        <div>
          <h2>{{ copy.results }}</h2>
          <p class="tm-section-subtitle">{{ filteredProducts.length }} {{ copy.resultSuffix }}</p>
        </div>
        <button type="button" class="tm-text-link tm-link-button" @click="clearFilters">{{ copy.clear }}</button>
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
            <button
              type="button"
              class="tm-filter-option"
              :class="{ 'is-active': !selectedCategory }"
              @click="setCategory('')"
            >
              <span>{{ copy.all }}</span>
              <small>{{ marketProducts.length }}</small>
            </button>
            <button
              v-for="category in sortedCategories"
              :key="category.slug"
              type="button"
              class="tm-filter-option"
              :class="{ 'is-active': selectedCategory === category.slug }"
              @click="setCategory(category.slug)"
            >
              <span>{{ category.label }}</span>
              <small>{{ categoryCounts[category.slug] || 0 }}</small>
            </button>
          </div>

          <div class="tm-filter-group">
            <h3>{{ copy.tags }}</h3>
            <div class="tm-filter-tags">
              <button
                v-for="tag in tagCounts"
                :key="tag.label"
                type="button"
                class="tm-filter-tag"
                :class="{ 'is-active': selectedTagKeys.includes(normalize(tag.label)) }"
                @click="toggleTag(tag.label)"
              >
                {{ tag.label }} <small>{{ tag.count }}</small>
              </button>
            </div>
          </div>
        </aside>

        <div class="tm-results-panel">
          <div v-if="indexPending" class="tm-empty-state">
            <h3>{{ copy.loading }}</h3>
          </div>
          <div v-else-if="indexError" class="tm-empty-state">
            <h3>{{ copy.loadError }}</h3>
          </div>
          <div v-else-if="filteredProducts.length" class="tm-card-grid">
            <article v-for="product in filteredProducts" :key="product.slug" class="tm-template-card">
              <NuxtLink :to="productPath(product)" class="tm-card-media">
                <span class="tm-price-badge">{{ priceLabel() }}</span>
                <img :src="product.coverImage || product.previewImage" :alt="product.title">
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
            <button type="button" class="tm-button tm-button-primary" @click="clearFilters">{{ copy.clear }}</button>
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
        <button type="button" class="tm-button tm-button-primary" @click="clearFilters">{{ copy.creatorCta }}</button>
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
