<script setup lang="ts">
import { Layers } from 'lucide-vue-next'
import { Bar, BarChart, CartesianGrid, Customized, Tooltip, XAxis, YAxis } from 'vccs'
import type { ChartConfig } from '~/components/ui/chart/types'
import ChartTooltipContent from '~/components/ui/chart/ChartTooltipContent.vue'

const chartData = [
  { month: 'Jan', desktop: 186, mobile: 80 },
  { month: 'Feb', desktop: 305, mobile: 200 },
  { month: 'Mar', desktop: 237, mobile: 120 },
  { month: 'Apr', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'Jun', desktop: 354, mobile: 140 },
]

const chartConfig: ChartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)',
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--chart-2)',
  },
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Customized - Graphical Items</CardTitle>
      <CardDescription>
        Read registered graphical items metadata
      </CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer
        :config="chartConfig"
        class="aspect-auto h-[250px] w-full"
      >
        <BarChart
          :data="chartData"
          :margin="{ left: 12, right: 12, top: 20 }"
        >
          <CartesianGrid :vertical="false" />
          <XAxis
            data-key="month"
            :tick-line="false"
            :axis-line="false"
            :tick-margin="8"
          />
          <YAxis
            :tick-line="false"
            :axis-line="false"
          />
          <Tooltip :cursor="false">
            <template #content="{ active, payload, label }">
              <ChartTooltipContent
                :active="active"
                :payload="payload"
                :label="label"
              />
            </template>
          </Tooltip>
          <Bar
            data-key="desktop"
            fill="var(--color-desktop)"
            :radius="4"
            :is-animation-active="false"
          />
          <Bar
            data-key="mobile"
            fill="var(--color-mobile)"
            :radius="4"
            :is-animation-active="false"
          />
          <Customized>
            <template #default="{ formattedGraphicalItems, offset }">
              <text
                v-for="(item, i) in formattedGraphicalItems"
                :key="i"
                :x="offset.left + 4"
                :y="offset.top + 14 + i * 16"
                fill="#888"
                font-size="11"
              >
                {{ item.type }}[{{ item.dataKey }}]
              </text>
            </template>
          </Customized>
        </BarChart>
      </ChartContainer>
    </CardContent>
    <CardFooter>
      <div class="flex w-full items-start gap-2 text-sm">
        <div class="grid gap-2">
          <div class="flex items-center gap-2 font-medium leading-none">
            2 graphical items detected
            <Layers class="size-4" />
          </div>
          <div class="flex items-center gap-2 leading-none text-muted-foreground">
            January - June 2024
          </div>
        </div>
      </div>
    </CardFooter>
  </Card>
</template>
