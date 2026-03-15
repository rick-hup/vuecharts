<script setup lang="ts">
</script>

<template>
  <div class="container py-10">
    <div class="mb-10 max-w-lg">
      <h1 class="text-2xl font-bold tracking-tight">
        Funnel Charts
      </h1>
      <p class="mt-1 text-sm text-muted-foreground">
        Conversion funnel visualizations with trapezoid shapes.
      </p>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <FunnelChartsFunnelChartSimple />
      <FunnelChartsFunnelChartLabel />
      <FunnelChartsFunnelChartCustomColors />
      <FunnelChartsFunnelChartRectangle />
      <FunnelChartsFunnelChartReversed />
      <FunnelChartsFunnelChartLegend />
    </div>
  </div>
</template>
