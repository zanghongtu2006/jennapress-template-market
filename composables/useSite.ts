import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import { DEFAULT_LOCALE } from '~/lib/i18n'
import { getStaticSite } from '~/lib/static-content'
import type { SiteConfig } from '~/types'

export async function useSite(locale: MaybeRefOrGetter<string> = DEFAULT_LOCALE) {
  const resolvedLocale = computed(() => toValue(locale) || DEFAULT_LOCALE)

  return await useAsyncData<SiteConfig | null>(
    () => `site-config:${resolvedLocale.value}`,
    () => Promise.resolve(getStaticSite(resolvedLocale.value)),
    {
      watch: [resolvedLocale],
    },
  )
}
