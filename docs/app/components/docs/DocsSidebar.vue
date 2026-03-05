<script setup lang="ts">
import type { Component } from 'vue'
import {
  AreaChart,
  BarChart3,
  BarChart as BarChartIcon,
  BookOpen,
  Package,
  Rocket,
} from 'lucide-vue-next'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '~/components/ui/sidebar'

const iconMap: Record<string, Component> = {
  'rocket': Rocket,
  'bar-chart': BarChartIcon,
  'book-open': BookOpen,
  'package': Package,
  'area-chart': AreaChart,
  'bar-chart-3': BarChart3,
}

const route = useRoute()
const { collectionName } = useLocale()
const { isMobile, setOpenMobile } = useSidebar()

const { data: navigation } = await useAsyncData(
  `nav-${collectionName}`,
  () => queryCollectionNavigation(collectionName, ['icon']),
)

function filterDirEntries(items: any[]): any[] {
  return items.filter(item => !item.path?.endsWith('/_dir'))
}

// Get icon for a group: check group itself first, then _dir child entry
function getGroupIcon(group: any): string | undefined {
  if (group.icon)
    return group.icon
  const dirEntry = group.children?.find((c: any) => c.path?.endsWith('/_dir'))
  return dirEntry?.icon
}

// queryCollectionNavigation wraps everything in a root "Docs" node;
// unwrap to get the actual groups (Getting Started, Charts, etc.)
const groups = computed(() => {
  if (!navigation.value)
    return []
  const root = navigation.value[0]
  if (root?.children?.length) {
    return root.children
  }
  return navigation.value
})

function handleLinkClick() {
  if (isMobile.value) {
    setOpenMobile(false)
  }
}
</script>

<template>
  <Sidebar class="z-50">
    <!-- Sidebar Header with logo -->
    <SidebarHeader class="border-b border-dashed h-14 justify-center px-2">
      <NuxtLink
        to="/"
        class="flex items-center gap-2 px-2"
      >
        <span class="doto text-2xl font-black tracking-tighter">
          vccs
          <span class="text-xs jetbrains text-muted-foreground/60 font-light ml-1.5">v0.1</span>
        </span>
      </NuxtLink>
    </SidebarHeader>

    <SidebarContent class="mt-2">
      <SidebarGroup
        v-for="group in groups"
        :key="group.path"
      >
        <SidebarGroupLabel class="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
          <component
            :is="iconMap[getGroupIcon(group)]"
            v-if="getGroupIcon(group) && iconMap[getGroupIcon(group)]"
            class="size-3.5"
          />
          {{ group.title }}
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem
              v-for="item in filterDirEntries(group.children || [])"
              :key="item.path"
            >
              <SidebarMenuButton
                as-child
                :is-active="route.path === item.path"
                class="border border-transparent"
                :class="[
                  route.path === item.path && 'shadow-[inset_0px_0px_0px_1px_#fff] dark:shadow-[inset_0px_0px_0px_1px_#000] border',
                ]"
              >
                <NuxtLink
                  :to="item.path"
                  class="flex items-center gap-2"
                  @click="handleLinkClick"
                >
                  <component
                    :is="iconMap[item.icon]"
                    v-if="item.icon && iconMap[item.icon]"
                    class="size-4 shrink-0"
                  />
                  {{ item.title }}
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter>
      <SidebarMenuButton
        variant="outline"
        class="border border-dashed flex justify-center text-xs"
        as-child
      >
        <a
          href="https://github.com/nicepkg/vccs/issues/new?labels=chart-request&template=chart_request.md"
          target="_blank"
          rel="noopener"
          @click="handleLinkClick"
        >
          + Request Chart
        </a>
      </SidebarMenuButton>
    </SidebarFooter>
  </Sidebar>
</template>
