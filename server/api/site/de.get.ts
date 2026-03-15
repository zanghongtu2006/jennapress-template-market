import { getSiteConfig } from '~/server/utils/content'

export default defineEventHandler(() => getSiteConfig('de'))
