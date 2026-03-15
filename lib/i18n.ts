export const DEFAULT_LOCALE = 'en'
export const SECONDARY_LOCALES = ['de', 'zh'] as const
export const SUPPORTED_LOCALES = [DEFAULT_LOCALE, ...SECONDARY_LOCALES] as const

export type SupportedLocale = typeof SUPPORTED_LOCALES[number]
export type SecondaryLocale = typeof SECONDARY_LOCALES[number]

export function isSecondaryLocale(value: string | null | undefined): value is SecondaryLocale {
  return !!value && (SECONDARY_LOCALES as readonly string[]).includes(value)
}

export function isSupportedLocale(value: string | null | undefined): value is SupportedLocale {
  return !!value && (SUPPORTED_LOCALES as readonly string[]).includes(value)
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
