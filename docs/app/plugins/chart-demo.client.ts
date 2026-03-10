import ChartDemo from '~/components/ChartDemo.vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('ChartDemo', ChartDemo)
})
