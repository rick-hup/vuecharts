<script setup lang="ts">
import { FileText, Search } from 'lucide-vue-next'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import type { Collections } from '@nuxt/content'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const { msg, collectionName } = useLocale()
const router = useRouter()
const query = ref('')

const { data: searchResults } = await useAsyncData(
  'search-sections',
  () => queryCollectionSearchSections(collectionName.value as keyof Collections),
  { watch: [collectionName] },
)

const filteredResults = computed(() => {
  if (!query.value.trim() || !searchResults.value)
    return []
  const q = query.value.toLowerCase()
  return searchResults.value
    .filter((item: any) => {
      const title = (item.title || '').toLowerCase()
      const description = (item.description || '').toLowerCase()
      const content = (Array.isArray(item.titles) ? item.titles.join(' ') : '').toLowerCase()
      return title.includes(q) || description.includes(q) || content.includes(q)
    })
    .slice(0, 10)
})

function navigate(path: string) {
  emit('update:open', false)
  query.value = ''
  router.push(path)
}
</script>

<template>
  <Dialog
    :open="open"
    @update:open="emit('update:open', $event)"
  >
    <DialogContent class="top-[20%] translate-y-0 sm:max-w-lg p-0">
      <DialogTitle class="sr-only">
        {{ msg.search }}
      </DialogTitle>
      <div class="flex items-center border-b px-3">
        <Search class="mr-2 size-4 shrink-0 text-muted-foreground" />
        <Input
          v-model="query"
          :placeholder="msg.search"
          class="border-0 bg-transparent shadow-none focus-visible:ring-0"
        />
      </div>
      <div class="max-h-80 overflow-y-auto p-2">
        <template v-if="filteredResults.length">
          <button
            v-for="item in filteredResults"
            :key="item.id"
            class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm hover:bg-accent"
            @click="navigate(item.path)"
          >
            <FileText class="size-4 shrink-0 text-muted-foreground" />
            <div class="min-w-0">
              <div class="font-medium truncate">
                {{ item.title }}
              </div>
              <div
                v-if="item.description"
                class="text-xs text-muted-foreground truncate"
              >
                {{ item.description }}
              </div>
            </div>
          </button>
        </template>
        <div
          v-else-if="query.trim()"
          class="py-6 text-center text-sm text-muted-foreground"
        >
          {{ msg.noResults }}
        </div>
        <div
          v-else
          class="py-6 text-center text-sm text-muted-foreground"
        >
          {{ msg.search }}
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
