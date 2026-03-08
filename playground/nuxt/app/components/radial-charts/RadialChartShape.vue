<script setup lang="ts">
import { TrendingUp } from 'lucide-vue-next'
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from 'vccs'
import type { ChartConfig } from '~/components/ui/chart/types'

const chartData = [{ browser: 'safari', visitors: 1260, fill: 'var(--color-safari)' }]

const chartConfig: ChartConfig = {
  visitors: { label: 'Visitors' },
  safari: { label: 'Safari', color: 'var(--chart-2)' },
}
</script>

<template>
  <Card class="flex flex-col">
    <CardHeader class="items-center pb-0">
      <CardTitle>Radial Chart - Shape</CardTitle>
      <CardDescription>January - June 2024</CardDescription>
    </CardHeader>
    <CardContent class="flex-1 pb-0">
      <ChartContainer
        :config="chartConfig"
        class="mx-auto aspect-square max-h-[250px]"
      >
        <RadialBarChart
          :data="chartData"
          :end-angle="100"
          :inner-radius="80"
          :outer-radius="110"
        >
          <PolarGrid
            grid-type="circle"
            :radial-lines="false"
            stroke="none"
            class="first:fill-muted last:fill-background"
            :polar-radius="[86, 74]"
          />
          <RadialBar
            data-key="visitors"
            :background="true"
          />
          <PolarRadiusAxis
            :tick="false"
            :tick-line="false"
            :axis-line="false"
          >
            <Label>
              <template #content="{ viewBox }">
                <text
                  v-if="viewBox && 'cx' in viewBox"
                  :x="viewBox.cx"
                  :y="viewBox.cy"
                  text-anchor="middle"
                  dominant-baseline="middle"
                >
                  <tspan
                    :x="viewBox.cx"
                    :y="viewBox.cy"
                    class="fill-foreground text-4xl font-bold"
                  >
                    {{ chartData[0].visitors.toLocaleString() }}
                  </tspan>
                  <tspan
                    :x="viewBox.cx"
                    :y="(viewBox.cy || 0) + 24"
                    class="fill-muted-foreground"
                  >
                    Visitors
                  </tspan>
                </text>
              </template>
            </Label>
          </PolarRadiusAxis>
        </RadialBarChart>
      </ChartContainer>
    </CardContent>
    <CardFooter class="flex-col gap-2 text-sm">
      <div class="flex items-center gap-2 font-medium leading-none">
        Trending up by 5.2% this month
        <TrendingUp class="size-4" />
      </div>
      <div class="leading-none text-muted-foreground">
        Showing total visitors for the last 6 months
      </div>
    </CardFooter>
  </Card>
</template>
