# 模板生成提示词（中文）

使用此提示词来让 AI 为 JennaPress CMS **生成、扩展或修改**网站模板。

JennaPress 是一个静态优先、多语言、模板驱动的 Nuxt CMS。本提示词告诉 AI 模板的工作机制、必须生成哪些文件、必须遵守哪些规则，以及绝对禁止哪些操作。

---

## 系统概述

### 目录边界（绝对禁止越界）

```
project-root/
├── templates/         ← 模板包存放位置
├── public/
│   └── template-assets/  ← 仅限模板专属资源
├── content/          ← 所有站点内容（Markdown）
├── components/       ← CMS 共享组件（禁止修改）
├── pages/            ← 路由定义（禁止修改）
├── composables/      ← 共享逻辑（禁止修改）
├── lib/              ← 核心处理逻辑（禁止修改）
├── types/            ← TypeScript 接口（禁止修改）
└── assets/           ← 全局 CSS / 主题（动前需确认）
```

**AI 规则：禁止触碰 `components/`、`pages/`、`composables/`、`lib/`、`types/`、`assets/`，除非用户明确要求。**

AI 可自由操作的范围：`templates/<template-name>/`、`public/template-assets/<template-name>/`、`content/`。

---

## 模板包结构

一个完整的模板位于 `templates/<template-name>/`：

```
templates/<template-name>/
├── Template.vue          ← 页面级模板（接收 PageContent，渲染 blocks）
├── Frame.vue             ← 外层框架（HeaderBar + slot + FooterBar）
├── template.css          ← 所有模板 CSS（BEM 命名）
├── template.meta.json     ← 模板元数据
└── blog/
    ├── BlogHome.vue      ← /blog 页面模板
    ├── BlogCategory.vue  ← /blog/:category 模板
    ├── BlogPost.vue      ← /blog/:category/:slug 模板
    ├── blog.config.ts    ← 分类 → 模块 映射
    └── modules/
        ├── DefaultCategory.vue   ← 兜底分类页
        ├── DefaultPost.vue       ← 兜底文章页
        ├── CasesCategory.vue     ← 可选：自定义分类布局
        ├── CasesPost.vue         ← 可选：自定义文章布局
        └── ...                  ← 其他自定义分类模块

public/template-assets/<template-name>/
└── （此模板专用的所有图片/字体/资源）
```

注意：不存在 `TemplateShell.vue`。外层框架分为：
- `Frame.vue` = 外层包装（HeaderBar + slot + FooterBar）
- `Template.vue` = 内层页面渲染器（接收页面内容，渲染 blocks）

---

## 文件逐个说明

### `template.meta.json`

```json
{
  "name": "<template-name>",
  "version": "0.0.1",
  "label": "人类可读的模板名称",
  "description": "一句话描述此模板。",
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

`supportedBlocks` 数组告知 CMS 此模板支持哪些 block 类型。不得引用不在此列表中的 block 类型。

### `Frame.vue`

Frame 接收 `SiteConfig` 作为 prop，为每个页面包裹 Header 和 Footer。

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

Frame 由 CMS 路由层渲染 — 无需在模板包内手动导出。

### `Template.vue`

Template 接收 `PageContent`，通过 `<BlockRenderer>` 渲染 block 堆栈。

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

HeaderBar 是多语言站点的最关键组件。必须实现语言感知的 Logo 导航。

**必须照此模式实现（严格复制）：**

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
      <!-- Logo: 必须使用 :href="localeHome"，禁止使用 <NuxtLink to="/"> -->
      <a :href="localeHome" class="template-<template-name>-brand">
        <span class="template-<template-name>-brand-mark">{{ site.logoText }}</span>
        <span>{{ site.name }}</span>
      </a>
      <!-- 导航 -->
      <nav>
        <NuxtLink v-for="item in site.nav" :key="item.to" :to="item.to">
          {{ item.label }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
```

**HeaderBar 关键规则：**
- Logo **必须**使用 `<a :href="localeHome">`，**禁止**使用 `<NuxtLink to="/">`
- `localeHome` **必须**从 `localStorage.getItem('site-language')` 读取，若有值则加 `/` 前缀
- 如果 Logo 链接到 `/`，点击后会重置用户语言到英语（这是已知的严重 BUG）
- 导航项来自 `site.nav`，已包含 locale 前缀，直接透传即可

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

