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
  if (!import.meta.client) {
    return
  }

  document.documentElement.dataset.theme = value

  const frame = document.querySelector('.template-saas-frame')
  if (frame) {
    frame.setAttribute('data-theme', value)
  }
}

export function useTheme(options: ThemeOptions = {}) {
  const fallbackTheme = typeof options.defaultTheme === 'string' && options.defaultTheme.trim()
    ? options.defaultTheme.trim()
    : 'light'

  const themes = computed(() => normalizeThemes(options.themes, fallbackTheme))
  const defaultTheme = computed(() => themes.value.includes(fallbackTheme) ? fallbackTheme : themes.value[0])

  const themeState = useState<string>('site-theme', () => {
    if (import.meta.client) {
      const presetTheme = window.__SITE_THEME__
      if (presetTheme && normalizeThemes(options.themes, fallbackTheme).includes(presetTheme)) {
        return presetTheme
      }
    }

    return defaultTheme.value
  })
  const initialized = useState<boolean>('site-theme-initialized', () => false)
  const watchBound = useState<boolean>('site-theme-watch-bound', () => false)

  if (import.meta.client && !initialized.value) {
    const presetTheme = window.__SITE_THEME__
    const savedTheme = window.localStorage.getItem(STORAGE_KEY)
    const nextTheme = [presetTheme, savedTheme].find((value): value is string => !!value && themes.value.includes(value))

    themeState.value = nextTheme || defaultTheme.value
    applyThemeToDocument(themeState.value)
    initialized.value = true
  }

  watch(themes, (currentThemes) => {
    if (!currentThemes.includes(themeState.value)) {
      themeState.value = defaultTheme.value
    }
  }, { immediate: true })

  if (import.meta.client && !watchBound.value) {
    watch(themeState, (value) => {
      window.__SITE_THEME__ = value
      window.localStorage.setItem(STORAGE_KEY, value)
      applyThemeToDocument(value)
    }, { immediate: true })
    watchBound.value = true
  }

  function setTheme(nextTheme: string) {
    if (themes.value.includes(nextTheme)) {
      themeState.value = nextTheme
    }
  }

  return {
    theme: computed(() => themes.value.includes(themeState.value) ? themeState.value : defaultTheme.value),
    themes,
    setTheme
  }
}
