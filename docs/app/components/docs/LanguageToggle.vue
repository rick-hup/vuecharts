<script setup lang="ts">
import { Languages } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'

const { locale, toggle } = useLocale()
</script>

<template>
  <Button
    variant="ghost"
    size="icon"
    @click="toggle"
  >
    <Languages class="size-4" />
    <span class="sr-only">{{ locale === 'zh' ? 'Switch to English' : '切换到中文' }}</span>
  </Button>
</template>
