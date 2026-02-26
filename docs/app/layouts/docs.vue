<script setup lang="ts">
import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar'
import DocsSidebar from '~/components/docs/DocsSidebar.vue'
import DocsHeader from '~/components/docs/DocsHeader.vue'
import { provideLocale } from '~/composables/useLocale'

provideLocale()
</script>

<template>
  <SidebarProvider>
    <DocsSidebar />
    <SidebarInset>
      <DocsHeader />
      <main class="flex-1 overflow-auto p-6">
        <div class="mx-auto max-w-4xl">
          <slot />
        </div>
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>
