<script setup lang="ts">
import type { BlogCategory, Product, SiteConfig } from '~/types'
import '~/templates/template-marketplace/template.css'

type MarketplaceProduct = Product & {
  previewUrl?: string
  rating?: number
  reviews?: number
  authorAvatar?: string
}

const props = defineProps<{
  site: SiteConfig
  locale?: string
  defaultLocale?: string
  categories: BlogCategory[]
  category: BlogCategory | null
  products: Product[]
}>()

const p = (path: string) =>
  props.locale && props.locale !== props.defaultLocale ? `/${props.locale}${path}` : path

const isZh = computed(() => props.locale === 'zh')
const copy = computed(() => isZh.value ? {
  all: '全部模板',
  preview: '预览',
  details: '详情',
  download: '下载 ZIP',
  fallbackTitle: '模板',
  fallbackDescription: '浏览 0元 免费下载模板。'
} : {
  all: 'All Templates',
  preview: 'Preview',
  details: 'Details',
  download: 'Download ZIP',
  fallbackTitle: 'Templates',
  fallbackDescription: 'Browse free downloadable templates marked as 0元.'
})

const productPath = (product: Product) => p(`/products/${product.categoryMeta?.slug || 'general'}/${product.slug}`)
const marketProducts = computed(() => props.products as MarketplaceProduct[])
const priceLabel = () => '0元'
const homeCategoryLink = (slug?: string) => ({
  path: p('/'),
  query: slug ? { category: slug } : {},
  hash: '#templates',
})
</script>

<template>
  <div class="tm-product-category">
    <section class="tm-container tm-category-hero">
      <NuxtLink :to="homeCategoryLink()" class="tm-breadcrumb">← TemplateMarket</NuxtLink>
      <h1>{{ category?.label || copy.fallbackTitle }}</h1>
      <p>{{ category?.description || copy.fallbackDescription }}</p>
    </section>

    <section class="tm-container tm-category-tabs" aria-label="Template categories">
      <NuxtLink :to="homeCategoryLink()" class="tm-category-tab">{{ copy.all }}</NuxtLink>
      <NuxtLink
        v-for="item in categories"
        :key="item.slug"
        :to="homeCategoryLink(item.slug)"
        class="tm-category-tab"
        :class="{ 'is-active': item.slug === category?.slug }"
      >
        {{ item.label }}
      </NuxtLink>
    </section>

    <section class="tm-container tm-section">
      <div class="tm-card-grid">
        <article v-for="product in marketProducts" :key="product.slug" class="tm-template-card">
          <NuxtLink :to="productPath(product)" class="tm-card-media">
            <span class="tm-price-badge">{{ priceLabel() }}</span>
            <img :src="product.coverImage" :alt="product.title">
          </NuxtLink>
          <div class="tm-card-body">
            <h2><NuxtLink :to="productPath(product)">{{ product.title }}</NuxtLink></h2>
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
            <span>★ {{ product.rating || 4.8 }}</span>
            <span>⇩ {{ product.downloadCount.toLocaleString('en-US') }}</span>
          </footer>
          <div class="tm-card-actions">
            <a :href="product.previewUrl || 'https://example.com/preview'" target="_blank" rel="noopener noreferrer">{{ copy.preview }}</a>
            <a :href="product.downloadUrl" target="_blank" rel="noopener noreferrer">{{ copy.download }}</a>
            <NuxtLink :to="productPath(product)">{{ copy.details }}</NuxtLink>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>
