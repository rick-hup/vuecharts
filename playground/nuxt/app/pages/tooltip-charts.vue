<template>
  <div class="container py-10">
    <div class="mb-8 max-w-lg">
      <h1 class="text-2xl font-bold tracking-tight">
        Tooltip Charts
      </h1>
      <p class="mt-1 text-sm text-muted-foreground">
        Default, line indicator, no indicator, custom label, label formatter, no label, formatter, icons and advanced.
      </p>
    </div>

    <ClientOnly>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <TooltipChartsTooltipDefault />
        <TooltipChartsTooltipLineIndicator />
        <TooltipChartsTooltipNoIndicator />
        <TooltipChartsTooltipCustomLabel />
        <TooltipChartsTooltipLabelFormatter />
        <TooltipChartsTooltipNoLabel />
        <TooltipChartsTooltipFormatter />
        <TooltipChartsTooltipIcons />
        <TooltipChartsTooltipAdvanced />
      </div>
    </ClientOnly>
  </div>
</template>
