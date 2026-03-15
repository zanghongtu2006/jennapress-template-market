---
slug: /about
title: Über uns
summary: Über dieses Demo-Framework
bodyTitle: Zentrale Gestaltungsprinzipien
seo:
  title: Über uns | Jenna Press
  description: Lerne die Grundideen hinter der statischen Nuxt-Unternehmenswebsite-Demo kennen.
  canonical: https://example.com/de/about
blocks:
  - type: feature-grid
    title: Aktuelle Verantwortlichkeiten der Ordner
    items:
      - title: content/
        description: Speichert Site-Konfiguration und Markdown-Inhaltsinstanzen. In späteren Versionen kann dies zu Beiträgen, Produkten, Doku oder FAQ-Sammlungen wachsen.
      - title: templates/
        description: Enthält Template-Renderer, private Bereiche, Styles und Header/Footer-Strukturen auf Template-Ebene.
      - title: lib/schema.ts
        description: Führt leichte Validierung aus, damit Inhaltsfehler früh scheitern, anstatt still kaputte Seiten zu rendern.
---
Diese Demo ist bewusst eng gefasst. Sie versucht nicht, WordPress zu ersetzen, kein vollständiges Website-SaaS zu werden und auch nicht jedes CMS-Szenario zu lösen.

Das erste Ziel ist zu beweisen, dass sich eine Unternehmenswebsite aus einem stabilen Vertrag erzeugen lässt: **template + content + schema**.

### Warum das wichtig ist

Sobald der Vertrag stabil ist, kannst du neue Templates erstellen, weitere Inhaltsmodelle hinzufügen und später sogar einen kleinen visuellen Editor auf dieselbe Datenstruktur setzen.
