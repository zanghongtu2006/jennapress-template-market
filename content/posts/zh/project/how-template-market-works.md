---
slug: how-template-market-works
title: JennaPress 模板市场运作方式
summary: 通俗易懂地介绍什么是模板市场、如何使用，以及发布自己的模板后会发生什么。
publishedAt: "2026-04-01"
category: project
tags:
  - jennapress
  - 模板市场
  - github-pages
author:
  name: Alex Zang
seo:
  title: JennaPress 模板市场运作方式 | 模板市场使用指南
  description: 关于 JennaPress 模板市场你需要知道的一切，从浏览模板到在几分钟内部署自己的网站。
bodyTitle: 模板市场如何运作
bodyBlocks:
  - type: cta-banner
    title: 准备好浏览了吗？
    description: 模板展示页面就在这里。选一个，开始构建。
    action:
      label: 查看所有模板
      to: /zh/templates
---
JennaPress 模板市场是精心挑选的 JennaPress 网站模板集合。每个模板都是一个完整的、可部署的 JennaPress 网站——不仅仅是设计稿，而是一套完整的系统，内置多语言支持、主题切换和静态托管。

## 你将获得什么

从本市场复制模板后，你将得到：

- 一个完整的 JennaPress 网站 GitHub 仓库
- 已就绪的英文和中文内容
- 已配置好的 GitHub Actions，自动部署到 GitHub Pages
- 可定制的专业设计模板
- 开箱即用的多语言支持（英文和中文）

## 部署如何运作

每次你 push 更新时，模板的 GitHub Actions 工作流会自动构建网站。当你在 GitHub 浏览器编辑器中定制内容时，网站会自动重建并在约一分钟内发布。

你的网站将上线于 `https://yourusername.github.io/your-repo-name/`。

你也可以绑定自定义域名——GitHub Pages 文档有详细说明。

## 模板是如何组织的

市场上的每个模板都存在于自己的 GitHub 仓库中。模板元数据（名称、描述、支持的功能块、主题）存储在 `templates/<template-name>/template.meta.json` 文件中。本站的模板展示页面就是根据这些数据生成的。

## 对于模板创作者

如果你构建了一个 JennaPress 模板并想分享给其他人，阅读[投稿指南](/zh/blog/project/submit-a-template)。流程设计得非常简单——只需提交一个 pull request 即可。
