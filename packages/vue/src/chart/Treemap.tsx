import { computed, defineComponent, type PropType, ref, type SlotsType } from 'vue'
import type { AnimationOptions } from 'motion-v'
import { Animate } from '@/animation/Animate'
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

export interface TreemapTooltipSlotProps {
  active: boolean
  node: TreemapLayoutNode | null
  fill: string
}

export interface TreemapSlots {
  content?: (props: TreemapContentSlotProps) => any
  tooltip?: (props: TreemapTooltipSlotProps) => any
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
  transition: { type: Object as PropType<AnimationOptions>, default: () => ({ duration: 0.8, ease: 'easeOut' as const }) },
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

    // Tooltip state
    const activeNode = ref<TreemapLayoutNode | null>(null)
    const activeNodeFill = ref('#808080')
    const tooltipPosition = ref({ x: 0, y: 0 })
    const containerRef = ref<HTMLDivElement | null>(null)

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
      const clickedItem = sourceData.find(item => item[props.nameKey] === node.name)

      if (clickedItem?.children && clickedItem.children.length > 0) {
        breadcrumbTrail.value = [
          ...breadcrumbTrail.value,
          { name: clickedItem[props.nameKey] ?? clickedItem.name, data: sourceData },
        ]
        currentData.value = clickedItem.children
      }

      props.onClick?.(node, _index, e)
    }

    function navigateToBreadcrumb(index: number) {
      if (index < 0) {
        currentData.value = null
        breadcrumbTrail.value = []
      }
      else {
        const entry = breadcrumbTrail.value[index]
        currentData.value = entry.data
        breadcrumbTrail.value = breadcrumbTrail.value.slice(0, index)
      }
    }

    function getNodeFill(node: TreemapLayoutNode) {
      return node.color ?? props.fill
    }

    function handleNodeMouseEnter(node: TreemapLayoutNode, index: number, e: MouseEvent) {
      activeNode.value = node
      activeNodeFill.value = getNodeFill(node)

      // Position tooltip relative to container
      if (containerRef.value) {
        const rect = containerRef.value.getBoundingClientRect()
        tooltipPosition.value = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        }
      }

      props.onMouseEnter?.(node, index, e)
    }

    function handleNodeMouseMove(e: MouseEvent) {
      if (containerRef.value && activeNode.value) {
        const rect = containerRef.value.getBoundingClientRect()
        tooltipPosition.value = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        }
      }
    }

    function handleNodeMouseLeave(node: TreemapLayoutNode, index: number, e: MouseEvent) {
      activeNode.value = null
      props.onMouseLeave?.(node, index, e)
    }

    function renderNodeAtProgress(node: TreemapLayoutNode, index: number, progress: number) {
      const nodeFill = getNodeFill(node)

      // Animate: scale width/height from center
      const animW = node.width * progress
      const animH = node.height * progress
      const animX = node.x + (node.width - animW) / 2
      const animY = node.y + (node.height - animH) / 2

      const nodeProps: TreemapContentSlotProps = {
        ...node,
        x: animX,
        y: animY,
        width: animW,
        height: animH,
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
            onMouseenter={(e: MouseEvent) => handleNodeMouseEnter(node, index, e)}
            onMousemove={handleNodeMouseMove}
            onMouseleave={(e: MouseEvent) => handleNodeMouseLeave(node, index, e)}
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
          onMouseenter={(e: MouseEvent) => handleNodeMouseEnter(node, index, e)}
          onMousemove={handleNodeMouseMove}
          onMouseleave={(e: MouseEvent) => handleNodeMouseLeave(node, index, e)}
        >
          <rect
            x={animX}
            y={animY}
            width={animW}
            height={animH}
            fill={nodeFill}
            stroke={props.stroke}
          />
          {animW > 40 && animH > 20 && (
            <text
              x={animX + animW / 2}
              y={animY + animH / 2}
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

    function renderDefaultTooltip(node: TreemapLayoutNode, fill: string) {
      return (
        <div
          class="v-charts-treemap-tooltip-content"
          style={{
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '8px 12px',
            fontSize: '13px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: fill, display: 'inline-block' }} />
            <span style={{ fontWeight: '500' }}>{node.name}</span>
          </div>
          <div style={{ marginTop: '4px', color: '#666' }}>
            {props.dataKey}: <span style={{ fontWeight: '500', color: '#333' }}>{node.value.toLocaleString()}</span>
          </div>
        </div>
      )
    }

    function renderTooltip() {
      const node = activeNode.value
      const isActive = node != null

      // If #tooltip slot exists, always render it (let consumer control visibility)
      if (slots.tooltip) {
        return (
          <div
            class="v-charts-treemap-tooltip"
            style={{
              position: 'absolute',
              left: `${tooltipPosition.value.x + 12}px`,
              top: `${tooltipPosition.value.y - 12}px`,
              pointerEvents: 'none',
              zIndex: 1000,
              visibility: isActive ? 'visible' : 'hidden',
            }}
          >
            {slots.tooltip({ active: isActive, node, fill: activeNodeFill.value })}
          </div>
        )
      }

      // Default tooltip: show when active
      if (!isActive) return null

      return (
        <div
          class="v-charts-treemap-tooltip"
          style={{
            position: 'absolute',
            left: `${tooltipPosition.value.x + 12}px`,
            top: `${tooltipPosition.value.y - 12}px`,
            pointerEvents: 'none',
            zIndex: 1000,
          }}
        >
          {renderDefaultTooltip(node, activeNodeFill.value)}
        </div>
      )
    }

    return () => {
      if (!props.data || props.data.length === 0) return null

      return (
        <div class="v-charts-treemap-container" ref={containerRef} style={{ position: 'relative' }}>
          {renderBreadcrumb()}
          <Surface width={props.width} height={props.height}>
            <Layer class="v-charts-treemap">
              <Animate
                isActive={props.isAnimationActive}
                from={0}
                to={1}
                transition={props.transition}
              >
                {(progress: number) =>
                  nodes.value.map((node, index) =>
                    renderNodeAtProgress(node, index, progress),
                  )}
              </Animate>
            </Layer>
          </Surface>
          {renderTooltip()}
        </div>
      )
    }
  },
})
