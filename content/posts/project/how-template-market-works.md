---
slug: how-template-market-works
title: How the JennaPress Template Market Works
summary: A plain-language walkthrough of what the template market is, how to use it, and what happens when you deploy your own template.
publishedAt: "2026-04-01"
category: project
tags:
  - jennapress
  - template-market
  - github-pages
author:
  name: Alex Zang
seo:
  title: How JennaPress Template Market Works | Template Market Guide
  description: Everything you need to know about the JennaPress template market, from browsing templates to deploying your own site in minutes.
bodyTitle: How the template market works
bodyBlocks:
  - type: cta-banner
    title: Ready to browse?
    description: The template gallery is right here. Pick one and start building.
    action:
      label: See all templates
      to: /templates
---
The JennaPress Template Market is a curated collection of JennaPress site templates. Each template is a complete, deployable JennaPress website — not just a design, but a full working system with multilingual support, theme switching, and static hosting built in.

## What you get

When you copy a template from this market, you get:

- A complete JennaPress site repository on GitHub
- English and Chinese content already in place
- GitHub Actions configured for automatic deployment to GitHub Pages
- A customizable template with a professional design
- Multilingual support (English and Chinese) out of the box

## How deployment works

The template's GitHub Actions workflow builds your site every time you push a change. When you customize the content in GitHub's browser editor, the site rebuilds automatically and publishes within a minute.

Your site will be live at `https://yourusername.github.io/your-repo-name/`.

You can also connect a custom domain — the GitHub Pages documentation explains how.

## How templates are organized

Each template in this market lives in its own GitHub repository. The template metadata — name, description, supported blocks, themes — is stored in the `templates/<template-name>/template.meta.json` file. The template gallery on this site is generated from that data.

## For template creators

If you have built a JennaPress template and want to share it, read the [submission guide](/blog/project/submit-a-template). The process is designed to be as simple as opening a pull request.
