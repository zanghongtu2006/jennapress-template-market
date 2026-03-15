---
slug: /
title: Startseite
summary: Statische Nuxt-Unternehmenshomepage
seo:
  title: Jenna Press | Schnell bauen und global ausliefern
  description: Eine minimale statische Unternehmenswebsite auf Basis von Nuxt mit template-gesteuerten Inhaltsblöcken und einem wachsenden Blog-Modell.
  canonical: https://example.com/de/
blocks:
  - type: hero
    kicker: Nuxt SiteKit v0.0.8
    title: Ein statisches Site-Framework für Unternehmenswebsites und Inhaltsseiten
    description: Diese Version verschiebt Seiten- und Beitragsinhalte in Markdown, damit spätere Aktualisierungen deutlich freundlicher sind als das Bearbeiten großer JSON-Dateien.
    primaryAction:
      label: Blog lesen
      to: /de/blog
    secondaryAction:
      label: Kontakt aufnehmen
      to: /de/contact
    panelTitle: Was sich in v0.0.8 geändert hat
    panelLines:
      - Markdown-Inhaltsdateien für Seiten
      - Markdown-Inhaltsdateien für Blogbeiträge
      - Front Matter plus Markdown-Textkörper
  - type: feature-grid
    title: Warum diese Architektur besser skaliert als Einweg-Websites
    description: Das Ziel ist nicht, WordPress nachzubauen. Das Ziel ist, kleinen Teams einen stabilen Vertrag zu geben, um Templates wiederzuverwenden und statische Websites schneller auszuliefern.
    items:
      - title: Template-gesteuerte Seiten
        description: Öffentliche Seiten bleiben einfach. Wähle ein globales Template und bearbeite dann weiter nur Markdown-Dateien.
      - title: Markdown-first-Inhalte
        description: Front Matter übernimmt Metadaten, während der eigentliche Inhalt lesbar und angenehm für Menschen bleibt.
      - title: Cloudflare-freundliche Ausgabe
        description: Die Struktur bleibt statisch orientiert und ist bereit für Low-Ops-Deployment, sobald die Demo weiter gehärtet wird.
  - type: stats
    title: Die aktuelle Grenze der Demo
    description: Dieses Projekt bleibt bewusst ein schlankes Framework für offizielle Websites und Inhaltsseiten und nicht ein universeller App-Builder.
    items:
      - value: '2'
        label: Seitentemplates
        note: Corporate Basic und SaaS Landing.
      - value: '2'
        label: Inhaltsmodelle
        note: Seiten und Beiträge entwickeln sich jetzt unabhängig voneinander.
      - value: '0'
        label: Backend-Panels
        note: Weiterhin vollständig dateibasiert und statisch zuerst.
  - type: cta-banner
    title: Der nächste natürliche Schritt sind reichhaltigere Sammlungen
    description: Von hier aus kannst du Produkte, FAQs, Doku oder mehrsprachige Inhalte erweitern, ohne die Grundidee zu ändern.
    action:
      label: Blogbeiträge ansehen
      to: /de/blog
bodyTitle: Warum Markdown wichtig ist
---
Selbst für Entwickler ist das Aktualisieren eines großen JSON-Dokuments nicht besonders angenehm. Markdown bietet standardmäßig ein deutlich besseres Bearbeitungserlebnis.

Du kannst jetzt **SEO-Metadaten und strukturierte Blöcke** im Front Matter behalten und den eigentlichen Seitentext in normalem Markdown schreiben.

So bleibt dieses Projekt schlank und statisch orientiert, während die tägliche Inhaltspflege deutlich menschlicher wird.
