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
  category: BlogCategory | null
  product: Product | null
}>()

const p = (path: string) =>
  props.locale && props.locale !== props.defaultLocale ? `/${props.locale}${path}` : path

const isZh = computed(() => props.locale === 'zh')
const copy = computed(() => isZh.value ? {
  templates: '模板',
  priceDescription: '0元 免费下载模板包。下载链接为外部 ZIP 占位地址。',
  download: '下载 ZIP',
  preview: '在线预览',
  rating: '评分',
  downloads: '下载量',
  updated: '更新',
  author: '作者',
  reviews: '条评价'
} : {
  templates: 'Templates',
  priceDescription: 'Free downloadable template package marked as 0元. The download link points to an external ZIP placeholder.',
  download: 'Download ZIP',
  preview: 'Live Preview',
  rating: 'Rating',
  downloads: 'Downloads',
  updated: 'Updated',
  author: 'Author',
  reviews: 'reviews'
})

const item = computed(() => props.product as MarketplaceProduct | null)
const priceLabel = () => '0元'
const categoryHomeLink = computed(() => ({
  path: p('/'),
  query: props.category?.slug ? { category: props.category.slug } : {},
  hash: '#templates',
}))
</script>

<template>
  <article v-if="item" class="tm-product-detail">
    <section class="tm-container tm-detail-hero">
      <div class="tm-detail-copy">
        <div class="tm-breadcrumbs">
          <NuxtLink :to="{ path: p('/'), hash: '#templates' }">{{ copy.templates }}</NuxtLink>
          <span>/</span>
          <NuxtLink v-if="category" :to="categoryHomeLink">{{ category.label }}</NuxtLink>
        </div>
        <p class="tm-eyebrow">{{ item.categoryMeta?.label || item.category }}</p>
        <h1>{{ item.title }}</h1>
        <p>{{ item.description }}</p>
        <div class="tm-tags">
          <span v-for="tag in item.tags" :key="tag">{{ tag }}</span>
        </div>
      </div>

      <aside class="tm-download-box">
        <div class="tm-download-price">{{ priceLabel() }}</div>
        <p>{{ copy.priceDescription }}</p>
        <a
          :href="item.downloadUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="tm-button tm-button-primary"
        >
          {{ copy.download }}
        </a>
        <a
          :href="item.previewUrl || 'https://example.com/preview'"
          target="_blank"
          rel="noopener noreferrer"
          class="tm-button tm-button-secondary"
        >
          {{ copy.preview }}
        </a>
        <dl>
          <div><dt>{{ copy.rating }}</dt><dd>★ {{ item.rating || 4.8 }} / {{ item.reviews || 96 }} {{ copy.reviews }}</dd></div>
          <div><dt>{{ copy.downloads }}</dt><dd>{{ item.downloadCount.toLocaleString('en-US') }}</dd></div>
          <div><dt>{{ copy.updated }}</dt><dd>{{ item.updatedAt }}</dd></div>
          <div><dt>{{ copy.author }}</dt><dd><a :href="item.authorUrl" target="_blank" rel="noopener noreferrer">{{ item.author }}</a></dd></div>
        </dl>
      </aside>
    </section>

    <section class="tm-container tm-detail-media">
      <img :src="item.coverImage" :alt="item.title">
    </section>

    <section v-if="item.previewImages.length" class="tm-container tm-preview-grid">
      <img v-for="image in item.previewImages" :key="image" :src="image" :alt="`${item.title} preview`">
    </section>

    <section v-if="item.blocks?.length" class="tm-container tm-detail-blocks">
      <BlockRenderer :blocks="item.blocks" />
    </section>
  </article>
</template>
