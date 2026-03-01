<script setup lang="ts">
import { Check, Copy } from 'lucide-vue-next'

defineProps<{
  code?: string
  language?: string
  filename?: string
  highlights?: number[]
  meta?: string
}>()

const copied = ref(false)

function copyCode(code?: string) {
  if (!code)
    return
  navigator.clipboard.writeText(code)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<template>
  <div class="group relative my-4 rounded-lg border bg-muted/30">
    <!-- Header with filename / language -->
    <div
      v-if="filename || language"
      class="flex items-center justify-between border-b px-4 py-2 text-xs text-muted-foreground"
    >
      <span class="font-medium">{{ filename || language }}</span>
      <button
        class="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100"
        @click="copyCode(code)"
      >
        <Check
          v-if="copied"
          class="size-3.5"
        />
        <Copy
          v-else
          class="size-3.5"
        />
      </button>
    </div>
    <!-- Copy button when no header -->
    <button
      v-else
      class="absolute right-2 top-2 z-10 flex items-center gap-1 rounded-md p-1.5 text-xs text-muted-foreground opacity-0 transition-opacity hover:bg-muted group-hover:opacity-100"
      @click="copyCode(code)"
    >
      <Check
        v-if="copied"
        class="size-3.5"
      />
      <Copy
        v-else
        class="size-3.5"
      />
    </button>
    <pre class="!my-0 !rounded-t-none !border-0"><slot /></pre>
  </div>
</template>
