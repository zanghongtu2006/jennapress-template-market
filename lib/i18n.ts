import { locales } from "../content/l18n"

export type LocaleConfig = {
  code: string
  label: string
  isDefault?: boolean
}

function normalizeLocaleList(input: LocaleConfig[]) {
  const seen = new Set<string>()
  const normalized: LocaleConfig[] = []

  for (const item of input) {
    const code = typeof item?.code === 'string' ? item.code.trim() : ''
    const label = typeof item?.label === 'string' ? item.label.trim() : ''

    if (!code || !label || seen.has(code)) {
      continue
    }

    seen.add(code)
    normalized.push({
      code,
      label,
      ...(item?.isDefault ? { isDefault: true } : {}),
    })
  }

  if (!normalized.length) {
    throw new Error('content/l18n.ts must export at least one locale')
  }

  const explicitDefault = normalized.find((item) => item.isDefault)
  if (explicitDefault) {
    return normalized
  }

  const [first, ...rest] = normalized
  return [{ ...first, isDefault: true }, ...rest]
}

export const LOCALES = normalizeLocaleList(locales)
export const DEFAULT_LOCALE = LOCALES.find((item) => item.isDefault)?.code || LOCALES[0]!.code
export const SUPPORTED_LOCALES = LOCALES.map((item) => item.code)
export const SECONDARY_LOCALES = SUPPORTED_LOCALES.filter((locale) => locale !== DEFAULT_LOCALE)

export type SupportedLocale = string
export type SecondaryLocale = string

export function getLocaleLabel(locale: string | null | undefined) {
  return LOCALES.find((item) => item.code === locale)?.label || (locale || '')
}

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
