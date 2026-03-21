import { computed, defineComponent, type PropType, ref, type SlotsType } from 'vue'
import { Layer } from '@/container/Layer'
import Surface from '@/container/Surface'
import { computeTreemapLayout, type TreemapLayoutNode } from './treemapUtils'

const DEFAULT_COLORS = [
  '#8889DD', '#9597E4', '#8DC77B', '#A5D297',
  '#E2CF45', '#F8C12D', '#F89C24', '#F56E1A',
]

export interface TreemapContentSlotProps extends TreemapLayoutNode {
  index: number
  fill: string
  stroke: string
}

export interface TreemapSlots {
  content?: (props: TreemapContentSlotProps) => any
}

interface BreadcrumbEntry {
  name: string
  data: Record<string, any>[]
}

/**
 * Recursively sum all descendant values for a given dataKey.
 */
function sumValues(item: Record<string, any>, dataKey: string): number {
  if (item.children && item.children.length > 0) {
    return item.children.reduce((sum: number, child: Record<string, any>) => sum + sumValues(child, dataKey), 0)
  }
  const val = item[dataKey]
  return typeof val === 'number' && val > 0 ? val : 0
}

export const TreemapVueProps = {
  data: { type: Array as PropType<Record<string, any>[]>, required: true as const },
  dataKey: { type: String, default: 'value' },
  nameKey: { type: String, default: 'name' },
  width: { type: Number, required: true as const },
  height: { type: Number, required: true as const },
  aspectRatio: { type: Number, default: 4 / 3 },
  fill: { type: String, default: '#808080' },
  stroke: { type: String, default: '#fff' },
  type: { type: String as PropType<'flat' | 'nest'>, default: 'flat' },
  colorPanel: { type: Array as PropType<string[]>, default: undefined },
  isAnimationActive: { type: Boolean, default: true },
  animationDuration: { type: Number, default: 1500 },
  animationEasing: { type: String, default: 'linear' },
  onClick: { type: Function as PropType<(node: any, index: number, e: MouseEvent) => void>, default: undefined },
  onMouseEnter: { type: Function as PropType<(node: any, index: number, e: MouseEvent) => void>, default: undefined },
  onMouseLeave: { type: Function as PropType<(node: any, index: number, e: MouseEvent) => void>, default: undefined },
}

