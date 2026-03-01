import { onMounted, onUnmounted, ref } from 'vue'

export interface TocLink {
  id: string
  text: string
  depth: number
}

export function useToc() {
  const activeId = ref('')

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const headings = document.querySelectorAll('.prose h2[id], .prose h3[id]')
    if (!headings.length)
      return

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeId.value = entry.target.id
          }
        }
      },
      { rootMargin: '-80px 0px -80% 0px', threshold: 0 },
    )

    headings.forEach(h => observer!.observe(h))
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { activeId }
}
