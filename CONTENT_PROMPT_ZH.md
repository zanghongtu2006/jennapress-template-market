# 内容创作提示词（中文）

使用此提示词来让 AI 为 JennaPress CMS 站点**创建、更新或管理内容**。

JennaPress 是一个静态优先、多语言的 CMS，所有内容都存储在 Markdown 文件中。本提示词定义了内容文件的确切结构、多语言内容的运作方式、主题配置方法，以及内容作者必须严格禁止的操作。

---

## 内容文件位置

```
content/
├── site.md              ← 站点全局配置（名称、导航、主题等）
├── l18n.ts              ← 语言定义（语言代码和标签）
├── pages/
│   ├── index.md         ← 首页内容
│   ├── about.md         ← 关于页面
│   ├── principles.md    ← 原则页面
│   └── <locale>/
│       ├── index.md     ← 本地化首页
│       ├── about.md     ← 本地化关于页
│       └── ...
└── posts/
    ├── release-notes-v1-0-0.md    ← 英文文章
    └── <locale>/
        ├── release-notes-v1-0-0.md   ← 本地化文章（相同 slug）
        └── ...
```

**绝对规则：只编辑 `content/` 下的文件。严禁触碰 `templates/`、`components/`、`pages/`、`composables/`、`lib/`、`types/` 或 `assets/`。**

---

## `content/site.md` — 站点配置

这不是内容页面，而是站点配置文件。编辑它来更改站点标识、导航、主题和默认设置。

```yaml
---
name: 我的网站
logoText: MW
siteUrl: https://www.example.com
defaultTemplate: corporate-basic
defaultTheme: dark
themes:
  - dark
  - light
  - pink
tagline: 站点标语
nav:
  - label: 首页
    to: /
  - label: 关于
    to: /about
  - label: 博客
    to: /blog
footerText: 所有页面显示的页脚文字。
contactEmail: hello@example.com
socialLinks:
  - label: GitHub
    to: https://github.com/example
---
```

**可用字段：**

| 字段 | 必填 | 说明 |
|---|---|---|
| `name` | 是 | 站点显示名称（用于 HeaderBar、FooterBar、SEO） |
| `logoText` | 是 | 短 Logo 文字（如 "JP"、"示例"） |
| `siteUrl` | 是 | 生产站点完整 URL（用于规范 URL 和 sitemap） |
| `defaultTemplate` | 是 | 使用哪个模板（必须匹配 `templates/` 下的目录名） |
| `defaultTheme` | 是 | 默认加载哪个主题（必须与模板 CSS 中的 `[data-theme]` 匹配） |
| `themes` | 是 | 可用主题列表（用户可在这些之间切换） |
| `tagline` | 否 | 站点标语 |
| `nav` | 是 | 导航链接。`to` 必须是有效路由（根路径用 `/`，页面用 `/about`，博客用 `/blog`） |
| `footerText` | 是 | 页脚标语文字 |
| `contactEmail` | 否 | 页脚显示的联系邮箱 |
| `socialLinks` | 否 | 页脚社交链接列表 `{label, to}` |

**导航规则：**
- 每个 `to` 路径必须是有效路由。JennaPress 路由：`/`、`/about`、`/principles`、`/blog`、`/blog/:category`、`/blog/:category/:slug`
- 添加任意路由（如 `/pricing`）前必须先创建 `content/pages/pricing.md`
- **禁止**在 nav 的 `to` 值前加语言前缀 — 路由系统会自动处理

---

## `content/l18n.ts` — 语言定义

此文件定义站点支持哪些语言。编辑它来添加或移除语言。

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

**规则：**
- 必须恰好有一个语言设置 `isDefault: true` — 这是回退语言
- 默认语言**没有** URL 前缀（`/` 而不是 `/en/`）
- 其他语言都有 URL 前缀（`/de/`、`/zh/` 等）
- 添加新语言：加入此数组 + 在 `content/pages/` 和 `content/posts/` 下创建对应语言的子目录
- 移除语言：从此数组删除 + 同时删除 `content/pages/` 和 `content/posts/` 下对应的语言子目录

---

## 页面内容（`content/pages/`）

### 英文页面（默认语言）