export const Treemap = defineComponent({
  name: 'Treemap',
  props: TreemapVueProps,
  slots: Object as SlotsType<TreemapSlots>,
  setup(props, { slots }) {
    const colors = computed(() => props.colorPanel ?? DEFAULT_COLORS)

    // Nest mode state
    const breadcrumbTrail = ref<BreadcrumbEntry[]>([])
    const currentData = ref<Record<string, any>[] | null>(null)

    const isNestMode = computed(() => props.type === 'nest')

    const nestCurrentData = computed(() => {
      if (!isNestMode.value) return null
      return currentData.value ?? props.data
    })

    /**
     * For nest mode: flatten current level items so each becomes a leaf node
     * with its aggregate value.
     */
    function computeNestLevelData(data: Record<string, any>[]): Record<string, any>[] {
      return data.map((item) => {
        const aggregatedValue = sumValues(item, props.dataKey)
        // Create a copy without children so computeTreemapLayout treats it as a leaf
        const { children: _, ...rest } = item
        return { ...rest, [props.dataKey]: aggregatedValue }
      })
    }

    const nodes = computed(() => {
      const dataToLayout = isNestMode.value
        ? computeNestLevelData(nestCurrentData.value ?? props.data)
        : props.data

      return computeTreemapLayout({
        data: dataToLayout,
        width: props.width,
        height: props.height,
        dataKey: props.dataKey,
        nameKey: props.nameKey,
        aspectRatio: props.aspectRatio,
        colorPanel: colors.value,
      })
    })

    function handleNestClick(node: TreemapLayoutNode, _index: number, e: MouseEvent) {
      const sourceData = nestCurrentData.value ?? props.data
      // Match by name because computeTreemapLayout sorts nodes by value (d3-hierarchy .sort()),
      // so the rendering index doesn't correspond to the original data index.
      const clickedItem = sourceData.find(item => item[props.nameKey] === node.name)

      if (clickedItem?.children && clickedItem.children.length > 0) {
        // Push current level to breadcrumb trail
        breadcrumbTrail.value = [
          ...breadcrumbTrail.value,
          { name: clickedItem[props.nameKey] ?? clickedItem.name, data: sourceData },
        ]
        currentData.value = clickedItem.children
      }

      props.onClick?.(node, index, e)
    }

    function navigateToBreadcrumb(index: number) {
      if (index < 0) {
        // Navigate to root
        currentData.value = null
        breadcrumbTrail.value = []
      }
      else {
        const entry = breadcrumbTrail.value[index]
        currentData.value = entry.data
        // Keep only breadcrumb entries before the clicked one
        breadcrumbTrail.value = breadcrumbTrail.value.slice(0, index)
      }
    }

    function getNodeFill(node: TreemapLayoutNode) {
      return node.color ?? props.fill
    }

    function renderNodes() {
      return nodes.value.map((node, index) => {
        const nodeFill = getNodeFill(node)
        const nodeProps: TreemapContentSlotProps = {
          ...node,
          index,
          fill: nodeFill,
          stroke: props.stroke,
        }

        const clickHandler = isNestMode.value
          ? (e: MouseEvent) => handleNestClick(node, index, e)
          : (e: MouseEvent) => props.onClick?.(node, index, e)

        if (slots.content) {
          return (
            <g
              key={`node-${index}`}
              class="v-charts-treemap-node"
              onClick={clickHandler}
              onMouseenter={(e: MouseEvent) => props.onMouseEnter?.(node, index, e)}
              onMouseleave={(e: MouseEvent) => props.onMouseLeave?.(node, index, e)}
            >
              {slots.content(nodeProps)}
            </g>
          )
        }

        return (
          <g
            key={`node-${index}`}
            class="v-charts-treemap-node"
            onClick={clickHandler}
            onMouseenter={(e: MouseEvent) => props.onMouseEnter?.(node, index, e)}
            onMouseleave={(e: MouseEvent) => props.onMouseLeave?.(node, index, e)}
          >
            <rect
              x={node.x}
              y={node.y}
              width={node.width}
              height={node.height}
              fill={nodeFill}
              stroke={props.stroke}
            />
            {node.width > 40 && node.height > 20 && (
              <text
                x={node.x + node.width / 2}
                y={node.y + node.height / 2}
                text-anchor="middle"
                dominant-baseline="central"
                fill="#fff"
                font-size={12}
              >
                {node.name}
              </text>
            )}
          </g>
        )
      })
    }

    function renderBreadcrumb() {
      if (!isNestMode.value || breadcrumbTrail.value.length === 0) return null

      return (
        <div class="v-charts-treemap-breadcrumb">
          <span
            class="v-charts-treemap-breadcrumb-item"
            style={{ cursor: 'pointer' }}
            onClick={() => navigateToBreadcrumb(-1)}
          >
            Root
          </span>
          {breadcrumbTrail.value.map((entry, i) => (
            <span key={i}>
              <span style={{ margin: '0 4px' }}>/</span>
              <span
                class="v-charts-treemap-breadcrumb-item"
                style={{ cursor: 'pointer' }}
                onClick={() => navigateToBreadcrumb(i)}
              >
                {entry.name}
              </span>
            </span>
          ))}
        </div>
      )
    }

    return () => {
      if (!props.data || props.data.length === 0) return null

      return (
        <div class="v-charts-treemap-container">
          {renderBreadcrumb()}
          <Surface width={props.width} height={props.height}>
            <Layer class="v-charts-treemap">
              {renderNodes()}
            </Layer>
          </Surface>
        </div>
      )
    }
  },
})
