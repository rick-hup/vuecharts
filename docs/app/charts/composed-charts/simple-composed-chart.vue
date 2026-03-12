<script setup>
import { Area, Bar, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'vccs'

const data = [
  { name: 'Page A', uv: 590, pv: 800, amt: 1400 },
  { name: 'Page B', uv: 868, pv: 967, amt: 1506 },
  { name: 'Page C', uv: 1397, pv: 1098, amt: 989 },
  { name: 'Page D', uv: 1480, pv: 1200, amt: 1228 },
  { name: 'Page E', uv: 1520, pv: 1108, amt: 1100 },
  { name: 'Page F', uv: 1400, pv: 680, amt: 1700 },
]
</script>

<template>
  <ResponsiveContainer
    width="100%"
    :height="300"
  >
    <ComposedChart :data="data">
      <CartesianGrid stroke-dasharray="3 3" />
      <XAxis data-key="name" />
      <YAxis />
      <Tooltip />
      <Area
        data-key="amt"
        fill="#8884d8"
        stroke="#8884d8"
        :fill-opacity="0.3"
      />
      <Bar
        data-key="pv"
        fill="#82ca9d"
        :bar-size="20"
      />
      <Line
        data-key="uv"
        stroke="#ff7300"
      />
    </ComposedChart>
  </ResponsiveContainer>
</template>
