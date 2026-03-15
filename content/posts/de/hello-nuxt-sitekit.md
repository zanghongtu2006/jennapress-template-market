---
slug: hello-nuxt-sitekit
title: Hallo Nuxt SiteKit
summary: Der erste Beitrag der Demo erklärt, warum Seiteninhalte und Blog-Inhalte früh getrennt werden sollten.
publishedAt: "2026-03-06"
category: Architecture
tags:
  - nuxt
  - static-site
  - schema
author:
  name: Jenna Press
seo:
  title: Hallo Nuxt SiteKit | Jenna Press
  description: Eine Einführung in die Nuxt-SiteKit-Demo und warum ihre Inhaltsmodelle bewusst schlank sind.
  canonical: https://example.com/de/blog/architecture/hello-nuxt-sitekit
bodyTitle: Warum Seiten und Beiträge getrennt sein sollten
bodyBlocks:
  - type: cta-banner
    title: Willst du auch eine Marketing-Homepage?
    description: Dasselbe Projekt kann jetzt gleichzeitig eine stärkere SaaS-Landingpage und einen separaten Blogbereich rendern.
    action:
      label: Zurück zur Startseite
      to: /de
---
Ein häufiger Fehler in inhaltsgetriebenen Website-Projekten ist der Versuch, jede Art von Inhalt mit einem einzigen riesigen Schema darzustellen. Das wirkt am ersten Tag flexibel, wird aber sehr schnell unübersichtlich.

In dieser Demo sind Seiten und Beiträge bewusst getrennt. Seiten sind für Startseite, Über uns, Kontakt, Produktseiten und Landingpages gedacht. Beiträge sind für datierte Inhalte wie Blogeinträge, News und Updates gedacht.

Diese Trennung macht Routing, Rendering und spätere Sammlungen deutlich leichter nachvollziehbar.

## Was das später ermöglicht

Sobald Beiträge in einer eigenen Sammlung leben, wird es naheliegend, später Pagination, RSS, Tag-Seiten und Kategorieseiten hinzuzufügen. Nichts davon muss das einfachere Seitenmodell verschmutzen.

Das Ergebnis ist ein saubereres Framework, das trotzdem freundlich für statische Deployments bleibt.
