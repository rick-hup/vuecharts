import { Fragment, Teleport, computed, defineComponent, onUnmounted, reactive, ref, watch, watchEffect } from 'vue'
import type { CSSProperties, PropType } from 'vue'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { useChartLayout, useOffsetInternal, useViewBox } from '@/context/chartLayoutContext'
import { useAccessibilityLayer } from '@/context/accessibilityContext'
import { usePortal } from '@/chart/TooltipPortalContext'
import { useTooltipEventType } from '@/state/selectors/selectTooltipEventType'
import { motion } from 'motion-v'
import type { TooltipIndex, TooltipPayload, TooltipPayloadEntry } from '@/state/tooltipSlice'
import { setTooltipSettingsState } from '@/state/tooltipSlice'
import {
  selectActiveCoordinate,
  selectActiveLabel,
  selectIsTooltipActive,
  selectTooltipPayload,
  useChartName,
} from '@/state/selectors/selectors'
import { useElementBounding, useMagicKeys } from '@vueuse/core'
import type { AxisId } from '@/state/cartesianAxisSlice'
import type {
  ChartCoordinate,
  Coordinate,
  NameType,
  Payload,
  ValueType,
} from '@/types'
import type { Formatter, TooltipTrigger } from '@/types/tooltip'
import { getTooltipTranslate } from '@/utils/tooltip/translate'
import { Curve } from '@/shape/Curve'
import { getCursorPoints } from '@/components/utils'
import type { Point } from '@/shape'
import { sortBy, uniqBy } from 'es-toolkit/compat'
import { isNumOrStr } from '@/utils'
import { useTooltipChartSynchronisation } from '@/synchronisation/useChartSynchronisation'

// Types
export type ContentType =
  | any
  | ((props: TooltipContentProps) => any)

export type TooltipContentProps = {
  label?: string | number
  payload: TooltipPayload
  coordinate?: ChartCoordinate
  active: boolean
  accessibilityLayer: boolean
  // Other tooltip props
  [key: string]: any
}

type AllowInDimension = { x: boolean, y: boolean }

// Default uniq function
function defaultUniqBy<TValue extends ValueType, TName extends NameType>(entry: Payload<TValue, TName>) {
  return entry.dataKey
}

type UniqueFunc<T> = (entry: T) => unknown

export type UniqueOption<T> = boolean | UniqueFunc<T>

export function getUniqPayload<T>(
  payload: ReadonlyArray<T>,
  option: UniqueOption<T>,
  defaultUniqBy: UniqueFunc<T>,
): ReadonlyArray<T> {
  if (option === true) {
    return uniqBy(payload, defaultUniqBy)
  }

  if (typeof option === 'function') {
    return uniqBy(payload, option)
  }

  return payload
}

