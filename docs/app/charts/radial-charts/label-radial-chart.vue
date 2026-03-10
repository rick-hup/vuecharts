<script setup>
import { LabelList, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip } from 'vccs'

const data = [
  { name: 'Chrome', visitors: 275, fill: '#0088FE' },
  { name: 'Safari', visitors: 200, fill: '#00C49F' },
  { name: 'Firefox', visitors: 187, fill: '#FFBB28' },
  { name: 'Edge', visitors: 173, fill: '#FF8042' },
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
      :start-angle="-90"
      :end-angle="380"
    >
      <RadialBar
        data-key="visitors"
        :background="true"
      >
        <LabelList
          position="insideStart"
          data-key="name"
          class="fill-white capitalize mix-blend-luminosity"
          :font-size="11"
        />
      </RadialBar>
      <Tooltip />
    </RadialBarChart>
  </ResponsiveContainer>
</template>
