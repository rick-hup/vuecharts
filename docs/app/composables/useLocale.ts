import { useLocalStorage } from '@vueuse/core'
import { computed, inject, provide } from 'vue'
import type { InjectionKey, Ref } from 'vue'
import zhMessages from '~/i18n/zh'
import enMessages from '~/i18n/en'

export type Locale = 'zh' | 'en'

type Messages = typeof enMessages

const messages: Record<Locale, Messages> = { zh: zhMessages, en: enMessages }

const LOCALE_KEY: InjectionKey<Ref<Locale>> = Symbol('locale')

export function provideLocale() {
  const locale = useLocalStorage<Locale>('docs-locale', 'en')
  provide(LOCALE_KEY, locale)
  return locale
}

export function useLocale() {
  const locale = inject(LOCALE_KEY)
  if (!locale) {
    throw new Error('useLocale() must be used within a component that calls provideLocale()')
  }

  const msg = computed(() => messages[locale.value])

  function t(value: { zh: string, en: string }): string {
    return value[locale.value]
  }

  function toggle() {
    locale.value = locale.value === 'zh' ? 'en' : 'zh'
  }

  return {
    locale,
    msg,
    t,
    toggle,
  }
}
