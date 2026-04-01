---
slug: getting-started-with-jennapress-and-prompts
title: How to Set Up a JennaPress Website with GitHub Fork + AI Prompts
summary: Even if you have zero coding experience, you can build and maintain a complete multilingual website with JennaPress using nothing more than GitHub and ChatGPT.
publishedAt: "2026-04-01"
category: Usage
tags:
  - jennapress
  - getting-started
  - ai-prompt
  - github
author:
  name: Jenna Press
seo:
  title: How to Set Up a JennaPress Website with GitHub Fork + AI Prompts | Jenna Press
  description: Even with zero coding experience, you can build and maintain a complete multilingual website using JennaPress, GitHub Fork, and AI Prompts.
  canonical: https://www.example.com/blog/usage/getting-started-with-jennapress-and-prompts
bodyTitle: Using AI to build a website ten times faster
bodyBlocks:
  - type: cta-banner
    title: View the Prompt Files
    description: TEMPLATE_PROMPT and CONTENT_PROMPT are the core tools for this workflow.
    action:
      label: View on GitHub
      to: https://github.com/zanghongtu2006/JennaPress
---
JennaPress was designed so that non-technical users can get a professional multilingual website up and running quickly. Combined with GitHub Fork and AI tools, the entire process can be compressed into around thirty minutes.

This article walks through the complete workflow.

## What You Need to Get Started

- A **GitHub account** (free tier is sufficient)
- **ChatGPT** or any AI assistant that supports long context
- About 30 minutes of free time

No coding knowledge required. No Node.js installation. No Git command line.

## Step 1: Fork the Project

Open the JennaPress GitHub repository and click the **Fork** button in the top-right corner. This copies the entire repository to your own GitHub account.

Once forked, you have a fully independent copy that you can modify directly in your browser.

## Step 2: Find the Two Most Important Files

In your forked repository root, locate these two files:

**CONTENT_PROMPT_EN.md** — tells AI how to write website content: page structure, how to write blog posts, how to handle multilingual content, and how to fill in SEO fields.

**TEMPLATE_PROMPT_EN.md** — tells AI how to generate and modify site templates: how template files are organized, how to write the Header component, and how theme CSS works.

These two files act as the "translator" between you and the AI. You do not need to read and understand them fully — you just need to tell AI to "work according to these rules."

## Step 3: Generate Website Content with AI

Open ChatGPT and send this message:

> You are a JennaPress CMS content specialist. Help me manage a JennaPress website. Begin every response by writing: CONTENT_PROMPT_EN.md, and then follow its rules exactly when generating content.

After that, you can tell ChatGPT directly what you need, for example:

- "Write an About page for our company, including a team section and contact information"
- "Write a blog post titled '2026 Product Update', category Product Note"
- "Translate the above page into German and Spanish"

ChatGPT will generate content following the CONTENT_PROMPT rules. Your only job is to copy the generated content into the corresponding Markdown file.

## Step 4: Push and Deploy Automatically

GitHub Actions detects your content changes automatically. After committing, GitHub will build and deploy your site within a few minutes.

Once deployed, your site will be live at `https://yourusername.github.io/JennaPress/`.

## Step 5: Use AI to Modify Templates

If the default template style does not suit your needs, use TEMPLATE_PROMPT to let AI generate a different look.

Send ChatGPT this message:

> You are a JennaPress template engineer. Help me generate or modify a template for a JennaPress website. Begin every response by writing: TEMPLATE_PROMPT_EN.md, and then follow its rules exactly when generating template files.

Then describe the visual style you want, such as "modern minimalist, for a tech company, dark blue color scheme." AI will generate a complete template package following the rules.

## Common Mistake: Do Not Let AI Touch the Wrong Files

JennaPress has a strict directory structure. AI is only allowed to modify:

- `content/` — all content files
- `templates/<template-name>/` — template files
- `public/template-assets/<template-name>/` — template assets

AI must **never** modify:

- `components/` — shared CMS components
- `pages/` — route definitions
- `composables/` — shared logic
- `lib/` — core processing logic

If AI-generated output touches these directories, tell it directly: "Do not modify components or pages directories. Only generate content and template files."

## Quick Reference Checklist

The entire workflow in five steps:

1. Fork the JennaPress repository
2. Locate CONTENT_PROMPT_EN.md and TEMPLATE_PROMPT_EN.md
3. Open ChatGPT, paste the relevant Prompt file, and describe your needs
4. Copy the generated content into the corresponding Markdown files
5. Commit your changes and wait for GitHub Pages to deploy automatically

No local environment setup. No tool installation. Everything done in the browser.

This is JennaPress's design philosophy: let content creators focus on content, and let AI and the system handle the rest.
