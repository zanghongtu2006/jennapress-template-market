import { joinURL } from 'ufo'
import type { SiteConfig } from '~/types'

export async function useSite() {
  const baseURL = useRuntimeConfig().app.baseURL

  return await useAsyncData<SiteConfig>(
    'site-config',
    () => $fetch(joinURL(baseURL, 'api/site')),
    {
      getCachedData: () => undefined
    }
  )
}
