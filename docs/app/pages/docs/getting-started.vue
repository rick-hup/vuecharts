<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Check, Copy } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { useLocale } from '~/composables/useLocale'

definePageMeta({ layout: 'docs' })

const { msg } = useLocale()

const installCode = 'npm install vccs'
const basicUsageCode = `<script setup lang="ts">
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'vccs'
<\/script>

<template>
  <BarChart :width="500" :height="300" :data="data">
    <CartesianGrid stroke-dasharray="3 3" />
    <XAxis data-key="name" />
    <YAxis />
    <Tooltip />
    <Bar data-key="value" fill="#8884d8" />
  </BarChart>
</template>`

const highlightedInstall = ref('')
const highlightedUsage = ref('')

onMounted(async () => {
  const { createHighlighter } = await import('shiki')
  const highlighter = await createHighlighter({
    themes: ['github-dark', 'github-light'],
    langs: ['shellscript', 'vue'],
  })
  highlightedInstall.value = highlighter.codeToHtml(installCode, {
    lang: 'shellscript',
    themes: { light: 'github-light', dark: 'github-dark' },
  })
  highlightedUsage.value = highlighter.codeToHtml(basicUsageCode, {
    lang: 'vue',
    themes: { light: 'github-light', dark: 'github-dark' },
  })
})

const copiedInstall = ref(false)
const copiedUsage = ref(false)

async function copy(text: string, flag: 'install' | 'usage') {
  await navigator.clipboard.writeText(text)
  if (flag === 'install') {
    copiedInstall.value = true
    setTimeout(() => { copiedInstall.value = false }, 2000)
  }
  else {
    copiedUsage.value = true
    setTimeout(() => { copiedUsage.value = false }, 2000)
  }
}
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">
        {{ msg.gettingStartedTitle }}
      </h1>
    </div>

    <!-- Installation -->
    <Card>
      <CardHeader>
        <CardTitle>{{ msg.installation }}</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="relative">
          <Button
            variant="ghost"
            size="icon"
            class="absolute right-2 top-2 z-10 size-7"
            @click="copy(installCode, 'install')"
          >
            <Check
              v-if="copiedInstall"
              class="size-3.5"
            />
            <Copy
              v-else
              class="size-3.5"
            />
          </Button>
          <div
            class="overflow-auto rounded-lg border bg-muted/50 p-4 text-sm [&_pre]:!bg-transparent [&_pre]:!p-0"
            v-html="highlightedInstall"
          />
        </div>
      </CardContent>
    </Card>

    <!-- Basic Usage -->
    <Card>
      <CardHeader>
        <CardTitle>{{ msg.basicUsage }}</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="relative">
          <Button
            variant="ghost"
            size="icon"
            class="absolute right-2 top-2 z-10 size-7"
            @click="copy(basicUsageCode, 'usage')"
          >
            <Check
              v-if="copiedUsage"
              class="size-3.5"
            />
            <Copy
              v-else
              class="size-3.5"
            />
          </Button>
          <div
            class="max-h-[400px] overflow-auto rounded-lg border bg-muted/50 p-4 text-sm [&_pre]:!bg-transparent [&_pre]:!p-0"
            v-html="highlightedUsage"
          />
        </div>
      </CardContent>
    </Card>
  </div>
</template>
