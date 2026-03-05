<script setup lang="ts">
import { TableOfContents, X } from 'lucide-vue-next'
import { AnimatePresence, motion } from 'motion-v'
import type { TocLink } from '~/composables/useToc'

const props = defineProps<{
  links: TocLink[]
}>()

const { msg } = useLocale()
const { activeId } = useToc()
const isPinned = ref(false)
const isHovered = ref(false)

const showPanel = computed(() => isPinned.value || isHovered.value)

// Reset pinned state on route change
const route = useRoute()
watch(() => route.path, () => {
  isPinned.value = false
})
</script>

<template>
  <aside
    v-if="links.length"
    class="fixed right-4 top-20 z-40 hidden xl:block"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Trigger button -->
    <button
      v-show="!showPanel"
      class="flex h-9 w-9 items-center justify-center rounded-lg border bg-background/95 shadow-sm backdrop-blur-sm transition-colors hover:bg-accent"
      @click="isPinned = true"
    >
      <TableOfContents class="h-4 w-4 text-muted-foreground" />
    </button>

    <!-- Expanded panel -->
    <AnimatePresence>
      <motion.div
        v-if="showPanel"
        :initial="{ opacity: 0, x: 8 }"
        :animate="{ opacity: 1, x: 0 }"
        :exit="{ opacity: 0, x: 8 }"
        :transition="{ duration: 0.2 }"
        class="w-56"
      >
        <div class="flex items-center justify-between pb-2">
          <p class="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {{ msg.onThisPage }}
          </p>
          <button
            v-if="isPinned"
            class="flex h-6 w-6 items-center justify-center rounded-md transition-colors hover:bg-accent"
            @click="isPinned = false"
          >
            <X class="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        </div>
        <nav class="max-h-[60vh] overflow-y-auto no-scroll-bar">
          <ul class="relative border-l border-border text-sm">
            <li
              v-for="link in links"
              :key="link.id"
              class="relative"
              :class="{ 'ml-3': link.depth === 3 }"
            >
              <!-- Animated active indicator -->
              <motion.div
                v-if="activeId === link.id"
                layout-id="toc-indicator"
                class="absolute left-[-1px] top-0 h-full w-0.5 bg-primary"
                :transition="{ type: 'spring', stiffness: 300, damping: 30 }"
              />
              <a
                :href="`#${link.id}`"
                class="block py-1 pl-3 pr-2 transition-colors"
                :class="activeId === link.id
                  ? 'text-foreground font-medium'
                  : 'text-muted-foreground hover:text-foreground'"
              >
                {{ link.text }}
              </a>
            </li>
          </ul>
        </nav>
      </motion.div>
    </AnimatePresence>
  </aside>
</template>