```yaml
---
slug: /
title: 首页
summary: 一句话描述，用于 SEO 和社交分享。
seo:
  title: 首页 | 站点名称
  description: SEO 完整 meta 描述。
  canonical: https://www.example.com/
bodyTitle: 欢迎来到我们的网站
bodyBlocks:
  - type: hero
    kicker: 公司名称
    title: 主标题
    description: 副标题描述您的价值主张。
    primaryAction:
      label: 立即开始
      to: /about
    secondaryAction:
      label: 阅读更多
      to: /blog
  - type: feature-grid
    title: 为什么选择我们
    items:
      - title: 特性一
        description: 特性一描述。
      - title: 特性二
        description: 特性二描述。
  - type: cta-banner
    title: 准备好了吗？
    description: 行动号召描述。
    action:
      label: 联系我们
      to: /about
---
开头段落内容在这里。
```

### 本地化页面

创建 `content/pages/<locale>/<slug>.md`。例如：`content/pages/de/index.md`、`content/pages/de/about.md`。

**本地化规则：**
- 使用与英文版本相同的 `slug` 字段值
- 页面标题、摘要、正文和所有 block 文字必须翻译为目标语言
- SEO `canonical` 应指向英文版本 URL
- 如果某个页面不存在本地化版本，则显示英文版本（若语言前缀匹配支持的语言）

---

## 博客文章内容（`content/posts/`）

### 英文文章（默认语言）

```yaml
---
slug: my-first-post
title: 我的第一篇博客文章
summary: 博客文章摘要，用于文章卡片展示和 SEO。
publishedAt: "2026-04-01"
category: Project
tags:
  - 标签一
  - 标签二
author:
  name: 作者名称
  avatar: /template-assets/corporate-basic/avatar-placeholder.png
seo:
  title: 我的第一篇博客文章 | 站点名称
  description: 本文的 SEO meta 描述。
  canonical: https://www.example.com/blog/project/my-first-post
bodyTitle: 我的第一篇博客文章
bodyBlocks:
  - type: cta-banner
    title: 有问题或反馈？
    description: 告诉我们您的想法。
    action:
      label: 提交 Issue
      to: https://github.com/example/issues
---
博客正文内容在这里，写普通 Markdown 即可。

可以使用 **粗体**、*斜体* 和 [链接](https://example.com)。

**禁止在博客正文 Markdown 中使用 ```javascript 代码块。**
Nitro 预渲染阶段的 esbuild 无法解析 Markdown 中 JS 代码块里的 `return` 语句，
会导致构建失败，错误信息为："Expected ; but found undefined"。
请使用普通段落或 ```bash 代码块代替。
```

### 本地化文章

创建 `content/posts/<locale>/<slug>.md`。例如：`content/posts/de/my-first-post.md`。

与英文版本使用相同的 `slug`。翻译所有面向用户的字段。

### category 字段

`category` 字段决定文章属于哪个博客分类。它会被自动 slugified（空格→连字符，转小写）。

有效分类：`Project`、`Usage`、`Case Study`、`Product Note`、`Event Promo` 等。

slugified 后的分类名在模板的 `blog/blog.config.ts` 中匹配，以确定使用哪个博客模块组件来渲染。

**重要：**如果模板没有为某个分类注册模块，则使用 `default` 兜底。

---

## 页面可用的 Block 类型

在页面内容文件（`content/pages/*.md`）的 `bodyBlocks` 数组中使用。

### `hero`

```yaml
- type: hero
  kicker: 标题上方可选的 kicker
  title: 主 Hero 标题
  description: 副标题文字。
  primaryAction:
    label: 主 CTA 按钮文字
    to: /about        # 内部路径或完整 URL
  secondaryAction:
    label: 次要 CTA
    to: /blog
  panelTitle: 可选的右侧面板标题
  panelLines:          # 右侧面板显示的行
    - 第一行
    - 第二行
```

### `feature-grid`

```yaml
- type: feature-grid
  title: 区块标题
  description: 可选的区块描述。
  items:
    - title: 特性标题
      description: 特性描述。
    - title: 另一个特性
      description: 另一个描述。
```

### `rich-text`

```yaml
- type: rich-text
  title: 可选的区块标题
  html: |
    <p>这是<strong>富文本</strong>内容。</p>
    <p>使用 <a href="/about">内部链接</a> 或
       <a href="https://example.com">外部链接</a>。</p>
```

### `cta-banner`

