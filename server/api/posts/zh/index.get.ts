import { getAllBlogPostSummaries } from '~/server/utils/content'

export default defineEventHandler(() => getAllBlogPostSummaries('zh'))
