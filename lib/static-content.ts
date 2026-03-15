import { staticContentData } from './generated/static-content-data'
import { DEFAULT_LOCALE, isSupportedLocale, type SupportedLocale } from './i18n'
import type { BlogCategory, BlogPostContent, BlogPostSummary, PageContent, SiteConfig } from '~/types'

function resolveLocale(locale?: string | null): SupportedLocale {
  return isSupportedLocale(locale) ? locale : DEFAULT_LOCALE
}

export function getStaticSite(locale?: string | null): SiteConfig | null {
  return staticContentData[resolveLocale(locale)].site as SiteConfig
}

export function getStaticPage(slug: string, locale?: string | null): PageContent | null {
  const normalized = slug === '/' ? '/' : `/${slug.replace(/^\//, '')}`
  return (staticContentData[resolveLocale(locale)].pages[normalized as keyof typeof staticContentData.en.pages] ?? null) as PageContent | null
}

export function getStaticBlogCategories(locale?: string | null): BlogCategory[] {
  return staticContentData[resolveLocale(locale)].blog.categories as unknown as BlogCategory[]
}

export function getStaticBlogPosts(locale?: string | null): BlogPostSummary[] {
  return staticContentData[resolveLocale(locale)].blog.posts as unknown as BlogPostSummary[]
}

export function getStaticBlogCategoryPayload(category: string, locale?: string | null): { category: BlogCategory, posts: BlogPostSummary[] } | null {
  const payload = staticContentData[resolveLocale(locale)].blog.categoryMap[category as keyof typeof staticContentData.en.blog.categoryMap] ?? null
  return payload as { category: BlogCategory, posts: BlogPostSummary[] } | null
}

export function getStaticBlogPost(category: string, slug: string, locale?: string | null): BlogPostContent | null {
  const key = `${category}/${slug.replace(/^\//, '')}`
  const payload = staticContentData[resolveLocale(locale)].blog.postMap[key as keyof typeof staticContentData.en.blog.postMap] ?? null
  return payload as BlogPostContent | null
}
