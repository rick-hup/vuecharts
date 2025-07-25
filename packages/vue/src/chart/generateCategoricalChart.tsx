import { createRechartsStore } from '@/state/store'
import type { DataKey, LayoutType, Margin, StackOffsetType, SyncMethod, VuePropsToType, WithSVGProps } from '@/types'
import { validateWidthHeight } from '@/utils'
import { provideStore } from '@reduxjs/vue-redux'
import type { ComponentPublicInstance, PropType } from 'vue'
import { Fragment, defineComponent, toRaw } from 'vue'
import type { TooltipEventType } from '@/types/tooltip'
import { provideClipPathId } from './provideClipPathId'
import Surface from '@/chart/Surface.vue'
import { ChartDataContextProvider } from '@/context/ChartDataContextProvider'
import type { ChartData } from '@/state/chartDataSlice'
import { LegendPortalProvider } from '@/chart/LegendPortalContext'
import ClipPath from '@/container/ClipPath'
import { RechartsWrapper } from './RechartsWrapper'
import { FULL_WIDTH_AND_HEIGHT } from '@/chart/const'
import { ReportMainChartProps } from '@/state/ReportMainChartProps'
import type { ChartOptions } from '@/state/optionsSlice'
import ReportChartProps from '@/state/ReportChartProps'
import { applyDefaultProps } from '@/utils/props'

const defaultLayout: LayoutType = 'horizontal'
const defaultMargin: Margin = { top: 5, right: 5, bottom: 5, left: 5 }

export const CategoricalProps = {
  accessibilityLayer: {
    type: Boolean,
    default: true,
  },
  barCategoryGap: {
    type: [Number, String],
    default: '10%',
  },
  barGap: {
    type: [Number, String],
    default: 4,
  },
  barSize: {
    type: [Number, String],
  },
  class: {
    type: String,
  },
  compact: {
    type: Boolean,
  },
  cx: {
    type: [Number, String],
  },
  cy: {
    type: [Number, String],
  },
  data: {
    type: Array as PropType<ChartData>,
    default: () => [],
  },
  dataKey: {
    type: [String, Number, Function] as PropType<DataKey<any>>,
  },
  desc: {
    type: String,
  },
  endAngle: {
    type: Number,
  },
  height: {
    type: Number,
  },
  id: {
    type: String,
  },
  innerRadius: {
    type: [Number, String],
  },
  layout: {
    type: String as PropType<LayoutType>,
    default: defaultLayout,
  },
  margin: {
    type: Object as PropType<Margin>,
    default: () => defaultMargin,
  },
  maxBarSize: {
    type: Number,
  },
  outerRadius: {
    type: [Number, String],
  },
  reverseStackOrder: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
  },
  stackOffset: {
    type: String as PropType<StackOffsetType>,
    default: 'none',
  },
  startAngle: {
    type: Number,
  },
  style: {
    type: Object,
  },
  syncId: {
    type: [Number, String],
  },
  syncMethod: {
    type: [String, Function] as PropType<SyncMethod>,
    default: 'index',
  },
  tabIndex: {
    type: Number,
  },
  throttleDelay: {
    type: Number,
  },
  title: {
    type: String,
  },
  width: {
    type: Number,
  },
  to: {
    type: [String, Object] as PropType<string | HTMLElement | null>,
  },
}

export type CategoricalChartPropsWithOutSvg = VuePropsToType<typeof CategoricalProps>

export type CategoricalChartProps = WithSVGProps<CategoricalChartPropsWithOutSvg>

export interface CategoricalChartOptions {
  chartName: string
  defaultProps?: Partial<CategoricalChartPropsWithOutSvg>
  defaultTooltipEventType?: TooltipEventType
  validateTooltipEventTypes?: readonly TooltipEventType[]
  tooltipPayloadSearcher?: any
}

export function generateCategoricalChart({
  chartName,
  defaultProps = {},
  defaultTooltipEventType = 'axis' as TooltipEventType,
  validateTooltipEventTypes = ['axis' as TooltipEventType],
  tooltipPayloadSearcher,
}: CategoricalChartOptions) {
  return defineComponent<CategoricalChartProps>({
    name: chartName,
    props: applyDefaultProps(CategoricalProps, defaultProps),
    setup(props: CategoricalChartPropsWithOutSvg, { attrs, slots }) {
      const options: ChartOptions = {
        chartName,
        defaultTooltipEventType,
        validateTooltipEventTypes,
        tooltipPayloadSearcher,
        eventEmitter: undefined,
      }
      const store = createRechartsStore({ options }, props.id ?? chartName)
      provideStore({
        store,
      })

      const clipPathId = provideClipPathId(props)

      return () => {
        const { compact, width, height, title, desc, ...rest } = props
        const attributes = { ...attrs }
        if (!validateWidthHeight({ width: width!, height: height! })) {
          return null
        }

        if (compact) {
          return (
            <Surface {...attrs} {...rest} width={width!} height={height!} title={title} desc={desc}>
              <ClipPath clipPathId={clipPathId} />
              {slots.default?.()}
            </Surface>
          )
        }

        if (props.accessibilityLayer) {
          attributes.tabIndex = props.tabIndex ?? 0
          attributes.role = props.role ?? 'application'
        }

        return (
          <Fragment>
            <ChartDataContextProvider chartData={props.data!} />
            <ReportMainChartProps width={width!} height={height!} layout={props.layout ?? defaultProps.layout ?? defaultLayout} margin={props.margin ?? defaultMargin} />
            <LegendPortalProvider to={props.to!}>
              <RechartsWrapper
                style={props.style}
                class={props.class}
                width={width!}
                height={height!}
              >
                <Surface
                  {...attributes}
                  width={width!}
                  height={height!}
                  title={title}
                  desc={desc}
                  style={FULL_WIDTH_AND_HEIGHT}
                >
                  <ClipPath clipPathId={clipPathId} />
                  {slots.default?.()}
                </Surface>
                {slots.tooltip?.()}
              </RechartsWrapper>
            </LegendPortalProvider>
            <ReportChartProps {...props as any} />
          </Fragment>
        )
      }
    },
  })
}
