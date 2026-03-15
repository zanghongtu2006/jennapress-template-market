---
slug: /about
title: 关于
summary: 关于这个演示框架
bodyTitle: 核心设计原则
seo:
  title: 关于 | Jenna Press
  description: 了解这个 Nuxt 静态企业站演示背后的核心理念。
  canonical: https://example.com/zh/about
blocks:
  - type: feature-grid
    title: 当前目录职责
    items:
      - title: content/
        description: 存放站点配置和 Markdown 内容实例。后续版本可以扩展成文章、产品、文档或 FAQ 集合。
      - title: templates/
        description: 存放模板级渲染器、私有区块、样式以及页头页脚结构。
      - title: lib/schema.ts
        description: 提供轻量校验，让内容错误尽早暴露，而不是静默渲染出损坏页面。
---
这个演示刻意保持边界清晰。它不是为了替代 WordPress，也不是为了成为完整的网站 SaaS，更不是要解决所有 CMS 场景。

第一个目标，是证明企业网站可以由一个稳定契约来产出：**template + content + schema**。

### 为什么这很重要

当这个契约稳定之后，你就可以创建新的模板，增加更多内容模型，甚至后续在同一套数据结构之上做一个小型可视化编辑器。
