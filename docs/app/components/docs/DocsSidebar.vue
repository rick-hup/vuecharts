<script setup lang="ts">
import { BarChart3 } from 'lucide-vue-next'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '~/components/ui/sidebar'
import { sidebarOptions } from '~/constants/sidebar-options'
import { useLocale } from '~/composables/useLocale'

const { t } = useLocale()
const route = useRoute()
</script>

<template>
  <Sidebar>
    <SidebarHeader>
      <NuxtLink
        to="/"
        class="flex items-center gap-2 px-2 py-2"
      >
        <BarChart3 class="size-5 text-primary" />
        <span class="text-lg font-semibold">vccs</span>
      </NuxtLink>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup
        v-for="group in sidebarOptions"
        :key="group.label.en"
      >
        <SidebarGroupLabel>{{ t(group.label) }}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem
              v-for="item in group.items"
              :key="item.url"
            >
              <SidebarMenuButton
                as-child
                :is-active="route.path === item.url"
              >
                <NuxtLink :to="item.url">
                  {{ t(item.title) }}
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>
