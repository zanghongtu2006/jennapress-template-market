# Content Authoring Prompt (English)

Use this prompt when asking an AI to create, update, or manage content for a JennaPress CMS site.

JennaPress is a static-first, multilingual CMS where all content lives in Markdown files. This prompt defines exactly how content files are structured, how multilingual content works, how to configure themes, and what content authors must never change.

---

## Content File Locations

```
content/
├── site.md              ← site-wide settings (name, nav, themes, etc.)
├── l18n.ts              ← locale definitions (language codes and labels)
├── pages/
│   ├── index.md         ← homepage content
│   ├── about.md         ← about page
│   ├── principles.md    ← principles page
│   └── <locale>/
│       ├── index.md     ← localized homepage
│       ├── about.md     ← localized about page
│       └── ...
└── posts/
    ├── release-notes-v1-0-0.md    ← English post
    ├── current-support-status.md  ← English post
    └── <locale>/
        ├── release-notes-v1-0-0.md   ← localized post (same slug)
        └── ...
```

**Absolute rule: Only edit files inside `content/`. Never touch `templates/`, `components/`, `pages/`, `composables/`, `lib/`, `types/`, or `assets/`.**

---

## `content/site.md` — Site Configuration

This is NOT a content page. It is the site configuration file. Edit it to change site identity, navigation, themes, and default settings.

```yaml
---
name: Jenna Press
logoText: JP
siteUrl: https://www.example.com
defaultTemplate: corporate-basic
defaultTheme: dark
themes:
  - dark
  - light
  - pink
tagline: Your site tagline here.
nav:
  - label: Home
    to: /
  - label: About
    to: /about
  - label: Blog
    to: /blog
footerText: Footer text for all pages.
contactEmail: hello@example.com
socialLinks:
  - label: GitHub
    to: https://github.com/example
---
```

**Available fields:**

| Field | Required | Description |
|---|---|---|
| `name` | Yes | Site display name (used in HeaderBar, FooterBar, SEO) |
| `logoText` | Yes | Short logo text (e.g. "JP", "ACME") |
| `siteUrl` | Yes | Full URL of the production site (used for canonical URLs and sitemap) |
| `defaultTemplate` | Yes | Which template to use (must match a folder name in `templates/`) |
| `defaultTheme` | Yes | Which theme to load by default (must match a `[data-theme]` in template CSS) |
| `themes` | Yes | List of available themes (users can switch between these) |
| `tagline` | No | Short site tagline |
| `nav` | Yes | Navigation links. `to` must match a route (use `/` for root, `/about` for pages, `/blog` for blog index) |
| `footerText` | Yes | Footer tagline text |
| `contactEmail` | No | Contact email displayed in footer |
| `socialLinks` | No | List of `{label, to}` pairs for footer social links |

**Navigation rules:**
- Every `to` path must be a valid route. JennaPress routes: `/`, `/about`, `/principles`, `/blog`, `/blog/:category`, `/blog/:category/:slug`
- Adding arbitrary routes like `/pricing` requires first creating `content/pages/pricing.md`
- Do NOT prefix nav `to` values with locale codes — the routing system handles that automatically

---

## `content/l18n.ts` — Locale Definitions

This file defines which languages the site supports. Edit it to add or remove languages.

```ts
export type LocaleConfig = {
  code: string
  label: string
  isDefault?: boolean
}

export const locales: LocaleConfig[] = [
  { code: 'en', label: 'English', isDefault: true },
  { code: 'de', label: 'Deutsch' },
  { code: 'el', label: 'Ελληνικά' },
  { code: 'es', label: 'Español' },
  { code: 'zh', label: '中文' },
]
```

**Rules:**
- Exactly one locale must have `isDefault: true` — this is the fallback language
- The default locale has NO URL prefix (`/` not `/en/`)
- All other locales get a URL prefix (`/de/`, `/zh/`, etc.)
- Adding a new locale: add to this array AND create a locale subdirectory in both `content/pages/` and `content/posts/`
- Removing a locale: remove from this array AND remove the locale subdirectory from both `content/pages/` and `content/posts/`

