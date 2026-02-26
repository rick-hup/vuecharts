
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>
type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = (T & DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }>)
interface _GlobalComponents {
      'DocsChartContainer': typeof import("../app/components/docs/ChartContainer.vue")['default']
    'DocsChartDisplay': typeof import("../app/components/docs/ChartDisplay.vue")['default']
    'DocsChartSection': typeof import("../app/components/docs/ChartSection.vue")['default']
    'DocsHeader': typeof import("../app/components/docs/DocsHeader.vue")['default']
    'DocsSidebar': typeof import("../app/components/docs/DocsSidebar.vue")['default']
    'DocsLanguageToggle': typeof import("../app/components/docs/LanguageToggle.vue")['default']
    'DocsThemeToggle': typeof import("../app/components/docs/ThemeToggle.vue")['default']
    'NuxtWelcome': typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
    'ClientOnly': typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtTime': typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
    'NuxtRouteAnnouncer': typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
    'NuxtPicture': typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
    'Badge': typeof import("../app/components/ui/badge/index")['Badge']
    'Breadcrumb': typeof import("../app/components/ui/breadcrumb/index")['Breadcrumb']
    'BreadcrumbEllipsis': typeof import("../app/components/ui/breadcrumb/index")['BreadcrumbEllipsis']
    'BreadcrumbItem': typeof import("../app/components/ui/breadcrumb/index")['BreadcrumbItem']
    'BreadcrumbLink': typeof import("../app/components/ui/breadcrumb/index")['BreadcrumbLink']
    'BreadcrumbList': typeof import("../app/components/ui/breadcrumb/index")['BreadcrumbList']
    'BreadcrumbPage': typeof import("../app/components/ui/breadcrumb/index")['BreadcrumbPage']
    'BreadcrumbSeparator': typeof import("../app/components/ui/breadcrumb/index")['BreadcrumbSeparator']
    'Button': typeof import("../app/components/ui/button/index")['Button']
    'ScrollArea': typeof import("../app/components/ui/scroll-area/index")['ScrollArea']
    'ScrollBar': typeof import("../app/components/ui/scroll-area/index")['ScrollBar']
    'Separator': typeof import("../app/components/ui/separator/index")['Separator']
    'Input': typeof import("../app/components/ui/input/index")['Input']
    'Card': typeof import("../app/components/ui/card/index")['Card']
    'CardAction': typeof import("../app/components/ui/card/index")['CardAction']
    'CardContent': typeof import("../app/components/ui/card/index")['CardContent']
    'CardDescription': typeof import("../app/components/ui/card/index")['CardDescription']
    'CardFooter': typeof import("../app/components/ui/card/index")['CardFooter']
    'CardHeader': typeof import("../app/components/ui/card/index")['CardHeader']
    'CardTitle': typeof import("../app/components/ui/card/index")['CardTitle']
    'Skeleton': typeof import("../app/components/ui/skeleton/index")['Skeleton']
    'Sheet': typeof import("../app/components/ui/sheet/index")['Sheet']
    'SheetClose': typeof import("../app/components/ui/sheet/index")['SheetClose']
    'SheetContent': typeof import("../app/components/ui/sheet/index")['SheetContent']
    'SheetDescription': typeof import("../app/components/ui/sheet/index")['SheetDescription']
    'SheetFooter': typeof import("../app/components/ui/sheet/index")['SheetFooter']
    'SheetHeader': typeof import("../app/components/ui/sheet/index")['SheetHeader']
    'SheetTitle': typeof import("../app/components/ui/sheet/index")['SheetTitle']
    'SheetTrigger': typeof import("../app/components/ui/sheet/index")['SheetTrigger']
    'Tabs': typeof import("../app/components/ui/tabs/index")['Tabs']
    'TabsContent': typeof import("../app/components/ui/tabs/index")['TabsContent']
    'TabsList': typeof import("../app/components/ui/tabs/index")['TabsList']
    'TabsTrigger': typeof import("../app/components/ui/tabs/index")['TabsTrigger']
    'Sidebar': typeof import("../app/components/ui/sidebar/index")['Sidebar']
    'SidebarContent': typeof import("../app/components/ui/sidebar/index")['SidebarContent']
    'SidebarFooter': typeof import("../app/components/ui/sidebar/index")['SidebarFooter']
    'SidebarGroup': typeof import("../app/components/ui/sidebar/index")['SidebarGroup']
    'SidebarGroupAction': typeof import("../app/components/ui/sidebar/index")['SidebarGroupAction']
    'SidebarGroupContent': typeof import("../app/components/ui/sidebar/index")['SidebarGroupContent']
    'SidebarGroupLabel': typeof import("../app/components/ui/sidebar/index")['SidebarGroupLabel']
    'SidebarHeader': typeof import("../app/components/ui/sidebar/index")['SidebarHeader']
    'SidebarInput': typeof import("../app/components/ui/sidebar/index")['SidebarInput']
    'SidebarInset': typeof import("../app/components/ui/sidebar/index")['SidebarInset']
    'SidebarMenu': typeof import("../app/components/ui/sidebar/index")['SidebarMenu']
    'SidebarMenuAction': typeof import("../app/components/ui/sidebar/index")['SidebarMenuAction']
    'SidebarMenuBadge': typeof import("../app/components/ui/sidebar/index")['SidebarMenuBadge']
    'SidebarMenuButton': typeof import("../app/components/ui/sidebar/index")['SidebarMenuButton']
    'SidebarMenuItem': typeof import("../app/components/ui/sidebar/index")['SidebarMenuItem']
    'SidebarMenuSkeleton': typeof import("../app/components/ui/sidebar/index")['SidebarMenuSkeleton']
    'SidebarMenuSub': typeof import("../app/components/ui/sidebar/index")['SidebarMenuSub']
    'SidebarMenuSubButton': typeof import("../app/components/ui/sidebar/index")['SidebarMenuSubButton']
    'SidebarMenuSubItem': typeof import("../app/components/ui/sidebar/index")['SidebarMenuSubItem']
    'SidebarProvider': typeof import("../app/components/ui/sidebar/index")['SidebarProvider']
    'SidebarRail': typeof import("../app/components/ui/sidebar/index")['SidebarRail']
    'SidebarSeparator': typeof import("../app/components/ui/sidebar/index")['SidebarSeparator']
    'SidebarTrigger': typeof import("../app/components/ui/sidebar/index")['SidebarTrigger']
    'Tooltip': typeof import("../app/components/ui/tooltip/index")['Tooltip']
    'TooltipContent': typeof import("../app/components/ui/tooltip/index")['TooltipContent']
    'TooltipProvider': typeof import("../app/components/ui/tooltip/index")['TooltipProvider']
    'TooltipTrigger': typeof import("../app/components/ui/tooltip/index")['TooltipTrigger']
    'NuxtPage': typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/pages/runtime/page")['default']
    'NoScript': typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/server-placeholder")['default']
      'LazyDocsChartContainer': LazyComponent<typeof import("../app/components/docs/ChartContainer.vue")['default']>
    'LazyDocsChartDisplay': LazyComponent<typeof import("../app/components/docs/ChartDisplay.vue")['default']>
    'LazyDocsChartSection': LazyComponent<typeof import("../app/components/docs/ChartSection.vue")['default']>
    'LazyDocsHeader': LazyComponent<typeof import("../app/components/docs/DocsHeader.vue")['default']>
    'LazyDocsSidebar': LazyComponent<typeof import("../app/components/docs/DocsSidebar.vue")['default']>
    'LazyDocsLanguageToggle': LazyComponent<typeof import("../app/components/docs/LanguageToggle.vue")['default']>
    'LazyDocsThemeToggle': LazyComponent<typeof import("../app/components/docs/ThemeToggle.vue")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtTime': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
    'LazyNuxtPicture': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
    'LazyBadge': LazyComponent<typeof import("../app/components/ui/badge/index")['Badge']>
    'LazyBreadcrumb': LazyComponent<typeof import("../app/components/ui/breadcrumb/index")['Breadcrumb']>
    'LazyBreadcrumbEllipsis': LazyComponent<typeof import("../app/components/ui/breadcrumb/index")['BreadcrumbEllipsis']>
    'LazyBreadcrumbItem': LazyComponent<typeof import("../app/components/ui/breadcrumb/index")['BreadcrumbItem']>
    'LazyBreadcrumbLink': LazyComponent<typeof import("../app/components/ui/breadcrumb/index")['BreadcrumbLink']>
    'LazyBreadcrumbList': LazyComponent<typeof import("../app/components/ui/breadcrumb/index")['BreadcrumbList']>
    'LazyBreadcrumbPage': LazyComponent<typeof import("../app/components/ui/breadcrumb/index")['BreadcrumbPage']>
    'LazyBreadcrumbSeparator': LazyComponent<typeof import("../app/components/ui/breadcrumb/index")['BreadcrumbSeparator']>
    'LazyButton': LazyComponent<typeof import("../app/components/ui/button/index")['Button']>
    'LazyScrollArea': LazyComponent<typeof import("../app/components/ui/scroll-area/index")['ScrollArea']>
    'LazyScrollBar': LazyComponent<typeof import("../app/components/ui/scroll-area/index")['ScrollBar']>
    'LazySeparator': LazyComponent<typeof import("../app/components/ui/separator/index")['Separator']>
    'LazyInput': LazyComponent<typeof import("../app/components/ui/input/index")['Input']>
    'LazyCard': LazyComponent<typeof import("../app/components/ui/card/index")['Card']>
    'LazyCardAction': LazyComponent<typeof import("../app/components/ui/card/index")['CardAction']>
    'LazyCardContent': LazyComponent<typeof import("../app/components/ui/card/index")['CardContent']>
    'LazyCardDescription': LazyComponent<typeof import("../app/components/ui/card/index")['CardDescription']>
    'LazyCardFooter': LazyComponent<typeof import("../app/components/ui/card/index")['CardFooter']>
    'LazyCardHeader': LazyComponent<typeof import("../app/components/ui/card/index")['CardHeader']>
    'LazyCardTitle': LazyComponent<typeof import("../app/components/ui/card/index")['CardTitle']>
    'LazySkeleton': LazyComponent<typeof import("../app/components/ui/skeleton/index")['Skeleton']>
    'LazySheet': LazyComponent<typeof import("../app/components/ui/sheet/index")['Sheet']>
    'LazySheetClose': LazyComponent<typeof import("../app/components/ui/sheet/index")['SheetClose']>
    'LazySheetContent': LazyComponent<typeof import("../app/components/ui/sheet/index")['SheetContent']>
    'LazySheetDescription': LazyComponent<typeof import("../app/components/ui/sheet/index")['SheetDescription']>
    'LazySheetFooter': LazyComponent<typeof import("../app/components/ui/sheet/index")['SheetFooter']>
    'LazySheetHeader': LazyComponent<typeof import("../app/components/ui/sheet/index")['SheetHeader']>
    'LazySheetTitle': LazyComponent<typeof import("../app/components/ui/sheet/index")['SheetTitle']>
    'LazySheetTrigger': LazyComponent<typeof import("../app/components/ui/sheet/index")['SheetTrigger']>
    'LazyTabs': LazyComponent<typeof import("../app/components/ui/tabs/index")['Tabs']>
    'LazyTabsContent': LazyComponent<typeof import("../app/components/ui/tabs/index")['TabsContent']>
    'LazyTabsList': LazyComponent<typeof import("../app/components/ui/tabs/index")['TabsList']>
    'LazyTabsTrigger': LazyComponent<typeof import("../app/components/ui/tabs/index")['TabsTrigger']>
    'LazySidebar': LazyComponent<typeof import("../app/components/ui/sidebar/index")['Sidebar']>
    'LazySidebarContent': LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarContent']>
    'LazySidebarFooter': LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarFooter']>
    'LazySidebarGroup': LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarGroup']>
    'LazySidebarGroupAction': LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarGroupAction']>
    'LazySidebarGroupContent': LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarGroupContent']>
    'LazySidebarGroupLabel': LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarGroupLabel']>
    'LazySidebarHeader': LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarHeader']>
    'LazySidebarInput': LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarInput']>
    'LazySidebarInset': LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarInset']>
    'LazySidebarMenu': LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarMenu']>
    'LazySidebarMenuAction': LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarMenuAction']>
    'LazySidebarMenuBadge': LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarMenuBadge']>
    'LazySidebarMenuButton': LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarMenuButton']>
    'LazySidebarMenuItem': LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarMenuItem']>
    'LazySidebarMenuSkeleton': LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarMenuSkeleton']>
    'LazySidebarMenuSub': LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarMenuSub']>
    'LazySidebarMenuSubButton': LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarMenuSubButton']>
    'LazySidebarMenuSubItem': LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarMenuSubItem']>
    'LazySidebarProvider': LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarProvider']>
    'LazySidebarRail': LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarRail']>
    'LazySidebarSeparator': LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarSeparator']>
    'LazySidebarTrigger': LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarTrigger']>
    'LazyTooltip': LazyComponent<typeof import("../app/components/ui/tooltip/index")['Tooltip']>
    'LazyTooltipContent': LazyComponent<typeof import("../app/components/ui/tooltip/index")['TooltipContent']>
    'LazyTooltipProvider': LazyComponent<typeof import("../app/components/ui/tooltip/index")['TooltipProvider']>
    'LazyTooltipTrigger': LazyComponent<typeof import("../app/components/ui/tooltip/index")['TooltipTrigger']>
    'LazyNuxtPage': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/pages/runtime/page")['default']>
    'LazyNoScript': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/head/runtime/components")['NoScript']>
    'LazyLink': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/head/runtime/components")['Link']>
    'LazyBase': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/head/runtime/components")['Base']>
    'LazyTitle': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/head/runtime/components")['Title']>
    'LazyMeta': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/head/runtime/components")['Meta']>
    'LazyStyle': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/head/runtime/components")['Style']>
    'LazyHead': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/head/runtime/components")['Head']>
    'LazyHtml': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/head/runtime/components")['Html']>
    'LazyBody': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/head/runtime/components")['Body']>
    'LazyNuxtIsland': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/nuxt-island")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export const DocsChartContainer: typeof import("../app/components/docs/ChartContainer.vue")['default']
export const DocsChartDisplay: typeof import("../app/components/docs/ChartDisplay.vue")['default']
export const DocsChartSection: typeof import("../app/components/docs/ChartSection.vue")['default']
export const DocsHeader: typeof import("../app/components/docs/DocsHeader.vue")['default']
export const DocsSidebar: typeof import("../app/components/docs/DocsSidebar.vue")['default']
export const DocsLanguageToggle: typeof import("../app/components/docs/LanguageToggle.vue")['default']
export const DocsThemeToggle: typeof import("../app/components/docs/ThemeToggle.vue")['default']
export const NuxtWelcome: typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const Badge: typeof import("../app/components/ui/badge/index")['Badge']
export const Breadcrumb: typeof import("../app/components/ui/breadcrumb/index")['Breadcrumb']
export const BreadcrumbEllipsis: typeof import("../app/components/ui/breadcrumb/index")['BreadcrumbEllipsis']
export const BreadcrumbItem: typeof import("../app/components/ui/breadcrumb/index")['BreadcrumbItem']
export const BreadcrumbLink: typeof import("../app/components/ui/breadcrumb/index")['BreadcrumbLink']
export const BreadcrumbList: typeof import("../app/components/ui/breadcrumb/index")['BreadcrumbList']
export const BreadcrumbPage: typeof import("../app/components/ui/breadcrumb/index")['BreadcrumbPage']
export const BreadcrumbSeparator: typeof import("../app/components/ui/breadcrumb/index")['BreadcrumbSeparator']
export const Button: typeof import("../app/components/ui/button/index")['Button']
export const ScrollArea: typeof import("../app/components/ui/scroll-area/index")['ScrollArea']
export const ScrollBar: typeof import("../app/components/ui/scroll-area/index")['ScrollBar']
export const Separator: typeof import("../app/components/ui/separator/index")['Separator']
export const Input: typeof import("../app/components/ui/input/index")['Input']
export const Card: typeof import("../app/components/ui/card/index")['Card']
export const CardAction: typeof import("../app/components/ui/card/index")['CardAction']
export const CardContent: typeof import("../app/components/ui/card/index")['CardContent']
export const CardDescription: typeof import("../app/components/ui/card/index")['CardDescription']
export const CardFooter: typeof import("../app/components/ui/card/index")['CardFooter']
export const CardHeader: typeof import("../app/components/ui/card/index")['CardHeader']
export const CardTitle: typeof import("../app/components/ui/card/index")['CardTitle']
export const Skeleton: typeof import("../app/components/ui/skeleton/index")['Skeleton']
export const Sheet: typeof import("../app/components/ui/sheet/index")['Sheet']
export const SheetClose: typeof import("../app/components/ui/sheet/index")['SheetClose']
export const SheetContent: typeof import("../app/components/ui/sheet/index")['SheetContent']
export const SheetDescription: typeof import("../app/components/ui/sheet/index")['SheetDescription']
export const SheetFooter: typeof import("../app/components/ui/sheet/index")['SheetFooter']
export const SheetHeader: typeof import("../app/components/ui/sheet/index")['SheetHeader']
export const SheetTitle: typeof import("../app/components/ui/sheet/index")['SheetTitle']
export const SheetTrigger: typeof import("../app/components/ui/sheet/index")['SheetTrigger']
export const Tabs: typeof import("../app/components/ui/tabs/index")['Tabs']
export const TabsContent: typeof import("../app/components/ui/tabs/index")['TabsContent']
export const TabsList: typeof import("../app/components/ui/tabs/index")['TabsList']
export const TabsTrigger: typeof import("../app/components/ui/tabs/index")['TabsTrigger']
export const Sidebar: typeof import("../app/components/ui/sidebar/index")['Sidebar']
export const SidebarContent: typeof import("../app/components/ui/sidebar/index")['SidebarContent']
export const SidebarFooter: typeof import("../app/components/ui/sidebar/index")['SidebarFooter']
export const SidebarGroup: typeof import("../app/components/ui/sidebar/index")['SidebarGroup']
export const SidebarGroupAction: typeof import("../app/components/ui/sidebar/index")['SidebarGroupAction']
export const SidebarGroupContent: typeof import("../app/components/ui/sidebar/index")['SidebarGroupContent']
export const SidebarGroupLabel: typeof import("../app/components/ui/sidebar/index")['SidebarGroupLabel']
export const SidebarHeader: typeof import("../app/components/ui/sidebar/index")['SidebarHeader']
export const SidebarInput: typeof import("../app/components/ui/sidebar/index")['SidebarInput']
export const SidebarInset: typeof import("../app/components/ui/sidebar/index")['SidebarInset']
export const SidebarMenu: typeof import("../app/components/ui/sidebar/index")['SidebarMenu']
export const SidebarMenuAction: typeof import("../app/components/ui/sidebar/index")['SidebarMenuAction']
export const SidebarMenuBadge: typeof import("../app/components/ui/sidebar/index")['SidebarMenuBadge']
export const SidebarMenuButton: typeof import("../app/components/ui/sidebar/index")['SidebarMenuButton']
export const SidebarMenuItem: typeof import("../app/components/ui/sidebar/index")['SidebarMenuItem']
export const SidebarMenuSkeleton: typeof import("../app/components/ui/sidebar/index")['SidebarMenuSkeleton']
export const SidebarMenuSub: typeof import("../app/components/ui/sidebar/index")['SidebarMenuSub']
export const SidebarMenuSubButton: typeof import("../app/components/ui/sidebar/index")['SidebarMenuSubButton']
export const SidebarMenuSubItem: typeof import("../app/components/ui/sidebar/index")['SidebarMenuSubItem']
export const SidebarProvider: typeof import("../app/components/ui/sidebar/index")['SidebarProvider']
export const SidebarRail: typeof import("../app/components/ui/sidebar/index")['SidebarRail']
export const SidebarSeparator: typeof import("../app/components/ui/sidebar/index")['SidebarSeparator']
export const SidebarTrigger: typeof import("../app/components/ui/sidebar/index")['SidebarTrigger']
export const Tooltip: typeof import("../app/components/ui/tooltip/index")['Tooltip']
export const TooltipContent: typeof import("../app/components/ui/tooltip/index")['TooltipContent']
export const TooltipProvider: typeof import("../app/components/ui/tooltip/index")['TooltipProvider']
export const TooltipTrigger: typeof import("../app/components/ui/tooltip/index")['TooltipTrigger']
export const NuxtPage: typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const NuxtRouteAnnouncer: typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const LazyDocsChartContainer: LazyComponent<typeof import("../app/components/docs/ChartContainer.vue")['default']>
export const LazyDocsChartDisplay: LazyComponent<typeof import("../app/components/docs/ChartDisplay.vue")['default']>
export const LazyDocsChartSection: LazyComponent<typeof import("../app/components/docs/ChartSection.vue")['default']>
export const LazyDocsHeader: LazyComponent<typeof import("../app/components/docs/DocsHeader.vue")['default']>
export const LazyDocsSidebar: LazyComponent<typeof import("../app/components/docs/DocsSidebar.vue")['default']>
export const LazyDocsLanguageToggle: LazyComponent<typeof import("../app/components/docs/LanguageToggle.vue")['default']>
export const LazyDocsThemeToggle: LazyComponent<typeof import("../app/components/docs/ThemeToggle.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyBadge: LazyComponent<typeof import("../app/components/ui/badge/index")['Badge']>
export const LazyBreadcrumb: LazyComponent<typeof import("../app/components/ui/breadcrumb/index")['Breadcrumb']>
export const LazyBreadcrumbEllipsis: LazyComponent<typeof import("../app/components/ui/breadcrumb/index")['BreadcrumbEllipsis']>
export const LazyBreadcrumbItem: LazyComponent<typeof import("../app/components/ui/breadcrumb/index")['BreadcrumbItem']>
export const LazyBreadcrumbLink: LazyComponent<typeof import("../app/components/ui/breadcrumb/index")['BreadcrumbLink']>
export const LazyBreadcrumbList: LazyComponent<typeof import("../app/components/ui/breadcrumb/index")['BreadcrumbList']>
export const LazyBreadcrumbPage: LazyComponent<typeof import("../app/components/ui/breadcrumb/index")['BreadcrumbPage']>
export const LazyBreadcrumbSeparator: LazyComponent<typeof import("../app/components/ui/breadcrumb/index")['BreadcrumbSeparator']>
export const LazyButton: LazyComponent<typeof import("../app/components/ui/button/index")['Button']>
export const LazyScrollArea: LazyComponent<typeof import("../app/components/ui/scroll-area/index")['ScrollArea']>
export const LazyScrollBar: LazyComponent<typeof import("../app/components/ui/scroll-area/index")['ScrollBar']>
export const LazySeparator: LazyComponent<typeof import("../app/components/ui/separator/index")['Separator']>
export const LazyInput: LazyComponent<typeof import("../app/components/ui/input/index")['Input']>
export const LazyCard: LazyComponent<typeof import("../app/components/ui/card/index")['Card']>
export const LazyCardAction: LazyComponent<typeof import("../app/components/ui/card/index")['CardAction']>
export const LazyCardContent: LazyComponent<typeof import("../app/components/ui/card/index")['CardContent']>
export const LazyCardDescription: LazyComponent<typeof import("../app/components/ui/card/index")['CardDescription']>
export const LazyCardFooter: LazyComponent<typeof import("../app/components/ui/card/index")['CardFooter']>
export const LazyCardHeader: LazyComponent<typeof import("../app/components/ui/card/index")['CardHeader']>
export const LazyCardTitle: LazyComponent<typeof import("../app/components/ui/card/index")['CardTitle']>
export const LazySkeleton: LazyComponent<typeof import("../app/components/ui/skeleton/index")['Skeleton']>
export const LazySheet: LazyComponent<typeof import("../app/components/ui/sheet/index")['Sheet']>
export const LazySheetClose: LazyComponent<typeof import("../app/components/ui/sheet/index")['SheetClose']>
export const LazySheetContent: LazyComponent<typeof import("../app/components/ui/sheet/index")['SheetContent']>
export const LazySheetDescription: LazyComponent<typeof import("../app/components/ui/sheet/index")['SheetDescription']>
export const LazySheetFooter: LazyComponent<typeof import("../app/components/ui/sheet/index")['SheetFooter']>
export const LazySheetHeader: LazyComponent<typeof import("../app/components/ui/sheet/index")['SheetHeader']>
export const LazySheetTitle: LazyComponent<typeof import("../app/components/ui/sheet/index")['SheetTitle']>
export const LazySheetTrigger: LazyComponent<typeof import("../app/components/ui/sheet/index")['SheetTrigger']>
export const LazyTabs: LazyComponent<typeof import("../app/components/ui/tabs/index")['Tabs']>
export const LazyTabsContent: LazyComponent<typeof import("../app/components/ui/tabs/index")['TabsContent']>
export const LazyTabsList: LazyComponent<typeof import("../app/components/ui/tabs/index")['TabsList']>
export const LazyTabsTrigger: LazyComponent<typeof import("../app/components/ui/tabs/index")['TabsTrigger']>
export const LazySidebar: LazyComponent<typeof import("../app/components/ui/sidebar/index")['Sidebar']>
export const LazySidebarContent: LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarContent']>
export const LazySidebarFooter: LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarFooter']>
export const LazySidebarGroup: LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarGroup']>
export const LazySidebarGroupAction: LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarGroupAction']>
export const LazySidebarGroupContent: LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarGroupContent']>
export const LazySidebarGroupLabel: LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarGroupLabel']>
export const LazySidebarHeader: LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarHeader']>
export const LazySidebarInput: LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarInput']>
export const LazySidebarInset: LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarInset']>
export const LazySidebarMenu: LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarMenu']>
export const LazySidebarMenuAction: LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarMenuAction']>
export const LazySidebarMenuBadge: LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarMenuBadge']>
export const LazySidebarMenuButton: LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarMenuButton']>
export const LazySidebarMenuItem: LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarMenuItem']>
export const LazySidebarMenuSkeleton: LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarMenuSkeleton']>
export const LazySidebarMenuSub: LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarMenuSub']>
export const LazySidebarMenuSubButton: LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarMenuSubButton']>
export const LazySidebarMenuSubItem: LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarMenuSubItem']>
export const LazySidebarProvider: LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarProvider']>
export const LazySidebarRail: LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarRail']>
export const LazySidebarSeparator: LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarSeparator']>
export const LazySidebarTrigger: LazyComponent<typeof import("../app/components/ui/sidebar/index")['SidebarTrigger']>
export const LazyTooltip: LazyComponent<typeof import("../app/components/ui/tooltip/index")['Tooltip']>
export const LazyTooltipContent: LazyComponent<typeof import("../app/components/ui/tooltip/index")['TooltipContent']>
export const LazyTooltipProvider: LazyComponent<typeof import("../app/components/ui/tooltip/index")['TooltipProvider']>
export const LazyTooltipTrigger: LazyComponent<typeof import("../app/components/ui/tooltip/index")['TooltipTrigger']>
export const LazyNuxtPage: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/nuxt-island")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.18.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@22.13.14_@vue+compiler-sfc_oafa2kvtzgwgimaizbi6qssnse/node_modules/nuxt/dist/app/components/server-placeholder")['default']>

export const componentNames: string[]
