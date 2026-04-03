<script setup lang="ts">
import { computed } from 'vue'
import type { BlogCategory, BlogPostSummary, SiteConfig } from '~/types'
import blogConfig from './blog.config'

const props = defineProps<{
  site: SiteConfig
  categories: BlogCategory[]
  category: BlogCategory | null
  posts: BlogPostSummary[]
  locale?: string
  defaultLocale?: string
}>()

const activeComponent = computed(() => {
  const key = props.category?.accent || 'default'
  return blogConfig.categoryTemplates[key as keyof typeof blogConfig.categoryTemplates] || blogConfig.categoryTemplates.default
})

const p = (path: string) =>
  (props.locale && props.locale !== props.defaultLocale) ? ('/' + props.locale + path) : path
</script>

<template>
  <component :is="activeComponent" :site="site" :categories="categories" :category="category" :posts="posts" :locale="locale" :defaultLocale="defaultLocale" :p="p" />
</template>
