import { useLocalStorage } from '@vueuse/core'
import type { Collections } from '@nuxt/content'

export type Locale = 'en' | 'zh'

const UI_MESSAGES = {
  en: {
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
  },
  zh: {
    docs: '文档',
    search: '搜索文档...',
    searchShortcut: 'Cmd+K',
    noResults: '未找到结果。',
    onThisPage: '本页目录',
    previous: '上一页',
    next: '下一页',
    getStarted: '快速开始',
    heroTitle: 'Vue Charts',
    heroDescription: '基于 Vue 3 的可组合图表组件。Recharts 的非官方移植版本。',
    footer: '使用 Vue 3 + vccs 构建',
    copyCode: '复制代码',
    copied: '已复制!',
    preview: '预览',
    code: '代码',
  },
} as const

export function useLocale() {
  const locale = useLocalStorage<Locale>('docs-locale', 'en')

  const msg = computed(() => UI_MESSAGES[locale.value])

  function toggle() {
    locale.value = locale.value === 'zh' ? 'en' : 'zh'
  }

  /** Returns the @nuxt/content collection name for the current locale */
  const collectionName = computed(() => `content_${locale.value}` as keyof Collections)

  return { locale, msg, toggle, collectionName }
}
