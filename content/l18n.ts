export type LocaleConfig = {
  code: string
  label: string
  isDefault?: boolean
}

export const locales: LocaleConfig[] = [
  { code: 'en', label: 'English', isDefault: true },
  { code: 'de', label: 'Deutsch' },
  { code: 'el', label: 'Ελληνικά' },
  { code: 'es', label: 'Español' },
  { code: 'zh', label: '中文' },
]
