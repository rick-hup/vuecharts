<script lang="ts" setup>
import './button.css'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  /**
   * The label of the button
   */
  label: string
  /**
   * primary or secondary button
   */
  primary?: boolean
  /**
   * size of the button
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * background color of the button
   */
  backgroundColor?: string

}>(), { primary: false })

const emit = defineEmits<{
  (e: 'click', id: number): void
}>()

const classes = computed(() => ({
  'storybook-button': true,
  'storybook-button--primary': props.primary,
  'storybook-button--secondary': !props.primary,
  [`storybook-button--${props.size || 'medium'}`]: true,
}))

const style = computed(() => ({
  backgroundColor: props.backgroundColor,
}))

function onClick() {
  emit('click', 1)
}
</script>

<template>
  <button
    type="button"
    :class="classes"
    :style="style"
    @click="onClick"
  >
    {{ label }}
  </button>
</template>
