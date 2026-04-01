---
slug: content-and-multilingual-updates
title: How to Keep Your JennaPress Site Updated — From One Language to Five
summary: With nothing more than GitHub's browser editor and an AI assistant, you can keep your JennaPress site updated across five languages without writing a single line of code.
publishedAt: "2026-04-01"
category: Usage
tags:
  - jennapress
  - content-management
  - multilingual
  - github
author:
  name: Jenna Press
seo:
  title: How to Keep Your JennaPress Site Updated | Jenna Press
  description: Manage and update your JennaPress website across five languages using GitHub browser editing and AI assistance, with no coding required.
  canonical: https://www.example.com/blog/usage/content-and-multilingual-updates
bodyTitle: A practical workflow for content management and multilingual updates
bodyBlocks:
  - type: cta-banner
    title: Ready to start?
    description: Begin managing your JennaPress site with AI and the GitHub browser editor.
    action:
      label: Browse the Blog
      to: /blog
---
The previous article covered how to set up a JennaPress site using Fork and AI. This article explains how to continuously update your site and manage multilingual content correctly.

## Editing Directly in the GitHub Browser

After forking, you need no local tools. GitHub provides a full in-browser editor.

Find the file you want to edit (for example `content/pages/about.md`), click it, then click the pencil icon to enter edit mode. Write a brief commit message at the bottom (such as "Update team section"), and click Commit.

Each commit triggers GitHub Actions, which automatically rebuilds and redeploys your site.

## The Right Way to Use AI for Content Writing

When asking AI to write content, the key is giving clear context. Send this to ChatGPT:

> I am using JennaPress CMS, a static-first multilingual website. Please help me write content following these rules. CONTENT_PROMPT_EN.md is as follows: [paste the full contents of CONTENT_PROMPT_EN.md].

Then tell AI exactly what you need:

- "Write a product introduction page"
- "Write three blog posts, categories: Project, Usage, Product Note"
- "Translate the homepage above into German and Spanish"

AI will generate properly formatted content. Your job is copy and paste only.

## How to Add Multilingual Content Correctly

JennaPress supports five languages: English (default), German, Chinese, Greek, and Spanish.

### Adding a New Language Page

For example, to create a German homepage:

1. Create a `de/` subdirectory under `content/pages/`
2. Create `index.md` inside the `de/` directory
3. Write it the same way as `content/pages/index.md`, but translate the content into German
4. Critical: the `slug` in the front matter must be exactly the same as the English version

### Adding Multilingual Blog Posts

Blog posts follow the same pattern as pages.

To translate an English post `content/posts/my-post.md` into German:

1. Create a `de/` subdirectory under `content/posts/` (if it does not already exist)
2. Create `my-post.md` in the `de/` directory (same filename as the English version)
3. The `slug` in front matter must remain `my-post`
4. Translate the content into German
5. The `canonical` field should point to the English version URL

### Navigation Works Automatically Across Languages

You do not need to manually configure navigation menus for each language. JennaPress's routing system automatically generates URLs for every supported language. The `nav` configuration in `content/site.md` applies to all language versions.

## How to Update Site-Wide Settings in site.md

`content/site.md` controls global site configuration, including:

- Site name (`name`)
- Logo text (`logoText`)
- Default template (`defaultTemplate`)
- Theme settings (`defaultTheme`, `themes`)
- Navigation links (`nav`)
- Footer text (`footerText`)

When you change these fields, all language versions of all pages reflect the changes automatically.

## Things to Watch Out For When Writing

Each page and blog post has a fixed front matter structure. These fields are the most commonly mistyped:

- `slug` must be unique and contain only lowercase letters and hyphens
- `publishedAt` must use ISO format (YYYY-MM-DD) and be wrapped in quotes
- `canonical` must include the full URL (with https://)
- Blog post `category` must be a recognized category already defined in the template

When AI generates content with the full CONTENT_PROMPT provided, these formats are automatically followed correctly.

## When You Need to Change the Template

JennaPress supports multiple templates. When you want a different visual style, the prompt you give AI is **TEMPLATE_PROMPT_EN.md** (not CONTENT_PROMPT).

Describe the style you want and AI will generate a new template package. You only need to place the files in `templates/` and change `defaultTemplate` in `content/site.md` to the new template name.

## Summary

The complete update workflow requires no technical background:

- Write content: let AI generate it following CONTENT_PROMPT
- Change the look: let AI generate a template following TEMPLATE_PROMPT
- Change site settings: edit `content/site.md` directly
- Commit: a few clicks in GitHub's browser editor
- Deploy: fully automatic, no manual intervention needed

JennaPress's core goal is this: let content creators focus on content, and let the system and AI handle everything else.
