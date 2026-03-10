<script setup>
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'vccs'

const data = [
  { name: 'Jan', desktop: 400, mobile: 240 },
  { name: 'Feb', desktop: 300, mobile: 139 },
  { name: 'Mar', desktop: 600, mobile: 980 },
  { name: 'Apr', desktop: 800, mobile: 390 },
  { name: 'May', desktop: 500, mobile: 480 },
  { name: 'Jun', desktop: 700, mobile: 380 },
]
</script>

<template>
  <ResponsiveContainer
    width="100%"
    :height="300"
  >
    <AreaChart :data="data">
      <CartesianGrid stroke-dasharray="3 3" />
      <XAxis data-key="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Area
        type="monotone"
        data-key="desktop"
        stroke="#8884d8"
        fill="#8884d8"
        :fill-opacity="0.3"
      />
      <Area
        type="monotone"
        data-key="mobile"
        stroke="#82ca9d"
        fill="#82ca9d"
        :fill-opacity="0.3"
      />
    </AreaChart>
  </ResponsiveContainer>
</template>
