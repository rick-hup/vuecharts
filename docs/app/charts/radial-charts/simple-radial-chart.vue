<script setup>
import { RadialBar, RadialBarChart, ResponsiveContainer, Tooltip } from 'vccs'

const data = [
  { name: 'Chrome', visitors: 275, fill: '#6366f1' },
  { name: 'Safari', visitors: 200, fill: '#f472b6' },
  { name: 'Firefox', visitors: 187, fill: '#fbbf24' },
  { name: 'Edge', visitors: 173, fill: '#34d399' },
]
</script>

<template>
  <ResponsiveContainer
    width="100%"
    :height="300"
  >
    <RadialBarChart
      :data="data"
      :inner-radius="30"
      :outer-radius="120"
    >
      <RadialBar
        data-key="visitors"
        :background="true"
      />
      <Tooltip />
    </RadialBarChart>
  </ResponsiveContainer>
</template>
