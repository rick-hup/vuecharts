<template>
  <div class="container py-10">
    <div class="mb-8 max-w-lg">
      <h1 class="text-2xl font-bold tracking-tight">
        Radial Charts
      </h1>
      <p class="mt-1 text-sm text-muted-foreground">
        Simple, grid, label, shape, stacked, text and more.
      </p>
    </div>

    <ClientOnly>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <RadialChartsRadialChartSimple />
        <RadialChartsRadialChartGrid />
        <RadialChartsRadialChartLabel />
        <RadialChartsRadialChartShape />
        <RadialChartsRadialChartStacked />
        <RadialChartsRadialChartText />
      </div>
    </ClientOnly>
  </div>
</template>
