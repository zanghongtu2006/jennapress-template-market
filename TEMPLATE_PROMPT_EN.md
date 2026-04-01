# Template Generation Prompt (English)

Use this prompt when asking an AI to generate, extend, or modify a **site template** for JennaPress CMS.

JennaPress is a static-first, multilingual, template-driven Nuxt CMS. This prompt tells the AI exactly how templates work, what files to produce, what rules to follow, and what is strictly forbidden.

---

## System Overview

### Directory Boundaries (ABSOLUTE — AI Must Not Violate)

```
project-root/
├── templates/        ← template package lives here
├── public/
│   └── template-assets/  ← template-specific assets only
├── content/         ← all site content (markdown)
├── components/      ← shared CMS components (DO NOT MODIFY)
├── pages/           ← route definitions (DO NOT MODIFY)
├── composables/     ← shared logic (DO NOT MODIFY)
├── lib/             ← core processing logic (DO NOT MODIFY)
├── types/           ← TypeScript interfaces (DO NOT MODIFY)
└── assets/          ← global CSS / themes (ask before touching)
```

**AI rule: Never touch `components/`, `pages/`, `composables/`, `lib/`, `types/`, or `assets/` unless the user explicitly asks.**

AI may freely work in: `templates/<template-name>/`, `public/template-assets/<template-name>/`, and `content/`.

---

## Template Package Structure

A complete template lives in `templates/<template-name>/`:

```
templates/<template-name>/
├── Template.vue          ← page-level template (receives PageContent, renders blocks)
├── Frame.vue             ← outer shell (header + slot + footer)
├── template.css          ← all template CSS (BEM naming)
├── template.meta.json     ← template metadata
└── blog/
    ├── BlogHome.vue      ← /blog page template
    ├── BlogCategory.vue  ← /blog/:category template
    ├── BlogPost.vue      ← /blog/:category/:slug template
    ├── blog.config.ts    ← category → module mapping
    └── modules/
        ├── DefaultCategory.vue   ← fallback category page
        ├── DefaultPost.vue        ← fallback post page
        ├── CasesCategory.vue      ← optional: custom category layout
        ├── CasesPost.vue          ← optional: custom post layout
        └── ...                   ← other custom category modules

public/template-assets/<template-name>/
└── (all image/fonts/assets specific to this template)
```

Note: There is NO `TemplateShell.vue`. The shell is split into:
- `Frame.vue` = outer wrapper (HeaderBar + slot + FooterBar)
- `Template.vue` = inner page renderer (receives page content and renders blocks)

---

## File-by-File Specification

### `template.meta.json`

```json
{
  "name": "<template-name>",
  "version": "0.0.1",
  "label": "Human-readable name",
  "description": "One sentence about this template.",
  "supportedPageTypes": ["page"],
  "supportedBlocks": [
    "hero",
    "feature-grid",
    "rich-text",
    "cta-banner",
    "stats",
    "contact"
  ]
}
```

The `supportedBlocks` array tells the CMS which block types this template can render. Do NOT reference block types not in this list.

### `Frame.vue`

Frame receives `SiteConfig` as prop. It wraps every page with the site header and footer.

```vue
<script setup lang="ts">
import type { SiteConfig } from '~/types'
import '~/templates/<template-name>/template.css'
import HeaderBar from '~/templates/<template-name>/components/HeaderBar.vue'
import FooterBar from '~/templates/<template-name>/components/FooterBar.vue'
import SectionRail from '~/templates/<template-name>/components/SectionRail.vue'

defineProps<{ site: SiteConfig }>()
</script>

<template>
  <div class="template-<template-name>-frame">
    <HeaderBar :site="site" />
    <SectionRail>
      <slot />
    </SectionRail>
    <FooterBar :site="site" />
  </div>
</template>
```

The Frame is rendered by the CMS routing layer — you do NOT export it from the template package yourself.

### `Template.vue`

Template receives `PageContent` and renders the block stack via `<BlockRenderer>`.

```vue
<script setup lang="ts">
import type { PageContent } from '~/types'
import '~/templates/<template-name>/template.css'
import PageSurface from '~/templates/<template-name>/components/PageSurface.vue'

defineProps<{ page: PageContent }>()
</script>

<template>
  <PageSurface>
    <BlockRenderer :blocks="page.blocks" />
  </PageSurface>
</template>
```

### `HeaderBar.vue`

HeaderBar is the most critical component for multilingual sites. It MUST implement locale-aware logo navigation.

**Required pattern — copy exactly:**

