<script setup>
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'vccs'

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
  <ResponsiveContainer
    width="100%"
    :height="300"
  >
    <LineChart :data="data">
      <CartesianGrid stroke-dasharray="3 3" />
      <XAxis data-key="name" />
      <YAxis />
      <Tooltip />
      <Line
        type="monotone"
        data-key="desktop"
        stroke="#8884d8"
      />
      <Line
        type="monotone"
        data-key="mobile"
        stroke="#82ca9d"
      />
    </LineChart>
  </ResponsiveContainer>
</template>
