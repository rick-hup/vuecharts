<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import { Moon, Sun } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'

const mode = useColorMode()

function toggle() {
  mode.value = mode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <Button
    variant="ghost"
    size="icon"
    @click="toggle"
  >
    <Sun
      v-if="mode === 'dark'"
      class="size-4"
    />
    <Moon
      v-else
      class="size-4"
    />
    <span class="sr-only">Toggle theme</span>
  </Button>
</template>
