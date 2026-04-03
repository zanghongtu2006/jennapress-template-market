<script setup lang="ts">
import type { BlogCategory, BlogPostSummary, SiteConfig } from '~/types'

const props = defineProps<{
  site: SiteConfig
  categories: BlogCategory[]
  category: BlogCategory | null
  posts: BlogPostSummary[]
  locale?: string
  defaultLocale?: string
  p: (path: string) => string
}>()
</script>

<template>
  <div v-if="category" class="market-blog-home">
    <section class="market-blog-hero">
      <div class="container">
        <a :href="p('/blog')" class="back-link">← All Categories</a>
        <span class="template-chip">{{ category.label }}</span>
        <h1 class="market-post-title">{{ category.listTitle }}</h1>
        <p class="market-post-summary">{{ category.description }}</p>
      </div>
    </section>

    <section class="container section-card">
      <div class="market-grid-outer">
        <div class="market-post-grid">
          <a
            v-for="post in posts"
            :key="`${post.categoryMeta.slug}:${post.slug}`"
            :href="p(`/blog/${post.categoryMeta.slug}/${post.slug}`)"
            class="market-post-card"
          >
            <span class="template-chip">{{ post.categoryMeta.label }}</span>
            <h3>{{ post.title }}</h3>
            <p>{{ post.summary }}</p>
            <span class="market-post-date">{{ new Date(post.publishedAt).toLocaleDateString('en-CA') }}</span>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