SectionRail 是全宽容器，居中并留白。必须存在于每个模板中。

```vue
<template>
  <main class="template-<template-name>-main">
    <slot />
  </main>
</template>
```

### `PageSurface.vue`

PageSurface 用 `page-stack` class 包裹主内容区。

```vue
<template>
  <div class="page-stack">
    <slot />
  </div>
</template>
```

### `blog/blog.config.ts`

将博客分类映射到 Vue 组件。

```ts
import BlogHome from './BlogHome.vue'
import DefaultCategory from './modules/DefaultCategory.vue'
import DefaultPost from './modules/DefaultPost.vue'

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

规则：
- `categoryTemplates` 和 `postTemplates` 必须提供 `default`
- 未映射的分类回退到 `default`
- 分类来自文章 front matter 的 `category` 字段，slugified 后匹配

### Blog 组件的 Props

- `BlogHome.vue`: `site`, `categories`, `sections: Array<{ category, posts }>`, `locale?`, `defaultLocale?`
- `BlogCategory.vue`: `site`, `category`, `posts`, `locale?`, `defaultLocale?`
- `BlogPost.vue`: `site`, `post`, `locale?`, `defaultLocale?`

Blog 组件内 locale 前缀辅助函数：

```ts
const props = defineProps<{ ...; locale?: string; defaultLocale?: string }>()
const p = (path: string) =>
  (props.locale && props.locale !== props.defaultLocale)
    ? ('/' + props.locale + path)
    : path
```

在 Blog 组件内使用 `p('/blog')` 生成带 locale 前缀的链接。

---

## CSS 命名规范（BEM）

所有模板 CSS 使用带模板前缀的 BEM 命名：

```css
.template-<template-name> { }                        /* Block */
.template-<template-name>-frame { }                  /* Element: frame */
.template-<template-name>-header { }                /* Element: header */
.template-<template-name>-header-inner { }          /* Element: header inner */
.template-<template-name>-brand { }                 /* Element: brand */
.template-<template-name>-brand--active { }         /* Modifier: brand 激活状态 */
.template-<template-name>-nav { }                    /* Element: nav */
.template-blog { }                                  /* Block: blog 共享 */
.template-blog-hero { }                             /* Element: blog hero */
.template-post-card { }                             /* Block: post card */
.template-post-card--featured { }                   /* Modifier: featured card */
```

CSS 文件必须在 `Frame.vue` 和 `Template.vue` 中同时引入。

---

## 主题系统

主题通过 CSS 自定义属性（CSS Custom Properties）实现，挂在 `document.documentElement`（即 `<html>` 元素）上。

**可用主题列表**在 `content/site.md` 的 `themes: []` 中定义。用户选择的主题存储在 `localStorage` 的 `site-theme` 字段。

**工作原理：**
- `localStorage.getItem('site-theme')` → 主题名字符串
- CMS 在页面渲染前注入 `<html data-theme="dark">`（或对应值）
- 模板 CSS 必须将所有颜色值定义为 CSS 变量，作用域为 `[data-theme="..."]`

```css
/* Light 主题 */
[data-theme="light"] {
  --primary: #3b82f6;
  --background: #ffffff;
  --text: #1e293b;
}

/* Dark 主题 */
[data-theme="dark"] {
  --primary: #60a5fa;
  --background: #0f172a;
  --text: #f1f5f9;
}

