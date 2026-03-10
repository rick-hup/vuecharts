<script setup>
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'vccs'

const data = [
  { subject: 'Math', A: 120, B: 110 },
  { subject: 'Chinese', A: 98, B: 130 },
  { subject: 'English', A: 86, B: 130 },
  { subject: 'Geography', A: 99, B: 100 },
  { subject: 'Physics', A: 85, B: 90 },
  { subject: 'History', A: 65, B: 85 },
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
      />
      <Radar
        data-key="B"
        stroke="#82ca9d"
        fill="#82ca9d"
        :fill-opacity="0.6"
      />
    </RadarChart>
  </ResponsiveContainer>
</template>
