<script setup lang="ts">
import { ArrowRight, Blocks, Code2, Palette, RefreshCw, Sparkles, Zap } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'
import { Card, CardContent } from '~/components/ui/card'
import { useLocale } from '~/composables/useLocale'

definePageMeta({ layout: 'docs' })

const { msg } = useLocale()

const features = computed(() => [
  { icon: Blocks, text: msg.value.featureComposable },
  { icon: Zap, text: msg.value.featureVue3 },
  { icon: RefreshCw, text: msg.value.featureRecharts },
  { icon: Code2, text: msg.value.featureTypescript },
  { icon: Sparkles, text: msg.value.featureAnimation },
  { icon: Palette, text: msg.value.featureTheme },
])
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">
        {{ msg.introTitle }}
      </h1>
      <p class="mt-4 text-lg text-muted-foreground leading-relaxed">
        {{ msg.introDesc }}
      </p>
    </div>

    <div>
      <h2 class="text-xl font-semibold">
        {{ msg.features }}
      </h2>
      <div class="mt-4 grid gap-3 sm:grid-cols-2">
        <Card
          v-for="feature in features"
          :key="feature.text"
        >
          <CardContent class="flex items-start gap-3 p-4">
            <component
              :is="feature.icon"
              class="mt-0.5 size-5 shrink-0 text-primary"
            />
            <span class="text-sm">{{ feature.text }}</span>
          </CardContent>
        </Card>
      </div>
    </div>

    <div class="flex gap-3">
      <Button as-child>
        <NuxtLink to="/docs/getting-started">
          {{ msg.getStarted }}
          <ArrowRight class="ml-2 size-4" />
        </NuxtLink>
      </Button>
    </div>
  </div>
</template>
