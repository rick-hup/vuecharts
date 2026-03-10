<script setup>
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'vccs'

const data = [
  { subject: 'Math', A: 120 },
  { subject: 'Chinese', A: 98 },
  { subject: 'English', A: 86 },
  { subject: 'Geography', A: 99 },
  { subject: 'Physics', A: 85 },
  { subject: 'History', A: 65 },
]
</script>

<template>
  <ResponsiveContainer
    width="100%"
    :height="300"
  >
    <RadarChart
      :data="data"
      cx="50%"
      cy="50%"
      :outer-radius="100"
    >
      <PolarGrid />
      <PolarAngleAxis data-key="subject" />
      <Tooltip />
      <Radar
        data-key="A"
        stroke="#8884d8"
        fill="#8884d8"
        :fill-opacity="0.6"
        :dot="{ r: 4, fillOpacity: 1 }"
      />
    </RadarChart>
  </ResponsiveContainer>
</template>
