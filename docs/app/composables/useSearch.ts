import { onMounted, onUnmounted, ref } from 'vue'

export function useSearch() {
  const isOpen = ref(false)

  function open() { isOpen.value = true }
  function close() { isOpen.value = false }
  function toggle() { isOpen.value = !isOpen.value }

  function handleKeydown(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      toggle()
    }
    if (e.key === 'Escape' && isOpen.value) {
      close()
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })

  return { isOpen, open, close, toggle }
}
