<script setup lang="ts">
import { Github } from 'lucide-vue-next'
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
import { useLocale } from '~/composables/useLocale'

const { msg } = useLocale()
const route = useRoute()

const pageTitle = computed(() => {
  const path = route.path
  if (path === '/docs')
    return msg.value.introTitle
  if (path === '/docs/getting-started')
    return msg.value.gettingStartedTitle
  if (path === '/docs/bar-charts')
    return msg.value.barChartsTitle
  if (path === '/docs/area-charts')
    return msg.value.areaChartsTitle
  if (path === '/docs/line-charts')
    return msg.value.lineChartsTitle
  return msg.value.docs
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
            <NuxtLink to="/docs">
              {{ msg.docs }}
            </NuxtLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator v-if="route.path !== '/docs'" />
        <BreadcrumbItem v-if="route.path !== '/docs'">
          <BreadcrumbPage>{{ pageTitle }}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <div class="ml-auto flex items-center gap-1">
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
  </header>
</template>
