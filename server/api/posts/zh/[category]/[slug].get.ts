import { getBlogPostByCategoryAndSlug } from '~/server/utils/content'

export default defineEventHandler((event) => {
  const category = getRouterParam(event, 'category') || ''
  const slug = getRouterParam(event, 'slug') || ''
  const post = getBlogPostByCategoryAndSlug(category, slug, 'zh')
  if (!post) throw createError({ statusCode: 404, statusMessage: 'Post not found' })
  return post
})
