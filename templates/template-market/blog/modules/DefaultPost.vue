<script setup lang="ts">
import type { BlogPostContent, SiteConfig } from '~/types'

const props = defineProps<{
  site: SiteConfig
  post: BlogPostContent | null
  locale?: string
  defaultLocale?: string
}>()

const p = (path: string) =>
  (props.locale && props.locale !== props.defaultLocale) ? ('/' + props.locale + path) : path
</script>

<template>
  <article v-if="post" class="market-blog-post">
    <header class="market-post-header">
      <div class="container">
        <nav class="market-post-breadcrumbs">
          <a :href="p('/blog')">Blog</a>
          <span>/</span>
          <a :href="p(`/blog/${post.categoryMeta.slug}`)">{{ post.categoryMeta.label }}</a>
        </nav>
        <span class="template-chip">{{ post.categoryMeta.label }}</span>
        <h1 class="market-post-title">{{ post.title }}</h1>
        <p class="market-post-summary">{{ post.summary }}</p>
      </div>
    </header>

    <div class="container">
      <div class="market-post-body">
        <BlockRenderer :blocks="post.body" />
      </div>
    </div>
  </article>
</template>
