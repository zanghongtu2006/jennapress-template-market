import { defineNuxtConfig } from 'nuxt/config'
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

function readFrontMatter(filePath: string) {
  const raw = fs.readFileSync(filePath, 'utf-8')
  return matter(raw).data || {}
}

function slugifyCategory(input: string) {
  return input.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

function readPageRoutes() {
  const pagesDir = path.resolve(process.cwd(), 'content/pages')
  if (!fs.existsSync(pagesDir)) {
    return ['/']
  }

  const files = fs.readdirSync(pagesDir).filter((file) => file.endsWith('.md'))
  const routes = files
    .map((file) => {
      const data = readFrontMatter(path.join(pagesDir, file))
      const slug = data?.slug ? String(data.slug) : ''
      return slug === '/' ? '/' : `/${slug.replace(/^\//, '')}`
    })
    .filter(Boolean)

  return Array.from(new Set(routes))
}

function readBlogRoutes() {
  const postsDir = path.resolve(process.cwd(), 'content/posts')
  if (!fs.existsSync(postsDir)) {
    return ['/blog']
  }

  const files = fs.readdirSync(postsDir).filter((file) => file.endsWith('.md'))
  const routes = new Set<string>(['/blog'])

  for (const file of files) {
    const data = readFrontMatter(path.join(postsDir, file))
    const slug = data?.slug ? String(data.slug) : ''
    const category = data?.category ? slugifyCategory(String(data.category)) : 'general'

    if (!slug) continue

    routes.add(`/blog/${category}`)
    routes.add(`/blog/${category}/${slug.replace(/^\//, '')}`)
  }

  return Array.from(routes)
}


function readApiRoutes() {
  const routes = new Set<string>(['/api/site', '/api/pages', '/api/posts', '/api/posts/categories'])

  const pagesDir = path.resolve(process.cwd(), 'content/pages')
  if (fs.existsSync(pagesDir)) {
    const files = fs.readdirSync(pagesDir).filter((file) => file.endsWith('.md'))
    for (const file of files) {
      const data = readFrontMatter(path.join(pagesDir, file))
      const slug = data?.slug ? String(data.slug) : ''
      const normalized = slug === '/' ? '' : String(slug).replace(/^\//, '')
      if (normalized) {
        routes.add(`/api/pages/${normalized}`)
      }
    }
  }

  const postsDir = path.resolve(process.cwd(), 'content/posts')
  if (fs.existsSync(postsDir)) {
    const files = fs.readdirSync(postsDir).filter((file) => file.endsWith('.md'))
    for (const file of files) {
      const data = readFrontMatter(path.join(postsDir, file))
      const slug = data?.slug ? String(data.slug) : ''
      const category = data?.category ? slugifyCategory(String(data.category)) : 'general'
      if (!slug) continue
      routes.add(`/api/posts/category/${category}`)
      routes.add(`/api/posts/${category}/${String(slug).replace(/^\//, '')}`)
    }
  }

  return Array.from(routes)
}

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  css: ['~/assets/main.css'],
  app: {
    baseURL: '/JennaPress/',
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: 'favicon.svg' }
      ],
      script: [
        {
          innerHTML: `(function () {
  try {
    var t = localStorage.getItem('site-theme')
    if (t) document.documentElement.dataset.theme = t
  } catch (e) {}
})()`,
          tagPosition: 'head'
        }
      ]
    }
  },
  ssr: true,
  nitro: {
    prerender: {
      autoSubfolderIndex: true,
      routes: [...readPageRoutes(), ...readBlogRoutes(), ...readApiRoutes()]
    }
  },
  runtimeConfig: {
    public: {
      siteBaseUrl: 'https://example.com'
    }
  },
  typescript: {
    strict: true,
    typeCheck: false
  }
})