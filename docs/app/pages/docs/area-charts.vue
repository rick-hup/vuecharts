<script setup lang="ts">
import ChartSection from '~/components/docs/ChartSection.vue'
import ChartDisplay from '~/components/docs/ChartDisplay.vue'
import { useLocale } from '~/composables/useLocale'

import SimpleAreaChart from '~/charts/area-charts/simple-area-chart.vue'
import simpleAreaChartCode from '~/charts/area-charts/simple-area-chart.vue?raw'
import StackedAreaChart from '~/charts/area-charts/stacked-area-chart.vue'
import stackedAreaChartCode from '~/charts/area-charts/stacked-area-chart.vue?raw'
import GradientAreaChart from '~/charts/area-charts/gradient-area-chart.vue'
import gradientAreaChartCode from '~/charts/area-charts/gradient-area-chart.vue?raw'

definePageMeta({ layout: 'docs' })

const { msg } = useLocale()
</script>

<template>
  <ChartSection
    :title="msg.areaChartsTitle"
    :description="msg.areaChartsDesc"
  >
    <ChartDisplay
      :name="msg.simpleAreaChart"
      :description="msg.simpleAreaChartDesc"
      :code="simpleAreaChartCode"
    >
      <SimpleAreaChart />
    </ChartDisplay>
    <ChartDisplay
      :name="msg.stackedAreaChart"
      :description="msg.stackedAreaChartDesc"
      :code="stackedAreaChartCode"
    >
      <StackedAreaChart />
    </ChartDisplay>
    <ChartDisplay
      :name="msg.gradientAreaChart"
      :description="msg.gradientAreaChartDesc"
      :code="gradientAreaChartCode"
    >
      <GradientAreaChart />
    </ChartDisplay>
  </ChartSection>
</template>
