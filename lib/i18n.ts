const siteModules = import.meta.glob('../content/site*.md', {
  query: '?raw',
  import: 'default',
  eager: false,
})

export const DEFAULT_LOCALE = 'en'

function discoverSupportedLocales() {
  const locales = new Set<string>([DEFAULT_LOCALE])

  for (const filePath of Object.keys(siteModules)) {
    const normalized = filePath.replace(/\\/g, '/')
    const match = normalized.match(/\/site\.([a-z0-9-]+)\.md$/i)
    if (match?.[1]) {
      locales.add(match[1].toLowerCase())
    }
  }

  return Array.from(locales).sort((a, b) => {
    if (a === DEFAULT_LOCALE) return -1
    if (b === DEFAULT_LOCALE) return 1
    return a.localeCompare(b)
  })
}

export const SUPPORTED_LOCALES = discoverSupportedLocales()
export const SECONDARY_LOCALES = SUPPORTED_LOCALES.filter((locale) => locale !== DEFAULT_LOCALE)

export type SupportedLocale = string
export type SecondaryLocale = string

export function isSecondaryLocale(value: string | null | undefined): value is SecondaryLocale {
  return !!value && SECONDARY_LOCALES.includes(value)
}

export function isSupportedLocale(value: string | null | undefined): value is SupportedLocale {
  return !!value && SUPPORTED_LOCALES.includes(value)
}

export function toLocalePrefix(locale: string | null | undefined) {
  return locale && locale !== DEFAULT_LOCALE ? `/${locale}` : ''
}

export function prefixPathForLocale(input: string, locale: string | null | undefined) {
  if (!input || /^https?:\/\//.test(input) || input.startsWith('#') || input.startsWith('mailto:') || input.startsWith('tel:')) {
    return input
  }

  if (!input.startsWith('/')) {
    return input
  }

  const prefix = toLocalePrefix(locale)
  if (!prefix) {
    return input
  }

  if (input === prefix || input.startsWith(`${prefix}/`)) {
    return input
  }

  return input === '/' ? prefix : `${prefix}${input}`
}

export function stripLocalePrefixFromPath(input: string) {
  const normalized = input.startsWith('/') ? input : `/${input}`
  const parts = normalized.split('/').filter(Boolean)
  const first = parts[0]

  if (isSecondaryLocale(first)) {
    const rest = parts.slice(1).join('/')
    return {
      locale: first,
      path: rest ? `/${rest}` : '/'
    }
  }

  return {
    locale: DEFAULT_LOCALE,
    path: normalized || '/'
  }
}
