---
slug: /principles
title: Principios
summary: Los principios de diseño detrás de Jenna Press
bodyTitle: Reglas del proyecto que protegen el framework
seo:
  title: Principios | Jenna Press
  description: Lee las reglas centrales que definen a Jenna Press como un framework multilingüe static-first.
  canonical: https://example.com/principles
blocks:
  - type: feature-grid
    title: Principios centrales
    items:
      - title: Static-only por defecto
        description: Jenna Press no depende de APIs en tiempo de ejecución ni de un servidor integrado para renderizar el contenido principal de las páginas.
      - title: Los temas tienen el mismo rango
        description: Ninguna plantilla debe codificar un orden de prioridad oculto entre dark, light y pink. La lógica del tema pertenece a las reglas compartidas del framework.
      - title: El contenido es la fuente de verdad
        description: Los editores deberían modificar archivos fuente markdown. Los archivos generados pueden existir, pero son salidas y no verdad escrita a mano.
  - type: feature-grid
    title: Reglas de colaboración
    items:
      - title: Modificación mínima del código
        description: Los cambios de código deben mantenerse acotados, trazables y fáciles de revisar, en lugar de mezclar correcciones con refactorizaciones oportunistas.
      - title: Las plantillas deben permanecer aisladas
        description: Los cambios de plantilla pertenecen a los directorios de plantilla. Los cambios del framework no deberían derivar casualmente en decisiones de contenido.
      - title: El enrutamiento y la persistencia deben seguir siendo predecibles
        description: La persistencia de idioma y tema debe sentirse estable entre recargas, navegación interna y despliegue estático.
---
Estos principios existen para evitar un modo de fallo común: un proyecto que comienza de forma simple y luego va perdiendo lentamente sus límites.

En Jenna Press, un archivo generado está permitido, pero debe tratarse como generado. Una plantilla está permitida, pero no debe redefinir silenciosamente el framework. Un archivo de contenido es editable, pero no debería convertirse en un lugar para esconder lógica de aplicación.

El framework solo sigue siendo útil si esas líneas continúan visibles.
