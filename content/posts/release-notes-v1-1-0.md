---
slug: release-notes-v1-1-0
title: "Logo Language Bug Fix — Stay in Your Language"
summary: Version 1.1.0 fixes a bug where clicking the site logo reset the language back to English.
publishedAt: "2026-04-01"
category: Project
tags:
  - jenna-press
  - release-notes
  - bug-fix
author:
  name: Jenna Press
seo:
  title: "Release Notes v1.1.0: Logo Language Bug Fix — Stay in Your Language | Jenna Press"
  description: Version 1.1.0 fixes a bug where clicking the site logo reset the language back to English.
  canonical: https://example.com/blog/project/release-notes-v1-1-0
bodyTitle: Your language should stick, not reset
bodyBlocks:
  - type: cta-banner
    title: "View the Fix on GitHub"
    description: "The logo language fix is live in v1.1.0. Review the changes."
    action:
      label: "See the Commit"
      to: https://github.com/zanghongtu2006/JennaPress/commit/604f59f
---
Every multilingual site has a navigation invariant it needs to protect.

Version 1.1.0 fixes a bug that violated this invariant.

## The Problem

When a user switched to German, Spanish, Chinese, or Greek, the logo in the header behaved incorrectly. Clicking it reset the site back to the English homepage.

## The Fix

The logo link now reads the saved language from localStorage and constructs the correct localized homepage path directly. No redirect, no flash — the correct page loads immediately.

This applies to both the `corporate-basic` and `saas-landing` templates.