```vue
<script setup lang="ts">
import type { SiteConfig } from '~/types'

defineProps<{ site: SiteConfig }>()

const localeHome = computed(() => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('site-language')
    if (saved) return '/' + saved
  }
  return '/'
})
</script>

<template>
  <header class="template-<template-name>-header">
    <div class="container template-<template-name>-header-inner">
      <!-- Logo: MUST use :href="localeHome" to preserve user language -->
      <a :href="localeHome" class="template-<template-name>-brand">
        <span class="template-<template-name>-brand-mark">{{ site.logoText }}</span>
        <span>{{ site.name }}</span>
      </a>
      <!-- Navigation -->
      <nav>
        <NuxtLink v-for="item in site.nav" :key="item.to" :to="item.to">
          {{ item.label }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
```

**Critical rules for HeaderBar:**
- Logo MUST use `<a :href="localeHome">`, NOT `<NuxtLink to="/">`
- `localeHome` MUST read from `localStorage.getItem('site-language')` and prefix with `/` if set
- If the logo links to `/` instead of the locale-aware path, clicking it resets the user's language to English
- The nav items come from `site.nav` and already include the locale prefix — pass them through directly

### `FooterBar.vue`

```vue
<script setup lang="ts">
import type { SiteConfig } from '~/types'
import OpenSourceFooterAttribution from '~/components/shared/OpenSourceFooterAttribution.vue'

defineProps<{ site: SiteConfig }>()
</script>

<template>
  <footer class="template-<template-name>-footer">
    <div class="container template-<template-name>-footer-inner">
      <div class="template-<template-name>-footer-private">
        <div>
          <strong>{{ site.name }}</strong>
          <div>{{ site.footerText }}</div>
        </div>
        <div v-if="site.contactEmail">
          Contact: <a :href="`mailto:${site.contactEmail}`">{{ site.contactEmail }}</a>
        </div>
      </div>
      <div class="template-<template-name>-footer-public">
        <OpenSourceFooterAttribution />
      </div>
    </div>
  </footer>
</template>
```

### `SectionRail.vue`

SectionRail is a simple full-width container that centers and pads content. It MUST exist in every template. See existing templates for reference or create a minimal one.

```vue
<template>
  <main class="template-<template-name>-main">
    <slot />
  </main>
</template>
```

### `PageSurface.vue`

PageSurface wraps the main content area with the `page-stack` class.

```vue
<template>
  <div class="page-stack">
    <slot />
  </div>
</template>
```

### `blog/blog.config.ts`

Maps blog categories to Vue components.

```ts
import BlogHome from './BlogHome.vue'
import DefaultCategory from './modules/DefaultCategory.vue'
import DefaultPost from './modules/DefaultPost.vue'
// import custom category modules as needed

export default {
  home: BlogHome,
  categoryTemplates: {
    default: DefaultCategory,
    // 'case-study': CasesCategory,
    // 'product-note': ProductsCategory,
  },
  postTemplates: {
    default: DefaultPost,
    // 'case-study': CasesPost,
  }
}
```

Rules:
- Always provide `default` in both `categoryTemplates` and `postTemplates`
- Unmapped categories fall back to `default`
- Categories come from post `category` field, slugified (lowercased, spaces → hyphens)

### Blog Components

Blog components receive these props:
- `BlogHome.vue`: `site: SiteConfig`, `categories: BlogCategory[]`, `sections: Array<{ category: BlogCategory, posts: BlogPostSummary[] }>`, `locale?: string`, `defaultLocale?: string`
- `BlogCategory.vue`: `site: SiteConfig`, `category: BlogCategory`, `posts: BlogPostSummary[]`, `locale?: string`, `defaultLocale?: string`
- `BlogPost.vue`: `site: SiteConfig`, `post: BlogPostContent`, `locale?: string`, `defaultLocale?: string`

Locale prefix helper in blog components:

```ts
const props = defineProps<{ ...; locale?: string; defaultLocale?: string }>()
const p = (path: string) =>
  (props.locale && props.locale !== props.defaultLocale)
    ? ('/' + props.locale + path)
    : path
```

Use `p('/blog')` to generate locale-prefixed links within blog components.

---

## CSS Naming Convention (BEM)

All template CSS uses BEM naming with template prefix:

```css
.template-<template-name> { }                    /* Block */
.template-<template-name>-frame { }             /* Element: frame */
.template-<template-name>-header { }            /* Element: header */
.template-<template-name>-header-inner { }      /* Element: header inner */
.template-<template-name>-brand { }              /* Element: brand */
.template-<template-name>-brand--active { }     /* Modifier: brand active state */
.template-<template-name>-nav { }                /* Element: nav */
.template-blog { }                              /* Block: blog shared */
.template-blog-hero { }                         /* Element: blog hero */
.template-post-card { }                         /* Block: post card */
.template-post-card--featured { }              /* Modifier: featured card */
```

CSS file must be imported in both `Frame.vue` and `Template.vue`.

---

## Theme System

Themes work via CSS custom properties on `document.documentElement`.

**Available themes** are defined in `content/site.md` under `themes: []`. The user's selected theme is stored in `localStorage` under `site-theme`.

