import { defineCollection, defineContentConfig } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content_en: defineCollection({
      type: 'page',
      source: {
        include: 'en/docs/**',
        prefix: '/docs',
      },
    }),
    content_zh: defineCollection({
      type: 'page',
      source: {
        include: 'zh/docs/**',
        prefix: '/zh/docs',
      },
    }),
  },
})
