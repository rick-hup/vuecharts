<script setup lang="ts">
import { TrendingDown } from 'lucide-vue-next'
import { Funnel, FunnelChart, LabelList, Tooltip } from 'vccs'
import type { ChartConfig } from '~/components/ui/chart/types'
import ChartTooltipContent from '~/components/ui/chart/ChartTooltipContent.vue'

const chartData = [
  { stage: 'Visit', value: 1000 },
  { stage: 'Cart', value: 680 },
  { stage: 'Checkout', value: 420 },
  { stage: 'Purchase', value: 260 },
]

const COLORS = ['#f97316', '#14b8a6', '#f59e0b', '#06b6d4']

const chartConfig: ChartConfig = {
  value: { label: 'Users' },
  visit: { label: 'Visit', color: '#f97316' },
  cart: { label: 'Cart', color: '#14b8a6' },
  checkout: { label: 'Checkout', color: '#f59e0b' },
  purchase: { label: 'Purchase', color: '#06b6d4' },
}
</script>

<template>
  <Card class="flex flex-col">
    <CardHeader class="items-center pb-0">
      <CardTitle>Funnel Chart - Label</CardTitle>
      <CardDescription>Labels rendered via LabelList component</CardDescription>
    </CardHeader>
    <CardContent class="flex-1 pb-0">
      <ChartContainer
        :config="chartConfig"
        class="mx-auto aspect-square max-h-[300px]"
      >
        <FunnelChart
          :width="400"
          :height="300"
        >
          <Tooltip :cursor="false">
            <template #content="{ active, payload, label }">
              <ChartTooltipContent
                :active="active"
                :payload="payload"
                :label="label"
              />
            </template>
          </Tooltip>
          <Funnel
            :data="chartData"
            data-key="value"
            name-key="stage"
          >
            <LabelList
              position="right"
              fill="#000"
              :font-size="12"
            />
          </Funnel>
        </FunnelChart>
      </ChartContainer>
    </CardContent>
    <CardFooter class="flex-col gap-2 text-sm">
      <div class="flex items-center gap-2 font-medium leading-none">
        74% drop-off rate
        <TrendingDown class="size-4" />
      </div>
      <div class="leading-none text-muted-foreground">
        Labels appear after entrance animation completes
      </div>
    </CardFooter>
  </Card>
</template>
