<script setup lang="ts">
import { Code, Eye } from 'lucide-vue-next'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'

const props = defineProps<{
  name: string
  description?: string
  src: string
}>()

const { msg } = useLocale()

// Use import.meta.glob to enumerate all chart files at build time,
// then look up by src at runtime. Vite's dynamic import() with variables
// only supports one directory level deep, but src contains subdirectories
// like "area-charts/simple-area-chart".
const chartModules = import.meta.glob('~/charts/**/*.vue')

const chartComponent = defineAsyncComponent(() => {
  const key = `/charts/${props.src}.vue`
  const matched = Object.entries(chartModules).find(([k]) => k.endsWith(key))
  if (!matched) {
    return Promise.reject(new Error(`Chart not found: ${props.src}`))
  }
  return matched[1]() as Promise<any>
})
</script>

<template>
  <Card class="my-6">
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
              {{ msg.preview }}
            </TabsTrigger>
            <TabsTrigger
              value="code"
              class="gap-1.5"
            >
              <Code class="size-3.5" />
              {{ msg.code }}
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent
          value="preview"
          class="mt-4"
        >
          <div class="rounded-lg border p-4">
            <ClientOnly>
              <component :is="chartComponent" />
            </ClientOnly>
          </div>
        </TabsContent>
        <TabsContent
          value="code"
          class="mt-4"
        >
          <div class="rounded-lg border bg-muted/50 p-4 text-sm">
            <slot />
          </div>
        </TabsContent>
      </Tabs>
    </CardContent>
  </Card>
</template>
