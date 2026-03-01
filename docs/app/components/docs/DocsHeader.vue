<script setup lang="ts">
import { Github, Search } from 'lucide-vue-next'
import { Separator } from '~/components/ui/separator'
import { SidebarTrigger } from '~/components/ui/sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb'
import { Button } from '~/components/ui/button'
import ThemeToggle from './ThemeToggle.vue'
import LanguageToggle from './LanguageToggle.vue'
import DocsSearch from './DocsSearch.vue'

const { msg } = useLocale()
const { isOpen: searchOpen, open: openSearch } = useSearch()
const route = useRoute()

const breadcrumbs = computed(() => {
  const path = route.path
  const segments = path.replace(/^\/docs\/?/, '').split('/').filter(Boolean)
  return segments.map((seg) => {
    const label = seg
      .replace(/^\d+\./, '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase())
    return { label }
  })
})
</script>

<template>
  <header class="flex h-14 shrink-0 items-center gap-2 border-b px-4">
    <SidebarTrigger class="-ml-1" />
    <Separator
      orientation="vertical"
      class="mr-2 !h-4"
    />
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink as-child>
            <NuxtLink to="/docs/getting-started/introduction">
              {{ msg.docs }}
            </NuxtLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <template
          v-for="(crumb, i) in breadcrumbs"
          :key="i"
        >
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{{ crumb.label }}</BreadcrumbPage>
          </BreadcrumbItem>
        </template>
      </BreadcrumbList>
    </Breadcrumb>
    <div class="ml-auto flex items-center gap-1">
      <Button
        variant="outline"
        size="sm"
        class="hidden gap-2 text-xs text-muted-foreground sm:flex"
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
        class="sm:hidden"
        @click="openSearch"
      >
        <Search class="size-4" />
      </Button>
      <LanguageToggle />
      <ThemeToggle />
      <Button
        variant="ghost"
        size="icon"
        as-child
      >
        <a
          href="https://github.com/nicepkg/vccs"
          target="_blank"
          rel="noopener"
        >
          <Github class="size-4" />
          <span class="sr-only">GitHub</span>
        </a>
      </Button>
    </div>
    <DocsSearch v-model:open="searchOpen" />
  </header>
</template>
