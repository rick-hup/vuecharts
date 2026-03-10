<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
import { codeToHtml } from 'shiki'

const props = defineProps<{
  name?: string
  description?: string
  src: string
}>()

const activeTab = ref<'preview' | 'code'>('preview')
const root = ref<HTMLElement>()
const isVisible = ref(false)
const isLoading = ref(true)
const chartComponent = shallowRef<Component | null>(null)
const sourceCode = ref('')
const highlightedCode = ref('')

const chartModules = import.meta.glob<{ default: Component }>('~/charts/**/*.vue')
const sourceModules = import.meta.glob<string>('~/charts/**/*.vue', { query: '?raw', import: 'default' })

const moduleKey = computed(() => {
  for (const path of Object.keys(chartModules)) {
    if (path.includes(props.src))
      return path
  }
  return null
})

// Trigger load when scrolled into view
const { stop } = useIntersectionObserver(root, ([entry]) => {
  if (entry?.isIntersecting) {
    isVisible.value = true
    stop()
  }
}, { rootMargin: '200px' })

// Load chart + source once visible
watch(isVisible, async (visible) => {
  if (!visible)
    return
  const key = moduleKey.value
  if (!key) {
    isLoading.value = false
    return
  }
  try {
    const [mod, raw] = await Promise.all([
      chartModules[key](),
      sourceModules[key](),
    ])
    chartComponent.value = mod.default
    sourceCode.value = raw
    codeToHtml(raw, {
      lang: 'vue',
      themes: { light: 'github-light', dark: 'github-dark' },
    }).then((html) => { highlightedCode.value = html })
  }
  finally { isLoading.value = false }
})

const copied = ref(false)
function copyCode() {
  navigator.clipboard.writeText(sourceCode.value)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<template>
  <div
    ref="root"
    class="chart-demo"
  >
    <!-- Skeleton -->
    <template v-if="!isVisible || isLoading">
      <div class="px-4 pt-4 space-y-2">
        <div class="h-5 w-40 rounded bg-[var(--ui-bg-elevated)] animate-pulse" />
        <div class="h-4 w-64 rounded bg-[var(--ui-bg-elevated)] animate-pulse" />
      </div>
      <div class="p-4">
        <div class="h-[300px] rounded-md bg-[var(--ui-bg-elevated)] animate-pulse" />
      </div>
    </template>

    <!-- Loaded -->
    <template v-else>
      <div
        v-if="name"
        class="px-4 pt-4"
      >
        <h3 class="text-base font-semibold m-0">
          {{ name }}
        </h3>
        <p
          v-if="description"
          class="text-sm text-[var(--ui-text-muted)] mt-1 mb-0"
        >
          {{ description }}
        </p>
      </div>

      <div class="flex items-center gap-1 px-4 pt-3">
        <button
          class="px-3 py-1.5 text-sm rounded-md transition-colors"
          :class="activeTab === 'preview'
            ? 'bg-[var(--ui-bg-elevated)] text-[var(--ui-text)] font-medium'
            : 'text-[var(--ui-text-muted)] hover:text-[var(--ui-text)]'"
          @click="activeTab = 'preview'"
        >
          Preview
        </button>
        <button
          class="px-3 py-1.5 text-sm rounded-md transition-colors"
          :class="activeTab === 'code'
            ? 'bg-[var(--ui-bg-elevated)] text-[var(--ui-text)] font-medium'
            : 'text-[var(--ui-text-muted)] hover:text-[var(--ui-text)]'"
          @click="activeTab = 'code'"
        >
          Code
        </button>
      </div>

      <div class="p-4">
        <div
          v-show="activeTab === 'preview'"
          class="flex items-center justify-center min-h-[300px]"
        >
          <ClientOnly>
            <component
              :is="chartComponent"
              v-if="chartComponent"
            />
            <p
              v-else
              class="text-[var(--ui-text-muted)]"
            >
              Chart not found: {{ src }}
            </p>
          </ClientOnly>
        </div>

        <div
          v-show="activeTab === 'code'"
          class="relative"
        >
          <button
            class="absolute top-2 right-2 z-10 px-2 py-1 text-xs rounded bg-[var(--ui-bg-elevated)] text-[var(--ui-text-muted)] hover:text-[var(--ui-text)] transition-colors"
            @click="copyCode"
          >
            {{ copied ? 'Copied!' : 'Copy' }}
          </button>
          <div
            v-if="highlightedCode"
            class="chart-demo-code"
            v-html="highlightedCode"
          />
          <pre
            v-else
            class="overflow-x-auto rounded-md bg-[var(--ui-bg-elevated)] p-4 text-sm leading-snug"
          ><code>{{ sourceCode }}</code></pre>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.chart-demo {
  margin: 1.5rem 0;
  border-radius: 0.5rem;
  border: 1px solid var(--ui-border);
  overflow: hidden;
}

.chart-demo-code :deep(pre) {
  margin: 0;
  border-radius: 0.375rem;
  padding: 1rem;
  font-size: 0.8125rem;
  line-height: 1.5 !important;
  overflow-x: auto;
}

.chart-demo-code :deep(pre code) {
  display: block;
  font-size: 0;
  line-height: 0;
}

.chart-demo-code :deep(pre code .line) {
  font-size: 0.8125rem;
  line-height: 1.5 !important;
  min-height: 1.5em;
}
</style>

<style>
.dark .chart-demo-code pre.shiki {
  background-color: var(--shiki-dark-bg, #24292e) !important;
  color: var(--shiki-dark, #e1e4e8) !important;
}

.dark .chart-demo-code .shiki span {
  color: var(--shiki-dark) !important;
}
</style>
