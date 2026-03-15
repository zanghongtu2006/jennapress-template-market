import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import { validatePageContent, validatePostContent, validateSiteConfig } from './schema'
import { DEFAULT_LOCALE, prefixPathForLocale, type SupportedLocale } from './i18n'
import { ensureTemplateExists } from './templates'
import type {
  Block,
  BlogCategory,
  BlogCategoryAccent,
  BlogPostContent,
  BlogPostSummary,
  CtaBannerBlock,
  PageContent,
  PostContent,
  PostSummary,
  RichTextBlock,
  SiteConfig
} from '../types'

const md = new MarkdownIt({ html: true, linkify: true, typographer: true })

function readMarkdownFile(absolutePath: string) {
  const raw = fs.readFileSync(absolutePath, 'utf-8')
  return matter(raw)
}

function getCollectionFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    return []
  }
  return fs.readdirSync(dir).filter((file) => file.endsWith('.md'))
}

function normalizePageSlug(slug: string) {
  return slug === '/' ? '/' : `/${slug.replace(/^\//, '')}`
}

function normalizePostSlug(slug: string) {
  return slug.replace(/^\//, '')
}

function slugifyCategory(input: string) {
  return input.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

function toCategoryLabel(input: string) {
  if (!input) return 'General'
  return input
    .replace(/[-_]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function inferCategoryAccent(slug: string): BlogCategoryAccent {
  if (slug === 'cases') return 'case-study'
  if (slug === 'products') return 'product-note'
  if (slug === 'events') return 'event-promo'
  return 'default'
}

const categoryLocaleText: Record<string, Partial<Record<SupportedLocale, { label: string, description: string, listTitle: string }>>> = {
  architecture: {
    de: {
      label: 'Architektur',
      description: 'Architekturbeiträge zu Struktur, Rendering-Verträgen und statischer Delivery.',
      listTitle: 'Architekturartikel'
    },
    zh: {
      label: '架构',
      description: '围绕结构设计、渲染契约与静态交付方式的架构文章。',
      listTitle: '架构文章'
    }
  },
  strategy: {
    de: {
      label: 'Strategie',
      description: 'Strategische Beiträge über statische Websites, Delivery-Modelle und langfristige Produktentscheidungen.',
      listTitle: 'Strategieartikel'
    },
    zh: {
      label: '策略',
      description: '关于静态网站、交付模式和长期产品方向的策略文章。',
      listTitle: '策略文章'
    }
  },
  cases: {
    de: {
      label: 'Fallstudien',
      description: 'Belegstarke Geschichten, die zeigen, wie Unternehmen Ergebnisse für bestimmte Kunden oder Segmente erzielt haben.',
      listTitle: 'Kundengeschichten und Umsetzungs-Snapshots'
    },
    zh: {
      label: '案例',
      description: '以证据为中心的案例故事，展示企业如何为特定客户或行业交付结果。',
      listTitle: '客户故事与实施快照'
    }
  },
  products: {
    de: {
      label: 'Produkte',
      description: 'Produktorientierte Beiträge zu Fähigkeiten,定价和市场定位。'.replace('定价', 'Preisgestaltung'),
      listTitle: 'Feature-Releases und Produkterklärungen'
    },
    zh: {
      label: '产品',
      description: '面向产品能力、定价包装与市场定位的文章。',
      listTitle: '功能发布与产品解读'
    }
  },
  events: {
    de: {
      label: 'Events',
      description: 'Kampagnen-, Webinar- und Konferenzupdates mit stärkerer zeitlicher Dringlichkeit.',
      listTitle: '活动预告与一线更新'
    },
    zh: {
      label: '活动',
      description: '适合用更强时效感来呈现的活动、研讨会与会议更新。',
      listTitle: '活动预告与现场更新'
    }
  },
  general: {
    de: {
      label: 'Allgemein',
      description: 'Beiträge, die unter einer allgemeinen Blog-Kategorie zusammengefasst sind.',
      listTitle: 'Allgemeine Artikel'
    },
    zh: {
      label: '通用',
      description: '归档在通用博客分类下的文章。',
      listTitle: '通用文章'
    }
  }
}

function inferCategoryDescription(label: string, slug: string): string {
  if (slug === 'cases') return 'Proof-heavy stories that show how a company delivered outcomes for specific clients or segments.'
  if (slug === 'products') return 'Product-oriented posts that explain capabilities, packaging, and market positioning.'
  if (slug === 'events') return 'Campaign, webinar, and conference updates that benefit from a higher-energy presentation style.'
  return `${label} posts grouped under one first-level CMS category.`
}

function inferCategoryListTitle(label: string, slug: string): string {
  if (slug === 'cases') return 'Customer stories and implementation snapshots'
  if (slug === 'products') return 'Feature launches and product explainers'
  if (slug === 'events') return 'Upcoming activities and field updates'
  return `${label} articles`
}

function markdownToRichTextBlock(markdown: string, title?: string): RichTextBlock | null {
  const trimmed = markdown.trim()
  if (!trimmed) {
    return null
  }

  return {
    type: 'rich-text',
    ...(title ? { title } : {}),
    html: md.render(trimmed)
  }
}

function readPageFile(absolutePath: string): PageContent {
  const parsed = readMarkdownFile(absolutePath)
  const data = (parsed.data || {}) as Record<string, any>
  const blocks = Array.isArray(data.blocks) ? [...data.blocks as Block[]] : []
  const bodyBlock = markdownToRichTextBlock(parsed.content, typeof data.bodyTitle === 'string' ? data.bodyTitle : undefined)

  if (bodyBlock) {
    blocks.push(bodyBlock)
  }

  return validatePageContent({
    slug: data.slug,
    title: data.title,
    summary: data.summary,
    seo: data.seo,
    blocks
  })
}

function readPostFile(absolutePath: string): PostContent {
  const parsed = readMarkdownFile(absolutePath)
  const data = (parsed.data || {}) as Record<string, any>
  const body: Array<RichTextBlock | CtaBannerBlock> = []
  const bodyBlock = markdownToRichTextBlock(parsed.content, typeof data.bodyTitle === 'string' ? data.bodyTitle : undefined)

  if (bodyBlock) {
    body.push(bodyBlock)
  }

  if (Array.isArray(data.bodyBlocks)) {
    body.push(...data.bodyBlocks as Array<RichTextBlock | CtaBannerBlock>)
  }

  return validatePostContent({
    slug: data.slug,
    title: data.title,
    summary: data.summary,
    publishedAt: data.publishedAt,
    updatedAt: data.updatedAt,
    coverImage: data.coverImage,
    tags: data.tags,
    category: data.category,
    author: data.author,
    seo: data.seo,
    body
  })
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function localizeCanonical(canonical: string | undefined, requestedLocale: SupportedLocale) {
  if (!canonical) return canonical

  try {
    const url = new URL(canonical)
    url.pathname = prefixPathForLocale(url.pathname, requestedLocale)
    return url.toString()
  } catch {
    return prefixPathForLocale(canonical, requestedLocale)
  }
}

function localizeAction(action: { label: string, to: string } | undefined, requestedLocale: SupportedLocale) {
  if (!action) return action
  return {
    ...action,
    to: prefixPathForLocale(action.to, requestedLocale)
  }
}

function localizeBlock(block: Block, requestedLocale: SupportedLocale): Block {
  if (block.type === 'hero') {
    return {
      ...block,
      primaryAction: localizeAction(block.primaryAction, requestedLocale),
      secondaryAction: localizeAction(block.secondaryAction, requestedLocale)
    }
  }

  if (block.type === 'cta-banner') {
    return {
      ...block,
      action: localizeAction(block.action, requestedLocale)!
    }
  }

  return block
}

function localizePostBodyBlock(block: RichTextBlock | CtaBannerBlock, requestedLocale: SupportedLocale) {
  if (block.type === 'cta-banner') {
    return {
      ...block,
      action: localizeAction(block.action, requestedLocale)!
    }
  }
  return block
}

function localizePageContent(page: PageContent, requestedLocale: SupportedLocale): PageContent {
  const localized = clone(page)
  localized.blocks = localized.blocks.map(block => localizeBlock(block, requestedLocale))
  localized.seo = {
    ...localized.seo,
    canonical: localizeCanonical(localized.seo.canonical, requestedLocale)
  }
  return localized
}

function localizePostContent(post: PostContent, requestedLocale: SupportedLocale): PostContent {
  const localized = clone(post)
  localized.body = localized.body.map(block => localizePostBodyBlock(block, requestedLocale))
  localized.seo = {
    ...localized.seo,
    canonical: localizeCanonical(localized.seo.canonical, requestedLocale)
  }
  return localized
}

function localizeSiteConfig(site: SiteConfig, requestedLocale: SupportedLocale): SiteConfig {
  const localized = clone(site)
  localized.nav = localized.nav.map(item => ({
    ...item,
    to: prefixPathForLocale(item.to, requestedLocale)
  }))
  return localized
}

function getLocalizedCollectionDir(collection: 'pages' | 'posts', locale: SupportedLocale) {
  const baseDir = path.resolve(process.cwd(), `content/${collection}`)
  if (locale === DEFAULT_LOCALE) {
    return baseDir
  }
  return path.join(baseDir, locale)
}

function getPageMapForLocale(locale: SupportedLocale) {
  const defaultDir = getLocalizedCollectionDir('pages', DEFAULT_LOCALE)
  const localizedDir = getLocalizedCollectionDir('pages', locale)
  const map = new Map<string, PageContent>()

  for (const file of getCollectionFiles(defaultDir)) {
    const page = readPageFile(path.join(defaultDir, file))
    map.set(page.slug, page)
  }

  if (locale !== DEFAULT_LOCALE) {
    for (const file of getCollectionFiles(localizedDir)) {
      const page = readPageFile(path.join(localizedDir, file))
      map.set(page.slug, page)
    }
  }

  return map
}

function getPostMapForLocale(locale: SupportedLocale) {
  const defaultDir = getLocalizedCollectionDir('posts', DEFAULT_LOCALE)
  const localizedDir = getLocalizedCollectionDir('posts', locale)
  const map = new Map<string, PostContent>()

  for (const file of getCollectionFiles(defaultDir)) {
    const post = readPostFile(path.join(defaultDir, file))
    map.set(normalizePostSlug(post.slug), post)
  }

  if (locale !== DEFAULT_LOCALE) {
    for (const file of getCollectionFiles(localizedDir)) {
      const post = readPostFile(path.join(localizedDir, file))
      map.set(normalizePostSlug(post.slug), post)
    }
  }

  return map
}

function buildCategoryMeta(categoryValue: string, locale: SupportedLocale = DEFAULT_LOCALE): BlogCategory {
  const label = toCategoryLabel(categoryValue)
  const slug = slugifyCategory(categoryValue || 'general')
  const localized = categoryLocaleText[slug]?.[locale]
  return {
    key: categoryValue || 'General',
    slug,
    label: localized?.label || label,
    description: localized?.description || inferCategoryDescription(label, slug),
    accent: inferCategoryAccent(slug),
    listTitle: localized?.listTitle || inferCategoryListTitle(label, slug)
  }
}

function toBlogPost(post: PostContent, locale: SupportedLocale = DEFAULT_LOCALE): BlogPostContent {
  const categoryValue = typeof post.category === 'string' && post.category.trim() ? post.category.trim() : 'General'
  const categoryMeta = buildCategoryMeta(categoryValue, locale)
  return {
    ...post,
    category: categoryValue,
    categoryMeta
  }
}

export function getSiteConfig(locale: SupportedLocale = DEFAULT_LOCALE): SiteConfig {
  const localizedFile = path.resolve(process.cwd(), `content/site.${locale}.md`)
  const defaultFile = path.resolve(process.cwd(), 'content/site.md')
  const mdFile = locale !== DEFAULT_LOCALE && fs.existsSync(localizedFile) ? localizedFile : defaultFile

  if (!fs.existsSync(mdFile)) {
    throw new Error('Site config file not found: expected content/site.md')
  }

  const parsed = readMarkdownFile(mdFile)
  const site = validateSiteConfig(parsed.data || {})
  ensureTemplateExists(site.defaultTemplate)
  return localizeSiteConfig(site, locale)
}

export function getAllPages(locale: SupportedLocale = DEFAULT_LOCALE): PageContent[] {
  return Array.from(getPageMapForLocale(locale).values())
    .map(page => localizePageContent(page, locale))
    .sort((a, b) => a.slug.localeCompare(b.slug))
}

export function getPageBySlug(slug: string, locale: SupportedLocale = DEFAULT_LOCALE): PageContent | null {
  const normalized = normalizePageSlug(slug)
  const page = getPageMapForLocale(locale).get(normalized) ?? null
  return page ? localizePageContent(page, locale) : null
}

export function getAllPosts(locale: SupportedLocale = DEFAULT_LOCALE): PostContent[] {
  return Array.from(getPostMapForLocale(locale).values())
    .map(post => localizePostContent(post, locale))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export function getAllPostSummaries(locale: SupportedLocale = DEFAULT_LOCALE): PostSummary[] {
  return getAllPosts(locale).map(({ body, author, ...summary }) => summary)
}

export function getPostBySlug(slug: string, locale: SupportedLocale = DEFAULT_LOCALE): PostContent | null {
  const normalized = normalizePostSlug(slug)
  const post = getPostMapForLocale(locale).get(normalized) ?? null
  return post ? localizePostContent(post, locale) : null
}

export function getBlogCategories(locale: SupportedLocale = DEFAULT_LOCALE): BlogCategory[] {
  const categories = new Map<string, BlogCategory>()
  for (const post of getAllPosts(locale)) {
    const categoryValue = typeof post.category === 'string' && post.category.trim() ? post.category.trim() : 'General'
    const meta = buildCategoryMeta(categoryValue, locale)
    categories.set(meta.slug, meta)
  }
  return Array.from(categories.values()).sort((a, b) => a.label.localeCompare(b.label))
}

export function getAllBlogPostSummaries(locale: SupportedLocale = DEFAULT_LOCALE): BlogPostSummary[] {
  return getAllPosts(locale).map(post => toBlogPost(post, locale)).map(({ body, author, ...summary }) => summary)
}

export function getBlogPostByCategoryAndSlug(categorySlug: string, slug: string, locale: SupportedLocale = DEFAULT_LOCALE): BlogPostContent | null {
  const normalizedSlug = normalizePostSlug(slug)
  return getAllPosts(locale)
    .map(post => toBlogPost(post, locale))
    .find(post => post.categoryMeta.slug === categorySlug && normalizePostSlug(post.slug) === normalizedSlug) ?? null
}

export function getBlogPostsByCategory(categorySlug: string, locale: SupportedLocale = DEFAULT_LOCALE): BlogPostSummary[] {
  const category = getBlogCategoryBySlug(categorySlug, locale)
  if (!category) throw new Error(`Unsupported blog category: ${categorySlug}`)
  return getAllBlogPostSummaries(locale).filter(post => post.categoryMeta.slug === categorySlug)
}

export function getBlogCategoryBySlug(categorySlug: string, locale: SupportedLocale = DEFAULT_LOCALE): BlogCategory | null {
  return getBlogCategories(locale).find(item => item.slug === categorySlug) ?? null
}

export function getBlogRoutes(locale: SupportedLocale = DEFAULT_LOCALE): string[] {
  const categories = getBlogCategories(locale)
  const posts = getAllBlogPostSummaries(locale)
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`

  return [
    `${prefix}/blog`,
    ...categories.map(category => `${prefix}/blog/${category.slug}`),
    ...posts.map(post => `${prefix}/blog/${post.categoryMeta.slug}/${normalizePostSlug(post.slug)}`)
  ]
}