function defaultFormatter<TValue extends ValueType>(value: TValue) {
  return Array.isArray(value) && isNumOrStr(value[0]) && isNumOrStr(value[1]) ? (value.join(' ~ ') as TValue) : value
}
// Default Tooltip Content Component
const DefaultTooltipContent = defineComponent({
  name: 'DefaultTooltipContent',
  props: {
    label: [String, Number],
    payload: Array as PropType<TooltipPayload>,
    active: Boolean,
    separator: { type: String, default: ' : ' },
    contentStyle: Object,
    labelStyle: Object,
    itemStyle: Object,
    itemSorter: [Function, String] as PropType<((item: Payload<ValueType, NameType>) => number | string) | 'dataKey' | 'value' | 'name'>,
    formatter: Function as PropType<Formatter<ValueType, NameType>>,
  },
  setup(props) {
    return () => {
      if (!props.active || !props.payload?.length)
        return null
      const { contentStyle, labelStyle, itemStyle } = props
      const finalStyle: CSSProperties = {
        margin: 0,
        padding: '10px',
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        whiteSpace: 'nowrap',
        ...contentStyle,
      }
      const finalLabelStyle = {
        margin: 0,
        ...labelStyle,
      }
      const { itemSorter, payload, formatter } = props
      const sortedPayload = itemSorter ? sortBy(payload, itemSorter) : payload
      return (
        <div class="v-charts-tooltip-content" style={finalStyle}>
          {props.label && (
            <div class="v-charts-tooltip-label" style={finalLabelStyle}>
              {props.label}
            </div>
          )}
          <div class="v-charts-tooltip-list">
            {sortedPayload.map((entry, index) => {
              const finalItemStyle = {
                display: 'block',
                paddingTop: 4,
                paddingBottom: 4,
                color: entry.color || '#000',
                ...itemStyle,
              }
              const finalFormatter = entry.formatter || formatter || defaultFormatter
              const { value, name } = entry
              let finalValue: React.ReactNode = value
              let finalName: React.ReactNode = name
              if (finalFormatter) {
                const formatted = finalFormatter(value!, name!, entry, index, payload)
                if (Array.isArray(formatted)) {
                  [finalValue, finalName] = formatted
                }
                else if (formatted != null) {
                  finalValue = formatted
                }
                else {
                  return null
                }
              }
              return (
                <div key={index} class="v-charts-tooltip-item" style={finalItemStyle}>
                  <span class="v-charts-tooltip-item-name" style={{ color: entry.color }}>
                    {entry.name}
                  </span>
                  <span class="v-charts-tooltip-separator">{props.separator}</span>
                  <span class="v-charts-tooltip-item-value">
                    {finalValue}
                  </span>
                  <span class="v-charts-tooltip-item-unit">{entry.unit || ''}</span>
                </div>
              )
            })}
          </div>
        </div>
      )
    }
  },
})

// Tooltip Bounding Box Component (simplified)
const TooltipBoundingBox = defineComponent({
  name: 'TooltipBoundingBox',
  props: {
    allowEscapeViewBox: Object as PropType<AllowInDimension>,
    animationDuration: Number,
    animationEasing: String,
    isAnimationActive: Boolean,
    active: Boolean,
    coordinate: Object as PropType<ChartCoordinate>,
    hasPayload: Boolean,
    offset: Number,
    position: Object as PropType<Partial<Coordinate>>,
    reverseDirection: Object as PropType<AllowInDimension>,
    viewBox: Object,
    style: Object as PropType<CSSProperties>,
  },
  setup(props, { slots }) {
    const dismissed = ref(false)
    const dismissedAtCoordinate = reactive({
      x: 0,
      y: 0,
    })

    watchEffect(() => {
      if (props.coordinate?.x !== dismissedAtCoordinate.x
        || props.coordinate?.y !== dismissedAtCoordinate.y) {
        dismissed.value = false
      }
    }, {
      flush: 'post',
    })

    const { escape } = useMagicKeys()
    watch(escape, (v) => {
      if (v) {
        dismissed.value = true
        dismissedAtCoordinate.x = props.coordinate?.x ?? 0
        dismissedAtCoordinate.y = props.coordinate?.y ?? 0
      }
    })
    const el = ref()
    const lastBoundingBox = useElementBounding(el, {
    })
    let preTransform: CSSProperties | undefined
    return () => {
      const { viewBox, active, hasPayload, style, allowEscapeViewBox, coordinate, position, reverseDirection } = props

      let { cssClasses, cssProperties, transform } = getTooltipTranslate({
        allowEscapeViewBox: allowEscapeViewBox!,
        coordinate: coordinate!,
        offsetTopLeft: props.offset!,
        position: position!,
        reverseDirection: reverseDirection!,
        tooltipBox: {
          height: lastBoundingBox.height.value,
          width: lastBoundingBox.width.value,
        },
        useTranslate3d: false,
        viewBox: viewBox!,
      })
      transform = !lastBoundingBox.height.value && preTransform ? preTransform : transform
      preTransform = transform || preTransform
      const boundingBoxStyle = {
        ...cssProperties,
        pointerEvents: 'none',
        visibility: !dismissed.value && active && hasPayload ? 'visible' : 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        ...style,
      }
      return (
        <motion.div
          tabindex={-1}
          class={cssClasses}
          style={boundingBoxStyle}
          ref={el}
          animate={{
            transform: transform?.transform,
          }}
          transition={{
            duration: 0.4,
          }}
        >
          {slots.default?.()}
        </motion.div>
      )
    }
  },
})

