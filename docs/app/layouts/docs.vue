<script setup lang="ts">
import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar'
import DocsSidebar from '~/components/docs/DocsSidebar.vue'
import DocsHeader from '~/components/docs/DocsHeader.vue'
</script>

<template>
  <SidebarProvider>
    <DocsSidebar />
    <SidebarInset class="flex flex-col">
      <DocsHeader />
      <div class="flex flex-1 overflow-hidden">
        <main class="flex-1 overflow-auto p-6">
          <div class="mx-auto max-w-3xl">
            <slot />
          </div>
        </main>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
