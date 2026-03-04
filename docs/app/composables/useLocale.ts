import type { Collections } from '@nuxt/content'

const UI_MESSAGES = {
  docs: 'Docs',
  search: 'Search documentation...',
  searchShortcut: 'Cmd+K',
  noResults: 'No results found.',
  onThisPage: 'On this page',
  previous: 'Previous',
  next: 'Next',
  getStarted: 'Get Started',
  heroTitle: 'Vue Charts',
  heroDescription: 'Composable charting components for Vue 3. An unofficial port of Recharts.',
  footer: 'Built with Vue 3 + vccs',
  copyCode: 'Copy code',
  copied: 'Copied!',
  preview: 'Preview',
  code: 'Code',
} as const

export function useLocale() {
  const msg = UI_MESSAGES
  const collectionName = 'content_en' as keyof Collections

  return { msg, collectionName }
}
