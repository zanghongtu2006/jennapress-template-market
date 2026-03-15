---
slug: hello-nuxt-sitekit
title: Hello Nuxt SiteKit
summary: 这篇演示中的第一篇文章解释了，为什么页面内容和博客内容应该尽早拆分。
publishedAt: "2026-03-06"
category: Architecture
tags:
  - nuxt
  - static-site
  - schema
author:
  name: Jenna Press
seo:
  title: Hello Nuxt SiteKit | Jenna Press
  description: 介绍 Nuxt SiteKit 演示，以及为什么它的内容模型刻意保持聚焦。
  canonical: https://example.com/zh/blog/architecture/hello-nuxt-sitekit
bodyTitle: 为什么要分离页面和文章
bodyBlocks:
  - type: cta-banner
    title: 也想要一个营销首页？
    description: 同一个项目现在可以同时渲染更强的 SaaS 风格落地页和独立博客区域。
    action:
      label: 返回首页
      to: /zh
---
在内容驱动的网站项目里，一个常见错误就是试图用一个巨大的 schema 表示所有类型的内容。第一天看上去很灵活，但很快就会变得混乱。

在这个演示中，页面和文章被刻意分开。页面用于首页、关于、联系、产品页和落地页。文章用于带日期的内容，例如博客、新闻和更新。

这种拆分让路由、渲染和未来内容集合都更容易理解。

## 这会解锁什么

当文章拥有独立集合后，后续增加分页、RSS、标签页和分类页就会变得很自然。这些能力都不必污染更简单的页面模型。

最终你会得到一个更干净的框架，同时依然适合静态部署。
