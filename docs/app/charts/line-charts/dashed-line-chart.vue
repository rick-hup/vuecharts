<script setup lang="ts">
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'vccs'
import ChartContainer from '~/components/docs/ChartContainer.vue'

const data = [
  { name: 'Jan', desktop: 186, mobile: 80 },
  { name: 'Feb', desktop: 305, mobile: 200 },
  { name: 'Mar', desktop: 237, mobile: 120 },
  { name: 'Apr', desktop: 73, mobile: 190 },
  { name: 'May', desktop: 209, mobile: 130 },
  { name: 'Jun', desktop: 214, mobile: 140 },
]
</script>

<template>
  <ChartContainer>
    <LineChart :data="data">
      <CartesianGrid stroke-dasharray="3 3" />
      <XAxis data-key="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        data-key="desktop"
        stroke="var(--chart-1)"
        :stroke-width="2"
      />
      <Line
        type="monotone"
        data-key="mobile"
        stroke="var(--chart-2)"
        :stroke-width="2"
        stroke-dasharray="5 5"
      />
    </LineChart>
  </ChartContainer>
</template>
