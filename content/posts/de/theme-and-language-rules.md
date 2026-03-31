---
slug: theme-and-language-rules
title: Theme- und Sprachregeln
summary: Die erwarteten Regeln f眉r Theme-Gleichrangigkeit, Sprachrouting und browserseitige Persistenz in Jenna Press.
publishedAt: "2026-03-21"
category: Usage
tags:
  - jenna-press
  - usage
author:
  name: Jenna Press
seo:
  title: Theme- und Sprachregeln | Jenna Press
  description: Die Regeln, die Theme- und Sprachverhalten vorhersagbar halten.
  canonical: https://www.jennapress.com/blog/usage/theme-and-language-rules/
bodyTitle: Persistenz sollte stabil und unspektakul盲r wirken
bodyBlocks:
  - type: cta-banner
    title: Weiterlesen innerhalb von Jenna Press
    description: Nutze die Blog-Kategorien, um zwischen Projektkontext und praktischer Anwendung zu wechseln.
    action:
      label: Zur眉ck zum Blog
      to: /de/blog
---
Themes sind in Jenna Press gleichrangige B眉rger. Dark, light und pink sollen als gleichwertig behandelt werden und nicht als ein echtes Theme plus zwei Sonderf盲lle. Dieses Prinzip ist wichtig, weil versteckte Priorit盲tsregeln typischerweise Refresh-Bugs und Wartungschaos erzeugen.

Das Sprachverhalten sollte genauso vorhersagbar sein. Englisch ist der Standard-Raum der Routen, w盲hrend Deutsch und Chinesisch explizite Locale-Pr盲fixe verwenden. Browser-Persistenz soll die Nutzerwahl wiederherstellen, ohne das Routenmodell selbst zu ver盲ndern.

Kurz gesagt: Routing geh枚rt ins Framework, Content geh枚rt in Content-Dateien, und Persistenz soll beides unterst眉tzen, ohne 脺berraschungen zu erzeugen.
