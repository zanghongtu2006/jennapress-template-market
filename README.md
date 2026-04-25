# JennaPress

[![Website](https://img.shields.io/badge/Website-www.jennapress.com-blue)](https://www.jennapress.com)
![Framework](https://img.shields.io/badge/Framework-Nuxt_3-00DC82?style=for-the-badge&logo=nuxt.js)
![Strategy](https://img.shields.io/badge/Strategy-Static_First-blue?style=for-the-badge)
![Design](https://img.shields.io/badge/Design-Template_Driven-FF69B4?style=for-the-badge)

JennaPress is a lightweight, static-first, template-driven website framework built with Nuxt 3.

It is designed for websites where most business changes should happen in `content/`, `templates/`, and `public/template-assets/`, while routing, rendering, and data loading remain generic and stable.

Typical use cases include company websites, landing pages, product showcase sites, blogs, documentation sites, content hubs, catalogs, and other static or mostly-static websites.

---

## 1. Design goals

JennaPress follows a small set of core principles:

- Keep the framework layer stable.
- Let users mainly edit `content/*`.
- Let designers and template authors mainly edit `templates/*` and `public/template-assets/*`.
- Keep routing generic instead of hardcoding business pages.
- Support multiple content types such as `page`, `blog`, and `product`.
- Support multilingual sites through registered locale content.
- Make templates distributable as standalone packages.

---

## 2. Quick start

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build a static site:

```bash
npm run generate
```

Preview the generated site:

```bash
npm run preview
```

---

## 3. Project structure

```text
content/
  l18n.ts
  site.md
  site.<locale>.md
  pages/
  posts/
  products/

public/
  template-assets/
    <template-id>/

templates/
  <template-id>/
    template.meta.json
    Template.vue
    Frame.vue
    template.css
    components/
    page/
    blog/
    product/

pages/
  index.vue
  [...slug].vue
  blog/
  products/

lib/
components/
composables/
types/
```

The main editable areas are:

- `content/` for site data and content data.
- `templates/` for layout, styling, and content-type rendering.
- `public/template-assets/` for template-specific static assets.

The framework areas such as `pages/`, `lib/`, `components/`, `composables/`, and `types/` should usually remain unchanged when creating or installing a template.

---

## 4. Content layer

The content layer is responsible for site configuration, localized text, pages, posts, and products.

### Required registration files

```text
content/l18n.ts
content/site.md
content/site.<locale>.md
```

`content/l18n.ts` registers supported locales.

`content/site.md` is the default site configuration.

`content/site.<locale>.md` provides localized site configuration, for example:

```text
content/site.zh.md
```

### Content types

JennaPress can render several content types:

```text
page
blog
product
```

A content item should declare the fields required by its type. For products, common fields include:

```yaml
title: "Example Product"
description: "Short product description."
category: "example-category"
tags:
  - seo
  - nuxt
price: 0
previewImage: "/template-assets/example/cover.webp"
previewUrl: "https://example.com/preview"
downloadUrl: "https://example.com/download.zip"
```

A product should belong to one primary `category`. It may have multiple `tags` for filtering, search, and recommendation.

---

## 5. Template layer

A template lives under:

```text
templates/<template-id>/
```

A typical template contains:

```text
template.meta.json
Template.vue
Frame.vue
template.css
components/
page/
blog/
product/
```

### Template responsibilities

A template is responsible for:

- visual design
- responsive layout
- content-type rendering
- component composition
- template-specific CSS
- using assets from `public/template-assets/<template-id>/`

A template should not be responsible for:

- changing core routing
- changing global data loaders
- changing build configuration
- introducing backend-only behavior
- hardcoding business data that belongs in `content/`

### Content-type modules

Templates may implement modules for specific content types:

```text
templates/<template-id>/page/
templates/<template-id>/blog/
templates/<template-id>/product/
```

For example, a product-oriented template may provide:

```text
templates/<template-id>/product/ProductHome.vue
templates/<template-id>/product/ProductCategory.vue
templates/<template-id>/product/ProductDetail.vue
```

---

## 6. Public assets

Template-specific public assets should be stored under:

```text
public/template-assets/<template-id>/
```

Examples:

```text
public/template-assets/<template-id>/cover.webp
public/template-assets/<template-id>/screenshot-1.webp
public/template-assets/<template-id>/icons.svg
```

Avoid mixing template assets directly into unrelated public folders. Keeping assets namespaced by template id makes packaging, installation, and cleanup safer.

---

## 7. Multilingual content

JennaPress uses locale registration and localized site/content files.

A typical setup:

```text
content/l18n.ts
content/site.md
content/site.zh.md
```

Templates should use locale-aware navigation helpers and avoid hardcoded internal links when a localized route is expected.

Language switchers should switch between registered locales and keep the current page context whenever possible.

---

## 8. Template package standard

A JennaPress template package is a standalone package that can be installed into a JennaPress project.

To keep packages portable and safe, a template package should contain exactly the following five top-level items:

```text
example-template/
  jennapress-template.json
  templates/
    <template-id>/
  public/
    template-assets/
      <template-id>/
  demo-content/
    l18n.ts
    site.md
    site.<locale>.md
    pages/
    posts/
    products/
  README.md
```

The five top-level items are:

1. `jennapress-template.json` — package manifest.
2. `templates/` — the actual template implementation.
3. `public/` — template-specific public assets.
4. `demo-content/` — optional sample content for preview or manual import.
5. `README.md` — installation notes and package-specific usage instructions.

A template package must not include the JennaPress framework source code. It should not include framework directories such as `pages/`, `lib/`, `components/`, `composables/`, `types/`, `server/`, `nuxt.config.ts`, or `package.json`.

A template package should also not include a root-level `content/` directory. Sample content belongs in `demo-content/` so it does not overwrite a user’s existing site content by default.

---

## 9. Template manifest

Example `jennapress-template.json`:

```json
{
  "id": "example-template",
  "name": "Example Template",
  "type": "product",
  "version": "1.0.0",
  "entry": "templates/example-template",
  "assets": "public/template-assets/example-template",
  "demoContent": "demo-content",
  "supports": ["en", "zh"],
  "requires": {
    "jennapress": ">=1.0.0"
  }
}
```

The manifest is used to describe the template package, locate the entry template, locate assets, declare demo content, and define compatibility.

---

## 10. Safe installation rules

When installing a template into an existing project:

1. Copy `templates/<template-id>/` into the project.
2. Copy `public/template-assets/<template-id>/` into the project.
3. Do not overwrite `content/` automatically.
4. Treat `demo-content/` as optional sample data.
5. Preserve existing `content/l18n.ts`, `content/site.md`, and localized site files unless the user explicitly confirms replacement.
6. Keep the framework layer unchanged unless a template explicitly declares a required core version or migration.

This keeps template installation reversible and reduces the risk of losing user content.

---

## 11. Development boundaries

For normal template work, changes should be limited to:

```text
templates/
content/
public/
```

Avoid changing these areas unless the task is explicitly about framework development:

```text
pages/
lib/
components/
composables/
types/
server/
nuxt.config.ts
package.json
```

This boundary makes code review easier and keeps templates portable.

---

## 12. Deployment

JennaPress is static-first. A generated site can be deployed to static hosting platforms after running:

```bash
npm run generate
```

The generated output can be served by any static file host, CDN, object storage service, or traditional web server.

---

## 13. Licensing model

The JennaPress framework and individual JennaPress template packages may use different licensing models.

For the JennaPress framework repository, usage, modification, redistribution, and commercial rights are defined by the `LICENSE` file in that repository.

For standalone template packages, the recommended rule is:

```text
Framework source code is not included in the package.
Template package rights are defined by the package itself.
If a template package does not include a LICENSE file, no open-source license is granted by default.
```

A proprietary template package may include the following notice in its package README:

```text
This template package is proprietary. No license is granted for redistribution, resale, sublicensing, public hosting, or use as a competing template package or template marketplace. All rights reserved.
```

This keeps the open-source JennaPress framework and proprietary template packages separated.
