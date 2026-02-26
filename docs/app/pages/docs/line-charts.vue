<script setup lang="ts">
import ChartSection from '~/components/docs/ChartSection.vue'
import ChartDisplay from '~/components/docs/ChartDisplay.vue'
import { useLocale } from '~/composables/useLocale'

import SimpleLineChart from '~/charts/line-charts/simple-line-chart.vue'
import simpleLineChartCode from '~/charts/line-charts/simple-line-chart.vue?raw'
import MultiLineChart from '~/charts/line-charts/multi-line-chart.vue'
import multiLineChartCode from '~/charts/line-charts/multi-line-chart.vue?raw'
import DashedLineChart from '~/charts/line-charts/dashed-line-chart.vue'
import dashedLineChartCode from '~/charts/line-charts/dashed-line-chart.vue?raw'

definePageMeta({ layout: 'docs' })

const { msg } = useLocale()
</script>

<template>
  <ChartSection
    :title="msg.lineChartsTitle"
    :description="msg.lineChartsDesc"
  >
    <ChartDisplay
      :name="msg.simpleLineChart"
      :description="msg.simpleLineChartDesc"
      :code="simpleLineChartCode"
    >
      <SimpleLineChart />
    </ChartDisplay>
    <ChartDisplay
      :name="msg.multiLineChart"
      :description="msg.multiLineChartDesc"
      :code="multiLineChartCode"
    >
      <MultiLineChart />
    </ChartDisplay>
    <ChartDisplay
      :name="msg.dashedLineChart"
      :description="msg.dashedLineChartDesc"
      :code="dashedLineChartCode"
    >
      <DashedLineChart />
    </ChartDisplay>
  </ChartSection>
</template>
