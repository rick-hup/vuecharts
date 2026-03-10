<script setup>
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'vccs'

const data = [
  { name: 'Jan', desktop: 186 },
  { name: 'Feb', desktop: 305 },
  { name: 'Mar', desktop: 237 },
  { name: 'Apr', desktop: 73 },
  { name: 'May', desktop: 209 },
  { name: 'Jun', desktop: 214 },
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
    </LineChart>
  </ResponsiveContainer>
</template>