---

## Page Content (`content/pages/`)

### English pages (default)

```yaml
---
slug: /
title: Homepage
summary: One-sentence description for SEO and social sharing.
seo:
  title: Homepage | Site Name
  description: Full meta description for SEO.
  canonical: https://www.example.com/
bodyTitle: Welcome to Our Site
bodyBlocks:
  - type: hero
    kicker: Company Name
    title: Main Headline
    description: Subheadline describing your value proposition.
    primaryAction:
      label: Get Started
      to: /about
    secondaryAction:
      label: Read More
      to: /blog
  - type: feature-grid
    title: Why Choose Us
    items:
      - title: Feature One
        description: Description of feature one.
      - title: Feature Two
        description: Description of feature two.
  - type: cta-banner
    title: Ready to Start?
    description: Call to action description.
    action:
      label: Contact Us
      to: /about
---
Introductory paragraph content here.
```

### Localized pages

Create `content/pages/<locale>/<slug>.md`. Example: `content/pages/de/index.md`, `content/pages/de/about.md`.

**Localization rules:**
- Use the same `slug` field as the English version
- The page title, summary, body, and all block text should be in the target language
- SEO `canonical` should point to the English version URL
- If no localized version exists for a page, the English version is shown (if locale prefix matches a supported locale)

---

## Blog Post Content (`content/posts/`)

### English posts (default)

```yaml
---
slug: my-first-post
title: My First Blog Post
summary: A concise summary of this post for blog listing cards and SEO.
publishedAt: "2026-04-01"
category: Project
tags:
  - tag-one
  - tag-two
author:
  name: Author Name
  avatar: /template-assets/corporate-basic/avatar-placeholder.png
seo:
  title: My First Blog Post | Site Name
  description: SEO meta description of this post.
  canonical: https://www.example.com/blog/project/my-first-post
bodyTitle: My First Blog Post
bodyBlocks:
  - type: cta-banner
    title: Questions or Feedback?
    description: Let us know what you think.
    action:
      label: Open an Issue
      to: https://github.com/example/issues
---
Your blog post body content goes here as plain markdown.

You can use **bold**, *italic*, and [links](https://example.com).

Do NOT use triple-backtick JavaScript code blocks (```javascript) in blog post body content.
Nitro's prerender esbuild cannot parse return statements inside markdown JS blocks,
which causes the build to fail with: "Expected ; but found undefined".
Use regular paragraphs or ```bash instead.
```

### Localized posts

Create `content/posts/<locale>/<slug>.md`. Example: `content/posts/de/my-first-post.md`.

Use the same `slug` as the English version. Translate all user-facing fields.

### Category field

The `category` field determines which blog category the post belongs to. It is slugified automatically (spaces → hyphens, lowercase).

Valid categories: `Project`, `Usage`, `Case Study`, `Product Note`, `Event Promo`, etc.

The slugified category name is matched in the template's `blog/blog.config.ts` to determine which blog module component renders it.

**Important:** If a template doesn't have a module registered for a category, it falls back to `default`.

---

## Available Block Types for Pages

Use these in the `bodyBlocks` array of page content files (`content/pages/*.md`).

### `hero`

```yaml
- type: hero
  kicker: Optional kicker above the title
  title: Main Hero Headline
  description: Subheadline copy.
  primaryAction:
    label: CTA Button Label
    to: /about          # internal path OR full URL
  secondaryAction:
    label: Secondary CTA
    to: /blog
  panelTitle: Optional right-side panel title
  panelLines:           # lines shown in right-side panel
    - Line one
    - Line two
```

### `feature-grid`

```yaml
- type: feature-grid
  title: Section Title
  description: Optional section description.
  items:
    - title: Feature Title
      description: Feature description.
    - title: Another Feature
      description: Another description.
```

