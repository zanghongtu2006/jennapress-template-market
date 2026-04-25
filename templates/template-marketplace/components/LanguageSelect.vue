<script setup lang="ts">
import { computed } from 'vue'
import { DEFAULT_LOCALE, LOCALES, prefixPathForLocale, stripLocalePrefixFromPath } from '~/lib/i18n'

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
        // ignore storage errors
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
  <label class="tm-language-select" aria-label="Language">
    <span class="tm-language-dot" aria-hidden="true">🌐</span>
    <select v-model="selectedLanguage">
      <option v-for="locale in LOCALES" :key="locale.code" :value="locale.code">
        {{ locale.label }}
      </option>
    </select>
  </label>
</template>
