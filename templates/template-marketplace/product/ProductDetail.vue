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

const item = computed(() => props.product as MarketplaceProduct | null)
const priceLabel = () => '0元'
</script>

<template>
  <article v-if="item" class="tm-product-detail">
    <section class="tm-container tm-detail-hero">
      <div class="tm-detail-copy">
        <div class="tm-breadcrumbs">
          <NuxtLink :to="p('/')">Templates</NuxtLink>
          <span>/</span>
          <NuxtLink v-if="category" :to="p(`/products/${category.slug}`)">{{ category.label }}</NuxtLink>
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
        <p>Free downloadable template package. The download link points to an external ZIP placeholder.</p>
        <a
          :href="item.downloadUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="tm-button tm-button-primary"
        >
          Download ZIP
        </a>
        <a
          :href="item.previewUrl || 'https://example.com/preview'"
          target="_blank"
          rel="noopener noreferrer"
          class="tm-button tm-button-secondary"
        >
          Live Preview
        </a>
        <dl>
          <div><dt>Rating</dt><dd>★ {{ item.rating || 4.8 }} / {{ item.reviews || 96 }} reviews</dd></div>
          <div><dt>Downloads</dt><dd>{{ item.downloadCount.toLocaleString('en-US') }}</dd></div>
          <div><dt>Updated</dt><dd>{{ item.updatedAt }}</dd></div>
          <div><dt>Author</dt><dd><a :href="item.authorUrl" target="_blank" rel="noopener noreferrer">{{ item.author }}</a></dd></div>
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
