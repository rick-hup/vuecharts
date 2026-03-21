import { computed, defineComponent, type PropType, type SlotsType } from 'vue'
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

    const nodes = computed(() =>
      computeTreemapLayout({
        data: props.data,
        width: props.width,
        height: props.height,
        dataKey: props.dataKey,
        nameKey: props.nameKey,
        aspectRatio: props.aspectRatio,
        colorPanel: colors.value,
      }),
    )

    function getNodeFill(node: TreemapLayoutNode) {
      return node.color ?? props.fill
    }

    return () => {
      if (!props.data || props.data.length === 0) return null

      return (
        <Surface width={props.width} height={props.height}>
          <Layer class="v-charts-treemap">
            {nodes.value.map((node, index) => {
              const nodeFill = getNodeFill(node)
              const nodeProps: TreemapContentSlotProps = {
                ...node,
                index,
                fill: nodeFill,
                stroke: props.stroke,
              }

              if (slots.content) {
                return (
                  <g
                    key={`node-${index}`}
                    class="v-charts-treemap-node"
                    onClick={(e: MouseEvent) => props.onClick?.(node, index, e)}
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
                  onClick={(e: MouseEvent) => props.onClick?.(node, index, e)}
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
            })}
          </Layer>
        </Surface>
      )
    }
  },
})
