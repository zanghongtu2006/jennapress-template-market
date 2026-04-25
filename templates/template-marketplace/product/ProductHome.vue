<script setup lang="ts">
import type { BlogCategory, Product, SiteConfig } from '~/types'
import '~/templates/template-marketplace/template.css'

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

const p = (path: string) =>
  props.locale && props.locale !== props.defaultLocale ? `/${props.locale}${path}` : path

const isZh = computed(() => props.locale === 'zh')
const copy = computed(() => isZh.value ? {
  heroTitle: '发现高质量网站模板',
  heroDescription: '适用于博客、落地页、作品集、文档、电商和内容站的精美响应式模板。',
  browse: '浏览模板',
  creator: '成为作者',
  trusted: '已被 20,000+ 开发者和创作者信任',
  categories: '分类',
  featured: '精选模板',
  viewAll: '查看全部模板',
  preview: '预览',
  details: '详情',
  downloads: '下载',
  ctaTitle: '创建，分享，赚取收益。',
  ctaDescription: '加入创作者社区，提交你的模板并触达全球用户。',
  learnMore: '了解更多',
  creatorCta: '成为作者',
  creatorStat: 'Thousand+ creators are earning with us'
} : {
  heroTitle: 'Discover high-quality website templates',
  heroDescription: 'Beautiful, responsive templates for blogs, landing pages, portfolios, docs, ecommerce, and content sites.',
  browse: 'Browse Templates',
  creator: 'Become a Creator',
  trusted: 'Trusted by 20,000+ developers and creators worldwide',
  categories: 'Categories',
  featured: 'Featured Templates',
  viewAll: 'View all templates',
  preview: 'Preview',
  details: 'Details',
  downloads: 'downloads',
  ctaTitle: 'Create. Share. Earn.',
  ctaDescription: 'Join thousands of creators earning with their templates. Submit your template and reach a worldwide audience.',
  learnMore: 'Learn More',
  creatorCta: 'Become a Creator',
  creatorStat: 'Thousand+ creators are earning with us'
})

const categoryOrder = ['blog', 'portfolio', 'docs', 'landing-page', 'e-commerce', 'ai-tools']
const sortedCategories = computed(() => [...props.categories].sort((a, b) => {
  const aIndex = categoryOrder.indexOf(a.slug)
  const bIndex = categoryOrder.indexOf(b.slug)
  return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex)
}))

const marketProducts = computed(() => props.products as MarketplaceProduct[])
const featuredProducts = computed(() => {
  const featured = marketProducts.value.filter(product => product.featured).slice(0, 3)
  return featured.length ? featured : marketProducts.value.slice(0, 3)
})
const heroProducts = computed(() => marketProducts.value.slice(0, 3))

const productPath = (product: Product) => p(`/products/${product.categoryMeta?.slug || 'general'}/${product.slug}`)
const categoryIcon = (slug: string) => ({
  blog: '▤',
  portfolio: '♙',
  docs: '▣',
  'landing-page': '✦',
  'e-commerce': '🛒',
  'ai-tools': '✺'
}[slug] || '◇')
const priceLabel = () => '0元'
</script>

<template>
  <div class="tm-product-home">
    <section class="tm-container tm-hero">
      <div class="tm-hero-copy">
        <h1>{{ copy.heroTitle }}</h1>
        <p>{{ copy.heroDescription }}</p>
        <div class="tm-hero-actions">
          <NuxtLink :to="p('/')" class="tm-button tm-button-primary">▦ {{ copy.browse }}</NuxtLink>
          <a href="https://example.com/submit" target="_blank" rel="noopener noreferrer" class="tm-button tm-button-secondary">♙ {{ copy.creator }}</a>
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

    <section v-if="sortedCategories.length" class="tm-container tm-category-row" :aria-label="copy.categories">
      <NuxtLink
        v-for="category in sortedCategories"
        :key="category.slug"
        :to="p(`/products/${category.slug}`)"
        class="tm-category-card"
      >
        <span class="tm-category-icon">{{ categoryIcon(category.slug) }}</span>
        <span>
          <strong>{{ category.label }}</strong>
          <small>{{ category.description }}</small>
        </span>
      </NuxtLink>
    </section>

    <section v-if="featuredProducts.length" class="tm-container tm-section">
      <div class="tm-section-head">
        <h2>{{ copy.featured }}</h2>
        <NuxtLink :to="p('/')" class="tm-text-link">{{ copy.viewAll }} →</NuxtLink>
      </div>

      <div class="tm-card-grid">
        <article v-for="product in featuredProducts" :key="product.slug" class="tm-template-card">
          <NuxtLink :to="productPath(product)" class="tm-card-media">
            <span class="tm-price-badge">{{ priceLabel() }}</span>
            <img :src="product.coverImage" :alt="product.title">
          </NuxtLink>
          <div class="tm-card-body">
            <h3><NuxtLink :to="productPath(product)">{{ product.title }}</NuxtLink></h3>
            <p>{{ product.description }}</p>
            <div class="tm-tags">
              <span v-for="tag in product.tags.slice(0, 3)" :key="tag">{{ tag }}</span>
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
            <NuxtLink :to="productPath(product)">{{ copy.details }}</NuxtLink>
          </div>
        </article>
      </div>
    </section>

    <section class="tm-container tm-creator-banner">
      <div class="tm-rocket" aria-hidden="true">✦</div>
      <div>
        <h2>{{ copy.ctaTitle }}</h2>
        <p>{{ copy.ctaDescription }}</p>
      </div>
      <div class="tm-creator-actions">
        <a href="https://example.com/learn-more" target="_blank" rel="noopener noreferrer" class="tm-button tm-button-secondary">{{ copy.learnMore }}</a>
        <a href="https://example.com/submit" target="_blank" rel="noopener noreferrer" class="tm-button tm-button-primary">{{ copy.creatorCta }}</a>
      </div>
      <div class="tm-creator-proof">
        <div class="tm-avatar-stack" aria-hidden="true">
          <img src="/template-assets/template-marketplace/avatar-1.svg" alt="">
          <img src="/template-assets/template-marketplace/avatar-2.svg" alt="">
          <img src="/template-assets/template-marketplace/avatar-3.svg" alt="">
        </div>
        <p>{{ copy.creatorStat }}</p>
      </div>
    </section>
  </div>
</template>
