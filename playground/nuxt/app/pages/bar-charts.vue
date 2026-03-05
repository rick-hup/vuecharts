<script setup lang="ts">
import { computed, ref } from 'vue'
import { TrendingDown, TrendingUp } from 'lucide-vue-next'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'vccs'

// --- Shared data ---
const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
]

const horizontalData = [
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
]

const mixedData = [
  { browser: 'Chrome', visitors: 275, fill: 'var(--chart-1)' },
  { browser: 'Safari', visitors: 200, fill: 'var(--chart-2)' },
  { browser: 'Firefox', visitors: 187, fill: 'var(--chart-3)' },
  { browser: 'Edge', visitors: 173, fill: 'var(--chart-4)' },
  { browser: 'Other', visitors: 90, fill: 'var(--chart-5)' },
]

const negativeData = [
  { month: 'January', visitors: 186 },
  { month: 'February', visitors: 305 },
  { month: 'March', visitors: -237 },
  { month: 'April', visitors: 73 },
  { month: 'May', visitors: -209 },
  { month: 'June', visitors: 214 },
]

// --- Interactive chart ---
const interactiveData = [
  { date: '2024-04-01', desktop: 222, mobile: 150 },
  { date: '2024-04-02', desktop: 97, mobile: 180 },
  { date: '2024-04-03', desktop: 167, mobile: 120 },
  { date: '2024-04-04', desktop: 242, mobile: 260 },
  { date: '2024-04-05', desktop: 373, mobile: 290 },
  { date: '2024-04-06', desktop: 301, mobile: 340 },
  { date: '2024-04-07', desktop: 245, mobile: 180 },
  { date: '2024-04-08', desktop: 409, mobile: 320 },
  { date: '2024-04-09', desktop: 59, mobile: 110 },
  { date: '2024-04-10', desktop: 261, mobile: 190 },
  { date: '2024-04-11', desktop: 327, mobile: 350 },
  { date: '2024-04-12', desktop: 292, mobile: 210 },
  { date: '2024-04-13', desktop: 342, mobile: 380 },
  { date: '2024-04-14', desktop: 137, mobile: 220 },
  { date: '2024-04-15', desktop: 120, mobile: 170 },
  { date: '2024-04-16', desktop: 138, mobile: 190 },
  { date: '2024-04-17', desktop: 446, mobile: 360 },
  { date: '2024-04-18', desktop: 364, mobile: 410 },
  { date: '2024-04-19', desktop: 243, mobile: 180 },
  { date: '2024-04-20', desktop: 89, mobile: 150 },
  { date: '2024-04-21', desktop: 137, mobile: 200 },
  { date: '2024-04-22', desktop: 224, mobile: 170 },
  { date: '2024-04-23', desktop: 138, mobile: 230 },
  { date: '2024-04-24', desktop: 387, mobile: 290 },
  { date: '2024-04-25', desktop: 215, mobile: 250 },
  { date: '2024-04-26', desktop: 75, mobile: 130 },
  { date: '2024-04-27', desktop: 383, mobile: 420 },
  { date: '2024-04-28', desktop: 122, mobile: 180 },
  { date: '2024-04-29', desktop: 315, mobile: 240 },
  { date: '2024-04-30', desktop: 454, mobile: 380 },
  { date: '2024-05-01', desktop: 165, mobile: 220 },
  { date: '2024-05-02', desktop: 293, mobile: 310 },
  { date: '2024-05-03', desktop: 247, mobile: 190 },
  { date: '2024-05-04', desktop: 385, mobile: 420 },
  { date: '2024-05-05', desktop: 481, mobile: 390 },
  { date: '2024-05-06', desktop: 498, mobile: 520 },
  { date: '2024-05-07', desktop: 388, mobile: 300 },
  { date: '2024-05-08', desktop: 149, mobile: 210 },
  { date: '2024-05-09', desktop: 227, mobile: 180 },
  { date: '2024-05-10', desktop: 293, mobile: 330 },
  { date: '2024-05-11', desktop: 335, mobile: 270 },
  { date: '2024-05-12', desktop: 197, mobile: 240 },
  { date: '2024-05-13', desktop: 197, mobile: 160 },
  { date: '2024-05-14', desktop: 448, mobile: 490 },
  { date: '2024-05-15', desktop: 473, mobile: 380 },
  { date: '2024-05-16', desktop: 338, mobile: 400 },
  { date: '2024-05-17', desktop: 499, mobile: 420 },
  { date: '2024-05-18', desktop: 315, mobile: 350 },
  { date: '2024-05-19', desktop: 235, mobile: 180 },
  { date: '2024-05-20', desktop: 177, mobile: 230 },
  { date: '2024-05-21', desktop: 82, mobile: 140 },
  { date: '2024-05-22', desktop: 81, mobile: 120 },
  { date: '2024-05-23', desktop: 252, mobile: 290 },
  { date: '2024-05-24', desktop: 294, mobile: 220 },
  { date: '2024-05-25', desktop: 201, mobile: 250 },
  { date: '2024-05-26', desktop: 213, mobile: 170 },
  { date: '2024-05-27', desktop: 420, mobile: 460 },
  { date: '2024-05-28', desktop: 233, mobile: 190 },
  { date: '2024-05-29', desktop: 78, mobile: 130 },
  { date: '2024-05-30', desktop: 340, mobile: 280 },
  { date: '2024-05-31', desktop: 178, mobile: 230 },
  { date: '2024-06-01', desktop: 178, mobile: 200 },
  { date: '2024-06-02', desktop: 470, mobile: 410 },
  { date: '2024-06-03', desktop: 103, mobile: 160 },
  { date: '2024-06-04', desktop: 439, mobile: 380 },
  { date: '2024-06-05', desktop: 88, mobile: 140 },
  { date: '2024-06-06', desktop: 294, mobile: 250 },
  { date: '2024-06-07', desktop: 323, mobile: 370 },
  { date: '2024-06-08', desktop: 385, mobile: 320 },
  { date: '2024-06-09', desktop: 438, mobile: 480 },
  { date: '2024-06-10', desktop: 155, mobile: 200 },
  { date: '2024-06-11', desktop: 92, mobile: 150 },
  { date: '2024-06-12', desktop: 492, mobile: 420 },
  { date: '2024-06-13', desktop: 81, mobile: 130 },
  { date: '2024-06-14', desktop: 426, mobile: 380 },
  { date: '2024-06-15', desktop: 307, mobile: 350 },
  { date: '2024-06-16', desktop: 371, mobile: 310 },
  { date: '2024-06-17', desktop: 475, mobile: 520 },
  { date: '2024-06-18', desktop: 107, mobile: 170 },
  { date: '2024-06-19', desktop: 341, mobile: 290 },
  { date: '2024-06-20', desktop: 408, mobile: 450 },
  { date: '2024-06-21', desktop: 169, mobile: 210 },
  { date: '2024-06-22', desktop: 317, mobile: 270 },
  { date: '2024-06-23', desktop: 480, mobile: 530 },
  { date: '2024-06-24', desktop: 132, mobile: 180 },
  { date: '2024-06-25', desktop: 141, mobile: 190 },
  { date: '2024-06-26', desktop: 434, mobile: 380 },
  { date: '2024-06-27', desktop: 448, mobile: 490 },
  { date: '2024-06-28', desktop: 149, mobile: 200 },
  { date: '2024-06-29', desktop: 103, mobile: 160 },
  { date: '2024-06-30', desktop: 446, mobile: 400 },
]

