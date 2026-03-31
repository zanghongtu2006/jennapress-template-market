---
slug: theme-and-language-rules
title: Reglas de tema e idioma
summary: Las reglas esperadas para la igualdad de temas, el enrutamiento de idioma y la persistencia en el navegador en Jenna Press.
publishedAt: "2026-03-21"
category: Usage
tags:
  - jenna-press
  - usage
author:
  name: Jenna Press
seo:
  title: Reglas de tema e idioma | Jenna Press
  description: Lee las reglas que mantienen predecible el comportamiento de tema e idioma.
  canonical: https://www.jennapress.com/blog/usage/theme-and-language-rules/
bodyTitle: La persistencia deber铆a sentirse estable y aburrida
bodyBlocks:
  - type: cta-banner
    title: Sigue leyendo dentro de Jenna Press
    description: Usa las categor铆as del blog para moverte entre el contexto del proyecto y la gu铆a pr谩ctica de uso.
    action:
      label: Volver al blog
      to: /es/blog
---
Los temas en Jenna Press tienen el mismo rango. Dark, light y pink deben tratarse como pares, no como un tema real y dos casos especiales. Ese principio importa porque las reglas de prioridad ocultas suelen crear errores al refrescar y confusi贸n de mantenimiento.

El comportamiento del idioma debe ser igual de predecible. El ingl茅s es el espacio de rutas predeterminado, mientras que el alem谩n y el chino usan prefijos de locale expl铆citos. La persistencia en el navegador debe restaurar la elecci贸n del usuario sin cambiar el propio modelo de rutas.

En resumen, el enrutamiento pertenece al framework, el contenido pertenece a los archivos de contenido y la persistencia debe apoyar a ambos sin crear sorpresas.
