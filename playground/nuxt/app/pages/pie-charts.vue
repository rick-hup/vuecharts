<script setup lang="ts">
</script>

<template>
  <div class="container py-10">
    <div class="mb-10 max-w-lg">
      <h1 class="text-2xl font-bold tracking-tight">
        Pie Charts
      </h1>
      <p class="mt-1 text-sm text-muted-foreground">
        10 pie chart variants from basic to fully interactive.
      </p>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div class="md:col-span-2 lg:col-span-3">
        <PieChartsPieChartInteractive />
      </div>
      <PieChartsPieChartSimple />
      <PieChartsPieChartSeparatorNone />
      <PieChartsPieChartLabel />
      <PieChartsPieChartCustomLabel />
      <PieChartsPieChartLegend />
      <PieChartsPieChartDonut />
      <PieChartsPieChartDonutActive />
      <PieChartsPieChartDonutText />
      <PieChartsPieChartStacked />
    </div>
  </div>
</template>
