import fs from 'node:fs'
import path from 'node:path'
import {
  getAllBlogPostSummaries,
  getBlogCategories,
  getBlogCategoryBySlug,
  getBlogPostByCategoryAndSlug,
  getBlogPostsByCategory,
  getPageBySlug,
  getSiteConfig,
} from './content-source'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type SupportedLocale } from './i18n'

function escapeJsonForTs(value: unknown) {
  return JSON.stringify(value, null, 2)
    .replace(/</g, '\\u003C')
    .replace(/>/g, '\\u003E')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

function readPageSlugsForLocale(locale: SupportedLocale) {
  const pagesDir = path.resolve(process.cwd(), 'content/pages')
  const localeDir = locale === DEFAULT_LOCALE ? pagesDir : path.join(pagesDir, locale)
  const defaultFiles = fs.existsSync(pagesDir) ? fs.readdirSync(pagesDir).filter((file) => file.endsWith('.md')) : []
  const localeFiles = locale === DEFAULT_LOCALE || !fs.existsSync(localeDir)
    ? []
    : fs.readdirSync(localeDir).filter((file) => file.endsWith('.md'))

  const slugs = new Set<string>()
  const files = new Set<string>([...defaultFiles, ...localeFiles])

  for (const file of files) {
    const resolvedPath = locale !== DEFAULT_LOCALE && fs.existsSync(path.join(localeDir, file))
      ? path.join(localeDir, file)
      : path.join(pagesDir, file)
    const raw = fs.readFileSync(resolvedPath, 'utf-8')
    const match = raw.match(/^slug:\s*(.+)$/m)
    if (!match) continue
    const value = String(match[1]).trim().replace(/^['"]|['"]$/g, '')
    const slug = value === '/' ? '/' : `/${value.replace(/^\//, '')}`
    slugs.add(slug)
  }

  return Array.from(slugs).sort((a, b) => a.localeCompare(b))
}

function buildLocaleData(locale: SupportedLocale) {
  const pages: Record<string, unknown> = {}
  for (const slug of readPageSlugsForLocale(locale)) {
    const page = getPageBySlug(slug, locale)
    if (page) {
      pages[slug] = page
    }
  }

  const categories = getBlogCategories(locale)
  const posts = getAllBlogPostSummaries(locale)
  const categoryMap: Record<string, unknown> = {}
  const postMap: Record<string, unknown> = {}

  for (const category of categories) {
    const categoryPayload = {
      category: getBlogCategoryBySlug(category.slug, locale),
      posts: getBlogPostsByCategory(category.slug, locale),
    }
    categoryMap[category.slug] = categoryPayload
  }

  for (const post of posts) {
    const key = `${post.categoryMeta.slug}/${post.slug.replace(/^\//, '')}`
    const payload = getBlogPostByCategoryAndSlug(post.categoryMeta.slug, post.slug, locale)
    if (payload) {
      postMap[key] = payload
    }
  }

  return {
    site: getSiteConfig(locale),
    pages,
    blog: {
      categories,
      posts,
      categoryMap,
      postMap,
    },
  }
}

export function writeStaticContentDataModule() {
  const locales = SUPPORTED_LOCALES as readonly SupportedLocale[]
  const data = Object.fromEntries(locales.map((locale) => [locale, buildLocaleData(locale)]))
  const targetDir = path.resolve(process.cwd(), 'lib/generated')
  const targetFile = path.join(targetDir, 'static-content-data.ts')

  fs.mkdirSync(targetDir, { recursive: true })
  fs.writeFileSync(
    targetFile,
    `/* auto-generated; do not edit manually */\nexport const staticContentData = ${escapeJsonForTs(data)} as const\n`,
    'utf-8',
  )
}
