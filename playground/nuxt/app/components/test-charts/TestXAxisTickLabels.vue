<script setup lang="ts">
import { Line, LineChart, XAxis } from 'vccs'

const data = [
  { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 300, pv: 4567, amt: 2400 },
  { name: 'Page C', uv: 300, pv: 1398, amt: 2400 },
  { name: 'Page D', uv: 200, pv: 9800, amt: 2400 },
  { name: 'Page E', uv: 278, pv: 3908, amt: 2400 },
  { name: 'Page F', uv: 189, pv: 4800, amt: 2400 },
]
</script>

<template>
  <div class="rounded-lg border p-6">
    <h3 class="mb-4 text-lg font-semibold">
      XAxis Tick Labels in LineChart
    </h3>
    <p class="text-muted-foreground mb-4 text-sm">
      Expected: 6 ticks — Page A, Page B, Page C, Page D, Page E, Page F
    </p>
    <LineChart
      :width="500"
      :height="300"
      :data="data"
    >
      <Line
        type="monotone"
        data-key="uv"
        stroke="#ff7300"
        :is-animation-active="false"
      />
      <XAxis data-key="name" />
    </LineChart>
  </div>
</template>
