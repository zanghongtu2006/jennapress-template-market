---
slug: release-notes-v1-1-0
title: "Logo-Sprachfehler behoben — In deiner Sprache bleiben"
summary: Version 1.1.0 behebt einen Fehler, bei dem ein Klick auf das Logo die Sprache zurücksetzte.
publishedAt: "2026-04-01"
category: Project
tags:
  - jenna-press
  - release-notes
  - bug-fix
author:
  name: Jenna Press
seo:
  title: "Release Notes v1.1.0: Logo-Sprachfehler behoben — In deiner Sprache bleiben | Jenna Press"
  description: Version 1.1.0 behebt einen Fehler, bei dem ein Klick auf das Logo die Sprache zurücksetzte.
  canonical: https://example.com/blog/project/release-notes-v1-1-0
bodyTitle: Deine Sprache sollte bleiben, nicht zurücksetzen
bodyBlocks:
  - type: cta-banner
    title: "Fix auf GitHub ansehen"
    description: "Der Logo-Sprachfix ist in v1.1.0 live. Überprüfen Sie die Änderungen."
    action:
      label: "See the Commit"
      to: https://github.com/zanghongtu2006/JennaPress/commit/604f59f
---
Jede mehrsprachige Website hat eine Navigationsinvariante, die geschützt werden muss.

Version 1.1.0 behebt einen Fehler, der diese Invariante verletzt hat.

## Das Problem

Wenn ein Nutzer zu Deutsch, Spanisch, Chinesisch oder Griechisch wechselte, verhielt sich das Logo im Header falsch.

## Die Lösung

Der Logo-Link liest jetzt die gespeicherte Spracheinstellung direkt aus localStorage und konstruiert den korrekten Pfad sofort. Keine Weiterleitung, kein Flackern.

Dies gilt für beide Templates: `corporate-basic` und `saas-landing`.
