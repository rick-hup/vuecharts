import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'

const r = (p: string) => resolve(__dirname, p)

export default defineConfig({
  plugins: [
    Vue(),
    vueJsx() as any,
    dts({
      cleanVueFileName: true,
      outDir: 'dist/es',
      exclude: ['src/test/*.ts', 'src/**/story/**', 'src/**/*.story.tsx'],
      // afterBuild: async () => {
      //   // pnpm build:plugins
      //   execSync('pnpm build:plugins', { stdio: 'inherit', cwd: path.resolve(__dirname, '../plugins') })
      // },
    }),

  ],
  resolve: {
    alias: {
      '@': r('./src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    exclude: ['**/node_modules/**'],
    include: ['./**/*.{test,spec}.{ts,js,tsx}'],
    coverage: {
      provider: 'v8',
    },
    // globalSetup: './vitest.global.ts',
    // setupFiles: './vitest.setup.ts',
    server: {
      deps: {
        inline: ['vitest-canvas-mock'],
      },
    },
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
  },
})
