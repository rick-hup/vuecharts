<script setup lang="ts">
import { provideLocale } from '~/composables/useLocale'

provideLocale()
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <slot />
  </div>
</template>
