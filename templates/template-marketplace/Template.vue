<script setup lang="ts">
import type { PageContent } from '~/types'
import { DEFAULT_LOCALE, stripLocalePrefixFromPath } from '~/lib/i18n'
import ProductHome from '~/templates/template-marketplace/product/ProductHome.vue'
import '~/templates/template-marketplace/template.css'

defineProps<{ page: PageContent }>()

const route = useRoute()
const currentLocale = computed(() => stripLocalePrefixFromPath(route.path).locale || DEFAULT_LOCALE)

const { data: siteData, error: siteError } = await useSite(currentLocale)
const site = computed(() => siteData.value)

if (siteError.value) {
  throw createError({ statusCode: 500, statusMessage: siteError.value.statusMessage || 'Failed to load site config' })
}
</script>

<template>
  <ProductHome
    v-if="site"
    :site="site"
    :locale="currentLocale"
    :defaultLocale="DEFAULT_LOCALE"
  />
</template>