const Cursor = defineComponent({
  name: 'Cursor',
  props: {
    cursor: [Boolean, Object],
    tooltipEventType: String,
    coordinate: Object as PropType<ChartCoordinate>,
    payload: Array as PropType<TooltipPayload>,
    index: String,
  },
  setup(props) {
    const offset = useOffsetInternal()
    const layout = useChartLayout()
    const points = computed(() => getCursorPoints(layout.value, props.coordinate!, offset.value))
    return () => {
      if (!props.cursor || !props.coordinate)
        return null
      const cursorProps = {
        stroke: '#ccc',
        class: ['recharts-tooltip-cursor'],
        layout: layout.value,
        points: points.value as ReadonlyArray<Point>,
      }
      return (
        <Curve
          style={{ pointerEvents: 'none' }}
          {...cursorProps}
        />
      )
    }
  },
})

// Main Tooltip Props
const TooltipVueProps = {
  /**
   * If true, then Tooltip is always displayed, once an activeIndex is set by mouse over, or programmatically.
   * If false, then Tooltip is never displayed.
   * If active is undefined, Recharts will control when the Tooltip displays.
   */
  active: {
    type: Boolean,
    default: undefined,
  },
  /**
   * If true, then Tooltip will show information about hidden series (defaults to false).
   */
  includeHidden: Boolean,
  allowEscapeViewBox: {
    type: Object as PropType<AllowInDimension>,
    default: () => ({ x: false, y: false }),
  },
  content: [Object, Function] as PropType<ContentType>,
  cursor: {
    type: [Boolean, Object] as PropType<boolean | object>,
    default: true,
  },
  filterNull: {
    type: Boolean,
    default: true,
  },
  defaultIndex: [Number, String] as PropType<number | TooltipIndex>,
  isAnimationActive: {
    type: Boolean,
    default: true,
  },
  offset: {
    type: Number,
    default: 10,
  },
  payloadUniqBy: [Boolean, Function] as PropType<UniqueOption<TooltipPayloadEntry>>,
  /**
   * If portal is defined, then Tooltip will use this element as a target for rendering using Teleport
   */
  portal: {
    type: Object as PropType<HTMLElement | null>,
    default: undefined,
  },
  position: Object as PropType<Partial<Coordinate>>,
  reverseDirection: {
    type: Object as PropType<AllowInDimension>,
    default: () => ({ x: false, y: false }),
  },
  /**
   * If true, tooltip will appear on top of all bars on an axis tick.
   * If false, tooltip will appear on individual bars.
   */
  shared: Boolean,
  /**
   * If `hover` then the Tooltip shows on mouse enter and hides on mouse leave.
   * If `click` then the Tooltip shows after clicking and stays active.
   */
  trigger: {
    type: String as PropType<TooltipTrigger>,
    default: 'hover',
  },
  style: {
    type: Object,
    default: () => ({}),
  },
  /**
   * Tooltip axis ID
   */
  axisId: {
    type: [String, Number] as PropType<AxisId>,
    default: 0,
  },
  // Style props
  contentStyle: {
    type: Object,
    default: () => ({}),
  },
  itemStyle: {
    type: Object,
    default: () => ({}),
  },
  labelStyle: {
    type: Object,
    default: () => ({}),
  },
  itemSorter: {
    type: String,
    default: 'name',
  },
  separator: {
    type: String,
    default: ' : ',
  },
} as const

