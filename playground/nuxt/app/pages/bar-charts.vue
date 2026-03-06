<template>
  <div class="container pb-6">
    <div class="grid flex-1 scroll-mt-20 items-stretch gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10">
      <div class="md:col-span-2 lg:col-span-3">
        <BarChartsBarChartInteractive />
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
    </div>
  </div>
</template>
