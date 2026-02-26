<script setup lang="ts">
import ChartSection from '~/components/docs/ChartSection.vue'
import ChartDisplay from '~/components/docs/ChartDisplay.vue'
import { useLocale } from '~/composables/useLocale'

import SimpleBarChart from '~/charts/bar-charts/simple-bar-chart.vue'
import simpleBarChartCode from '~/charts/bar-charts/simple-bar-chart.vue?raw'
import StackedBarChart from '~/charts/bar-charts/stacked-bar-chart.vue'
import stackedBarChartCode from '~/charts/bar-charts/stacked-bar-chart.vue?raw'
import HorizontalBarChart from '~/charts/bar-charts/horizontal-bar-chart.vue'
import horizontalBarChartCode from '~/charts/bar-charts/horizontal-bar-chart.vue?raw'

definePageMeta({ layout: 'docs' })

const { msg } = useLocale()
</script>

<template>
  <ChartSection
    :title="msg.barChartsTitle"
    :description="msg.barChartsDesc"
  >
    <ChartDisplay
      :name="msg.simpleBarChart"
      :description="msg.simpleBarChartDesc"
      :code="simpleBarChartCode"
    >
      <SimpleBarChart />
    </ChartDisplay>
    <ChartDisplay
      :name="msg.stackedBarChart"
      :description="msg.stackedBarChartDesc"
      :code="stackedBarChartCode"
    >
      <StackedBarChart />
    </ChartDisplay>
    <ChartDisplay
      :name="msg.horizontalBarChart"
      :description="msg.horizontalBarChartDesc"
      :code="horizontalBarChartCode"
    >
      <HorizontalBarChart />
    </ChartDisplay>
  </ChartSection>
</template>
