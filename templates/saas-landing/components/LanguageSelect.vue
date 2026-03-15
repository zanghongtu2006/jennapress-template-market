<script setup lang="ts">
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, prefixPathForLocale, stripLocalePrefixFromPath } from '~/lib/i18n'

const route = useRoute()

const localeLabels: Record<string, string> = {
  en: 'English',
  de: 'Deutsch',
  zh: '中文'
}

const currentLocale = computed(() => stripLocalePrefixFromPath(route.path).locale)

async function onChange(event: Event) {
  const value = (event.target as HTMLSelectElement).value || DEFAULT_LOCALE
  const parsed = stripLocalePrefixFromPath(route.path)
  const targetPath = prefixPathForLocale(parsed.path, value)
  await navigateTo({
    path: targetPath,
    query: route.query,
    hash: route.hash
  })
}
</script>

<template>
  <div class="theme-select">
    <div class="theme-select-wrap">
      <select
        id="saas-language-select"
        class="theme-select-control"
        :value="currentLocale"
        @change="onChange"
      >
        <option v-for="locale in SUPPORTED_LOCALES" :key="locale" :value="locale">
          {{ localeLabels[locale] || locale }}
        </option>
      </select>
    </div>
  </div>
</template>
