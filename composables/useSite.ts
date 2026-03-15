import { joinURL } from 'ufo'
import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import { DEFAULT_LOCALE } from '~/lib/i18n'
import type { SiteConfig } from '~/types'

export async function useSite(locale: MaybeRefOrGetter<string> = DEFAULT_LOCALE) {
  const config = useRuntimeConfig()
  const resolvedLocale = computed(() => toValue(locale) || DEFAULT_LOCALE)
  const siteUrl = computed(() => resolvedLocale.value === DEFAULT_LOCALE
    ? joinURL(config.app.baseURL, 'api/site')
    : joinURL(config.app.baseURL, `api/site/${resolvedLocale.value}`))

  return await useAsyncData<SiteConfig>(
    () => `site-config:${resolvedLocale.value}`,
    () => $fetch(siteUrl.value),
    {
      watch: [resolvedLocale],
      ...(import.meta.dev
        ? {
            getCachedData: () => undefined
          }
        : {})
    }
  )
}
