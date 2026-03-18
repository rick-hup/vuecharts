<template>
  <div class="container py-10">
    <div class="mb-10 space-y-2">
      <h1 class="text-3xl font-bold tracking-tight">
        Reference Dot Charts
      </h1>
      <p class="text-muted-foreground">
        Annotate specific data points with ReferenceDot.
      </p>
    </div>

    <div class="grid flex-1 scroll-mt-20 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
      <ReferenceDotChartsReferenceDotBasic />
      <ReferenceDotChartsReferenceDotMultiple />
      <ReferenceDotChartsReferenceDotWithReferenceLine />
    </div>
  </div>
</template>
