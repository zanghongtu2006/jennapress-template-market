---
slug: release-notes-v1-1-0
title: "Corrección del error de idioma del logo"
summary: La versión 1.1.0 corrige un error donde al hacer clic en el logo se reiniciaba el idioma a inglés.
publishedAt: "2026-04-01"
category: Project
tags:
  - jenna-press
  - release-notes
  - bug-fix
author:
  name: Jenna Press
seo:
  title: "Release Notes v1.1.0: Corrección del error de idioma del logo | Jenna Press"
  description: La versión 1.1.0 corrige un error donde al hacer clic en el logo se reiniciaba el idioma a inglés.
  canonical: https://example.com/blog/project/release-notes-v1-1-0
bodyTitle: Tu idioma debería mantenerse, no reiniciarse
bodyBlocks:
  - type: cta-banner
    title: "Ver la corrección en GitHub"
    description: "La corrección del idioma del logo está en vivo en la v1.1.0."
    action:
      label: "See the Commit"
      to: https://github.com/zanghongtu2006/JennaPress/commit/604f59f
---
Cada sitio multilingüe tiene una invariante de navegación que debe proteger.

La versión 1.1.0 corrige un error que violaba esta invariante.

## El problema

Cuando un usuario cambiaba a alemán, español, chino o griego, el logo en el encabezado se comportaba incorrectamente.

## La corrección

El enlace del logo ahora lee la preferencia de idioma guardada directamente desde localStorage. Sin redirección, sin parpadeo — la página correcta se carga inmediatamente.

Esto aplica a ambos templates: `corporate-basic` y `saas-landing`.
