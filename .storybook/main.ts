import type { StorybookConfig } from '@storybook/vue3-vite'
import { mergeConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const config: StorybookConfig = {
  stories: [
    '../packages/**/*.mdx',
    '../packages/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {

    },
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal(config) {
    return mergeConfig(config, {
      plugins: [vue(), vueJsx()],
      resolve: {
        alias: {
          '@': '/packages/vue/src',
        },
      },
    })
  },
}

export default config
