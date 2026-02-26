<script setup lang="ts">
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'vccs'
import ChartContainer from '~/components/docs/ChartContainer.vue'

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 700 },
]
</script>

<template>
  <ChartContainer>
    <LineChart :data="data">
      <CartesianGrid stroke-dasharray="3 3" />
      <XAxis data-key="name" />
      <YAxis />
      <Tooltip />
      <Line
        type="monotone"
        data-key="value"
        stroke="var(--chart-1)"
        :stroke-width="2"
      />
    </LineChart>
  </ChartContainer>
</template>
