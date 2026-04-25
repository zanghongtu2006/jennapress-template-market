<script setup lang="ts">
import type { BlogCategory, PageContent, Product } from '~/types'
import { fetchProductCategories, fetchProductsContent } from '~/composables/useContentData'
import { DEFAULT_LOCALE, stripLocalePrefixFromPath } from '~/lib/i18n'
import ProductHome from '~/templates/template-marketplace/product/ProductHome.vue'
import '~/templates/template-marketplace/template.css'

defineProps<{ page: PageContent }>()

const route = useRoute()
const currentLocale = computed(() => stripLocalePrefixFromPath(route.path).locale || DEFAULT_LOCALE)

const { data: siteData, error: siteError } = await useSite(currentLocale)
const site = computed(() => siteData.value)

const categoriesKey = computed(() => `home-products:${currentLocale.value}:categories`)
const productsKey = computed(() => `home-products:${currentLocale.value}:products`)

const { data: categoriesData, error: categoriesError } = await useAsyncData<BlogCategory[]>(
  categoriesKey,
  () => fetchProductCategories(currentLocale.value),
  { watch: [currentLocale] },
)
const { data: productsData, error: productsError } = await useAsyncData<Product[]>(
  productsKey,
  () => fetchProductsContent(currentLocale.value),
  { watch: [currentLocale] },
)

if (siteError.value) {
  throw createError({ statusCode: 500, statusMessage: siteError.value.statusMessage || 'Failed to load site config' })
}
if (categoriesError.value) {
  throw createError({ statusCode: 500, statusMessage: categoriesError.value.statusMessage || 'Failed to load categories' })
}
if (productsError.value) {
  throw createError({ statusCode: 500, statusMessage: productsError.value.statusMessage || 'Failed to load products' })
}

const categories = computed(() => categoriesData.value ?? [])
const products = computed(() => productsData.value ?? [])
const getProductCategorySlug = (product: Product) => product.categoryMeta?.slug ?? ''
const sections = computed(() => categories.value.map(category => ({
  category,
  products: products.value.filter(product => getProductCategorySlug(product) === category.slug),
})).filter(section => section.products.length > 0))
</script>

<template>
  <ProductHome
    v-if="site"
    :site="site"
    :categories="categories"
    :sections="sections"
    :products="products"
    :locale="currentLocale"
    :defaultLocale="DEFAULT_LOCALE"
  />
</template>