// Main Tooltip Component
export const Tooltip = defineComponent({
  name: 'Tooltip',
  props: TooltipVueProps,
  setup(props) {
    const dispatch = useAppDispatch()

    const defaultIndexAsString = computed(() =>
      typeof props.defaultIndex === 'number' ? String(props.defaultIndex) : props.defaultIndex,
    )

    // Register tooltip settings in store
    watchEffect(() => {
      dispatch(setTooltipSettingsState({
        shared: props.shared,
        trigger: props.trigger,
        axisId: props.axisId,
        active: props.active,
        defaultIndex: defaultIndexAsString.value,
      }))
    })

    // Context hooks
    const viewBox = useViewBox()
    const accessibilityLayer = useAccessibilityLayer()
    const tooltipEventType = useTooltipEventType(props.shared)

    // Selectors
    const tooltipState = useAppSelector(state =>
      selectIsTooltipActive(state, tooltipEventType.value, props.trigger, defaultIndexAsString.value),
    )

    const payloadFromRedux = useAppSelector(state =>
      selectTooltipPayload(state, tooltipEventType.value, props.trigger, defaultIndexAsString.value),
    )

    const labelFromRedux = useAppSelector(state =>
      selectActiveLabel(state, tooltipEventType.value, props.trigger, defaultIndexAsString.value),
    )

    const coordinate = useAppSelector(state =>
      selectActiveCoordinate(state, tooltipEventType.value, props.trigger, defaultIndexAsString.value),
    )

    const payload = computed(() => payloadFromRedux.value ?? [])

    // Portal
    const tooltipPortalFromContext = usePortal()
    const tooltipPortal = computed(() => props.portal ?? tooltipPortalFromContext?.value)

    // Final states
    const finalIsActive = computed(() => props.active ?? tooltipState.value?.isActive)
    const finalLabel = computed(() =>
      tooltipEventType.value === 'axis' ? labelFromRedux.value : undefined,
    )

    // Payload processing
    const emptyPayload: TooltipPayload = []

    const finalPayload = computed(() => {
      if (!finalIsActive.value) {
        return emptyPayload
      }

      let result: TooltipPayload = payload.value ?? emptyPayload

      if (props.filterNull && result.length > 0) {
        result = getUniqPayload(
          result.filter(entry =>
            entry.value != null && (entry.hide !== true || props.includeHidden),
          ),
          props.payloadUniqBy!,
          defaultUniqBy,
        )
      }

      return result
    })

    const hasPayload = computed(() => finalPayload.value.length > 0)

    // Content component resolution
    const contentComponent = computed(() => {
      if (props.content) {
        return props.content
      }
      return DefaultTooltipContent
    })

    const contentProps = computed(() => ({
      ...props,
      payload: finalPayload.value,
      label: finalLabel.value,
      active: finalIsActive.value,
      coordinate: coordinate.value,
      accessibilityLayer: accessibilityLayer.value,
    }))

    useTooltipChartSynchronisation({
      tooltipEventType,
      trigger: props.trigger,
      activeCoordinate: coordinate,
      activeLabel: finalLabel,
      activeIndex: computed(() => tooltipState.value?.activeIndex),
      isTooltipActive: finalIsActive,
    })
    return () => {
      if (!tooltipPortal.value) {
        return null
      }
      return (
        <Fragment>
          <foreignObject>
            <Teleport to={tooltipPortal.value}>
              <TooltipBoundingBox
                allowEscapeViewBox={props.allowEscapeViewBox}
                isAnimationActive={props.isAnimationActive}
                active={finalIsActive.value}
                coordinate={coordinate.value}
                hasPayload={hasPayload.value}
                offset={props.offset}
                position={props.position}
                reverseDirection={props.reverseDirection}
                viewBox={viewBox.value}
                style={props.style}
              >
                <contentComponent.value {...contentProps.value} />
              </TooltipBoundingBox>
            </Teleport>
          </foreignObject>

          {/* Cursor component */}
          {finalIsActive.value && (
            <Cursor
              cursor={props.cursor}
              tooltipEventType={tooltipEventType.value}
              coordinate={coordinate.value}
              payload={payload.value}
              index={tooltipState.value?.activeIndex}
            />
          )}
        </Fragment>
      )
    }
  },
})

export default Tooltip