**How themes work:**
- `localStorage.getItem('site-theme')` → theme name string
- The CMS injects `<html data-theme="dark">` (or whatever the value is) before the page renders
- Your CSS must define all color values as CSS variables scoped to `[data-theme="..."]`

```css
/* Light theme */
[data-theme="light"] {
  --primary: #3b82f6;
  --background: #ffffff;
  --text: #1e293b;
}

/* Dark theme */
[data-theme="dark"] {
  --primary: #60a5fa;
  --background: #0f172a;
  --text: #f1f5f9;
}

/* Pink theme */
[data-theme="pink"] {
  --primary: #ec4899;
  --background: #fdf2f8;
  --text: #831843;
}
```

Template components reference these variables:

```css
background: var(--background);
color: var(--text);
border-color: var(--border);
```

**ThemeSelect component** is provided by the CMS (in `components/shared/`). You do NOT need to build it. Your template CSS must support whatever themes the site.md declares.

---

## Available Block Types

These are registered in `BlockRenderer.vue` globally. You can use any of these in page content's `bodyBlocks` front matter:

| Block Type | Front Matter Fields |
|---|---|
| `hero` | `kicker`, `title`, `description`, `primaryAction: {label, to}`, `secondaryAction: {label, to}`, `panelTitle`, `panelLines[]` |
| `feature-grid` | `title`, `description?`, `items: Array<{title, description}>` |
| `rich-text` | `title?`, `html` (raw HTML string) |
| `cta-banner` | `title`, `description?`, `action: {label, to}` |
| `stats` | `title`, `description?`, `items: Array<{value, label, note?}>` |
| `contact` | `title`, `description?`, `email?`, `phone?`, `address?` |

**Important:** Markdown body content in blog posts is NOT a block type. Blog post body is rendered separately from the block system. Use `rich-text` block only for structured page content.

---

## Multilingual Routing Rules

JennaPress uses URL-based locale routing:
- English (default): no prefix — `/`, `/about`, `/blog`
- Other locales: `/de/`, `/zh/`, `/es/`, `/el/` — `/de/about`, `/zh/blog`

Locale list comes from `content/l18n.ts`. The routing is handled by `nuxt.config.ts` pages hook. You do NOT need to manually add locale routes.

**In template components:**
- Props already include `locale?: string` and `defaultLocale?: string`
- Use the `p('/path')` helper to generate locale-prefixed links
- Navigation links from `site.nav` are NOT locale-prefixed — the CMS adds them per page route
- The HeaderBar logo link MUST use locale-aware logic (see HeaderBar section above)

---

## Category-to-Module Mapping

`category` field in post front matter → slugified → matched in `blog.config.ts`.

Example: `category: Case Study` → slugified to `case-study` → looks up `categoryTemplates['case-study']`.

If no mapping exists for a category, `default` is used.

The category also determines which `postTemplates` variant is used for rendering the post detail page.

---

## What AI Must NOT Do

1. **Do NOT rename or restructure framework files** — `components/`, `pages/`, `composables/`, `lib/`, `types/` are locked.
2. **Do NOT add new block types** — block types are registered globally in `components/BlockRenderer.vue`. Ask the user before extending the block system.
3. **Do NOT use `<NuxtLink to="/">` for the logo** — this breaks locale persistence. Always use the locale-aware `localeHome` pattern.
4. **Do NOT hardcode business copy** — all content must come from Markdown front matter.
5. **Do NOT introduce runtime data fetching** for basic page rendering — this is a static-first CMS.
6. **Do NOT create JavaScript code blocks in content markdown** — Nitro's prerender esbuild process cannot parse `return` statements inside ```javascript blocks in markdown, causing build failures. Avoid emitting JS code blocks in blog post body content.
7. **Do NOT put theme logic in JavaScript** — themes are pure CSS custom properties set via the `data-theme` attribute.
8. **Do NOT import from `~/components/` inside template files** unless it is a shared component explicitly documented as template-usable (e.g., `OpenSourceFooterAttribution`).

---

## Input Types the AI May Receive

The user may provide:
- Business description → infer professional company site structure
- Structured requirements list → map to template components and blocks
- Landing page brief → generate `Template.vue` + blocks
- Existing HTML → preserve visual intent, restructure into template components
- Design screenshot → infer layout blocks, recreate in Vue + CSS
- Figma export description → same as above
- Wireframe → same as above

The AI converts all of these into a template package under `templates/<template-name>/`.

---

## Output Format Required

For every template generation request, return:

1. Visual system summary (1-2 sentences)
2. Complete file tree
3. Full code for every required file (no snippets)
4. Any assumptions stated explicitly
5. No marketing copy or framework redesign proposals

Code must be production-ready and drop-in compatible with the JennaPress template contract.

---

## Activation

When the user says something like "generate a template", "create a new template", or "add a template", prepend this full prompt to the request and hand it to the AI.
