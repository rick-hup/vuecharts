<script setup>
import { Cell, Funnel, FunnelChart, ResponsiveContainer, Tooltip } from 'vccs'

const data = [
  { name: 'Leads', value: 800 },
  { name: 'Qualified', value: 540 },
  { name: 'Proposal', value: 320 },
  { name: 'Closed', value: 180 },
]

const COLORS = ['#f97316', '#14b8a6', '#f59e0b', '#06b6d4']
</script>

<template>
  <ResponsiveContainer
    width="100%"
    :height="300"
  >
    <FunnelChart>
      <Tooltip :cursor="false">
        <template #content="{ active, payload, label }">
          <ChartTooltipContent
            :active="active"
            :payload="payload"
            :label="label"
          />
        </template>
      </Tooltip>
      <Funnel
        :data="data"
        data-key="value"
        name-key="name"
        last-shape-type="rectangle"
      >
        <Cell
          v-for="(entry, index) in data"
          :key="index"
          :fill="COLORS[index]"
        />
      </Funnel>
    </FunnelChart>
  </ResponsiveContainer>
</template>
