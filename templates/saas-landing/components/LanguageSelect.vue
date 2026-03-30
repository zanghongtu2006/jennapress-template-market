<script setup lang="ts">
import { computed } from 'vue'
import { DEFAULT_LOCALE, LOCALES, getLocaleLabel, prefixPathForLocale, stripLocalePrefixFromPath } from '~/lib/i18n'

const STORAGE_KEY = 'site-language'
const route = useRoute()

const currentLocale = computed(() => stripLocalePrefixFromPath(route.path).locale)

const selectedLanguage = computed({
  get: () => currentLocale.value,
  set: async (value: string) => {
    const nextLocale = value || DEFAULT_LOCALE
    const parsed = stripLocalePrefixFromPath(route.path)
    const targetPath = prefixPathForLocale(parsed.path, nextLocale)

    if (import.meta.client) {
      try {
        window.localStorage.setItem(STORAGE_KEY, nextLocale)
      } catch {
        // ignore
      }
    }

    await navigateTo({
      path: targetPath,
      query: route.query,
      hash: route.hash
    })
  }
})
</script>

<template>
  <div class="theme-select">
    <div class="theme-select-wrap">
      <select
        id="saas-language-select"
        v-model="selectedLanguage"
        class="theme-select-control"
      >
        <option v-for="locale in LOCALES" :key="locale.code" :value="locale.code">
          {{ locale.label }}
        </option>
      </select>
    </div>
  </div>
</template>