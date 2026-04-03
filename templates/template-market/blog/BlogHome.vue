<script setup lang="ts">
import type { BlogCategory, BlogPostSummary, SiteConfig } from '~/types'

const props = defineProps<{
  site: SiteConfig
  categories: BlogCategory[]
  sections: Array<{ category: BlogCategory; posts: BlogPostSummary[] }>
  locale?: string
  defaultLocale?: string
}>()

const p = (path: string) =>
  (props.locale && props.locale !== props.defaultLocale) ? ('/' + props.locale + path) : path
</script>

<template>
  <div class="market-blog-home">
    <section class="container section-card">
      <div class="market-blog-hero">
        <div class="market-hero-kicker">JennaPress Blog</div>
        <h1>Template Market Blog</h1>
        <p>News, updates, and guides from the JennaPress template marketplace.</p>
      </div>
    </section>

    <section v-for="section in sections" :key="section.category.slug" class="container section-card">
      <div class="market-category-header">
        <div>
          <h2 class="market-section-title">{{ section.category.listTitle }}</h2>
          <p class="market-section-lead">{{ section.category.description }}</p>
        </div>
        <a :href="p(`/blog/${section.category.slug}`)" class="btn btn-outline">Browse →</a>
      </div>
      <div class="market-grid-outer">
        <div class="market-post-grid">
          <a
            v-for="post in section.posts.slice(0, 3)"
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
