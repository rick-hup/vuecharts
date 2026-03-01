import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  css: ['~/assets/css/tailwind.css'],

  vite: {
    plugins: [
      tailwindcss() as any,
    ],
    resolve: {
      dedupe: ['vue', '@vue/runtime-dom', '@vue/runtime-core', '@vue/reactivity', '@vue/shared'],
    },
  },

  modules: ['shadcn-nuxt', '@nuxt/content'],

  shadcn: {
    prefix: '',
    componentDir: './app/components/ui',
  },

  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark',
          },
          langs: ['vue', 'vue-html', 'typescript', 'javascript', 'bash', 'json', 'css', 'html'],
        },
      },
    },
  },
})