const activeChart = ref<'desktop' | 'mobile'>('desktop')

const interactiveTotal = computed(() => ({
  desktop: interactiveData.reduce((acc, cur) => acc + cur.desktop, 0),
  mobile: interactiveData.reduce((acc, cur) => acc + cur.mobile, 0),
}))

// --- Active chart state ---
const activeBarIndex = ref<number | undefined>(undefined)
</script>

<template>
  <div class="mx-auto max-w-4xl space-y-8 p-8">
    <div class="flex items-center gap-4">
      <NuxtLink
        to="/"
        class="text-sm text-muted-foreground hover:text-foreground"
      >
        &larr; Back
      </NuxtLink>
      <h1 class="text-2xl font-bold tracking-tight">
        Bar Charts
      </h1>
    </div>

    <!-- 1. Bar Chart -->
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer class="aspect-auto h-[250px] w-full">
          <BarChart :data="chartData">
            <CartesianGrid :vertical="false" />
            <XAxis
              data-key="month"
              :tick-line="false"
              :tick-margin="10"
              :axis-line="false"
              :tick-formatter="(value: string) => value.slice(0, 3)"
            />
            <Tooltip />
            <Bar
              data-key="desktop"
              fill="var(--chart-1)"
              :radius="8"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter class="flex-col items-start gap-2 text-sm">
        <div class="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month
          <TrendingUp class="size-4" />
        </div>
        <div class="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>

    <!-- 2. Bar Chart - Horizontal -->
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Horizontal</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer class="aspect-auto h-[250px] w-full">
          <BarChart
            :data="horizontalData"
            layout="vertical"
            :margin="{ left: -20 }"
          >
            <CartesianGrid :horizontal="false" />
            <XAxis
              type="number"
              :hide="true"
            />
            <YAxis
              data-key="month"
              type="category"
              :tick-line="false"
              :tick-margin="10"
              :axis-line="false"
              :tick-formatter="(value: string) => value.slice(0, 3)"
            />
            <Tooltip />
            <Bar
              data-key="desktop"
              fill="var(--chart-1)"
              :radius="5"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter class="flex-col items-start gap-2 text-sm">
        <div class="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month
          <TrendingUp class="size-4" />
        </div>
        <div class="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>

    <!-- 3. Bar Chart - Multiple -->
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Multiple</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer class="aspect-auto h-[250px] w-full">
          <BarChart :data="chartData">
            <CartesianGrid :vertical="false" />
            <XAxis
              data-key="month"
              :tick-line="false"
              :tick-margin="10"
              :axis-line="false"
              :tick-formatter="(value: string) => value.slice(0, 3)"
            />
            <Tooltip />
            <Bar
              data-key="desktop"
              fill="var(--chart-1)"
              :radius="4"
            />
            <Bar
              data-key="mobile"
              fill="var(--chart-2)"
              :radius="4"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter class="flex-col items-start gap-2 text-sm">
        <div class="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month
          <TrendingUp class="size-4" />
        </div>
        <div class="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>

    <!-- 4. Bar Chart - Stacked + Legend -->
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Stacked + Legend</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer class="aspect-auto h-[250px] w-full">
          <BarChart :data="chartData">
            <CartesianGrid :vertical="false" />
            <XAxis
              data-key="month"
              :tick-line="false"
              :tick-margin="10"
              :axis-line="false"
              :tick-formatter="(value: string) => value.slice(0, 3)"
            />
            <Tooltip />
            <Legend />
            <Bar
              data-key="desktop"
              stack-id="a"
              fill="var(--chart-1)"
              :radius="[0, 0, 4, 4]"
            />
            <Bar
              data-key="mobile"
              stack-id="a"
              fill="var(--chart-2)"
              :radius="[4, 4, 0, 0]"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter class="flex-col items-start gap-2 text-sm">
        <div class="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month
          <TrendingUp class="size-4" />
        </div>
        <div class="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>

    <!-- 5. Bar Chart - Label -->
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Label</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer class="aspect-auto h-[250px] w-full">
          <BarChart
            :data="horizontalData"
            layout="vertical"
            :margin="{ right: 16 }"
          >
            <CartesianGrid :horizontal="false" />
            <XAxis
              type="number"
              :hide="true"
            />
            <YAxis
              data-key="month"
              type="category"
              :tick-line="false"
              :axis-line="false"
              :tick-margin="10"
              :tick-formatter="(value: string) => value.slice(0, 3)"
            />
            <Tooltip />
            <Bar
              data-key="desktop"
              fill="var(--chart-1)"
              :radius="5"
              :label="{ position: 'right' }"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter class="flex-col items-start gap-2 text-sm">
        <div class="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month
          <TrendingUp class="size-4" />
        </div>
        <div class="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>

    <!-- 6. Bar Chart - Custom Label -->
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Custom Label</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer class="aspect-auto h-[250px] w-full">
          <BarChart
            :data="horizontalData"
            layout="vertical"
            :margin="{ right: 16 }"
          >
            <CartesianGrid :horizontal="false" />
            <XAxis
              type="number"
              :hide="true"
            />
            <YAxis
              data-key="month"
              type="category"
              :tick-line="false"
              :axis-line="false"
              :tick-margin="10"
              :hide="true"
            />
            <Tooltip />
            <Bar
              data-key="desktop"
              fill="var(--chart-1)"
              :radius="5"
              :label="{ position: 'insideLeft', offset: 8, fill: 'white', fontSize: 12 }"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter class="flex-col items-start gap-2 text-sm">
        <div class="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month
          <TrendingUp class="size-4" />
        </div>
        <div class="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>

    <!-- 7. Bar Chart - Mixed -->
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Mixed</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer class="aspect-auto h-[250px] w-full">
          <BarChart
            :data="mixedData"
            layout="vertical"
            :margin="{ left: 0 }"
          >
            <CartesianGrid :horizontal="false" />
            <XAxis
              type="number"
              :hide="true"
            />
            <YAxis
              data-key="browser"
              type="category"
              :tick-line="false"
              :tick-margin="10"
              :axis-line="false"
            />
            <Tooltip />
            <Bar
              data-key="visitors"
              :radius="5"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter class="flex-col items-start gap-2 text-sm">
        <div class="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month
          <TrendingUp class="size-4" />
        </div>
        <div class="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>

    <!-- 8. Bar Chart - Active -->
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Active</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer class="aspect-auto h-[250px] w-full">
          <BarChart :data="chartData">
            <CartesianGrid :vertical="false" />
            <XAxis
              data-key="month"
              :tick-line="false"
              :tick-margin="10"
              :axis-line="false"
              :tick-formatter="(value: string) => value.slice(0, 3)"
            />
            <Tooltip />
            <Bar
              data-key="desktop"
              fill="var(--chart-1)"
              :radius="8"
              fill-opacity="0.6"
              active-fill-opacity="0.9"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter class="flex-col items-start gap-2 text-sm">
        <div class="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month
          <TrendingUp class="size-4" />
        </div>
        <div class="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>

    <!-- 9. Bar Chart - Negative -->
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Negative</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer class="aspect-auto h-[250px] w-full">
          <BarChart :data="negativeData">
            <CartesianGrid :vertical="false" />
            <XAxis
              data-key="month"
              :tick-line="false"
              :tick-margin="10"
              :axis-line="false"
              :tick-formatter="(value: string) => value.slice(0, 3)"
            />
            <Tooltip />
            <Bar
              data-key="visitors"
              fill="var(--chart-1)"
            >
              <template #shape="props">
                <rect
                  :x="props.x"
                  :y="props.y"
                  :width="props.width"
                  :height="props.height"
                  :rx="4"
                  :fill="props.value >= 0 ? 'var(--chart-1)' : 'var(--chart-2)'"
                />
              </template>
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter class="flex-col items-start gap-2 text-sm">
        <div class="flex gap-2 font-medium leading-none">
          Trending down by 3.1% this month
          <TrendingDown class="size-4" />
        </div>
        <div class="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>

    <!-- 10. Bar Chart - Interactive -->
    <Card class="pt-0">
      <CardHeader class="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div class="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Bar Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <div class="flex">
          <button
            v-for="key in (['desktop', 'mobile'] as const)"
            :key="key"
            class="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
            :class="{ 'bg-muted/50': activeChart === key }"
            @click="activeChart = key"
          >
            <span class="text-xs text-muted-foreground capitalize">{{ key }}</span>
            <span class="text-lg font-bold leading-none sm:text-3xl">
              {{ interactiveTotal[key].toLocaleString() }}
            </span>
          </button>
        </div>
      </CardHeader>
      <CardContent class="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer class="aspect-auto h-[250px] w-full">
          <BarChart :data="interactiveData">
            <CartesianGrid :vertical="false" />
            <XAxis
              data-key="date"
              :tick-line="false"
              :axis-line="false"
              :tick-margin="8"
              :min-tick-gap="32"
              :tick-formatter="(value: string) => {
                const date = new Date(value)
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
              }"
            />
            <Tooltip
              :label-formatter="(value: string) => {
                return new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
              }"
            />
            <Bar
              :data-key="activeChart"
              :fill="activeChart === 'desktop' ? 'var(--chart-1)' : 'var(--chart-2)'"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  </div>
</template>
