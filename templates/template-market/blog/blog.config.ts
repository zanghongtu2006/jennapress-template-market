import BlogHome from './BlogHome.vue'
import DefaultCategory from './modules/DefaultCategory.vue'
import DefaultPost from './modules/DefaultPost.vue'

export default {
  home: BlogHome,
  categoryTemplates: { default: DefaultCategory },
  postTemplates: { default: DefaultPost },
}
