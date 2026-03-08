<template>
  <div class="container py-10">
    <div class="mb-10 space-y-2">
      <h1 class="text-3xl font-bold tracking-tight">
        Line Charts
      </h1>
      <p class="text-muted-foreground">
        10 line chart variants from basic to fully interactive.
      </p>
    </div>

    <div class="grid flex-1 scroll-mt-20 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div class="md:col-span-2 lg:col-span-3">
        <LineChartsLineChartInteractive />
      </div>
      <LineChartsLineChartDefault />
      <LineChartsLineChartLinear />
      <LineChartsLineChartStep />
      <LineChartsLineChartMultiple />
      <LineChartsLineChartDots />
      <LineChartsLineChartDotsColors />
      <LineChartsLineChartLabel />
      <LineChartsLineChartCustomLabel />
      <LineChartsLineChartLegend />
    </div>
  </div>
</template>
