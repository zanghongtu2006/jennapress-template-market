---
slug: /submit
title: Submit a Template
summary: How to package your JennaPress template and submit it to the template market.
seo:
  title: Submit a Template | JennaPress Template Market
  description: Package your JennaPress template and submit it to the market. This guide covers the submission format, required files, and the review process.
blocks:
  - type: hero
    kicker: For Template Creators
    title: Share your template with the market
    description: Built something with JennaPress? This guide walks you through packaging your template and submitting it to the market.
    primaryAction:
      label: Browse templates first
      to: /templates
---
This guide walks you through packaging a JennaPress template and submitting it to the template market. The process is designed to be as simple as possible: you need a working JennaPress site and a clear description.

## Requirements

Your template must meet these minimum requirements to be listed:

- It must be a complete JennaPress site with content already in place
- It must build successfully with the standard build command
- GitHub Pages deployment must be configured and working
- At least one preview image must be provided in the public assets directory

## How to package your template

### Step 1: Prepare the preview images

Take screenshots of your template and save them in your public assets directory. Use at least two screenshots. Recommended sizes are 1280 by 800 pixels. Use PNG or JPG format, keeping each file under 500KB.

### Step 2: Fill in the template metadata

Edit the template metadata file in your template directory. This file controls how the template appears in the market. The fields to fill in include: name (the template display name), description (a one-sentence summary), longDescription (two to three sentences explaining the use case and what makes the design distinct), category, tags, previewImages, and author information.

### Step 3: Test the build

Run the production build locally and verify there are no errors. If the build succeeds and GitHub Pages deploys correctly, your template is ready.

## How to submit

Submit your template by opening a pull request to the JennaPress Template Market repository. In the PR description, include: template name and short description, link to the live GitHub Pages URL, list of the blocks your template supports, and screenshots.

The submission will be reviewed within a few days.
