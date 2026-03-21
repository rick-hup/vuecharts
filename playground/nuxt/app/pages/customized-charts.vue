<template>
  <div class="container py-10">
    <div class="mb-10 space-y-2">
      <h1 class="text-3xl font-bold tracking-tight">
        Customized Charts
      </h1>
      <p class="text-muted-foreground">
        Render custom SVG elements using chart internal state.
      </p>
    </div>

    <div class="grid flex-1 scroll-mt-20 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
      <CustomizedChartsCustomizedAnnotation />
      <CustomizedChartsCustomizedGraphicalItems />
    </div>
  </div>
</template>
