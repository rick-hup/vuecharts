<template>
  <div class="mx-auto max-w-4xl space-y-8 p-8">
    <div class="flex items-center gap-4">
      <NuxtLink
        to="/"
        class="text-sm text-muted-foreground hover:text-foreground"
      >
        &larr; Back
      </NuxtLink>
      <h1 class="text-2xl font-bold tracking-tight">
        Bar Charts
      </h1>
    </div>

    <BarChartsBarChartBasic />
    <BarChartsBarChartHorizontal />
    <BarChartsBarChartMultiple />
    <BarChartsBarChartStacked />
    <BarChartsBarChartLabel />
    <BarChartsBarChartCustomLabel />
    <BarChartsBarChartMixed />
    <BarChartsBarChartActive />
    <BarChartsBarChartNegative />
    <BarChartsBarChartInteractive />
  </div>
</template>
