<script setup lang="ts">
import type { TocLink } from '~/composables/useToc'

const props = defineProps<{
  links: TocLink[]
}>()

const { msg } = useLocale()
const { activeId } = useToc()
</script>

<template>
  <aside
    v-if="links.length"
    class="hidden xl:block w-44 shrink-0 border-l"
  >
    <nav class="sticky top-14 overflow-auto p-4">
      <p class="mb-3 text-sm font-medium">
        {{ msg.onThisPage }}
      </p>
      <ul class="space-y-1 text-sm">
        <li
          v-for="link in links"
          :key="link.id"
          :class="{ 'pl-3': link.depth === 3 }"
        >
          <a
            :href="`#${link.id}`"
            class="block py-1 text-muted-foreground transition-colors hover:text-foreground"
            :class="{ '!text-primary font-medium': activeId === link.id }"
          >
            {{ link.text }}
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>
