<template>
  <div class="container py-10">
    <div class="mb-8 max-w-lg">
      <h1 class="text-2xl font-bold tracking-tight">
        Radar Charts
      </h1>
      <p class="mt-1 text-sm text-muted-foreground">
        Default, dots, multiple, lines-only, grid variations, legend, radius axis and more.
      </p>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <RadarChartsRadarChartDefault />
      <RadarChartsRadarChartDots />
      <RadarChartsRadarChartMultiple />
      <RadarChartsRadarChartLinesOnly />
      <RadarChartsRadarChartGridCircle />
      <RadarChartsRadarChartGridCircleFill />
      <RadarChartsRadarChartGridFill />
      <RadarChartsRadarChartGridNone />
      <RadarChartsRadarChartCustomLabel />
      <RadarChartsRadarChartLegend />
      <RadarChartsRadarChartRadius />
    </div>
  </div>
</template>
