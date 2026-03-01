<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

defineProps<{
  prev?: { path: string, title: string } | null
  next?: { path: string, title: string } | null
}>()

const { msg } = useLocale()
</script>

<template>
  <nav class="mt-12 flex items-center justify-between border-t pt-6">
    <NuxtLink
      v-if="prev"
      :to="prev.path"
      class="group flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
    >
      <ChevronLeft class="size-4" />
      <div>
        <div class="text-xs text-muted-foreground">
          {{ msg.previous }}
        </div>
        <div class="font-medium text-foreground group-hover:text-primary">
          {{ prev.title }}
        </div>
      </div>
    </NuxtLink>
    <div v-else />
    <NuxtLink
      v-if="next"
      :to="next.path"
      class="group flex items-center gap-1 text-right text-sm text-muted-foreground hover:text-foreground"
    >
      <div>
        <div class="text-xs text-muted-foreground">
          {{ msg.next }}
        </div>
        <div class="font-medium text-foreground group-hover:text-primary">
          {{ next.title }}
        </div>
      </div>
      <ChevronRight class="size-4" />
    </NuxtLink>
  </nav>
</template>
