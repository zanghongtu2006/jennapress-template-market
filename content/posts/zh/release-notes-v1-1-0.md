---
slug: release-notes-v1-1-0
title: "Logo 语言 BUG 修复 — 保持用户语言偏好"
summary: 1.1.0 版本修复了一个 BUG：点击网站 Logo 会将语言重置回英语。
publishedAt: "2026-04-01"
category: Project
tags:
  - jenna-press
  - release-notes
  - bug-fix
author:
  name: Jenna Press
seo:
  title: "Release Notes v1.1.0: Logo 语言 BUG 修复 — 保持用户语言偏好 | Jenna Press"
  description: 1.1.0 版本修复了一个 BUG：点击网站 Logo 会将语言重置回英语。
  canonical: https://example.com/blog/project/release-notes-v1-1-0
bodyTitle: 你的语言应该保持，而不是重置
bodyBlocks:
  - type: cta-banner
    title: "在 GitHub 上查看修复"
    description: "Logo 语言修复已在 v1.1.0 中生效。"
    action:
      label: "See the Commit"
      to: https://github.com/zanghongtu2006/JennaPress/commit/604f59f
---
每个多语言网站都有一个需要保护的导航不变式。

1.1.0 版本修复了一个这等错误。

问题

当用户切换到德语、西班牙语、中文或希腊语时，Header 中的 Logo 行为不正确。

解决方案

Logo 链接直接从 localStorage 读取用户保存的语言偏好，并立即构造正确的语言首页路径。无需重定向，无闪烁。

此修复适用于 `corporate-basic` 和 `saas-landing` 两个模板。
