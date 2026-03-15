import { getAllTemplateMetas } from '~/server/utils/templates'

export default defineEventHandler(() => {
  return getAllTemplateMetas()
})