export type LocaleConfig = {
  code: string
  label: string
  isDefault?: boolean
}

export const locales: LocaleConfig[] = [
  { code: 'en', label: 'English', isDefault: true },
  { code: 'zh', label: '中文' },
]
