<script setup lang="ts">
import DocsToc from '~/components/docs/DocsToc.vue'
import DocsPagination from '~/components/docs/DocsPagination.vue'

definePageMeta({ layout: 'docs' })

const route = useRoute()
const { collectionName } = useLocale()

const slug = computed(() => {
  const parts = route.params.slug
  const path = Array.isArray(parts) ? parts.join('/') : parts || ''
  return `/docs/${path}`
})

const { data: page } = await useAsyncData(
  `docs-${slug.value}`,
  () => queryCollection(collectionName).path(slug.value).first(),
  { watch: [slug] },
)

// Flatten navigation for prev/next
const { data: navigation } = await useAsyncData(
  `nav-flat`,
  () => queryCollectionNavigation(collectionName),
)

const flatPages = computed(() => {
  const pages: { path: string, title: string }[] = []
  function walk(items: any[]) {
    for (const item of items) {
      if (item.path?.endsWith('/_dir'))
        continue
      if (item.children?.length) {
        walk(item.children)
      }
      else {
        pages.push({ path: item.path, title: item.title })
      }
    }
  }
  if (navigation.value) {
    for (const group of navigation.value) {
      if (group.children)
        walk(group.children)
    }
  }
  return pages
})

const currentIndex = computed(() =>
  flatPages.value.findIndex(p => p.path === slug.value),
)

const prevPage = computed(() =>
  currentIndex.value > 0 ? flatPages.value[currentIndex.value - 1] : null,
)
const nextPage = computed(() =>
  currentIndex.value < flatPages.value.length - 1 ? flatPages.value[currentIndex.value + 1] : null,
)

// TOC links
const tocLinks = computed(() => {
  if (!page.value?.body?.toc?.links)
    return []
  const links: { id: string, text: string, depth: number }[] = []
  function walkToc(items: any[], depth = 2) {
    for (const item of items) {
      links.push({ id: item.id, text: item.text, depth })
      if (item.children)
        walkToc(item.children, depth + 1)
    }
  }
  walkToc(page.value.body.toc.links)
  return links
})

useHead({
  title: computed(() => page.value?.title ? `${page.value.title} | vccs` : 'vccs'),
})
</script>

<template>
  <div class="flex">
    <div class="flex-1 min-w-0">
      <div
        v-if="page"
        class="prose prose-neutral dark:prose-invert max-w-none"
      >
        <ContentRenderer :value="page" />
      </div>
      <div
        v-else
        class="py-20 text-center"
      >
        <h1 class="text-2xl font-bold">
          Page not found
        </h1>
        <p class="mt-2 text-muted-foreground">
          This page doesn't exist yet.
        </p>
        <NuxtLink
          to="/docs/getting-started/introduction"
          class="mt-4 inline-block text-primary underline"
        >
          Go to Introduction
        </NuxtLink>
      </div>
      <DocsPagination
        v-if="page"
        :prev="prevPage"
        :next="nextPage"
      />
    </div>
    <DocsToc :links="tocLinks" />
  </div>
</template>
