<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Check, Code, Copy, Eye } from 'lucide-vue-next'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'

const props = defineProps<{
  name: string
  description?: string
  code: string
}>()

const highlightedCode = ref('')
const copied = ref(false)

onMounted(async () => {
  const { createHighlighter } = await import('shiki')
  const highlighter = await createHighlighter({
    themes: ['github-dark', 'github-light'],
    langs: ['vue'],
  })
  highlightedCode.value = highlighter.codeToHtml(props.code, {
    lang: 'vue',
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
  })
})

async function copyCode() {
  await navigator.clipboard.writeText(props.code)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="text-base">
        {{ name }}
      </CardTitle>
      <CardDescription v-if="description">
        {{ description }}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Tabs default-value="preview">
        <div class="flex items-center justify-between">
          <TabsList>
            <TabsTrigger
              value="preview"
              class="gap-1.5"
            >
              <Eye class="size-3.5" />
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="code"
              class="gap-1.5"
            >
              <Code class="size-3.5" />
              Code
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent
          value="preview"
          class="mt-4"
        >
          <div class="rounded-lg border p-4">
            <ClientOnly>
              <slot />
            </ClientOnly>
          </div>
        </TabsContent>
        <TabsContent
          value="code"
          class="mt-4"
        >
          <div class="relative">
            <Button
              variant="ghost"
              size="icon"
              class="absolute right-2 top-2 z-10 size-7"
              @click="copyCode"
            >
              <Check
                v-if="copied"
                class="size-3.5"
              />
              <Copy
                v-else
                class="size-3.5"
              />
            </Button>
            <div
              class="max-h-[400px] overflow-auto rounded-lg border bg-muted/50 p-4 text-sm [&_pre]:!bg-transparent [&_pre]:!p-0"
              v-html="highlightedCode"
            />
          </div>
        </TabsContent>
      </Tabs>
    </CardContent>
  </Card>
</template>
