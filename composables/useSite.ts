import { joinURL } from 'ufo'
import type { SiteConfig } from '~/types'

export async function useSite() {
  const config = useRuntimeConfig()
  const siteUrl = joinURL(config.app.baseURL, 'api/site')

  return await useAsyncData<SiteConfig>(
    'site-config',
    () => $fetch(siteUrl),
    import.meta.dev
      ? {
          getCachedData: () => undefined
        }
      : undefined
  )
}