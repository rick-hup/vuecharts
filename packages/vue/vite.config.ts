import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'

const projectRootDir = resolve(__dirname)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({
      cleanVueFileName: true,
      exclude: ['src/test/**', 'src/**/story/**', 'src/**/*.story.vue'],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(projectRootDir, 'src'),
    },
  },
  build: {
    lib: {
      name: 'motion-number-vue',
      fileName: (format, name) => {
        return `${name}.${format === 'es' ? 'js' : 'umd.cjs'}`
      },
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
      },
    },
    // minify:true,
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library (Vue)
      external: ['vue', 'motion-v'],
      output: [
        {
          format: 'es',
          globals: {
            vue: 'Vue',
          },
          entryFileNames(chunkInfo) {
            return '[name].mjs'
          },
          dir: './dist/es',
          // exports: 'named',
          // preserveModules: true,
          // preserveModulesRoot: 'src',
        },
        {
          format: 'cjs',
          name: 'motion-number-vue',
          globals: {
            vue: 'Vue',
          },
          entryFileNames: '[name].js',
          dir: 'dist/cjs',
          exports: 'named',
          esModule: true,
        },
      ],
    },
  },
})
