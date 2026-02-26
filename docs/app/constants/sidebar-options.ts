export interface SidebarItem {
  title: { zh: string, en: string }
  url: string
}

export interface SidebarGroup {
  label: { zh: string, en: string }
  items: SidebarItem[]
}

export const sidebarOptions: SidebarGroup[] = [
  {
    label: { zh: '开始', en: 'Getting Started' },
    items: [
      { title: { zh: '介绍', en: 'Introduction' }, url: '/docs' },
      { title: { zh: '快速开始', en: 'Getting Started' }, url: '/docs/getting-started' },
    ],
  },
  {
    label: { zh: '图表', en: 'Charts' },
    items: [
      { title: { zh: '柱状图', en: 'Bar Chart' }, url: '/docs/bar-charts' },
      { title: { zh: '面积图', en: 'Area Chart' }, url: '/docs/area-charts' },
      { title: { zh: '折线图', en: 'Line Chart' }, url: '/docs/line-charts' },
    ],
  },
]
