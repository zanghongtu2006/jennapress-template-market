<script setup lang="ts">
import type { PageContent } from '~/types'
import '~/templates/template-market/template.css'

const props = defineProps<{ page: PageContent }>()

// ── Page type detection ─────────────────────────────────────────
const pageSlug = computed(() => ((props.page as any).slug || '').replace(/^\//, ''))
const isHome = computed(() => pageSlug.value === '')

const CATEGORIES = ['enterprise', 'blog-templates', 'affiliate', 'content']
const isCategory = computed(() => CATEGORIES.includes(pageSlug.value))

// ── Template catalog ────────────────────────────────────────────
function postUrl(slug: string, category: string) {
  return `/blog/${category}/${slug}`
}

const TEMPLATES = [
  {
    slug: 'saas-landing',
    name: 'SaaS Landing',
    category: 'enterprise',
    categoryLabel: 'Enterprise',
    description: 'A high-contrast dark-neon landing page for SaaS products, developer tools, and tech startups.',
    tags: ['landing-page', 'saas', 'tech', 'dark'],
    to: postUrl('saas-landing', 'enterprise'),
    repo: 'https://github.com/zanghongtu2006/jennapress',
    demo: 'https://zanghongtu2006.github.io/jennapress/',
    comingSoon: false,
  },
  {
    slug: 'minimal-blog',
    name: 'Minimal Blog',
    category: 'blog-templates',
    categoryLabel: 'Blog',
    description: 'A clean, typography-focused personal or technical blog.',
    tags: ['blog', 'minimal', 'typography'],
    to: '/blog-templates',
    comingSoon: true,
  },
  {
    slug: 'coupon-site',
    name: 'Coupon Site',
    category: 'affiliate',
    categoryLabel: 'Affiliate',
    description: 'A template for publishing deals, discounts, and product comparisons.',
    tags: ['affiliate', 'coupon', 'ecommerce'],
    to: '/blog/affiliate',
    comingSoon: true,
  },
  {
    slug: 'novel-site',
    name: 'Novel Site',
    category: 'content',
    categoryLabel: 'Content',
    description: 'A reading-first layout for fiction, serials, and long-form content.',
    tags: ['content', 'novel', 'reading'],
    to: '/blog/content',
    comingSoon: true,
  },
]

const categoryTemplates = computed(() => {
  if (!isCategory.value) return []
  return TEMPLATES.filter(t => t.category === pageSlug.value)
})
</script>

<template>
  <!-- ── HOME PAGE ─────────────────────────────────────── -->
  <main v-if="isHome" class="market-main">

    <!-- Hero -->
    <section class="market-hero">
      <div class="container">
        <div class="market-hero-kicker">JennaPress Official Marketplace</div>
        <h1>Find your perfect template.<br>Deploy in minutes.</h1>
        <p>Browse professionally designed JennaPress site templates. Pick one, customize the content, and publish to GitHub Pages — no code required.</p>
        <div class="market-hero-actions">
          <NuxtLink to="#templates" class="btn btn-primary">Browse Templates</NuxtLink>
          <NuxtLink to="#categories" class="btn btn-secondary">Explore Categories</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Category Grid -->
    <section class="market-categories" id="categories">
      <div class="container">
        <h2 class="market-section-title">Four Categories</h2>
        <p class="market-section-lead">Find the right template for your project type</p>
        <div class="category-grid">
          <NuxtLink to="/enterprise" class="category-card">
            <div class="category-icon">⚙️</div>
            <h3 class="category-label">Enterprise</h3>
            <p class="category-desc">Corporate websites, landing pages, and SaaS product sites with professional design.</p>
            <span class="category-count">Browse →</span>
          </NuxtLink>
          <NuxtLink to="/blog-templates" class="category-card">
            <div class="category-icon">📝</div>
            <h3 class="category-label">Blog Templates</h3>
            <p class="category-desc">Personal and technical blogs with clean typography and multilingual support.</p>
            <span class="category-count">Browse →</span>
          </NuxtLink>
          <NuxtLink to="/affiliate" class="category-card">
            <div class="category-icon">🎯</div>
            <h3 class="category-label">Affiliate</h3>
            <p class="category-desc">E-commerce, coupon sites, and multi-product catalogs for conversions.</p>
            <span class="category-count">Browse →</span>
          </NuxtLink>
          <NuxtLink to="/content" class="category-card">
            <div class="category-icon">📖</div>
            <h3 class="category-label">Content</h3>
            <p class="category-desc">Novel sites, video platforms, and media experiences for rich presentations.</p>
            <span class="category-count">Browse →</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Template Grid -->
    <section class="market-templates" id="templates">
      <div class="container">
        <h2 class="market-section-title">All Templates</h2>
        <p class="market-section-lead">Complete site packages, ready to deploy</p>
        <div class="market-grid-outer">
          <div class="template-grid">
            <div
              v-for="tpl in TEMPLATES"
              :key="tpl.slug"
              class="template-product-card"
              :class="{ 'coming-soon-card': tpl.comingSoon }"
            >
              <div class="template-preview">
                <div class="preview-grid-lines" />
                <div class="template-preview-placeholder"><span>⬜</span><span>Preview</span></div>
                <span v-if="tpl.comingSoon" class="template-badge">Coming Soon</span>
              </div>
              <div class="template-product-body">
                <span class="template-chip">{{ tpl.categoryLabel }}</span>
                <h3>{{ tpl.name }}</h3>
                <p>{{ tpl.description }}</p>
                <div class="template-tags">
                  <span v-for="tag in tpl.tags.slice(0, 3)" :key="tag" class="tag-chip">{{ tag }}</span>
                </div>
                <div class="template-product-actions">
                  <NuxtLink v-if="!tpl.comingSoon" :to="tpl.to" class="btn btn-primary">View Details</NuxtLink>
                  <span v-else class="btn btn-disabled">Coming Soon</span>
                  <a v-if="!tpl.comingSoon && tpl.repo" :href="tpl.repo" target="_blank" class="btn btn-outline">Use Template</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="market-cta">
      <div class="container">
        <h2>Built something with JennaPress?</h2>
        <p>Submit your template to the marketplace and help others ship faster.</p>
        <div class="market-hero-actions">
          <a href="https://github.com/zanghongtu2006/jennapress-template-market" target="_blank" class="btn btn-primary">View on GitHub</a>
        </div>
      </div>
    </section>

  </main>

  <!-- ── CATEGORY PAGE ─────────────────────────────────── -->
  <main v-else-if="isCategory" class="market-main">
    <section class="market-templates">
      <div class="container">
        <div class="category-page-header">
          <NuxtLink to="/" class="back-link">← All Categories</NuxtLink>
          <h2 class="market-section-title">{{ pageSlug.charAt(0).toUpperCase() + pageSlug.slice(1) }} Templates</h2>
          <p class="market-section-lead">{{ categoryTemplates[0]?.categoryLabel || pageSlug }} templates ready to deploy</p>
        </div>
        <div class="market-grid-outer">
          <div class="template-grid">
            <div
              v-for="tpl in categoryTemplates"
              :key="tpl.slug"
              class="template-product-card"
              :class="{ 'coming-soon-card': tpl.comingSoon }"
            >
              <div class="template-preview">
                <div class="preview-grid-lines" />
                <div class="template-preview-placeholder"><span>⬜</span><span>Preview</span></div>
                <span v-if="tpl.comingSoon" class="template-badge">Coming Soon</span>
              </div>
              <div class="template-product-body">
                <span class="template-chip">{{ tpl.categoryLabel }}</span>
                <h3>{{ tpl.name }}</h3>
                <p>{{ tpl.description }}</p>
                <div class="template-tags">
                  <span v-for="tag in tpl.tags.slice(0, 3)" :key="tag" class="tag-chip">{{ tag }}</span>
                </div>
                <div class="template-product-actions">
                  <NuxtLink v-if="!tpl.comingSoon" :to="tpl.to" class="btn btn-primary">View Details</NuxtLink>
                  <span v-else class="btn btn-disabled">Coming Soon</span>
                  <a v-if="!tpl.comingSoon && tpl.repo" :href="tpl.repo" target="_blank" class="btn btn-outline">Use Template</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- ── CONTENT PAGE ──────────────────────────────────── -->
  <div v-else>
    <BlockRenderer :blocks="page.blocks" />
  </div>
</template>
