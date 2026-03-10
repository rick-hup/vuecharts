<script setup lang="ts">
const props = defineProps<{
  name?: string
  description?: string
  src: string
}>()

const activeTab = ref<'preview' | 'code'>('preview')

const chartModules = import.meta.glob('~/charts/**/*.vue', { eager: true })
const sourceModules = import.meta.glob('~/charts/**/*.vue', { eager: true, query: '?raw', import: 'default' })

const chartComponent = computed(() => {
  for (const [path, mod] of Object.entries(chartModules)) {
    if (path.includes(props.src)) {
      return (mod as any).default
    }
  }
  return null
})

const sourceCode = computed(() => {
  for (const [path, raw] of Object.entries(sourceModules)) {
    if (path.includes(props.src)) {
      return raw as string
    }
  }
  return ''
})

const copied = ref(false)

function copyCode() {
  navigator.clipboard.writeText(sourceCode.value)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<template>
  <div class="my-6 rounded-lg border border-[var(--ui-border)] overflow-hidden">
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
        <pre class="overflow-x-auto rounded-md bg-[var(--ui-bg-elevated)] p-4 text-sm"><code>{{ sourceCode }}</code></pre>
      </div>
    </div>
  </div>
</template>
