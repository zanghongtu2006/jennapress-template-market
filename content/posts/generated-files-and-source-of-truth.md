---
slug: generated-files-and-source-of-truth
title: Generated Files and Source of Truth
summary: How Jenna Press treats generated files and why markdown content remains the source of truth.
publishedAt: "2026-03-18"
category: Project
tags:
  - jenna-press
  - project
author:
  name: Jenna Press
seo:
  title: Generated Files and Source of Truth | Jenna Press
  description: Understand why generated files exist and how to treat them safely.
  canonical: https://www.jennapress.com/blog/project/generated-files-and-source-of-truth
bodyTitle: Generated is allowed, but generated is not editable truth
bodyBlocks:
  - type: cta-banner
    title: Continue reading inside Jenna Press
    description: Use the blog categories to move between project background and practical usage guidance.
    action:
      label: Back to blog
      to: /blog
---
Jenna Press uses a build step. Markdown files in `content/` are processed and output as static HTML. The output is what gets deployed. This means a generated file will exist on disk alongside the source content — and that distinction matters for how the project is maintained.

## Why generated files exist

Static site generation is a build-time transformation. The framework reads markdown, parses frontmatter, applies template logic, and writes HTML. The result is a directory of files that can be served without any runtime interpretation.

The generated files are useful for previewing the site locally, for committing deployment artifacts to the repository, and for any workflow that expects pre-built HTML rather than a source directory. None of these use cases require editing the generated files directly.

## The hierarchy

Content in `content/` is the source of truth. The build process reads it, transforms it, and writes output. Generated files are that output.

This hierarchy is not arbitrary. It means the editing workflow is always: open the markdown file, make the change, rebuild. It also means code review stays clear — a diff in `content/` is a content change; a diff in the output directory is a build artifact that should be reviewed as a whole, not edited directly.

## What happens if you edit a generated file

Generated files are overwritten on the next build. Any change made directly to a generated file — editing an HTML file in `.output/`, modifying a CSS file after the build, touching any file that came from a transformation step — will be lost the next time the project builds.

This is not a restriction enforced by the framework. It is a structural property of the workflow: the framework has no reason to preserve edits to its own output, because the output is always derived from the source.

The practical consequence is simple: if it lives in a build output directory, do not edit it. Edit the source that produced it.

## When generated files should be committed

Jenna Press does not require committing generated files. A project can keep only the source content in the repository and run a build as part of its deployment step.

Some teams prefer to commit generated files anyway — it makes deployments a file sync rather than a build step, and it makes the repository a complete snapshot of what is currently live. This is a valid choice, but it requires treating the committed output as untouchable between builds. If the output is committed and also edited by hand, the next build will overwrite those edits with no warning.

## The rule to remember

Think of generated files as a photograph of what the source content looked like at build time. The photograph is useful to keep, but it is not the event. Editing the photograph does not change what happened.

The event is the markdown. That is where content decisions live, and that is where changes should be made.