```yaml
- type: cta-banner
  title: 行动号召标题
  description: 补充描述文字。
  action:
    label: 按钮文字
    to: /contact
```

### `stats`

```yaml
- type: stats
  title: 我们的数字
  description: 可选介绍文字。
  items:
    - value: "100+"
      label: 客户
      note: 全球范围
    - value: "99.9%"
      label: 运行时间
```

### `contact`

```yaml
- type: contact
  title: 联系我们
  description: 联系页面介绍。
  email: hello@example.com
  phone: "+49 30 123456"
  address: 示例街道 1 号，10115 德国柏林
```

---

## 主题配置

主题**不是在内容文件中设置的**。主题的运作方式是：
1. 在 `content/site.md` 的 `themes: []` 中声明可用主题
2. 在活动模板的 `template.css` 中以 CSS 自定义属性实现
3. 用户通过 ThemeSelect 组件选择主题（由模板提供 UI）

**为站点添加新主题：**
1. 编辑 `content/site.md` → 在 `themes` 数组中添加主题名
2. 编辑模板的 `template.css` → 添加 `[data-theme="theme-name"]` 代码块并定义 CSS 变量

**更改默认主题：** 编辑 `content/site.md` → 修改 `defaultTheme` 字段。

---

## 多语言内容规则

### 添加新语言

1. 在 `content/l18n.ts` 添加语言
2. 创建 `content/pages/<locale>/` 目录，放入翻译后的页面
3. 创建 `content/posts/<locale>/` 目录，放入翻译后的文章
4. 每个本地化文件保持相同的 `slug` 字段值
5. 更新本地化页面/文章 front matter 中的 `canonical` URL，指向英文版本

### 翻译文章

对于每个英文文章 `content/posts/<slug>.md`，创建：
- `content/posts/de/<slug>.md`
- `content/posts/zh/<slug>.md`
- 依此类推

所有本地化版本必须共享相同的 `slug` 字段值。只翻译内容（标题、摘要、正文、block 文字）。

### 翻译页面

对于每个英文页面 `content/pages/<slug>.md`，创建：
- `content/pages/de/<slug>.md`
- 依此类推

规则与文章相同：共享 `slug`，翻译内容，`canonical` → 英文版本 URL。

---

## SEO 字段

每个页面和文章都支持以下 SEO 字段：

```yaml
seo:
  title: 页面标题 | 站点名称    # 显示在 <title> 和社交卡片
  description: Meta 描述。        # 显示在搜索结果和社交卡片
  canonical: https://www.example.com/page   # 规范 URL（本地化内容永远指向英文版本）
```

**Canonical URL 规则：**
- 英文页面：canonical = 页面本身的完整 URL
- 本地化页面：canonical = 英文版本的 URL
- canonical URL 必须包含协议（`https://`）

---

## 内容创作规则（严格）

1. **禁止在博客正文的 Markdown 中使用 ` ```javascript ` 代码块。** 请使用 ` ```bash ` 或行内 `code` 代替。Nitro 预渲染 esbuild 无法处理 Markdown 中 JS 代码块里的 `return` 语句 — 构建将失败。
2. **不要编辑 `content/` 以外的文件**，除非明确要求。
3. **不要添加任意路由。** 在添加 `to: /pricing` 的 nav 链接前，必须先创建 `content/pages/pricing.md`。
4. `bodyBlocks` 中所有页面的 `to` 链接必须是有效的 JennaPress 路由。以 `https://` 开头的外部 URL 视为有效。
5. **`publishedAt` 日期必须使用 ISO 格式**（`"YYYY-MM-DD"`）。
6. **Slug 必须是 URL 安全的** — 使用小写、连字符，不含空格。
7. **所有必填 front matter 字段必须存在。** 缺失必填字段会导致构建失败。
8. **不要在正文内容中硬编码 URL。** 使用 `site.md` 中的规范域名。模板资源路径以 `/template-assets/<template-name>/` 开头。
9. **文章的 `category` 字段必须符合实际分类。** slugified 后的值必须在模板的 `blog/blog.config.ts` 中有对应映射，否则使用 `default` 模块兜底。

---

## 激活方式

当用户要求添加页面、撰写博客文章、翻译内容、更新站点设置，或修改 `content/` 中的任何内容时，将此提示词附加到请求前，发给 AI。
