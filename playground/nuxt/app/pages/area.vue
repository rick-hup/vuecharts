<template>
  <div class="container py-10">
    <div class="mb-10 space-y-2">
      <h1 class="text-3xl font-bold tracking-tight">
        Area Charts
      </h1>
      <p class="text-muted-foreground">
        10 area chart variants from basic to fully interactive.
      </p>
    </div>

    <div class="grid flex-1 scroll-mt-20 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div class="md:col-span-2 lg:col-span-3">
        <AreaChartsAreaChartInteractive />
      </div>
      <AreaChartsAreaChartDefault />
      <AreaChartsAreaChartLinear />
      <AreaChartsAreaChartStep />
      <AreaChartsAreaChartStacked />
      <AreaChartsAreaChartStackedExpand />
      <AreaChartsAreaChartLegend />
      <AreaChartsAreaChartIcons />
      <AreaChartsAreaChartGradient />
      <AreaChartsAreaChartAxes />
    </div>
  </div>
</template>
