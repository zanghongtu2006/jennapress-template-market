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

const productPath = (product: Product) => p(`/products/${product.categoryMeta?.slug || 'general'}/${product.slug}`)
const marketProducts = computed(() => props.products as MarketplaceProduct[])
const priceLabel = () => '0元'
</script>

<template>
  <div class="tm-product-category">
    <section class="tm-container tm-category-hero">
      <NuxtLink :to="p('/')" class="tm-breadcrumb">← TemplateMarket</NuxtLink>
      <h1>{{ category?.label || 'Templates' }}</h1>
      <p>{{ category?.description || 'Browse free downloadable templates.' }}</p>
    </section>

    <section class="tm-container tm-category-tabs" aria-label="Template categories">
      <NuxtLink :to="p('/')" class="tm-category-tab">All</NuxtLink>
      <NuxtLink
        v-for="item in categories"
        :key="item.slug"
        :to="p(`/products/${item.slug}`)"
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
            <a :href="product.previewUrl || 'https://example.com/preview'" target="_blank" rel="noopener noreferrer">Preview</a>
            <NuxtLink :to="productPath(product)">Details</NuxtLink>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>
