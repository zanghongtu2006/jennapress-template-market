---
slug: /
title: 首页
summary: Nuxt 静态企业主页
seo:
  title: Jenna Press | 快速构建，全球交付
  description: 一个基于 Nuxt 的极简静态企业网站演示，使用模板驱动的内容区块和可扩展的博客模型。
  canonical: https://example.com/zh/
blocks:
  - type: hero
    kicker: Nuxt SiteKit v0.0.8
    title: 面向企业官网与内容页面的静态站点框架
    description: 这一版把页面和文章内容迁移到了 Markdown 中，因此后续更新会比维护大型 JSON 文件友好得多。
    primaryAction:
      label: 阅读博客
      to: /zh/blog
    secondaryAction:
      label: 联系我们
      to: /zh/contact
    panelTitle: v0.0.8 的变化
    panelLines:
      - 页面使用 Markdown 内容文件
      - 博客文章使用 Markdown 内容文件
      - Front matter 加 Markdown 正文
  - type: feature-grid
    title: 为什么这套架构比一次性网站更容易扩展
    description: 目标不是重新造一个 WordPress，而是给小团队一个稳定契约，用于复用模板并更快交付静态网站。
    items:
      - title: 模板驱动页面
        description: 公共页面保持简单。只需选择一个全局模板，然后持续编辑 Markdown 文件。
      - title: Markdown 优先的内容方式
        description: Front matter 负责元数据，正文则保持对人类作者友好、可读。
      - title: 适合 Cloudflare 的输出
        description: 当前结构坚持静态优先，一旦继续完善，就能很好地适配低运维部署。
  - type: stats
    title: 当前演示的边界
    description: 这个项目仍然只想做一个聚焦于官网与内容页面的轻量框架，而不是通用应用构建器。
    items:
      - value: '2'
        label: 页面模板
        note: Corporate basic 与 SaaS landing。
      - value: '2'
        label: 内容模型
        note: 页面与文章现在可以独立演进。
      - value: '0'
        label: 后台面板
        note: 仍然完全由文件驱动，并坚持静态优先。
  - type: cta-banner
    title: 下一步自然会走向更丰富的内容集合
    description: 从这里出发，你可以继续扩展产品、FAQ、文档或多语言内容，而无需改变核心理念。
    action:
      label: 浏览博客文章
      to: /zh/blog
bodyTitle: 为什么 Markdown 很重要
---
即使对开发者来说，维护一个大型 JSON 文档也并不愉快。Markdown 默认就能提供更好的内容编写体验。

你现在可以把 **SEO 元数据和结构化区块** 放在 front matter 中，同时用普通 Markdown 写真正的页面文案。

这意味着项目可以继续保持聚焦和静态优先，但日常内容编辑会变得更自然、更有人味。
