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

const route = useRoute()
const { collectionName } = useLocale()

const { data: navigation } = await useAsyncData(
  `nav-${collectionName.value}`,
  () => queryCollectionNavigation(collectionName.value),
  { watch: [collectionName] },
)
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
      <template v-if="navigation">
        <SidebarGroup
          v-for="group in navigation"
          :key="group.path"
        >
          <SidebarGroupLabel>{{ group.title }}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <template
                v-for="item in group.children"
                :key="item.path"
              >
                <!-- Group with children -->
                <SidebarGroup v-if="item.children?.length">
                  <SidebarGroupLabel class="text-xs">
                    {{ item.title }}
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem
                        v-for="child in item.children"
                        :key="child.path"
                      >
                        <SidebarMenuButton
                          as-child
                          :is-active="route.path === child.path"
                        >
                          <NuxtLink :to="child.path">
                            {{ child.title }}
                          </NuxtLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
                <!-- Leaf item -->
                <SidebarMenuItem v-else>
                  <SidebarMenuButton
                    as-child
                    :is-active="route.path === item.path"
                  >
                    <NuxtLink :to="item.path">
                      {{ item.title }}
                    </NuxtLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </template>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </template>
    </SidebarContent>
  </Sidebar>
</template>