### `rich-text`

```yaml
- type: rich-text
  title: Optional Section Title
  html: |
    <p>This is <strong>rich text</strong> content.</p>
    <p>Use <a href="/about">internal links</a> or
       <a href="https://example.com">external links</a>.</p>
```

### `cta-banner`

```yaml
- type: cta-banner
  title: Call to Action Headline
  description: Supporting description text.
  action:
    label: Button Label
    to: /contact
```

### `stats`

```yaml
- type: stats
  title: Our Numbers
  description: Optional intro text.
  items:
    - value: "100+"
      label: Customers
      note: worldwide
    - value: "99.9%"
      label: Uptime
```

### `contact`

```yaml
- type: contact
  title: Get in Touch
  description: Contact page intro.
  email: hello@example.com
  phone: "+49 30 123456"
  address: Example Street 1, 10115 Berlin, Germany
```

---

## Theme Configuration

Themes are NOT set in content files. Themes are:
1. Declared in `content/site.md` under `themes: []`
2. Implemented as CSS custom properties in the active template's `template.css`
3. Selected by users via a ThemeSelect component (UI provided by the template)

To add a new theme to the site:
1. Edit `content/site.md` → add theme name to `themes` array
2. Edit the template's `template.css` → add a `[data-theme="theme-name"]` block with CSS variable definitions

To change the default theme: edit `content/site.md` → change `defaultTheme`.

---

## Multilingual Content Rules

### Adding a new language

1. Add the locale to `content/l18n.ts`
2. Create `content/pages/<locale>/` directory with translated pages
3. Create `content/posts/<locale>/` directory with translated posts
4. Keep the same `slug` in every localized file
5. Update `canonical` URL in localized page/post front matter to point to English version

### Translating posts

For every English post `content/posts/<slug>.md`, create:
- `content/posts/de/<slug>.md`
- `content/posts/zh/<slug>.md`
- etc.

All localized versions must share the same `slug` field value. Only the content (title, summary, body, block text) is translated.

### Translating pages

For every English page `content/pages/<slug>.md`, create:
- `content/pages/de/<slug>.md`
- etc.

Same rules as posts: share `slug`, translate content, canonical → English URL.

---

## SEO Fields

Every page and post supports:

```yaml
seo:
  title: Page Title | Site Name    # shown in <title> and social cards
  description: Meta description.   # shown in search results and social cards
  canonical: https://www.example.com/page   # canonical URL (always the English version for localized content)
```

**Canonical URL rules:**
- English pages: canonical = full URL of the page itself
- Localized pages: canonical = URL of the English version
- Always include the protocol (`https://`) in canonical URLs

---

## Content Authoring Rules (Strict)

1. **Do NOT create ` ```javascript ` code blocks in blog post markdown bodies.** Use ` ```bash ` or inline `code` instead. Nitro prerender esbuild cannot handle `return` statements inside JS code blocks in markdown — the build will fail.
2. **Do NOT edit files outside `content/`** unless explicitly asked.
3. **Do NOT add arbitrary routes.** Before adding a nav link with `to: /pricing`, create `content/pages/pricing.md` first.
4. **All page `to` links in `bodyBlocks` must be valid JennaPress routes.** External URLs (starting with `https://`) are valid.
5. **Keep `publishedAt` dates in ISO format** (`"YYYY-MM-DD"`).
6. **Slug must be URL-safe** — use lowercase, hyphens, no spaces.
7. **All mandatory front matter fields must be present.** Missing required fields cause build failures.
8. **Do not hardcode URLs in body content.** Use the canonical domain from `site.md`. For template-assets, use paths starting with `/template-assets/<template-name>/`.
9. **`category` field in posts must match real-world categorization.** Slugified value must have a corresponding mapping in the template's `blog/blog.config.ts`, or the `default` module will be used.

---

## Activation

When the user asks to add a page, write a blog post, translate content, update site settings, or modify anything in `content/`, prepend this prompt to the request.
