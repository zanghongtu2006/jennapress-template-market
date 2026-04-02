---
slug: submit-a-template
title: 如何向市场提交模板
summary: 如何将你的 JennaPress 模板打包并提交到模板市场的分步指南。
publishedAt: "2026-04-01"
category: project
tags:
  - jennapress
  - 模板市场
  - 投稿
  - github
author:
  name: Alex Zang
seo:
  title: 如何提交模板 | JennaPress 模板市场
  description: 将你的 JennaPress 模板打包并提交到市场。本指南涵盖提交格式、必需文件和审核流程。
bodyTitle: 如何提交你的模板
bodyBlocks:
  - type: cta-banner
    title: 准备好投稿了吗？
    description: 模板准备就绪后，向模板市场仓库提交 pull request 即可。
    action:
      label: 查看投稿检查清单
      to: /zh/blog/project/submit-a-template
---
本指南将引导你将 JennaPress 模板打包并提交到模板市场。流程设计得尽量简单：你只需要一个可正常运行的 JennaPress 网站和一份清晰的说明。

## 基本要求

你的模板需满足以下最低要求才会被收录：

- 必须是一个内容完整的 JennaPress 网站
- 必须能通过标准构建命令成功构建
- 必须已配置 GitHub Pages 部署并正常运行
- 必须在公共资源目录中提供至少一张预览图

## 如何打包模板

### 第一步：准备预览图

为你的模板截图，并保存到公共资源目录中。至少使用两张截图。建议尺寸为 1280 × 800 像素。使用 PNG 或 JPG 格式，每个文件不超过 500KB。

### 第二步：填写模板元数据

编辑模板目录中的模板元数据文件。该文件控制模板在市场上的显示方式。需要填写的字段包括：名称（模板的显示名称）、描述（一句话简介）、长描述（两到三句话，说明用例和设计的独特之处）、分类、标签、预览图和作者信息。

### 第三步：测试构建

在本地运行生产构建并确认无错误。构建成功且 GitHub Pages 正常部署后，模板即可准备就绪。

## 如何提交

通过向 JennaPress 模板市场仓库提交 pull request 来提交你的模板。在 PR 描述中请包含：模板名称和简短描述、线上 GitHub Pages 链接、模板支持的组件块列表，以及截图。

提交后会在数天内完成审核。
