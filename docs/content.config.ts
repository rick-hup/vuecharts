import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content_en: defineCollection({
      type: 'page',
      source: {
        include: 'en/docs/**',
        prefix: '/docs',
      },
      schema: z.object({
        icon: z.string().optional(),
      }),
    }),
  },
})
