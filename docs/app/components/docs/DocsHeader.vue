<script setup lang="ts">
import { Github, Moon, Search, Sun } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'
import { SidebarTrigger } from '~/components/ui/sidebar'
import DocsSearch from './DocsSearch.vue'

const { msg } = useLocale()
const { isOpen: searchOpen, open: openSearch } = useSearch()
const colorMode = useColorMode()

function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <header class="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-dashed px-4 sticky top-0 bg-background z-50">
    <!-- Left: Sidebar trigger -->
    <SidebarTrigger />

    <!-- Right: Search + Theme toggle + Star Github -->
    <div class="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        class="hidden gap-2 text-xs text-muted-foreground sm:flex h-8"
        @click="openSearch"
      >
        <Search class="size-3.5" />
        <span>{{ msg.search }}</span>
        <kbd class="pointer-events-none rounded border bg-muted px-1.5 font-mono text-[10px]">
          {{ msg.searchShortcut }}
        </kbd>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        class="sm:hidden size-8"
        @click="openSearch"
      >
        <Search class="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        class="h-7 w-7 cursor-pointer"
        @click="toggleTheme"
      >
        <Sun
          v-if="colorMode.value === 'dark'"
          class="size-4"
        />
        <Moon
          v-else
          class="size-4"
        />
      </Button>
      <a
        href="https://github.com/nicepkg/vccs"
        target="_blank"
        rel="noopener"
      >
        <Button
          variant="secondary"
          class="h-7 cursor-pointer"
        >
          <span class="text-xs">Star Github</span>
          <Github :size="10" />
        </Button>
      </a>
    </div>
    <DocsSearch v-model:open="searchOpen" />
  </header>
</template>
