---
slug: how-to-customize-a-template-safely
title: How to Customize a Template Safely
summary: Rules for making visual changes without breaking theme, language, or framework behavior.
publishedAt: "2026-03-20"
category: Usage
tags:
  - jenna-press
  - usage
author:
  name: Jenna Press
seo:
  title: How to Customize a Template Safely | Jenna Press
  description: A safe template customization workflow for Jenna Press.
  canonical: https://www.jennapress.com/blog/usage/how-to-customize-a-template-safely
bodyTitle: Visual freedom is useful only when the framework contract stays intact
bodyBlocks:
  - type: cta-banner
    title: Continue reading inside Jenna Press
    description: Use the blog categories to move between project background and practical usage guidance.
    action:
      label: Back to blog
      to: /blog
---
Templates in Jenna Press live in `templates/` directories and are meant to be swapped, not modified inside the framework layer. But in practice, a team will want to change colors, spacing, and typography. That is normal. The risk is not changing the template — it is changing it in a way that quietly leaks into places that should stay stable.

## What the template owns

A template controls markup structure, CSS, and presentational logic. It does not own routing, content parsing, or language detection. Those live in the framework layer and should not be referenced inside template files.

When a template modification causes unexpected behavior — a page that stops rendering, a language that stops switching — the cause is almost always one of these:

- The template references a route or component that belongs to the framework layer
- A CSS class name matches a framework-reserved selector
- A conditional branch inside the template assumes a specific language or theme

## A safe change: adjusting theme colors

The safest category of change is visual customization that stays entirely within the template's CSS scope.

Before changing anything, check whether the template uses CSS custom properties (variables) for its color values. If it does, the change is usually a matter of updating the variable definitions, not hunting down individual selectors.

**Before:**

```css
/* templates/corporate-basic/assets/custom.css */
:root {
  --color-primary: #2563eb;
}
```

**After:**

```css
:root {
  --color-primary: #7c3aed;
}
```

This change affects every component that uses `--color-primary`, and nothing else. The framework's theme switching logic does not care what the value is, only that the variable exists.

## A pattern to avoid: language branching inside templates

It is sometimes tempting to write template logic that renders differently for different languages — showing a longer intro paragraph for English and a shorter one for Chinese, for example. This works temporarily and breaks when a third language is added or when the content team restructures the page.

If different languages need different content, that content belongs in the markdown files, not in the template. The template should render whatever the markdown gives it, not decide which version to show.

## When a change might belong in the framework layer

If a desired change affects any of the following, it belongs outside the template:

- **Routing** — new routes or changed URL patterns
- **Persistence** — how the site remembers theme or language preference
- **Content parsing** — how markdown frontmatter is read and structured
- **Build output** — how the final static files are organized

These are framework-layer concerns. Jenna Press keeps that layer intentionally narrow, which means the answer to "does this belong in the framework?" is usually "no unless it is a bug fix."

## The principle that keeps templates safe

A template should be expressive in its visual domain and inert everywhere else. If a template change requires reading framework code to understand the consequence, the change has crossed the boundary.

When the boundary stays visible, templates stay swappable. When they stay swappable, a team can experiment with a new visual direction without rebuilding content — and that is the main practical value of the separation.