/* Pink 主题 */
[data-theme="pink"] {
  --primary: #ec4899;
  --background: #fdf2f8;
  --text: #831843;
}
```

模板组件引用这些变量：

```css
background: var(--background);
color: var(--text);
border-color: var(--border);
```

**ThemeSelect 组件**由 CMS 提供（在 `components/shared/` 中）。无需自己构建。模板 CSS 必须支持 `site.md` 中声明的所有主题。

---

## 可用 Block 类型

这些已在全局 `BlockRenderer.vue` 中注册。可以在页面的 `bodyBlocks` front matter 中使用：

| Block 类型 | Front Matter 字段 |
|---|---|
| `hero` | `kicker`, `title`, `description`, `primaryAction: {label, to}`, `secondaryAction: {label, to}`, `panelTitle`, `panelLines[]` |
| `feature-grid` | `title`, `description?`, `items: Array<{title, description}>` |
| `rich-text` | `title?`, `html`（原始 HTML 字符串） |
| `cta-banner` | `title`, `description?`, `action: {label, to}` |
| `stats` | `title`, `description?`, `items: Array<{value, label, note?}>` |
| `contact` | `title`, `description?`, `email?`, `phone?`, `address?` |

**重要：**博客文章的 Markdown 正文不属于 block 类型。博客文章正文独立于 block 系统渲染。`rich-text` block 仅用于结构化页面内容（`content/pages/`）。

---

## 多语言路由规则

JennaPress 使用基于 URL 的语言路由：
- 英语（默认）：无前缀 — `/`、`/about`、`/blog`
- 其他语言：`/de/`、`/zh/`、`/es/`、`/el/` — `/de/about`、`/zh/blog`

语言列表来自 `content/l18n.ts`。路由由 `nuxt.config.ts` 的 pages hook 处理。无需手动添加语言路由。

**在模板组件中：**
- Props 已包含 `locale?: string` 和 `defaultLocale?: string`
- 使用 `p('/path')` 辅助函数生成带 locale 前缀的链接
- `site.nav` 中的导航链接无需处理 locale 前缀，CMS 会自动按页面路由添加
- **HeaderBar Logo 链接必须使用语言感知逻辑**（见 HeaderBar 章节）

---

## Category 到模块的映射

文章 front matter 的 `category` 字段 → slugified → 在 `blog.config.ts` 中匹配。

示例：`category: Case Study` → slugified 为 `case-study` → 查找 `categoryTemplates['case-study']`。

若没有对应映射，使用 `default`。

category 同时决定使用哪个 `postTemplates` 变体来渲染文章详情页。

---

## AI 必须禁止的行为

1. **禁止重命名或重构框架文件** — `components/`、`pages/`、`composables/`、`lib/`、`types/` 已锁定。
2. **禁止新增 block 类型** — block 类型在全局 `components/BlockRenderer.vue` 中注册。扩展 block 系统前必须询问用户。
3. **禁止对 Logo 使用 `<NuxtLink to="/">`** — 这会破坏语言持久化。必须使用语言感知的 `localeHome` 模式。
4. **禁止硬编码业务文案** — 所有内容必须来自 Markdown front matter。
5. **禁止为基础页面渲染引入运行时数据获取** — 这是静态优先 CMS。
6. **禁止在内容 Markdown 中创建 JavaScript 代码块** — Nitro 预渲染阶段的 esbuild 无法解析 Markdown 中 ` ```javascript ` 块里的 `return` 语句，会导致构建失败。
7. **禁止在 JavaScript 中处理主题逻辑** — 主题是纯 CSS 自定义属性，通过 `data-theme` 属性控制。
8. **禁止在模板文件内从 `~/components/` 导入** — 除非是明确标注为模板可用的共享组件（如 `OpenSourceFooterAttribution`）。

---

## AI 可能收到的输入类型

用户可能提供：
- 业务描述 → 推导专业公司网站结构
- 结构化需求列表 → 映射到模板组件和 blocks
- Landing page 需求 → 生成 `Template.vue` + blocks
- 已有 HTML → 保留视觉意图，重构为模板组件
- 设计截图 → 推导布局区块，用 Vue + CSS 还原
- Figma 导出描述 → 同上
- 线框图 → 同上

AI 将以上所有输入转换为 `templates/<template-name>/` 下的模板包。

---

## 要求的输出格式

每次模板生成请求都必须返回：

1. 视觉系统说明（1-2 句话）
2. 完整文件树
3. 每个必需文件的完整代码（禁止片段）
4. 明确列出的所有假设
5. 禁止营销文案或框架重构建议

代码必须可投产，可直接接入 JennaPress 模板协议。

---

## 激活方式

当用户说"生成模板"、"create a new template"或"添加一个模板"时，将此完整提示词附加到请求前，发给 AI。
