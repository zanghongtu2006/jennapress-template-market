import { computed, watch } from 'vue'

const STORAGE_KEY = 'site-theme'

type ThemeOptions = {
  themes?: string[]
  defaultTheme?: string
}

declare global {
  interface Window {
    __SITE_THEME__?: string
  }
}

function normalizeThemes(themes: string[] | undefined, defaultTheme: string) {
  const normalized = Array.isArray(themes)
    ? themes.filter((item) => typeof item === 'string' && item.trim()).map((item) => item.trim())
    : []

  return normalized.length ? normalized : [defaultTheme]
}

function applyThemeToDocument(value: string) {
  if (!import.meta.client) return
  document.documentElement.dataset.theme = value
}

export function useTheme(options: ThemeOptions = {}) {
  const fallbackTheme =
    typeof options.defaultTheme === 'string' && options.defaultTheme.trim()
      ? options.defaultTheme.trim()
      : 'light'

  const themes = computed(() => normalizeThemes(options.themes, fallbackTheme))
  const defaultTheme = computed(() =>
    themes.value.includes(fallbackTheme) ? fallbackTheme : themes.value[0]
  )

  const themeState = useState<string>('site-theme', () => defaultTheme.value)
  const clientHydrated = useState<boolean>('site-theme-client-hydrated', () => false)

  if (import.meta.client && !clientHydrated.value) {
    const candidates = [
      window.__SITE_THEME__,
      document.documentElement.dataset.theme,
      window.localStorage.getItem(STORAGE_KEY)
    ]

    const nextTheme = candidates.find((value): value is string => {
      return !!value && themes.value.includes(value)
    })

    themeState.value = nextTheme || defaultTheme.value
    applyThemeToDocument(themeState.value)
    window.__SITE_THEME__ = themeState.value
    window.localStorage.setItem(STORAGE_KEY, themeState.value)
    clientHydrated.value = true
  }

  watch(
    themes,
    (currentThemes) => {
      if (!currentThemes.includes(themeState.value)) {
        themeState.value = defaultTheme.value
      }
    },
    { immediate: true }
  )

  if (import.meta.client) {
    watch(
      themeState,
      (value) => {
        window.__SITE_THEME__ = value
        window.localStorage.setItem(STORAGE_KEY, value)
        applyThemeToDocument(value)
      },
      { immediate: true }
    )
  }

  return {
    theme: computed(() =>
      themes.value.includes(themeState.value) ? themeState.value : defaultTheme.value
    ),
    themes,
    setTheme(nextTheme: string) {
      if (themes.value.includes(nextTheme)) {
        themeState.value = nextTheme
      }
    }
  }
}
